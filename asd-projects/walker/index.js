/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
var KEY = {
  "LEFT": 37,   // Player 1 controls
  "UP": 38,     // |
  "RIGHT": 39,  // |
  "DOWN": 40,   // V
  "W": 87,      // Player 2 controls
  "A": 65,      // |
  "S": 83,      // |
  "D": 68,      // V
}

// Player 1 Position and Speed
var walkerPositionX = 0;
var walkerPositionY = 0;
var walkerSpeedX = 0;
var walkerSpeedY = 0;

// Player 2 Position and Speed
var runnerPositionX = 0;
var runnerPositionY = 0;
var runnerSpeedX = 0;
var runnerSpeedY = 0;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
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
    repositionGameItem();
    checkBoundaries();
    redrawGameItem();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
      // Player 1 Directional Movement
    if (event.which === KEY.LEFT) {
      walkerSpeedX = -10;
    }  
    if (event.which === KEY.UP) {
      walkerSpeedY = -10;
    }  
    if (event.which === KEY.RIGHT) {
      walkerSpeedX = 10;
    }  
    if (event.which === KEY.DOWN) {
      walkerSpeedY = 10;
    }  

      // Player 2 Directional Movement
    if (event.which === KEY.A) {
      runnerSpeedX = -10;
    }  
    if (event.which === KEY.W) {
      runnerSpeedY = -10;
    }  
    if (event.which === KEY.D) {
      runnerSpeedX = 10;
    }  
    if (event.which === KEY.S) {
      runnerSpeedY = 10;
    }  
  }
  function handleKeyUp(event){    // Upon keys being released, they won't interfere with perpendicular directions
    if ((event.which === KEY.LEFT) || (event.which === KEY.RIGHT)){
      walkerSpeedX = 0;
    }
    if ((event.which === KEY.UP) || (event.which === KEY.DOWN)){
      walkerSpeedY = 0;
    }
    if ((event.which === KEY.A) || (event.which === KEY.D)){
      runnerSpeedX = 0;
    }  
    if ((event.which === KEY.W) || (event.which ===KEY.S))
      runnerSpeedY = 0;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function checkBoundaries(){
      // Player 1 Boundaries //
      if (walkerPositionX < -15){
        walkerPositionX = 0;   // Left Boundary
      }
      if (walkerPositionX > 405){
        walkerPositionX = 390; // Right Boundary
      }
      if (walkerPositionY < -15){
        walkerPositionY = 0;   // Top Boundary
      }
      if (walkerPositionY > 405){
        walkerPositionY = 390; // Bottom Boundary
      }
      
        // Player 2 Boundaries //
      if (runnerPositionX < -15){
        runnerPositionX = 0;   // Left Boundary
      }
      if (runnerPositionX > 405){
        runnerPositionX = 390; // Right Boundary
      }
      if (runnerPositionY < -15){
        runnerPositionY = 0;   // Top Boundary
      }
      if (runnerPositionY > 405){
        runnerPositionY = 390; // Bottom Boundary
      }
  }

  function repositionGameItem() {
        // Player 1 Movement
    walkerPositionX += walkerSpeedX;
    walkerPositionY += walkerSpeedY;
        // Player 2 Movement
    runnerPositionX += runnerSpeedX;
    runnerPositionY += runnerSpeedY;
  }

  function redrawGameItem() {
        // Player 1 rewrite
    $("#walker").css("left", walkerPositionX);
    $("#walker").css("top", walkerPositionY);
        // Player 2 rewrite
    $("#runner").css("left", runnerPositionX);
    $("#runner").css("top", runnerPositionY);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
