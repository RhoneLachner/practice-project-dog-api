import React, { useState, useEffect } from "react";

const BreedImage = ({ breed }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (breed) {
      fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then((response) => response.json())
        .then((data) => {
          setImageUrl(data.message);
        })
        .catch(setError);
    }
  }, [breed]);

  if (error) {
    return <div>Dog breed = invisible. {error.message}</div>;
  }

  return (
    <div>{imageUrl && <img src={imageUrl} alt={`A random ${breed}`} />}</div>
  );
};

export default BreedImage;
