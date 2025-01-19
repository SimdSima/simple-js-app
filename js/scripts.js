let pokemonRepository = (function () {
  let pokemonList = [];
  // Initializes an empty list to store Pokémon
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  // The API URL to get the first 150 Pokémon

  //Adds pokemon in repository
  function add(pokemon) {
    // Checking if added Pokemon Item to a list is an Object
    if (typeof pokemon === 'object' && 'name' in pokemon
      && 'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
      return true;
    } else {
      console.log('Pokemon type is not an object or missing required properties');
      return false;
    }
  }

  function getAll() {
    return pokemonList;
  }

  //Creates buttons on the page for each pokemon in repository
  function addListItem(pokemon) {
    // Adds the button with pokemn list
    let pokemonList = document.querySelector('.pokemonlist');
    // 'pokemonList' refers to the <ul>
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    // This will set the Pokémon name on the button
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    // Append the list item to the <ul>
    pokemonList.appendChild(listItem);
    listItem.appendChild(button);

    //event listener to the button
    button.addEventListener('click', function () {
      showLoadingMessage();
      loadDetails(pokemon).then(function () {
        return showDetails(pokemon); // Added return - ensure we wait for showDetails to complete
        // When the button is clicked, show details
      }).then(() => {
        hideLoadingMessage();
      }).catch(function (error) {
        console.error("Error loading details:", error);
        hideLoadingMessage();
      });
    });
  }

  function showDetails(pokemon) {
    // Extracting the necessary details from the pokemon object
    let title = pokemon.name;
    let text = `Height: ${pokemon.height}`;
    let img = pokemon.imageUrl;

    // Now we call showModal with the correct parameters
    showModal(title, text, img);
  }

  //Fetches list of pokemons from API
  function loadList() {
    // showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
  
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    })
  }

  //Fetches pokemon's details from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    showLoadingMessage();

    return fetch(url).then(response => response.json())
      .then(details => {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(error => {
        hideLoadingMessage();
        console.error("Error loading details:", error);
      });
  }

  //Displays loading msg while API is fetching data
  function showLoadingMessage() {
    let pokemonList = document.querySelector('.pokemonlist');
    let message = document.createElement('p');
    message.classList.add('loading-message');
    message.innerText = 'Retrieving Pokemon data... Please wait.';
    // Additional code to display a loading message in the UI can be added here
    pokemonList.appendChild(message);
  }

  function hideLoadingMessage() {
    console.log("Loading complete.");
    // Additional code to hide the loading message in the UI can be added here
    //let message = document.querySelector('.loading-message');
    //message.remove();
  }

  //Brings up details modal about clicked pokemon
  function showModal(title, text, img) {
    let modalContainer = document.querySelector('#modal-container');
    // Clear all existing modal content
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modalContainer.appendChild(modal);

    let name = document.createElement('h1');
    name.innerText = title;

    let height = document.createElement('p');
    height.innerText = text;

    let image = document.createElement('img');
    image.setAttribute('src', img);
    image.setAttribute('width', '65%');
    image.setAttribute('height', '65%');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    modal.appendChild(closeButtonElement);
    modal.appendChild(height);
    modal.appendChild(image);
    modalContainer.appendChild(modal);


    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal container,
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    //Prevents scrolling of the main page
    document.body.style.overflow = 'hidden';
  }

  let dialogPromiseReject; // Declare the variable at the top

  function hideModal() {
    let modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  function showDialog(title, text) {
    showModal(title, text);

    // We want to add a confirm and cancel button to the modal
    let modal = modalContainer.querySelector('.modal');

    let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';

    let cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    // We want to focus the confirmButton so that the user can simply press Enter
    confirmButton.focus();

    // Return a promise that resolves when confirmed, else rejects
    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', hideModal);
      confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null; // Reset this
        hideModal();
        resolve();
      });
      // This can be used to reject from other functions
      dialogPromiseReject = reject;
    });
  }

  document.querySelector('#modal-container').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(function () {
      alert('confirmed!');
    }, () => {
      alert('not confirmed');
    });
  });

  // Call loadList after defining all functions
  loadList().then(() => {
    getAll().forEach(pokemon => {
      addListItem(pokemon);
    });
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

//Fetches pokemons from API and renders buttons on page
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

fetch('https://pokeapi.co/api/v2/pokemon/').then(function (response) {
  return response.json(); // This returns a promise!
}).then(function (pokemonList) {
  console.log(pokemonList); // The actual JSON response
}).catch(function () {
  // Error
});