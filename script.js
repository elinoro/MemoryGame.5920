const cardArray = [
  {
    name: 'trump1',
    img: 'images/trump1.png'
  },
  {
    name: 'trump1',
    img: 'images/trump1.png'
  },
  {
    name: 'trump2',
    img: 'images/trump2.png'
  },
  {
    name: 'trump2',
    img: 'images/trump2.png'
  },
  {
    name: 'trump3',
    img: 'images/trump3.png'
  },
  {
    name: 'trump3',
    img: 'images/trump3.png'
  },
  {
    name: 'trump4',
    img: 'images/trump4.png'
  },
  {
    name: 'trump4',
    img: 'images/trump4.png'
  },
  {
    name: 'trump5',
    img: 'images/trump5.png'
  },
  {
    name: 'trump5',
    img: 'images/trump5.png'
  },
  {
    name: 'trump6',
    img: 'images/trump6.png'
  },
  {
    name: 'trump6',
    img: 'images/trump6.png'
  }
];

cardArray.sort(() => 0.5-Math.random());

const board = document.querySelector('.board');
const resultDisplay = document.querySelector('.result');
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let lockBoard = false;

function createBoard(){
  for(let i=0; i<cardArray.length;i++){
    let card = document.createElement('img');
    card.classList.add('card');
    card.setAttribute('data-id', i);
    board.appendChild(card);
    card.setAttribute('src', '/images/frontImg.png');
    card.addEventListener('click', flipCard);
  }
}

function flipCard(){
  activateTimer();
  if(lockBoard) return;
  let cardId = this.getAttribute('data-id');
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  this.setAttribute('src', cardArray[cardId].img);
  if(cardsChosen.length === 2){
    lockBoard = true;
    setTimeout(checkForMatch, 500);
  }
}

function checkForMatch(){
  let cards = document.querySelectorAll('img');
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];
  if(cardsChosen[0] === cardsChosen[1]){
    cards[optionOneId].setAttribute('src', '/images/trumpOK.png');
    cards[optionTwoId].setAttribute('src', '/images/trumpOK.png');
    cardsWon.push(cardsChosen);
  }
  else{
    cards[optionOneId].setAttribute('src', '/images/frontImg.png');
    cards[optionTwoId].setAttribute('src', '/images/frontImg.png');
  }
  cardsChosen = [];
  cardsChosenId = [];
  resultDisplay.textContent = cardsWon.length+"/6";
  if(cardsWon.length === cardArray.length/2){
    resultDisplay.textContent = "You did it! AMERICA is great again!"
  }
  lockBoard = false;
}

createBoard();

//timer
let seconds = 0;
let minutes = 0;

let activateTimer = (function() {
  let executed = false;
  return function() {
      if (!executed) {
        executed = true;
        setInterval(stopWatch, 1000);
        function stopWatch(){
          seconds++;
          if(seconds/60 === 1){
            seconds = 0;
            minutes++;
            document.querySelector(".seconds").innerHTML = valueOf(seconds);
            document.querySelector(".minutes").innerHTML = valueOf(minutes);
            // seconds = check(seconds);
            // minutes = check(minutes);
            // function check(i){
            //   if(i<10) {
            //   i = "0" + i;
            //   }
            //   return i;
            // }
          }
          document.querySelector(".time").innerHTML = minutes + " : " + seconds;
        }
      }
  };
})();




