
const flatURL = "http://localhost:3000";
// Global Variables
const characterBarDiv = document.getElementById('character-bar');
const characterInfoDiv = document.getElementById('detailed-info');

// Animal Information
const characterInfoImage = document.getElementById('image');
const characterInfoName = document.getElementById('name');
const characterInfoVotes = document.getElementById('vote-count');

// Functions to Run First

const fetchGifs = () => {
    fetch(flatURL + "/characters")
    .then((response) => response.json())
    .then((characterArr) => {
        displayCharacters(characterArr);
    })
}

const displayCharacters = (characterArr) => {
    characterArr.forEach((characterObj) => {
        generateSpan(characterObj);
    })
}

const generateSpan = (characterObj) => {
    const characterSpan = document.createElement('span');
    characterSpan.name = characterObj.name;
    characterSpan.textContent = characterObj.name;
    characterSpan.votes = characterObj.votes;
    characterSpan.src = characterObj.image;
    characterSpan.image = characterObj.image;
    characterSpan.id = `character${characterObj.id}`;
    characterBarDiv.appendChild(characterSpan);
    clickSpanForDetails(characterSpan);
    firstSpan(characterSpan);
}

const clickSpanForDetails = (characterSpan) => {
    characterSpan.addEventListener('click', (event) => {
        mainCharacterDisplay(event.target);
    })
}

const firstSpan = (characterSpan) => {
    if (characterSpan.id === "character1"){
        mainCharacterDisplay(characterSpan);
    }
}

const mainCharacterDisplay = (character) => {
    characterInfoImage.src = character.src;
    characterInfoName.textContent = character.textContent;
    characterInfoVotes.textContent = character.votes;
}

// Additional Functions

const createCharacter = () => {
    const newCharForm = document.getElementById('character-form');
 newCharForm.AddEventListener('submit', (event) => {
        const newCharacter = {
            name: event.target.name.value,
            image: event.target["image-url"].value,
            src: event.target["image-url"].value,
            votes: 0
        }
        generateSpan(newCharacter);
        mainCharacterDisplay(newCharacter);
        event.preventDefault();
        newCharForm.reset();
    })
}

const submitVotesForm = () => {
    const votesForm = document.getElementById('votes-form');
    votesForm.addEventListener('submit', (event) => {
        const prevVotes = Number(characterInfoVotes.textContent);
        const newVotes = Number(votesForm.votes.value);
        const totalVotes = prevVotes + newVotes;
        characterInfoVotes.textContent = Number(totalVotes);
        event.preventDefault();
        votesForm.reset();
    })
}

const resetVotes = () => {
    const resetBtn = document.getElementById("reset-btn");
    resetBtn.addEventListener('click', () => {
        characterInfoVotes.textContent = 0;
    })
}

document.addEventListener('DOMContentLoaded', () => {
    fetchGifs();  
    submitVotesForm();
    resetVotes();
})