
const pokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const formSearch = document.querySelector('[data-js="form-search"]')
const ul = document.querySelector('[data-js="pokedex"]')


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
    ul.innerHTML = pokemons
}



const fetchPokemon = async () => {

    // resolveu o array de Promises dos pokemons 
    const PokemonsPromises = await Promise.all(gerarPokemonsPromises())

    const dataPokemons = generateHTML(PokemonsPromises)
    
    inserirPokemonPage(dataPokemons)

}


//filtrar os pokemons
const filterPokemons = (listaPokemons, inputValue, checkValues) => listaPokemons
    .filter(pokemon => {
        const check = pokemon.textContent.toLowerCase().includes(inputValue)
        return checkValues ? check : !check
    })
//Manipular as classes para adicionar e remover
const ManipularClasses = (listaPokemons, classAdd, classRemove) => {
    listaPokemons.forEach(pokemon => {
        pokemon.classList.add(classAdd)
        pokemon.classList.remove(classRemove)
    })
}    

//Lógica para mostrar o pokemon 
const showPokemon = (inputValue, listaPokemons) => {
    const show = filterPokemons(listaPokemons,inputValue, true)
    ManipularClasses(show,'dflex','hidden' )
}
//Lógica para esconder os pokemons
const hidePokemon = (inputValue, listaPokemons) => {
    const hidden = filterPokemons(listaPokemons, inputValue, false)
    ManipularClasses(hidden,'hidden','dflex')

}


// execução das funções acima

formSearch.addEventListener('input', event => {
    event.preventDefault()
    const inputValue = event.target.value.trim().toLowerCase()
    const listaPokemons = Array.from(ul.children)

    hidePokemon(inputValue, listaPokemons)
    showPokemon(inputValue, listaPokemons)
        
})

fetchPokemon()