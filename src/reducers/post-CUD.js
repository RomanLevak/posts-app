import {
  CREATE_POST, UPDATE_POST, DELETE_POST,
  START, SUCCESS, FAIL
} from '../constants';

const defaultItemState = {
  loading: false,
  error: '',
  succeed: false
};

const defaultState = {
  update: { ...defaultItemState },
  create: { ...defaultItemState },
  delete: { ...defaultItemState }
};

export default (CUDState = defaultState, { type, payload }) => {
  switch(type) {
    case CREATE_POST + START:
      return {
        ...CUDState,
        create: {
          loading: true,
          error: '',
          succeed: false
        }
      };

    case CREATE_POST + SUCCESS:
      return {
        ...CUDState,
        create: {
          loading: false,
          error: '',
          succeed: true
        }
      };

    case CREATE_POST + FAIL:
      return {
        ...CUDState,
        create: {
          loading: false,
          error: payload.message,
          succeed: false
        }
      };

    case UPDATE_POST + START:
      return {
        ...CUDState,
        update: {
          loading: true,
          error: '',
          succeed: false
        }
      };

    case UPDATE_POST + SUCCESS:
      return {
        ...CUDState,
        update: {
          loading: false,
          error: '',
          succeed: true
        }
      };

    case UPDATE_POST + FAIL:
      return {
        ...CUDState,
        update: {
          loading: false,
          error: payload.message,
          succeed: false
        }
      };

      case DELETE_POST + START:
        return {
          ...CUDState,
          delete: {
            loading: true,
            error: '',
            succeed: false
          }
        };

      case DELETE_POST + SUCCESS:
        return {
          ...CUDState,
          delete: {
            loading: false,
            error: '',
            succeed: true
          }
        };

      case DELETE_POST + FAIL:
        return {
          ...CUDState,
          delete: {
            loading: false,
            error: payload.message,
            succeed: false
          }
        };
    default:
      return CUDState;
  }
};
