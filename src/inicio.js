
class Inicio extends Phaser.Scene {
    constructor(){
        super({key: "Inicio"});
    }
    /* init(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    } */
    preload(){
        this.load.image("fondo", "../assets/uno.jpg");
        this.load.image("titulo", "../assets/titulo.png");
        this.load.image("presione", "../assets/presione.png");
        this.load.image("espacio", "../assets/espacio.png");
        this.load.image("empezar", "../assets/empezar.png");
        this.load.spritesheet('quieto', '../assets/quieto2.png', {frameWidth: 90, frameHeight: 103});
        
    }
    create(){
        this.add.image(400,300, "fondo");
        this.titulo = this.add.image(this.sys.game.config.width/2, 150, "titulo");
        this.titulo.setScale(1.5);
        this.add.image(this.sys.game.config.width/2, 350, "presione");
        this.add.image(this.sys.game.config.width/2, 440, "espacio");
        this.add.image(this.sys.game.config.width/2, 520, "empezar");
        
        this.dino = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height-10, 'quieto');
        this.dino.setBounce(0);
        this.dino.setCollideWorldBounds(true);
        this.dino.setGravityY(400);

        this.anims.create({
            key: 'dino_quieto',
            frames: this.anims.generateFrameNumbers('quieto', {
                start: 0,
                end: 3
            }),
            repeat: -1,
            frameRate: 6
        });
        this.dino.anims.play('dino_quieto', true);

        //var text = this.add.text(150, 100, 'Presione espacio', { font: '100px Courier', fill: '#FF9029' });
        //var text2 = this.add.text(190, 160, 'para empezar', { font: '100px Courier', fill: '#FF9029' });

        this.espacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        /*var sd = 1;
        if(sd == 1){
            //console.log('es create');
            this.scene.add("NivelUno", new NivelUno);
            this.scene.start("NivelUno"); 
            }*/
        this.scene.add("NivelUno", new NivelUno);
        this.scene.sendToBack("NivelUno");
    }
    update(time, delta){
        
        if(this.espacio.isDown){
            
            this.scene.start("NivelUno");
        }
    }
    
    
}