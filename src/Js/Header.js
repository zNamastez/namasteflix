// Imports
import React, { useState } from "react";
import "../Css/Header.css";
import logo from "../Logo.png";

export default ({ black, onPesquisarChange }) => {

    // Definindo useState
    const [searchQuery, setSearchQuery] = useState("");

    // Função de event do campo de pesquisa
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        // Atualiza o termo de pesquisa em App.js
        onPesquisarChange(query);
    };

    // Renderiza o Header
    return (

        <header className={black ? "black" : ""}>

            {/* Logo */}
            <div className="header--logo">
                <a href="/">
                    <img src={logo} alt="NetFlix" />
                </a>
            </div>

            {/* Campo de pesquisa */}
            <div className="header--busca">
                <input
                    type="text"
                    placeholder="Pesquisar"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
        </header>
    );
};
