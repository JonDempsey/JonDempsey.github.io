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

  //  Every key press that will be analyzed
  var KEY = {
    W: 87,
    S: 83,
    UP: 38,
    DOWN: 40,
  }

  //  Creates any object that will be moving in some form
  function createGameItem(id, speedX, speedY){
    let obj = {}
    obj.id = id;
    obj.x = parseFloat($(obj.id).css("left"));
    obj.y = parseFloat($(obj.id).css("top"));
    obj.speedX = speedX;
    obj.speedY = speedY;
    return obj;
  }
  
  //  Creates Paddles
  var player1 = createGameItem("#paddle1", 0, 0);
  var player2 = createGameItem("#paddle2", 0, 0);

  //  variables containing scores
  var score1 = 0;
  $("#score1").text(score1);
  var score2 = 0;
  $("#score2").text(score2);

  //  one-time setup
  
  //  places ball in center with random speed and direction
  startBall();

  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // Detects key presses
  $(document).on('keyup', handleKeyUp);                               // Detects key releases
  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveBall();                                           ////  Movement of all game items
                                                            //
    repositionPaddles();                                    //
    paddleBoundaries();                                     //
                                                            //
    ballCollisions();                                       //
                                                            //
    redrawElements();                                     ////

    if (score1 === 5 || score2 === 5){    //  if either player reaches the goal of 5 points,
      if (score1 === 5){                              //  if player 1 wins
        $("#score1").text("WIN!");                            //  declare the winner and loser
        $("#score2").text("LOSE!");
        endGame();
      }
      else {                                                  //  if player 2 wins
        $("#score1").text("LOSE!");                           //  declare the winner and loser
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

  function handleKeyUp(event){                    //  makes sure paddles stop when keys aren't held down
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
    ball.x = 430;     //  Center Ball
    ball.y = 210;     //
    ball.speedX = (Math.random() * 3 + 4) * (Math.random() > 0.5 ? -1 : 1);   //  Give ball random speed and direction
    ball.speedY = (Math.random() * 3 + 4) * (Math.random() > 0.5 ? -1 : 1);   //
  }

  function moveBall(){            //  change ball's location value
    ball.x -= ball.speedX;
    ball.y += ball.speedY;
  }

  function repositionPaddles(){   //  change paddles' location values
    player1.y += player1.speedY;
    player2.y += player2.speedY;
  }

  function paddleBoundaries(){    //  detects player trying to pass top or bottom of board, and blocks them
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
    if (ball.x <= 0 || (ball.x + 20) >= 880) {    //  if ball hits either left or right side, reset position and assign score
      ball.speedX = 0;
      ball.speedY = 0;

      if (ball.x < player1.x){                    //  if ball lands behind player 1
        score2 += 1;                      //  give player 2 a point
        $("#score2").text(score2);
      }
      else if (ball.x > (player2.x+20)){          //  if ball lands behind player 2
        score1 += 1;                      //  give player 1 a point
        $("#score1").text(score1);
      }
      
      startBall();
    }

    //  bounce on top or bottom
    if (ball.y <= 0 || (ball.y + 20) >= 440){
      ball.speedY = ball.speedY * -1;
    }

    //  bounce on paddles if edge touches first five pixels
    if (((ball.x <= (player1.x + 20) && ball.x > (player1.x + 15)) && (ball.y <= (player1.y + 80) && (ball.y + 20) >= player1.y)) || ((ball.x + 20) >= player2.x && ball.x < player2.x + 5) && (ball.y <= (player2.y + 80) && (ball.y + 20) >= player2.y) ){
      ball.speedX = ball.speedX * -1;
    }
  }

  function redrawElements(){              //  updates CSS of game items
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
