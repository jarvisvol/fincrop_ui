import authApi from '../../../Utils/Http/Http'

// Action Types
export const FETCH_PORTFOLIO_REQUEST = 'FETCH_PORTFOLIO_REQUEST';
export const FETCH_PORTFOLIO_SUCCESS = 'FETCH_PORTFOLIO_SUCCESS';
export const FETCH_PORTFOLIO_FAILURE = 'FETCH_PORTFOLIO_FAILURE';

export const FETCH_PERFORMANCE_REQUEST = 'FETCH_PERFORMANCE_REQUEST';
export const FETCH_PERFORMANCE_SUCCESS = 'FETCH_PERFORMANCE_SUCCESS';
export const FETCH_PERFORMANCE_FAILURE = 'FETCH_PERFORMANCE_FAILURE';

export const FETCH_UPCOMING_MATURITIES_REQUEST = 'FETCH_UPCOMING_MATURITIES_REQUEST';
export const FETCH_UPCOMING_MATURITIES_SUCCESS = 'FETCH_UPCOMING_MATURITIES_SUCCESS';
export const FETCH_UPCOMING_MATURITIES_FAILURE = 'FETCH_UPCOMING_MATURITIES_FAILURE';

export const SYNC_PORTFOLIO_REQUEST = 'SYNC_PORTFOLIO_REQUEST';
export const SYNC_PORTFOLIO_SUCCESS = 'SYNC_PORTFOLIO_SUCCESS';
export const SYNC_PORTFOLIO_FAILURE = 'SYNC_PORTFOLIO_FAILURE';

export const CLEAR_PORTFOLIO_ERROR = 'CLEAR_PORTFOLIO_ERROR';

// Action Creators
export const fetchPortfolio = () => async (dispatch) => {
  dispatch({ type: FETCH_PORTFOLIO_REQUEST });
  
  try {
    const response = await authApi.get('/portfolio');
    
    if (response.data.success) {
      dispatch({
        type: FETCH_PORTFOLIO_SUCCESS,
        payload: response.data.data
      });
    } else {
      dispatch({
        type: FETCH_PORTFOLIO_FAILURE,
        payload: response.data.message
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_PORTFOLIO_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch portfolio'
    });
  }
};

export const fetchPerformance = (months = 12) => async (dispatch) => {
  dispatch({ type: FETCH_PERFORMANCE_REQUEST });
  
  try {
    const response = await authApi.get(`/portfolio/performance?months=${months}`);
    
    if (response.data.success) {
      dispatch({
        type: FETCH_PERFORMANCE_SUCCESS,
        payload: response.data.data
      });
    } else {
      dispatch({
        type: FETCH_PERFORMANCE_FAILURE,
        payload: response.data.message
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_PERFORMANCE_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch performance data'
    });
  }
};

export const fetchUpcomingMaturities = (limit = 5) => async (dispatch) => {
  dispatch({ type: FETCH_UPCOMING_MATURITIES_REQUEST });
  
  try {
    const response = await authApi.get(`/portfolio/upcoming-maturities?limit=${limit}`);
    
    if (response.data.success) {
      dispatch({
        type: FETCH_UPCOMING_MATURITIES_SUCCESS,
        payload: response.data.data
      });
    } else {
      dispatch({
        type: FETCH_UPCOMING_MATURITIES_FAILURE,
        payload: response.data.message
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_UPCOMING_MATURITIES_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch upcoming maturities'
    });
  }
};

export const syncPortfolio = () => async (dispatch) => {
  dispatch({ type: SYNC_PORTFOLIO_REQUEST });
  
  try {
    const response = await authApi.post('/portfolio/sync');
    
    if (response.data.success) {
      dispatch({
        type: SYNC_PORTFOLIO_SUCCESS,
        payload: response.data.message
      });
      // Refresh portfolio data after sync
      dispatch(fetchPortfolio());
    } else {
      dispatch({
        type: SYNC_PORTFOLIO_FAILURE,
        payload: response.data.message
      });
    }
  } catch (error) {
    dispatch({
      type: SYNC_PORTFOLIO_FAILURE,
      payload: error.response?.data?.message || 'Failed to sync portfolio'
    });
  }
};

export const clearPortfolioError = () => ({
  type: CLEAR_PORTFOLIO_ERROR
});