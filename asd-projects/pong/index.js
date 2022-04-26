/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects

  var KEY = {
    W: 87,
    S: 83,
    UP: 38,
    DOWN: 40,
    SPACE: 32
  }

  function createGameItem(id, speedX, speedY){
    let obj = {}
    obj.id = id;
    obj.x = parseFloat($(obj.id).css("left"));
    obj.y = parseFloat($(obj.id).css("top"));
    obj.speedX = speedX;
    obj.speedY = speedY;
    return obj;
  }
  
  var player1 = createGameItem("#paddle1", 0, 0);
  var player2 = createGameItem("#paddle2", 0, 0);

  var score1 = 0;
  $("#score1").text(score1);

  var score2 = 0;
  $("#score2").text(score2);

  var ball = createGameItem("#ball", 5, 5);

  // one-time setup
  
  startBall();

  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveBall();
    
    repositionPaddles();
    paddleBoundaries();

    ballCollisions();
    
    redrawElements();

    if (ball.speedX === 0){
      startBall();
    }

    if (score1 === 5 || score2 === 5){
      if (score1 === 5){
        $("#score1").text("WIN!");
        $("#score2").text("LOSE!");
        endGame();
      }
      else {
        $("#score1").text("LOSE!");
        $("#score2").text("WIN!");
        endGame();
      }
    }
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    var keycode = event.which;
    // player 1 controls
    if (keycode === KEY.W) {
      player1.speedY = -10;
    }
    if (keycode === KEY.S) {
      player1.speedY = 10;
    }
    // player 2 controls
    if (keycode === KEY.UP) {
      player2.speedY = -10
    }
    if (keycode === KEY.DOWN) {
      player2.speedY = 10
    }
  }

  function handleKeyUp(event){
    var keycode = event.which;

    if (keycode === KEY.W | keycode === KEY.S){
      player1.speedY = 0;
    }
    if (keycode === KEY.UP | keycode === KEY.DOWN){
      player2.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function startBall(){
    ball.x = 430;
    ball.y = 210;
    ball.speedX = (Math.random() * 3 + 4) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() * 3 + 4) * (Math.random() > 0.5 ? -1 : 1);
  }

  function moveBall(){
    ball.x -= ball.speedX;
    ball.y += ball.speedY;
  }

  function repositionPaddles(){
    player1.y += player1.speedY;
    player2.y += player2.speedY;
  }

  function paddleBoundaries(){
    if (player1.y < 0){
      player1.y = 0;
    }
    if (player1.y > 360){
      player1.y = 360;
    }
    if (player2.y < 0){
      player2.y = 0;
    }
    if (player2.y > 360){
      player2.y = 360;
    }
  }

  function ballCollisions() {
    if (ball.x <= 0 || (ball.x + 20) >= 880) {
      ball.speedX = 0;
      ball.speedY = 0;

      if (ball.x < player1.x){
        score2 += 1;
        $("#score2").text(score2);
      }
      else if (ball.x > (player2.x+20)){
        score1 += 1;
        $("#score1").text(score1);
      }

    }
    if (ball.y <= 0 || (ball.y + 20) >= 440){
      ball.speedY = ball.speedY * -1;
    }
    if (((ball.x <= (player1.x + 20) && ball.x > (player1.x + 15)) && (ball.y <= (player1.y + 80) && (ball.y + 20) >= player1.y)) || ((ball.x + 20) >= player2.x && ball.x < player2.x + 5) && (ball.y <= (player2.y + 80) && (ball.y + 20) >= player2.y) ){
      ball.speedX = ball.speedX * -1;
    }
  }

  function redrawElements(){
    $(player1.id).css("top", player1.y);
    $(player2.id).css("top", player2.y);
    $(ball.id).css("top", ball.y);
    $(ball.id).css("left", ball.x);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
