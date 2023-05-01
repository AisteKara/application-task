//@ts-ignore
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Films.css";
import Table from "../../components/Table/Table";
import FilmsList from "../../components/FilmsList/FilmsList";
import { Film } from "../../types/Films.types";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { AppDispatch, RootState } from "../../store/store";
import { fetchFilms, fetchPeople } from "../../store/filmsSlice";

const Films = () => {
  const dispatch = useDispatch<AppDispatch>();  
  const films = useSelector((state: RootState) => state.films.films);
  const selectedFilm = useSelector((state: RootState) => state.films.selectedFilm);
  const people = useSelector((state: RootState) => state.films.people);
  const loading = useSelector((state: RootState) => state.films.loading);

  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  const handleShowPeople = (film: Film) => {
    dispatch(fetchPeople(film));
  };

  return (
    <div className="StarWarsMovies">
      <FilmsList films={films}
       handleShowPeople={handleShowPeople} 
       selectedFilm={selectedFilm} />
          {loading ? ( <LoadingSpinner /> ) : selectedFilm && <Table selectedFilm={selectedFilm} people={people} />}
    </div>
  );
};

export default Films;
