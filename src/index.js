import React from "react";
import ReactDOM from "react-dom";
import React, { useState, useEffect } from 'react';
import './style.css';


function GetMovies() {
  const [films, setFilms] = useState([]); /* Variabler för datastrukturer. */
  let matches = []; /* Tom array att spara matchade filmer i. */
  let error = false; /* Markerar om inga träffar hittats. Dålig namngivning. */

  /* API-anrop och insamling av data med hjälp av useEffect-hook */
  useEffect(() => {
    fetch('https://swapi.dev/api/films/')
      .then((response) => response.json())
      .then((data) => setFilms(data.results));
  }, []);

  /** Medlemsfunktion för att faktiskt matcha filmerna. Anropas från input-fältet vid förändring i detta.
   *  @param {var} movieInput Innehåller datan som skickats från input-fältet. */
  function MatchMovies(movieInput) {
    const search =
      movieInput.target.value.toLowerCase(); /* Skiftlägesokänslighet! Del IV. */
    let matchField =
      document.getElementById('match-field'); /* Var träffarna ska visas. */
    matches.length = 0; /* Ser till att träff-array är tom! */

    if (search.length > 0) {
      /* Så länge en sökning har gjorts: */
      films.forEach((e, i) => {
        /* Loopa alla fält i array "films" */
        if (
          /* Kontrollera inmatad text mot innehållet i films-arrayen */
          e.title
            .toLowerCase()
            .includes(search) /* Skiftlägesokänslighet! Del V. */ ||
          e.director.toLowerCase().includes(search) ||
          e.opening_crawl.toLowerCase().includes(search)
        ) {
          matches.push(e); /* Träffar skjuts över till matches-array */
        }
      });

      if (matches.length > 0) {
        /* Så länge någonting finns i matches-arrayen */
        matchField.style =
          'display: block'; /* Se till att fältet för träffar är synligt. */
        matchField.innerHTML = ''; /* Se till att fältet för träffar är tomt. */
        /* Presentera datan: */
        matchField.innerHTML += '<p><b>Titel:</b> ' + matches[0].title + '</p>';
        matchField.innerHTML +=
          '<p><b>Regissör:</b> ' + matches[0].director + '</p>';
        matchField.innerHTML +=
          '<p><b>Producent(er):</b> ' + matches[0].producer + '</p>';
        matchField.innerHTML +=
          '<p><b>Release-datum:</b> ' + matches[0].release_date + '</p>';
        matchField.innerHTML +=
          '<p><b>Synopsis:</b> ' + matches[0].opening_crawl + '</p>';
        matchField.innerHTML +=
          '<p><b>Antal karaktärer:</b> ' +
          matches[0].characters.length +
          '</p>'; /* .length ger antalet karaktärer. */
        matchField.innerHTML +=
          '<p><b>Antal rymdskepp:</b> ' + matches[0].starships.length + '</p>';
      } else {
        error = true; /* Här var det fel! Sätt error till true */
      }
    } else {
      error = true; /* Här var det fel! Sätt error till true */
    }

    /* Om fel har hittats visa nedanstående: */
    if (error) {
      matchField.style =
        'display: block'; /* Se till att fältet för träffar är synligt. Se föregående style-prop för kommentarer om "felet" */
      matchField.innerHTML =
        "<p id='error'>Inga träffar</p>"; /* Visa meddelandet */
      error = false; /* Nu finns inga fel längre. */
    }
  }

  /* Rendera innehåll */
  return (
    <div>
      <h2>Star Wars - filmer</h2>
      <input
        type="text"
        placeholder="Sök efter film här ..."
        onChange={
          MatchMovies
        } /* Medlemsfunktionen MatchMovies anropas kontinuerligt vid förändring i fältet */
      />

      <div id="match-field"></div>
    </div>
  );
}

/* Anropa komponenten GetMovies och rendera innehållet som returneras därifrån. */
ReactDOM.render(<GetMovies />, document.getElementById('root'));









/*
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
*/