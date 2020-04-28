class Unit {
    constructor(board){
        this.board = board;
        this.spot = [0,0];
        this.speed = 2;
        this.range = 1;
        this.attack = 10;
        this.health = 100;
        this.imgMove = './src/assets/units/dogrun.jpg';
        this.imgBase = './src/assets/units/dog.jpg';
        this.unit = this.makeUnit();
        this.dragElement(this.unit, this);
        this.move = this.move.bind(this);
        this.target = document.getElementById('targets');
        requestAnimationFrame(this.move);
    }

    move(){
        if(this.target){
            let y = this.unit.offsetTop - this.target.offsetTop;
            let x = this.unit.offsetLeft - this.target.offsetLeft;
            const h =  Math.sqrt(x**2 + y**2);
            if(h > (this.range * 100)){
                x = x /h;
                y = y/h;
                x < 0 ? this.unit.style.transform = 'scaleX(1)' : this.unit.style.transform = 'scaleX(-1)';
                this.unit.style.top = (this.unit.offsetTop - this.speed * y) + "px";
                this.unit.style.left = (this.unit.offsetLeft - this.speed * x) + "px";
                this.unit.src = this.imgMove;
            }
            else{     
                this.unit.src = this.imgBase;
            }
            requestAnimationFrame(this.move)
        }
    }

    makeUnit(num){
        const img = document.createElement('img');
        img.src = this.imgBase;
        img.className ='unit';
        let i = 0;
        let j = 0;
        while(this.board.grid[i][j]){
             i +=1
             if(i > 7){
                 j +=1
                 i =0;
             }
        }
        this.spot =[i,j];
        img.style.top = (i * 100) + 'px';
        img.style.left = (j * 100) + 'px';
        this.board.grid[i][j] = this;
        document.getElementById('board').appendChild(img);
        return img;
    }
     
    dragElement(elmnt, unit) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
          elmnt.onmousedown = dragMouseDown;
      
        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          document.onmousemove = elementDrag;
        }
      
        function elementDrag(e) {
            e.preventDefault();
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
      
        function closeDragElement() {
            elmnt.style.top = Math.max(Math.min(Math.round( (elmnt.offsetTop - pos2)/100)* 100 , 700),0) + "px";
            elmnt.style.left = Math.min(Math.round((elmnt.offsetLeft - pos1)/100)* 100, 300) + "px";
            document.onmouseup = null;
            document.onmousemove = null;
            if(elmnt.offsetLeft < 0){
                unit.deleteSelf();
            }else{
                unit.spot = [elmnt.offsetTop / 100, elmnt.offsetTop/ 100]
                sttart here tomorrow
            }
        }
    }

    deleteSelf(){
        this.board.deleteUnit(this);
        this.unit.remove();
    }
}

export default Unit;