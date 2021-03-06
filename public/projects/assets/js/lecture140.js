// lecture140.js
var done = false;
var mode = 6;
var scoreCount = 30;
var scoreSpiral = 1;
var scoreValue = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll('.square');
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.querySelector('#message');
var scoreDisplay = document.querySelector('#score');
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.mode');
var spanScoUp = document.querySelector('.scoUp');
var spanScoDwn = document.querySelector('.scoDwn');
var spanScoRst = document.querySelector('.scoRst');

function changeColors() {
  // loop through all colors
  for (var i = 0; i < squares.length; i++) {
    // change each color to match given color
    squares[i].style.background = pickedColor.rgb;
  }
}

function pickColor() {
  // picks the color
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function randomColor() {
  var color = {};
  // pick a red 0-255, green 0-255, blue 0-255
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  // this creates the hex version of the same color
  // this is displayed instead of correct at game end
  var hR = ('0' + r.toString(16)).slice(-2);
  var hG = ('0' + g.toString(16)).slice(-2);
  var hB = ('0' + b.toString(16)).slice(-2);
  // bundle this up into an object
  color.hex = `#${hR + hG + hB}`;
  color.rgb = `rgb(${r}, ${g}, ${b})`;
  return color;
}

function generateRandomColors(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function reset() {
  colors = generateRandomColors(mode);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor.rgb;
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.background = colors[i].rgb;
    } else {
      squares[i].style.display = 'none';
    }
  }
  h1.style.background = '#4682B4';
  messageDisplay.textContent = '';
  resetButton.textContent = 'New Colors?';
  if (!done) {
    scoreCount -= scoreValue * 5;
  }
  scoreDisplay.textContent = scoreCount;
  scoreSpiral = 1;
  scoreValue = mode;
  spanScoUp.textContent = scoreValue * 10;
  spanScoDwn.textContent = scoreSpiral * 10;
  spanScoRst.textContent = scoreValue * 5;
  done = false;
}

function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function() {
      modeButtons[0].classList.remove('selected');
      modeButtons[1].classList.remove('selected');
      this.classList.add('selected');
      this.textContent === 'Easy' ? mode = 3 : mode = 6;
      reset();
    });
  }
}

function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function() {
    var clickedColor = this.style.background;
      if (clickedColor === pickedColor.rgb) {
        messageDisplay.textContent = pickedColor.hex.toUpperCase();
        changeColors();
        resetButton.textContent = 'Play Again?';
        h1.style.background = pickedColor.rgb;
        if (!done) {
          scoreCount += scoreValue * 10;
          scoreDisplay.textContent = scoreCount;
          spanScoUp.textContent = scoreValue * 10;
          spanScoDwn.textContent = scoreSpiral * 10;
          spanScoRst.textContent = scoreValue * 5;
        }
        done = true;
      } else {
        this.style.background = '#232323';
        messageDisplay.textContent = 'Try Again';
        scoreCount -= scoreSpiral * 10;
        scoreSpiral += 1;
        scoreValue -= 1;
        scoreDisplay.textContent = scoreCount;
        spanScoUp.textContent = scoreValue * 10;
        spanScoDwn.textContent = scoreSpiral * 10;
        spanScoRst.textContent = scoreValue * 5;
      }
    });
  }
}

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

init();
resetButton.addEventListener('click', function() {
  reset();
});
