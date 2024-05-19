import { Linkedin } from "lucide-react";
import { FiGithub } from "react-icons/fi";

import { Mail } from "lucide-react";

import { Link } from "react-router-dom";

const AboutTheDevs = () => {
  return (
    <div>
      <div className="h-screen md-min-h-[300-vh] md-mb-72 md-h-auto bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://res.cloudinary.com/dwygxzqku/image/upload/v1715988788/GuardRoute/city.jpg')" }}>
          <div className="text-white py-12 text-center text-5xl font-bold bg-black/20" style={{ fontFamily: 'Orbitron, sans-serif', fontStyle: 'normal' }}>
            Meet the Team
          </div>
          {/* <hr className="mx-10 border-2" /> */}
          <div className="grid lg:grid-cols-2 md:gap-2 ml-12 pb-24">
            <div className="bg-gray-100/50 rounded-xl mx-10 my-10 shadow-2xl  backdrop-brightness-150 backdrop-blur-3xl bg-opacity-90 hover:bg-gray-100 w-3/4">
              <div className="grid grid-cols-4 h-full">
                <div className="bg-red-500 rounded-tl-lg rounded-bl-lg text-5xl text-white flex items-center justify-center col-span-1 bg-pink-400">
                  JG
                </div>
                <div className="pb-10 p-5 col-span-3">
                  <div className="text-2xl ">Julissa Garcia</div>
                  <div>Software Engineer</div>
                  <div>
                    <div className="pt-2 flex flex-row">
                      {/* link is outside of app so need to change element to a and add href= */}
                      <a
                        href={
                          "https://www.linkedin.com/in/juligarc91/"
                        }
                        target={"_blank"}
                      >
                        <div className="bg-blue-500  rounded p-1 hover:bg-black">
                          <Linkedin
                            strokeWidth={2}
                            className="text-white w-6 h-6"
                          />
                        </div>
                      </a>
                      <a
                        href={"https://github.com/juliGarc91"}
                        target={"_blank"}
                      >
                        <div className="bg-purple-500 rounded p-1 ml-4 hover:bg-black">
                          <FiGithub
                            strokeWidth={2}
                            className="text-white w-6 h-6"
                          />
                        </div>
                      </a>
                      <a href="mailto:JulissaGarcia@pursuit.org">
                        <div className="bg-green-500 rounded p-1 ml-4 hover:bg-black">
                          <Mail
                            strokeWidth={2}
                            className="text-white w-6 h-6"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100/50  rounded-xl mx-10 my-10 shadow-2xl  backdrop-brightness-150 backdrop-blur-3xl bg-opacity-90 hover:bg-gray-100 w-3/4 ">
              <div className="grid grid-cols-4 h-full">
                <div className="bg-emerald-500 rounded-tl-lg rounded-bl-lg text-5xl text-white flex items-center justify-center col-span-1">
                  MR
                </div>
                <div className="pb-10 p-5 col-span-3">
                  <div className="text-2xl">Michael Restrepoross</div>
                  <div>Software Engineer</div>
                  <div>
                    <div className="pt-2 flex flex-row">
                      <a
                        href={"http://www.linkedin.com/in/michael-restrepoross"}
                        target={"_blank"}
                      >
                        <div className="bg-blue-500  rounded p-1 hover:bg-black">
                          <Linkedin
                            strokeWidth={2}
                            className="text-white w-6 h-6"
                          />
                        </div>
                      </a>
                      <a
                        href={"https://github.com/MichaelARestrepoross"}
                        target={"_blank"}
                      >
                        <div className="bg-purple-500 rounded p-1 ml-4 hover:bg-black">
                          <FiGithub
                            strokeWidth={2}
                            className="text-white w-6 h-6"
                          />
                        </div>
                      </a>
                      <a
                        href="mailto:MichaelRestrepoross@pursuit.org">
                        <div className="bg-green-500 rounded p-1 ml-4 hover:bg-black">
                          <Mail
                            strokeWidth={2}
                            className="text-white w-6 h-6"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100/50  rounded-xl mx-10 my-10 shadow-2xl  backdrop-brightness-150 backdrop-blur-3xl bg-opacity-90 hover:bg-gray-100 w-3/4 ">
              <div className="grid grid-cols-4 h-full">
                <div className="bg-indigo-500 rounded-tl-lg rounded-bl-lg text-5xl text-white flex items-center justify-center col-span-1">
                  JB
                </div>
                <div className="pb-10 p-5 col-span-3">
                  <div className="text-2xl">Jose Barrios</div>
                  <div>Software Engineer</div>
                  <div>
                    <div className="pt-2 flex flex-row">
                      <a
                        href={"https://www.linkedin.com/in/josebarriosa/"}
                        target={"_blank"}
                      >
                        <div className="bg-blue-500  rounded p-1 hover:bg-black">
                          <Linkedin
                            strokeWidth={2}
                            className="text-white w-6 h-6"
                          />
                        </div>
                      </a>
                      <a
                        to={"https://github.com/josebarrios23"}
                        target={"_blank"}
                      >
                        <div className="bg-purple-500 rounded p-1 ml-4 hover:bg-black">
                          <FiGithub
                            strokeWidth={2}
                            className="text-white w-6 h-6"
                          />
                        </div>
                      </a>
                      <a to="mailto:JoseBarrios@pursuit.org">
                        <div className="bg-green-500 rounded p-1 ml-4 hover:bg-black">
                          <Mail
                            strokeWidth={2}
                            className="text-white w-6 h-6"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AboutTheDevs;
