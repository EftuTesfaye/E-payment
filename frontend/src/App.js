import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './Admin/AdminLogin.js';
import Dashboard from './Admin/Dashboard.js';
import AgentsList from './Admin/AgentsList.js';
import ServiceProvidersList from './Admin/ServiceList.js';
import UsersList from './Admin/UsersList.js';
import ServiceProviderRegistrationForm from './Admin/ServiceProvidersRegistration';
import AdminRegistrationForm from './Admin/AdminRegistration.js';
import AgentRegistrationForm from './Admin/AgentRegistration.js';
import AgentDetail from './pages/AgentDetails.js'; 
import ServiceProviderDetails from './pages/ServiceProviderDetails .js';
import RegistrationForm from './pages/user.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedServiceProvider, setSelectedServiceProvider] = useState(null);

  const handleServiceProviderClick = (serviceProvider) => {
    setSelectedServiceProvider(serviceProvider);
  };

  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard/:adminId" element={<Dashboard />} /> 
        <Route
  path="/admin/agents"
  element={
    <AgentsList
      key="agents-list" // Add a unique key prop
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
    />
  }
/>
        <Route
          path="/admin/agents/registration"
          element={<AgentRegistrationForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
      <Route
  path="/admin/service-providers"
  element={
    <ServiceProvidersList
      key="service-providers-list" // Add a unique key prop
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      onServiceProviderClick={handleServiceProviderClick}
    />
  }
/>
  <Route
  path="/admin/users" element={<UsersList key="users-list" // Add a unique key prop
  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
    />
  }
/>
        <Route
          path="/admin/service-providers/registration"
          element={<ServiceProviderRegistrationForm />}
        />
        <Route
          path="/admin/user/registration"
          element={<AdminRegistrationForm />}
        />
         <Route
            path="/user"
            element={
              <RegistrationForm/> 
            }
      />
        <Route
          path="/services"
          element={
            <ServiceProviderDetails
              serviceProviderName={selectedServiceProvider?.serviceProviderName}
            />
          }
        />
          <Route
          path="/agents"
          element={
            <AgentDetail
/> 
          }
        />
      </Routes>
    </Router>
  );
}
export default App;
