let pokemonList = [
  { name: 'Charizard', height: 1.7, types: ['fire', 'flying'], weight: 90.5 },
  { name: 'Blastoise', height: 1.6, types: ['water'], weight: 85.5 },
  { name: 'Ninetales', height: 1.1, types: ['fire'], weight: 19.9 }
];

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height < 1.5) {
    console.log("Wow, that’s big!");
  }
  else if (pokemonList[i].height > 0.5 && pokemonList.height < 1.5) {
    console.log("average pokemon");
  }
  else (pokemonList[i].height > 0.5); {
    console.log("Wow, so small!");
  }
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") <p></p>");
}
