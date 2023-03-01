(function(window, createjs, opspark, _) {

  // Variable declarations for libraries and the game engine
  const
    draw = opspark.draw, // library for drawing using createJS
    physikz = opspark.racket.physikz, // library for defining physics properties like velocity
    engine = opspark.V6().activateResize(), // game engine for actively rendering + running the game's mechanics
    canvas = engine.getCanvas(), // object for referencing the height / width of the window
    stage = engine.getStage(); // object to hold all visual components

  // load some sounds for the demo - play sounds using: createjs.Sound.play("wall");
  createjs.Sound.on("fileload", handleLoadComplete);
  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.registerSounds([{ src: "hit.ogg", id: "hit" }, { src: "wall.ogg", id: "wall" }], "assets/sounds/");

  function handleLoadComplete(event) {
    console.log('sounds loaded');
  }

  engine
    .addTickHandlers(update) // establish the update function as the callback for every timer tick
    .activateTick();

  // Variable declarations for the paddles and the ball which are drawn using createJS (see bower_components/opspark-draw/draw.js)
  //scores
  var playerScore = 0;
  var CPUScore = 0;
  
  const
    paddlePlayer = createPaddle(),
    paddleCPU = createPaddle({ x: canvas.width - 30, y: canvas.height - 100 }),
    ball = draw.circle(20, '#CCC'),
    //attempt to create score text boxes
    CPUTxtScore = draw.textfield(CPUScore, "15px Arial", "#000000", "center", "top", (canvas.width/2 + 20), 40),
    playerText = draw.textfield(playerScore, "15px Arial", "#000000", "center", "top", (canvas.width/2 - 20), 40);
    
  // set initial properties for the paddles 
  paddlePlayer.yVelocity = 0;
  paddleCPU.yVelocity = 6;

  // set initial properties for the ball
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.xVelocity = 5;
  ball.yVelocity = 5;

  // add the paddles and the ball to the view
  stage.addChild(paddlePlayer, paddleCPU, ball);

  // program can detect key presses and releases
  document.addEventListener('keyup', onKeyUp);
  document.addEventListener('keydown', onKeyDown);

  // when an Arrow key is pressed down, set the paddle in motion
  function onKeyDown(event) {
    if (event.key === 'ArrowUp') {
      paddlePlayer.yVelocity = -10;
    } else if (event.key === 'ArrowDown') {
      paddlePlayer.yVelocity = 10;
    }
  }

  // when either the Arrow Up or Arrow Down key are released, stop the paddle from moving
  function onKeyUp(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      paddlePlayer.yVelocity = 0;
    }
  }


  function update(event) {
    const
      boundsCPU = paddleCPU.getBounds(),
      widthCPU = boundsCPU.width,
      heightCPU = boundsCPU.height,
      midCPU = heightCPU / 2,
      boundsPlayer = paddlePlayer.getBounds(),
      widthPlayer = paddlePlayer.width,
      heightPlayer = paddlePlayer.height;

    // Ball movement: the xVelocity and yVelocity is the distance the ball moves per update
    ball.x = ball.x + ball.xVelocity;
    ball.y = ball.y + ball.yVelocity;

    // Player movement //
    paddlePlayer.y += paddlePlayer.yVelocity;
    if (paddlePlayer.y < 0) {
      paddlePlayer.y = 0;
    }
    if (paddlePlayer.y > canvas.height - paddlePlayer.height) {
      paddlePlayer.y = canvas.height - heightPlayer;
    }

    // AI movement: CPU follows ball //
    if ((paddleCPU.y + midCPU) < (ball.y - 14)) {
      paddleCPU.y += paddleCPU.yVelocity;
    } else if ((paddleCPU.y + midCPU) > (ball.y + 14)) {
      paddleCPU.y -= paddleCPU.yVelocity;
    }

    // TODO 1: bounce the ball off the top
    if (ball.y < 0){
      ball.yVelocity *= -1;
      createjs.Sound.play("wall");
    }

    // TODO 2: bounce the ball off the bottom
    if (ball.y > canvas.height){
      ball.yVelocity *= -1;
      createjs.Sound.play("wall");
    }

    // TODO 3: bounce the ball off each of the paddles
    if ((ball.y > paddleCPU.y &&              //  ball is below the top of the paddle
      ball.y < (paddleCPU.y + heightCPU)) &&  //  ball is above the bottom of the paddle
      ((ball.x + 20) > paddleCPU.x &&         //  right side of the ball is past the left side of the paddle
      ball.x < (paddleCPU.x + widthCPU)) &&   //  left side of the ball has not past the right side of the paddle
      ball.xVelocity > 0)                     //  ball is travelling to the right
      {
      createjs.Sound.play("hit");
      ball.xVelocity *= -1;
    }

    if ((ball.y > paddlePlayer.y &&
      ball.y < (paddlePlayer.y + heightPlayer)) &&
      (ball.x < (paddlePlayer.x + widthPlayer) &&
      (ball.x + 20) > paddlePlayer.x)
      && ball.xVelocity < 0)
      {
      createjs.Sound.play("hit");
      ball.xVelocity *= -1;
    }

    // Ball resets when out of bounds
    if (ball.x < 0){
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.xVelocity = 5;
      ball.yVelocity = 5;
      //attempt to update the CPU text score
      CPUScore++;
      draw.textfield(CPUScore, "15px Arial", "#666666", "center", "top", (canvas.width/2 + 20), 40);
    }
    
    if (ball.x > canvas.width){
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.xVelocity = 5;
      ball.yVelocity = 5;
      //attempt to update the player text score
      playerScore++;
      draw.textfield(playerScore, "15px Arial", "#666666", "center", "top", (canvas.width/2 - 20), 40);
    }

  }

  function checkCollision(ballWidth){
    if (ball.y < 0){
      ball.yVelocity *= -1;
    }

    if (ball.y > canvas.height){
      ball.yVelocity *= -1;
    }

    if ((ball.y > paddleCPU.y && ball.y < (paddleCPU.y + widthCPU)) && ((ball.x + 20) > paddleCPU.x && ball.x < (paddleCPU.x + widthCPU)) && ball.xVelocity > 0){ 
      ball.xVelocity *= -1;   //  The ball will bounce off the CPU if it falls within its height AND reaches its x position
    }

    if ((ball.y > paddlePlayer.y && ball.y < (paddlePlayer.y + widthPlayer)) && (ball.x < (paddlePlayer.x + widthPlayer) && (ball.x + 20) > paddlePlayer.x) && ball.xVelocity < 0){  //  The ball will bounce off the Player if it falls within its height AND reaches its x position
      ball.xVelocity *= -1;   //  The ball will bounce off the Player if it falls within its height AND reaches its x position
    }
  }

  // helper function that wraps the draw.rect function for easy paddle making
  function createPaddle({ width = 20, height = 100, x = 0, y = 0, color = '#CCC' } = {}) {
    const paddle = draw.rect(width, height, color);
    paddle.x = x;
    paddle.y = y;
    return paddle;
  }


}(window, window.createjs, window.opspark, window._));
