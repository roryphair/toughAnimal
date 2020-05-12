# Animal Auto Chess Proposal
![toughest animal gif](https://github.com/roryphair/toughAnimal/blob/master/src/assets/other/animal.gif)
## Background and Overview

Autochess games are a relatively new type of strategy game based around selecting and positioning units on a board that will then fight with an opponents pieces.

The player focuses on selecting which units and where to place them so as beat the opponents positioning. For an example of this type of game https://na.leagueoflegends.com/en/featured/events/teamfight-tactics.

This will be a relatively simplized version of that where the players will select different animals which different strengths and weaknesses. The player will drag and drop on the board to counter the enemy team.

The game will be broken up into waves, which each wave increasing in difficulty and the amount of units placed.

## Functionality and MVPS

In Animal Autochess, users will be able to

- Start a new game session
- Select which units to deploy
- Position those units within the board by dragging and dropping
- Start the Wave

## WireFrames

This app will be a single screen with a board, how to play, unit selector and links to my Github, LinkedIn, angelist profiles.
On the screen there will be a side bar explaining how to play, basically telling you how to add and remove units.
Clicking on a unit in the left side bar will add it and dragging it outside the box will remove it.
Inside the box, the colored squares are your own units which you can move around by dragging and dropping. There will be a timer that starts the next wave.

![wireframe](https://github.com/roryphair/toughAnimal/blob/master/animalwireframe.jpg)

## Architecture and Technology

Javascript for game logic
HTMLDOM manipulation for game interactions

In addition to the entry file there will be other scripts in this project:
game.js will have all the information pertaining to the current state of the game, what wave it is, if you have won or lost the current wave, what enemy units there will be, how many player units.
board.js will house all the units, both the players and the enemies units.
unit.js will be a parent class with the base level of interaction like health, current target, attack damage, rang, moving into position to attack, dieing.
individual-unit.js will be a sub-class that will have specific logic associated with that class, i.e. gibbon will have a longer range, do less damage and so on.

## Implementation Timeline

Day 1: Work on general site structure. Set up the game, board and rules rendering. Make it so you can create
a unit. 
Goals:
1) Board and game sidebar rendering
2) Able to create a placeholder unit by clicking
3) Style board to look nice
4) Profile links at bottom

Day 2: Create an individual unit and have it be able to interact with an opposing unit. Able to move your units by dragging them
Goals:
1) Unit moves towards enemy unit and attacks
2) When a unit's hp hit 0, it dies and is removed
3) Can position units specifically

Day 3: Create more units with specific interactions, some units more distant, some closer, some target closest enemy, some target furthest.
Have all of their interaction work with each other.
Goals:

1) Have four different units with different strategic roles
2) Create nice looking sprites for units and their attacks.
3) Units have clear explanation of abilities when clicked

Day 4: Create wave logic, when a user wins or loses. Create wave data, including position and units for specific waves. Potentially a high score feature.

Goals:
1) User can win and lose a wave.
2) How to play bar explains general idea.
3) If time, add music and sound effects for units.

## Bonus Features

- More units to select from / more levels
- Selecting Units to upgrade, having scalable attacks and so on.
- Multiplayer against a human opponent
