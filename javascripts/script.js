console.log("Hello! world");
const cRadiobutton = document.querySelectorAll('input[name=level]');
let used_letters = [];

//========================referencing html (DOC)================================

var radio = document.getElementsByName("level");
var submit = document.getElementById("submit");
var user_input = document.getElementById("user_guessed_letter");
var listbody = document.getElementById("used_letter_list");
var remaining_guesses = document.getElementById("remaining_guess_count");
var used_letter_label = document.getElementById("used_letter_label");
var word_length_label = document.getElementById("word_length");
var rand_word_index = Math.floor(Math.random() * 10);
var incorrect = 0,
    correct_count = 0,
    word_length = 0,
    temp = 0;
let dashes = []; // Initializing an empty string
let is_correct = false;

//============================accessing all the radio buttons======================

cRadiobutton.forEach(radio => {
    radio.addEventListener('change', () => {
        used_letter_label.innerText = "Used_letters";

        GAMAE_MANAGER(radio.value);

    });
});



//=================== function to controll all the levels according to the user input============

function GAMAE_MANAGER(level) {


    console.log("selected " + level + " level");

    cRadiobutton.forEach(radio => {
        radio.disabled = true;
    });

    //============= changing the style and html element property on the entry of the game============

    user_input.disabled = false;
    user_input.focus();
    user_input.title = "guess a letter";
    submit.disabled = false;
    submit.style.cursor = "pointer";
    submit.style.backgroundColor = "black";
    submit.style.color = "white";
    submit.style.borderColor = "black"
    submit.title = "Check your guess";

    // =========================words to be used for the easy level=====================
    const easy_words = ["apple", "chair", "happy", "house", "water", "light", "music", "pizza", "river", "tiger"];

    // ======================words to be used for medium level===================
    const medium_words = ["bicycle", "compass", "library", "mountain", "mystery", "popcorn", "rainbow", "scissors", "volcano", "whistle"];

    // ==================words for high level difficulty===================
    const hard_words = ["ostentatious", "nebulous", "esoteric", "surreptitious", "languorous", "quixotic", "ebullient", "lugubrious", "obfuscate", "sesquipedalian"];

    // ==================Switch to set the required value to the current selected word=====================================

    switch (level) {

        case "easy":
            remaining_guesses.innerText = "9";
            word_length = easy_words[rand_word_index].length;
            word = easy_words[rand_word_index];
            break;

        case "medium":
            remaining_guesses.innerText = "10";
            word_length = medium_words[rand_word_index].length;
            word = medium_words[rand_word_index];
            break;

        case "hard":
            remaining_guesses.innerText = "20";
            word_length = hard_words[rand_word_index].length;
            word = hard_words[rand_word_index];
            break;
    }


    for (let i = 0; i < word_length; i++) {
        dashes[i] = "_ ";
    }

    word_length_label.innerText = dashes; // displaying the dasses according to the length of the selected word

    document.getElementById('user_guessed_letter').addEventListener('keypress', function (e) {
        // Allow only alphabetic characters
        const char = String.fromCharCode(e.keyCode || e.which);
        if (!/^[a-zA-Z]$/.test(char) && e.key !== "Enter") {
            e.preventDefault();
            alert("Enter a valid Alphabet");
        }
    });

    document.getElementById("user_guessed_letter").addEventListener("keypress", function (event) { // listening for enter key pressed
        if (event.key === "Enter") {
            event.preventDefault();
            WORD_CHECKER(word_length, word);
        }
    });

    submit.addEventListener("click", function () { // listining for enter button click 
        WORD_CHECKER(word_length, word);
    });
}


//==========================function to check the generated word with the user entred letter=================

function WORD_CHECKER(word_length, word) {

    incorrect = 0;//-------------------resetting the valuse of incorrect count --------------


    //==================================Logic to check if the entred letter matches with any of the letter present in the selected word=============

    for (var i = 0; i < word_length; i++) {

        if (used_letters.includes(user_input.value)) {
            console.log("allready entred " + user_input.value + " try another");
            alert("You have allready entred the letter: " + user_input.value);
            break;
        }
        else if (user_input.value.toLowerCase() == word[i]) {
            console.log(user_input.value + " is the correct letter");

            for (let j = 0; j < word_length; j++) {  //----------Adding the entred letter to its proper index in the word with the current matched word-------
                if (j != i) {
                    dashes[i] = word[i] + " ";
                }
            }
            is_correct = true;
            correct_count++;
        }
        else if (user_input.value.toLowerCase() != word[i] && user_input.value != "" && !used_letters.includes(user_input.value)) {
            incorrect++;
        }
    }

    word_length_label.innerText = dashes; // displaying the new updated dash---------------

    //============================logic to check the current state incorect or correct, and handelling the remaining guesses count accordingly=====================

    if (incorrect == word_length) {
        is_correct = false;
        remaining_guesses.innerText = remaining_guesses.innerText - 1;
    }
    else if (correct_count == word_length) {
        alert("You found all the letters, the letter was " + word);
        location.reload();
    }

    //============================checking and updating the user their remaining guesses has been finished==========================================

    if (remaining_guesses.innerText == 0 || remaining_guesses.innerText < 0) {
        alert("Your remaining guesses has been finished the word was " + word);
        location.reload();
    }

    user_input.focus(); //focussing the user cursor to the input field

    //===================================checking and updating the used letter accordingly===============================================
    if (!used_letters.includes(user_input.value.toLowerCase())) {
        USED_ADD(user_input.value);
    }
    user_input.value = ''; // clearing the input field for the next letter input---------------------------
}

//====================function to add the user input letter to the used letter list according to its presence in the array=====================

function USED_ADD(user_input) {
    if (user_input.toLowerCase() !== "" && !used_letters.includes(user_input)) {
        used_letters.push(user_input);
        var new_list = document.createElement("li");
        new_list.innerText = user_input;

        // different color of box shadow green box shadow if the user input letter matches with one of the selected word and red if not

        if (is_correct) {
            new_list.style.boxShadow = "5px 5px 5px #5CB338, 2px -5px 5px #5CB338, 5px -5px 5px #5CB338, -5px 5px 5px #5CB338";
        } else {
            new_list.style.boxShadow = "5px 5px 15px #FCC737, 2px -5px 15px #F26B0F, 5px -5px 15px #7E1891, -5px 5px 15px #E73879";
        }
        listbody.appendChild(new_list);//adding a new li element with the inner text as the user input letter
    }

}
