import Unit from './unit';

class Otter extends Unit{
    constructor(board, pos, player){
        super(board, pos, player, './src/assets/sounds/otter.mp3')
        this.imgMove = './src/assets/units/otterMove.png';
        this.imgBase = './src/assets/units/otterStand.png';
        this.imgFight = './src/assets/units/otterFight.png';
        this.attackImg ='./src/assets/units/otterAttack.png';
        this.speed = 4;
        this.range = 1;
        this.attack = 20;
        this.health = 30;
        this.sound.volume = 0.07;
        this.unit.src = this.imgBase;
        this.healthBar.innerHTML = this.health;
    }

    getTarget(){
        const enemies = this.player ? this.board.enemyUnits : this.board.playerUnits;
        if(enemies.length > 0){
            const randNum = Math.floor(Math.random() * enemies.length)
            this.target = enemies[randNum];
        }else{
            this.target = null;
        }
    }

    attackTarget(){
        super.attackTarget();
        this.getTarget();
    }

    moveAttack(){
        super.moveAttack();
        this.attackMade.style.top = this.attackMade.offsetTop -  (Math.sin(this.attackDirection)* 2) + 'px'; 
        this.attackMade.style.left = this.attackMade.offsetLeft -  (Math.cos(this.attackDirection) * 2) + 'px'; 
    }

}

export default Otter;