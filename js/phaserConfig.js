const config = {
  type: Phaser.AUTO,
  width: 312,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let score = 0;
let scoreText;

let lives = 3;
let livesText;

let player;
let platforms;
let cursors;

let game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("ground", "assets/platform.png");
  this.load.image("star", "assets/star.png");
  this.load.image("bomb", "assets/bomb.png");
  this.load.image("heart", "assets/heart.png");
  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48
  });
}

function create() {
  this.add.image(400, 300, "sky");

  platforms = this.physics.add.staticGroup();

  // floor
  platforms
    .create(400, 568, "ground")
    .setScale(2)
    .refreshBody();
  // left
  platforms
    .create(50, 400, "ground")
    .setScale(0.2)
    .refreshBody();
  // right
  platforms
    .create(250, 350, "ground")
    .setScale(0.2)
    .refreshBody();
  // bottom-middle
  platforms
    .create(180, 500, "ground")
    .setScale(0.2)
    .refreshBody();
  // top-right
  platforms
    .create(250, 60, "ground")
    .setScale(0.2)
    .refreshBody();
  platforms
    .create(50, 200, "ground")
    .setScale(0.2)
    .refreshBody();

  // PLAYER

  player = this.physics.add.sprite(20, 450, "dude");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", {
      start: 5,
      end: 8
    }),
    frameRate: 10,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player, platforms);

  // stars
  stars = this.physics.add.group({
    key: "star",
    repeat: 6,
    setXY: { x: 35, y: 0, stepX: 40 }
  });

  stars.children.iterate(function(child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    child.setBounceX(Phaser.Math.FloatBetween(0.4, 0.8));
    //     setInterval(() => {
    //       child.body.gravity.x = 20;
    //     }, 200);
    //   setInterval(() => {
    //     child.body.gravity.y = -100;
    //   }, 200);
    //   child.setCollideWorldBounds(true);
  });

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);

  this.physics.add.overlap(player, stars, collectStar, null, this);

  // SCORE
  this.add.image(25, 32, "star");
  scoreText = this.add.text(40, 16, "0", {
    fontSize: "32px",
    fill: "#000"
  });
  // LIVES
  this.add.image(105, 32, "heart").setScale(0.7);
  livesText = this.add.text(125, 16, "3", {
    fontSize: "32px",
    fill: "#000"
  });
  // BOMBS
  bombs = this.physics.add.group();

  this.physics.add.collider(bombs, platforms);

  this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update() {
  let pointer = game.input.activePointer;
  // TOUCH EVENTS
  if (pointer.isDown) {
    if (pointer.x <= 156 || cursors.left.isDown) {
      player.setVelocityX(-130);

      player.anims.play("left", true);
    } else if (pointer.x >= 157 || cursors.right.isDown) {
      player.setVelocityX(130);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn", true);
    }
    if (pointer.y <= 300 && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  } else {
    // ARROW KEYS
    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn", true);
    }
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
}

const collectStar = (player, star) => {
  star.disableBody(true, true);

  score += 1;
  scoreText.setText(score);

  if (stars.countActive(true) === 0) {
    stars.children.iterate(function(child) {
      child.enableBody(true, child.x, 0, true, true);
    });
    let x =
      player.x < 100
        ? Phaser.Math.Between(200, 400)
        : Phaser.Math.Between(0, 200);

    let bomb = bombs.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
};

const hitBomb = (player, bomb) => {
  lives -= 1;
  livesText.setText(lives);
  if (lives <= 0) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    gameOver = true;
  }
};
