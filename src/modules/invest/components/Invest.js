import React, { useState, useEffect } from 'react';

const Invest = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: 'Monthly SIP Plan',
      description: 'Equity Fund',
      amount: '₹5,000',
      frequency: 'Monthly',
      nextPayment: '15 Aug 2023',
      icon: 'fas fa-calendar-alt',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800'
    },
    {
      id: 2,
      name: 'Digital Gold',
      description: 'Gold Savings',
      amount: '₹2,000',
      frequency: 'Monthly',
      nextPayment: '20 Aug 2023',
      icon: 'fas fa-coins',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800'
    }
  ]);

  const investmentPlans = [
    {
      id: 1,
      type: 'monthly',
      title: 'Monthly SIP Plan',
      description: 'Systematic Investment Plan',
      returns: '12.5%',
      risk: 'Medium',
      riskColor: 'text-yellow-600',
      minInvestment: '₹500/month',
      progress: 75,
      icon: 'fas fa-calendar-alt',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 2,
      type: 'daily',
      title: 'Daily Investment Plan',
      description: 'Small daily investments',
      returns: '10.8%',
      risk: 'Low-Medium',
      riskColor: 'text-yellow-600',
      minInvestment: '₹100/day',
      progress: 65,
      icon: 'fas fa-calendar-day',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 3,
      type: 'gold',
      title: 'Digital Gold',
      description: 'Invest in 24K gold',
      returns: '8.5%',
      risk: 'Low',
      riskColor: 'text-green-600',
      minInvestment: '₹100',
      progress: 55,
      icon: 'fas fa-coins',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
    },
    {
      id: 4,
      type: 'currency',
      title: 'Forex Investments',
      description: 'USD, EUR, GBP and more',
      returns: '9.2%',
      risk: 'High',
      riskColor: 'text-red-600',
      minInvestment: '₹5,000',
      progress: 60,
      icon: 'fas fa-dollar-sign',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const filterButtons = [
    { id: 'all', label: 'All' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'daily', label: 'Daily' },
    { id: 'gold', label: 'Gold' },
    { id: 'currency', label: 'Currencies' }
  ];

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
  };

  const handleInvestClick = (planName) => {
    alert(`Investing in ${planName}`);
    // Here you would typically open a modal or navigate to an investment form
  };

  const handleUnsubscribe = (planName, id) => {
    if (window.confirm(`Are you sure you want to cancel your ${planName} subscription?`)) {
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    }
  };

  const filteredPlans = activeFilter === 'all' 
    ? investmentPlans 
    : investmentPlans.filter(plan => plan.type === activeFilter);

  // Animate progress bars on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.progress-fill').forEach(el => {
        const width = el.getAttribute('data-width');
        if (width) {
          el.style.width = width;
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Investment Types */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Investment Options</h2>
        <div className="flex space-x-2">
          {filterButtons.map(button => (
            <button
              key={button.id}
              className={`px-3 py-1 rounded-lg text-sm ${activeFilter === button.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => handleFilterClick(button.id)}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      {/* Investment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filteredPlans.map(plan => (
          <div key={plan.id} className="investment-card bg-white rounded-xl shadow-md overflow-hidden transition duration-300">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{plan.title}</h3>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>
                <div className={`${plan.bgColor} ${plan.textColor} p-2 rounded-lg`}>
                  <i className={plan.icon}></i>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Avg. Returns</span>
                  <span className="font-bold text-green-600">{plan.returns}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    data-width={`${plan.progress}%`}
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <div>
                  <p className="text-gray-500">Risk Level</p>
                  <p className={`font-bold ${plan.riskColor}`}>{plan.risk}</p>
                </div>
                <div>
                  <p className="text-gray-500">Min. Investment</p>
                  <p className="font-bold">{plan.minInvestment}</p>
                </div>
              </div>
              <button 
                className={`w-full ${plan.buttonColor} text-white py-2 rounded-lg font-medium transition invest-btn`}
                onClick={() => handleInvestClick(plan.title)}
              >
                Invest Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Current Subscriptions */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Your Current Subscriptions</h2>
        
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Payment</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriptions.map(subscription => (
                  <tr key={subscription.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 ${subscription.bgColor} rounded-full flex items-center justify-center ${subscription.textColor}`}>
                          <i className={subscription.icon}></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{subscription.name}</div>
                          <div className="text-sm text-gray-500">{subscription.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{subscription.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {subscription.frequency}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscription.nextPayment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleUnsubscribe(subscription.name, subscription.id)}
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
      </div>

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
        .investment-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Invest;