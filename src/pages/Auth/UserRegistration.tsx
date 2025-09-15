import React from "react";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import { Link } from "react-router-dom";
import AppButton from "../../components/other/AppButton";
import InputField from "../../components/other/InputFild";
import BasicSelect from "../../components/other/BasicSelector";
import {
  departmentOptions,
  Role,
  roleOptionsForUserRegistration,
} from "../../types/User";

import "./loginForm.css";
import { useUserContext } from "../../hooks/UserContextHook";
import UsersTablePage from "../Admin/Users";

export default function UserRegistration({ role }: { role: Role }) {
  const { addUser, isLoading, user } = useUserContext();

  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [employeeId, setEmployeeId] = React.useState("");
  const [department, setDepartment] = React.useState(
    departmentOptions[0].value
  );
  const [userRole, setUserRole] = React.useState(
    roleOptionsForUserRegistration[1].value
  );
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string | null>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!employeeId) newErrors.employeeId = "Employee ID is required";
    if (!password) newErrors.password = "Password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // alert(
      //   `User registered:\nName: ${firstName}\nEmployee ID: ${employeeId}\nDepartment: ${department}\nRole: ${role}`
      // );

      await addUser({
        firstname: firstName,
        lastname: lastName,
        role: role as import("../../types/User").Role,
        employeeId,
        password,
      });

      // setFirstName("");
      // setEmployeeId("");
      // setDepartment(departmentOptions[0].value);
      // setUserRole(roleOptionsForUserRegistration[1].value);
      // setPassword("");
      // setConfirmPassword("");
    }
  };

  if (
    user &&
    user.user?.role !== "ADMIN" &&
    user &&
    user.user?.role !== "STORES_MANAGER"
  ) {
    return;
  }
  return (
    <div>
      <RequestTableHeader
        title="User Registration"
        subtitle="Register a new system user."
      >
        <Link to={"/admin"}>
          <AppButton variant="contained" color="primary">
            Back to Users
          </AppButton>
        </Link>
      </RequestTableHeader>
      <div className="userRegistartionFormPreview">
        <div className="usersTablePreview mt-4">
          <UsersTablePage role={role} />
        </div>
        <div className="userRegistrationForm">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-4 max-w-md"
          >
            <InputField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errors.firstName || null}
            />
            <InputField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors.lastName || null}
            />

            <InputField
              label="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              error={errors.employeeId || null}
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

            <InputField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showToggle
              error={errors.password || null}
            />

            <InputField
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              showToggle
              error={errors.confirmPassword || null}
            />

            <div className="m-2">
              <AppButton
                disabled={isLoading}
                variant="contained"
                color="warning"
                type="submit"
              >
                Register
              </AppButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
