function update() {
  let pointer = game.input.activePointer;
  // TOUCH EVENTS
  if (pointer.isDown) {
    if (pointer.x <= 225 || cursors.left.isDown) {
      player.setVelocityX(-130);

      player.anims.play("left", true);
    } else if (pointer.x >= 226 || cursors.right.isDown) {
      player.setVelocityX(130);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn", true);
    }
    if (pointer.y <= 400 && player.body.touching.down) {
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
