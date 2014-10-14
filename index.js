var game = new Phaser.Game(500, 500, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var diamond;
var counter = 0;
var text;
var firstaid;
var baddie;
var baddieG;
var tween;
var star;
var dude;
var total = 0;
var platform;

function preload() {
    game.load.image('diamond', 'assets/diamond.png');
    game.load.image('firstaid', 'assets/firstaid.png');
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('platform', 'assets/platform.png');
}

function create() {
    diamond = game.add.sprite(0, 0, 'diamond');
    diamond.inputEnabled = true;
    diamond.events.onInputDown.add(click, this);
    game.physics.arcade.enable(diamond);
    
    firstaid = game.add.sprite(game.world.randomX, game.world.randomY, 'firstaid');
    game.physics.arcade.enable(firstaid);
    
    star = game.add.sprite(game.world.centerX, game.world.centerY, 'star');
    game.physics.arcade.enable(star);
    star.body.collideWorldBounds = true;
    star.body.gravity.x = game.rnd.integerInRange(-50, 50);
    star.body.gravity.y = 1000;
    star.body.bounce.setTo(0.7, 0.7);
    
    dude = game.add.sprite(50, 50, 'dude');
    dude.animations.add('walk');
    dude.animations.play('walk', 18, true);
    
    platform = game.add.sprite(100, 100, 'platform');
    platform.inputEnabled = true;
    platform.input.enableDrag();
    
    text = game.add.text(20, 20, '', {fill: '#ffffff'});
}

function update() {
    follow();
    several();
    move();
    //overlap();
}

function click() {
    total++;
    text.text = 'click' + total + ' time';
    diamond.body.velocity.y = 150;  
}

function follow() {
    if (game.physics.arcade.distanceToPointer(firstaid, game.input.activePointer) > 8) {
        game.physics.arcade.moveToPointer(firstaid, 300);
    }
}

function several() {
    if (counter < 10) {
        baddieG = game.add.group();
        baddieG.enableBody = true;
        baddie = baddieG.create(40, game.world.randomY, 'baddie');
        game.physics.enable(baddie);
        baddie.animations.add('walk');
        baddie.animations.play('walk', 18, true);
        baddie.body.velocity.x = 1000;
        counter++;
        baddie.inputEnabled = true;
        baddie.events.onInputDown.add(des, this);
        game.physics.setBoundsToWorld();
        baddie.checkWorldBounds = true;
        baddie.events.onOutOfBounds.add(out, this);
    }
} 

function des(baddie) {
    baddie.destroy();
}

function move() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        dude.x -= 4;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        dude.x += 4;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        dude.y -= 4;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        dude.y += 4;
    }
}

function out(baddie) {
    baddie.reset(-32, baddie.y);
    baddie.body.velocity.x = 1000;
}

function overlap () {
    if (checkOverlap (platform, star)) {
        text.text = 'overlap!';
    }
}
/*
function preload() {
    
}

function create() {
    
}

function update() {
    
}*/