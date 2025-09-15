import { StatusType } from "../../types/Request";
import AppButton from "./AppButton";

type Props = {
  status: StatusType;
};

function RequestStatusButton({ status }: Props) {
  return (
    <AppButton variant="outlined" color="primary" type="button">
      {status}
    </AppButton>
  );
}

export default RequestStatusButton;
