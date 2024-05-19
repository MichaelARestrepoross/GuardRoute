import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate, getImageUrl, generateNameFromID } from '../Helpers/SingleSquirrelHelper';
import '../App.css';
import DetailsMap from './DetailsMap';

const CRASHES_API = import.meta.env.VITE_CRASHES_BASE_URL;
const CRASHES_TOKEN = import.meta.env.VITE_CRASHES_TOKEN;
const VEHICLES_API = import.meta.env.VITE_VEHICLES_BASE_URL;
const VEHICLES_TOKEN = import.meta.env.VITE_CRASHES_TOKEN;
const PERSONS_API = import.meta.env.VITE_PERSONS_BASE_URL;
const PERSONS_TOKEN = import.meta.env.VITE_PERSONS_TOKEN;

const GOOGLE_MAPS_TOKEN = import.meta.env.VITE_GOOGLE_MAPS_TOKEN;
const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID

const AccidentDetailed = () => {
    const [crash, setCrash] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [persons, setPersons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [open, setOpen] = useState(false)

    useEffect(() => {
        async function fetchCrash() {
            try {
                const response = await fetch(`${CRASHES_API}?$$app_token=${CRASHES_TOKEN}&collision_id=${id}`);
                if (response.ok) {
                    const data = await response.json();    
                    const crashById = data[0];
                    if (crashById) {
                        setCrash(crashById);
                    } else {
                        console.log('Car crash with ID', id, 'not found.');
                    }
                } else {
                    console.error('Failed to fetch car accidents data');
                }
            } catch (error) {
                console.error('Error fetching car accidents data:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCrash();
    }, [id]);

    useEffect(() => {
        async function fetchVehicles() {
            try {
                const response = await fetch(`${VEHICLES_API}?$$app_token=${VEHICLES_TOKEN}&collision_id=${id}`);
                if (response.ok) {
                    const data = await response.json();    
                    if (data.length > 0) {
                        setVehicles(data);
                    } else {
                        console.log('No vehicles found for collision ID', id);
                    }
                } else {
                    console.error('Failed to fetch Vehicles data');
                }
            } catch (error) {
                console.error('Error fetching Vehicles data:', error);
            }
        }
    
        fetchVehicles();
    }, [id]);
    
    useEffect(() => {
        async function fetchPersons() {
            try {
                const response = await fetch(`${PERSONS_API}?$$app_token=${PERSONS_TOKEN}&collision_id=${id}`);
                if (response.ok) {
                    const data = await response.json();    
                    if (data.length > 0) {
                        setPersons(data);
                    } else {
                        console.log('No persons found for collision ID', id);
                    }
                } else {
                    console.error('Failed to fetch Persons data');
                }
            } catch (error) {
                console.error('Error fetching Persons data:', error);
            }
        }
    
        fetchPersons();
    }, [id]);
    

    // const position = squirrel ? { lat: parseFloat(squirrel.y), lng: parseFloat(squirrel.x) } : { lat: 0, lng: 0 };

    // const imageUrl = squirrel && getImageUrl(squirrel.primary_fur_color, squirrel.unique_squirrel_id);
    // const squirrelName = squirrel && generateNameFromID(squirrel.unique_squirrel_id);

    return (
        <>
        <div className="flex justify-center items-center w-full">
              <video loop autoPlay muted>
                <source src="https://ia600502.us.archive.org/22/items/vid-20230930-102105864/VID_20230930_102105864.mp4" type="video/mp4" />
              </video>
        </div>
            {/* <div className="h-auto md:px-20 md:py-5 bg-cover bg-center bg-fixed mb-10"> */}
            <div className="h-auto md:px-20 md:py-5 bg-cover bg-center bg-fixed mb-10">
                <br/>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={{ fontFamily: 'Courier, sans-serif', fontStyle: 'normal' }}>
                        {crash ? (
                            <div>
                                {crash.number_of_pedestrians_killed && crash.number_of_pedestrians_killed > 0 ? <h1>Fatal Collision In NYC Area</h1> : <h1>Collision in NYC Area</h1>}
                                {crash.number_of_pedestrians_killed && crash.number_of_pedestrians_killed > 0 ? <p>In a tragic turn of events, a fatal collision has left the downtown area where this calamitous incident occured reeling. The incident, which occurred on the evening of {crash.crash_date} at {crash.crash_time}, has sent shockwaves through the community. According to reports, the collision resulted in {crash.number_of_persons_injured} injuries and {crash.number_of_persons_killed} fatalities. </p> : <p>In a disastrous turn of events, a collision has left the area reeling. The incident, which occurred on the evening of {crash.crash_date} at {crash.crash_time}, has sent shockwaves through the community.</p>}
                                {/* <p>Crash Date: {crash.crash_date}</p>
                                <p>Crash Time: {crash.crash_time}</p> */}

                                {crash.number_of_pedestrians_injured && crash.number_of_pedestrians_injured > 0 || crash.number_of_pedestrians_killed && crash.number_of_pedestrians_killed > 0 ?
                                <p>Among the casualties were pedestrians highlighting the severity of the crash.</p>:<p>No pedestrians were involved in the accident.</p>}

                                {crash.number_of_cyclist_injured > 0 || crash.number_of_cyclist_killed > 0 ? <p>Furthermore, {crash.number_of_cyclist_injured} cyclists and {crash.number_of_cyclist_killed} cyclists were also impacted by the collision, adding to the magnitude of the tragedy. </p> : <p></p>}

                                {crash.number_of_motorist_injured > 0 ? <p>{crash.number_of_motorist_injured} motorists sustained injuries, underscoring the widespread impact of the incident</p> : <p></p>}

                                {crash.number_of_motorist_killed > 0 ? <p>Additionally, {crash.number_of_motorist_injured} motorists were fatally wounded, highlighting the cataclysmic nature of the accident.</p> : <p>Thankfully, no motorcyclists were fatally wounded in this incident.</p>}

                                {crash.on_street_name && crash.off_street_name ? <p>The collision, which occurred at the intersection of {crash.on_street_name} and {crash.off_street_name}, has stunned residents and authorities alike.</p> : <p>The collision has stunned residents and authorities alike.</p>}


                                <p>Emergency responders swiftly mobilized to the scene, grappling with the aftermath of the catastrophe.</p>
                                
                                {crash.vehicle_type_code1 && crash.vehicle_type_code2 && crash.contributing_factor_vehicle_1 && crash.contributing_factor_vehicle_2 ? <p>The collision involved multiple vehicles, including {crash.vehicle_type_code1} and {crash.vehicle_type_code2}. Factors contributing to the crash, such as {crash.contributing_factor_vehicle_1} and {crash.contributing_factor_vehicle_2}, are under investigation.</p> : <p></p>}

                                {crash.vehicle_type_code1 ? <p>The collision involved a {crash.vehicle_type_code1}. Factors contributing to the crash are under investigation.</p> : <p></p>}


                                {/* {crash.on_street_name && <p>On Street Name: {crash.on_street_name}</p>}
                                {crash.off_street_name && <p>Off Street Name: {crash.off_street_name}</p>} */}
                                {/* {crash.number_of_persons_injured && <p>Number of Persons Injured: {crash.number_of_persons_injured}</p>} */}
                                {/* {crash.number_of_persons_killed && <p>Number of Persons Killed: {crash.number_of_persons_killed}</p>} */}
                                {/* {crash.number_of_pedestrians_injured && <p>Number of Pedestrians Injured: {crash.number_of_pedestrians_injured}</p>} */}
                                {/* {crash.number_of_pedestrians_killed && <p>Number of Pedestrians Killed: {crash.number_of_pedestrians_killed}</p>} */}
                                {/* {crash.number_of_cyclist_injured && <p>Number of Cyclists Injured: {crash.number_of_cyclist_injured}</p>}
                                {crash.number_of_cyclist_killed && <p>Number of Cyclists Killed: {crash.number_of_cyclist_killed}</p>}
                                {crash.number_of_motorist_injured && <p>Number of Motorists Injured: {crash.number_of_motorist_injured}</p>}
                                {crash.number_of_motorist_killed && <p>Number of Motorists Killed: {crash.number_of_motorist_killed}</p>} */}
                                {/* {crash.contributing_factor_vehicle_1 && <p>Contributing Factor Vehicle 1: {crash.contributing_factor_vehicle_1}</p>}
                                {crash.contributing_factor_vehicle_2 && <p>Contributing Factor Vehicle 2: {crash.contributing_factor_vehicle_2}</p>} */}
                                {/* <p>Collision ID: {crash.collision_id}</p> */}
                                {/* {crash.vehicle_type_code1 && <p>Vehicle Type Code 1: {crash.vehicle_type_code1}</p>}
                                {crash.vehicle_type_code2 && <p>Vehicle Type Code 2: {crash.vehicle_type_code2}</p>} */}
                            </div>
                        ) : (
                            <p>error</p>
                        )}
                    </div>
                )}
            <div className="flex items-center justify-center h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://res.cloudinary.com/dwygxzqku/image/upload/v1716054136/GuardRoute/header2_euazcz.jpg')" }}
        ></div>
            <div style={{ fontFamily: 'Courier, sans-serif', fontStyle: 'normal' }}>
                {isLoading ? (<p>Loading...</p>) :
                    (<div><br/>
                        <h1>The vehicles involved in this accident:</h1>
                        {vehicles.length > 0 ? (
                            <div>{vehicles.map((vehicle, index) => (
                                <div key={index}>
                                    <h1>Vehicle Details:</h1>
                                    <p>Vehicle Type: {vehicle.vehicle_type}</p>
                                    {vehicle.vehicle_make && <p>Vehicle Make: {vehicle.vehicle_make}</p>}
                                    {vehicle.vehicle_year && <p>Vehicle Year: {vehicle.vehicle_year}</p>}

                                    <h1>Additional details of the incident:</h1>
                                    {vehicle.travel_direction && <p>The driver was traveling {vehicle.travel_direction}.</p>}
                                    {vehicle.vehicle_occupants >= 1 ? <p>There were {vehicle.vehicle_occupants} occupants in the vehicle.</p>: <p>There was only one occupant, the driver.</p>}
                                    {vehicle.pre_crash && <p>Moments before the collision the vehicle was {vehicle.pre_crash}</p>}
                                    {vehicle.point_of_impact && <p>The point of impact was the {vehicle.point_of_impact}</p>}
                                    {vehicle.vehicle_damage && <p>The vehicle displayed damage on the {vehicle.vehicle_damage}</p>}
                                    {vehicle.public_property_damage === 'N' ? <p>Thankfully, the incident resulted in no property damage.</p>:<p>Unfortunately, the incident resulted in extensive property damage.</p>}

                                    <h1>Driver Details:</h1>
                                    {vehicle.driver_sex && <p>Driver Sex: {vehicle.driver_sex}</p>}
                                    {vehicle.driver_license_status && <p>Driver License Status: {vehicle.driver_license_status}</p>}
                                    {vehicle.driver_license_jurisdiction && <p>Driver License Jurisdiction: {vehicle.driver_license_jurisdiction}</p>}
                                    <p>Contributing Factor 1: {vehicle.contributing_factor_1}</p>
                                    {vehicle.contributing_factor_2 && <p>Contributing Factor 2: {vehicle.contributing_factor_2}</p>}
                                    <br/>
                                </div>
                        ))}</div>
                ) : (
                    <p>No vehicles in this collision.</p>
                )}
            </div>)}
            
                {isLoading ? (<p>Loading...</p>) :
                    (
                    <div className='mb-12'>
                        <h1>Details of the victims involved in the accident:</h1>
                        <h2>Victims of the collision: {persons.length}</h2>
                        {persons.length > 0 ? (
                            <div>{persons.map((person, index) => (
                                <div key={index}>
                                    
                                    <p>Person Type: {person.person_type}</p>
                                    {/* <p>Unique ID: {person.unique_id}</p>
                                    <p>Collision ID: {person.collision_id}</p>
                                    <p>Crash Date: {person.crash_date}</p>
                                    <p>Crash Time: {person.crash_time}</p>
                                    <p>Person ID: {person.person_id}</p> */}
                                    <p>Person Injury: {person.person_injury}</p>
                                    {/* <p>Vehicle ID: {person.vehicle_id}</p> */}
                                    {person.person_age && <p>Person Age: {person.person_age}</p>}
                                    {person.ejection && <p>Ejection: {person.ejection}</p>}
                                    {person.emotional_status &&<p>Emotional Status: {person.emotional_status}</p>}
                                    {person.bodily_injury && <p>Bodily Injury: {person.bodily_injury}</p>}
                                    {person.position_in_vehicle && <p>Position in Vehicle: {person.position_in_vehicle}</p>}
                                    {person.safety_equipment && <p>Safety Equipment: {person.safety_equipment}</p>}
                                    {person.complaint && <p>Complaint: {person.complaint}</p>}
                                    {person.ped_role && <p>Pedestrian Role: {person.ped_role}</p>}
                                    <p>Person Sex: {person.person_sex}</p>
                                    <br/>
                                </div>
                ))}</div>
                    ) : ( <p>No persons injured in collision.</p> )}
                </div>)
                }
                </div>
            </div>
        </>
    )
}

export default AccidentDetailed;
