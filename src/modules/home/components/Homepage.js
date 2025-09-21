// HomePage.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboardData } from '../store/dashboardSlice';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');
  
  const dispatch = useDispatch();
  const { 
    profile, 
    currentPolicies, 
    availablePolicies, 
    portfolioValue, 
    loading, 
    error 
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
    
    // Simulate loading for progress bars
    const timer = setTimeout(() => {
      document.querySelectorAll('.progress-fill').forEach(el => {
        const width = el.getAttribute('data-width');
        if (width) {
          el.style.width = width;
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="bg-gray-50 font-sans min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border text-blue-600" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-3 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-gray-50 font-sans min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-md">
          <div className="text-red-600 text-2xl mb-3">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => dispatch(fetchDashboardData())}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 font-sans">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Banner */}
        <div className="gradient-bg text-white rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, {profile?.name || 'User'}!</h2>
              <p className="mb-4">Track your investments and grow your wealth with FinCrop</p>
              <button className="bg-white text-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition">
                Explore Investments
              </button>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-blue-800 bg-opacity-50 p-4 rounded-lg">
                <p className="text-sm mb-1">Total Portfolio Value</p>
                <p className="text-2xl font-bold">₹{portfolioValue?.total_current_value?.toLocaleString() || '0'}</p>
                <p className="text-sm text-green-300">
                  {portfolioValue?.total_return_percentage ? 
                    `+${portfolioValue.total_return_percentage}% return` : 
                    'No returns data'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Available Balance</p>
                <p className="text-2xl font-bold mt-1">₹25,000</p>
              </div>
              <div className="bg-blue-100 text-blue-800 p-2 rounded-lg">
                <i className="fas fa-wallet"></i>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
              Add Funds
            </button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Current Investments</p>
                <p className="text-2xl font-bold mt-1">₹{currentPolicies?.summary?.total_investment?.toLocaleString() || '0'}</p>
              </div>
              <div className="bg-green-100 text-green-800 p-2 rounded-lg">
                <i className="fas fa-chart-line"></i>
              </div>
            </div>
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition">
              View Portfolio
            </button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Annual Returns</p>
                <p className="text-2xl font-bold mt-1">{currentPolicies?.summary?.average_return || '0'}%</p>
              </div>
              <div className="bg-purple-100 text-purple-800 p-2 rounded-lg">
                <i className="fas fa-percentage"></i>
              </div>
            </div>
            <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition">
              Performance
            </button>
          </div>
        </div>

        {/* Investment Options - Using data from API */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Investment Options</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-200 rounded-lg text-sm">All</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">Daily</button>
              <button className="px-3 py-1 bg-gray-200 rounded-lg text-sm">Monthly</button>
              <button className="px-3 py-1 bg-gray-200 rounded-lg text-sm">Gold</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availablePolicies?.policies?.slice(0, 3).map((policy) => (
              <div key={policy.id} className="investment-card bg-white rounded-xl shadow-md overflow-hidden transition duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{policy.name}</h3>
                      <p className="text-gray-500 text-sm">{policy.description}</p>
                    </div>
                    <div className={`p-2 rounded-lg ${
                      policy.type === 'daily' ? 'bg-blue-100 text-blue-800' :
                      policy.type === 'monthly' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      <i className={
                        policy.type === 'daily' ? 'fas fa-calendar-day' :
                        policy.type === 'monthly' ? 'fas fa-calendar-alt' :
                        'fas fa-coins'
                      }></i>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Avg. Returns</span>
                      <span className="font-bold text-green-600">{policy.interest_rate}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        data-width={`${Math.min(100, policy.interest_rate * 5)}%`}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Risk Level</p>
                      <p className="font-bold text-yellow-600">
                        {policy.type === 'digital_gold' ? 'Low' : 'Medium'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Min. Investment</p>
                      <p className="font-bold">₹{policy.min_investment?.toLocaleString()}</p>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                    Invest Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Current Investments - Using data from API */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Your Current Investments</h2>
            <button className="text-blue-600 font-medium">View All</button>
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Returns</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentPolicies?.policies?.slice(0, 3).map((policy) => (
                    <tr key={policy.subscription_id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800">
                            <i className="fas fa-file-contract"></i>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{policy.policy_name}</div>
                            <div className="text-sm text-gray-500">{policy.policy_type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹{policy.investment_amount?.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Started: {policy.start_date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          +{policy.gain > 0 ? '₹' + policy.gain.toLocaleString() : '0'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {policy.days_remaining > 0 ? 'Active' : 'Matured'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Portfolio Breakdown */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Portfolio Breakdown</h2>
          
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-4">By Policy Type</h3>
                {portfolioValue?.by_type && Object.entries(portfolioValue.by_type).map(([type, data]) => (
                  <div key={type} className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">{type.replace('_', ' ')}</span>
                      <span>₹{data.current_value?.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{
                          width: `${(data.current_value / portfolioValue.total_current_value) * 100}%`,
                          backgroundColor: type === 'daily' ? '#3B82F6' : 
                                         type === 'monthly' ? '#10B981' : 
                                         '#8B5CF6'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4">Performance Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Investment</span>
                    <span className="font-bold">₹{portfolioValue?.total_investment?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Value</span>
                    <span className="font-bold">₹{portfolioValue?.total_current_value?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Gain/Loss</span>
                    <span className={`font-bold ${portfolioValue?.total_gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {portfolioValue?.total_gain >= 0 ? '+' : ''}₹{portfolioValue?.total_gain?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Return Percentage</span>
                    <span className={`font-bold ${portfolioValue?.total_return_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {portfolioValue?.total_return_percentage >= 0 ? '+' : ''}{portfolioValue?.total_return_percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>        
      </main>

      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%);
        }
        .investment-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
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
          width: 0%;
        }
        .nav-item.active {
          border-bottom: 3px solid #3b82f6;
          color: #3b82f6;
        }
        .spinner-border {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          vertical-align: text-bottom;
          border: 0.25em solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: spinner-border .75s linear infinite;
        }
        @keyframes spinner-border {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;