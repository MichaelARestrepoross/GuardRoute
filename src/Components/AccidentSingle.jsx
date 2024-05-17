import React from 'react';
import { formatDate, getImageUrl, generateNameFromID } from '../Helpers/SingleSquirrelHelper';
import { getRegion } from '../Helpers/SquirrelIndexHelper';


function AccidentSingle({ squirrel }) {
    // Format the date from "10142018" to "May 3, 2018 example"


     // Get the image URL for the squirrel
     const imageUrl = getImageUrl(squirrel.primary_fur_color, squirrel.unique_squirrel_id);
     const squirrelName = generateNameFromID(squirrel.unique_squirrel_id);
    return (
        <div className="bg-gray-100/60 rounded-xl mx-auto my-auto shadow-2xl  backdrop-brightness-150 backdrop-blur-md bg-opacity-90 hover:bg-mint/70
        max-w-auto overflow-hidden h-auto md:min-h-60 p-2">
            <div className="md:flex">
                <div className="flex-col md:flex-shrink-0 mb-3">
                    <img className="h-32 w-full object-cover md:h-full md:w-48 max-h-36 rounded-xl pr-2" src={imageUrl} alt="" />
                </div>
                <div className="p-4 bg-black/20 rounded-lg" style={{ fontFamily: 'Courier, sans-serif', fontStyle: 'normal' }}>
                <p className=" text-gray-800 font-bold text-xl">Name: {squirrelName}</p>
                    <p className="text-gray-800 text-md">
                        <strong>ID: </strong>{squirrel.unique_squirrel_id}</p>
                    <p className="text-gray-800">
                        <strong>Location: </strong
                        >{getRegion(squirrel.hectare)} Central Park</p>
                    <p className="text-gray-600">
                        <strong>Date: </strong>{formatDate(squirrel.date)}</p>
                </div>
            </div>
        </div>
    );
}

export default AccidentSingle;
