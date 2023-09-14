const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 20
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="goToCard('${pokemon.number}', '${pokemon.name}','${pokemon.photo}', '${pokemon.types}')">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = [])=> {
        const newHtml = pokemons.map(convertPokemonToLi).join('') 
        pokemonList.innerHTML += newHtml
   })
}

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
        offset += limit
        const qtdRecordsWithNexPage = offset + limit

        if (qtdRecordsWithNexPage >= maxRecords) {
            const newLimit = maxRecords - offset
            
            loadPokemonItens(offset, newLimit)
        } else {
            loadPokemonItens(offset, limit)
        }
    }
})

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage => maxRecords) {
        const newLimit = maxRecords - offset 
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{
        loadPokemonItens(offset, limit)
    }
})