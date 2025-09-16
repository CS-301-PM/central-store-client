import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Column, ReusableTable } from "../../components/other/StocksTable";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import AppButton from "../../components/other/AppButton";
import { Role } from "../../types/User";
import { useStockManagementContext } from "../../hooks/useStockManagementContext";
import { Stock } from "../../reducers/StockManagementReducer";
import DynamicTable from "../../components/other/DynamicTable";

const stockColumns: Column<Stock>[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "itemName",
    label: "Item Name",
  },
  {
    key: "originalLevel",
    label: "Original Level",
    align: "right",
  },
  {
    key: "currentLevel",
    label: "Current Level",
    align: "right",
  },
  {
    key: "availability",
    label: "Availability",
    align: "center",
    render: (value) => (
      <span
        style={{
          fontWeight: "bold",
          color:
            value === "Available"
              ? "green"
              : value === "Low Stock"
              ? "orange"
              : "red",
        }}
      >
        {value}
      </span>
    ),
  },
];

export default function StockTablePage({ role }: { role: Role }) {
  const { state, listAllStocks } = useStockManagementContext();
  const { items } = state;

  useEffect(() => {
    listAllStocks([]);
  }, []);

  return (
    <div>
      <RequestTableHeader
        title="All Stocks"
        subtitle="All stocks that were in and their current level"
      >
        <Link
          to={
            role === "PROCUREMENT_OFFICER"
              ? "/procurement/requests"
              : "/manager/requests"
          }
        >
          <AppButton variant="contained" color="primary">
            Requests
          </AppButton>
        </Link>
      </RequestTableHeader>
      <DynamicTable data={items} />
    </div>
  );
}
