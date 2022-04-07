const getpokemonURL = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const gerarPokemonsPromises = () =>  Array(150).fill().map((_,index) => {
     return fetch(getpokemonURL(index + 1)).then(response => response.json())
})

const generateHTML = pokemons => pokemons.reduce((acc, { name, id, types }) => {
     const elementsTypes = types.map(typeInfo => typeInfo.type.name)
     acc += `
          <li class="card ${elementsTypes[0]}">
            <img class="card-image"
            src="https://cdn.traction.one/pokedex/pokemon/${id}.png" 
            alt="${name}">
            <h2 class="card-title"> ${id}. - ${name}</h2>
            <p class="subtitle">${elementsTypes.join(' | ')}</p>
          </li>`
     return acc
}, '')


const insertPokemonsIntoPage = pokemons => {
     const ul = document.querySelector('[data-js="pokedex"]')
     ul.innerHTML = pokemons
 }


const PokemonsPromises = gerarPokemonsPromises()

Promise.all(PokemonsPromises)
     .then(generateHTML)
     .then(insertPokemonsIntoPage)


