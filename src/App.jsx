import "./styles.css";
import LoadingSpinner from "./LoadingSpinner";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import LocalPage from "./LocalPage";

const API_ENDPOINT = "https://api.fbi.gov/wanted/v1/list";

const App = () => {
  // State variables
  const [searchTerm, setSearchTerm] = React.useState("");
  const [wantedList, setWantedList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  // Fetch wanted list from the FBI API
  const fetchWantedList = () => {
    setIsLoading(true);
  
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((result) => {
        // Extract the "url" attribute from each item in the result
        const wantedItems = result.items.map((item) => ({
          ...item,
          url: item.url
        }));
  
        setWantedList(wantedItems);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  };
  

  // Fetch the wanted list on initial render
  React.useEffect(() => {
    fetchWantedList();
  }, []);

  // Handle search input change
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = () => {
    // Filter the wanted list based on the search term
    const filteredList = wantedList.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setWantedList(filteredList);
  };

  // Reset the wanted list to its original state
  const handleReset = () => {
    setSearchTerm("");
    fetchWantedList();
  };

  return (
    <div>
      <h1>FBI Wanted List</h1>

      {/* Input field with label */}
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearchInput}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      {/* Submit button */}
      <button type="button" onClick={handleSearchSubmit}>
        Search
      </button>

      {/* Reset button */}
      <button type="button" onClick={handleReset}>
        Reset
      </button>

      <hr />

      {/* Display error message if an error occurred */}
      {isError && <p>Something went wrong ...</p>}

      {/* Display loading spinner if data is being fetched */}
      {isLoading ? <LoadingSpinner /> : <List list={wantedList} />}
    </div>
  );
};

// Input field component with label
const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  children
}) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input id={id} type={type} value={value} onChange={onInputChange} />
  </>
);

// List component to render a list of wanted items
const List = ({ list }) => (
  <ul align="center">
    <table>
        <thead>
          <tr>
            <th>   Image   </th>
            <th>   Title   </th>
            <th>   FBI Page   </th>
            <th>   Local Page   </th>
            <th>   Description   </th>
          </tr>
        </thead>
        <tbody>
          {/* Render each item */}
          {list.map((item) => (
            <Item key={item.uid} item={item} />
          ))}
        </tbody>
      </table>
  </ul>
);

// Item component to render an individual wanted item


const Item = ({ item }) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleDescriptionToggle = () => {
    setShowDescription(!showDescription);
  };

  return (
    <tr>
      <td>
        <img src={item.images[0].thumb} alt=""/>
      </td>
      <td>
        <span>{item.title}</span>
      </td>
      <td>
        <button type="button" onClick={() => window.open(item.url, '_blank')}>
          FBI
        </button>
      </td>
      
      <td>
        <Link to={`/local/${item.uid}`}>
          Local Page
        </Link>
      </td>
      
      
      <td>
        <button type="button" onClick={handleDescriptionToggle}>
          {showDescription ? 'Show Less' : 'Show More'}
        </button>
        {showDescription && (
          <div>
            {item.description}
          </div>
        )}
      </td>
    </tr>
  );
};





export default App;
