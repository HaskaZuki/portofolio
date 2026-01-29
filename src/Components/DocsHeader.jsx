import React from "react";

const DocsHeader = ({ title, description }) => {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
};

export default DocsHeader;