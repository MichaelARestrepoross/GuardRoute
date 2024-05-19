import { useNavigate } from "react-router-dom";
import "../../App.css";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
      <>
      {/* add smooth scroll on click */}
        <div className="flex overflow-x-auto">
          <div className="h-auto flex-shrink-0 flex items-center justify-center w-[65vw] bg-burgandy bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://res.cloudinary.com/dwygxzqku/image/upload/v1715988788/GuardRoute/city.jpg')" }}>
            <h1 className="p-8 text-6xl md:text-4xl font-bold mb-5 bg-black/70 text-white text-center rounded-xl hover:bg-navy" style={{ fontFamily: 'Orbitron, sans-serif', fontStyle: 'normal' }} onClick={() => navigate("/accidents")}>
              Welcome to GuardRoute
            </h1>
          </div>
          <div className="w-[35vw] flex-shrink-0 md:py-20 bg-cover bg-center bg-fixed p-9 bg-burgandy">
            <h1 className="text-white text-lg md:text-5xl mb-8 p-5 rounded-xl text-center" style={{ fontFamily: 'Orbitron, sans-serif', fontStyle: 'normal' }}>Navigating NYC's Roads</h1>
            <p className="text-white text-5xl md:text-3xl mb-8 p-5 rounded-xl text-center" style={{ fontFamily: 'Bebas Neue, sans-serif', fontStyle: 'normal' }}>
              Stay informed on the latest car collision incidents across New York City with GuardRoute. From fender-benders to major accidents, we provide up-to-the-minute coverage, detailed reports, and insightful analysis on traffic incidents impacting NYC streets. Whether you're a concerned commuter, an advocate for road safety, or simply curious about local traffic trends, GuardRoute platform offers a reliable source for understanding the dynamics of vehicular collisions in the city that never sleeps.
              <div onClick={() => navigate("/accidents")} className="hover:bg-navy p-5 m-5 rounded-xl">
                Click to view Archives
              </div>
              <p>Recent News Story</p>
              <p>Elderly man involved in Box Truck collision. Click to read more...</p>
              <img className="rounded-xl" src="https://res.cloudinary.com/dwygxzqku/image/upload/v1716054143/GuardRoute/header_blhrsr.jpg" alt="collision fire" onClick={() => navigate("/accidents/4724633")}/>
            </p>
          </div>
          
  <div className="h-auto flex-shrink-0 flex justify-center items-center w-full bg-cover bg-center bg-fixed " style={{ backgroundImage: "url('https://res.cloudinary.com/dwygxzqku/image/upload/v1716098339/GuardRoute/landing_d8koxs.jpg')" }}>
    <div className="flex flex-col items-center justify-center mb-10 py-20" style={{ fontFamily: 'Orbitron, sans-serif', fontStyle: 'normal' }}>
    <div className="bg-black/80 text-yellow text-center rounded-xl w-3/4 text-2xl mb-10 px-10">
    <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontStyle: 'normal' }} className="text-5xl">Experience the Thrill of a Car Rescue Demonstration</h1>
    <p><a href="https://ia600502.us.archive.org/22/items/vid-20230930-102105864/VID_20230930_102105864.mp4" className="hover:text-light-blue">Click here </a>
to gain insights into:</p>
    <ul>
        <li>The principles of vehicle stabilization</li>
        <li>The importance of teamwork in rescue operations</li>
        <li>The strategies employed by experienced responders</li>
    </ul>
    <p>Observe how these responders face and overcome critical moments with skill and precision.</p>
    </div>
    <video loop autoPlay muted width="900" height="450" className="rounded-xl">
      <source src="https://ia600502.us.archive.org/22/items/vid-20230930-102105864/VID_20230930_102105864.mp4" type="video/mp4" />
    </video>
    </div>
  </div>
</div>

      </>
  );
};

export default LandingPage;
