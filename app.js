
const pokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`


// gerou 150 pokemons em JSON.
const gerarPokemonsPromises = () => Array(150).fill().map((_,index) => 
    fetch(pokemonUrl(index + 1)).then(response => response.json()))

// Gerou os elementos HTML 
const generateHTML = pokemons => pokemons.reduce((acc,{ name, id, types }) => {
    const type = types.map(typeInfo => typeInfo.type.name)

    acc += `<li class="card ${type[0]}">
        <img class="card-image"
        src="https://cdn.traction.one/pokedex/pokemon/${id}.png"
        alt="${name}">
        <h2 class="card-title">${id}. - ${name}</h2>
        <p class="card-subtitle">${type.join(' | ')}</p>
    </li>`

    return acc
},'')


const inserirPokemonPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const fetchPokemon = async () => {

    // resolveu o array de Promises dos pokemons 
    const PokemonsPromises = await Promise.all(gerarPokemonsPromises())

    const dataPokemons = generateHTML(PokemonsPromises)
    
    inserirPokemonPage(dataPokemons)

}

fetchPokemon()