
const config = {
    width: 1200,
    height: 720,
    parent: "container",
    type: Phaser.AUTO,
    scene: [Inicio],
    physics:{
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            }
        }
    }
}

new Phaser.Game(config);