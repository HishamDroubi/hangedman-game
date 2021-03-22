
let drawArea = document.querySelector(".draw");
let wordArea = document.querySelector(".word");
let submit = document.querySelector("#submit");
let start = document.querySelector("#start");
let inputs = [];

//getting the random word 
let z;
async function getWord() {
    await fetch("https://random-word-api.herokuapp.com/word?number=1").then
        (response => response.json()).then
        (finalResult => {
            z = finalResult[0];
           
        });
    return z;
}


//set the input fields
async function set() {
    const word = await getWord();
    const length = String(word).length;

    for (var i = 0; i < length; i++) {
        let textArea = document.createElement("input");
        textArea.setAttribute("type", "text");
        textArea.value = "";
        textArea.classList.add('box');
        inputs.push(textArea);
        wordArea.appendChild(textArea);
    }

}
set();


//submit 
let mistakes = -1;
let yes = 0;
let won = false;
let img = document.createElement('IMG');
submit.addEventListener("click", () => {
    if (won)
        return;

    var c = 0;
    var ind = -1;
    var i = 0;
    for (; i < inputs.length; i++) {

        if (!inputs[i].classList.contains("non-editable") && inputs[i].value.length != 0) {
            c++;
            ind = i;
        }
    }

    if (c == 0)
        alert("you must choose one letter before submit");
    else if (c > 1) {
        alert("you cant choose more than one position in one turn");
    }
    else if (inputs[ind].value.length > 1) {
        alert("you can insert only one letter in any position")
    }
    else if (inputs[ind].value == z[ind]) {
        let x = inputs[ind];
        x.classList.add("non-editable");
        yes++;
        if (yes == inputs.length) {
            alert("congratulations you won");
            won = true;
        }
    }
    else {
        mistakes++;
        console.log(mistakes);
        img.src = 'pics/' + mistakes + '.png';
        if (mistakes == 0)
            drawArea.appendChild(img);
        if (mistakes == 6) {
            //alert("the man is fully hanged im sorry you lose")
            document.location.reload(true);
        }
        inputs[ind].value = '';

    }


})

//start a new game 
start.addEventListener('click', () => {
    document.location.reload(true);
})

//the instructions pop-up
const openModalButtons = document.querySelectorAll('#i')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')


openModalButtons.forEach(button => {
  button.addEventListener('click', (e) => {
      e.preventDefault();
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

