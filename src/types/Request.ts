export type StatusType =
  | "pending"
  | "approved"
  | "rejected"
  | "waiting for supply"
  | "in progress"
  | "fulfilled";

export type PriorityType = "Low" | "Medium" | "High";

export const priorityLevels: { value: PriorityType; label: string }[] = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export const statusOptions: { value: StatusType | "All"; label: string }[] = [
  { value: "All", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "in progress", label: "In Progress" },
  { value: "fulfilled", label: "Fulfilled" },
  { value: "waiting for supply", label: "Waiting" },
  { value: "rejected", label: "Rejected" },
];

export const priorityOptions: { value: PriorityType | "All"; label: string }[] =
  [
    { value: "All", label: "All Priorities" },
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

export type RequestObj = {
  item: string;
  quantity: number;
  priority: PriorityType;
  reason: string;
  from: {
    userId?: string;
    departmentName?: string;
    departmentId?: string;
  };
};

export type FetchedRequestObj = {
  requestId: string;
  blockchainId?: string;
  item: string;
  quantity: number;
  priority: PriorityType;
  reason: string;
  status: StatusType;
  from: {
    userId?: string;
    departmentId?: string;
    departmentName?: string;
  };
  createdAt?: string;
  updatedAt?: string;
};
