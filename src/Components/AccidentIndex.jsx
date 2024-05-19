import React, { useEffect, useState } from 'react';
import AccidentSingle from './AccidentSingle';
import { useNavigate } from 'react-router-dom';
import Modal from './CommonComponents/Modal';

// Assuming these are environment variables for your API endpoint and token
const VITE_PERSONS_BASE_URL = import.meta.env.VITE_PERSONS_BASE_URL;
const VITE_PERSONS_TOKEN = import.meta.env.VITE_PERSONS_TOKEN;

const AccidentIndex = () => {
  const [accidents, setAccidents] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredAccidents, setFilteredAccidents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const navigate = useNavigate();

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

  // Update filtered accidents when filter changes
  useEffect(() => {
    if (filter) {
      // Filter accidents based on the selected region if i ever add any
      const filtered = accidents.filter((accident) => {
        //filter for the future
        return accident.region === filter;
      });
      setFilteredAccidents(filtered);
    } else {
      // If no filter is selected, set filtered accidents to the original list
      setFilteredAccidents(accidents);
    }
    // Reset scroll index 
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

  // Styles for the scrollable div
  const scrollableDivStyles = {
    display: 'flex',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch',
    paddingBottom: '1rem',
    maxWidth: '100%',
    position: 'relative',
  };

  // Styles for the content container
  const contentContainerStyles = {
    display: 'flex',
    flexWrap: 'nowrap',
  };

  return (
    <div className="h-auto mb-auto bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://res.cloudinary.com/dwygxzqku/image/upload/v1714890505/SquirrelQuest/jo-1o8-ns6svD0-unsplash_kafaft.jpg')" }}>
      <div className="container mx-auto px-10 p-6">
        <Modal isOpen={isModalOpen} onCancel={closeModal} />

        {/* Example of filter and view map button */}
        <div className="flex flex-col md:flex-row items-center justify-center shadow-2xl">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-4 mb-10 p-2 border border-black rounded-lg"
            style={{ fontFamily: 'Courier, sans-serif', fontStyle: 'normal' }}
          >
            <option value="">A</option>
            <option value="">B</option>
            <option value="">C</option>
          </select>
          <button
            className="bg-mint/90 text-dark-teal hover:bg-dark-teal hover:text-mint font-bold py-2 px-2 rounded-xl inline-block text-2xl mb-4 mx-4 my-4"
            onClick={openModal}
            style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}
          >
            View Map
          </button>
        </div>

            {/* Left arrow */}
            {(scrollIndex >0) && 
            <button
              className={`bg-mint/90 text-dark-teal hover:bg-dark-teal hover:text-mint font-bold py-4 px-4 rounded-xl inline-block text-2xl absolute left-0 top-1/2 transform -translate-y-1/2 ${scrollIndex <= 0 ? 'cursor-not-allowed' : ''}`}
              onClick={navigatePrev}
              disabled={scrollIndex <= 0}
              style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}
            >
              {`<(${scrollIndex-1})`}
            </button>
            }
        {/* Displaying filtered accidents */}
        <div className="h-auto  mb-72 relative">
          <div className="flex items-center" style={scrollableDivStyles}>
            {/* List of accidents */}
            <div className="flex gap-4" style={contentContainerStyles}>
              {filteredAccidents.slice(scrollIndex * 3, scrollIndex * 3 + 3).map((accident) => (
                <div key={accident.unique_id} className="h-full">
                  <AccidentSingle accident={accident} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right arrow */}
        {scrollIndex < Math.ceil(filteredAccidents.length / 3) -1 && (
            <button
              className="bg-mint/90 text-dark-teal hover:bg-dark-teal hover:text-mint font-bold py-4 px-4 rounded-xl inline-block text-2xl absolute right-0 top-1/2 transform -translate-y-1/2"
              onClick={navigateNext}
              style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}
            >
              {`(${scrollIndex+1})>`}
            </button>
          )}
      </div>
    </div>
  );
};

export default AccidentIndex;
