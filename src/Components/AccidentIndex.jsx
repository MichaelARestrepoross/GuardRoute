import React, { useEffect, useState } from 'react';
import AccidentSingle from './AccidentSingle';
import { useNavigate } from 'react-router-dom';
import Modal from './CommonComponents/Modal';
import IndexMap from './IndexMap';

// Assuming these are environment variables for your API endpoint and token
const VITE_PERSONS_BASE_URL = import.meta.env.VITE_PERSONS_BASE_URL;
const VITE_PERSONS_TOKEN = import.meta.env.VITE_PERSONS_TOKEN;
const GOOGLE_MAPS_TOKEN = import.meta.env.VITE_GOOGLE_MAPS_TOKEN;
const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;

const AccidentIndex = () => {
  const [accidents, setAccidents] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredAccidents, setFilteredAccidents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const navigate = useNavigate();
  const [collisions, setCollisons] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCollisions = async () => {
      try {
        const response = await fetch(`https://data.cityofnewyork.us/resource/h9gi-nx95.json?$where=location IS NOT NULL&$$app_token=mvRU6FX2wx4oFsgNJ5gRsXas1`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCollisons(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCollisions();
  }, []);

  const locations = collisions && collisions.length > 0
    ? collisions.map(collision => ({
        lat: parseFloat(collision.location.latitude),
        lng: parseFloat(collision.location.longitude),
        collision_id: collision.collision_id,
        crash_date: collision.crash_date,
        crash_time: collision.crash_time,
      }))
    : [];

  useEffect(() => {
    const fetchAccidents = async () => {
      try {
        const response = await fetch(
          `${VITE_PERSONS_BASE_URL}?$$app_token=${VITE_PERSONS_TOKEN}&$limit=60&$order=crash_date%20DESC&$where=person_sex%20IS%20NOT%20NULL`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAccidents(data);
        setFilteredAccidents(data); // Initialize filtered accidents with all accidents
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error accordingly, e.g., show a message to the user
      }
    };

    fetchAccidents();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (filter) {
      const filtered = accidents.filter((accident) => {
        return accident.region === filter;
      });
      setFilteredAccidents(filtered);
    } else {
      setFilteredAccidents(accidents);
    }
    setScrollIndex(0);
  }, [filter, accidents]);

  const navigatePrev = () => {
    setScrollIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const navigateNext = () => {
    setScrollIndex((prevIndex) =>
      Math.min(prevIndex + 1, Math.ceil(filteredAccidents.length / 3) - 1)
    );
  };

  const handleHeatmapClick = () => {
    navigate('/heatmap');
  };

  const scrollableDivStyles = {
    display: 'flex',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch',
    paddingBottom: '1rem',
    maxWidth: '100%',
    position: 'relative',
  };

  const contentContainerStyles = {
    display: 'flex',
    flexWrap: 'nowrap',
  };

  return (
    <div className="h-auto min-h-screen mb-auto bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://res.cloudinary.com/dwygxzqku/image/upload/v1716106189/GuardRoute/nauman-abdul-hafeez-f05TIl5AOJc-unsplash_yxsagy.jpg')" }}>
      <div className="container m-auto p-10">
        <Modal isOpen={isModalOpen} onCancel={closeModal} />
  
        <div className="flex flex-col md:flex-row items-center justify-center shadow-2xl">
          <button
            className="bg-yellow hover:bg-light-navy text-light-navy hover:text-white font-bold py-2 px-4 rounded-full inline-block text-base mt-4 mb-4"
            onClick={handleHeatmapClick}
            style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}
          >
            View Heatmap
          </button>
        </div>
  
        {/* Left arrow */}
        {scrollIndex > 0 && (
          <button
            className={`bg-yellow/90 text-light-navy hover:bg-navy hover:text-white font-bold py-4 px-4 rounded-xl inline-block text-2xl absolute left-0 top-1/2 transform -translate-y-1/2 ${scrollIndex <= 0 ? 'cursor-not-allowed' : ''}`}
            onClick={navigatePrev}
            disabled={scrollIndex <= 0}
            style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}
          >
            {`⬅️ ${scrollIndex}`}
          </button>
        )}
  
        {/* Displaying filtered accidents */}
        <div className="h-auto mb-4 relative">
          <div className="flex items-center" style={scrollableDivStyles}>
            <div className="flex gap-4" style={contentContainerStyles}>
              {filteredAccidents.slice(scrollIndex * 3, scrollIndex * 3 + 3).map((accident) => (
                <div key={accident.unique_id} className="h-full">
                  <AccidentSingle accident={accident} />
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Centered map */}
        <div className="flex justify-center items-center mb-20">
          <IndexMap locations={locations} GOOGLE_MAPS_TOKEN={GOOGLE_MAPS_TOKEN} GOOGLE_MAP_ID={GOOGLE_MAP_ID} open={open} setOpen={setOpen} />
        </div>
  
        {/* Right arrow */}
        {scrollIndex < Math.ceil(filteredAccidents.length / 3) - 1 && (
          <button
            className="bg-yellow/90 text-light-navy hover:bg-navy hover:text-white font-bold py-4 px-4 rounded-xl inline-block text-2xl absolute right-0 top-1/2 transform -translate-y-1/2"
            onClick={navigateNext}
            style={{ fontFamily: 'Orbitron, sans-serif', fontStyle: 'normal' }}
          >
            {`${scrollIndex + 2} ➡️`}
          </button>
        )}
      </div>
    </div>
  );
  
};

export default AccidentIndex;
