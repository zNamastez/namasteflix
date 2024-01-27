import React, { useState, useEffect } from "react";
import "../Css/FilmesPesquisa.css";

const FilmesPesquisa = ({ Items }) => {
    const results = Items.results || [];
    const [imdbId, setImdbId] = useState(null);

    const handleItemClick = async (itemId, mediaType) => {
        try {
            const newImdbId = await getImdbIdByMovieId(itemId, mediaType);
            if (newImdbId) {
                const tipoExibicao = mediaType === "tv" ? "serie" : "filme";
                window.location.href = `https://embed.warezcdn.com/${tipoExibicao}/${newImdbId}`;
            } else {
                console.error('IMDB ID não encontrado para o filme/série.');
            }
        } catch (error) {
            console.error('Erro ao processar clique:', error.message);
        }
    };

    const getImdbIdByMovieId = async (itemId, mediaType) => {
        try {
            const tmdbApiKey = 'c63e10c3b759ad5f85001d236986cad6';
            const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${itemId}?api_key=${tmdbApiKey}&append_to_response=external_ids`);
            const data = await response.json();

            let newImdbId;

            if (mediaType === 'tv') {
                newImdbId = data.external_ids && data.external_ids.imdb_id ? data.external_ids.imdb_id : null;
            } else if (mediaType === 'movie') {
                newImdbId = data.imdb_id || null;
            } else {
                newImdbId = null;
            }

            if (newImdbId) {
                setImdbId(newImdbId);
                console.log(`IMDB ID do Filme/Série: ${newImdbId}`);
                return newImdbId;
            } else {
                console.error('IMDB ID não encontrado para o filme/série.');
                return null;
            }
        } catch (error) {
            console.error('Erro ao obter IMDB ID:', error.message);
            return null;
        }
    };

    return (
        <div className="moviePesquisa">
            <div className="movieRow--listarea">
                <div className="movieRow--list">
                    {results.map((item, key) => (
                        item.poster_path && ( // Verifica se poster_path está presente
                            <div key={key} className="movieRow--it" onClick={() => handleItemClick(item.id, item.media_type)}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                    alt={`Poster ${item.title || item.name}`}
                                    style={{ width: "200px", height: "300px" }}
                                />
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilmesPesquisa;
