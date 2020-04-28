class Unit {
    constructor(board, pos, player){
        this.player = player;
        this.board = board;
        this.spot = [0,0];
        this.speed = 2;
        this.range = 1;
        this.attack = 10;
        this.health = 100;
        this.dead = false;
        this.imgMove = './src/assets/units/dogMove.png';
        this.imgBase = './src/assets/units/dogStand.png';
        this.imgFight = './src/assets/units/dogFight.png';
        this.img = null;
        this.healthBar = null;
        this.makeUnit(pos);
        this.fight = false;
        if(player) this.dragElement(this.unit, this);
        this.unit.src = this.imgBase;
        this.move = this.move.bind(this);
        this.target = null;
        this.inRange = 0;
    }

    startFight(){
        this.getTarget();
        this.fight = true;
        requestAnimationFrame(this.move);
    }

    endFight(){
        this.fight = false;
    }

    getTarget(){
        const enemies = this.player ? this.board.enemyUnits : this.board.playerUnits;
        if(enemies.length > 0){
            
            this.target = enemies[0]
            let xTarg = this.unit.offsetLeft - this.target.unit.offsetLeft;
            let yTarg = this.unit.offsetTop - this.target.unit.offsetTop ;
            let hTarg =  Math.sqrt(xTarg**2 + yTarg**2);
            enemies.forEach(enemy => {
                const xNew = this.unit.offsetLeft - enemy.unit.offsetLeft;
                const yNew = this.unit.offsetTop - enemy.unit.offsetTop ;
                const hNew =  Math.sqrt(xNew**2 + yNew**2);
                if(hNew < hTarg){
                    this.target = enemy;
                    hTarg = hNew;
                }
            });
        }else{
            this.target = null;
        }
    }

    move(){
        if(this.fight && !this.dead){
            if(this.target && !this.target.dead){
                let y = this.unit.offsetTop - this.target.unit.offsetTop;
                let x = this.unit.offsetLeft - this.target.unit.offsetLeft;
                const h =  Math.sqrt(x**2 + y**2);
                if(h > (this.range * 100)){
                    this.inRange = 0;
                    x = x /h;
                    y = y/h;
                    x < 0 ? this.unit.style.transform = 'scaleX(1)' : this.unit.style.transform = 'scaleX(-1)';
                    this.unit.style.top = (this.unit.offsetTop - this.speed * y) + "px";
                    this.unit.style.left = (this.unit.offsetLeft - this.speed * x) + "px";
                    this.unit.src = this.imgMove;
                    this.setHealthBar();
                }
                else{
                    this.inRange += 1;
                    if(this.inRange > 30){
                        this.attackTarget()
                        this.unit.src = this.imgFight;
                        this.inRange= 0;
                    }
                }
                requestAnimationFrame(this.move)
            } else{
                this.getTarget();
                requestAnimationFrame(this.move)
            }
        }else{
            this.unit.src = this.imgBase;
        }
    }

    attackTarget(){
        this.target.takeDamage(this.attack);
    }

    takeDamage(amount){
        if(this.health > 0){
            this.health -= amount;
            this.healthBar.innerHTML = this.health;
            if(this.health <= 0){
                this.deleteSelf()
            }
        }
    }

    makeUnit(pos){
        const img = document.createElement('img');
        const healthBar = document.createElement('h2');
        img.src = this.imgBase;
        healthBar.innerHTML = this.health;
        healthBar.className = 'health-bar';
        if(this.player){
            img.className ='unit player';
        }else{
            img.className ='unit enemy';
        }
        let i = pos[0];
        let j = pos[1];
        while(this.board.grid[i][j]){
             i +=1
             if(i > 7){
                 j +=1
                 i =0;
                 if(j > 7){
                     j = 0;
                 }
             }
        }
        this.spot =[i,j];
        img.style.top = (i * 100) + 'px';
        img.style.left = (j * 100) + 'px';
        this.board.grid[i][j] = this;
        this.healthBar = healthBar;
        document.getElementById('board').appendChild(img);
        document.getElementById('board').appendChild(healthBar);
        this.unit = img;
        this.setHealthBar();
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
        if(!unit.fight){
            e.preventDefault();
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
        }
      
        function closeDragElement() {
            
        if(!unit.fight){
                elmnt.style.top = Math.max(Math.min(Math.round( (elmnt.offsetTop - pos2)/100)* 100 , 700),0) + "px";
                elmnt.style.left = Math.min(Math.round((elmnt.offsetLeft - pos1)/100)* 100, 300) + "px";
                document.onmouseup = null;
                document.onmousemove = null;
                if(elmnt.offsetLeft < 0){
                    unit.deleteSelf();
                }else{
                unit.place([elmnt.offsetTop / 100, elmnt.offsetLeft/ 100])
                    
                }
            }
        }
    }

    place(newSpot){
        const oldSpot = this.spot;
        this.board.grid[this.spot[0]][this.spot[1]] = null;
        if(this.board.grid[newSpot[0]][newSpot[1]]){
            
            const switchers = this.board.grid[newSpot[0]][newSpot[1]];
            switchers.place(oldSpot)
        }
        this.spot = newSpot
        
        this.setCords();
    }

    setCords(){
        this.board.grid[this.spot[0]][this.spot[1]] = this;
        this.unit.style.top = (this.spot[0] * 100) + 'px';
        this.unit.style.left = (this.spot[1] * 100) + 'px';
        this.setHealthBar();
    }

    setHealthBar(){
        this.healthBar.style.top = (this.unit.offsetTop - 50) + 'px';
        this.healthBar.style.left = (this.unit.offsetLeft + 30) + 'px';
    }

    deleteSelf(){
        this.dead = true;
        this.board.deleteUnit(this , this.player);
        this.unit.remove();
        this.healthBar.remove();
    }
}

export default Unit;