import Unit from './unit';

class Llama extends Unit{
    constructor(board, pos, player){
        super(board, pos, player, './src/assets/sounds/llama.mp3')
        this.imgMove = './src/assets/units/llamaMove.png';
        this.imgBase = './src/assets/units/llamaStand.png';
        this.imgFight = './src/assets/units/llamaFight.png';
        this.attackImg ='./src/assets/units/llamaAttack.png';
        this.speed = 2;
        this.range = 3;
        this.attack = 10;
        this.health = 50;
        this.unit.src = this.imgBase;
        this.healthBar.innerHTML = this.health;
        this.specialMove = [0,0];
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
        return [topNudge, leftNudge];
    }

    specialMovement(){
        if(this.timer % 30 ===0){
            let addX = 0;
            let addY = 0;
            this.getTarget();
            if(this.target && !this.target.dead){
                this.attackCooldown += 1;
                let y = this.unit.offsetTop - this.target.unit.offsetTop;
                let x = this.unit.offsetLeft - this.target.unit.offsetLeft;
                const h =  Math.sqrt(x**2 + y**2);
                if(h < (this.range * 60)){
                    addX = x /h;
                    addY = y/h;
                }
            }
            let angle = Math.random()*Math.PI*2;
            this.specialMove = [(Math.cos(angle) + addY)*this.speed, (Math.sin(angle) + addX)*this.speed ]
        }
        return this.specialMove;
    }

    moveAttack(){
        this.attackMade.style.top = this.attackMade.offsetTop -  (Math.sin(this.attackDirection)* 5) + 'px'; 
        this.attackMade.style.left = this.attackMade.offsetLeft -  (Math.cos(this.attackDirection) * 5) + 'px'; 
        super.moveAttack();
    }

}

export default Llama;