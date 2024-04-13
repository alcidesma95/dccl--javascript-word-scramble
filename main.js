const WORDS= [
  'script',
  'arrays',
  'errors',
  'debugs'
]
const table = document.getElementById('wordTable')
const randomButton = document.getElementById('random-button')
const resetButton = document.querySelector('#reset-button')
const inputs = document.getElementsByTagName('input')
function selectWord (){
  const randomIndex = Math.floor(Math.random()* 4)
  return WORDS[randomIndex]
}
let wordToReview = []
let wordResponse = []
let mistake= ''
let tries = 5
function setWordInGame(){
  setInputEvent()
  setMistake()
  setTries()
  clearInputs()
  wordResponse=[]
  tries =5
  const word = selectWord()
  wordToReview = word.split('')
  randomizeWord(word)
 


}


function randomizeWord(word){
  const arr = word.split('').sort(() => Math.random() - 0.5)
  table.replaceChildren('')
  arr.map(
    ch => {
    
      const liElement =document.createElement('li')
      liElement.textContent = ch
      table.append(liElement)
    }

  )
}

resetButton.addEventListener('click',setWordInGame)
randomButton.addEventListener('click',()=> randomizeWord(wordToReview.join('')))

function setInputEvent(){
  
  for(let i =0 ; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup',(event)=>{
     if(event.key ==='Backspace') return
      wordResponse[i]=event.key
      console.log(wordResponse)
      if(inputs[i+1]){
        inputs[i+1].focus()}
      else{
       const result = compareResult()
       if(result.success ) {
         alert('winner')
         setWordInGame()
       }
        else { 
          mistake = result.errors.join(',')
          tries = tries-1
          setMistake(mistake)
          setTries(tries)
          wordResponse=[]
          if(tries<0) {
            alert('juego terminado')
            setWordInGame()
          }
        } 
        inputs[0].focus()
      }
  })
}
}

function compareResult(){
  const errors= []
  console.log({wordToReview})
  wordToReview.forEach((element, index) => {
    console.log({element})
    console.log({wr:wordResponse[index]})
    if(element!== wordResponse[index])
    errors.push(wordResponse[index])
  });
  console.log(errors)
  if(errors.length>0){
    clearInputs()
    return {
      success:false,
      errors
    }
  }
  return {
    success: true,
    errors
  }
}

function setMistake(errors=''){
  const mistakeEl = document.querySelector('#mistake-board')
  mistakeEl.replaceChildren('')
  const liE=document.createElement('li')
 liE.textContent = errors
 mistakeEl.appendChild(liE)
}
function setTries(tries=5){
  const triesSpan = document.querySelector('#tries-board')
  triesSpan.textContent = tries
}

function clearInputs(){
  for(let i =0 ; i < inputs.length; i++){
    inputs[i].value=''
}
}
setWordInGame();

