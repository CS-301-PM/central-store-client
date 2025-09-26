import RequestTableHeader from "../../components/other/RequestTableHeader";
import UsersTablePage from "./Users";
import ReusableModal from "../../components/other/Modal";
import NewUserForm from "../Auth/NewUserForm";

function Admin() {
  return (
    <div className="">
      <RequestTableHeader
        title="User Management"
        subtitle="View, create, and manage all registered users."
      >
        <ReusableModal
          color="primary"
          variant={"contained"}
          buttonLabel="New User"
          title="Add a New User"
        >
          <NewUserForm isNew={true} />
        </ReusableModal>
      </RequestTableHeader>

      <div className="mt-5">
        <UsersTablePage />
      </div>
    </div>
  );
}

export default Admin;
