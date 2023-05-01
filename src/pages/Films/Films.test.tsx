import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Films from "./Films";
import axios from "axios";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("Films", () => {
  it("renders the list of films", async () => {
    const mockResponse = {
      data: {
        results: [
          {
            title: "A New Hope",
            characters: [],
          },
          {
            title: "The Empire Strikes Back",
            characters: [],
          },
        ],
      },
    };
    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);
    render(<Films />);
    
    await waitFor(() => {
      expect(screen.getByText("A New Hope")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
    });
  });
});
