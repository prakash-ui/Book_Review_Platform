import {
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_FAILURE,
    FETCH_BOOK_REQUEST,
    FETCH_BOOK_SUCCESS,
    FETCH_BOOK_FAILURE,
  } from '../actions/bookActions';
  
  const initialState = {
    books: [],
    book: {},
    loading: false,
    error: null,
  };
  
  const bookReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BOOKS_REQUEST:
      case FETCH_BOOK_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_BOOKS_SUCCESS:
        return { ...state, books: action.payload, loading: false };
      case FETCH_BOOK_SUCCESS:
        return { ...state, book: action.payload, loading: false };
      case FETCH_BOOKS_FAILURE:
      case FETCH_BOOK_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default bookReducer;