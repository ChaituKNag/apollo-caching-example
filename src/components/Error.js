import React from "react";

const Error = ({ message }) => {
  return (
    <div className="error">
      There was an error
      {message}
    </div>
  );
};

export default Error;
