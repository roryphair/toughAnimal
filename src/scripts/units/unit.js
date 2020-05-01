class Unit {
    constructor(board, pos, player, sound){
        this.player = player;
        this.board = board;
        this.spot = [0,0];
        this.dead = false;
        this.healthBar = null;
        this.sound = null;
        this.makeUnit(pos, sound);
        this.fight = false;
        if(player) this.dragElement(this.unit, this);
        this.move = this.move.bind(this);
        this.target = null;
        this.attackCooldown = 0;
        this.timer = Math.floor( Math.random() * 100);
        this.imgChange = -35;
        this.dieSound = './src/assets/sounds/die.mp3';
        this.attackImg ='./src/assets/units/dogAttack.png';
        this.attackTimer = 0;
        this.attackMade = null;
        this.moveAttack = this.moveAttack.bind(this);
        this.attackDirection = 0;
        this.wiggle = this.wiggle.bind(this);
        requestAnimationFrame(this.wiggle);
    }

    wiggle(){
        if(!this.dead && !this.fight){
            this.timer +=1;
            const numb = Math.sin(this.timer/15) * 10;
            const numb2 = Math.sin(this.timer/ 12)/22;
            const numb3 = Math.sin(this.timer/ 9)/27;
            this.unit.style.transform = `rotate(${numb}deg) scaleX(${1 + numb2}) scaleY(${1 + numb3})`;

            requestAnimationFrame(this.wiggle)
        }
        else{
            this.timer = 0;
            this.unit.style.transform = ``;
        }
    }

    startFight(){
        this.getTarget();
        this.fight = true;
        requestAnimationFrame(this.move);
    }

    changeImg(newImg, force = null){
        if((this.timer > (this.imgChange + 60)) || force){
            this.imgChange = this.timer;
            this.unit.src = newImg;
        }
    }

    endFight(){
        this.fight = false;
        this.changeImg(this.imgBase, true);
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

    checkCollision(){
        let leftNudge = 0;
        let topNudge = 0;
        const totalUnits = [...this.board.bothUnits];
        totalUnits.forEach( enemy => {
            if(enemy !== this){
                const leftClose = enemy.unit.offsetLeft - this.unit.offsetLeft;
                const topClose = enemy.unit.offsetTop- this.unit.offsetTop;
                const dist =  Math.sqrt(leftClose**2 + topClose**2);
            if(dist === 0){
                topNudge = 1;
                leftNudge = 1;
            }
            else if (dist < 90){
                leftNudge += leftClose/dist;
                topNudge += topClose/dist ;
            }
            }
        })
        if(this.unit.offsetLeft < 0){
            leftNudge = -2;
        }else if(this.unit.offsetLeft > 700){
            leftNudge = 2;
        }
        if(this.unit.offsetTop < 0){
            topNudge = -2;
        }else if(this.unit.offsetTop > 700){
            topNudge = 2;
        }
        return [topNudge, leftNudge];
    }

    move(){
        if(this.fight ){
            if(this.dead){
                this.timer +=1
                this.unit.style.opacity = `${100 - this.timer*2}%`;
                if(this.timer > 50){
                    this.deleteSelf();
                }else{
                    requestAnimationFrame(this.move);
                } 
            }else{
                this.timer += 1;
                const nudge = this.checkCollision();
                const topNudge = nudge[0];
                const leftNudge = nudge[1];
                if(this.target && !this.target.dead){
                    this.attackCooldown += 1;
                    let y = this.unit.offsetTop - this.target.unit.offsetTop;
                    let x = this.unit.offsetLeft - this.target.unit.offsetLeft;
                    const h =  Math.sqrt(x**2 + y**2);
                    if(h > (this.range * 130)){
                        x = x /h;
                        y = y/h;
                        x < 0 ? this.unit.style.transform = 'scaleX(1)' : this.unit.style.transform = 'scaleX(-1)';

                        this.changeImg(this.imgMove,true);
                        this.setHealthBar();
                    }
                    else{
                        x = (Math.random()-0.5);
                        y = (Math.random()-0.5);
                        if(this.attackCooldown > 90){
                            this.attackTarget()
                            this.changeImg(this.imgFight, true);
                            this.attackCooldown= 0;
                        }
                        else{   
                            this.changeImg( this.imgBase);
                        }
                        
                    }
                    const special = this.specialMovement();
                    this.unit.style.top = (this.unit.offsetTop - topNudge - this.speed * y + special[0]) + "px";
                    this.unit.style.left = (this.unit.offsetLeft - leftNudge - this.speed * x + special[1] ) + "px";
                    this.setHealthBar();
                    requestAnimationFrame(this.move)
                } else{
                    this.getTarget();
                    requestAnimationFrame(this.move)
                }
            }
        }
    }

    specialMovement(){
        return[0,0];
    }

    attackTarget(){
        this.createAttack();
        this.target.takeDamage(this.attack);
        if(window.soundsOn) this.sound.play();
    }

      
    createAttack(){
        this.attackTimer = 0;
        const attack = document.createElement('img');
        attack.className = this.player ? 'player-attack ' : 'enemy-attack';
        attack.src = this.attackImg;
        let y = this.unit.offsetTop - this.target.unit.offsetTop;
        let x = this.unit.offsetLeft - this.target.unit.offsetLeft;
        let deg = Math.atan2( y,x);
        this.attackDirection = deg;
        attack.style.top = (this.unit.offsetTop - (Math.sin(deg)*40)) + 'px';
        attack.style.left = (this.unit.offsetLeft - (Math.cos(deg)*40)) + 'px';
        deg = deg * (180 / Math.PI) - 90;
        attack.style.transform=  `rotate(${deg}deg)`;
        this.attackMade = attack;
        this.attackMade.style.opacity = 0;
        this.board.background.append(attack);
        requestAnimationFrame(this.moveAttack)
    }

    moveAttack(){
        this.attackTimer +=1
        if(this.attackTimer > 45){
            this.attackMade.remove();
            this.attackMade = null;
        }
        else{
            requestAnimationFrame(this.moveAttack)
            if(this.attackTimer < 5){
                this.attackMade.style.opacity = (20 * this.attackTimer) + '%';
            }else if (this.attackTimer > 40 ){
                this.attackMade.style.opacity = (100 - (20 * (this.attackTimer-40))) + '%';
            }
        }
    }

    takeDamage(amount){
        if(this.health > 0){
            this.health -= amount;
            this.healthBar.innerHTML = this.health;
            if(this.health <= 0){
                this.healthBar.innerHTML = '';
                this.dead = true;
                this.timer = 0;
                            if(window.soundsOn) {
                                this.sound.volume = 0.1;
                                this.sound.src= this.dieSound;
                                this.sound.play()};
            }
        }
    }

    makeUnit(pos, soundBase){
        const img = document.createElement('img');
        const healthBar = document.createElement('h2');
        const sound = document.createElement('audio');
        sound.src = soundBase;
        sound.volume = 0.1;
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
                     j = 4;
                 }
             }
        }
        this.spot =[i,j];
        img.style.top = (i * 100) + 'px';
        img.style.left = (j * 100) + 'px';
        this.board.grid[i][j] = this;
        this.healthBar = healthBar;
        this.sound = sound;
        img.appendChild(sound);
        document.getElementById('board').appendChild(img);
        document.getElementById('board').appendChild(healthBar);
        this.unit = img;
        this.setHealthBar();
        if(window.soundsOn && this.player) sound.play();
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
          unit.setHealthBar()
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
        this.healthBar.style.top = (this.unit.offsetTop - 30) + 'px';
        this.healthBar.style.left = (this.unit.offsetLeft + 30) + 'px';
    }

    deleteSelf(){
        this.board.deleteUnit(this , this.player);
        this.removeSelf();
    }

    removeSelf(){
        this.fight = false;
        if(this.attackMade) this.attackMade.remove();
        if(this.sound) this.sound.remove();
        this.sound = null;
        this.unit.remove();
        if(this.healthBar)this.healthBar.remove();
        this.healthBar = null;
        this.target = null;
    }
}

export default Unit;
