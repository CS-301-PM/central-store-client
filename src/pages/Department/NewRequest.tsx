import * as React from "react";
import InputField from "../../components/other/InputFild";
import AppButton from "../../components/other/AppButton";
import BasicSelect from "../../components/other/BasicSelector";
import Loading from "../../components/other/Loading";
import { priorityLevels, PriorityType } from "../../types/Request";
import { useUserContext } from "../../hooks/UserContextHook";
import { useRequestManagementContext } from "../../hooks/useRequestHook";

function NewRequest() {
  const [item, setItem] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [priority, setPriority] = React.useState<PriorityType>("LOW");
  const [requesterId, setRequesterId] = React.useState("");
  const [department, setDepartment] = React.useState("Finance");
  const [stockId, setStockId] = React.useState("1");

  const { user, isLoading } = useUserContext();
  const { makeRequest, state } = useRequestManagementContext();
  const { loading, error } = state;

  const [possibleItems, setPossibleItems] = React.useState<
    { value: string; label: string }[]
  >([]);

  React.useEffect(() => {
    const fetchStocks = async () => {
      try {
        const URL = `${import.meta.env.VITE_SERVER}api/stocks/available`;

        const response = await fetch(URL);
        const res = await response.json();

        const availableItems = res.stocks
          .filter((stock) => stock.available)
          .map((stock) => ({
            value: stock.item_name,
            label: stock.item_name,
          }));

        // Optional: remove duplicates
        const uniqueItems = Array.from(
          new Map(availableItems.map((i) => [i.value, i])).values()
        );

        setPossibleItems(uniqueItems);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStocks();
  }, []);

  React.useEffect(() => {
    setRequesterId(user?.user?.username ?? "");
    setDepartment(user?.user?.department ?? "");
  }, [user?.user]);

  if (isLoading) {
    return (
      <div className="loadingParentDiv">
        <Loading />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!item || !quantity || !reason || !priority || !requesterId) {
      alert("Please fill all required fields");
      return;
    }

    await makeRequest({
      user_id: user?.user?.id,
      stock_id: stockId,
      item_name: item,
      quantity: parseInt(quantity),
      priority: priority,
      reason: reason,
      department: user?.user?.department,
    });
  };

  return (
    <div className="m-2">
      <form onSubmit={handleSubmit}>
        <BasicSelect
          label="Item Name"
          value={item}
          options={possibleItems}
          onChange={(value) => setItem(String(value))}
        />

        <div className="paralellInputs">
          <InputField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            error={error}
          />
          <BasicSelect
            label="Priority Level"
            value={priority}
            options={priorityLevels}
            onChange={(value) => setPriority(value as PriorityType)}
          />
        </div>

        <InputField
          label="Reasons for Requesting"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          error={error}
        />

        <div className="paralellInputs">
          <InputField label="User" value={requesterId} disabled />
          <InputField label="Department" value={department} disabled />
        </div>

        <div className="m-3">
          <AppButton
            disabled={loading}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Submit Request
          </AppButton>
        </div>
      </form>
    </div>
  );
}

export default NewRequest;
