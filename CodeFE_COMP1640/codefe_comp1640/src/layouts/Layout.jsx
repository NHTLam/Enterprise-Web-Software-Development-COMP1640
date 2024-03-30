import React from 'react';
import Header from '../components/Header';

import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import { useMemo } from 'react';

const Layout = ({ children }) => {
    const header = useMemo(() => <Header/>,[]);
    return (
        <div className="layout">
            {header}
            <div className='container-xl p-0' style={{marginTop:"55px"}}>{children}</div>
        </div>
    )
}

export default Layout