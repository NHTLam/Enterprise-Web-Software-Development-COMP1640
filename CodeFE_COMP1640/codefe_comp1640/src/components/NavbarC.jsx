import React from 'react'
import { Link } from 'react-router-dom'

const NavbarC = () => {
  return (
    <div className="mt-2 mb-2">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <button type ="button" className="navbar-brand btn btn-secondary text-light" href="#">Home</button>
            <button type ="button" className="navbar-brand btn btn-secondary text-light" href="#">Business</button>
            <button type ="button" className="navbar-brand btn btn-secondary text-light" href="#">Design</button>
            <button type ="button" className="navbar-brand btn btn-secondary text-light" href="#">Information Technology</button>
          </div>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-secondary" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  )
}

export default NavbarC