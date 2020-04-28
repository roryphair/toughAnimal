import Unit from './unit';
class Board {
    constructor(playerUnits){
        this.playerUnits = playerUnits
        this.grid = [];
        this.resetGrid(8);
        this.parent = document.getElementById('board');
        this.buildGrid();
        this.makePlayerUnit = this.makePlayerUnit.bind(this);
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
                square.innerHTML = (`<h1> ${i +1} : ${j + 1} </h1>`)
                this.parent.appendChild(square);
            }
        }
    }
    
    makePlayerUnit(e){
        e.preventDefault();
        const unit = new Unit(this);
        this.playerUnits.push(unit);
    }

    deleteUnit(unit){
        this.grid[unit.spot[0]][unit.spot[1]] =null;
        const spot = this.playerUnits.indexOf(unit);
        this.playerUnits = this.playerUnits.slice(0, spot).concat(this.playerUnits.slice(spot+ 1, this.playerUnits.length));

    }

}

export default Board;