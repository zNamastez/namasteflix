// Imports
import React, { useEffect, useState } from "react";
import "../Css/App.css";
import Tmdb from "./Tmdb.js";
import FeatureMovie from "./FeatureMovie.js";
import Header from "../Js/Header.js";
import Pesquisa from "./Pesquisa.js";
import Filmes from "./Filmes.js";

export default () => {

  // Definindo useStates
  const [listaFilmes, setListaFilmes] = useState([]);
  const [destaque, setDestaque] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  useEffect(() => {

    // Capturando filmes/séries do Tmdb
    const carregarItems = async () => {
      let lista = await Tmdb.Categorias();
      setListaFilmes(lista);

      // Escolhendo série em destaque
      let SeriesEmAlta = lista.filter((i) => i.slug === "SeriesEmAlta");
      let serieAleatoria = Math.floor(
        Math.random() * (SeriesEmAlta[0].items.results.length - 1)
      );

      // Definindo séire em destaque
      let escolhido = SeriesEmAlta[0].items.results[serieAleatoria];
      let destaque = await Tmdb.InformacoesItem(escolhido.id, "tv");
      setDestaque(destaque);
    };

    carregarItems();
  }, []);

  // Escutar o scroll da página
  useEffect(() => {
    const scrollListner = () => {
      setBlackHeader(window.scrollY > 10);
    };

    window.addEventListener("scroll", scrollListner);

    return () => {
      window.removeEventListener("scroll", scrollListner);
    };
  });

  useEffect(() => {
    const dataAtual = new Date().toDateString();
    const ultimaVisita = localStorage.getItem('ultimaVisita');

    if (ultimaVisita !== dataAtual) {
      // Exibir a mensagem aqui
      alert("Olá, prezado usuário, Gostaríamos de informar que este site foi criado com propósitos educacionais e, por ser gratuito, fazemos uso de uma API para armazenar os filmes em seus servidores. Isso implica que os players exibam anúncios durante a reprodução. Para uma experiência mais agradável, sugerimos o uso de um bloqueador de anúncios à sua escolha. Aproveite a sua sessão de filmes! 😊");
      localStorage.setItem('ultimaVisita', dataAtual);
    }
  }, []);

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
          {/* Exibir série em destaque */}
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
