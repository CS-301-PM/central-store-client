// import { Link } from "react-router-dom";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import AppButton from "../../components/other/AppButton";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div>
      <RequestTableHeader
        title="Manager"
        subtitle="Overview of the management."
      >
        {/* <Link to={"/central_store/stocks"}>
          <AppButton variant="contained" color="primary">
            Stocks
          </AppButton>
        </Link> */}
      </RequestTableHeader>
      {/* Put the work below here */}
      <div className="chartsDiv">
        <div className="card chartA chart"></div>
        <div className="card chartB chart"></div>
        <div className="card chartC chart"></div>
        <div className="card chartD chart"></div>
      </div>
    </div>
  );
}

export default Dashboard;
