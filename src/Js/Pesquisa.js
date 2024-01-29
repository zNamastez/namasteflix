import React, { useState, useEffect } from "react";
import Tmdb from "../Tmdb.js";
import FilmesPesquisa from "./FilmesPesquisa.js";
import { colors } from "@mui/material";

export default ({ termoPesquisa }) => {
  // Definindo UseStates
  const [listaPesquisa, setListaPesquisa] = useState([]);
  const apiKey = "c63e10c3b759ad5f85001d236986cad6";

  // Carregar categorias
  useEffect(() => {
    const carregarItems = async () => {
      try {
        // Captura a lista dos filmes
        let response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${termoPesquisa}&include_adult=false&language=pt-BR&page=1&api_key=${apiKey}`
        );
        let data = await response.json();

        // Verifica se 'results' está presente
        if (data.results && Array.isArray(data.results)) {
          console.log(data);
          setListaPesquisa(data);
        } else {
          console.error("A propriedade 'results' não está presente ou não é um array na resposta da API.");
        }
      } catch (error) {
        console.error("Erro ao carregar dados da API:", error);
      }
    };

    carregarItems();
  }, [termoPesquisa]);

  return (
    <div className="Pesquisa">
      <section className="listas">
        {
          <FilmesPesquisa Items={listaPesquisa} Consulta={termoPesquisa} />}
      </section>
    </div>
  );
};
