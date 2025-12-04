import type { Component } from 'svelte';
import type { SVGAttributes } from 'svelte/elements';
import DefaultGoalTile from './default/DefaultGoalTile.svelte';
import DefaultWallTile from './default/DefaultWallTile.svelte';
import DefaultLetterTile from './default/DefaultLetterTile.svelte';
import ChristmasWallTile from './christmas/ChristmasWallTile.svelte';
import ChristmasLetterTile from './christmas/ChristmasLetterTile.svelte';
import ChristmasBackground from './christmas/ChristmasBackground.svelte';
import DefaultBackground from './default/DefaultBackground.svelte';
import { getSeason, Season } from '$lib/season';

export type BackgroundProps = {
	width: number;
	height: number;
};

export type GoalTileProps = {
	letter: string;
};

export type WallTileProps = Record<string, never>;

export type LetterTileProps = {
	letter: string;
	secondaryLetter?: string | null;
	status?: 'none' | 'invalid' | 'valid';
} & SVGAttributes<SVGElement>;

type TileComponents = {
	Background: Component<BackgroundProps>;
	GoalTile: Component<GoalTileProps>;
	WallTile: Component<WallTileProps>;
	LetterTile: Component<LetterTileProps>;
};

export const getTileComponents = (): TileComponents => {
	if (getSeason() === Season.CHRISTMAS) {
		return {
			Background: ChristmasBackground,
			GoalTile: DefaultGoalTile,
			WallTile: ChristmasWallTile,
			LetterTile: ChristmasLetterTile
		};
	}

	return {
		Background: DefaultBackground,
		GoalTile: DefaultGoalTile,
		WallTile: DefaultWallTile,
		LetterTile: DefaultLetterTile
	};
};
