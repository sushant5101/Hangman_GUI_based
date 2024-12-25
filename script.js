const cRadiobutton = document.querySelectorAll('input[name=level]');
// console.log("hello");

cRadiobutton.forEach(radio => {
    radio.addEventListener('change', () => {
        switch (radio.value) {
            case "easy":
                EASY_LEVEL();
                break;

            case "medium":
                console.log("medium");
                break;

            case "hard":
                console.log("hard");
                break;

            default:
                console.log("failed");
                return 1;
                break;
        }
    });
});


function EASY_LEVEL() {
    console.log("easy");

    document.getElementById("user_guessed_letter").disabled = false;
    document.getElementById("user_guessed_letter").focus();
    document.getElementById("user_guessed_letter").title ="guess a letter";
    document.getElementById("submit").disabled = false;
    document.getElementById("submit").style.cursor = "pointer";
    document.getElementById("submit").title = "Check your guess";
    cRadiobutton.forEach(function (radio) {
        radio.disabled = true;
    });

    var iRand_word_index = Math.floor(Math.random() * 10);
    var iRemainiing_guesses = 8;
    const cEasy_words = ["apple",
        "chair",
        "happy",
        "house",
        "water",
        "light",
        "music",
        "pizza",
        "river",
        "tiger"];

    console.log(cEasy_words[iRand_word_index] + " and the random number is " + iRand_word_index);

    document.getElementById("submit").addEventListener("click", function () {
        if (document.getElementById("user_guessed_letter").value == cEasy_words[iRand_word_index][0]) {
            console.log("correct");
        } else {
            console.log("Did not match");
        }
    });
}
