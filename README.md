# World’s Toughest Animal
![toughest animal gif](https://github.com/roryphair/toughAnimal/blob/master/src/assets/other/animal.gif)
## Background and Overview

Autochess games are a relatively new type of strategy game based around selecting and positioning units on a board that will then fight with an opponent’s board.

The player focuses on selecting which units and where to place them so as to beat the opponents positioning. For an example of this type of game https://na.leagueoflegends.com/en/featured/events/teamfight-tactics.

This is a relatively simplified version of that where the players will select different animals with different strengths and weaknesses. The player drags and drops units on the board to counter the enemy team. The individual units have unique AI to determine who they attack and how they interact with other units.

The game will be broken up into waves, with each wave increasing in difficulty and complexity. The idea being to slowly introduce complexity and to force the player to learn the benefits and drawbacks of each unit.

## Functionality and MVPS

In World’s Toughest Animal, users are able to

- Start a new game session
- Select which units to deploy
- Read the specific details of that Unit
- Position those units within the board by dragging and dropping
- Start the Wave
- Change the speed of gameplay
- Reset or change the wave as desired.

## WireFrames

This app is a single screen with a board, how to play, unit selector and links to my Github, LinkedIn and portfolio site.
On the screen there is a sidebar explaining how to play, telling the player the objective, how
Clicking on a unit in the left side bar will add it and dragging it outside the box will remove it.
Inside the box, there is a grid showing which squares you can place. Your units have a blue glow and are a different color than the enemy units. The units have a number above them indicating their health remaining.

![wireframe](https://github.com/roryphair/toughAnimal/blob/master/animalwireframe.jpg)

## Architecture and Technology

Javascript for game logic
HTMLDOM manipulation for game interactions

In addition to the entry file there will be other scripts in this project.
The game.js file will have all the information pertaining to the current state of the game, what wave it is, if you have won or lost the current wave, what enemy units there will be, how many player units.
The board.js file will house all the units, both the players and the enemies units, give commands to start rounds to the units.
The unit.js file will be a parent class with the base level of interaction like health, current target, attack damage, range, moving into position to attack, dieing.
The various individual-unit.js files will be a sub-classes that will have specific logic associated with that class, i.e. gibbon will have a longer range, have less speed and so on.

## Implementation Timeline

Day 1: Worked on general site structure. Set up the game, board and rules rendering. Make it so you can create a unit and move it on the grid to specific spaces. 
Tasks:
1) Board and game sidebar rendering
2) Able to create a placeholder unit by clicking
3) Style board to look nice
4) Can position units specifically

Day 2: Created an individual unit and have it be able to interact with an opposing unit. Have a round be one when a unit dies.
Tasks:
1) Unit moves towards enemy unit and attacks
2) When a unit's hp hit 0, it dies and is removed
3) Notification if won or lost a specific wave.

Day 3: Create more units with specific interactions, make sure units have fun and unique strategic roles. Have all of their interactions work with each other.

Tasks:
1) Have four different units with different strategic roles
2) Create nice looking sprites for units and their attacks.
3) Units have clear explanation of abilities when clicked

Day 4: Create wave data, including position and units for specific waves. UX improvements, CSS and style for fun vaporwave aesthetic. Balancing changes.

Tasks:
1) How to play bar explains gameplay.
2) Added music and sound effects for units.
3) Added attack animations
4) Added speed button.
5) Profile links at bottom.

## Bonus Features for future

- More units to select from / more levels
- Selecting Units to upgrade, having scalable attacks and so on.
- Multiplayer against a human opponent
