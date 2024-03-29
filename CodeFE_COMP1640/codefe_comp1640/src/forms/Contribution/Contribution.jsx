import React from 'react'

function Contribution({ currentItems }) {

    console.log("currentItems", currentItems)
    return (
        <div className="row mt-4">
            {
                currentItems.map((item, index) => {
                    return (
                        <div className="col">
                            <div className="card">
                                <img src="https://www.analyticsinsight.net/wp-content/uploads/2021/07/Technology-Can-Boost-Your-Business-Productivity.jpg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">{item.content}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Contribution