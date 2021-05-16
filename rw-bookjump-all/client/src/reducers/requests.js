import {LOAD_MY_REQUESTS, DELETE_MY_REQUEST, ACCEPT_REQUEST, DELETE_MY_BOOK,
  EXCHANGE_REQUEST} from '../actions/types'

export default function requests(state = {}, action = {}) {
  switch (action.type) {
    case DELETE_MY_REQUEST:
      delete state[action.data._id]
      return {...state}
    case ACCEPT_REQUEST:
      return {...state}
      // return {...state, [action.data._id]: action.data}
    case EXCHANGE_REQUEST:
      return {...state, ...action.data.entities.books}
    case LOAD_MY_REQUESTS:
      return {...action.data.entities.requests}
    case DELETE_MY_BOOK:
      if(state[action.data.bookId]){ delete state[action.data.bookId]}
      return {...state}
    default:
      return state;
  }
}
