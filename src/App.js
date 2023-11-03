import React, { useState, useEffect } from "react";
import "./App.css";
import BreedImage from "./BreedImage";

const App = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => {
        const breedNames = Object.keys(data.message);
        setBreeds(breedNames);
        setSelectedBreed(breedNames[0]);
      })
      .catch(console.error);
  }, []);

  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBreedClick = (breed) => {
    setSelectedBreed(breed);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>DOG.</h1>
      </header>
      <div className="content-container">
        <div className="sidebar">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="breed-list">
            {filteredBreeds.map((breed) => (
              <div
                key={breed}
                onClick={() => handleBreedClick(breed)}
                className={`breed-item ${
                  selectedBreed === breed ? "selected" : ""
                }`}
              >
                {breed}
              </div>
            ))}
          </div>
        </div>
        <div className="breed-result">
          <div className="breed-name">
            {selectedBreed.charAt(0).toUpperCase() + selectedBreed.slice(1)}
          </div>
          <div className="breed-image">
            <BreedImage breed={selectedBreed} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
