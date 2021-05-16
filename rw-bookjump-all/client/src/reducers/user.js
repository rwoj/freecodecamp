import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_SIGNED_UP, USER_PROFILE_UPD} from "../actions/types";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    case USER_LOGGED_OUT:
    case USER_SIGNED_UP:
      return {};
    case USER_PROFILE_UPD:
      return state;
    default:
      return state;
  }
}
