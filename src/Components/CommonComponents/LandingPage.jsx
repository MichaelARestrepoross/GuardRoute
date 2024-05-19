import { useNavigate } from "react-router-dom";
import "../../App.css";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
      <>
      {/* add smooth scroll on click */}
        <div className="flex items-center justify-center h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://res.cloudinary.com/dwygxzqku/image/upload/v1715988788/GuardRoute/city.jpg')" }}
        >
            <h1 className="p-8 text-4xl md:text-6xl font-bold mb-5 bg-black/70 text-white text-center rounded-xl hover:bg-black" style={{ fontFamily: 'Orbitron, sans-serif', fontStyle: 'normal' }}
            onClick={() => navigate("/accidents")}
            >
                  Welcome to GuardRoute
            </h1> 
        </div>
        <div className="md:px-20 md:py-20 bg-cover bg-center bg-fixed p-9" style={{ backgroundImage: "url('https://res.cloudinary.com/dwygxzqku/image/upload/v1714890505/SquirrelQuest/jo-1o8-ns6svD0-unsplash_kafaft.jpg')" }}>
              
              <p className="bg-black/70 text-white text-lg md:text-5xl mb-8 p-5 rounded-xl" style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}>
                Embark on an enchanting adventure through Central Park with SquirrelQuest. Our app guides you to the spots where these furry creatures dwell, allowing you to immerse yourself in their world. Dive into captivating stories about their antics and behaviors, enriching your experience as you explore the park. SquirrelQuest invites you to discover the beauty of nature and the charm of New York's iconic green oasis like never before.
              </p>
        </div>
        <div className="h-screen bg-cover bg-center bg-fixed flex justify-center items-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dwygxzqku/image/upload/v1714969866/SquirrelQuest/anthony-intraversato-pT_wQgZAIU8-unsplash_kwjyh7.jpg')" }}>

            <p className="p-8 text-lg md:text-5xl mb-5 bg-black/70 text-white text-center rounded-xl w-3/4" style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}>
                  Immerse yourself in the beauty of central park and its squirrel inhabitants 🌰
            </p> 
          
        </div>
        <div className="flex justify-center items-center w-full">
              <video loop autoPlay muted>
                <source src="https://ia600502.us.archive.org/22/items/vid-20230930-102105864/VID_20230930_102105864.mp4" type="video/mp4" />
              </video>
        </div>
        <div className="h-screen bg-cover bg-center bg-fixed flex justify-center items-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dwygxzqku/image/upload/v1714969864/SquirrelQuest/vincent-van-zalinge-rYZHmeH4dvQ-unsplash_dpgf2c.jpg')" }}>
          <button
              href="#"
              className="bg-black/80 hover:bg-dark-teal hover:text-mint text-white font-bold py-9 px-9 rounded-xl inline-block text-7xl" style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}
              onClick={() => navigate("/accidents")}
          >
            Start Quest!
          </button> 
        </div>
      </>
  );
};

export default LandingPage;
