import { useNavigate } from "react-router-dom";
import "../../App.css";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
      <>
      {/* add smooth scroll on click */}
        <div className="flex overflow-x-auto">
          <div className="flex-shrink-0 flex items-center justify-center h-screen w-[65vw] bg-burgandy bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://res.cloudinary.com/dwygxzqku/image/upload/v1715988788/GuardRoute/city.jpg')" }}>
            <h1 className="p-8 text-6xl md:text-4xl font-bold mb-5 bg-black/70 text-white text-center rounded-xl hover:bg-black" style={{ fontFamily: 'Orbitron, sans-serif', fontStyle: 'normal' }} onClick={() => navigate("/accidents")}>
              Welcome to GuardRoute
            </h1>
          </div>
          <div className="w-[35vw] flex-shrink-0 md:px-20 md:py-20 bg-cover bg-center bg-fixed p-9 bg-burgandy">
            <h1 className="text-white text-lg md:text-5xl mb-8 p-5 rounded-xl text-center" style={{ fontFamily: 'Orbitron, sans-serif', fontStyle: 'normal' }}>Navigating NYC's Roads</h1>
            <p className="text-white text-3xl md:text-3xl mb-8 p-5 rounded-xl text-center" style={{ fontFamily: 'Bebas Neue, sans-serif', fontStyle: 'normal' }}>
              Stay informed on the latest car collision incidents across New York City with GuardRoute. From fender-benders to major accidents, we provide up-to-the-minute coverage, detailed reports, and insightful analysis on traffic incidents impacting NYC streets. Whether you're a concerned commuter, an advocate for road safety, or simply curious about local traffic trends, GuardRoute platform offers a reliable source for understanding the dynamics of vehicular collisions in the city that never sleeps.
            </p>
          </div>
          <div className="flex-shrink-0 h-screen bg-cover bg-center bg-fixed flex justify-center items-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dwygxzqku/image/upload/v1714969866/SquirrelQuest/anthony-intraversato-pT_wQgZAIU8-unsplash_kwjyh7.jpg')" }}>
            <p className="p-8 text-lg md:text-5xl mb-5 bg-black/70 text-white text-center rounded-xl w-3/4" style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}>
              Immerse yourself in the beauty of central park and its squirrel inhabitants 🌰
    </p>
  </div>
  <div className="flex-shrink-0 flex justify-center items-center w-full">
    <video loop autoPlay muted>
      <source src="https://ia600502.us.archive.org/22/items/vid-20230930-102105864/VID_20230930_102105864.mp4" type="video/mp4" />
    </video>
  </div>
  <div className="flex-shrink-0 h-screen bg-cover bg-center bg-fixed flex justify-center items-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dwygxzqku/image/upload/v1714969864/SquirrelQuest/vincent-van-zalinge-rYZHmeH4dvQ-unsplash_dpgf2c.jpg')" }}>
    <button href="#" className="bg-black/80 hover:bg-dark-teal hover:text-mint text-white font-bold py-9 px-9 rounded-xl inline-block text-7xl" style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }} onClick={() => navigate("/squirrels")}>
      Start Quest!
    </button>
  </div>
</div>

      </>
  );
};

export default LandingPage;
