let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Charizard',
      height: 1.7,
      types: ['fire', 'flying'],
    },
    {
      name: 'Blastoise',
      height: 1.6,
      types: ['water'],
    },
    {
      name: 'Ninetales',
      height: 1.1,
      types: ['fire'],
    }
  ];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    // Checking if added Pokemon Item to a list is an Object
    if (typeof pokemon === 'object' && 'name' in pokemon
      && 'height' in pokemon && 'types' in pokemon) {
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
    let pokemonList = document.querySelector('.pokemonlist');
    // 'pokemonList' refers to the <ul>
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    // This will set the Pokémon name on the button
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    // Append the list item to the <ul>
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    //event listener to the button
    button.addEventListener('click', function () {
      showLoadingMessage();
      loadDetails(pokemon).then(function () {
        showDetails(pokemon);
        // Ensure this calls the correct showDetails function
        // When the button is clicked, show details
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
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
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

    // Call loadList after defining all functions
    loadList().then(function () {
      getAll().forEach(function (pokemon) {
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
pokemonRepository.add({ name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] });

console.log(pokemonRepository.getAll());

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
    // Additional code to display Pokémon details can be added here
  });
}

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
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