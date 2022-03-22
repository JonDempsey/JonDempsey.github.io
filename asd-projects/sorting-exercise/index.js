/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort

async function bubbleSort(array){
    for (i = 0; i < array.length; i++){                 //  causes several instances of sorting
        
        for (j = array.length-1; j > i; j--){           //  sorts individual array values by least

            if (array[j].value < array[j-1].value){     //  if less than the slot above
               
                swap(array, j, j-1);                    //  swap the two

                updateCounter(bubbleCounter);           //  update CSS
                await sleep();                          //  resolve update

            }

        }
        
    }
}

// TODO 3: Implement quickSort

async function quickSort(array, left, right){
    if (array.length <= 1){                             //  if the array is too small
        return;                                         //  stop
    }

    var index = await partition(array, left, right);    //  divide the unsorted part of the array in half

    if (left < index-1){                                //  after values have inched toward their proper place
        await quickSort(array, left, right-1);          //  shorten range to pinpoint location
    }

    if (right > index){                                 //  after values have inched toward their proper place
        await quickSort(array, index, right);           //  shorten range to pinpoint location
    }

}

// TODOs 4 & 5: Implement partition

async function partition(array, left, right){

    var pivot = array[Math.floor((right + left)/2)].value;

    while (left < right){
        while (array[left].value < pivot){              //  if the top has a larger value than the measured median
            left = left + 1;                            //  drop it lower
        }

        while (array[right].value > pivot){             //  if the top has a lower value than the measured median
            right = right - 1;                          //  raise it higher
        }

        if (left < right){
            swap(array, left, right)                    //  swap left and right value
    
            updateCounter(quickCounter);                //  update CSS
            await sleep();
        }
    }

    return left + 1;
}


// TODO 1: Implement swap

function swap(array, i, j){
    var temp = array[i];                              ////  temp value
    array[i] = array[j];                                //  
    array[j] = temp;                                    //  swap

    drawSwap(array, i, j);                              //  redraw
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}