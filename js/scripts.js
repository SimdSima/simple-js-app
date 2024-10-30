let pokemonList = [
  { name: 'Charizard', height: 1.7, types: ['fire', 'flying'], weight: 90.5 },
  { name: 'Blastoise', height: 1.6, types: ['water'], weight: 85.5 },
  { name: 'Ninetales', height: 1.1, types: ['fire'], weight: 19.9 }
];

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

printArrayDetails(pokemonList); 
// executes the function using ‘pokemonList‘ as its input

printArrayDetails(pokemonList2); 
// executes the function using ‘pokemonList2‘ as its input

);