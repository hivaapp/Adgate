import type { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { ResourceUnlock } from './pages/ResourceUnlock';
import { CreatorProfile } from './pages/CreatorProfile';

const AppLayout = ({ children, hideNav = false }: { children: ReactNode, hideNav?: boolean }) => (
  <>
    {!hideNav && <Navbar />}
    {children}
  </>
);

const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const NotFound = () => (
  <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center animate-fade-in">
    <h1 className="text-[64px] font-black tracking-tighter text-text leading-none mb-2">404</h1>
    <p className="text-[18px] font-bold text-textMid mb-8">Page not found</p>
    <button onClick={() => window.history.back()} className="btn-primary px-8 h-[48px] rounded-[12px]">Go Back</button>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PublicOnlyRoute>
                <AppLayout>
                  <Landing />
                </AppLayout>
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AppLayout hideNav>
                  <Dashboard />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/r/:slug"
            element={<ResourceUnlock />}
          />
          <Route
            path="/@:username"
            element={<CreatorProfile />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
