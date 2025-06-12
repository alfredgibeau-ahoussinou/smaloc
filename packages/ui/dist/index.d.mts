import React from 'react';

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
declare const CampaignCard: React.FC<CampaignCardProps>;

interface CampaignMetricsProps {
    metrics: CampaignMetrics;
    className?: string;
}
interface CampaignMetrics {
    impressions: number;
    clicks: number;
    conversions: number;
}
declare const CampaignMetrics: React.FC<CampaignMetricsProps>;

type NotificationType = 'success' | 'error' | 'info' | 'warning';
interface NotificationProps {
    type: NotificationType;
    message: string;
    onClose: () => void;
    duration?: number;
}
declare const Notification: React.FC<NotificationProps>;

interface NotificationContextType {
    showNotification: (type: NotificationType, message: string) => void;
}
interface NotificationProviderProps {
    children: React.ReactNode;
}
declare const NotificationProvider: React.FC<NotificationProviderProps>;
declare const useNotification: () => NotificationContextType;

export { CampaignCard, CampaignMetrics, Notification, NotificationProvider, type NotificationType, useNotification };
