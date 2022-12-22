# Sliple

[Getting started](./docs/GETTINGSTARTED.md)

## Gameplay loop

Each day there's a set of letter tiles, and the player has to try move the letter tiles into the goal tiles to form words. They get a point for each word they can come up with.

The words can be shorter than the number of goal tiles, so that users can vary the length of word. The length affects the amount of points gotten from the word.

The game could also have a max number of moves to come up with each word.

## Tiles

### Letter tiles

Letter tiles contain a single letter. They cannot move through walls or through each other.

### Wall tiles

These can't be moved, and letter tiles can't move through them.

### Goal tile

This is an outlined tile where the letter tiles must be placed.
The letter tiles can move through this tile.

### Linked letters

When moving a linked letter, the other letters linked to that letter will also move.

**NOT IMPLEMENTED**

### Sticky tiles

When a letter tile is moving through a sticky tile, it stops at the sticky tile.
It does not stay permanently at the sticky tile, and can be moved.

## Loading and saving

The game state can be saved onto a string for sharing.

The format of the string is described in the [FORMAT.md](./FORMAT.md) file.
