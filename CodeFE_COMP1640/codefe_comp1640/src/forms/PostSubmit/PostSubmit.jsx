import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import './Style.css'
import imageInput from '../../assets/add_image.png'
const PostSubmit = props => {
    const [imageList, setImageList] = useState([]);
    const fileInputRef = useRef(null);

    function onFileInput(e) {
        const files = e.target.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            // if (files[i].type.split('/')[0] !== 'images') continue;
            if (!imageList.some((e) => e.name === files[i].name)) {
                setImageList((preImages) => [
                    ...preImages, {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    }
                ])
            }
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...imageList];
        updatedList.splice(imageList.indexOf(file), 1);
        setImageList(updatedList);
        props.onFileChange(updatedList);
    }


    return (
        <>
            <div className='mt-5 mb-5 max-width m-auto'>
                <form>
                    <div className='bg-light'>
                        <div className="mb-3 mt-5">
                            <input className="form-control" type="file" id="formFileMultiple" multiple />
                        </div>
                    </div>
                    <div className="drop_card form-control">
                        <div className="image_area">
                            {imageList.map((item, index) => (
                                <div className="image-preview__item">
                                    <span className="image-preview__item__del" onClick={() => fileRemove(item)}>&times;</span>
                                    <img src={item.url} alt={item.name} />
                                </div>
                            ))}
                            <div className="drag_area">
                                <img src={imageInput} alt="image_upload" className='img' />
                                <input name="file" type="file" className='file_input' onChange={onFileInput} ref={fileInputRef} multiple />
                            </div>
                        </div>
                    </div>

                    <div className="input-group mt-3">
                        <span className="input-group-text">With textarea</span>
                        <textarea className="form-control" aria-label="With textarea"></textarea>
                    </div>

                    <button type="submit" className="btn btn-secondary float-end mt-3">Submit</button>
                </form>
            </div>

        </>
    )
}
PostSubmit.protoTypes = {
    onFileChange: PropTypes.func
}
export default PostSubmit