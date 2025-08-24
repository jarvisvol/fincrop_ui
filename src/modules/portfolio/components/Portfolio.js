import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchPortfolio,
  fetchPerformance,
  fetchUpcomingMaturities,
  syncPortfolio,
  clearPortfolioError
} from '../store/portfolioActions';

const Portfolio = ({
  portfolio,
  performance,
  upcomingMaturities,
  loading,
  syncing,
  error,
  success,
  fetchPortfolio,
  fetchPerformance,
  fetchUpcomingMaturities,
  syncPortfolio,
  clearPortfolioError
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(12);

  useEffect(() => {
    fetchPortfolio();
    fetchPerformance(selectedPeriod);
    fetchUpcomingMaturities(5);
  }, [fetchPortfolio, fetchPerformance, fetchUpcomingMaturities, selectedPeriod]);

  const handleSyncPortfolio = async () => {
    await syncPortfolio();
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    fetchPerformance(period);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getPolicyIcon = (policyType) => {
    switch (policyType) {
      case 'monthly': return 'fas fa-calendar-alt text-blue-600';
      case 'daily': return 'fas fa-calendar-day text-green-600';
      case 'digital_gold': return 'fas fa-coins text-yellow-600';
      default: return 'fas fa-chart-line text-gray-600';
    }
  };

  const getPolicyIconBg = (policyType) => {
    switch (policyType) {
      case 'monthly': return 'bg-blue-100';
      case 'daily': return 'bg-green-100';
      case 'digital_gold': return 'bg-yellow-100';
      default: return 'bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'matured': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && !portfolio) {
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
      {/* Header with Sync Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Investment Portfolio</h1>
        <button
          onClick={handleSyncPortfolio}
          disabled={syncing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {syncing ? (
            <>
              <i className="fas fa-sync-alt animate-spin mr-2"></i>
              Syncing...
            </>
          ) : (
            <>
              <i className="fas fa-sync-alt mr-2"></i>
              Sync Portfolio
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <i className="fas fa-exclamation-circle text-red-600 mr-2"></i>
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <i className="fas fa-check-circle text-green-600 mr-2"></i>
            <p className="text-green-800">Portfolio synced successfully!</p>
          </div>
        </div>
      )}

      {/* Portfolio Overview */}
      {portfolio?.summary && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Portfolio Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Total Portfolio Value</p>
              <p className="text-2xl font-bold text-blue-800">
                {formatCurrency(portfolio.summary.total_current_value)}
              </p>
              <p className="text-sm text-green-600">
                {portfolio.summary.overall_return > 0 ? '+' : ''}
                {portfolio.summary.overall_return}% overall
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Total Invested</p>
              <p className="text-2xl font-bold text-green-800">
                {formatCurrency(portfolio.summary.total_investment)}
              </p>
              <p className="text-sm text-gray-600">
                Across {portfolio.summary.active_policies + portfolio.summary.matured_policies} investments
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Total Returns</p>
              <p className="text-2xl font-bold text-purple-800">
                {formatCurrency(portfolio.summary.total_gain)}
              </p>
              <p className="text-sm text-green-600">
                {portfolio.summary.total_investment > 0 ?
                  `+${((portfolio.summary.total_gain / portfolio.summary.total_investment) * 100).toFixed(1)}% gains` :
                  '0% gains'
                }
              </p>
            </div>
          </div>

          {/* Allocation Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Investment Allocation</h3>
              <div className="space-y-3">
                {portfolio.breakdown?.by_type && Object.entries(portfolio.breakdown.by_type).map(([type, data]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 capitalize">{type}</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(data.investment)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Performance Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xl font-bold text-green-600">
                    {portfolio.summary.overall_return > 0 ? '+' : ''}
                    {portfolio.summary.overall_return}%
                  </p>
                  <p className="text-sm text-gray-600">Overall Return</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xl font-bold text-blue-600">
                    {portfolio.summary.active_policies}
                  </p>
                  <p className="text-sm text-gray-600">Active Policies</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xl font-bold text-purple-600">
                    {formatCurrency(portfolio.summary.total_interest_earned)}
                  </p>
                  <p className="text-sm text-gray-600">Interest Earned</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xl font-bold text-yellow-600">
                    {portfolio.summary.matured_policies}
                  </p>
                  <p className="text-sm text-gray-600">Matured Policies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Investments Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Your Policy Investments</h3>
          <span className="text-sm text-gray-500">
            {portfolio?.policies?.length || 0} active investments
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invested</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Returns</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Maturity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {portfolio?.policies?.map((policy) => {
                const returnPercentage = policy.investment_amount > 0 ?
                  ((policy.total_gain / policy.investment_amount) * 100) : 0;
                
                return (
                  <tr key={policy.policy_subscription_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 ${getPolicyIconBg(policy.policy_type)} rounded-full flex items-center justify-center`}>
                          <i className={getPolicyIcon(policy.policy_type)}></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{policy.policy_name}</div>
                          <div className="text-sm text-gray-500 capitalize">{policy.policy_type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(policy.investment_amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(policy.current_value)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        policy.total_gain >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {policy.total_gain >= 0 ? '+' : ''}{formatCurrency(policy.total_gain)}
                        <br />
                        <span className="text-xs">
                          ({returnPercentage >= 0 ? '+' : ''}{returnPercentage.toFixed(1)}%)
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{policy.maturity_date}</div>
                      <div className="text-xs text-gray-500">
                        {policy.days_remaining > 0 ? `${policy.days_remaining} days left` : 'Matured'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {(!portfolio?.policies || portfolio.policies.length === 0) && (
          <div className="text-center py-12">
            <i className="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No investment policies found.</p>
            <p className="text-gray-400 text-sm">Start investing to see your portfolio here.</p>
          </div>
        )}
      </div>

      {/* Upcoming Maturities */}
      {upcomingMaturities.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Maturities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingMaturities.slice(0, 3).map((maturity, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-900">{maturity.policy_name}</h4>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {maturity.days_remaining} days
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Matures on:</span>
                    <span className="font-medium">{maturity.maturity_date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Investment:</span>
                    <span className="font-medium">{formatCurrency(maturity.investment_amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Expected value:</span>
                    <span className="font-medium text-green-600">{formatCurrency(maturity.expected_value)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Chart Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Portfolio Performance</h3>
          <div className="flex space-x-2">
            {[3, 6, 12].map((period) => (
              <button
                key={period}
                onClick={() => handlePeriodChange(period)}
                className={`px-3 py-1 text-sm rounded-lg ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {period}M
              </button>
            ))}
          </div>
        </div>

        {performance.length > 0 ? (
          <>
            <div className="bg-gray-50 p-4 rounded-lg h-64 mb-4">
              {/* Chart would be implemented here with a charting library */}
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <i className="fas fa-chart-line text-3xl text-gray-300 mb-2"></i>
                  <p className="text-gray-500">Performance chart visualization</p>
                  <p className="text-sm text-gray-400">
                    {performance.length} months of data loaded
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-green-600">
                  {performance[performance.length - 1]?.gain >= 0 ? '+' : ''}
                  {formatCurrency(performance[performance.length - 1]?.gain || 0)}
                </p>
                <p className="text-sm text-gray-600">Current Gain</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-blue-600">
                  {formatCurrency(performance[performance.length - 1]?.value || 0)}
                </p>
                <p className="text-sm text-gray-600">Current Value</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-purple-600">
                  {performance.length} months
                </p>
                <p className="text-sm text-gray-600">Tracked</p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <i className="fas fa-chart-line text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No performance data available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  portfolio: state.portfolio.portfolio,
  performance: state.portfolio.performance,
  upcomingMaturities: state.portfolio.upcomingMaturities,
  loading: state.portfolio.loading,
  syncing: state.portfolio.syncing,
  error: state.portfolio.error,
  success: state.portfolio.success
});

const mapDispatchToProps = (dispatch) => ({
  fetchPortfolio: bindActionCreators(fetchPortfolio, dispatch),
  fetchPerformance: bindActionCreators(fetchPerformance, dispatch),
  fetchUpcomingMaturities: bindActionCreators(fetchUpcomingMaturities, dispatch),
  syncPortfolio: bindActionCreators(syncPortfolio, dispatch),
  clearPortfolioError: bindActionCreators(clearPortfolioError, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);