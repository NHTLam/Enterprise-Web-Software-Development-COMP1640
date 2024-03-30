import React from 'react'

function Contribution({ currentItems }) {
    return (
        <div className="d-flex flex-wrap mt-4 mb-4 ">
            {
                currentItems.map((item, index) => {
                    return (
                        <div className="mb-3 w-100">
                            <div class="card w-100">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="https://www.analyticsinsight.net/wp-content/uploads/2021/07/Technology-Can-Boost-Your-Business-Productivity.jpg" class="img-fluid rounded-start" alt="..."/>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">Card title</h5>
                                            <p class="card-text">{item.content}</p>
                                            <p class="card-text"><small class="text-muted">See moree ...</small></p>
                                        </div>
                                    </div>
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