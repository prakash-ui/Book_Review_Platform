import { fetchBooks as fetchBooksAPI, fetchBook as fetchBookAPI } from '../../services/api';

export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const FETCH_BOOK_REQUEST = 'FETCH_BOOK_REQUEST';
export const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS';
export const FETCH_BOOK_FAILURE = 'FETCH_BOOK_FAILURE';

export const fetchBooks = () => async (dispatch) => {
  dispatch({ type: FETCH_BOOKS_REQUEST });
  try {
    const { data } = await fetchBooksAPI();
    dispatch({ type: FETCH_BOOKS_SUCCESS, payload: data.books });
  } catch (error) {
    dispatch({ type: FETCH_BOOKS_FAILURE, payload: error.message });
  }
};

export const fetchBook = (id) => async (dispatch) => {
  dispatch({ type: FETCH_BOOK_REQUEST });
  try {
    const { data } = await fetchBookAPI(id);
    dispatch({ type: FETCH_BOOK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_BOOK_FAILURE, payload: error.message });
  }
};
