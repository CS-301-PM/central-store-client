import { useEffect, useState } from "react";
import AppButton from "../../components/other/AppButton";
import InputField from "../../components/other/InputFild";
import { useStockManagementContext } from "../../hooks/useStockManagementContext";
import "./AddStockForm.css";

interface StockProps {
  isNew: boolean;
  stockToHandle?: any;
}

function AddStocks({ isNew = true, stockToHandle }: StockProps) {
  const { addStock, updateStock } = useStockManagementContext();

  const [itemName, setItemName] = useState("");
  const [originalQuantity, setOriginalQuantity] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState("");
  const [costEach, setCostEach] = useState("");
  const [location, setLocation] = useState("");
  const [available, setAvailable] = useState(true);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!isNew && stockToHandle) {
      setItemName(stockToHandle.item_name || "");
      setOriginalQuantity(String(stockToHandle.original_quantity || ""));
      setCurrentQuantity(String(stockToHandle.current_quantity || ""));
      setCostEach(String(stockToHandle.cost_each || ""));
      setLocation(stockToHandle.curr_location || "");
      setAvailable(Boolean(stockToHandle.available));
      setCategory(stockToHandle.category || "");
    }
  }, [isNew, stockToHandle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // clean object
    const stock = {
      id: stockToHandle?.id,
      item_name: itemName,
      original_quantity: Number(originalQuantity),
      current_quantity: Number(currentQuantity),
      cost_each: Number(costEach),
      curr_location: location,
      available,
      category,
    };

    if (isNew) {
      await addStock(stock);
    } else {
      await updateStock(stock);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="addStockForm">
        <div className="paralellInputs">
          <InputField
            label="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <InputField
            label="Original Quantity"
            type="number"
            value={originalQuantity}
            onChange={(e) => setOriginalQuantity(e.target.value)}
          />
        </div>

        <div className="paralellInputs">
          <InputField
            label="Current Quantity"
            type="number"
            value={currentQuantity}
            onChange={(e) => setCurrentQuantity(e.target.value)}
          />
          <InputField
            label="Cost Each"
            type="number"
            value={costEach}
            onChange={(e) => setCostEach(e.target.value)}
          />
        </div>

        <div>
          <InputField
            label="Current Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <InputField
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <label className="ms-3">
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          Available
        </label>

        <div className="m-3">
          <AppButton variant="contained" color="warning" type="submit">
            {isNew ? "ADD STOCK" : "UPDATE"}
          </AppButton>
        </div>
      </form>
    </div>
  );
}

export default AddStocks;
