// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import styles from './login.module.css';
import arms from './arms.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const authenticateUser = async (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.username === 'admin' && credentials.password === 'password') {
          resolve({ 
            success: true, 
            token: 'mock-token', 
            user: { id: 1, name: 'Admin' } 
          });
        } else {
          resolve({ 
            success: false, 
            message: 'Invalid credentials. Use admin/password' 
          });
        }
      }, 1000);
    });
  };

  const handleLogin = async (credentials) => {
    try {
      setIsLoading(true);
      setLoginError('');
      
      const response = await authenticateUser(credentials);
      
      if (response.success) {
        // Store authentication state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authToken', response.token || '');
        localStorage.setItem('user', JSON.stringify(response.user || {}));
        setIsAuthenticated(true);
        
        if (formData.remember) {
          localStorage.setItem('rememberedUsername', credentials.username);
        } else {
          localStorage.removeItem('rememberedUsername');
        }
        
        // Redirect to originally requested page or modules page
        const from = location.state?.from?.pathname || '/ModulesPage';
        navigate(from, { replace: true });
      } else {
        setLoginError(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {
      username: '',
      password: ''
    };

    if (!formData.username.trim()) {
      newErrors.username = 'Please enter a valid username';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Please enter your password';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      handleLogin(formData);
    }
  };

  // Check for remembered username on component mount
  React.useEffect(() => {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      setFormData(prev => ({ 
        ...prev, 
        username: rememberedUsername, 
        remember: true 
      }));
    }
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <h1>UGANDA HEALTH WORKERS REGISTRY</h1>
          <p>Ministry of Health - Secure Login Portal</p>
        </div>
        
        <div className={styles.loginBody}>
          <div className={styles.logo}>
            <img 
              src={arms} 
              alt="Uganda Government Logo" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-logo.png';
              }}
            />
          </div>
          
          <form onSubmit={handleSubmit}>
            {loginError && (
              <div className={styles.errorMessage}>
                {loginError}
              </div>
            )}
            
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                disabled={isLoading}
                autoComplete="username"
              />
              {errors.username && (
                <div className={styles.errorMessage}>
                  {errors.username}
                </div>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                disabled={isLoading}
                autoComplete="current-password"
              />
              {errors.password && (
                <div className={styles.errorMessage}>
                  {errors.password}
                </div>
              )}
            </div>
            
            <div className={styles.rememberForgot}>
              <div className={styles.rememberMe}>
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <div className={styles.forgotPassword}>
                <a href="/forgot-password">Forgot password?</a>
              </div>
            </div>
            
            <button 
              type="submit" 
              className={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Logging in...
                </>
              ) : 'Login'}
            </button>
          </form>
        </div>
        
        <div className={styles.loginFooter}>
          <p>By logging in, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a></p>
          <p>Need help? Contact <a href="mailto:support@healthregistry.go.ug">support@healthregistry.go.ug</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;