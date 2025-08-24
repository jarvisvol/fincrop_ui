import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  fetchPolicies, 
  fetchSubscriptions, 
  subscribeToPolicy, 
  unsubscribeFromPolicy,
  calculateMaturity 
} from '../store/policyActions';

const Invest = ({
  policies,
  subscriptions,
  policiesLoading,
  subscriptionsLoading,
  subscribeLoading,
  fetchPolicies,
  fetchSubscriptions,
  subscribeToPolicy,
  unsubscribeFromPolicy,
  calculateMaturity
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [calculationResult, setCalculationResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filterButtons = [
    { id: 'all', label: 'All' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'daily', label: 'Daily' },
    { id: 'digital_gold', label: 'Gold' }
  ];

  useEffect(() => {
    fetchPolicies();
    fetchSubscriptions();
  }, [fetchPolicies, fetchSubscriptions]);

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    fetchPolicies({ type: filterType === 'all' ? '' : filterType });
  };

  const handleInvestClick = (policy) => {
    setSelectedPolicy(policy);
    setInvestmentAmount(policy.min_investment);
    setShowModal(true);
  };

  const handleCalculate = async () => {
    if (!selectedPolicy || !investmentAmount) return;
    
    const result = await calculateMaturity({
      policy_id: selectedPolicy.id,
      investment_amount: parseFloat(investmentAmount)
    });
    
    if (result.success) {
      setCalculationResult(result.data);
    } else {
      alert(result.error);
    }
  };

  const handleSubscribe = async () => {
    if (!selectedPolicy || !investmentAmount) return;
    
    const result = await subscribeToPolicy({
      policy_id: selectedPolicy.id,
      investment_amount: parseFloat(investmentAmount)
    });
    
    if (result.success) {
      setShowModal(false);
      setSelectedPolicy(null);
      setInvestmentAmount('');
      setCalculationResult(null);
      alert('Subscription successful!');
    } else {
      alert(result.error);
    }
  };

  const handleUnsubscribe = async (subscriptionId, policyName) => {
    if (window.confirm(`Are you sure you want to cancel your ${policyName} subscription?`)) {
      const result = await unsubscribeFromPolicy(subscriptionId);
      if (result.success) {
        alert('Subscription cancelled successfully!');
      } else {
        alert(result.error);
      }
    }
  };

  const getPolicyIcon = (type) => {
    switch (type) {
      case 'monthly': return 'fas fa-calendar-alt';
      case 'daily': return 'fas fa-calendar-day';
      case 'digital_gold': return 'fas fa-coins';
      default: return 'fas fa-chart-line';
    }
  };

  const getPolicyColor = (type) => {
    switch (type) {
      case 'monthly': return { bg: 'bg-blue-100', text: 'text-blue-800', button: 'bg-blue-600' };
      case 'daily': return { bg: 'bg-green-100', text: 'text-green-800', button: 'bg-green-600' };
      case 'digital_gold': return { bg: 'bg-yellow-100', text: 'text-yellow-800', button: 'bg-yellow-600' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', button: 'bg-gray-600' };
    }
  };

  const getRiskLevel = (type) => {
    switch (type) {
      case 'digital_gold': return { level: 'Low', color: 'text-green-600' };
      case 'monthly': return { level: 'Medium', color: 'text-yellow-600' };
      case 'daily': return { level: 'Medium-High', color: 'text-orange-600' };
      default: return { level: 'Medium', color: 'text-yellow-600' };
    }
  };

  if (policiesLoading || subscriptionsLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Investment Types */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Investment Options</h2>
        <div className="flex space-x-2">
          {filterButtons.map(button => (
            <button
              key={button.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeFilter === button.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleFilterClick(button.id)}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      {/* Investment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {policies.map(policy => {
          const colors = getPolicyColor(policy.type);
          const risk = getRiskLevel(policy.type);
          const progress = Math.min((policy.interest_rate / 15) * 100, 100); // Scale to 15% max

          return (
            <div key={policy.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{policy.name}</h3>
                  <p className="text-gray-500 text-sm">{policy.description}</p>
                </div>
                <div className={`${colors.bg} ${colors.text} p-3 rounded-lg`}>
                  <i className={getPolicyIcon(policy.type)}></i>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Interest Rate</span>
                  <span className="font-bold text-green-600">{policy.interest_rate}%</span>
                </div>
                <div className="progress-bar bg-gray-200 rounded-full h-2">
                  <div 
                    className="progress-fill bg-green-500 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between text-sm mb-4">
                <div>
                  <p className="text-gray-500">Risk Level</p>
                  <p className={`font-bold ${risk.color}`}>{risk.level}</p>
                </div>
                <div>
                  <p className="text-gray-500">Duration</p>
                  <p className="font-bold">{policy.duration} Year{policy.duration > 1 ? 's' : ''}</p>
                </div>
                <div>
                  <p className="text-gray-500">Min Investment</p>
                  <p className="font-bold">₹{policy.min_investment}</p>
                </div>
              </div>

              <button 
                className={`w-full ${colors.button} hover:${colors.button.replace('600', '700')} text-white py-2 rounded-lg font-medium transition-colors`}
                onClick={() => handleInvestClick(policy)}
              >
                Invest Now
              </button>
            </div>
          );
        })}
      </div>

      {/* Current Subscriptions */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Current Subscriptions</h2>
        
        {subscriptions.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <i className="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No active subscriptions found.</p>
            <p className="text-gray-400 text-sm">Start investing to see your subscriptions here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Maturity Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected Returns</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscriptions.map(subscription => (
                    <tr key={subscription.subscription_id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-10 w-10 ${getPolicyColor(subscription.policy.type).bg} rounded-full flex items-center justify-center ${getPolicyColor(subscription.policy.type).text}`}>
                            <i className={getPolicyIcon(subscription.policy.type)}></i>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{subscription.policy.name}</div>
                            <div className="text-sm text-gray-500">{subscription.policy.type.replace('_', ' ')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹{subscription.investment_amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {subscription.policy.duration} Year{subscription.policy.duration > 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(subscription.maturity_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                        +₹{(subscription.expected_maturity_amount - subscription.investment_amount).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleUnsubscribe(subscription.subscription_id, subscription.policy.name)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Investment Modal */}
      {showModal && selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Invest in {selectedPolicy.name}</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Amount (₹)
              </label>
              <input
                type="number"
                min={selectedPolicy.min_investment}
                max={selectedPolicy.max_investment}
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Min: ₹${selectedPolicy.min_investment}`}
              />
            </div>

            {calculationResult && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Calculation Results:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span>Investment:</span>
                  <span className="text-right">₹{calculationResult.investment_amount}</span>
                  <span>Duration:</span>
                  <span className="text-right">{calculationResult.policy.duration} Years</span>
                  <span>Interest Rate:</span>
                  <span className="text-right">{calculationResult.policy.interest_rate}%</span>
                  <span className="font-medium">Maturity Amount:</span>
                  <span className="text-right font-medium text-green-600">₹{calculationResult.maturity_amount}</span>
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={handleCalculate}
                disabled={!investmentAmount}
                className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                Calculate
              </button>
              <button
                onClick={handleSubscribe}
                disabled={subscribeLoading || !calculationResult}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {subscribeLoading ? 'Processing...' : 'Start Invest'}
              </button>
              <button
                onClick={() => {setShowModal(false); setCalculationResult(null);}}
                className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .progress-bar {
          height: 8px;
          border-radius: 4px;
          background-color: #e5e7eb;
        }
        .progress-fill {
          height: 100%;
          border-radius: 4px;
          background-color: #10b981;
          transition: width 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state) => ({
  policies: state.policy.policies,
  subscriptions: state.policy.subscriptions,
  policiesLoading: state.policy.policiesLoading,
  subscriptionsLoading: state.policy.subscriptionsLoading,
  subscribeLoading: state.policy.subscribeLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPolicies: bindActionCreators(fetchPolicies, dispatch),
  fetchSubscriptions: bindActionCreators(fetchSubscriptions, dispatch),
  subscribeToPolicy: bindActionCreators(subscribeToPolicy, dispatch),
  unsubscribeFromPolicy: bindActionCreators(unsubscribeFromPolicy, dispatch),
  calculateMaturity: bindActionCreators(calculateMaturity, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Invest);