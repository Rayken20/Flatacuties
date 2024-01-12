document.addEventListener('DOMContentLoaded', function () {
    const animalListContainer = document.getElementById('animalList');
    const animalDetailsContainer = document.getElementById('animalDetails');

    // Fetch data from the local server
    fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(data => {
            // Call function to display the list of animals
            displayAnimalList(data);
        });

    // Function to display the list of animals
    function displayAnimalList(animals) {
        // Loop through the animals and create list items
        animals.forEach(animal => {
            const listItem = document.createElement('li');
            listItem.textContent = animal.name;

            // Add click event listener to each list item
            listItem.addEventListener('click', function () {
                // Call function to display the details of the selected animal
                displayAnimalDetails(animal);
            });

            // Append the list item to the container
            animalListContainer.appendChild(listItem);
        });
    }

    // Function to display the details of the selected animal
    function displayAnimalDetails(animal) {
        // Clear previous details
        animalDetailsContainer.innerHTML = '';

        // Create elements to display the details
        const animalName = document.createElement('h2');
        animalName.textContent = animal.name;

        const animalImage = document.createElement('img');
        animalImage.src = animal.image;
        animalImage.alt = animal.name;

        const votesLabel = document.createElement('p');
        votesLabel.textContent = 'Votes: ';

        const votesCount = document.createElement('span');
        votesCount.textContent = animal.votes;

        // Input field for voting
        const voteInput = document.createElement('input');
        voteInput.type = 'number';
        voteInput.id = 'voteCount';
        voteInput.name = 'voteCount';
        voteInput.value = animal.votes;

        // Button to vote
        const voteButton = document.createElement('button');
        voteButton.textContent = 'Vote';
        voteButton.addEventListener('click', function () {
            // Call function to handle the vote submission
            submitVote(animal.id, voteInput);
        });

        // Button to reset votes
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset Votes';
        resetButton.addEventListener('click', function () {
            // Call function to reset votes
            resetVotes(animal.id, voteInput);
        });

        // Append elements to the container
        animalDetailsContainer.appendChild(animalName);
        animalDetailsContainer.appendChild(animalImage);
        animalDetailsContainer.appendChild(votesLabel);
        animalDetailsContainer.appendChild(votesCount);
        animalDetailsContainer.appendChild(voteInput);
        animalDetailsContainer.appendChild(voteButton);
        animalDetailsContainer.appendChild(resetButton);
    }

    // Function to handle vote submission
    function submitVote(animalId, voteInput) {
        const newVotes = parseInt(voteInput.value) + 1;

        // Update the server with the new votes count
        updateVotes(animalId, newVotes, voteInput);
    }

    // Function to reset votes
    function resetVotes(animalId, voteInput) {
        const resetVotes = 0;

        // Update the server with the new votes count
        updateVotes(animalId, resetVotes, voteInput);
    }

    // Function to update votes on the server
    function updateVotes(animalId, newVotes, voteInput) {
        fetch(`http://localhost:3000/characters/${animalId}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ votes: newVotes }),
        })
            .then(response => response.json())
            .then(data => {
                // Update the displayed votes count
                voteInput.value = data.votes;
                displayAnimalDetails(data); // Refresh the details to update votes count
            })
            .catch(error => {
                console.error('Error updating votes:', error);
            });
    }
});
