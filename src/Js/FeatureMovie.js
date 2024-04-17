import React, { useState, useEffect } from "react";
import "../Css/FeatureMovie.css";

const FeatureMovie = ({ item }) => {

    // Definindo useState
    const [imdbId, setImdbId] = useState(null);

    // Certifique-se de substituir 'SUA_API_KEY' pela sua chave de API do TMDb
    const tmdbApiKey = 'c63e10c3b759ad5f85001d236986cad6';

    useEffect(() => {

        // Função para capturar o IMDB id
        const getImdbIdByMovieId = async (movieId) => {

            try {

                const response = await fetch(`https://api.themoviedb.org/3/tv/${movieId}?api_key=${tmdbApiKey}&append_to_response=external_ids`);
                const data = await response.json();

                // Capturando o IMDB id
                if (data.external_ids && data.external_ids.imdb_id) {
                    const newImdbId = data.external_ids.imdb_id;
                    setImdbId(newImdbId);
                } else {
                    console.error('IMDB ID não encontrado para o filme.');
                }
            } catch (error) {
                console.error('Erro ao obter IMDB ID:', error.message);
            }
        };

        // Exemplo de uso
        getImdbIdByMovieId(item.id); // Substitua 123 pelo ID do filme no TMDB que você tem
    }, [item.id, tmdbApiKey]);


    // Definindo o ano de lançamento
    let firtsDate = new Date(item.first_air_date)

    // Definindo gêneros
    let genres = []
    for (let i in item.genres) {
        genres.push(item.genres[i].name)
    }

    // Setando o maxímo de caracteres da descrição
    let description = item.overview
    if (description.length > 200) {
        description = description.substring(0, 200) + "..."
    }

    // Renderizando componetne
    return (
        <section className="featured" style={{
            background: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">

                    {/* Nome */}
                    <div className="featured--name">
                        {item.name}
                    </div>

                    {/* Div das informações da série */}
                    <div className="featured--info">

                        {/* Nota */}
                        <div className="featured--points">
                            {item.vote_average} pontos
                        </div>

                        {/* Ano de lançamento */}
                        <div className="featured--year">
                            {firtsDate.getFullYear()}
                        </div>

                        {/* Temporadas */}
                        <div className="featured--seasons">
                            {item.number_of_seasons} {item.number_of_seasons === 1 ? 'Temporada' : 'Temporadas'}
                        </div>

                        {/* Descricção */}
                        <div className="featred--descriptions">
                            {description}
                        </div>

                        {/* Botão para assistir */}
                        <div className="featured--buttons">
                            <a className="featured--watchbutton" href={`https://embed.warezcdn.com/serie/${imdbId}`}>► Assistir
                            </a>
                        </div>

                        {/* Exibição dos gêneros */}
                        <div className="featured--genres">
                            <strong>Gêneros:</strong> {genres.join(", ")}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureMovie;
