import * as React from "react";
import InputField from "../../components/other/InputFild";
import AppButton from "../../components/other/AppButton";
import "./loginForm.css";
import { useUserContext } from "../../hooks/UserContextHook";

function LoginForm() {
  const [employeeId, setEmployeeId] = React.useState("admin");
  const [password, setPassword] = React.useState("11111111");
  const [errors, setErrors] = React.useState<{
    employeeId?: string;
    password?: string;
  }>({});
  const { isLoading, signIn, error } = useUserContext();

  const validate = () => {
    const newErrors: { employeeId?: string; password?: string } = {};

    if (!employeeId.trim()) {
      newErrors.employeeId = "Employee ID is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await signIn({ username: employeeId, password });
    // window.location.reload(true);
    // TODO: Add login logic (API call, context update, etc.)
  };

  return (
    <div className="containerx authContainer">
      <div className="authInnerContainer">
        <form onSubmit={handleSubmit} className="authRightBox">
          <InputField
            label="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            error={errors.employeeId || null}
          />

          <InputField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showToggle={true}
            error={errors.password || null}
          />

          <div className="m-2">
            <AppButton
              disabled={isLoading}
              variant="outlined"
              color="primary"
              type="submit"
            >
              LOGIN
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
