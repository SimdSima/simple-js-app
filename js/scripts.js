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
    pokemonList.push(pokemon);
    // Checking if added Pokemon Item to a list is an Object
    if (typeof pokemon === 'object')
      return true
  }
    else {
  console.log('Pokemn type is not an object') }

function getAll() {
  return pokemonList;
}

return {
  add: add,
  getAll: getAll
};

pokemonList.forEach(function (pokemon) {
  console.log(pokemon.name + ' is ' + pokemon.height + ' tall.')
});

} ) ();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Charizard' });
console.log(pokemonRepository.getAll());


// Set thresholds for big and small Pokémon
const bigHeightThreshold = 1.5;
const smallHeightThreshold = 0.5;

for (let i = 0; i < pokemonList.length; i++) {
  let message = "";
  if (pokemonList[i].height > bigHeightThreshold) {
    // Pokémon is considered big if its height is greater than the bigHeightThreshold
    message = "Wow, that's big!";
  }
  else if (pokemonList[i].height <= bigHeightThreshold && pokemonList[i].height > smallHeightThreshold) {
    // Pokémon is considered average if its height is less than or equal to bigHeightThreshold and greater than smallHeightThreshold
    message = "Average size Pokémon";
  }
  else {
    // Pokémon is considered small if its height is less than or equal to smallHeightThreshold
    message = "Wow, so small!";
  }

  // Output the information
  document.write("<p class='" + (pokemonList[i].height > bigHeightThreshold ? "big" : (pokemonList[i].height <= bigHeightThreshold && pokemonList[i].height > smallHeightThreshold ? "average" : "small")) + "'>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ") - " + message + "</p>");
}