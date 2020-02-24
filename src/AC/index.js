import {
  LOAD_USERS,
  LOAD_POSTS,
  LOAD_POST,
  LOAD_COMMENTS,
  UPDATE_POST,
  CREATE_POST,
  DELETE_POST
} from '../constants';

export function loadUsers() {
  return {
    type: LOAD_USERS,
    callAPI: 'https://jsonplaceholder.typicode.com/users'
  };
}

export function loadPosts(userId) {
  return {
    type: LOAD_POSTS,
    callAPI: `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  };
}

export function loadPost(postId) {
  return {
    type: LOAD_POST,
    callAPI: `https://jsonplaceholder.typicode.com/posts/${postId}`
  };
}

export function loadComments(postId) {
  return {
    type: LOAD_COMMENTS,
    callAPI: `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  };
}

export function updatePost(title, body, id) {
  return {
    type: UPDATE_POST,
    callAPI: {
      url: `https://jsonplaceholder.typicode.com/posts/${id}`,
      method: 'PUT',
      body: { title, body }
    }
  };
}

export function createPost(title, body, userId) {
  return {
    type: CREATE_POST,
    callAPI: {
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'POST',
      body: { title, body, userId }
    }
  };
}

export function deletePost(postId) {
  return {
    type: DELETE_POST,
    callAPI: {
      url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
      method: 'DELETE'
    }
  }
}
