import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Films.css";
import Table from "../../components/Table/Table";
import FilmsList from "../../components/FilmsList/FilmsList";
import { Film, Person } from "../../types/Films.types";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Films = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    const fetchFilms = async () => {
      const response = await axios.get("https://swapi.dev/api/films");
      setFilms(response.data.results);
    };
    fetchFilms();
  }, []);

  const handleShowPeople = async (film: Film) => {
    setLoading(true);
    setSelectedFilm(film);
    const characters = film.characters;
    const promises = characters.map((url: string) => axios.get(url));
    const responses = await Promise.all(promises);
    const peopleData = responses.map((response: any) => response.data);
    setPeople(peopleData);
    setLoading(false);
  };

  return (
    <div className="StarWarsMovies">
      <FilmsList films={films} handleShowPeople={handleShowPeople} selectedFilm={selectedFilm} />
      { loading ?
      <LoadingSpinner />
      :(
      <>
      {selectedFilm && <Table selectedFilm={selectedFilm} people={people} />}
      </>
      )}
    </div>
  );
};

export default Films;
