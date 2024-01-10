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


function handleVote(characterId) {
    // Perform actions to submit the vote, update UI, etc.
    // Update the vote count on the server (you need to implement this logic)
    console.log(`Voting for character with ID ${characterId}`);

    // For demonstration purposes, let's assume an API endpoint to update votes
    fetch(`http://localhost:3000/characters/${characterId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            votes: 1, // Increment the votes (adjust as needed)
        }),
    })
    .then(response => response.json())
    .then(updatedCharacter => {
        // Update the displayed vote count on the UI
        const characterCard = document.querySelector(`.character-card[data-id="${characterId}"]`);
        const votesElement = characterCard.querySelector('p');
        votesElement.textContent = `Votes: ${updatedCharacter.votes}`;
    })
    .catch(error => console.error('Error updating votes:', error));
}
});