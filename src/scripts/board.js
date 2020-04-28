import Unit from './unit';
class Board {
    constructor(playerUnits, enemyUnits){
        this.playerUnits = playerUnits;
        this.enemyUnits = enemyUnits;
        this.grid = [];
        this.resetGrid(8);
        this.parent = document.getElementById('board');
        this.buildGrid();
        this.makePlayerUnit = this.makePlayerUnit.bind(this);
        this.makeEnemyUnit = this.makeEnemyUnit.bind(this);
        this.makeWave()
        this.startFight = this.startFight.bind(this);
    }

    startFight(e){
        e.preventDefault();
        this.playerUnits.forEach(player => player.startFight());
        this.enemyUnits.forEach(enemy => enemy.startFight());
    }
    endFight(){
        this.playerUnits.forEach(player => player.endFight());
        this.enemyUnits.forEach(enemy => enemy.endFight());
    }

    makeWave(){
        this.makeEnemyUnit([4,5]);
        this.makeEnemyUnit([7,6]);
        this.makeEnemyUnit([1,7]);
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
            for (let j = 0; j < this.grid.length; j++) {
                const square = document.createElement('div');
                if(j < 4){
                    square.className = 'board-square-player';
                }
                else{
                    square.className = 'board-square-enemy';
                }
                square.style.top = (i * 100) + 'px';
                square.style.left = (j * 100) + 'px';
                this.parent.appendChild(square);
            }
        }
    }
    
    makePlayerUnit(e){
        e.preventDefault();
        const unit = new Unit(this, [0,0], true);
        this.playerUnits.push(unit);
    }

    makeEnemyUnit(pos){
        const unit = new Unit(this, pos, false);
        this.enemyUnits.push(unit);
    }

    deleteUnit(unit, player){
        this.grid[unit.spot[0]][unit.spot[1]] =null;
        if(player){
            const spot = this.playerUnits.indexOf(unit);
            this.playerUnits = this.playerUnits.slice(0, spot).concat(this.playerUnits.slice(spot+ 1, this.playerUnits.length));
            if(this.playerUnits.length === 0) this.endFight();
        }else{
            const spot = this.enemyUnits.indexOf(unit);
            this.enemyUnits = this.enemyUnits.slice(0, spot).concat(this.enemyUnits.slice(spot+ 1, this.enemyUnits.length));
            if(this.enemyUnits.length === 0) this.endFight();
        }
    }

}

export default Board;