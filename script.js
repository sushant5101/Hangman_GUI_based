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
                break;
        }
    });
});


function EASY_LEVEL() {
    console.log("easy");

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

    while (iRemainiing_guesses > 0) {
        
    }

}
