export const apiUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : 'something';

export const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern';

export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS';
export const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL';
export const POSTS_ADD = 'POSTS_ADD';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const FIND_POST = 'FIND_POST';