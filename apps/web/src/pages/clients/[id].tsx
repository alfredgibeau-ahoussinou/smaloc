import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useNotification } from '@stonelead/ui';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes: string;
  status: 'active' | 'inactive';
  campaigns: {
    id: string;
    name: string;
    status: 'active' | 'paused' | 'completed';
    budget: number;
    spent: number;
    startDate: string;
    endDate: string;
  }[];
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
}

export default function ClientDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { showNotification } = useNotification();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // TODO: Implement API call to fetch client data
      // Mock data for now
      setClient({
        id: id as string,
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        phone: '+33 6 12 34 56 78',
        company: 'Dupont & Co',
        address: '123 Rue de la Paix',
        city: 'Paris',
        postalCode: '75001',
        country: 'FR',
        notes: 'Client important, préfère être contacté par email.',
        status: 'active',
        campaigns: [
          {
            id: '1',
            name: 'Campagne Facebook Q1',
            status: 'active',
            budget: 5000,
            spent: 2500,
            startDate: '2024-01-01',
            endDate: '2024-03-31',
          },
          {
            id: '2',
            name: 'Campagne Google Ads',
            status: 'paused',
            budget: 3000,
            spent: 1500,
            startDate: '2024-02-01',
            endDate: '2024-04-30',
          },
        ],
        totalSpent: 4000,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-03-15T00:00:00Z',
      });
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Client non trouvé</h2>
          <p className="mt-2 text-gray-600">
            Le client que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <button
            onClick={() => router.push('/clients')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Retour à la liste des clients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
                <p className="mt-1 text-sm text-gray-500">{client.company}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => router.push(`/clients/${id}/edit`)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Modifier
                </button>
                <button
                  onClick={() => router.push('/clients')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Nouvelle campagne
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Informations du client */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Informations du client
                </h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{client.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                    <dd className="mt-1 text-sm text-gray-900">{client.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Adresse</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {client.address}
                      <br />
                      {client.postalCode} {client.city}
                      <br />
                      {client.country}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Statut</dt>
                    <dd className="mt-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          client.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {client.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Notes</dt>
                    <dd className="mt-1 text-sm text-gray-900">{client.notes}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Campagnes */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Campagnes</h2>
                  <div className="text-sm text-gray-500">
                    Total dépensé: {client.totalSpent.toLocaleString('fr-FR')} €
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Nom
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Statut
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Budget
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Dépensé
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Période
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {client.campaigns.map((campaign) => (
                        <tr key={campaign.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {campaign.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                campaign.status === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : campaign.status === 'paused'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {campaign.status === 'active'
                                ? 'Active'
                                : campaign.status === 'paused'
                                ? 'En pause'
                                : 'Terminée'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {campaign.budget.toLocaleString('fr-FR')} €
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {campaign.spent.toLocaleString('fr-FR')} €
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(campaign.startDate).toLocaleDateString('fr-FR')} -{' '}
                            {new Date(campaign.endDate).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() =>
                                router.push(`/campaigns/${campaign.id}`)
                              }
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Voir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 