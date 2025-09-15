// import { Link } from "react-router-dom";
import RequestTableHeader from "../../components/other/RequestTableHeader";
// import AppButton from "../../components/other/AppButton";
import { Role } from "../../types/User";

function Logs({ role }: { role: Role }) {
  return (
    <div className="">
      <RequestTableHeader
        title="Blockchain Logs"
        subtitle="All trasactional logs"
      >
        {/* <Link to={"/"}>
          <AppButton variant="contained" color="primary">
            All requests
          </AppButton>
        </Link> */}
      </RequestTableHeader>
    </div>
  );
}

export default Logs;
