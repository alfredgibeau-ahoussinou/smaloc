import React from 'react';
import { cn } from '../utils/cn';

interface CampaignCardProps {
  name: string;
  platform: string;
  budget: number;
  status: 'draft' | 'active' | 'paused' | 'completed';
  metrics?: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
  };
  className?: string;
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  active: 'bg-green-100 text-green-800',
  paused: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-blue-100 text-blue-800',
};

export const CampaignCard: React.FC<CampaignCardProps> = ({
  name,
  platform,
  budget,
  status,
  metrics,
  className,
}) => {
  return (
    <div className={cn('p-6 bg-white rounded-lg shadow-md', className)}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{platform}</p>
        </div>
        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusColors[status])}>
          {status}
        </span>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">Budget</p>
        <p className="text-lg font-semibold">{budget.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
      </div>

      {metrics && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Impressions</p>
            <p className="font-semibold">{metrics.impressions.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Clics</p>
            <p className="font-semibold">{metrics.clicks.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Conversions</p>
            <p className="font-semibold">{metrics.conversions.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Dépense</p>
            <p className="font-semibold">{metrics.spend.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
          </div>
        </div>
      )}
    </div>
  );
}; 