import React from 'react';
import { useRouter } from 'next/router';
import { useNotification } from '@stonelead/ui';

export default function Home() {
  const router = useRouter();
  const { showNotification } = useNotification();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">StoneLead</h1>
            <nav className="space-x-4">
              <button
                onClick={() => router.push('/campaigns')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Campagnes
              </button>
              <button
                onClick={() => router.push('/clients')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Clients
              </button>
              <button
                onClick={() => router.push('/analytics')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Analytics
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Gérez vos campagnes marketing
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Optimisez vos campagnes publicitaires et suivez vos performances en temps réel.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-indigo-600 text-4xl mb-4">📊</div>
              <h3 className="text-lg font-medium text-gray-900">Analytics en temps réel</h3>
              <p className="mt-2 text-gray-500">
                Suivez les performances de vos campagnes avec des métriques détaillées.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-indigo-600 text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-medium text-gray-900">Gestion des clients</h3>
              <p className="mt-2 text-gray-500">
                Gérez vos clients et leurs campagnes depuis une interface unique.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-indigo-600 text-4xl mb-4">📈</div>
              <h3 className="text-lg font-medium text-gray-900">Rapports détaillés</h3>
              <p className="mt-2 text-gray-500">
                Générez des rapports personnalisés pour optimiser vos stratégies.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <button
            onClick={() => {
              router.push('/campaigns');
              showNotification({
                type: 'success',
                message: 'Bienvenue sur StoneLead !',
              });
            }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Commencer maintenant
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            © 2024 StoneLead. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
} 