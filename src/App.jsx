import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import {  useAuth } from './contexts/AuthContext';

import { SearchProvider } from './contexts/SearchContext';
import { PaymentProvider } from './contexts/PaymentContext';
import { PrivacyProvider } from './contexts/PrivacyContext';
import { AdminProvider } from './contexts/AdminContext';
import { AccessibilityProvider } from './components/AccessibilityProvider';
import Layout from './components/Layout';
import LazyWrapper from './components/LazyWrapper';
import { Routes as AppRoutes } from './lib/routes';
import './App.css';

// Lazy load components for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const BillingPage = lazy(() => import('./pages/BillingPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const DashboardPage = lazy(() => import('./pages/DashBoardPage'));

// Placeholder components for routes that aren't implemented yet
const PlaceholderPage = ({ title }) => (
  <div className="text-center space-y-4">
    <h1 className="text-3xl font-bold">{title}</h1>
    <p className="text-muted-foreground">עמוד זה בפיתוח</p>
  </div>
);

function App() {
 const{user}=useAuth();
 console.log(user)
  return (
    <AccessibilityProvider>
      <SearchProvider>
        <PaymentProvider>
          <PrivacyProvider>
            <AdminProvider>
              <Router>
                  <Routes>
                    {/* Routes without layout (login, signup) */}
                    <Route path={AppRoutes.login} element={
                      <LazyWrapper>
                        <LoginPage />
                      </LazyWrapper>
                    } />
                    <Route path={AppRoutes.signup} element={
                      <LazyWrapper>
                        <SignupPage />
                      </LazyWrapper>
                    } />
                    <Route path="/dashboard" element={
                      <LazyWrapper>
                        <DashboardPage />
                      </LazyWrapper>
                    } />

                    {/* Routes with layout */}
                 
                    <Route path="/" element={ <Layout /> }>
                      <Route index element={
                        <LazyWrapper>
                          <HomePage />
                        </LazyWrapper>
                      } />
                      <Route path={AppRoutes.search} element={
                        <LazyWrapper>
                          <SearchPage />
                        </LazyWrapper>
                      } />
                      <Route path={AppRoutes.onboarding} element={<PlaceholderPage title="הכנה לשימוש" />} />
                      <Route path={AppRoutes.seekerDash} element={<PlaceholderPage title="לוח בקרה - מחפש עבודה" />} />
                      <Route path={AppRoutes.employerDash} element={<PlaceholderPage title="לוח בקרה - מעסיק" />} />
                      <Route path="/profile/:id" element={
                        <LazyWrapper>
                          <ProfilePage />
                        </LazyWrapper>
                      } />
                      <Route path={AppRoutes.messages} element={
                        <LazyWrapper>
                          <ChatPage />
                        </LazyWrapper>
                      } />
                      <Route path={AppRoutes.billing} element={
                        <LazyWrapper>
                          <BillingPage />
                        </LazyWrapper>
                      } />
                      <Route path={AppRoutes.admin} element={
                        <LazyWrapper>
                          <AdminPage />
                        </LazyWrapper>
                      } />
                      <Route path={AppRoutes.ads} element={<PlaceholderPage title="ניהול פרסומות" />} />
                      <Route path={AppRoutes.settings} element={<PlaceholderPage title="הגדרות" />} />
                      <Route path={AppRoutes.support} element={<PlaceholderPage title="תמיכה" />} />
                      <Route path={AppRoutes.termsSeekers} element={<PlaceholderPage title="תנאי שימוש - מחפשי עבודה" />} />
                      <Route path={AppRoutes.termsEmployers} element={<PlaceholderPage title="תנאי שימוש - מעסיקים" />} />
                      <Route path={AppRoutes.privacy} element={<PlaceholderPage title="מדיניות פרטיות" />} />
                      <Route path={AppRoutes.notFound} element={
                        <LazyWrapper>
                          <NotFoundPage />
                        </LazyWrapper>
                      } />
                      
                      {/* Catch all route - redirect to 404 */}
                      <Route path="*" element={<Navigate to={AppRoutes.notFound} replace />} />
                    </Route>

                  </Routes>
                </Router>
              </AdminProvider>
            </PrivacyProvider>
          </PaymentProvider>
        </SearchProvider>
      
    </AccessibilityProvider>
  );
}

export default App;