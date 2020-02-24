import {
  LOAD_POST,
  START, SUCCESS, FAIL
} from '../constants';

const defaultState = {
  loading: false,
  error: '',
  entity: {}
};

export default (postState = defaultState, { type, payload }) => {
  switch(type) {
    case LOAD_POST + START:
      return {
        loading: true,
        error: '',
        entity: {}
      };

    case LOAD_POST + SUCCESS:
      return {
        loading: false,
        error: '',
        entity: payload
      };

    case LOAD_POST + FAIL:
      return {
        loading: false,
        error: payload.message,
        entity: {}
      };

    default:
      return postState;
  }
};
