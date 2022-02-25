import React from 'react'
import axios from "axios";
import { useEffect, useState} from "react";
import { useNavigate  } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate(); 

  useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {  //get request for posts in database
            setListOfPosts(response.data);
        });
    }, []);

//Displaying all posts created 
  return (
    <div>
        {listOfPosts.map((value, key) => {   //list of all posts in database
        return ( 
          <div className='post' onClick={() => {
            navigate(`/post/${value.id}`);
          }}
          > 
            <div className='title'> {value.title} </div>
            <div className='body'> {value.postText} </div>
            <div className='footer'> {value.username} </div>
          </div>
        );
      })}
    </div>
  )
}

export default Home