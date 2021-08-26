import { POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS, POSTS_ADD, UPDATE_POST, DELETE_POST, FIND_POST } from "../contexts/constants";

export const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postsLoading: false,
      }
    case POSTS_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postsLoading: false,
      }
    case POSTS_ADD:
      return {
        ...state,
        posts: [...state.posts, payload],
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p._id !== payload),
        postsLoading: false
      }
    case UPDATE_POST:
      const newPost = state.posts.map(post =>
        post._id === payload._id ? payload : post
      )
      console.log(newPost)
      return {
        ...state,
        posts: newPost
      }
    case FIND_POST:
      return {
        ...state,
        post: payload,
      }
    default:
      return state;
  }
}