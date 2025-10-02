import React, { useState } from "react";
import {
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  PieChart as LucidePieChart,
  ShoppingCart,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DashBoardComp({ stocks = {}, requests = {}, approvals = {} }) {
  const [activeTab, setActiveTab] = useState("overview");

  const allStocks = stocks.allStocks || [];
  const highStock = stocks.highStock || [];
  const lowStock = stocks.lowStock || [];

  const totalValue = allStocks.reduce(
    (sum, item) =>
      sum + parseFloat(item.cost_each || 0) * (item.current_quantity || 0),
    0
  );

  // Pie chart: stock availability
  const stockStatusData = [
    {
      name: "Available",
      value: allStocks.filter((s) => s.available).length,
      color: "#10b981",
    },
    {
      name: "Unavailable",
      value: allStocks.filter((s) => !s.available).length,
      color: "#ef4444",
    },
  ];

  // Store distribution
  const storeDistribution = allStocks.reduce((acc, item) => {
    const storeId = `Store ${item.store_id || "N/A"}`;
    if (!acc[storeId]) acc[storeId] = { name: storeId, quantity: 0, value: 0 };
    acc[storeId].quantity += item.current_quantity || 0;
    acc[storeId].value +=
      (parseFloat(item.cost_each) || 0) * (item.current_quantity || 0);
    return acc;
  }, {});

  const storeData = Object.values(storeDistribution);

  const topValueItems = [...allStocks]
    .map((item) => ({
      name: item.item_name || "Unnamed",
      value: (parseFloat(item.cost_each) || 0) * (item.current_quantity || 0),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full h-full">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Stock Items */}
          <StatCard
            title="Total Stock Items"
            value={stocks.totalStocks || 0}
            subText={`${stocks.totalQuantity || 0} total units`}
            icon={<Package className="w-8 h-8 text-blue-600" />}
            color="blue"
          />
          {/* High Stock Items */}
          <StatCard
            title="High Stock Items"
            value={stocks.highStockCount || 0}
            subText="Well stocked"
            icon={<TrendingUp className="w-8 h-8 text-green-600" />}
            color="green"
          />
          {/* Low Stock Items */}
          <StatCard
            title="Low Stock Items"
            value={stocks.lowStockCount || 0}
            subText="Needs attention"
            icon={<AlertTriangle className="w-8 h-8 text-orange-600" />}
            color="orange"
          />
          {/* Total Inventory Value */}
          <StatCard
            title="Total Value"
            value={`K${totalValue.toLocaleString()}`}
            subText="Inventory worth"
            icon={<BarChart3 className="w-8 h-8 text-purple-600" />}
            color="purple"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <TabHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            requestsTotal={requests?.summary?.total || 0}
            approvalsTotal={approvals?.summary?.total || 0}
          />

          <div className="p-6">
            {activeTab === "overview" && (
              <OverviewTab
                stockStatusData={stockStatusData}
                storeData={storeData}
                topValueItems={topValueItems}
                highStock={highStock}
              />
            )}
            {activeTab === "requests" && <RequestsTab requests={requests} />}
            {activeTab === "approvals" && (
              <ApprovalsTab approvals={approvals} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------
// Reusable Stat Card
// -------------------
const StatCard = ({ title, value, subText, icon, color }) => (
  <div
    className={`bg-white rounded-xl shadow-lg p-6 border-l-4 border-${color}-500 hover:shadow-xl transition-shadow`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
        <p className="text-xs text-slate-500 mt-1">{subText}</p>
      </div>
      <div className={`bg-${color}-100 p-3 rounded-lg`}>{icon}</div>
    </div>
  </div>
);

// -------------------
// Tab Header
// -------------------
const TabHeader = ({
  activeTab,
  setActiveTab,
  requestsTotal,
  approvalsTotal,
}) => (
  <div className="border-b border-slate-200">
    <div className="flex space-x-8 px-6">
      <TabButton
        label="Overview"
        active={activeTab === "overview"}
        onClick={() => setActiveTab("overview")}
      />
      <TabButton
        label={`Requests (${requestsTotal})`}
        active={activeTab === "requests"}
        onClick={() => setActiveTab("requests")}
      />
      <TabButton
        label={`Approvals (${approvalsTotal})`}
        active={activeTab === "approvals"}
        onClick={() => setActiveTab("approvals")}
      />
    </div>
  </div>
);

const TabButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
      active
        ? "border-blue-500 text-blue-600"
        : "border-transparent text-slate-500 hover:text-slate-700"
    }`}
  >
    {label}
  </button>
);

// -------------------
// Overview Tab
// -------------------
const OverviewTab = ({
  stockStatusData,
  storeData,
  topValueItems,
  highStock,
}) => (
  <div className="space-y-8">
    {/* Stock Status Pie Chart */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <LucidePieChart className="w-5 h-5 mr-2 text-blue-600" /> Stock
          Availability
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={stockStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              dataKey="value"
            >
              {stockStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Store Distribution */}
      <div className="bg-slate-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" /> Quantity by Store
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={storeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Top Value Items */}
    <div className="bg-slate-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" /> Top 5 Items by
        Total Value
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topValueItems} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip formatter={(value) => `K${value.toLocaleString()}`} />
          <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* High Stock Items Table */}
    <div className="bg-slate-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-green-600" /> High Stock Items
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-300">
              <th className="py-3 px-4 font-semibold text-slate-700">
                Item Name
              </th>
              <th className="py-3 px-4 font-semibold text-slate-700">
                Quantity
              </th>
              <th className="py-3 px-4 font-semibold text-slate-700">
                Cost Each
              </th>
              <th className="py-3 px-4 font-semibold text-slate-700">
                Total Value
              </th>
              <th className="py-3 px-4 font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {highStock.map((item) => (
              <tr
                key={item.id || item.item_name}
                className="border-b border-slate-200 hover:bg-white"
              >
                <td className="py-3 px-4 font-medium text-slate-800">
                  {item.item_name}
                </td>
                <td className="py-3 px-4">{item.current_quantity}</td>
                <td className="py-3 px-4">
                  K{parseFloat(item.cost_each).toFixed(2)}
                </td>
                <td className="py-3 px-4">
                  K
                  {(
                    parseFloat(item.cost_each) * item.current_quantity
                  ).toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  {item.available ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" /> Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <XCircle className="w-3 h-3 mr-1" /> Unavailable
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// -------------------
// Requests Tab
// -------------------
const RequestsTab = ({ requests }) => {
  const allRequests = requests?.requests || [];
  const summary = requests?.summary || {};
  if (!allRequests.length) {
    return (
      <EmptyState
        Icon={Clock}
        title="No Requests Yet"
        description="Request data will appear here when available"
      />
    );
  }
  return (
    <div className="space-y-4">
      {allRequests.map((r, i) => (
        <div key={r.id || i} className="bg-white border p-4 rounded-lg">
          Request #{i + 1}
        </div>
      ))}
    </div>
  );
};

// -------------------
// Approvals Tab
// -------------------
const ApprovalsTab = ({ approvals }) => {
  const allApprovals = approvals?.approvals || [];
  const summary = approvals?.summary || {};
  if (!allApprovals.length) {
    return (
      <EmptyState
        Icon={CheckCircle}
        title="No Approvals Yet"
        description="Approval data will appear here when available"
      />
    );
  }
  return (
    <div className="space-y-4">
      {allApprovals.map((a, i) => (
        <div key={a.id || i} className="bg-white border p-4 rounded-lg">
          Approval #{i + 1}
        </div>
      ))}
    </div>
  );
};

// -------------------
// Empty State Component
// -------------------
const EmptyState = ({ Icon, title, description }) => (
  <div className="text-center py-12">
    <Icon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-slate-700 mb-2">{title}</h3>
    <p className="text-slate-500">{description}</p>
  </div>
);

export default DashBoardComp;
