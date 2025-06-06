const boxes = document.querySelectorAll ('.cell')
const titleHeader = document.getElementById('titleHeader')
const xPlayerDisplay = document.getElementById('xPlayerDisplay')
const oPlayerDisplay =document.getElementById('oPlayerDisplay')
const restartBtn = document.getElementById('restartBtn')

let player = 'X'
let ispause = false
let gamestart = false

const inputCells = ['', '', '',
                    '', '', '',
                    '', '', ''];

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals                    
]

//adding event fuction to each box
boxes.forEach((cell , index) => {
  cell.addEventListener('click', () => tapbox(cell , index)
  )
})
function tapbox(cell , index) {
  if (cell.textContent == '' && !ispause
  ){
  gamestart= true
  updatebox(cell , index)

  if (!checkwin()) {
    changePlayer()
    randomPick()

    
  }

  }
}

function updatebox(cell, index) {
  cell.textContent = player
  inputCells[index] = player
  cell.style.color = (player == 'X') ? '#1892EA' : '#A737FF'
}

  function changePlayer() {
    player = (player == 'X')? 'O' : 'X'    
  }
function randomPick() {
  ispause = true

  setTimeout(() => {
    let randomf

    do { 
      randomf = Math.floor(Math.random() * inputCells.length)
      
    } while (
      inputCells[randomf] != ''
    )
    updatebox(boxes[randomf], randomf, player)
   
    
  if (!checkwin()) {
    changePlayer()
    ispause = false
    return
  }
  player = (player = 'X') ? 'O' :'X'
       
    }, 1000); // Delay Computer move by 1 second
}
function checkwin() {

  for (const [a,b,c] of winConditions) {
    if (inputCells[a] == player &&
        inputCells[b] == player &&
        inputCells[c] == player 
    ) {
      declarewin([a,b,c])
      return true
    }
  }

  if (inputCells.every(cell => cell != '')) {
    declareDraw()
    return true
    
  }
}
function declarewin(winindices) {
  titleHeader.textContent =` ${player} Win`
  ispause = true
  winindices.forEach((index) =>
  boxes[index].style.background ='#2A2343')

  restartBtn.style.visibility = 'visible'
}
function declareDraw() {
 titleHeader.textContent = 'Draw'
 ispause = true 
  restartBtn.style.visibility = 'visible'
}
  

function choosePlayer(selectedPlayer) {
    // Ensure the game hasn't started
    if (!gamestart) {
        // Override the selected player value
        player = selectedPlayer
        if (player == 'X') {
            // Hightlight X display
            xPlayerDisplay.classList.add('player-active')
            oPlayerDisplay.classList.remove('player-active')
        } else {
            // Hightlight O display
            xPlayerDisplay.classList.remove('player-active')
            oPlayerDisplay.classList.add('player-active')
        }
      }
    }
    restartBtn.addEventListener('click', () => {
    restartBtn.style.visibility = 'hidden'
    inputCells.fill('')
    boxes.forEach(cell => {
        cell.textContent = ''
        cell.style.background = ''
    })
    ispause = false
    gamestart = false
    titleHeader.textContent = 'Choose'
})
