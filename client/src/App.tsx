
import React from 'react';
import { Router, Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Invoices from './pages/Invoices';
import Landing from './pages/Landing';
import NotFound from './pages/not-found';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/dashboard">
            <Layout>
              <Dashboard />
            </Layout>
          </Route>
          <Route path="/products">
            <Layout>
              <Products />
            </Layout>
          </Route>
          <Route path="/customers">
            <Layout>
              <Customers />
            </Layout>
          </Route>
          <Route path="/invoices">
            <Layout>
              <Invoices />
            </Layout>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
