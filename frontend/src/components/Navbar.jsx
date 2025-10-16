import { Link } from "react-router";
import logo from '../assets/logo.png'

export default function Navbar() {
  // const acc = () => {
  //   const token = localStorage.getItem("token");
  //   window.location.href = "/auth";
  // };

  return (
    <div className="navbar bg-base-100 shadow-sm relative z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <details>
                <summary>Services</summary>
                <ul className="p-2 z-50">
                  <li>
                    <Link to="/map">Nearby hospitals</Link>
                  </li>
                  <li>
                    <Link to="/upload">Upload report</Link>
                  </li>
                  <li>
                    <Link to="/schedule">Book an appointment</Link>
                  </li>
                  <li>
                    <Link to="/availability">Practioner availability</Link>
                  </li>
                  <li>
                    <Link to="/resource">Bed availability</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <img src={logo} alt="icon" className="w-[30px]" />
        <a className="mx-2 font-bold text-2xl">MediRaksha</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <details>
              <summary>Services</summary>
              <ul className="p-2 z-50">
                <li>
                  <Link to="/map">Nearby hospitals</Link>
                </li>
                <li>
                  <Link to="/upload">Upload report</Link>
                </li>
                <li>
                  <Link to="/schedule">Book an appointment</Link>
                </li>
                <li>
                  <Link to="/availability">Practioner availability</Link>
                </li>
                <li>
                  <Link to="/resource">Bed availability</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="btn">
          <Link to='/auth'>My Profile</Link>
        </div>
      </div>
    </div>
  );
}
