import { Role } from "./User";

export type StatusType =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "FULFILLED"
  | "IN PROGRESS";

// Now use them in your interface
export interface Request {
  item_name: string;
  quantity: number;
  priority: PriorityType;
  reason: string;
  status: StatusType;
}

// export type StatusType =
//   | "pending"
//   | "approved"
//   | "rejected"
//   | "waiting for supply"
//   | "in progress"
//   | "fulfilled";

export type PriorityType =
  // | "Low"
  // | "Medium"
  // | "High"
  "LOW" | "MEDIUM" | "HIGH";

export const priorityLevels: { value: PriorityType; label: string }[] = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
];

export const statusOptions: { value: StatusType | "All"; label: string }[] = [
  // { value: "All", label: "All Statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "IN PROGRESS", label: "In Progress" },
  { value: "FULFILLED", label: "Fulfilled" },
  // { value: "waiting for supply", label: "Waiting" },
  { value: "REJECTED", label: "Rejected" },
];

export const priorityOptions: { value: PriorityType | "All"; label: string }[] =
  [
    // { value: "All", label: "All Priorities" },
    { value: "LOW", label: "Low" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HIGH", label: "High" },
  ];

// export type RequestObj = {
//   item: string;
//   quantity: number;
//   priority: PriorityType;
//   reason: string;
//   from: {
//     userId?: string;
//     departmentName?: string;
//   };
// };

export type FetchedRequestObj = {
  id?: string; //*
  user_id?: string;
  item?: string; //*
  quantity?: number; //*
  priority?: PriorityType; //*
  reason?: string; //*
  status?: StatusType; //*
  department?: Role; //*
  createdAt?: string;
  updatedAt?: string;
};

export type RequestItem = {
  product_name: string;
  quantity: number;
  unit_price: string; // or number if you parse it
  total_price: string; // or number
  specifications: string;
};

// export type FetchedRequestObj = {
//   id: number;
//   title: string;
//   description: string;
//   urgency: "HIGH" | "MEDIUM" | "LOW"; // adjust if needed
//   status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED"; // adjust based on your app
//   total_estimated_cost: string; // or number
//   requested_by: number;
//   requested_by_name: string;
//   department: string | null;
//   created_at: string; // ISO string
//   updated_at: string; // ISO string
//   items: RequestItem[];
// };

export type RequestObj = {
  item_name: string;
  quantity: number;
  priority: PriorityType;
  reason: string;
  status: StatusType;
  requester_id: string;
};
