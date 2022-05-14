import { gql, useQuery, useApolloClient } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";

const FILM_DETAILS_QUERY = gql`
  query ($filmId: ID) {
    film(id: $filmId) {
      id
      title
      director
      releaseDate

      characterConnection {
        characters {
          id
          name
        }
      }
    }
  }
`;

const FilmDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(FILM_DETAILS_QUERY, {
    variables: {
      filmId: id
    }
  });
  const client = useApolloClient();

  const [title, setTitle] = useState(data?.film?.title);

  useEffect(() => {
    setTitle(data?.film?.title);
  }, [data?.film?.title]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  const { film } = data;

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const saveTitle = () => {
    client.writeFragment({
      id: `Film:${id}`,
      fragment: gql`
        fragment UpdateFilmDetails on Film {
          title
        }
      `,
      data: {
        title
      }
    });
  };

  return (
    <div className="film-details">
      <Link to="/films">Back</Link>
      <h1>{film.title}</h1>

      <input
        type="text"
        placeholder="edit title"
        defaultValue={title}
        onChange={handleChange}
      />
      <button onClick={saveTitle} disabled={title === film.title}>
        save
      </button>

      <p>
        <b>Director:</b>
        {film.director}
      </p>
      <p>
        <b>Release date:</b>
        {film.releaseDate}
      </p>

      <div>
        {film.characterConnection.characters.map((character) => (
          <div key={character.id}>
            <h3>
              <Link to={`/person/${character.id}`}>{character.name}</Link>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmDetails;
