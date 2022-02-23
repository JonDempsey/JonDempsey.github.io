// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // Multiple TODOs: Call your apply function(s) here

    applyFilter(reddify);

    applyFilterNoBackground(decreaseBlue);

    applyFilterNoBackground(increaseGreenByBlue);


    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here

// nested loop to access each value of 2D array//
function applyFilter(filterFunction){
    for (var row = 0; row < 17; row++){

        for (var column = 0; column < 14; column++){
            var rgbString = image[row][column];           //    accesses each value in the 2D array

            var rgbNumbers = rgbStringToArray(rgbString); //    converts each value's string into RGB
            
            filterFunction(rgbNumbers);                   //    applies filter to value
            
            rgbString = rgbArrayToString(rgbNumbers);     //    returns rgb value into string
            image[row][column] = rgbString;               //    places rgb value back into image
        }

    }
}


// TODO 7: Create the applyFilterNoBackground function

function applyFilterNoBackground(filterFunction){

    var background = image[0][0];                             //    background value to ignore

    for (var row = 0; row < 17; row++){

        for (var column = 0; column < 14; column++){
            if ((background === image[row][column]) === false ){
            
                var rgbString = image[row][column];           //    accesses each value in the 2D array

                var rgbNumbers = rgbStringToArray(rgbString); //    converts each value's string into RGB
            
                filterFunction(rgbNumbers);                   //    applies filter to value
            
                rgbString = rgbArrayToString(rgbNumbers);     //    returns rgb value into string
                image[row][column] = rgbString;               //    places rgb value back into image
            }
        }

    }
}

// TODO 5: Create the keepInBounds function

function keepInBounds(number){
    return Math.min(Math.max(number, 0), 255)           // prevents number from being less than 0 and greater than 255
}

// TODO 3: Create reddify function

function reddify(array){

    array[RED] = 200;           // set RED value of array index to 200

}

// TODO 6: Create more filter functions

function decreaseBlue(array){
    
    array[BLUE] = keepInBounds(array[BLUE] - 50);           //  subtracts 50 from blue value from color, as long as it is within range

}

function increaseGreenByBlue(array){
    
    array[GREEN] = keepInBounds(array[GREEN] + array[BLUE]);//  adds blue value of color to green value, as long as it is within range

}

// CHALLENGE code goes below here
