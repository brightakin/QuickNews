import {
  GET_NEWS_FAIL,
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
} from '../../constants/newsConstants';

export const newsListReducer = (state = {newsData: []}, action: any) => {
  switch (action.type) {
    case GET_NEWS_REQUEST:
      return {...state, loading: true};

    case GET_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        newsData: action.payload.append
          ? [...state.newsData, ...action.payload.news] // Append new data
          : [...action.payload.news], // Replace with fresh data
      };

    case GET_NEWS_FAIL:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};
