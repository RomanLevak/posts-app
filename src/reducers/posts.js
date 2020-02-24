import {
  LOAD_POSTS,
  START, SUCCESS, FAIL
} from '../constants';

const defaultState = {
  loading: false,
  error: '',
  entities: []
};

export default (usersState = defaultState, { type, payload }) => {
  switch(type) {
    case LOAD_POSTS + START:
      return {
        loading: true,
        error: '',
        entities: []
      };

    case LOAD_POSTS + SUCCESS:
      return {
        loading: false,
        error: '',
        entities: payload
      };

    case LOAD_POSTS + FAIL:
      return {
        loading: false,
        error: payload.message,
        entities: []
      };

    default:
      return usersState;
  }
};
