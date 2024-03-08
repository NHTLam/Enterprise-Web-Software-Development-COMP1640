import React from 'react'
import Header from '../components/Header'

import Footer from '../components/Footer'
import 'bootstrap/dist/css/bootstrap.css';

const layout = ({children}) => {

return (
    <div className='position-relative'>            
        <Header/>
            <div className='container-xl'>{children}</div>
        <Footer/>   
    </div>
)
}

export default layout