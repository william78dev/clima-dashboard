import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("Weather Dashboard - Testes Unitários", () => {
  it("Deve renderizar o título do radar de clima corretamente", () => {
    render(<App />);
    const titleElement = screen.getByText(/🌤️ Weather Radar/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("Deve mostrar o botão de busca na tela", () => {
    render(<App />);
    const buttonElement = screen.getByRole("button", { name: /Buscar/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
