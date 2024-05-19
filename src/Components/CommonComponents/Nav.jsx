import { Link } from "react-router-dom";
// import { User } from "lucide-react";
// import { Library } from "lucide-react";
/*
colors: {
        'dark-navy': '#00043A',
        'navy': '#002962',
        'light-navy': '#004E89',
        'white': '#FFFFFF',
        'dark': '407BA7',
        'red': '#FF002B',
        'red-orange': '#C00021',
        'dark-red': '#A0001C',
        'burgandy': '#800016',
      }
*/ 
const Nav = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-dark-navy to-light-navy shadow-lg shadow-slate-400">
        <div className="p-7 flex flex-row justify-between">
          <Link to={"/"}>
            <div className="font-bold text-2xl text-white inline-block" style={{ fontFamily: 'Orbitron, sans-serif', fontStyle: 'normal' }}>
              <span className="">G</span>uard
              <span className="">R</span>oute
            </div>
          </Link>
          <div className="flex items-center">
            <Link to={"/accidents"}>
              {/* <Library
                strokeWidth={3}
                className="text-white w-7 h-7 mr-4 md:mr-12"
              /> */}
              <p className="text-4xl">📰</p>
            </Link>
            {/* <Link to={"/account"}>
              <User strokeWidth={3} className="text-white w-7 h-7" />
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
