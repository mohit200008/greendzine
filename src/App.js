import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: employees, loading, error } = useFetch('https://reqres.in/api/users');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <input
        style={{ padding: '15px',margin: '10px', borderRadius: '15px', border: '3px solid black', fontSize: '22px' }}
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {filteredEmployees.map((employee) => (
            <li style={{ border: "2px solid black", maxWidth: '40%', borderRadius: '10px', margin: "10px" }} key={employee.id}>
              <img style={{ borderRadius: '8px' }} src={employee.avatar} alt={employee.first_name} />
              <span className="badge">{employee.id}</span>
              <p>{employee.first_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
