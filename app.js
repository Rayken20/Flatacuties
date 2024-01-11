// Code inside this block will run when the DOM is fully loaded
    // async/await is used to handle asynchronous tasks more effectively
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

    // Event listener for voting
    document.getElementById('voteButton').addEventListener('click', () => {
        const voteCount = document.getElementById('voteCount').value;
        const selectedCharacterId = document.getElementById('selectedCharacterImage').getAttribute('data-id');
        handleVote(selectedCharacterId, voteCount);
    });

    // Event listener for resetting votes
    document.getElementById('resetButton').addEventListener('click', () => {
        resetVotes();
    });

    // Function to create a character card
    function createCharacterCard(character) {
        const card = document.createElement('div');
        card.classList.add('character-card');
        card.setAttribute('data-id', character.id);

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

        // Add event listener to the character card for voting
        card.addEventListener('click', () => {
            // Update the selected character image
            document.getElementById('selectedCharacterImage').src = character.image;
            document.getElementById('selectedCharacterImage').setAttribute('data-id', character.id);
        });

        return card;
    }

    // Function to handle voting
    function handleVote(characterId, voteCount) {
        // Perform actions to submit the vote, update UI, etc.
        console.log(`Voting for character with ID ${characterId} and ${voteCount} votes`);
        
    }

    // Function to reset votes
    function resetVotes() {
        // Add logic to reset votes
        console.log('Votes reset');
    }
    
   })