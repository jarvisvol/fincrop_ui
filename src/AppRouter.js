import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomePage from './modules/home/components/Homepage';
import Login from './modules/auth/components/Login';
import Register from './modules/auth/components/Register';
import Portfolio from './modules/portfolio/components/Portfolio';
import Invest from './modules/invest/components/Invest';
import Profile from './modules/profile/components/Profile';
import Layout from './modules/layout/Layout';
import { verifyToken } from './modules/auth/store/authActions'

// Protected Route Component
class ProtectedRoute extends Component {
  render() {
    const { isAuthenticated, isLoading, children } = this.props;
    
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  }
}

// Public Route Component (redirect to home if already authenticated)
class PublicRoute extends Component {
  render() {
    const { isAuthenticated, isLoading, children } = this.props;
    
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    return !isAuthenticated ? children : <Navigate to="/" replace />;
  }
}

class AppRouter extends Component {
  componentDidMount() {
    this.props.verifyToken();
  }

  render() {
    const { isLoading, isAuthenticated } = this.props.auth;
    
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    return (
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={
              <PublicRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <Register />
              </PublicRoute>
            } 
          />
          <Route path="/" element={<Layout />}>
            <Route 
              index 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                  <HomePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="portfolio" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                  <Portfolio />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="invest" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                  <Invest />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="profile" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  verifyToken: bindActionCreators(verifyToken, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);