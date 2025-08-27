// src/components/ModulesPage.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserMd, 
  faSearch, 
  faChartBar, 
  faClipboardList,
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../context/AuthContext';
import styles from './ModulesPage.module.css';

const ModulesPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleModuleClick = (modulePath) => {
    if (isAuthenticated) {
      navigate(modulePath);
    } else {
      navigate('/login', { state: { from: modulePath } });
    }
  };

  const modules = [
    {
      id: 1,
      title: "Health Worker Profile",
      icon: faUserMd,
      description: "Centralized repository for all health worker information including qualifications, certifications, employment history, and contact details.",
      features: [
        "Comprehensive profile management",
        "Document upload and verification",
        "License and certification tracking",
        "Employment history records"
      ],
      path: "/healthworker-profile"
    },
    {
      id: 2,
      title: "Search & Filter",
      icon: faSearch,
      description: "Advanced search capabilities to locate health workers based on multiple criteria including specialization, location, and qualifications.",
      features: [
        "Advanced search functionality",
        "Filter by specialization and location",
        "Geographical mapping of workers",
        "Export search results"
      ],
      path: "/search"
    },
    {
      id: 3,
      title: "Reporting & Analytics",
      icon: faChartBar,
      description: "Generate comprehensive reports and visualize workforce distribution, qualifications, and other key metrics for decision making.",
      features: [
        "Custom report generation",
        "Workforce distribution analytics",
        "Performance metrics",
        "Automated scheduled reports"
      ],
      path: "/reporting"
    },
    {
      id: 4,
      title: "Audit Logs",
      icon: faClipboardList,
      description: "Track all system activities and changes made to health worker records for security, compliance, and accountability purposes.",
      features: [
        "Comprehensive activity tracking",
        "Change history for all records",
        "User activity monitoring",
        "Exportable audit trails"
      ],
      path: "/audit-logs"
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img 
          src="/arms.jpg" 
          alt="Uganda Coat of Arms" 
          className={styles.logo} 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = '/placeholder-logo.png';
          }}
        />
        <div className={styles.headerContent}>
          <h1>UGANDA HEALTH WORKERS REGISTRY</h1>
          <p>Comprehensive Management System for Health Professionals</p>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </header>
      
      <div className={styles.grid}>
        {modules.map((module) => (
          <div key={module.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={module.icon} size="2x" />
              </div>
              <h2>{module.title}</h2>
            </div>
            <div className={styles.cardBody}>
              <p>{module.description}</p>
              <ul className={styles.features}>
                {module.features.map((feature, index) => (
                  <li key={index}>
                    <span className={styles.checkmark}>✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.cardFooter}>
              <button 
                className={`${styles.btn} ${styles.moduleBtn}`}
                onClick={() => handleModuleClick(module.path)}
              >
                Access Module
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <footer className={styles.footer}>
        <p>Uganda Ministry of Health - Health Worker Registry System</p>
        <p>© {new Date().getFullYear()} All Rights Reserved</p>
        <div className={styles.footerLinks}>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/help-center">Help Center</a>
          <a href="/contact-support">Contact Support</a>
        </div>
      </footer>
    </div>
  );
};

export default ModulesPage;