let pokemonRepository = (function () {
  let pokemonList = [];
  // Initializes an empty list to store Pokémon

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  // The API URL to get the first 150 Pokémon


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

  function addListItem(pokemon) {
    // Adds the button with pokemn list
    let pokemonListElement = document.querySelector('.pokemonlist');
    // 'pokemonList' refers to the <ul>
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    // This will set the Pokémon name on the button
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    // Append the list item to the <ul>
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);

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

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
      hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(response => response.json())
      .then(details => {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map(type => type.type.name);
      }).catch(error => {
        console.error("Error loading details:", error);
      });
  }

  function showLoadingMessage() {
    console.log("Loading... Please wait.");
    // Additional code to display a loading message in the UI can be added here
  }

  function hideLoadingMessage() {
    console.log("Loading complete.");
    // Additional code to hide the loading message in the UI can be added here
  }

  function showDetails(pokemon) {
    return loadDetails(pokemon).then(() => {
      console.log(pokemon);
      // Logs details to the console
      // Additional code to display Pokémon details can be added here
    });
  }

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

console.log(pokemonRepository.getAll());

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