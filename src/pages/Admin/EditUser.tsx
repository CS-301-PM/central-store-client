import * as React from "react";
import AppButton from "../../components/other/AppButton";
import InputField from "../../components/other/InputFild";
import { useUserContext } from "../../hooks/UserContextHook";
import BasicSelect from "../../components/other/BasicSelector";
import {
  departmentOptions,
  Role,
  roleOptionsForUserRegistration,
} from "../../types/User";
import { FetchedUser } from "../../types/auth";

interface EditUserProps {
  userToUpdate: FetchedUser;
}

function EditUser({ userToUpdate }: EditUserProps) {
  const { isLoading, updateUser } = useUserContext();

  const [firstname, setFirstname] = React.useState(
    userToUpdate.firstName || ""
  );
  const [lastname, setLastname] = React.useState(userToUpdate.lastName || "");
  const [email, setEmail] = React.useState(userToUpdate.email || "");
  const [department, setDepartment] = React.useState(userToUpdate.department);
  const [userRole, setUserRole] = React.useState(userToUpdate.role || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({
      ...userToUpdate,
      firstName: firstname,
      lastName: lastname,
      email,
      role: userRole,
      department,
    });
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <InputField
          label="Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          //   error={errors.firstname || null}
        />
        <InputField
          label="Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          //   error={errors.employeeId || null}
        />
        <InputField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          //   error={errors.employeeId || null}
        />
        <div className="mb-3 mt-3 selectorWidth">
          <BasicSelect
            label="Department"
            value={department}
            options={departmentOptions}
            onChange={(val) => setDepartment(String(val))}
          />
        </div>

        <div className="mb-1 selectorWidth">
          <BasicSelect
            label="Role"
            value={userRole}
            options={roleOptionsForUserRegistration}
            onChange={(val) => setUserRole(String(val) as Role)}
          />
        </div>
        <div className="m-2">
          <AppButton
            disabled={isLoading}
            variant="contained"
            color="secondary"
            type="submit"
          >
            SAVE
          </AppButton>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
