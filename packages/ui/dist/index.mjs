// src/CampaignCard.tsx
import { useState } from "react";

// src/CampaignMetrics.tsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { jsx, jsxs } from "react/jsx-runtime";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
var CampaignMetrics = ({
  metrics,
  className = ""
}) => {
  const performanceData = {
    labels: ["Impressions", "Clicks", "Conversions"],
    datasets: [
      {
        label: "Performance Metrics",
        data: [metrics.impressions, metrics.clicks, metrics.conversions],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)"
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)"
        ],
        borderWidth: 1
      }
    ]
  };
  const conversionRate = metrics.impressions > 0 ? metrics.conversions / metrics.impressions * 100 : 0;
  const ctrData = {
    labels: ["CTR"],
    datasets: [
      {
        label: "Click-Through Rate",
        data: [metrics.impressions > 0 ? metrics.clicks / metrics.impressions * 100 : 0],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  };
  const conversionData = {
    labels: ["Conversion Rate"],
    datasets: [
      {
        label: "Conversion Rate",
        data: [conversionRate],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1
      }
    ]
  };
  return /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Performance Overview" }),
      /* @__PURE__ */ jsx(
        Bar,
        {
          data: performanceData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Click-Through Rate" }),
      /* @__PURE__ */ jsx(
        Doughnut,
        {
          data: ctrData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            }
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "text-center mt-2", children: /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold", children: [
        metrics.impressions > 0 ? (metrics.clicks / metrics.impressions * 100).toFixed(2) : "0.00",
        "%"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Conversion Rate" }),
      /* @__PURE__ */ jsx(
        Doughnut,
        {
          data: conversionData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            }
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "text-center mt-2", children: /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold", children: [
        conversionRate.toFixed(2),
        "%"
      ] }) })
    ] })
  ] });
};

// src/CampaignCard.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var CampaignCard = ({ campaign, onEdit }) => {
  const [showMetrics, setShowMetrics] = useState(false);
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return /* @__PURE__ */ jsxs2("div", { className: "bg-white rounded-lg shadow-md p-6", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex justify-between items-start mb-4", children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("h3", { className: "text-lg font-semibold text-gray-900", children: campaign.name }),
        /* @__PURE__ */ jsx2("p", { className: "text-sm text-gray-500", children: campaign.client.name })
      ] }),
      /* @__PURE__ */ jsx2(
        "span",
        {
          className: `px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
            campaign.status
          )}`,
          children: campaign.status
        }
      )
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("p", { className: "text-sm text-gray-600", children: "Platform" }),
        /* @__PURE__ */ jsx2("p", { className: "font-medium", children: campaign.platform })
      ] }),
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("p", { className: "text-sm text-gray-600", children: "Budget" }),
        /* @__PURE__ */ jsxs2("p", { className: "font-medium", children: [
          "$",
          campaign.budget.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("p", { className: "text-sm text-gray-600", children: "Description" }),
        /* @__PURE__ */ jsx2("p", { className: "font-medium text-gray-900", children: campaign.description })
      ] }),
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2(
          "button",
          {
            onClick: () => setShowMetrics(!showMetrics),
            className: "text-blue-600 hover:text-blue-800 text-sm font-medium",
            children: showMetrics ? "Hide Metrics" : "Show Metrics"
          }
        ),
        showMetrics && /* @__PURE__ */ jsx2("div", { className: "mt-4", children: /* @__PURE__ */ jsx2(CampaignMetrics, { metrics: campaign.metrics }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsx2(
      "button",
      {
        onClick: onEdit,
        className: "text-blue-600 hover:text-blue-800 text-sm font-medium",
        children: "Edit"
      }
    ) })
  ] });
};

// src/Notification.tsx
import { useEffect } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var Notification = ({
  type,
  message,
  onClose,
  duration = 5e3
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 text-green-800 border-green-200";
      case "error":
        return "bg-red-50 text-red-800 border-red-200";
      case "warning":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-50 text-blue-800 border-blue-200";
    }
  };
  const getIcon = () => {
    switch (type) {
      case "success":
        return /* @__PURE__ */ jsx3("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx3(
          "path",
          {
            fillRule: "evenodd",
            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
            clipRule: "evenodd"
          }
        ) });
      case "error":
        return /* @__PURE__ */ jsx3("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx3(
          "path",
          {
            fillRule: "evenodd",
            d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
            clipRule: "evenodd"
          }
        ) });
      case "warning":
        return /* @__PURE__ */ jsx3("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx3(
          "path",
          {
            fillRule: "evenodd",
            d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
            clipRule: "evenodd"
          }
        ) });
      default:
        return /* @__PURE__ */ jsx3("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx3(
          "path",
          {
            fillRule: "evenodd",
            d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
            clipRule: "evenodd"
          }
        ) });
    }
  };
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      className: `fixed bottom-4 right-4 p-4 rounded-lg border ${getStyles()} shadow-lg flex items-center space-x-3`,
      role: "alert",
      children: [
        /* @__PURE__ */ jsx3("div", { className: "flex-shrink-0", children: getIcon() }),
        /* @__PURE__ */ jsx3("div", { className: "flex-1", children: message }),
        /* @__PURE__ */ jsx3(
          "button",
          {
            onClick: onClose,
            className: "flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none",
            "aria-label": "Close notification",
            children: /* @__PURE__ */ jsx3("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx3(
              "path",
              {
                fillRule: "evenodd",
                d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                clipRule: "evenodd"
              }
            ) })
          }
        )
      ]
    }
  );
};

// src/NotificationContext.tsx
import { createContext, useContext, useState as useState2, useCallback } from "react";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var NotificationContext = createContext(
  void 0
);
var NotificationProvider = ({
  children
}) => {
  const [notifications, setNotifications] = useState2([]);
  const showNotification = useCallback((type, message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
  }, []);
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);
  return /* @__PURE__ */ jsxs4(NotificationContext.Provider, { value: { showNotification }, children: [
    children,
    notifications.map((notification) => /* @__PURE__ */ jsx4(
      Notification,
      {
        type: notification.type,
        message: notification.message,
        onClose: () => removeNotification(notification.id)
      },
      notification.id
    ))
  ] });
};
var useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === void 0) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
export {
  CampaignCard,
  CampaignMetrics,
  Notification,
  NotificationProvider,
  useNotification
};
