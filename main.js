const WORDS= [
  'script',
  'arrays',
  'errors',
  'debugs'
]
const table = document.getElementById('wordTable')
const randomButton = document.getElementById('random-button')
const inputs = document.getElementsByTagName('input')
function selectWord (){
  const randomIndex = Math.floor(Math.random()* 4)
  return WORDS[randomIndex]
}
const wordToReview = []
const wordResponse = []

function setWordInGame(){
 
  const word = selectWord()

  const arr = word.split('').sort(() => Math.random() - 0.5)
  table.replaceChildren('')
  arr.map(
    ch => {
      wordToReview.push(ch)
      const liElement =document.createElement('li')
      liElement.textContent = ch
      table.append(liElement)
    }

  )
}

setWordInGame();

randomButton.addEventListener('click', setWordInGame)

function setInputEvent(){
  for(let i =0 ; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup',(event)=>{
      wordResponse.push(event.key)
      if(inputs[i+1]){
        inputs[i+1].focus()}
      else{
        console.log(wordResponse)
      }
  })
}
}



setInputEvent()

