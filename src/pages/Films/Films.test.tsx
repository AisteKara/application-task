import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Films from "./Films";
import { Store, AnyAction } from "@reduxjs/toolkit";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

const mockStore = configureMockStore([thunk]);

describe("Films component", () => {
  let store: Store<unknown, AnyAction>;
  beforeEach(() => {
    store = mockStore({
      films: {
        films: [
          {
            title: "A New Hope",
            characters: [],
          },
          {
            title: "The Empire Strikes Back",
            characters: [],
          },
        ],
        selectedFilm: null,
        people: [],
        loading: false,
      },
    });
  });

  test("should render a list of films", async () => {
    render(
      <Provider store={store}>
        <Films />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("A New Hope")).toBeInTheDocument();
    });
  });

  test("should show loading spinner while films are being fetched", async () => {
    store = mockStore({
      films: {
        films: [],
        selectedFilm: null,
        people: [],
        loading: true,
      },
    });

    render(
      <Provider store={store}>
        <Films />
      </Provider>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("should show table with people when a film is selected", async () => {
    const films = [
      {
        title: "A New Hope",
        release_date: "1977-05-25",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        opening_crawl: "It is a period of civil war.",
      },
    ];

    const people = [
      {
        name: "Luke Skywalker",
        gender: "male",
        height: "172",
        eye_color: "blue",
        homeworld: "Tatooine",
      },
    ];

    store = mockStore({
      films: {
        films,
        selectedFilm: films[0],
        people,
        loading: false,
      },
    });

    render(
      <Provider store={store}>
        <Films />
      </Provider>
    );

    expect(screen.getByText("A New Hope")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });
});
