import React, { useState } from 'react';
import { CampaignMetrics } from './CampaignMetrics';

interface Campaign {
  id: string;
  name: string;
  platform: string;
  description: string;
  budget: number;
  status: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
  };
  client: {
    id: string;
    name: string;
  };
}

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: () => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onEdit }) => {
  const [showMetrics, setShowMetrics] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
          <p className="text-sm text-gray-500">{campaign.client.name}</p>
        </div>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
            campaign.status
          )}`}
        >
          {campaign.status}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Platform</p>
          <p className="font-medium">{campaign.platform}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Budget</p>
          <p className="font-medium">${campaign.budget.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Description</p>
          <p className="font-medium text-gray-900">{campaign.description}</p>
        </div>

        <div>
          <button
            onClick={() => setShowMetrics(!showMetrics)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {showMetrics ? 'Hide Metrics' : 'Show Metrics'}
          </button>
          {showMetrics && (
            <div className="mt-4">
              <CampaignMetrics metrics={campaign.metrics} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Edit
        </button>
      </div>
    </div>
  );
}; 