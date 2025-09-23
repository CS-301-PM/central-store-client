import { useUserContext } from "../../hooks/UserContextHook";
import React, { useEffect } from "react";
import AppButton from "../../components/other/AppButton";
import InputField from "../../components/other/InputFild";
import BasicSelect from "../../components/other/BasicSelector";
import {
  departmentOptions,
  Role,
  roleOptionsForUserRegistration,
} from "../../types/User";
import { FetchedUser } from "../../types/auth";

interface NewUserProps {
  userToUpdate?: FetchedUser;
  isNew?: boolean;
}

function NewUserForm({ isNew = true, userToUpdate }: NewUserProps) {
  const { addUser, updateUser, isLoading } = useUserContext();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setusername] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [userRole, setUserRole] = React.useState(
    roleOptionsForUserRegistration[1].value
  );

  const [department, setDepartment] = React.useState(
    departmentOptions[0].value
  );
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string | null>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!username) newErrors.username = "Employee ID is required";
    if (!email) newErrors.email = "Email is required";

    if (isNew) {
      if (!password) newErrors.password = "Password is required";
    }
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (isNew) {
        await addUser({
          first_name: firstName,
          last_name: lastName,
          role: userRole as Role,
          username,
          password,
          email,
          department,
          is_staff: true,
        });
      } else {
        // alert(111);
        await updateUser({
          first_name: firstName,
          last_name: lastName,
          username: username,
          role: userRole as Role,
          email: email,
          id: userToUpdate?.id,
          is_staff: userToUpdate?.is_staff,
          department: department,
          blockchain_address: userToUpdate?.blockchain_address,
          phone_number: userToUpdate?.phone_number,
          ...(password ? { password } : {}),
        });
      }
    }
  };

  useEffect(() => {
    if (!isNew && userToUpdate) {
      setFirstName(userToUpdate.first_name);
      setLastName(userToUpdate.last_name);
      setusername(userToUpdate.username);
      setUserRole(userToUpdate.role);
      setDepartment(userToUpdate.department || departmentOptions[0].value);
      setEmail(userToUpdate.email || "");
    }
  }, [isNew, userToUpdate]);

  return (
    <div>
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
          value={username}
          onChange={(e) => setusername(e.target.value)}
          error={errors.username || null}
        />
        <InputField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email || null}
        />

        <BasicSelect
          label="Role"
          value={userRole}
          options={roleOptionsForUserRegistration}
          onChange={(val) => setUserRole(String(val) as Role)}
        />

        {userRole === "DEPARTMENT_DEAN" && (
          <BasicSelect
            label="Department"
            value={department}
            options={departmentOptions}
            onChange={(val) => setDepartment(String(val))}
          />
        )}

        {isNew === true && (
          <>
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
          </>
        )}

        <div className="m-2">
          <AppButton
            disabled={isLoading}
            variant="contained"
            color="warning"
            type="submit"
          >
            {isNew ? "REGISTER" : "UPDATE"}
          </AppButton>
        </div>
      </form>
    </div>
  );
}

export default NewUserForm;
