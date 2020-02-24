import {
  LOAD_USERS,
  START, SUCCESS, FAIL
} from '../constants';

const defaultState = {
  loading: false,
  error: '',
  entities: []
};

export default (usersState = defaultState, { type, payload }) => {
  switch(type) {
    case LOAD_USERS + START:
      return {
        loading: true,
        error: '',
        entities: []
      };

    case LOAD_USERS + SUCCESS:
      return {
        loading: false,
        error: '',
        entities: payload
      };

    case LOAD_USERS + FAIL:
      return {
        loading: false,
        error: payload.message,
        entities: []
      };

    default:
      return usersState;
  }
};
