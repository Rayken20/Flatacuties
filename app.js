// Sends a GET request-->
fetch('http://localhost:3000/characters/')
// We are converting the response to JSON FORMAT
.then(res => res.json())
// We are passing the resulting data to the 'displayAnimalsData' function
  .then(data => displayAnimalsData(data))
  // This function receives an array of animal objects and displays them on the page
function displayAnimalsData(animals) {
  let cutest = document.querySelector('#animal-list');
  // In order to go thru all characters, we are creating a loop to iterate through each animal in the array
  animals.forEach(animal => {
    // We are now creating a new list item element for the current animal
    let cute = document.createElement('li');
    cute.innerHTML = `
      <img src="${animal.image}" class="border">
       <div class="content">
        <h4>${animal.name}</h4>
        <p><span id="vote-count-${animal.id}" class ="voteC">${animal.votes} Votes</span></p>
        <div>
          <button id="vote-btn-${animal.id}" class="vote-btn" data-id="${animal.id}">Vote</button>
          <button class="reset-btn" data-id="${animal.id}">Reset</button>
        </div>
      </div>`;
 // Add the new list item to the animal list on the page
    cutest.appendChild(cute);
    // Get the vote button and vote count HTML elements for the current animal
    const voteBtn = document.getElementById(`vote-btn-${animal.id}`);
    const voteCount = document.getElementById(`vote-count-${animal.id}`);
    // Add a click event listener to the vote button
    voteBtn.addEventListener('click', () => {
    // Increment the vote count for the current animal by
      animal.votes += 1;
      voteCount.textContent = `${animal.votes} Votes`;
      fetch(`http://localhost:3000/characters/${animal.id}`,{
    // Send a PUT request to the local server with updated animal data
        method: 'PUT', //<!-- This is the main content area of the web page. -->
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(animal)
      });
    });
    const resetBtn = document.querySelector(`[data-id="${animal.id}"].reset-btn`);
    resetBtn.addEventListener('click', () => {
    // Set the vote count for the current animal back to 0
      animal.votes = 0;
      voteCount.textContent = `${animal.votes} Votes`;
      fetch(`http://localhost:3000/characters/${animal.id}`,{
    // Send a PUT request to the local server with updated animal data
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(animal)
      });
    });
  });
}
// Get the animal form HTML element
const addForm = document.querySelector('#animal-form');
function addAnimals(e) {
  e.preventDefault();
  const nameAnimal = document.querySelector('#name')
  const animalImage = document.querySelector('#image')
  const animal = {
    name: nameAnimal.value,
    image: animalImage.value,
    votes: 0
  };
  fetch('http://localhost:3000/characters', {
     // Send a POST request to the local server with the new animal data
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(animal)
    })
    .then(res => res.json())
    .then(() => {
        nameAnimal.value  = '';
      animalImage.value = '';
      fetch('http://localhost:3000/characters')
        .then(res => res.json())
        .then(animals => displayAnimalsData(animals));
    });
}
// Add a submit event listener to the animal form
addForm.addEventListener('submit', addAnimals);