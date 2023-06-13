import React from "react";
import { useParams } from "react-router-dom";

const LocalPage = () => {
  const { uid } = useParams();

  return (
    <div>
      <h1>Local Page {uid}</h1>
      {/* Rest of the component */}
    </div>
  );
};

export default LocalPage;
