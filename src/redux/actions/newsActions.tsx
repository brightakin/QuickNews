import {
  GET_NEWS_FAIL,
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
} from '../../constants/newsConstants';

export const getNews =
  (startIndex = 0, batchSize = 20, append = false) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: GET_NEWS_REQUEST,
      });

      const url = 'https://hacker-news.firebaseio.com/v0/newstories.json';
      const response = await fetch(url);
      const json = await response.json();

      // Fetch only a portion of the news stories based on startIndex and batchSize
      const idsToFetch = json.slice(startIndex, startIndex + batchSize);
      const promises = idsToFetch.map((id: any) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
          response => response.json(),
        ),
      );
      const result = await Promise.all(promises);

      dispatch({
        type: GET_NEWS_SUCCESS,
        payload: {news: result, append},
      });
    } catch (error: any) {
      dispatch({
        type: GET_NEWS_FAIL,
        payload: error.message ? error.message : 'An error occurred',
      });
    }
  };
