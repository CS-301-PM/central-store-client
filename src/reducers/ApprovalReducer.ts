export const PENDING = "PENDING";
export const APPROVE = "APPROVE";
export const REJECT = "REJECT";
export const LOADING = "LOADING";
export const ERROR = "ERROR";

export type Approval = {
  id: number;
  item_name: string;
  quantity: number;
  priority: string;
  reason: string;
  department: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  created_at: string;
};

export type ApprovalState = {
  approvals: Approval[];
  loading: boolean;
  error: string | null;
};

export type ApprovalAction =
  | { type: typeof PENDING; payload: Approval[] }
  | { type: typeof APPROVE; payload: Approval }
  | { type: typeof REJECT; payload: Approval }
  | { type: typeof LOADING }
  | { type: typeof ERROR; payload: string };

export const initialState: ApprovalState = {
  approvals: [],
  loading: false,
  error: null,
};

export const approvalReducer = (
  state: ApprovalState,
  action: ApprovalAction
): ApprovalState => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true, error: null };

    case ERROR:
      return { ...state, loading: false, error: action.payload };

    case PENDING:
      return { ...state, loading: false, approvals: action.payload };

    case APPROVE:
      return {
        ...state,
        loading: false,
        approvals: state.approvals.map((a) =>
          a.id === action.payload.id ? action.payload : a
        ),
      };

    case REJECT:
      return {
        ...state,
        loading: false,
        approvals: state.approvals.filter((a) => a.id !== action.payload.id),
      };

    default:
      return state;
  }
};
