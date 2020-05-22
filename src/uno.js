var score = 0;
var t = 2;
class NivelUno extends Phaser.Scene{
    constructor(){
        super({key: "NivelUno", active: true});
        
    }

    preload(){
        this.load.image("fondo", "../assets/xp.jpg");
        this.load.spritesheet('caminar', '../assets/caminar.png', {frameWidth: 90, frameHeight: 103});
        this.load.spritesheet('balon', '../assets/balon1.png', {frameWidth: 340, frameHeight: 339});
        this.load.spritesheet('quieto2', '../assets/quieto2.png', {frameWidth: 90, frameHeight: 103});
    }
    create(){
        
        this.scoreText = null;
        this.add.image(400,300, "fondo");
        this.scoreText = this.add.text(16, 16, 'Puntaje: 0', { font: '32px Arial', fill: '#000' });
        var ex = Phaser.Math.Between(0, this.sys.game.config.width);
        /* for (var i = 0; i < 30; i++){
            var x = Phaser.Math.Between(0, this.sys.game.config.width);
            var y = Phaser.Math.Between(-300, -1500);
            this.balones = this.physics.add.sprite(x, y, 'balon');
            this.balones.setVelocityY(100);
        }       */
        /* for(var i=0;i<t;i++){
            var ejex = Phaser.Math.Between(0, this.sys.game.config.width);
            var ejey = Phaser.Math.Between(0, 500);

            this.balones = this.physics.add.group({
                key: 'balon',
                repeat: 1,
                velocityY: 50,
                setXY: { x: ejex, y: ejey}
            }); 
        } */
        var balones = this.physics.add.group({
            key: 'balon',
            repeat: 10,
            velocityY: 50,
            setXY: { x: 100, y: 0, stepX: 70},
            //frameQuantity: 30,
            
        }); 
        /* var chil = balones.getChildren();
        for(var i = 0; i < chil.length; i++){
            var x = Phaser.Math.Between(0, this.sys.game.config.width);
            var y = Phaser.Math.Between(50, 150);
            chil[i].setPosition(x, y);
            
        }
        balones.refresh(); */

        balones.children.iterate(function (child) {

            child.setVelocityY(Phaser.Math.FloatBetween(50, 200));
            child.setX(Phaser.Math.FloatBetween(5, 1100));
            child.setY(Phaser.Math.FloatBetween(-100, -1000));

        });
        this.caminar = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height-200, 'caminar');
        this.caminar.setGravityY(400);
        this.caminar.setCollideWorldBounds(true);
        this.caminar.setBounce(0.5);

        this.anims.create({
            key: 'dino_camina',
            frames: this.anims.generateFrameNumbers('caminar', {
                start: 0,
                end: 5
            }),
            repeat: -1,
            frameRate: 15
        });

        this.anims.create({
            key: 'dino_quieto',
            frames: this.anims.generateFrameNumbers('quieto2', {
                start: 0,
                end: 3
            }),
            repeat: -1,
            frameRate: 6
        });
        
        this.cursor = this.input.keyboard.createCursorKeys();
        this.physics.add.overlap(balones, this.caminar, this.choque, null, this);

        this.timeTotal = 1000;
        this.timeText = this.add.text(this.sys.game.config.width/2, 50, this.timeTotal + '', { font: '42px Arial Black', fill: '#fff' }); 
    }

    choque(caminar, balones){
        
        balones.disableBody(true, true);
        score += 10;
        this.scoreText.setText('Score: ' + score);
    }

    update(time, delta){
        this.timeText.setText('Time: ' + this.timeTotal--);

        if(this.cursor.right.isDown){
            this.caminar.anims.play('dino_camina', true);
            this.caminar.x++;
            this.caminar.setVelocityX(270);
            //this.caminar.setAccelerationX(20);
            this.caminar.flipX = false;
        }else if(this.cursor.left.isDown){
            this.caminar.anims.play('dino_camina', true);
            this.caminar.x--;
            this.caminar.setVelocityX(-270);
            //this.caminar.setAccelerationX(20);
            this.caminar.flipX = true;
        }else {
            this.caminar.setVelocityX(0);
            this.caminar.anims.play('dino_camina', false);
            this.caminar.anims.play('dino_quieto', true);
        }
        if(this.cursor.up.isDown){
            this.caminar.setVelocityY(-200);
        }else if(this.cursor.down.isDown){
            this.caminar.setVelocityY(200);
        }
    }

    gameOver ()
    {
        this.input.off('gameobjectup');
    }
   
    
}