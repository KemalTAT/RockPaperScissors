let score = JSON.parse(localStorage.getItem('score'));
let resultWrite = document.querySelector('.js-result');
let moves = document.querySelector('.js-moves');
let wlt = document.querySelector('.js-wlt');
let rockbutton = document.querySelector('.js-rock');
let paperbutton = document.querySelector('.js-paper');
let scissorsbutton = document.querySelector('.js-scissors');
let resetbutton = document.querySelector('.js-resetbutton');
let autoplaybutton = document.querySelector('.js-autoPlay');
let winper = document.querySelector('.js-winper');
let loseper = document.querySelector('.js-loseper');
let tieper = document.querySelector('.js-tieper');
let intervalid;
if (!score){
  score = {
    wins: 0,
    losses: 0,
    ties : 0
  }
}
rockbutton.addEventListener("click", () => {
  play('rock');
});
paperbutton.addEventListener("click", () => {
  play('paper');
});
scissorsbutton.addEventListener("click", () => {
  play('scissors');
});
resetbutton.addEventListener("click",() => {
  resetscore();
});
autoplaybutton.addEventListener("click", () => {
  autoplay();
});
function play(rps){
  const computermove = computermoves();
  let result;
  if (rps === 'rock'){
    if (computermove === 'rock'){
      result = 'tie';
    }else if (computermove === 'paper') {
      result = 'you lose';
    }else{
      result = 'you win';
    }
  }else if (rps === 'paper') {
    if (computermove === 'rock'){
      result = 'you win';
    }else if (computermove === 'paper') {
      result = 'tie';
    }else{
      result = 'you lose'
    }
  }else{
    if (computermove === 'rock'){
      result = 'you lose';
    }else if (computermove === 'paper') {
      result = 'you win';
    }else{
      result = 'tie';
    }
  }
  resultWrite.innerHTML = result;
  moves.innerHTML = `you <img class="resultphoto" src="${rps}.png"> <img class="resultphoto" src="${computermove}.png"> computer`;
  if (result === 'you win'){
    score.wins++;
  }else if (result === 'you lose'){
    score.losses++;
  }else{
    score.ties++;
  }
  localStorage.setItem('score',JSON.stringify(score));
  wlt.innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
  per()
}
function computermoves(){
  const number = Math.floor(Math.random() * 3);
  if (number === 0){
    return 'rock';
  } else if (number === 1) {
    return 'paper';
  }else{
    return 'scissors';
  }
}
function resetscore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  resultWrite.innerHTML = 'Reset Score';
  moves.innerHTML = ``;
  wlt.innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
  localStorage.setItem('score',JSON.stringify(score));
}
function autoplay(){
  if (autoplaybutton.innerHTML === 'Auto Play'){
    intervalid = setInterval( () => {
      let autoplayermove = computermoves();
      autoplaybutton.innerHTML = 'Auto Playing';
      play(autoplayermove);
    }, 350)
  }else{
    clearInterval(intervalid);
    autoplaybutton.innerHTML = 'Auto Play';
  }
}
function per(){
  let wi = percentage(score.wins);
  let lo = percentage(score.losses);
  let ti = percentage(score.ties);
  winper.innerHTML = `win percentage: %${wi}`;
  loseper.innerHTML = `lose percentage: %${lo}`;
  tieper.innerHTML = `tie percentage: %${ti}`;
}
function percentage(wi){
  if (wi === 0){
    return 0;
  }
  let e = Math.round( wi / (score.wins + score.losses + score.ties) * 100)
  return e;
}