import React from 'react';
import AccidentSingle from './AccidentSingle';

function PeopleIndex({ accidents }) {
  // Render nothing if accidents array is empty
  if (!accidents || accidents.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mt-8 mb-4">People Index</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accidents.map((accident, index) => (
          <AccidentSingle key={index} accident={accident} />
        ))}
      </div>
    </div>
  );
}

export default PeopleIndex;