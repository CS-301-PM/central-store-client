import { useEffect } from "react";
import { Link } from "react-router-dom";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import AppButton from "../../components/other/AppButton";
import { Role } from "../../types/User";
import { useStockManagementContext } from "../../hooks/useStockManagementContext";
import DynamicTable from "../../components/other/DynamicTable";
import ReusableModal from "../../components/other/Modal";
import AddStocks from "../Manager/AddStocks";

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
        <ReusableModal
          buttonLabel="ADD STOCK"
          title="NEW STOCK"
          color="primary"
          variant="contained"
        >
          <AddStocks />
        </ReusableModal>
      </RequestTableHeader>
      <DynamicTable data={items} />
    </div>
  );
}
