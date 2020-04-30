import Dog from './units/dog';
import Gibbon from './units/gibbon';
import Otter from './units/otter';
import Goat from './units/goat';
import Llama from './units/llama';
import Sal from './units/sal';
import Chilla from './units/chilla';

class Board {
    constructor(playerUnits, enemyUnits, game){
        this.game = game;
        this.playerUnits = playerUnits;
        this.enemyUnits = enemyUnits;
        this.enemyBase = [];
        this.grid = [];
        this.squares = [];
        this.waveStarted = false;
        this.fightButton = document.getElementById('start-fight-button');
        this.resetGrid(8);
        this.parent = document.getElementById('board');
        this.buildGrid();
        this.makeUnit = this.makeUnit.bind(this);
        this.makeEnemyUnit = this.makeEnemyUnit.bind(this);
        this.startFight = this.startFight.bind(this);
        this.clearGrid = this.clearGrid.bind(this);
        this.totalUnits = document.getElementById('total-units')
        this.maxPlayer = 0;
    }

    startFight(e){
        e.preventDefault();
        if(!this.waveStarted && this.playerUnits.length > 0){
            
            this.fightButton.innerHTML = 'Reset!';
            this.waveStarted = true;
            this.clearGrid();
            this.playerUnits.forEach(player => player.startFight());
            this.enemyUnits.forEach(enemy => enemy.startFight());
        }
        else if(this.waveStarted){
            this.makeWave(this.maxPlayer);
        }
    }

    winWave(){
        this.game.makeOverlay(true);
        this.waveStarted = false;
        this.playerUnits.forEach(player => {
            player.endFight();
        });
    }

    loseWave(){
        this.game.makeOverlay(false);
        this.waveStarted = false;
        this.enemyUnits.forEach(enemy => {
            enemy.endFight();
        });
    }

    makeWave( playerAmount){
        this.fightButton.innerHTML = 'Start Fight';
        this.waveStarted = false;
        this.setGrid();
        this.maxPlayer = playerAmount;
        this.enemyUnits.forEach( (enemy) => {
            enemy.deleteSelf();
        })
        this.playerUnits.forEach( (player) => {
            player.deleteSelf();
        })
        this.enemyBase.forEach(enemy => {
            this.makeEnemyUnit(enemy[0], enemy[1]);
        });
        
        this.setPlayerTotal();
    }

    setPlayerTotal(){
        this.totalUnits.innerHTML = 'Animals Left: ' +  (this.maxPlayer - this.playerUnits.length);
    }

    resetGrid(n){
        const newGrid = [];
        for (let i = 0; i < n; i++) {
            const subArr = []
            for (let j = 0; j < n; j++) {
                subArr.push(null);
            }
            newGrid.push(subArr);            
        }
        this.grid = newGrid;
    }
    
    buildGrid(){
        for (let i = 0; i < this.grid.length; i++) {
            const subArr = []
            for (let j = 0; j < this.grid.length; j++) {
                const square = document.createElement('div');
                square.style.top = (i * 100) + 'px';
                square.style.left = (j * 100) + 'px';
                this.parent.appendChild(square);
                subArr.push(square);
            }
            this.squares.push(subArr);
        }
    }

    setGrid(){
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid.length; j++) {
                if(j < 4){
                    this.squares[i][j].className = 'board-square-player';
                }
                else{
                    this.squares[i][j].className = 'board-square-enemy';
                }
        }   }
    }

    clearGrid(){
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid.length; j++) {
                this.squares[i][j].className = '';
            }
        }
    }
    
    makeUnit(unitName){
        return e => {
            if(this.playerUnits.length < this.maxPlayer){
                e.preventDefault();
                let Unit;
                switch(unitName){
                    case 'dog':
                        Unit = Dog;
                        break;
                    case 'gibbon':
                        Unit = Gibbon;
                        break;
                    case 'otter':
                        Unit = Otter;
                        break;
                    case 'goat':
                        Unit = Goat;
                        break;
                    case 'llama':
                        Unit = Llama;
                        break;
                    case 'sal':
                        Unit = Sal;
                        break;
                    case 'chilla':
                        Unit = Chilla;
                        break;
                    default:
                        Unit = Dog;
                        break;
                }
                const unit = new Unit(this, [0,0], true);
                this.playerUnits.push(unit);
                this.setPlayerTotal();
            }
        }
    }

    makeEnemyUnit(unitName, pos){
        let Unit;
        switch(unitName){
                case 'dog':
                    Unit = Dog;
                    break;
                case 'gibbon':
                    Unit = Gibbon;
                    break;
                case 'otter':
                    Unit = Otter;
                    break;
                case 'goat':
                    Unit = Goat;
                    break;
                case 'llama':
                    Unit = Llama;
                    break;
                case 'sal':
                    Unit = Sal;
                    break;
                case 'chilla':
                    Unit = Chilla;
                    break;
                default:
                    Unit = Dog;
                    break;
            }
        const unit = new Unit(this, pos, false);
        this.enemyUnits.push(unit);
    }

    deleteUnit(unit, player){
        this.grid[unit.spot[0]][unit.spot[1]] =null;
        if(player){
            const spot = this.playerUnits.indexOf(unit);
            this.playerUnits = this.playerUnits.slice(0, spot).concat(this.playerUnits.slice(spot+ 1, this.playerUnits.length));
            if(this.playerUnits.length === 0 && this.waveStarted) this.loseWave();
            if(!this.waveStarted){
                this.setPlayerTotal();
            }
        }else{
            const spot = this.enemyUnits.indexOf(unit);
            this.enemyUnits = this.enemyUnits.slice(0, spot).concat(this.enemyUnits.slice(spot+ 1, this.enemyUnits.length));
            if(this.enemyUnits.length === 0 && this.waveStarted) this.winWave();
        }
    }

}

export default Board;