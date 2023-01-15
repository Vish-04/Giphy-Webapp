import './Giphy_Search.css';
import React, { useState } from 'react';
import Giphy from 'giphy-js-sdk-core';

function GiphySearch() {
  const giphy = Giphy('3KCu57W1dArlc4w300sUUEl4EvDwKzov');
  const [searchQuery, setSearchQuery] = useState('');
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function handleSearch(e) {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    giphy.search('gifs', { q: searchQuery, limit: 10 })
    .then(response => {
      setGifs(response.data);
      setIsLoading(false);
      if(!response.data.length){
        setError('No results found')
      }
    })
  }
  

  return (
    <div className="GSearch">
        <form onSubmit={handleSearch}>
      <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      <button type="submit">Search</button>
    </form>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <div className="gif-grid">
        {error ? <p>{error}</p> : gifs.map(gif => (
          <img src={gif.images.original.url} key={gif.id} alt={gif.title} />
        ))}
      </div>
    )}
    </div>
  );
}

export default GiphySearch;
