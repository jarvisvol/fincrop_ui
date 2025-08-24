import authApi from '../../../Utils/Http/Http'

// Action Types
export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

export const FETCH_DOCUMENTS_REQUEST = 'FETCH_DOCUMENTS_REQUEST';
export const FETCH_DOCUMENTS_SUCCESS = 'FETCH_DOCUMENTS_SUCCESS';
export const FETCH_DOCUMENTS_FAILURE = 'FETCH_DOCUMENTS_FAILURE';

export const UPLOAD_DOCUMENT_REQUEST = 'UPLOAD_DOCUMENT_REQUEST';
export const UPLOAD_DOCUMENT_SUCCESS = 'UPLOAD_DOCUMENT_SUCCESS';
export const UPLOAD_DOCUMENT_FAILURE = 'UPLOAD_DOCUMENT_FAILURE';

export const FETCH_KYC_STATUS_REQUEST = 'FETCH_KYC_STATUS_REQUEST';
export const FETCH_KYC_STATUS_SUCCESS = 'FETCH_KYC_STATUS_SUCCESS';
export const FETCH_KYC_STATUS_FAILURE = 'FETCH_KYC_STATUS_FAILURE';

export const CLEAR_PROFILE_ERROR = 'CLEAR_PROFILE_ERROR';

// Action Creators
export const fetchProfile = () => async (dispatch) => {
  dispatch({ type: FETCH_PROFILE_REQUEST });
  
  try {
    const response = await authApi.get('/profile');
    
    if (response.data.success) {
      dispatch({
        type: FETCH_PROFILE_SUCCESS,
        payload: response.data.data
      });
    } else {
      dispatch({
        type: FETCH_PROFILE_FAILURE,
        payload: response.data.message
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_PROFILE_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch profile'
    });
  }
};

export const updateProfile = (profileData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  
  try {
    const response = await authApi.put('/profile', profileData);
    
    if (response.data.success) {
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: response.data.data
      });
      return { success: true, data: response.data.data };
    } else {
      dispatch({
        type: UPDATE_PROFILE_FAILURE,
        payload: response.data.message
      });
      return { success: false, error: response.data.message };
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update profile';
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: errorMessage
    });
    return { success: false, error: errorMessage };
  }
};

export const fetchDocuments = () => async (dispatch) => {
  dispatch({ type: FETCH_DOCUMENTS_REQUEST });
  
  try {
    const response = await authApi.get('/profile/documents');
    
    if (response.data.success) {
      dispatch({
        type: FETCH_DOCUMENTS_SUCCESS,
        payload: response.data.data
      });
    } else {
      dispatch({
        type: FETCH_DOCUMENTS_FAILURE,
        payload: response.data.message
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_DOCUMENTS_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch documents'
    });
  }
};

export const uploadDocument = (documentData) => async (dispatch) => {
  dispatch({ type: UPLOAD_DOCUMENT_REQUEST });
  
  try {
    const formData = new FormData();
    formData.append('document_type', documentData.document_type);
    formData.append('document', documentData.file);
    
    if (documentData.document_number) {
      formData.append('document_number', documentData.document_number);
    }

    const response = await authApi.post('/profile/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (response.data.success) {
      dispatch({
        type: UPLOAD_DOCUMENT_SUCCESS,
        payload: response.data.data
      });
      dispatch(fetchDocuments()); // Refresh documents list
      return { success: true, data: response.data.data };
    } else {
      dispatch({
        type: UPLOAD_DOCUMENT_FAILURE,
        payload: response.data.message
      });
      return { success: false, error: response.data.message };
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to upload document';
    dispatch({
      type: UPLOAD_DOCUMENT_FAILURE,
      payload: errorMessage
    });
    return { success: false, error: errorMessage };
  }
};

export const fetchKycStatus = () => async (dispatch) => {
  dispatch({ type: FETCH_KYC_STATUS_REQUEST });
  
  try {
    const response = await authApi.get('/profile/kyc-status');
    
    if (response.data.success) {
      dispatch({
        type: FETCH_KYC_STATUS_SUCCESS,
        payload: response.data.data
      });
    } else {
      dispatch({
        type: FETCH_KYC_STATUS_FAILURE,
        payload: response.data.message
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_KYC_STATUS_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch KYC status'
    });
  }
};

export const clearProfileError = () => ({
  type: CLEAR_PROFILE_ERROR
});