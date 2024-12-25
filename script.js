const cRadiobutton = document.querySelectorAll('input[name=level]');
let used_letters = [];
// console.log("hello");

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
    const easy_words = ["apple",
        "chair",
        "happy",
        "house",
        "water",
        "light",
        "music",
        "pizza",
        "river",
        "tiger"];
    // ======================words to be used for medium level===================
    const medium_words = ["bicycle",
        "compass",
        "library",
        "mountain",
        "mystery",
        "popcorn",
        "rainbow",
        "scissors",
        "volcano",
        "whistle"];
    // ==================words for high level difficulty===================

    const hard_words = ["ostentatious",
        "nebulous",
        "esoteric",
        "surreptitious",
        "languorous",
        "quixotic",
        "ebullient",
        "lugubrious",
        "obfuscate",
        "sesquipedalian"];
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
    word_length_label.innerText = "The word is made up of " + word_length + " words";

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

    const guessed_letter = user_input.value.toLowerCase();
    if (guessed_letter !== "" && !used_letters.includes(guessed_letter)) {
        used_letters.push(guessed_letter); 
        var new_list = document.createElement("li"); 
        new_list.innerText = guessed_letter;
        listbody.appendChild(new_list);
    }

    console.log(used_letters.length);

    incorrect = 0;
    correct_count = 0;
    for (var i = 0; i < word_length; i++) {

        if (user_input.value == used_letters[i]) {
            console.log("allready entred " + user_input.value + " try another");
            break;
        }
        else if (user_input.value == word[i]) {
            console.log(user_input.value + " is the correct letter");
            correct_count++;
            used_letters = user_input.value;
        }

        else if (user_input.value != word[i]) {
            console.log("wrong");
            used_letters.push(user_input.value);
            incorrect++;
        }
    }

    if (incorrect == word_length) {

        remaining_guesses.innerText = remaining_guesses.innerText - 1;
        // console.log(remaining_guesses.innerText);
    }
    else if (correct_count == word_length) {
        console.log("You found all the letters");
        // console.log("the word was " + word);
    }

    user_input.focus();

    user_input.value = '';
}
