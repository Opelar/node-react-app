import './index.css';
import React, { useState, useEffect } from 'react';

export default function MovieUrlList() {
  const [page, setPage] = useState(1)
  const [movieUrlList, setList] = useState([]);

  useEffect(() => {
    getMovieUrlList(page);
  }, []);

  function getMovieUrlList() {
    fetch(`/api/movieurl/list?p=${page}&size=10`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setList(data);
      });
  }

  return (
    <div className="movie-url-container">
      <div>
        page search:
        <input type="numer" value={ page } onChange={ e => setPage(e.target.value) }></input>
        <button onClick={getMovieUrlList}>search</button>
      </div>
      <pre style={{ backgroundColor: '#f1f1f1' }}>
        {JSON.stringify(movieUrlList, null, 2)}
      </pre>
    </div>
  )
}
