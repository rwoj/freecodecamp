import {ADD_MY_BOOK, LOAD_MY_BOOKS, LOAD_ALL_BOOKS,
      EXCHANGE_REQUEST, DELETE_MY_BOOK, DELETE_MY_REQUEST} from '../actions/types'
import {createSelector} from "reselect"

export default function books(state = {}, action = {}) {
  switch (action.type) {
    case ADD_MY_BOOK:
    case EXCHANGE_REQUEST:
      return {...state, ...action.data.entities.books}
    case LOAD_ALL_BOOKS:
    case LOAD_MY_BOOKS:
      return {...action.data.entities.books}
    case DELETE_MY_BOOK:
      delete state[action.data.bookId]
      return {...state}
    case DELETE_MY_REQUEST:
      return {...state, [action.data._id]:action.data}
    // case DELETE_MY_REQUEST:
    //   if(state[action.data._id]){
    //     delete state[action.data._id]
    //   }
    //   return {...state}
    default:
      return state;
  }
}

export const booksSelector = state => state.books

export const allBooksSelector = createSelector(booksSelector, bookHash=>
  Object.values(bookHash)
)
