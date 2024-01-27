import React, { useEffect, useState } from "react";
import "../Css/App.css";
import Tmdb from "../Tmdb.js";
import FeatureMovie from "../components/FeatureMovie.js";
import Header from "../Js/Header.js";
import Pesquisa from "./Pesquisa.js";
import Filmes from "./Filmes.js";

export default () => {
  const [listaFilmes, setListaFilmes] = useState([]);
  const [destaque, setDestaque] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  useEffect(() => {
    const carregarItems = async () => {
      let lista = await Tmdb.Categorias();
      setListaFilmes(lista);

      let SeriesEmAlta = lista.filter((i) => i.slug === "SeriesEmAlta");
      let serieAleatoria = Math.floor(
        Math.random() * (SeriesEmAlta[0].items.results.length - 1)
      );
      let escolhido = SeriesEmAlta[0].items.results[serieAleatoria];
      let destaque = await Tmdb.InformacoesItem(escolhido.id, "tv");
      setDestaque(destaque);
    };

    carregarItems();
  }, []);

  useEffect(() => {
    const scrollListner = () => {
      setBlackHeader(window.scrollY > 10);
    };

    window.addEventListener("scroll", scrollListner);

    return () => {
      window.removeEventListener("scroll", scrollListner);
    };
  });

  return (
    <div>
      <Header
        black={blackHeader}
        onPesquisarChange={(termo) => {
          setTermoPesquisa(termo);
        }}
      />

      {/* Verifica se há um termo de pesquisa */}
      {termoPesquisa ? (
        <Pesquisa termoPesquisa={termoPesquisa} />
      ) : (
        <>
          {destaque && <FeatureMovie item={destaque} />}

          {/* Exibir listas dos filmes */}
          <section className="listas">
            {listaFilmes.map((item, key) => (
              <Filmes key={key} Titulos={item.title} Items={item.items} Tipo={item.type} />
            ))}
          </section>

          {/* Tela de carregamento */}
          {listaFilmes.length <= 0 && (
            <div className="carregando">
              <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2000,c_limit/Netflix_LoadTime.gif" />
            </div>
          )}
        </>
      )}
    </div>
  );
};
