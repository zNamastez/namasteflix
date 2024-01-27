import React, { useState, useEffect } from "react";
import "./FeatureMovie.css";

const FeatureMovie = ({ item }) => {
    const [imdbId, setImdbId] = useState(null);

    // Certifique-se de substituir 'SUA_API_KEY' pela sua chave de API do TMDb
    const tmdbApiKey = 'c63e10c3b759ad5f85001d236986cad6';

    useEffect(() => {
        const getImdbIdByMovieId = async (movieId) => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${movieId}?api_key=${tmdbApiKey}&append_to_response=external_ids`);
                const data = await response.json();

                if (data.external_ids && data.external_ids.imdb_id) {
                    const newImdbId = data.external_ids.imdb_id;
                    setImdbId(newImdbId);
                    console.log(`IMDB ID do Filme: ${newImdbId}`);
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


    let firtsDate = new Date(item.first_air_date)
    let genres = []
    for (let i in item.genres) {
        genres.push(item.genres[i].name)
    }

    let description = item.overview
    if (description.length > 200) {
        description = description.substring(0, 200) + "..."
    }


    return (
        <section className="featured" style={{
            background: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">
                        {item.name}
                    </div>
                    <div className="featured--info">
                        <div className="featured--points">
                            {item.vote_average} pontos
                        </div>
                        <div className="featured--year">
                            {firtsDate.getFullYear()}
                        </div>
                        <div className="featured--seasons">
                            {item.number_of_seasons} Temporadas
                        </div>
                        <div className="featred--descriptions">
                            {description}
                        </div>
                        <div className="featured--buttons">
                            <a className="featured--watchbutton" href={`https://embed.warezcdn.com/serie/${imdbId}`}>► Assistir
                            </a>
                        </div>
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
