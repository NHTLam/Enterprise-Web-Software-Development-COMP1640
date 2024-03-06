import React from 'react'
import Layout from './layouts/Layout'
import {BrowserRouter as Router,Route, Routes, Navigate} from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout></Layout>} />
      </Routes>
    </Router>
  )
}
export default App