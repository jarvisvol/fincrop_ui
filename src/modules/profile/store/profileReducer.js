import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  FETCH_DOCUMENTS_REQUEST,
  FETCH_DOCUMENTS_SUCCESS,
  FETCH_DOCUMENTS_FAILURE,
  UPLOAD_DOCUMENT_REQUEST,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAILURE,
  FETCH_KYC_STATUS_REQUEST,
  FETCH_KYC_STATUS_SUCCESS,
  FETCH_KYC_STATUS_FAILURE,
  CLEAR_PROFILE_ERROR
} from './profileActions';

const initialState = {
  profile: null,
  documents: [],
  kycStatus: null,
  loading: false,
  updating: false,
  uploading: false,
  error: null,
  success: false
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      };

    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: null
      };

    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        profile: null
      };

    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        updating: true,
        error: null,
        success: false
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updating: false,
        profile: action.payload,
        success: true,
        error: null
      };

    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.payload,
        success: false
      };

    case FETCH_DOCUMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_DOCUMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        documents: action.payload,
        error: null
      };

    case FETCH_DOCUMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        documents: []
      };

    case UPLOAD_DOCUMENT_REQUEST:
      return {
        ...state,
        uploading: true,
        error: null
      };

    case UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        uploading: false,
        error: null
      };

    case UPLOAD_DOCUMENT_FAILURE:
      return {
        ...state,
        uploading: false,
        error: action.payload
      };

    case FETCH_KYC_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_KYC_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        kycStatus: action.payload,
        error: null
      };

    case FETCH_KYC_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        kycStatus: null
      };

    case CLEAR_PROFILE_ERROR:
      return {
        ...state,
        error: null,
        success: false
      };

    default:
      return state;
  }
};

export default profileReducer;