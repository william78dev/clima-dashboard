interface SearchBarProps {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}

export function SearchBar({ city, setCity, onSearch }: SearchBarProps) {
  return (
    <section className="search-section">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Digite a cidade ou país..."
      />

      <button onClick={onSearch}>Buscar</button>
    </section>
  );
}
