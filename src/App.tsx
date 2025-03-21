import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { Bundle } from "./types/Bundle";
import { fetchBundles } from "./services/bundleService";
import { BundleWrapper } from "./components/Bundle";
import { AuthProvider } from "./contexts/AuthProvider";
import LoginForm from "./components/authentication/LoginForm";

const AppContent: React.FC = () => {
  const [selectedBundleId, setSelectedBundleId] = useState<number | null>(null);
  const [bundles, setBundles] = useState<Bundle[]>([]);

  useEffect(() => {
    async function fetchData() {
      const bundles = await fetchBundles(1);
      setBundles(bundles);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-100 font-sans">
      <div className="px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg">
          <Header
            menuItems={bundles}
            onSelectBundle={(id) => setSelectedBundleId(id)}
            onLogout={() => {
              // Tu peux connecter ça à useAuth() si tu veux unifier la logique
              localStorage.clear();
              window.location.href = "/login";
            }}
          />

          <div className="flex-1 flex p-4 justify-center">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/bundle/:bundleName"
                element={<BundleWrapper selectedBundleId={selectedBundleId} />}
              />
            </Routes>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
  );
};

export default App;