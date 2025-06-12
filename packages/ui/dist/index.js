"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CampaignCard: () => CampaignCard,
  CampaignMetrics: () => CampaignMetrics,
  Notification: () => Notification,
  NotificationProvider: () => NotificationProvider,
  useNotification: () => useNotification
});
module.exports = __toCommonJS(index_exports);

// src/CampaignCard.tsx
var import_react = require("react");

// src/CampaignMetrics.tsx
var import_chart = require("chart.js");
var import_react_chartjs_2 = require("react-chartjs-2");
var import_jsx_runtime = require("react/jsx-runtime");
import_chart.Chart.register(
  import_chart.CategoryScale,
  import_chart.LinearScale,
  import_chart.PointElement,
  import_chart.LineElement,
  import_chart.BarElement,
  import_chart.Title,
  import_chart.Tooltip,
  import_chart.Legend,
  import_chart.ArcElement
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white p-4 rounded-lg shadow", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "Performance Overview" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_chartjs_2.Bar,
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white p-4 rounded-lg shadow", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "Click-Through Rate" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_chartjs_2.Doughnut,
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-center mt-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-2xl font-bold", children: [
        metrics.impressions > 0 ? (metrics.clicks / metrics.impressions * 100).toFixed(2) : "0.00",
        "%"
      ] }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white p-4 rounded-lg shadow", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "Conversion Rate" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_chartjs_2.Doughnut,
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-center mt-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-2xl font-bold", children: [
        conversionRate.toFixed(2),
        "%"
      ] }) })
    ] })
  ] });
};

// src/CampaignCard.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var CampaignCard = ({ campaign, onEdit }) => {
  const [showMetrics, setShowMetrics] = (0, import_react.useState)(false);
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "bg-white rounded-lg shadow-md p-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex justify-between items-start mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-lg font-semibold text-gray-900", children: campaign.name }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm text-gray-500", children: campaign.client.name })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "span",
        {
          className: `px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
            campaign.status
          )}`,
          children: campaign.status
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm text-gray-600", children: "Platform" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "font-medium", children: campaign.platform })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm text-gray-600", children: "Budget" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "font-medium", children: [
          "$",
          campaign.budget.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm text-gray-600", children: "Description" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "font-medium text-gray-900", children: campaign.description })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            onClick: () => setShowMetrics(!showMetrics),
            className: "text-blue-600 hover:text-blue-800 text-sm font-medium",
            children: showMetrics ? "Hide Metrics" : "Show Metrics"
          }
        ),
        showMetrics && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-4", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CampaignMetrics, { metrics: campaign.metrics }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var import_react2 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var Notification = ({
  type,
  message,
  onClose,
  duration = 5e3
}) => {
  (0, import_react2.useEffect)(() => {
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
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "path",
          {
            fillRule: "evenodd",
            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
            clipRule: "evenodd"
          }
        ) });
      case "error":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "path",
          {
            fillRule: "evenodd",
            d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
            clipRule: "evenodd"
          }
        ) });
      case "warning":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "path",
          {
            fillRule: "evenodd",
            d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
            clipRule: "evenodd"
          }
        ) });
      default:
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "path",
          {
            fillRule: "evenodd",
            d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
            clipRule: "evenodd"
          }
        ) });
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "div",
    {
      className: `fixed bottom-4 right-4 p-4 rounded-lg border ${getStyles()} shadow-lg flex items-center space-x-3`,
      role: "alert",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex-shrink-0", children: getIcon() }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex-1", children: message }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            onClick: onClose,
            className: "flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none",
            "aria-label": "Close notification",
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var import_react3 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var NotificationContext = (0, import_react3.createContext)(
  void 0
);
var NotificationProvider = ({
  children
}) => {
  const [notifications, setNotifications] = (0, import_react3.useState)([]);
  const showNotification = (0, import_react3.useCallback)((type, message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
  }, []);
  const removeNotification = (0, import_react3.useCallback)((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(NotificationContext.Provider, { value: { showNotification }, children: [
    children,
    notifications.map((notification) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
  const context = (0, import_react3.useContext)(NotificationContext);
  if (context === void 0) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CampaignCard,
  CampaignMetrics,
  Notification,
  NotificationProvider,
  useNotification
});
