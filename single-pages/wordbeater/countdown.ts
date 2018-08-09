window.addEventListener('load', init);

let overallTimeToComplete = 6;
// Globals
let time = overallTimeToComplete;
let score = 0;
let isPlaying;
let amountOfWinsInARowBeforeTimeDecrements = 5;
let hasDecrementedTime = false;

// DOM Elements
const wordInput: HTMLInputElement = document.querySelector("#word-input");
const currentWord: HTMLElement = document.querySelector("#current-word");
const scoreDisplay: HTMLElement = document.querySelector("#score");
const timeDisplay: HTMLElement = document.querySelector("#time");
const message: HTMLElement = document.querySelector("#message");
const seconds: HTMLElement = document.querySelector("#seconds");

const words: string[] = ["aahs","aal","aalii","aaliis","aals","aardvark","aardvarks","aardwolf","aardwolves","aargh","aarrgh","aarrghh","aarti","aartis","aas","aasvogel","aasvogels","ab","aba","abac","abaca","abacas","abaci","aback","abacs","abacterial","abactinal","abactinally","abactor","abactors","abacus","abacuses","abaft","abaka","abakas","abalone","abalones","abamp","abampere","abamperes","abamps","aband","abanded","abanding","abandon","abandoned","abandonedly","abandonee","abandonees","abandoner","abandoners","abandoning","abandonment","abandonments","abandons","abandonware","abandonwares","abands","abapical","abas","abase","abased","abasedly","abasement","abasements","abaser","abasers","abases","abash","abashed","abashedly","abashes","abashing","abashless","abashment","abashments","abasia","abasias","abasing","abask","abatable","abate","abated","abatement","abatements","abater","abaters","abates","abating","abatis","abatises","abator","abators","abattis","abattises","abattoir","abattoirs","abattu","abature","abatures","abaxial","abaxile","abaya","abayas","abb","abba","abbacies","abbacy","abbas","abbatial","abbe","abbed","abbes","abbess","abbesses","abbey","abbeys","abbot","abbotcies","abbotcy","abbots","abbotship","abbotships","abbreviate","abbreviated","abbreviates","abbreviating","abbreviation","abbreviations","abbreviator","abbreviators","abbreviatory","abbreviature","abbreviatures","abbs","abcee","abcees","abcoulomb","abcoulombs","abdabs","abdicable","abdicant","abdicate","abdicated","abdicates","abdicating","abdication","abdications","abdicative","abdicator","abdicators","abdomen","abdomens","abdomina","abdominal","abdominally","abdominals","abdominoplasty","abdominous","abduce","abduced","abducens","abducent","abducentes","abduces","abducing","abduct","abducted","abductee","abductees","abducting","abduction","abductions","abductor","abductores","abductors","abducts","abeam","abear","abearing","abears","abecedarian","abecedarians","abed","abegging","abeigh","abele","abeles","abelia","abelian","abelias","abelmosk","abelmosks","aberdevine","aberdevines","abernethies","abernethy","aberrance","aberrances","aberrancies","aberrancy","aberrant","aberrantly","aberrants","aberrate","aberrated","aberrates","aberrating","aberration","aberrational","aberrations","abessive","abessives","abet","abetment","abetments","abets","abettal","abettals","abetted","abetter","abetters","abetting","abettor","abettors","abeyance","abeyances","abeyancies","abeyancy","abeyant","abfarad","abfarads","abhenries","abhenry","abhenrys","abhominable","abhor","abhorred","abhorrence","abhorrences","abhorrencies","abhorrency","abhorrent","abhorrently","abhorrer","abhorrers","abhorring","abhorrings","abhors","abid","abidance","abidances","abidden","abide","abided","abider","abiders","abides","abiding","abidingly","abidings","abies","abietic","abigail","abigails","abilities","ability","abiogeneses","abiogenesis","abiogenetic","abiogenetically","abiogenic","abiogenically","abiogenist","abiogenists","abiological","abioses","abiosis","abiotic","abiotically","abiotrophic","abiotrophies"];

function init() {
  isPlaying = true;
  // check to see if the score has hit 
  updateGame();
  // Set random word
  setRandomWord();
  // Speed up the game as score increases
  setInterval(updateGame, 900);
  // Start timer
  setInterval(reduceTime, 1000);
  // Check if word is correct
  setInterval(matchWord, 150);
}

function updateGame() {
  if(score % amountOfWinsInARowBeforeTimeDecrements === 0 
    && score != 0 && !hasDecrementedTime) {
    overallTimeToComplete -= 1;
    seconds.innerHTML = String(overallTimeToComplete);
    time = overallTimeToComplete;
    hasDecrementedTime = true;
  }else if(score % amountOfWinsInARowBeforeTimeDecrements != 0 
    && score != 0) {
    hasDecrementedTime = false;
  }
}

function setRandomWord() {
  let randomIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randomIndex];
}

function reduceTime() {
  if(time <= 0){
   isPlaying = false;
  }
  time--;
  if(time < 0){
    timeDisplay.innerHTML = "0";
  }else{
    timeDisplay.innerHTML = String(time);
  }
}

function matchWord(){
  console.log(isPlaying);
  checkStatus();
  if(!isPlaying){
    return;
  }
  let currentTypedWord = wordInput.value;
  let displayedWord = currentWord.innerHTML;
  if(currentTypedWord === displayedWord){
    score++;
    scoreDisplay.innerHTML = String(score);
    wordInput.value = "";
    setRandomWord();
    time = overallTimeToComplete;
    timeDisplay.innerHTML = String(time);
  }
}

function checkStatus(){
  if(!isPlaying && time <= 0){
    message.innerHTML = "Game Over!!!";
  }
}