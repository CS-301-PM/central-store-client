import { Link } from "react-router-dom";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import RequestsPage from "../../components/other/RequestPage";
import AppButton from "../../components/other/AppButton";

function Manager() {
  return (
    <div>
      <RequestTableHeader
        title="Manage department requests"
        subtitle="All pending and approved requests"
      >
        <Link to={"/central_store/stocks"}>
          <AppButton variant="contained" color="primary">
            Stocks
          </AppButton>
        </Link>
      </RequestTableHeader>
      <RequestsPage />
    </div>
  );
}

export default Manager;
