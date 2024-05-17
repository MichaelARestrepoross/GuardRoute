import React, { useEffect, useState } from 'react';
import AccidentDetailed from './AccidentDetailed';
import { useNavigate } from 'react-router-dom';
import {reverseRegion} from '../Helpers/SquirrelIndexHelper'
import { generateNameFromID } from '../Helpers/SingleSquirrelHelper';
import Modal from './CommonComponents/Modal';
import '../App.css';

const SQUIRREL_API = import.meta.env.VITE_SQUIRREL_BASE_URL;
const VITE_SQUIRREL_TOKEN = import.meta.env.VITE_SQUIRREL_TOKEN;

function AccidentIndex() {
    const [squirrels, setSquirrels] = useState([]);
    const [filteredSquirrels, setFilteredSquirrels] = useState([]);
    const [filter, setFilter] = useState(null); 
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSearchSquirrels, setFilteredSearchSquirrels] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSquirrels = async () => {
            try {
                const response = await fetch(`${SQUIRREL_API}?$$app_token=${VITE_SQUIRREL_TOKEN}&running=true&$order=date DESC&$limit=72`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setSquirrels(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSquirrels();
    }, []);

    // Effect to update filtered squirrels when filter changes
    useEffect(() => {
        if (filter) {
            // Reverse the region to get the hectare-letter combinations
            const region = reverseRegion(filter);
            // Filter squirrels based on the region
            const filtered = squirrels.filter(squirrel => {
                const squirrelLocation = squirrel.hectare;
                return region.some(hectareLetter => squirrelLocation === hectareLetter);
            });
            setFilteredSquirrels(filtered);
        } else {
            // If no filter is selected, set filtered squirrels to the original list
            setFilteredSquirrels(squirrels);
        }
    }, [filter, squirrels]);

    // Effect to update filtered search squirrels when search query changes
    useEffect(() => {
        if (searchQuery) {
            const filteredSearch = filteredSquirrels.filter(squirrel => {
                const squirrelName = generateNameFromID(squirrel.unique_squirrel_id);
                return (
                    squirrelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    squirrel.unique_squirrel_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    squirrel.hectare.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
            setFilteredSearchSquirrels(filteredSearch);
        } else {
            // If no search query, set filtered search squirrels to the same as filtered squirrels
            setFilteredSearchSquirrels(filteredSquirrels);
        }
    }, [searchQuery, filteredSquirrels]);

    // Navigate to Specific squirrel using id when clicked
    const handleClick = (id) => {
        navigate(`/squirrels/${id}`);
    };

    // --- view map modal fx---
    const openModal = () => {
        setIsModalOpen(true);
      };
    
    const closeModal = () => {
        setIsModalOpen(false);
      };

    return (
    <div className="h-auto mb-auto bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://res.cloudinary.com/dwygxzqku/image/upload/v1714890505/SquirrelQuest/jo-1o8-ns6svD0-unsplash_kafaft.jpg')" }}>
        <div className="container mx-auto px-20 p-10 mb-16">
            {/* buttons for opening and closing map modal */}
            {/* <button className="bg-mint/90 text-dark-teal hover:bg-dark-teal hover:text-mint font-bold py-4 px-4 rounded-xl inline-block text-2xl" onClick={openModal} style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}>
              View Map
            </button> */}
            <Modal isOpen={isModalOpen} onCancel={closeModal} />
            <div className="flex flex-col md:flex-row items-center justify-center shadow-2xl">
                {/* SearchBar */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, ID, or hectare..."
                    className=" mt-4 mb-10 p-2 border border-black rounded-lg mr-4 w-full"
                    style={{ fontFamily: 'Courier, sans-serif', fontStyle: 'normal' }}
                />
                {/* DropDown */}
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="mt-4 mb-10 p-2 border border-black rounded-lg "
                style={{ fontFamily: 'Courier, sans-serif', fontStyle: 'normal' }}>
                    <option value="">Select Location</option>
                    <option value="SouthEast">SouthEast</option>
                    <option value="CenterEast">CenterEast</option>
                    <option value="NorthEast">NorthEast</option>
                    <option value="SouthCenter">SouthCenter</option>
                    <option value="Center">Center</option>
                    <option value="NorthCenter">NorthCenter</option>
                    <option value="SouthWest">SouthWest</option>
                    <option value="CenterWest">CenterWest</option>
                    <option value="NorthWest">NorthWest</option>
                </select>
                <button className="bg-mint/90 text-dark-teal hover:bg-dark-teal hover:text-mint font-bold py-2 px-2 rounded-xl inline-block text-2xl mb-4 mx-4 my-4" onClick={openModal} style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}>
              View Map
            </button>
            </div>
            {/* FilterdSquirrels */}
            <div className="h-auto min-h-screen mb-72 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSearchSquirrels &&
                    filteredSearchSquirrels
                        .filter(squirrel => squirrel.unique_squirrel_id !== null)
                        .map(squirrel => (
                            <div key={squirrel.unique_squirrel_id} className="h-full cursor-pointer" onClick={() => handleClick(squirrel.unique_squirrel_id)}>
                                <AccidentDetailed
                                    squirrel={squirrel}
                                />
                            </div>
                        ))
                }
            </div>
        </div>
    </div>
    );
}

export default AccidentIndex;
