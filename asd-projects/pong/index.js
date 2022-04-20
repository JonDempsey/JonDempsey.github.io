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
  
  var player1 = createGameItem("#paddle1", 0, 20);
  var player2 = createGameItem("#paddle2", 0, 20);

  // one-time setup
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
    repositionPaddles();
    paddleBoundaries();
    redrawPaddles();


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

  function redrawPaddles(){
    $(player1.id).css("top", player1.y);
    $(player2.id).css("top", player2.y);
  }

  /* function movePaddleUp(player){
    if (player.y > 0) {
      player.y -= player.speedY;
      $(player.id).css("top", player.y);
    }
  }
  function movePaddleDown(player){
    if (player.y < 360) {
      player.y += player.speedY;
      $(player.id).css("top", player.y);
    }
  } */

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
