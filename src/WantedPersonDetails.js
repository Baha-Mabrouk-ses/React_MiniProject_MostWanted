import React from "react";

const WantedPersonDetails = ({ item }) => {
  return (
    <div>
      <h1>{item.title}</h1>
      <table>
        <tbody>
          <tr>
            <td>Description:</td>
            <td>{item.description}</td>
          </tr>
          <tr>
            <td>Race:</td>
            <td>{item.race}</td>
          </tr>
          <tr>
            <td>Sex:</td>
            <td>{item.sex}</td>
          </tr>
          <tr>
            <td>Nationality:</td>
            <td>{item.nationality}</td>
          </tr>
          <tr>
            <td>Place of Birth:</td>
            <td>{item.place_of_birth}</td>
          </tr>
          <tr>
            <td>Hair:</td>
            <td>{item.hair}</td>
          </tr>
          <tr>
            <td>Aliases:</td>
            <td>{item.aliases.join(", ")}</td>
          </tr>
          <tr>
            <td>Caution:</td>
            <td dangerouslySetInnerHTML={{ __html: item.caution }}></td>
          </tr>
          <tr>
            <td>Remarks:</td>
            <td dangerouslySetInnerHTML={{ __html: item.remarks }}></td>
          </tr>
        </tbody>
      </table>
      {item.files && (
        <div>
          <h2>Files:</h2>
          <ul>
            {item.files.map((file, index) => (
              <li key={index}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WantedPersonDetails;
