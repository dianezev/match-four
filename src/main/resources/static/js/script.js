// Class names that code is swapping in & out:
//    'currentPick': to reflect selected color
//    'hoverColor_1' thru 'hoverColor_6': to control the onhover colors in the game slots
//    'bgColor_1' thru 'bgColor_6': to control the colors in the game slots
//    'currentTry': to reflect the current guess row (1 - 8, starting at bottom)
//    'blackPeg' and 'whitePeg': to color the pegs after user checks a guess
  
  
//Variables:
//  'pick' is integer 1 - 6 for color selection (1 = red, 2 = orange, etc.)
//  'guessCtr' is integer 1 - 8 for which guess attempt user is on
//    (guessCtr would be initialized to 1 & then a fcn
//    would add 'currentTry' className to the relevant guessing row (& remove from others)

// Global variables - so that Java, etc can access any of these 3 vars...
var myBestTime = -1;  // keep track of user's best time for current session in seconds
var timeSeconds = 0;  // user's total seconds for most recent game
var timeString = "";  // string that shows mins:seconds for most recent game

(function() {
  
    var guesses = 8;    // total # guesses possible
    var guessCtr = 1;   // guess level user is currently on
    var colorPick = 1;  // color user currently has selected
    var secret = [0, 0, 0, 0];  // game solution
    var curGuess = [0, 0, 0, 0];  // user's guess at current guess level
    var startTime;    

  /******************************************************************
   * EVENT LISTENERS
   ******************************************************************/
    
    // Add event listeners for color picker
    var pickers = document.getElementsByClassName("picker");

    // Loop through all colors in palette and assign click event
    Array.prototype.filter.call(pickers, function(el, i){
      el.addEventListener("click", function(){ setCurrentPicker(i + 1); });
    });    
    
    // Add event listeners for clicks on game slots
    // TBD: Diane need to find a way to make only the current guess row
    // clickable. Not sure if that means redefining 4 click events
    // every time you move to the next guess row, or if we define
    // all 4x8 slot clicks at beginning and just make code ignore 
    // clicks on any row that isn't the current row.
    // Right now this just sets event for row #1
    var slots = document.getElementById("guess_1").getElementsByClassName("slot");

    // Loop through all slots for guess row #1 and assign click event
    // Note that counter i is zero based
    Array.prototype.filter.call(slots, function(el, i){
      el.addEventListener("click", function(){ setColorForSlot(i); });
    });    

    // Add event listener for new game
    // TBD
  
    // Add event listener for check answer
    var checks = document.getElementById("gameBoard").getElementsByClassName("checkMark");

    // Loop through all checkmarks and assign click event
    // Note that counter i is zero based
    Array.prototype.filter.call(checks, function(el, i){
      el.addEventListener("click", function(){ checkAnswer(); });
    });    
  
  /***********************************************************************
   * FUNCTIONS CALLED BY USER EVENTS  (start new game, select color, assign color to a slot, check answer)
   **********************************************************************/
  
  
  // My notes below are only suggestions - please feel free to revise in any way
  // that makes sense to you!! - Diane
  
  // Compare user's answer to secret solution, set black/white pegs & move on to next guess
  // TBD...
  function checkAnswer() {
    console.log('about to check answer and user\'s guess is:');
    console.log(curGuess);

    // If any of elements is 0, alert user that a color must be chosen for all 4 slots before checking & return
    
    // Otherwise:
        
    // If guessCtr = 1, record start time (millisecs)
    if (guessCtr === 1) {
      startTime = new Date().getTime();
    }

    // call method 'compareSlots' to compare elements in 'secret' to 'curGuess' - return object or array with
    // #black and # white pegs
    
    // call method 'setBlackWhitePegs' (pass in #black & #white peg counts) to set background colors for 
    // the 'peg' class within the 'currentTry' section
    
    // if #black = 4 call method , call fcn to set time variables, give user message, etc. 
    //if (# black pegs === 4) {
      // checkTimeVsBest(); // this function sets global variables related to time (myBestTime, timeSeconds, timeString)
      //
      // then some user message... to display a message or route to another pg?
      // (later - if best score, save to user's info in db.)
    //}
    
    // else if guessCtr = 8  either route to another pg or call method userMsg('sorry...blah blah')
    // (later on it would be good to show the actual solution to user).
      
    // else move on to next guess:
    resetCurGuess();
    removeHoverColor(guessCtr);
    guessCtr++;
    setCurrentTry();
    setHoverColor();
  }
  
  // Add a color to a slot on gameboard (slotNum is 0 - 3)
  function setColorForSlot(slotNum) {
    
    // Put the current colorPick value into the selected slot for the current guess row
    curGuess[slotNum] = colorPick;
    
    // TBD: use current value of colorPick to add
    // first remove any bgColor class on slotNum in guessCtr row (because user might choose a color and then change it...)
    // then add class 'bgColor_1' or 'bgColor_2', etc to the slotNum user clicked on in guessCtr row
    // note that you can use 'bgColor_' + colorPick to get the color class you need

    
    console.log('setting color #' + colorPick + ' for slot # ' + (slotNum + 1) + ' and curGuess array is:');
    console.log(curGuess);
  }
  
  //  Change selected color on palette. Adds the 'currentPick' classname to the selected color
  //  and removes it from any other color in the palette
  function setCurrentPicker(i) {
    var oldPicker = document.getElementById("colorPalette")
                            .getElementsByClassName("currentPick");  // generates array that should only have 1 el

    // Remove 'currentPick' class name from previously selected color
    if (oldPicker.length > 0) {
      oldPicker[0].classList.remove("currentPick");
    }
    
    // Set var to new color
    colorPick = i;
    
    // Add 'currentPick' class to newly selected color
    document.getElementById("pick_" + colorPick).classList.add("currentPick");
    
    // Call functions to remove old hoverColor & set new hoverColor class for the current guess row
    removeHoverColor(guessCtr);
    setHoverColor();
  }
    
  // Start new game
  function startGame() {  
    
    // Clear old gameboard:
    removeHoverColor(1, 8);
    resetPegs();
    clearSlotColors();
    
    // Set up new gameboard:
    guessCtr = 1;
    curGuess = [0, 0, 0, 0];
    startTime = 0;
    setSecret(); 
    setCurrentTry();
    setCurrentPicker(colorPick);  // really just needed on init
    setHoverColor();
  }

  
  /*********************************************************************************
   * OTHER SUPPORTING FUNCTIONS (called by the main fcns above, to avoid repetition)
   ********************************************************************************/  
  
  /***** these are related to the display, color settings, etc.****/
  
  // Clear all the colors from the guess sections of gameboard
  function clearSlotColors() {
    // TBD - remove all 'bgColor_1' thru 'bgColor_6' classes from all slots
    // should be able to work with ALL slots using id = "gameBoard" and class = "slot"
  }

  // Remove ALL hoverColor_ classes from one or more guess rows (for any 'pick' value)
  function removeHoverColor(startRow, endRow) {  
    var guess;
    
    // If no endRow argument passed, just use startRow as end value
    var end = (typeof endRow === "undefined") 
              ? startRow 
              : endRow;
    
    // Loop through guess rows & remove hoverColor classes
    for (var i = startRow; i <= end ; i++) {
      guess = document.getElementById('guess_' + i);
      for (var j = 1; j <=6 ; j++) {
        if (guess.classList.contains("hoverColor_" + j)) {
          guess.classList.remove("hoverColor_" + j);
        }
      }
    }
  }
  
  // Reset pegs to neutral by removing 'blackPeg' and 'whitePeg' classes from all guesses
  function resetPegs() {
    //TBD
  }
  
  // Set pegs black and/or white for current guess
  function setBlackWhitePegs(obj) {
    // TBD (add class 'blackPeg' and/or 'whitePeg' to the necessary # of pegs)
  }
      
  //  Adds the 'currentTry' classname to 
  // that current guess row and removes it from the other guess rows
  function setCurrentTry() {    
    var allGuessRows = document.getElementsByClassName('guess');
    
    // Loop through all guess rows and remove 'currentTry' class
    Array.prototype.filter.call(allGuessRows, function(el){
      if (el.classList.contains("currentTry")) {
        el.classList.remove("currentTry");
      }
    });
    
    // Assign 'currentTry' class to current guess row
    document.getElementById("guess_" + guessCtr).classList.add("currentTry");
  }
  
  
  // Set hover color for the current guess row
  function setHoverColor() {
    var liveGuess = document.getElementById("guess_" + guessCtr);

    // Add new hoverColor class for current color to the current guess row
    liveGuess.classList.add("hoverColor_" + colorPick);
  }
  
  // Display a message (or instead of this, routing to another page...)
  function userMsg(message) {
    // TBD
  }
  
  
  
  /***** these are related to the game logic, calcs, comparisons, etc.****/

  // Get time for most recent game, compare to user's best time
  // Sets 3 GLOBAL variables for java to use as needed (timeSeconds, myBestTime and timeString)
  // TBD: this could set (or return) a more complete message if that's helpful - like
  // "Nice job! You finished in 3 minutes, 23 seconds." 
  // and/or "Congrats! You got your best time today: 3 minutes, 23 seconds."
  function checkTimeVsBest() {
    var endTime = new Date().getTime();
    var mins;
    var seconds;

    timeSeconds = endTime - startTime;
    mins = Math.floor(timeSeconds/60);
    seconds = timeSeconds % 60;

    // Compare time to best time & reset if user improved (best is initialized to -1)
    if ((myBestTime === -1) || (timeSeconds < myBestTime)) {
      myBestTime = timeSeconds;
    }

    // Create readable string that shows minutes & seconds - for use in a user msg
    timeString = mins + 
                (mins === 1 ? " minute, " : " minutes, ") + 
                seconds + 
                (seconds === 1 ? " second." : " seconds.");
  }

  // Compare secret to curGuess and return obj or array with #black & # white
  function compareSlots() {
    // TBD
  }

  // Generate a random number between 1 & 6
  function getRandom() {
    var ran = Math.random();
    return Math.ceil(ran * 6);
  }

  // Reset guess array to all zero
  function resetCurGuess() {
    curGuess = [0, 0, 0, 0];
  }
  
  // Randomly assign 4 integers to 'secret' array ( 1 = red, etc.)
  // Note: showing 3 JS options here for putting random #s into array...
  function setSecret() {
    
    for (var i = 0 ; i < 4 ; i++) {
      secret[i] = getRandom();
    }

//   or you can use the Array object's built-in 'map' method (with arrow function which is new in ES6):
//      secret = secret.map(el => getRandom());
    
    
    console.log('just set secret solution to:');
    console.log(secret);
  }    

  startGame();
})();



