import {
  LOAD_COMMENTS,
  START, SUCCESS, FAIL
} from '../constants';

const defaultState = {
  loading: false,
  error: '',
  entities: []
};

export default (commentsState = defaultState, { type, payload }) => {
  switch(type) {
    case LOAD_COMMENTS + START:
      return {
        loading: true,
        error: '',
        entities: []
      };

    case LOAD_COMMENTS + SUCCESS:
      return {
        loading: false,
        error: '',
        entities: payload
      };

    case LOAD_COMMENTS + FAIL:
      return {
        loading: false,
        error: payload.message,
        entities: []
      };

    default:
      return commentsState;
  }
};
