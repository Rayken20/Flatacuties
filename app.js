document.addEventListener('DOMContentLoaded', () => {
    const characterList = document.getElementById('characterList');

    // Fetch data from the local server
    fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(characters => {
            // Process the retrieved characters and display on the page
            characters.forEach(character => {
                const characterCard = createCharacterCard(character);
                characterList.appendChild(characterCard);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to create a character card
    function createCharacterCard(character) {
        const card = document.createElement('div');
        card.classList.add('character-card');

        const image = document.createElement('img');
        image.src = character.image;
        image.alt = character.name;

        const name = document.createElement('h2');
        name.textContent = character.name;

        const votes = document.createElement('p');
        votes.textContent = `Votes: ${character.votes}`;

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(votes);

        return card;
    }
});
