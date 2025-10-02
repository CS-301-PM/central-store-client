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
  approvals: { all: []; pending: []; approved: []; rejected: [] };
  loading: boolean;
  error: string | null;
};

export type ApprovalAction =
  | { type: typeof PENDING; payload: any }
  | { type: typeof APPROVE; payload: any }
  | { type: typeof REJECT; payload: any }
  | { type: typeof LOADING }
  | { type: typeof ERROR; payload: string };

export const initialState: ApprovalState = {
  approvals: { all: [], pending: [], approved: [], rejected: [] },
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
      // Replace the current approvals (expects { all, pending, approved, rejected })
      return { ...state, loading: false, approvals: { ...action.payload } };

    case APPROVE: {
      const updated = { ...state.approvals };

      // Remove from pending
      updated.pending = updated.pending.filter(
        (a) => a.id !== action.payload.step.request_id
      );
      // Add to approved
      updated.approved = [...updated.approved, action.payload];

      // Update in all
      updated.all = updated.all.map((a) =>
        a.id === action.payload.step.request_id ? action.payload : a
      );

      return { ...state, loading: false, approvals: updated };
    }

    case REJECT: {
      const updated = { ...state.approvals };

      // Remove from pending
      updated.pending = updated.pending.filter(
        (a) => a.id !== action.payload.step.request_id
      );

      // Add to rejected
      updated.rejected = [...updated.rejected, action.payload];

      // Update in all
      // updated.all = updated.all.map((a) =>
      //   a.id === action.payload.step.request_id ? action.payload : a
      // );

      return { ...state, loading: false, approvals: updated };
    }

    default:
      return state;
  }
};

// export const approvalReducer = (
//   state: ApprovalState,
//   action: ApprovalAction
// ): ApprovalState => {
//   switch (action.type) {
//     case LOADING:
//       return { ...state, loading: true, error: null };

//     case ERROR:
//       return { ...state, loading: false, error: action.payload };

//     case PENDING:
//       return {
//         ...state,
//         loading: false,
//         approvals: { ...action.payload }, // expects { all, pending, approved, rejected }
//       };

//     case APPROVE: {
//       const updated = { ...state.approvals };
//       // Find and move the approval from pending → approved
//       updated.pending = updated.pending.filter(
//         (a) => a.id !== action.payload.id
//       );
//       updated.approved = [...updated.approved, action.payload];
//       updated.all = updated.all.map((a) =>
//         a.id === action.payload.id ? action.payload : a
//       );
//       return { ...state, loading: false, approvals: updated };
//     }

//     case REJECT: {
//       const updated = { ...state.approvals };
//       // Find and move the approval from pending → rejected
//       updated.pending = updated.pending.filter(
//         (a) => a.id !== action.payload.id
//       );
//       updated.rejected = [...updated.rejected, action.payload];
//       updated.all = updated.all.map((a) =>
//         a.id === action.payload.id ? action.payload : a
//       );
//       return { ...state, loading: false, approvals: updated };
//     }

//     default:
//       return state;
//   }
// };

// export const approvalReducer = (
//   state: ApprovalState,
//   action: ApprovalAction
// ): ApprovalState => {
//   switch (action.type) {
//     case LOADING:
//       return { ...state, loading: true, error: null };

//     case ERROR:
//       return { ...state, loading: false, error: action.payload };

//     case PENDING:
//       return {
//         ...state,
//         loading: false,
//         approvals: { ...action.payload },
//       };

//     case APPROVE:
//       console.log(state);
//       console.log(action.payload);

//       return {
//         ...state,
//         loading: false,
//         // approvals: state.approvals.map((a) =>
//         //   a.id === action.payload.id ? action.payload : a
//         // ),
//       };

//     case REJECT:
//       return {
//         ...state,
//         loading: false,
//         // approvals: state.approvals.filter((a) => a.id !== action.payload.id),
//       };

//     default:
//       return state;
//   }
// };
