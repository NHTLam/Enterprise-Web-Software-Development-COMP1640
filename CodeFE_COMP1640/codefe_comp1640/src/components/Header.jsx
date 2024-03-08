import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div className='position-fixed top-0 start-0 end-0 z-1 mb-5'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-xl">
                    <Link to="/" className="navbar-brand">Gr-News</Link>
                        <div className="d-flex">
                            <Link className='btn btn-secondary' to='/login'>Login</Link>
                        </div>
                </div>
            </nav>
        </div>
    )
}

export default Header