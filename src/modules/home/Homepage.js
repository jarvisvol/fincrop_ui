import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');

  useEffect(() => {
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
  }, []);

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
  };

  return (
    <div className="bg-gray-50 font-sans">
      {/* Header/Navigation */}
      <header className="gradient-bg text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <i className="fas fa-piggy-bank text-2xl"></i>
              <h1 className="text-2xl font-bold">FinCrop</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              {['Dashboard', 'Invest', 'Portfolio', 'Learn', 'Profile'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`py-2 font-medium ${activeNav === item ? 'nav-item active' : 'nav-item'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <button 
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
              <div className="hidden md:flex items-center space-x-2 bg-blue-800 px-3 py-1 rounded-full">
                <i className="fas fa-rupee-sign"></i>
                <span>₹25,000</span>
              </div>
              <div className="hidden md:block w-8 h-8 rounded-full bg-white text-blue-800 flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-blue-900 text-white py-2 px-4 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        {['Dashboard', 'Invest', 'Portfolio', 'Learn', 'Profile'].map((item) => (
          <a
            key={item}
            href="#"
            className="block py-2 border-b border-blue-800"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item);
              setMobileMenuOpen(false);
            }}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Banner */}
        <div className="gradient-bg text-white rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, Ankit!</h2>
              <p className="mb-4">Track your investments and grow your wealth with FinCrop</p>
              <button className="bg-white text-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition">
                Explore Investments
              </button>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-blue-800 bg-opacity-50 p-4 rounded-lg">
                <p className="text-sm mb-1">Total Portfolio Value</p>
                <p className="text-2xl font-bold">₹1,87,542</p>
                <p className="text-sm text-green-300">+12.5% this year</p>
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
                <p className="text-2xl font-bold mt-1">₹1,62,542</p>
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
                <p className="text-2xl font-bold mt-1">12.5%</p>
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

        {/* Investment Options */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Investment Options</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-200 rounded-lg text-sm">All</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">Stocks</button>
              <button className="px-3 py-1 bg-gray-200 rounded-lg text-sm">MF</button>
              <button className="px-3 py-1 bg-gray-200 rounded-lg text-sm">FD</button>
              <button className="px-3 py-1 bg-gray-200 rounded-lg text-sm">Gold</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stock Investment Card */}
            <div className="investment-card bg-white rounded-xl shadow-md overflow-hidden transition duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Indian Bluechip Stocks</h3>
                    <p className="text-gray-500 text-sm">Top performing Indian companies</p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 p-2 rounded-lg">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Avg. Returns</span>
                    <span className="font-bold text-green-600">14.2%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" data-width="85%"></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Risk Level</p>
                    <p className="font-bold text-yellow-600">Medium</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Min. Investment</p>
                    <p className="font-bold">₹5,000</p>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                  Invest Now
                </button>
              </div>
            </div>

            {/* Mutual Fund Card */}
            <div className="investment-card bg-white rounded-xl shadow-md overflow-hidden transition duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Equity Mutual Funds</h3>
                    <p className="text-gray-500 text-sm">Diversified equity portfolio</p>
                  </div>
                  <div className="bg-green-100 text-green-800 p-2 rounded-lg">
                    <i className="fas fa-money-bill-wave"></i>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Avg. Returns</span>
                    <span className="font-bold text-green-600">12.8%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" data-width="75%"></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Risk Level</p>
                    <p className="font-bold text-yellow-600">Medium</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Min. Investment</p>
                    <p className="font-bold">₹500</p>
                  </div>
                </div>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
                  Invest Now
                </button>
              </div>
            </div>

            {/* Fixed Deposit Card */}
            <div className="investment-card bg-white rounded-xl shadow-md overflow-hidden transition duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Tax-Saving FDs</h3>
                    <p className="text-gray-500 text-sm">5-year fixed deposits with tax benefits</p>
                  </div>
                  <div className="bg-purple-100 text-purple-800 p-2 rounded-lg">
                    <i className="fas fa-lock"></i>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Avg. Returns</span>
                    <span className="font-bold text-green-600">7.5%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" data-width="50%"></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Risk Level</p>
                    <p className="font-bold text-green-600">Low</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Min. Investment</p>
                    <p className="font-bold">₹10,000</p>
                  </div>
                </div>
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition">
                  Invest Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Current Investments */}
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Returns</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800">
                          <i className="fas fa-chart-bar"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Reliance Industries</div>
                          <div className="text-sm text-gray-500">Equity</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹45,000</div>
                      <div className="text-sm text-gray-500">Invested: 12/2022</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        +18.2%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Active
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-800">
                          <i className="fas fa-money-bill-wave"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Axis Bluechip Fund</div>
                          <div className="text-sm text-gray-500">Mutual Fund</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹72,500</div>
                      <div className="text-sm text-gray-500">SIP: ₹5,000/mo</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        +12.7%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Active
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-800">
                          <i className="fas fa-lock"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">SBI Tax Saver FD</div>
                          <div className="text-sm text-gray-500">Fixed Deposit</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹50,000</div>
                      <div className="text-sm text-gray-500">Matures: 12/2025</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        +7.5%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Locked
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Investment Goals */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Your Investment Goals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">Retirement Fund</h3>
                  <p className="text-gray-500 text-sm">Target: ₹50,00,000 by 2045</p>
                </div>
                <div className="bg-yellow-100 text-yellow-800 p-2 rounded-lg">
                  <i className="fas fa-umbrella-beach"></i>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Saved: ₹3,25,000</span>
                  <span>65% of target</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-500 h-2.5 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-500">Monthly SIP</p>
                  <p className="font-bold">₹15,000</p>
                </div>
                <div>
                  <p className="text-gray-500">Returns</p>
                  <p className="font-bold text-green-600">11.2%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">Child Education</h3>
                  <p className="text-gray-500 text-sm">Target: ₹25,00,000 by 2035</p>
                </div>
                <div className="bg-blue-100 text-blue-800 p-2 rounded-lg">
                  <i className="fas fa-graduation-cap"></i>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Saved: ₹5,80,000</span>
                  <span>23% of target</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{width: '23%'}}></div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-500">Monthly SIP</p>
                  <p className="font-bold">₹20,000</p>
                </div>
                <div>
                  <p className="text-gray-500">Returns</p>
                  <p className="font-bold text-green-600">13.5%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Trends */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Indian Market Trends</h2>
          
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">Nifty 50</h3>
                  <p className="text-gray-500 text-sm">National Stock Exchange</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">18,742.35</p>
                  <p className="text-sm text-green-600">+125.50 (0.67%)</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">Sensex</h3>
                  <p className="text-gray-500 text-sm">Bombay Stock Exchange</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">63,384.58</p>
                  <p className="text-sm text-green-600">+385.72 (0.61%)</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">Gold (24k)</h3>
                  <p className="text-gray-500 text-sm">Per 10g</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">₹58,450</p>
                  <p className="text-sm text-red-600">-250 (0.43%)</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <i className="fas fa-piggy-bank mr-2"></i> FinCrop
              </h3>
              <p className="text-gray-400">Making investment simple and accessible for every Indian.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Investments</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Stocks</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Mutual Funds</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Fixed Deposits</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Gold</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Bonds</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Learn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Calculators</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Market Research</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Tax Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <i className="fas fa-phone-alt mr-2"></i> +91 98765 43210
                </li>
                <li className="flex items-center text-gray-400">
                  <i className="fas fa-envelope mr-2"></i> support@fincrop.in
                </li>
                <li className="flex items-center text-gray-400">
                  <i className="fas fa-map-marker-alt mr-2"></i> Mumbai, India
                </li>
                <li className="flex space-x-4 mt-4">
                  <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© 2023 FinCrop. All rights reserved. | <a href="#" className="hover:text-white">Privacy Policy</a> | <a href="#" className="hover:text-white">Terms of Service</a></p>
            <p className="mt-2 text-sm">FinCrop is a SEBI registered investment advisor (RIA No. INA000123456)</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <div className="flex justify-around">
          <a href="#" className="flex flex-col items-center justify-center py-3 text-blue-600">
            <i className="fas fa-home text-lg"></i>
            <span className="text-xs mt-1">Home</span>
          </a>
          <a href="#" className="flex flex-col items-center justify-center py-3 text-gray-600">
            <i className="fas fa-chart-pie text-lg"></i>
            <span className="text-xs mt-1">Invest</span>
          </a>
          <a href="#" className="flex flex-col items-center justify-center py-3 text-gray-600">
            <i className="fas fa-wallet text-lg"></i>
            <span className="text-xs mt-1">Portfolio</span>
          </a>
          <a href="#" className="flex flex-col items-center justify-center py-3 text-gray-600">
            <i className="fas fa-user text-lg"></i>
            <span className="text-xs mt-1">Profile</span>
          </a>
        </div>
      </div>

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
      `}</style>
    </div>
  );
};

export default HomePage;