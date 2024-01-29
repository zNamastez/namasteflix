// Imports
import React, { useState, useEffect } from "react";
import "../Css/Filmes.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Filmes = ({ Titulos, Items, Tipo }) => {

    // Definindo useStates
    const [scrollX, setScrollX] = useState(0);
    const [imdbId, setImdbId] = useState(null);

    // Funçã que faz a rolagem ao clicar nos botões
    const rolar = (direction) => {
        // Função genérica para rolar para a esquerda ou direita
        let x;
        if (direction === "left") {
            x = scrollX + Math.round(window.innerWidth / 2);
            x = Math.min(0, x); // Garante que x não seja maior que 0
        } else {
            x = scrollX - Math.round(window.innerWidth / 2);
            const listaWidith = Items.results.length * 150;
            x = Math.max(window.innerWidth - listaWidith - 60, x); // Garante que x não seja menor que o limite à direita
        }

        setScrollX(x);
    };

    // Função que redireciona o usuário para o link do fime/série
    const handleItemClick = async (itemId) => {
        try {
            const newImdbId = await getImdbIdByMovieId(itemId);
            if (newImdbId) {
                const tipoExibicao = Tipo === "tv" ? "serie" : "filme";
                window.location.href = `https://embed.warezcdn.com/${tipoExibicao}/${newImdbId}`;
            } else {
                console.error('IMDB ID não encontrado para o filme.');
            }
        } catch (error) {
            console.error('Erro ao processar clique:', error.message);
        }
    };

    // Função para pegar o IMDB id
    const getImdbIdByMovieId = async (itemId) => {
        try {

            const tmdbApiKey = 'c63e10c3b759ad5f85001d236986cad6';
            const response = await fetch(`https://api.themoviedb.org/3/${Tipo}/${itemId}?api_key=${tmdbApiKey}&append_to_response=external_ids`);
            const data = await response.json();

            // Capturando IMDB id
            if (data.external_ids && data.external_ids.imdb_id) {
                const newImdbId = data.external_ids.imdb_id;
                setImdbId(newImdbId);
                console.log(`IMDB ID do Filme: ${newImdbId}`);
                return newImdbId;

            } else {
                console.error('IMDB ID não encontrado para o filme.');
                return null;
            }
        } catch (error) {
            console.error('Erro ao obter IMDB ID:', error.message);
            return null;
        }
    };

    useEffect(() => {
        // Adicione dependências ao useEffect, se necessário
    }, [scrollX, imdbId]);

    return (
        <div className="movieRow">

            {/* Botões de navegação */}
            <h2>
                {Titulos}
                <div className="movieRow--left" onClick={() => rolar("left")}>
                    <NavigateBeforeIcon style={{ fontSize: 50 }} />
                </div>
                <div className="movieRow--rigth" onClick={() => rolar("right")}>
                    <NavigateNextIcon style={{ fontSize: 50 }} />
                </div>
            </h2>

            {/* Área da listagem dos filmes */}
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{ marginLeft: scrollX, width: Items.results.length * 150 }}>
                    {Items.results.map((item, key) => (
                        <div key={key} className="movieRow--item" onClick={() => handleItemClick(item.id)}>
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={`Poster ${item.title || item.name}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filmes;
