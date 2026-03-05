import React, { useState, useEffect } from "react";

import { createAuth } from '../app';

class MovieData {
    constructor(name, movieID, posterLink, genres, year, description, status) {
        this.name = name;
        this.movieID = movieID;
        this.posterLink = posterLink;
        this.genres = genres;
        this.year = year;
        this.description = description;
        this.status = status;
    }
}

//const testArray = [new MovieData("Test Movie", "1", "/placeholder_movie_poster.png", "Comedy", "2023", "", "To Watch"), new MovieData("Another Movie", "2", "/placeholder_movie_poster.png", "Action, Adventure", "2010", "", "Watched")];

export function Library() {
    const [libraryDB, setLibraryDB] = useState([]);

    useEffect(() => {
        getLibrary();
    }, []);

    const [movieReturn, setMovieReturn] = useState([]);
    const [searchText, setSearchText] = useState("");

    const getMovieResults = async (e) => {
        e.preventDefault();

        const res = await fetch("https://imdb.iamidiotareyoutoo.com/search?q=" + searchText, {
			method: "GET",
			headers: { Accept: '*/*' }
		});
        const result = await res.json()
        setMovieReturn(result.description);
    };

    async function getLibrary() {
		const res = await fetch("api/library", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});
        const data = await res.json();
        setLibraryDB(JSON.parse(data.library));
        return;
	}

    async function addmovie(movieListIndex) {
        const res = await fetch("api/library", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
            body: JSON.stringify( movieReturn[movieListIndex]),
		});

        getLibrary();
    }

    function DisplayMovie({ movie }) {
        return (
            <div className="item">
                <button className="removeEntry">X</button>
                <img src={movie["#IMG_POSTER"]} alt={movie["#TITLE"]} />
                <div className="item-details">
                    <h2>{movie["#TITLE"]}</h2>
                    <p>
                        Actors: {movie["#ACTORS"]}
                        <br />
                        Year: {movie["#YEAR"]}
                        <br />
                        Status: Watched
                    </p>
                </div>
            </div>
        );
    }

    function DisplayMovieResult({ movie, index }) {
        return (
            <div className="searchItem" data-index={index}>
                <img src={movie["#IMG_POSTER"]} alt={`${movie["#TITLE"]} poster`} />
                <div className="searchItemDetails">
                    <h3>
                        {movie["#TITLE"]} ({movie["#YEAR"]})
                    </h3>
                    <p>{movie["#ACTORS"]}</p>
                    <p>Description</p>
                </div>
                <button
                    className="add-to-library-btn"
                    onClick={(e) => addmovie(index)}
                >
                    +
                </button>
            </div>
        );
    }

    return (
        <main>
            <div className="library-header">
                <h1 id="userTitle">
                    {localStorage.getItem("userName")}'s Library
                </h1>
                <button
                    type="button"
                    className="add-movie"
                    command="show-modal"
                    commandfor="searchModal"
                >
                    Add Movie
                </button>
            </div>

            <div className="library-content">
                <div className="item-list">
                    {[...libraryDB].reverse().map((movie, index) => {
                        return <DisplayMovie key={index} movie={movie} />;
                    })}
                </div>
            </div>

            <dialog id="searchModal">
                <button
                    id="closeSearchModal"
                    commandfor="searchModal"
                    command="close"
                >
                    X
                </button>
                <h2>Search for a Movie</h2>
                <form id="searchForm" onSubmit={getMovieResults}>
                    <input
                        type="search"
                        id="movieSearchInput"
                        placeholder="Search for a movie..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
                <div id="searchResults">
                    {movieReturn.map((movie, index) => {
                        return (
                            <DisplayMovieResult
                                key={index}
                                movie={movie}
                                index={index}
                            />
                        );
                    })}
                </div>
            </dialog>
        </main>
    );
}
