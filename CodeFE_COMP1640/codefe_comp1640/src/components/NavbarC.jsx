import { Button } from 'bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="mt-2 mb-2">
      <nav class="navbar navbar-expand-lg navbar-light ">
        <div class="container">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <button type ="button" class="navbar-brand btn btn-secondary text-light" href="#">Home</button>
            <button type ="button" class="navbar-brand btn btn-secondary text-light" href="#">Business</button>
            <button type ="button" class="navbar-brand btn btn-secondary text-light" href="#">Design</button>
            <button type ="button" class="navbar-brand btn btn-secondary text-light" href="#">Information Technology</button>
          </div>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-secondary" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  )
}

export default Navbar