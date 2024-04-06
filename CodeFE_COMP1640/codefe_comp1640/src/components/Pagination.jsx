
import React, { useEffect, useState } from 'react';
import Contribution from '../forms/Contribution/Contribution';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_KEY;
function Pagination({ itemsPerPage, dataContributions, link }) {
    const [itemOffset, setItemOffset] = useState(0);

    const [contributions, setContributions] = useState([]);

    useEffect(()=>{
        setContributions(dataContributions)
    },[dataContributions])
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = contributions.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(contributions.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % contributions.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
                <Contribution currentItems={currentItems} link={link} />
            
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                pageCount={pageCount}
                previousLabel="< prev"
                renderOnZeroPageCount={null}

                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />
        </> 
    );
}

export default Pagination