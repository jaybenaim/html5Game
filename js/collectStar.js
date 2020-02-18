// const collectStar = (player, star) => {
//   star.disableBody(true, true);

//   score += 1;
//   scoreText.setText(score);

//   if (stars.countActive(true) === 0) {
//     stars.children.iterate(function(child) {
//       child.enableBody(true, child.x, 0, true, true);
//     });
//     let x =
//       player.x < 100
//         ? Phaser.Math.Between(200, 400)
//         : Phaser.Math.Between(0, 200);

//     let bomb = bombs.create(x, 16, "bomb");
//     bomb.setBounce(1);
//     bomb.setCollideWorldBounds(true);
//     bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
//   }
//   if (stars.countActive(true) === 2) {
//     // CAMERA.scrollY += 100;
//   }
// };
