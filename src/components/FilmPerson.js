import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";

const PERSON_QUERY = gql`
  query ($personId: ID) {
    person(id: $personId) {
      id
      name @client
    }
  }
`;

const FilmPerson = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(PERSON_QUERY, {
    variables: {
      personId: id
    }
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <Link to="/films">back</Link>
      <h1>{data.person.name}</h1>
    </div>
  );
};

export default FilmPerson;
