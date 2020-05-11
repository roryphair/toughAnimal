import Unit from './unit';

class Dog extends Unit{
    constructor(board, pos, player){
        super(board, pos, player, './src/assets/sounds/dog.mp3')
        this.soundBase = './src/assets/sounds/dogBark.mp3'; 
        this.imgMove = './src/assets/units/dogMove.png';
        this.imgBase = './src/assets/units/dogStand.png';
        this.imgFight = './src/assets/units/dogFight.png';
        this.attackImg ='./src/assets/units/dogAttack.png';
        this.speed = 2;
        this.range = 1;
        this.attack = 10;
        this.health = 100;
        this.sound.volume = 0.2;
        this.unit.src = this.imgBase;
        this.healthBar.innerHTML = this.health;
        this.attackTimer = 0;
        this.attackMade = null;
        
    }

    moveAttack(){
        this.attackMade.style.top = (this.attackMade.offsetTop -  (Math.sin(this.attackDirection)* 2) * window.speed) + 'px'; 
        this.attackMade.style.left = (this.attackMade.offsetLeft -  (Math.cos(this.attackDirection) * 2) * window.speed) + 'px'; 
        super.moveAttack();
    }

}

export default Dog;