import { Suspense } from 'react'

export default async function ParentComponent() {
  try {
    const parentData = await fetchParentData();
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <ChildComponent parentData={parentData} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error fetching parent data:', error);
    return <p>Error loading data</p>;
  }
}

function ChildComponent({ parentData }) {
  if (!parentData) {
    return <p>No data received from parent.</p>;
  }
  // ... rest of the component
  return <p>Child Component using: {parentData.someProperty}</p>
}

async function fetchParentData() {
  // Simulate a network request that might fail
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// api/data.js
// Simulate an API route that might return an error
export default async function handler(req, res) {
  // Simulate potential failure conditions
  if (Math.random() < 0.5) {
      res.status(500).json({error: 'Failed to fetch data'});
  } else {
      res.status(200).json({ someProperty: 'some value' });
  }
}