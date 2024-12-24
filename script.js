const cRadiobutton = document.querySelectorAll('input[name=level]');
// console.log("hello");

cRadiobutton.forEach(radio => { radio.addEventListener('change', () => { switch(radio.value){
    case "easy":
        console.log("easy");
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
} }); });
