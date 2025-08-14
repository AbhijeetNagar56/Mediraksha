import { Link } from "react-router";

export default function Navbar() {
    const acc = () => {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = '/detail';
        } else {
            window.location.href = '/auth';
        }
    }
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a><Link to='/'>Home</Link></a></li>
                        <li>
                            <details>
                                <summary>Services</summary>
                                <ul className="p-2">
                                    <li><a><Link to='/map'>Nearby Hospitals</Link></a></li>
                                    <li><a><Link to='/upload'>Upload report</Link></a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a><Link to='/about'>About</Link></a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">MediRaksha</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a><Link to='/'>Home</Link></a></li>
                    <li>
                        <details>
                            <summary>Services</summary>
                            <ul className="p-2">
                                <li><a><Link to='/map'>Nearby Hospitals</Link></a></li>
                                <li><a><Link to='/upload'>Upload report</Link></a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a><Link to='/about'>About</Link></a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn"><Link onClick={acc}>Account</Link></a>
            </div>
        </div>
    );
}
