const initialState = {
  // ... existing auth state
  policies: [],
  subscriptions: [],
  policiesLoading: false,
  subscriptionsLoading: false,
  subscribeLoading: false,
  policiesError: null,
  subscriptionsError: null,
  subscribeError: null,
};

const policyReducer = (state = initialState, action) => {
  switch (action.type) {
    // Policies
    case 'FETCH_POLICIES_REQUEST':
      return { ...state, policiesLoading: true, policiesError: null };
    case 'FETCH_POLICIES_SUCCESS':
      return { ...state, policiesLoading: false, policies: action.payload };
    case 'FETCH_POLICIES_FAILURE':
      return { ...state, policiesLoading: false, policiesError: action.payload };
    
    // Subscriptions
    case 'FETCH_SUBSCRIPTIONS_REQUEST':
      return { ...state, subscriptionsLoading: true, subscriptionsError: null };
    case 'FETCH_SUBSCRIPTIONS_SUCCESS':
      return { ...state, subscriptionsLoading: false, subscriptions: action.payload };
    case 'FETCH_SUBSCRIPTIONS_FAILURE':
      return { ...state, subscriptionsLoading: false, subscriptionsError: action.payload };
    
    // Subscribe
    case 'SUBSCRIBE_REQUEST':
      return { ...state, subscribeLoading: true, subscribeError: null };
    case 'SUBSCRIBE_SUCCESS':
      return { ...state, subscribeLoading: false };
    case 'SUBSCRIBE_FAILURE':
      return { ...state, subscribeLoading: false, subscribeError: action.payload };
    
    // Unsubscribe
    case 'UNSUBSCRIBE_REQUEST':
      return { ...state, unsubscribeLoading: true, unsubscribeError: null };
    case 'UNSUBSCRIBE_SUCCESS':
      return { ...state, unsubscribeLoading: false };
    case 'UNSUBSCRIBE_FAILURE':
      return { ...state, unsubscribeLoading: false, unsubscribeError: action.payload };
    
    default:
      return state;
  }
};

export default policyReducer;