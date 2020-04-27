class Board {
    constructor(){
        this.grid = [];
        this.resetGrid(8);
        this.parent = document.getElementById('board');
        this.buildGrid();
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
                square.className = 'board-square';
                square.style.top = (i * 100) + 'px';
                square.style.left = (j * 100) + 'px';
                square.innerHTML = (`<h1> ${i +1} : ${j + 1} </h1>`)
                this.parent.appendChild(square);
            }
        }
    }
    
    spawnUnit(){

    }
}

export default Board;