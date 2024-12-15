import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Views from "./views";
import 'antd/dist/antd.min.css';
import './App.css';
import Loading from 'components/shared-components/Loading';
import { initKeycloak } from 'services/keycloakService';
import authService from 'services/authService';

function App() {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  useEffect(() => {
    initKeycloak()
      .then(async (authenticated: any) => {
        setKeycloakInitialized(true);
        if (authenticated) {
           // Handle successful authentication
           await authService.loginWithKeycloak();
        }
      })
      .catch((error: any) => {
        console.error('Failed to initialize Keycloak:', error);
      });
  }, []);

  // if (!keycloakInitialized) {
  //   return <Loading cover="page" />;
  // }
  return (
    <Router>
      <Switch>
        <Route path="/" component={Views} />
      </Switch>
    </Router>
  );
}

export default App;
