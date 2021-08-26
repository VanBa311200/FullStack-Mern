import { createContext, useReducer, useState } from "react";

import { postReducer } from "../reducers/postReducer";
import axios from 'axios'
import { POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL, POSTS_ADD, DELETE_POST, UPDATE_POST, FIND_POST, apiUrl } from "./constants";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  });

  // const { posts } = postState;

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);


  // find post when click
  const findPost = (postId) => {
    const post = postState.posts.find(p => p._id === postId);

    dispatch({
      type: FIND_POST,
      payload: post
    })
  }

  // get all posts
  const getPost = async () => {
    try {
      const res = await axios.get(`${apiUrl}/posts`)

      if (res.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: res.data.post })
      }
    } catch (err) {
      dispatch({ type: POSTS_LOADED_FAIL })
    }
  }

  // toats useState 
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null
  });


  // Add new post
  const addNewPost = async (postForm) => {
    try {
      const res = await axios.post(`${apiUrl}/posts`, postForm);

      if (res.data.success) {
        dispatch({ type: POSTS_ADD, payload: res.data.post })
        return res.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server Error' };
    }
  }

  // delete post 
  const deletePost = async (postid) => {
    try {
      const res = await axios.delete(`${apiUrl}/posts/${postid}`)

      if (res.data.success)
        dispatch({
          type: DELETE_POST,
          payload: postid
        })
    } catch (error) {
      console.log(error)
    }
  }

  // updatePost
  const updatePost = async (updatePost) => {
    try {
      const res = await axios.put(`${apiUrl}/posts/${updatePost._id}`, updatePost)

      if (res.data.success) {
        dispatch({
          type: UPDATE_POST,
          payload: res.data.post
        })
        return res.data
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server Error' };
    }


  }

  const postContextData = {
    postState,
    getPost,
    setShowAddPostModal,
    showAddPostModal,
    addNewPost,
    showToast,
    setShowToast,
    deletePost,
    findPost,
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost
  };

  return (


    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;