// Definições da API
const apiKey = "c63e10c3b759ad5f85001d236986cad6";
const apiBase = "https://api.themoviedb.org/3";

// Função para fazer requisições
const FetchRequisicao = async (url) => {
    const requisicao = await fetch(`${apiBase}${url}`);
    const json = await requisicao.json()
    return json;
}

export default {

    // Função para pegar informações de filmes por categoria
    Categorias: async () => {
        return [{

            slug: "SeriesEmAlta",
            title: "Séries Em Alta",
            type: "tv",
            items: await FetchRequisicao(`/tv/top_rated?language=pt-BR&page=1&api_key=${apiKey}`)
        },

        {
            slug: "FilmesEmAlta",
            title: "Filmes Em Alta",
            type: "movie",
            items: await FetchRequisicao(`/movie/top_rated?language=pt-BR&page=1&api_key=${apiKey}`)
        },
        {
            slug: "Açao",
            title: "Ação",
            type: "movie",
            items: await FetchRequisicao(`/discover/movie?with_genres=28&language=pt-BR&page=1&api_key=${apiKey}`)
        },
        {
            slug: "Aventura",
            title: "Aventura",
            type: "movie",
            items: await FetchRequisicao(`/discover/movie?with_genres=12&language=pt-BR&page=1&api_key=${apiKey}`)
        },
        {
            slug: "Comedia",
            title: "Comédia",
            type: "movie",
            items: await FetchRequisicao(`/discover/movie?with_genres=35&language=pt-BR&page=1&api_key=${apiKey}`)
        }
            ,
        {
            slug: "Crime",
            title: "Crime",
            type: "movie",
            items: await FetchRequisicao(`/discover/movie?with_genres=80&language=pt-BR&page=1&api_key=${apiKey}`)
        },
        {
            slug: "Drama",
            title: "Drama",
            type: "movie",
            items: await FetchRequisicao(`/discover/movie?with_genres=18&language=pt-BR&page=1&api_key=${apiKey}`)
        }]
    },

    // Função para fazer uma requisição das informações por "movie" ou "tv"
    InformacoesItem: async (ItemId, FilmeOuSerie) => {

        // definindo informações
        let informacoes = {};

        // Caso tiver um id
        if (ItemId) {

            // switch no tipo do item
            switch (FilmeOuSerie) {

                case "movie":
                    informacoes = await FetchRequisicao(`/movie/${ItemId}?language=pt-BR&api_key=${apiKey}`);
                    break;

                case "tv":
                    informacoes = await FetchRequisicao(`/tv/${ItemId}?language=pt-BR&api_key=${apiKey}`);
                    break;

                default:
                    informacoes = null
                    break;
            }
        }

        return informacoes
    }
}