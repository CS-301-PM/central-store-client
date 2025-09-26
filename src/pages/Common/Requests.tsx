import { Link } from "react-router-dom";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import AppButton from "../../components/other/AppButton";
// import RequestsPage from "../../components/other/RequestPage";
import { Role } from "../../types/User";
import EnhancedTable from "../../components/other/RequestTable";

function Requests({ role }: { role: Role }) {
  // const { state, listAllStocks } = useStockManagementContext();
  // const { items } = state;

  // React.useEffect(() => {
  //   listAllStocks([]);
  // }, []);
  return (
    <div className="">
      <RequestTableHeader
        title="Department requests"
        subtitle="All pending and approved requests"
      >
        <Link
          to={
            role === "DEPARTMENT_DEAN"
              ? "/department/new_request"
              : role === "STORES_MANAGER"
              ? "/manager"
              : ""
          }
        >
          <AppButton variant="contained" color="primary">
            {role === "DEPARTMENT_DEAN" ? "Make Request" : "All"}
          </AppButton>
        </Link>
      </RequestTableHeader>
      {/* <RequestsPage /> */}
      <EnhancedTable role={role} />
    </div>
  );
}

export default Requests;
