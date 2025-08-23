import React, { useEffect } from 'react';

const Portfolio = () => {
  // Portfolio data
  const portfolioOverview = [
    {
      title: 'Total Portfolio Value',
      value: '₹1,87,542',
      change: '+12.5% overall',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      changeColor: 'text-green-600'
    },
    {
      title: 'Total Invested',
      value: '₹1,62,542',
      change: 'Across 6 investments',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      changeColor: 'text-gray-600'
    },
    {
      title: 'Current Returns',
      value: '₹25,000',
      change: '+15.4% gains',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-800',
      changeColor: 'text-green-600'
    }
  ];

  const portfolioAllocation = [
    { name: 'Stocks', percentage: 45, color: 'bg-blue-600' },
    { name: 'Mutual Funds', percentage: 32, color: 'bg-green-600' },
    { name: 'Fixed Deposits', percentage: 15, color: 'bg-purple-600' },
    { name: 'Gold', percentage: 8, color: 'bg-yellow-600' }
  ];

  const investments = [
    {
      id: 1,
      name: 'Reliance Industries',
      type: 'Equity',
      amount: '₹45,000',
      returns: '+18.2%',
      duration: '8 months',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      icon: 'fas fa-chart-bar',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-800'
    },
    {
      id: 2,
      name: 'Axis Bluechip Fund',
      type: 'Mutual Fund',
      amount: '₹72,500',
      returns: '+12.7%',
      duration: '1 year',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      icon: 'fas fa-money-bill-wave',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-800'
    },
    {
      id: 3,
      name: 'SBI Tax Saver FD',
      type: 'Fixed Deposit',
      amount: '₹50,000',
      returns: '+7.5%',
      duration: '2 years left',
      status: 'Locked',
      statusColor: 'bg-blue-100 text-blue-800',
      icon: 'fas fa-lock',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-800'
    },
    {
      id: 4,
      name: 'Digital Gold',
      type: 'Gold Savings',
      amount: '₹20,042',
      returns: '+8.3%',
      duration: '6 months',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      icon: 'fas fa-coins',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-800'
    }
  ];

  const performanceStats = [
    { value: '+12.5%', label: '1 Year Return' },
    { value: '+28.7%', label: 'Overall Return' },
    { value: '₹25,000', label: 'Total Gains' }
  ];

  // Animate progress bars on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.allocation-progress').forEach(el => {
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
      {/* Portfolio Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Portfolio Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {portfolioOverview.map((item, index) => (
            <div key={index} className={`${item.bgColor} p-4 rounded-lg`}>
              <p className="text-sm text-gray-600 mb-1">{item.title}</p>
              <p className={`text-2xl font-bold ${item.textColor}`}>{item.value}</p>
              <p className={`text-sm ${item.changeColor}`}>{item.change}</p>
            </div>
          ))}
        </div>
        
        {/* Portfolio Allocation Chart */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Portfolio Allocation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioAllocation.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm text-gray-600">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`allocation-progress ${item.color} h-2 rounded-full`}
                    data-width={`${item.percentage}%`}
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Investments Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Your Investments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Returns</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {investments.map((investment) => (
                <tr key={investment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 ${investment.iconBg} rounded-full flex items-center justify-center ${investment.iconColor}`}>
                        <i className={investment.icon}></i>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{investment.name}</div>
                        <div className="text-sm text-gray-500">{investment.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{investment.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {investment.returns}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {investment.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${investment.statusColor}`}>
                      {investment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl shadow overflow-hidden p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Portfolio Performance</h3>
        <div className="bg-gray-50 p-4 rounded-lg h-64 flex items-center justify-center">
          <p className="text-gray-500">Portfolio growth chart will be displayed here</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {performanceStats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold text-green-600">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;