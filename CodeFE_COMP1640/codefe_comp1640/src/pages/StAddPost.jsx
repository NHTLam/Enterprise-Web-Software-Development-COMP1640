import PostInfor from "../forms/PostInfor/PostInfor"
import PostSubmit from "../forms/PostSubmit/PostSubmit";

import React from 'react'

function StAddPost() {
    const onFileChange = (files) =>{
        console.log(files)
    }

    return (
        <div>
            <PostInfor />
            <PostSubmit onFileChange={(files) => onFileChange(files)} />
        </div>
    )
}

export default StAddPost