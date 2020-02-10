const config = {
  type: Phaser.AUTO,
  width: 430,
  height: 1900,
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

let game = new Phaser.Game(config);

const hitBomb = (player, bomb) => {
  lives -= 1;
  livesText.setText(lives);
  score -= 1;
  scoreText.setText(score);

  if (lives <= 0) {
    lives = 3;
    player.setTint(0xff0000);
    player.anims.play("turn");
    // this.physics.pause();
  }
};
