import React from "react";
import { locale } from "../../locale";
import { Film } from "../../types/Films.types";

interface Props {
  films: Film[];
  handleShowPeople: (film: Film) => Promise<void>;
  selectedFilm: Film | null;
}

const FilmsList: React.FC<Props> = ({ films, handleShowPeople, selectedFilm }) => {
  return (
    <div className="filmsContainer">
      {films.map((film: Film) => (
            <div
            className={`film ${
              selectedFilm && selectedFilm.episode_id === film.episode_id ? "selected" : ""
            }`}
          >
            <div className="title">{film.title}</div>
            <div className="episodeId">{locale.EPISODE} {film.episode_id}</div>
            <div className="releaseDate">{locale.RELEASE_DATE} {film.release_date}</div>
            <button className="showPeopleButton" onClick={() => handleShowPeople(film)}>
              {locale.SHOW_PEOPLE}
            </button>
          </div>
      ))}
    </div>
  );
};
export default FilmsList;