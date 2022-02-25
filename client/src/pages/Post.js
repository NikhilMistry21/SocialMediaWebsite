import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
    let { id } = useParams();
    const [postObject, seetPostObject] = useState({});

    //get request for specific post via id of post
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            seetPostObject(response.data);
        });
    })

  return (
    <div className='singlePostPage'> 
        <div className='postPageLeft'>
            <div className='post' id='single'>
                <div className='title'> {postObject.title} </div>
                <div className='body'> {postObject.postText} </div>
                <div className='footer'> {postObject.username} </div>
            </div>
        </div>
        <div className='postPageRight'> Comment Section </div>
    </div>
  )
}

export default Post