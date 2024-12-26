const cRadiobutton = document.querySelectorAll('input[name=level]');
let used_letters = [];
// console.log("hello");

//========================referencing html ================================

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
let dashes = []; // Initialize an empty string
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
    // ======================================================================
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
        dashes += "_ ";
    }

    word_length_label.innerText = dashes;
    dashes = [];

    document.getElementById("user_guessed_letter").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            WORD_CHECKER(word_length, word);
        }
    });

    submit.addEventListener("click", function () {
        WORD_CHECKER(word_length, word);
    });
    console.log(word);
}


//==========================function to check the generated word with the user entred letter=================
function WORD_CHECKER(word_length, word) {

    // console.log(word);

    // console.log(used_letters.length);

    incorrect = 0;
    for (var i = 0; i < word_length; i++) {

        if (user_input.value.toLowerCase() == used_letters[i]) {
            console.log("allready entred " + user_input.value + " try another");
            break;
        }
        else if (user_input.value.toLowerCase() == word[i]) {
            console.log(user_input.value + " is the correct letter");
            console.log(dashes);
            for (let j = 0; j < word_length; j++) {
                if (j != i) {
                    dashes[j] = "_ ";
                    console.log("index " + i + " j = " + j);
                }
                else {
                    dashes[i] = word[i] + " ";
                }
                console.log(dashes);
                console.log("index " + i + " j = " + j);

            }


            is_correct = true;
            correct_count++;
        }

        else if (user_input.value.toLowerCase() != word[i]) {
            // console.log("wrong");
            incorrect++;
        }
    }

    word_length_label.innerText = dashes;


    if (incorrect == word_length) {

        is_correct = false;
        remaining_guesses.innerText = remaining_guesses.innerText - 1;
        // console.log(remaining_guesses.innerText);
    }
    else if (correct_count == word_length) {
        console.log("You found all the letters, the word was " + word);
        // console.log("the word was " + word);
    }

    // console.log(correct_count);

    user_input.focus();

    if (!used_letters.includes(user_input.value)) {
        USED_ADD(user_input.value);
    }

    user_input.value = '';
}

function USED_ADD(user_input) {
    if (user_input.toLowerCase() !== "" && !used_letters.includes(user_input)) {
        used_letters.push(user_input);
        var new_list = document.createElement("li");
        new_list.innerText = user_input;
        if (is_correct) {
            new_list.style.boxShadow = "5px 5px 5px #5CB338, 2px -5px 5px #5CB338, 5px -5px 5px #5CB338, -5px 5px 5px #5CB338";
        } else {
            new_list.style.boxShadow = "5px 5px 15px #FCC737, 2px -5px 15px #F26B0F, 5px -5px 15px #7E1891, -5px 5px 15px #E73879";
        }

        listbody.appendChild(new_list);
    }
}
