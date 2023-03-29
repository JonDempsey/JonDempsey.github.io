/*
 * TODO 4: Create a modularized index.js, 
 * pass in window and createjs
 */
(function(window, createjs) {
  // TODO 5: Initialize CreateJS //
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);

  // TODO 6: Set the framerate of the Ticker
  createjs.Ticker.framerate = 12;


  /*
   * TODO 7:CREATE AND CONFIGURE ANY DISPLAY 
   * OBJECTS AND ADD THEM TO THE DISPLAY LIST HERE
   */
  
  // INIT CREATEJS //
  const
    radius = 25,
    bg = new createjs.Shape(),
    circle = new createjs.Shape();
    
  // CREATE A BACKGROUND //
  bg.graphics.beginFill('#A00').drawRect(0, 0, canvas.width, canvas.height);
    
  // CREATE A CIRCLE //
  circle.graphics.beginFill('blue').drawCircle(0, 0, radius);
  circle.x = canvas.width / 2;
  circle.y = canvas.height / 2;

  // ADD DISPLAY OBJECTS TO STAGE //
  stage.addChild(bg, circle);
  stage.update()


  // TODO 8: Listen to the 'tick' event  //
  let tickHandler = createjs.Ticker.on('tick', onTick);
  

  // TODO 9: Handle the 'tick' event //
  function onTick(event){
    update(event);
  }
  
  /*
   * TODO 10: Implement an update Function, after making 
   * changes to assets, it must call stage.update(); 
   */

  function update(event){
    //circle.clear();
    //circle.setTransform(circle.x, circle.y, 1.5);
    //circle.moveTo(Math.random()*canvas.width, Math.random()*canvas.height);
    //circle.updateCache();
    circle.x = Math.random() * canvas.width;
    circle.y = Math.random() * canvas.height;

    stage.update();
  }

}(window, window.createjs));
