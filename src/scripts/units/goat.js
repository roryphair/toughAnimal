import Unit from './unit';

class Goat extends Unit{
    constructor(board, pos, player){
        super(board, pos, player, './src/assets/sounds/goat.mp3')
        this.imgMove = './src/assets/units/goatMove.png';
        this.imgBase = './src/assets/units/goatStand.png';
        this.imgFight = './src/assets/units/goatFight.png';
        this.attackImg ='./src/assets/units/goatAttack.png';
        this.speed = 2;
        this.range = 1.3;
        this.attack = 15;
        this.health = 50;
        this.unit.src = this.imgBase;
        this.healthBar.innerHTML = this.health;
    }

    // getTarget(){
    //     const enemies = this.player ? this.board.enemyUnits : this.board.playerUnits;
    //     if(enemies.length > 0){
            
    //         this.target = enemies[0]
    //         let xTarg = this.unit.offsetLeft - this.target.unit.offsetLeft;
    //         let yTarg = this.unit.offsetTop - this.target.unit.offsetTop ;
    //         let hTarg =  Math.sqrt(xTarg**2 + yTarg**2);
    //         enemies.forEach(enemy => {
    //             const xNew = this.unit.offsetLeft - enemy.unit.offsetLeft;
    //             const yNew = this.unit.offsetTop - enemy.unit.offsetTop ;
    //             const hNew =  Math.sqrt(xNew**2 + yNew**2);
    //             if(hNew > hTarg){
    //                 this.target = enemy;
    //                 hTarg = hNew;
    //             }
    //         });
    //     }else{
    //         this.target = null;
    //     }
    // }

    startFight(){
        let x = (7 - this.spot[0]) % 8;
        let y  = (7 - this.spot[1]) % 8;
        this.unit.style.top = (x * 100) + 'px';
        this.unit.style.left = (y * 100) + 'px';
        this.setHealthBar();
        super.startFight();
    }

    moveAttack(){
        this.attackMade.style.top = (this.attackMade.offsetTop -  (Math.sin(this.attackDirection)* 2) * window.speed) + 'px'; 
        this.attackMade.style.left = (this.attackMade.offsetLeft -  (Math.cos(this.attackDirection) * 2) * window.speed) + 'px'; 
        super.moveAttack();
    }


}

export default Goat;