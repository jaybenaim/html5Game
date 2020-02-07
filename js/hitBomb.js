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
