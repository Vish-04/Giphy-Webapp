import './Giphy_Search.css';
import React, { useState } from 'react';
import Giphy from 'giphy-js-sdk-core';

function GiphySearch() {
  const giphy = Giphy('3KCu57W1dArlc4w300sUUEl4EvDwKzov');
  const [searchQuery, setSearchQuery] = useState('');
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);


  function handleSearch(e, page=1) {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    giphy.search('gifs', { q: searchQuery, offset: (page - 1) * 20 })
    .then(response => {
      setGifs(response.data.slice((currentPage - 1) * 20, currentPage * 20));
      setIsLoading(false);
      if(!response.data.length){
        setError('No results found')
      }
    })
  }   

  return (
    <div className="gsearch">
        <h1 >HEY!</h1>
        <h3> Get Started, Search for a GIF below!</h3>
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
    <form onSubmit={handleSearch}>
      <button type='submit'  onClick={() => {setCurrentPage(currentPage - 1);}} disabled={currentPage === 1}>Prev</button>
      <button type='submit' onClick={() => {setCurrentPage(currentPage + 1);}} disabled={gifs.length < 19}>Next</button>
    </form>

    </div>
  );
}

export default GiphySearch;
