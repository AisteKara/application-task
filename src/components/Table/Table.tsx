import React from "react";
import { locale } from "../../locale";
import { Film, Person } from "../../types/Films.types";
import "./Table.css";

interface Props {
    selectedFilm: Film;
    people: Person[];
}
const Table:React.FC<Props> = (props: Props) => {
    const {selectedFilm, people } = props
  return (
    <>
      <h2>{locale.PEOPLE_IN} {selectedFilm.title}</h2>
      <div className="peopleContainer">
        <table className="charactersTable">
          <tbody>
            <tr className="sticky">
              <th>{locale.NAME}</th>
              <th>{locale.GENDER}</th>
              <th>{locale.BIRTH_YEAR}</th>
              <th>{locale.MASS}</th>
            </tr>
            {people.map((person: Person) => (
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.gender}</td>
                <td>{person.birth_year}</td>
                <td>{person.mass}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Table;
