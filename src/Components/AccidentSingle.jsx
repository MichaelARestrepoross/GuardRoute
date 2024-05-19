// Import React and the necessary functions from the AccidentIndexHelper
import React from 'react';
import { formatCrashDate, formatCrashTime } from '../Helpers/AccidentIndexHelper';
import { useNavigate } from 'react-router-dom';

// Define the AccidentSingle component
const AccidentSingle = ({ accident }) => {
    const navigate = useNavigate();


  // Determine the image URL based on person age and sex
  let imgUrl = '';
  if (accident.person_age < 18) {
    imgUrl = accident.person_sex.toLowerCase() === 'm'
      ? 'https://res.cloudinary.com/dwygxzqku/image/upload/v1715959628/GuardRoute/boy_v6ruw9.png'
      : 'https://res.cloudinary.com/dwygxzqku/image/upload/v1715959732/GuardRoute/girl_nxvqfh.png';
  } else {
    imgUrl = accident.person_sex.toLowerCase() === 'm'
      ? 'https://res.cloudinary.com/dwygxzqku/image/upload/v1715959606/GuardRoute/Man_abmb4x.png'
      : 'https://res.cloudinary.com/dwygxzqku/image/upload/v1715959789/GuardRoute/Woman_x9qisf.png';
  }

    // Styles for the scrollable div
    const scrollableDivStyles = {
        maxHeight: '260px', 
        overflowY: 'auto', 
        paddingRight: '15px', 
    };
    
    const handleClick = (id) => {
        navigate(`/accidents/${id}`);
    };

  // Render the component with the necessary details
  return (
    <div className="max-w-xl rounded-xl bg-black bg-opacity-70 p-6 text-lg text-white font-sans mb-6">
      <div className="flex items-center justify-center mb-4">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-white p-2">
          <img src={imgUrl} alt="Person Image" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className='bg-dark-navy bg-opacity-70 p-2 text-center' style={scrollableDivStyles} >
        <p>
          On {accident.crash_date ? formatCrashDate(accident.crash_date) : 'Unknown Date'}, at {accident.crash_time || 'Unknown Time'}, There was a accident where a
        </p>
        <p>
          {' '}{accident.person_age}-year-old {accident.person_sex.toLowerCase() === 'm' ? 'male' : 'female'} that was a  
          {accident.person_type ? accident.person_type.toLowerCase() : 'person'} who was involved in the
          collision of the accident. 
        </p>
        <p>
          {accident.position_in_vehicle
            ? `They were positioned as ${accident.position_in_vehicle.toLowerCase()}.`
            : ''}{' '}
          {accident.safety_equipment ? `They used safety equipment such as: ${accident.safety_equipment.toLowerCase()}.` : ''}
        </p>
        <p>
          {accident.person_injury === 'Injured'
            ? `The ${accident.person_age}-year-old ${accident.person_sex.toLowerCase() === 'm' ? 'male' : 'female'} sustained injuries in the accident. `
            : `The ${accident.person_age}-year-old ${accident.person_sex.toLowerCase() === 'm' ? 'male' : 'female'} had no specified injury. `}
          {accident.ejection === 'Not Ejected'
            ? "They were not ejected from the vehicle. "
            : "They were ejected from the vehicle, which can be very serious. "}
          {accident.emotional_status && accident.emotional_status !== 'Does Not Apply'
            ? `Emotionally, the ${accident.person_age}-year-old ${accident.person_sex.toLowerCase() === 'm' ? 'male' : 'female'} was reported to be ${accident.emotional_status.toLowerCase()}. `
            : ''}
          {accident.bodily_injury && accident.bodily_injury !== 'Does Not Apply'
            ? `The extent of bodily injury was: ${accident.bodily_injury.toLowerCase()}. `
            : ''}
          {accident.complaint && accident.complaint !== 'Does Not Apply' ? `They had the following complaint: ${accident.complaint.toLowerCase()}.` : ''}
        </p>
        <p>
          {accident.ped_role ? `They were a ${accident.ped_role.toLowerCase()} in the incident at the accident.` : ''}
        </p>
        <p>
          <br />(Collision ID: <em>{accident.collision_id || 'Unknown'}</em>)
        </p>
      </div>
      <div className='flex items-center justify-center'>
        <button
            onClick={() => handleClick(accident.collision_id)}
            className="bg-yellow hover:bg-light-navy text-light-navy hover:text-white font-bold py-2 px-4 rounded-full inline-block text-base mt-4 mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif', fontStyle: 'normal' }}
            >
            Learn more about the incident
        </button>
      </div>
    </div>
  );
};

// Export the AccidentSingle component as default
export default AccidentSingle;
