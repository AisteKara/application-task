import {
  createSlice,
  createAsyncThunk,
  ThunkDispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Film, Person } from "../types/Films.types";

interface FilmsState {
  films: Film[];
  selectedFilm: Film | null;
  people: Person[];
  loading: boolean;
}

const initialState: FilmsState = {
  films: [],
  selectedFilm: null,
  people: [],
  loading: false,
};

export const fetchFilms = createAsyncThunk("films/fetchFilms", async () => {
  const response = await axios.get("https://swapi.dev/api/films");
  return response.data.results;
});

export const fetchPeople = createAsyncThunk(
  "films/fetchPeople",
  async (
    film: Film,
    { dispatch }: { dispatch: ThunkDispatch<unknown, unknown, AnyAction> }
  ) => {
    dispatch(setLoading(true));
    dispatch(setSelectedFilm(film));
    const characters = film.characters;
    const promises = characters.map((url: string) => axios.get(url));
    const responses = await Promise.all(promises);
    const peopleData = responses.map((response: any) => response.data);
    dispatch(setPeople(peopleData));
    dispatch(setLoading(false));
  }
);

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedFilm: (state, action) => {
      state.selectedFilm = action.payload;
    },
    setPeople: (state, action) => {
      state.people = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.films = action.payload;
      })
  },
});

export const { setLoading, setSelectedFilm, setPeople } = filmsSlice.actions;

export default filmsSlice.reducer;
