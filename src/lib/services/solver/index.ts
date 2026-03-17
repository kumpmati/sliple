import { Dir } from '$lib/stores/grid';
import type { Grid } from '$lib/types/grid';
import type { Puzzle } from '$lib/types/puzzle';
import { getAllPossibleMoves, hashState } from '$lib/utils/grid';
import { Queue } from '$lib/utils/queue';
import { isWinStatus } from '$lib/v2/game/utils';
import createGraph, { type Graph, type Link, type Node } from 'ngraph.graph';
import * as path from 'ngraph.path';

type PuzzleNodeData = {
	isWin?: boolean;
};

type PuzzleLinkData = {
	move: FromState['move'];
};

type FromState = {
	hash: number;
	move: { id: string; dir: Dir };
};

type QueueItem = {
	state: Pick<Grid, 'width' | 'height' | 'tiles'>;
	from?: FromState;
};

export class PuzzleSolver {
	#puzzle: Puzzle;
	#graph: Graph<PuzzleNodeData, PuzzleLinkData>;
	#queue: Queue<QueueItem>;
	#processed: boolean;
	#startNode: Node | null;
	#winNodes: Node[];

	constructor(puzzle: Puzzle) {
		this.#puzzle = puzzle;
		this.#graph = createGraph();
		this.#queue = new Queue();
		this.#startNode = null;
		this.#winNodes = [];
		this.#processed = false;
	}

	public async constructGraph() {
		const start = performance.now();

		this.#processed = false;
		this.#startNode = null;
		this.#winNodes = [];
		this.#graph.clear();
		this.#queue.clear();

		const hash = hashState(this.#puzzle.data);
		this.#queue.insert(hash, {
			state: {
				tiles: this.#puzzle.data.tiles,
				width: this.#puzzle.data.width,
				height: this.#puzzle.data.height
			}
		});

		await this.#queue.process(this.processQueueItem.bind(this));

		const end = performance.now();
		this.#processed = true;

		return { duration: end - start };
	}

	public findOptimumRoute() {
		if (!this.#processed) throw new Error('not processed');
		if (!this.#startNode) throw new Error('no start node found');
		if (!this.#winNodes.length) throw new Error('no win nodes found');

		// TODO: should the graph be oriented or not?
		const pathFinder = path.nba(this.#graph, { oriented: false });

		const routes = this.#winNodes
			.map((win) => pathFinder.find(this.#startNode!.id, win.id))
			.sort((a, b) => a.length - b.length);

		if (!routes.length) {
			throw new Error('did not find any win routes');
		}

		// TODO: show also alternatives with same amount of moves?
		const bestRoute = routes[0];

		const route = bestRoute
			.toReversed()
			.map((node, i, arr) => {
				const isLast = i === arr.length - 1;

				if (!isLast) {
					const links = node.links?.values().toArray() ?? [];
					const linkToNext: Link<PuzzleLinkData> | undefined = links.find(
						(l) => l.toId === arr[i + 1].id
					);
					if (!linkToNext) {
						throw new Error('missing link between ' + node.id + ' -> ' + arr[i + 1].id);
					}

					return linkToNext.data.move;
				}

				return null;
			})
			.filter((m) => !!m);

		return {
			moves: route.length,
			route: route
		};
	}

	private processQueueItem(hash: number, item: QueueItem, index: number) {
		// check existence before adding link, since that will add the node implicitly
		const isProcessed = this.#graph.hasNode(hash);

		if (item.from) {
			this.#graph.addLink(item.from.hash, hash, { move: item.from.move });
		}

		if (isProcessed) {
			return;
		}

		const possibleMoves = getAllPossibleMoves(item.state);

		const isWin = isWinStatus(item.state.tiles);
		if (!isWin) {
			for (const move of possibleMoves) {
				const nextHash = hashState(move.state);

				if (this.#graph.hasNode(nextHash)) {
					continue;
				}

				this.#queue.insert(nextHash, {
					state: move.state,
					from: { hash, move: { id: move.id, dir: move.dir } }
				});
			}
		}

		const isStart = index === 0;
		const node = this.#graph.addNode(hash, isWin ? { isWin } : undefined);

		if (isWin) this.#winNodes.push(node);
		if (isStart) this.#startNode = node;
	}
}
