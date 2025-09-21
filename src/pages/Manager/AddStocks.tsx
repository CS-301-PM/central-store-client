import { useState } from "react";
import AppButton from "../../components/other/AppButton";
import InputField from "../../components/other/InputFild";

function AddStocks() {
  const [itemName, setItemName] = useState<string | "">("");
  const [quantity, setQuantity] = useState<string | "">("");
  const [location, setLocatiom] = useState<string | "">("");
  //   const [present, setPresent] = useState<string | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      itemName,
      quantity,
      location,
    };
    console.log(item);
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md">
      <form onSubmit={handleSubmit}>
        <InputField
          label="Item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          //   error={errors.firstName || null}
        />
        <InputField
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          //   error={errors.firstName || null}
        />
        <InputField
          label="Location"
          value={location}
          onChange={(e) => setLocatiom(e.target.value)}
          //   error={errors.firstName || null}
        />

        <div className="m-2">
          <AppButton variant="contained" color="warning" type="submit">
            {"ADD STOCK"}
          </AppButton>
        </div>
      </form>
    </div>
  );
}

export default AddStocks;
