import Unit from './unit';

class Chilla extends Unit{
    constructor(board, pos, player){
        super(board, pos, player, './src/assets/sounds/chilla.mp3')
        this.imgMove = './src/assets/units/chillaMove.png';
        this.imgBase = './src/assets/units/chillaStand.png';
        this.imgFight = './src/assets/units/chillaFight.png';
        this.attackImg ='./src/assets/units/chillaAttack.png';
        this.speed = 0;
        this.range = 1;
        this.attack = 1;
        this.health = 10;
        this.unit.src = this.imgBase;
        this.healthBar.innerHTML = this.health;
        this.specialMove = [0,0];
        this.specialTimer = 0;
    }

    checkCollision(){
        let leftNudge = 0;
        let topNudge = 0;
        if(this.unit.offsetLeft < 0){
            leftNudge = -5;
        }else if(this.unit.offsetLeft > 700){
            leftNudge = 5;
        }
        if(this.unit.offsetTop < 0){
            topNudge = -5;
        }else if(this.unit.offsetTop > 700){
            topNudge = 5;
        }
        return [topNudge * window.speed, leftNudge * window.speed];
    }

    specialMovement(){
        this.specialTimer += window.speed;
        if(this.specialTimer > 150){
            
            this.specialTimer = 0;
            const allies = this.player ? this.board.playerUnits : this.board.enemyUnits;
            allies.forEach(ally => {
                ally.health += 5;
                ally.healthBar.innerHTML =  ally.health;
            });
            this.specialMove = [(Math.random() - .5 )*8 * window.speed, (Math.random() - .5 )*8 * window.speed];
            this.changeImg(this.imgFight, true);
        }
        return this.specialMove;
    }

    moveAttack(){
        this.attackMade.style.top = (this.attackMade.offsetTop -  (Math.sin(this.attackDirection)* 1) * window.speed) + 'px'; 
        this.attackMade.style.left = (this.attackMade.offsetLeft -  (Math.cos(this.attackDirection) * 1) * window.speed) + 'px'; 
        super.moveAttack();
    }
}

export default Chilla;