import * as React from "react";
import InputField from "../../components/other/InputFild";
import AppButton from "../../components/other/AppButton";
import BasicSelect from "../../components/other/BasicSelector";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import { Link } from "react-router-dom";
import { useUserContext } from "../../hooks/UserContextHook";
import Loading from "../../components/other/Loading";
import { priorityLevels, PriorityType } from "../../types/Request";
import { useRequestManagementContext } from "../../hooks/useRequestHook";
// import { useStockManagementContext } from "../../hooks/useStockManagementContext";

function NewRequest() {
  const [item, setItem] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [priority, setPriority] = React.useState<PriorityType>("Low");
  const [requesterId, setRequesterId] = React.useState("");
  const [department, setDepartment] = React.useState("Finance");
  const [stockId, setStockId] = React.useState("1");

  const { user, isLoading } = useUserContext();
  const { makeRequest, state } = useRequestManagementContext();
  // const { listAllStocks,} = useStockManagementContext();

  const { requests, loading, error } = state;

  React.useEffect(() => {
    setRequesterId(user?.user?.username ?? "");
    setDepartment(user?.user?.department ?? "");
    // listAllStocks();
  }, [user?.user]);

  if (isLoading) {
    return (
      <div className="loadingParentDiv">
        <Loading />
      </div>
    );
  }

  const possibleItems = [
    { value: "A4 Books", label: "A4 Books" },
    { value: "Pens", label: "Pens" },
    { value: "Notebooks", label: "Notebooks" },
    { value: "Staplers", label: "Staplers" },
    { value: "Markers", label: "Markers" },
  ];

  // console.log(state);

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
      //   "blockchain_address": "0x123abc456def"
    });
    // setItem("");
    // setQuantity("");
    // setReason("");
    // setPriority("LOW");
    // setRequesterId("");
  };

  return (
    <div className="m-2">
      <RequestTableHeader
        title="Make a new request"
        subtitle="Here you can create and make a new request"
      >
        <Link to={"/department/requests"}>
          <AppButton variant="contained" color="primary">
            All requests
          </AppButton>
        </Link>
      </RequestTableHeader>

      <form className="" onSubmit={handleSubmit}>
        <div className="">
          <div className="">
            <BasicSelect
              label="Item Name"
              value={item}
              options={possibleItems}
              onChange={(value) => setItem(String(value))}
            />
          </div>

          <div className="">
            <InputField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              error={error}
            />
          </div>

          <div className="">
            <BasicSelect
              label="Priority Level"
              value={priority}
              options={priorityLevels}
              onChange={(value) => setPriority(value as PriorityType)}
            />
          </div>

          <div className="">
            <InputField
              label="Reasons for Requesting"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              error={error}
            />
          </div>

          <div className="">
            <InputField
              label="Requester ID"
              value={requesterId}
              disabled={true}
            />
          </div>

          <div className="">
            <InputField label="Departmtnt" value={department} disabled={true} />
          </div>
        </div>

        <div className="m-2">
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
