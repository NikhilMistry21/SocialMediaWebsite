import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);

    //get request for specific post via id of post
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
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
        <div className='postPageRight'>
            <div className='commentAddContainer'>
                <input type='text' placeholder='Comment...' autoComplete='off'></input>
                <button > Comment </button>
            </div>
            <div className='commentsList'>
                {comments.map((comment, key) => {
                    return <div key={key} className='comment' > {comment.commentBody} </div>
                })}
            </div>
        </div>
    </div>
  )
}

export default Post