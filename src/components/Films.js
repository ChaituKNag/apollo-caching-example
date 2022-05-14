import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";

const ALL_FILMS_QUERY = gql`
  query {
    allFilms {
      films {
        id
        title
        director
      }
    }
  }
`;

const Films = () => {
  const { data, loading, error } = useQuery(ALL_FILMS_QUERY);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="films-list">
      {data?.allFilms?.films?.map((film) => (
        <div key={film.id}>
          <h2 key={film.id}>
            <Link to={`/film/${film.id}`}>{film.title}</Link>
          </h2>
          <p>
            <b>Directed by: </b>
            {film.director}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Films;
