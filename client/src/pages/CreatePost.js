import React from 'react'
import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from "axios";


function CreatePost() {

    const initialValues = {
        title: "",
        postText: "",
        username:"",
    };
//Yup used for form validation
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required()
    })
//posting the post in database
    const onSubmit =(data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
            console.log("WORKED MUSH");
        });    }

    //Create Post Form 
  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label> Title: </label>
                <ErrorMessage name='title' component="span"/>
                <Field
                    id="inputCreatePost"
                    name="title"
                    placeholder="(Ex. Title...)"
                />
                <label> Post: </label>
                <ErrorMessage name='poseText' component="span"/>
                <Field
                    id="inputCreatePost"
                    name="postText"
                    placeholder="(Ex. Post...)"
                />
                <label> Username: </label>
                <ErrorMessage name='username' component="span"/>
                <Field
                    id="inputCreatePost"
                    name="username"
                    placeholder="(Ex. Nik123...)"
                />

                <button type='submit'> Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost