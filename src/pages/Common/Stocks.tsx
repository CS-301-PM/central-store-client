import { Column, ReusableTable } from "../../components/other/StocksTable";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import AppButton from "../../components/other/AppButton";
import { Link } from "react-router-dom";
import { Role } from "../../types/User";

type StockData = {
  id: string;
  itemName: string;
  originalLevel: number;
  currentLevel: number;
  availability: "Available" | "Low Stock" | "Out of Stock";
};

function createStock(
  id: string,
  itemName: string,
  originalLevel: number,
  currentLevel: number
): StockData {
  let availability: StockData["availability"] = "Available";

  if (currentLevel === 0) availability = "Out of Stock";
  else if (currentLevel <= originalLevel * 0.25) availability = "Low Stock";

  return { id, itemName, originalLevel, currentLevel, availability };
}

const stockData: StockData[] = [
  createStock("STK001", "A4 Books", 200, 50),
  createStock("STK002", "Pens", 500, 300),
  createStock("STK003", "Notebooks", 100, 0),
  createStock("STK004", "Markers", 80, 20),
];

const stockColumns: Column<StockData>[] = [
  { key: "id", label: "ID" },
  { key: "itemName", label: "Item Name" },
  { key: "originalLevel", label: "Original Level", align: "right" },
  { key: "currentLevel", label: "Current Level", align: "right" },
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
  return (
    <div>
      <RequestTableHeader
        title="All Stocks"
        subtitle="All stocks that were in and their current level"
      >
        <Link
          to={
            role == "PROCUREMENT_OFFICER"
              ? "/procurement/requests"
              : "/manager/requests"
          }
        >
          <AppButton variant="contained" color="primary">
            Requests
          </AppButton>
        </Link>
      </RequestTableHeader>
      <ReusableTable
        columns={stockColumns}
        data={stockData}
        getRowStyle={(row, index) => ({
          backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
          cursor: "pointer",
        })}
      />
    </div>
  );
}
