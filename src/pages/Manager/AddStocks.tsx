import { useState } from "react";
import AppButton from "../../components/other/AppButton";
import InputField from "../../components/other/InputFild";
import { useStockManagementContext } from "../../hooks/useStockManagementContext";

function AddStocks() {
  const { addStock } = useStockManagementContext();

  const [itemName, setItemName] = useState("");
  const [originalQuantity, setOriginalQuantity] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState("");
  const [costEach, setCostEach] = useState("");
  // const [dateIn, setDateIn] = useState("");
  const [location, setLocation] = useState("");
  const [available, setAvailable] = useState(true);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const stock = {
      item_name: itemName,
      original_quantity: Number(originalQuantity),
      current_quantity: Number(currentQuantity),
      cost_each: Number(costEach),
      current_location: location,
      available,
      category,
    };

    await addStock(stock);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="">
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
        <InputField
          label="Current location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <InputField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
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
            ADD STOCK
          </AppButton>
        </div>
      </form>
    </div>
  );
}

export default AddStocks;
