import {
  FETCH_PORTFOLIO_REQUEST,
  FETCH_PORTFOLIO_SUCCESS,
  FETCH_PORTFOLIO_FAILURE,
  FETCH_PERFORMANCE_REQUEST,
  FETCH_PERFORMANCE_SUCCESS,
  FETCH_PERFORMANCE_FAILURE,
  FETCH_UPCOMING_MATURITIES_REQUEST,
  FETCH_UPCOMING_MATURITIES_SUCCESS,
  FETCH_UPCOMING_MATURITIES_FAILURE,
  SYNC_PORTFOLIO_REQUEST,
  SYNC_PORTFOLIO_SUCCESS,
  SYNC_PORTFOLIO_FAILURE,
  CLEAR_PORTFOLIO_ERROR
} from './portfolioActions';

const initialState = {
  portfolio: null,
  performance: [],
  upcomingMaturities: [],
  loading: false,
  syncing: false,
  error: null,
  success: false
};

const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PORTFOLIO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      };

    case FETCH_PORTFOLIO_SUCCESS:
      return {
        ...state,
        loading: false,
        portfolio: action.payload,
        error: null
      };

    case FETCH_PORTFOLIO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        portfolio: null
      };

    case FETCH_PERFORMANCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PERFORMANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        performance: action.payload,
        error: null
      };

    case FETCH_PERFORMANCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        performance: []
      };

    case FETCH_UPCOMING_MATURITIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_UPCOMING_MATURITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        upcomingMaturities: action.payload,
        error: null
      };

    case FETCH_UPCOMING_MATURITIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        upcomingMaturities: []
      };

    case SYNC_PORTFOLIO_REQUEST:
      return {
        ...state,
        syncing: true,
        error: null,
        success: false
      };

    case SYNC_PORTFOLIO_SUCCESS:
      return {
        ...state,
        syncing: false,
        success: true,
        error: null
      };

    case SYNC_PORTFOLIO_FAILURE:
      return {
        ...state,
        syncing: false,
        error: action.payload,
        success: false
      };

    case CLEAR_PORTFOLIO_ERROR:
      return {
        ...state,
        error: null,
        success: false
      };

    default:
      return state;
  }
};

export default portfolioReducer;