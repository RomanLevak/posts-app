import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';
import post from './post';
import comments from './comments';
import postCUD from './post-CUD';

export default combineReducers({
  users,
  posts,
  post,
  comments,
  postCUD
});
