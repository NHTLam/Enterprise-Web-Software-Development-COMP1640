
import React, { useEffect, useState } from 'react';
import Contribution from '../forms/Contribution/Contribution';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_KEY;
function Pagination({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);

    const [contributions, setContributions] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${API_BASE}/article/GetAllArticle`, {
            headers: {
                'ngrok-skip-browser-warning': 'true',
                Authorization: `Bearer ${token}`
            }
        }).then(data => {
            console.log("data", data.data.data)
            setContributions(data.data.data)
        })
            .catch(err => console.log(err))
    }, [])

    console.log("contribute: ", contributions)

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
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
                <Contribution currentItems={currentItems} />
            
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