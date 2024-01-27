import React, { useState } from "react";
import "../Css/Header.css";
import logo from "../Logo.png";

export default ({ black, onPesquisarChange }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        // Atualiza o termo de pesquisa em App.js
        onPesquisarChange(query);
    };

    return (
        <header className={black ? "black" : ""}>
            <div className="header--logo">
                <a href="/">
                    <img src={logo} alt="NetFlix" />
                </a>
            </div>
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
