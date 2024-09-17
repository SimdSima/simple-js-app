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
      showDetails(pokemon);  
      // When the button is clicked, show details
    });
  };

  function showDetails(pokemon) {
    console.log(pokemon.name)
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] });

console.log(pokemonRepository.getAll());

// Using the getAll method to get the list of Pokemon
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
}

);