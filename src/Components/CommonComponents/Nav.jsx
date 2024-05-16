import { Link } from "react-router-dom";
// import { User } from "lucide-react";
// import { Library } from "lucide-react";

const Nav = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-dark-teal to-mint shadow-lg shadow-slate-400">
        <div className="p-7 flex flex-row justify-between">
          <Link to={"/"}>
            <div className="font-bold text-2xl text-white inline-block" style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}>
              <span className="">G</span>uard
              <span className="">R</span>Route
            </div>
          </Link>
          <div className="flex items-center">
            <Link to={"/squirrels"}>
              {/* <Library
                strokeWidth={3}
                className="text-white w-7 h-7 mr-4 md:mr-12"
              /> */}
              <p className="text-3xl">🐿️</p>
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
