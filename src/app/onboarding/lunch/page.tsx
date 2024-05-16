'use client'
import React, { useState, useEffect } from 'react';

// Define types for the JSON data
interface Item {
  id: number;
  name: string;
}

const MyComponent: React.FC = () => {
  // State to store the fetched JSON data
  const [jsonData, setJsonData] = useState<Item[]>([]);

  // Fetch JSON data when the component mounts
  useEffect(() => {
    // Mock API endpoint
    fetch('/api/getcategories')
      .then(response => response.json())
      .then((data: Item[]) => setJsonData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to run effect only once when component mounts

  return (
    <div>
      <h1>JSON Data</h1>
      <ul>
        {/* Map over the JSON data and render each item */}
        {jsonData.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
