// Policy Actions
const API_URL = 'http://localhost:8000'

export const fetchPolicies = (filters = {}) => async (dispatch) => {
  dispatch({ type: 'FETCH_POLICIES_REQUEST' });
  
  try {
    const token = localStorage.getItem('token');
    const queryParams = new URLSearchParams(filters).toString();
    
    const response = await fetch(`${API_URL}/api/policies?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: 'FETCH_POLICIES_SUCCESS', payload: data.data });
    } else {
      dispatch({ type: 'FETCH_POLICIES_FAILURE', payload: data.message });
    }
  } catch (error) {
    dispatch({ type: 'FETCH_POLICIES_FAILURE', payload: 'Network error. Please try again.' });
  }
};

export const fetchSubscriptions = () => async (dispatch) => {
  dispatch({ type: 'FETCH_SUBSCRIPTIONS_REQUEST' });
  
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/api/policies/subscriptions`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: 'FETCH_SUBSCRIPTIONS_SUCCESS', payload: data.data });
    } else {
      dispatch({ type: 'FETCH_SUBSCRIPTIONS_FAILURE', payload: data.message });
    }
  } catch (error) {
    dispatch({ type: 'FETCH_SUBSCRIPTIONS_FAILURE', payload: 'Network error. Please try again.' });
  }
};

export const subscribeToPolicy = (policyData) => async (dispatch) => {
  dispatch({ type: 'SUBSCRIBE_REQUEST' });
  
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/api/policies/subscribe`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(policyData),
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: 'SUBSCRIBE_SUCCESS', payload: data.data });
      dispatch(fetchSubscriptions()); // Refresh subscriptions
      return { success: true, data: data.data };
    } else {
      dispatch({ type: 'SUBSCRIBE_FAILURE', payload: data.message });
      return { success: false, error: data.message };
    }
  } catch (error) {
    dispatch({ type: 'SUBSCRIBE_FAILURE', payload: 'Network error. Please try again.' });
    return { success: false, error: 'Network error. Please try again.' };
  }
};

export const unsubscribeFromPolicy = (subscriptionId) => async (dispatch) => {
  dispatch({ type: 'UNSUBSCRIBE_REQUEST' });
  
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/api/policies/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: 'UNSUBSCRIBE_SUCCESS', payload: subscriptionId });
      dispatch(fetchSubscriptions()); // Refresh subscriptions
      return { success: true };
    } else {
      dispatch({ type: 'UNSUBSCRIBE_FAILURE', payload: data.message });
      return { success: false, error: data.message };
    }
  } catch (error) {
    dispatch({ type: 'UNSUBSCRIBE_FAILURE', payload: 'Network error. Please try again.' });
    return { success: false, error: 'Network error. Please try again.' };
  }
};

export const calculateMaturity = (calculationData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/api/policies/calculate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(calculationData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data: data.data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: 'Network error. Please try again.' };
  }
};