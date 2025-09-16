export interface User {
  id: string
  empId: string
  name: string
  email: string
  role: "Admin" | "Manager" | "Staff (Central Store)" | "Staff (Department)" | "Supplier"
  dateOfBirth?: string
  createdAt: string
  updatedAt: string
}

export interface StockItem {
  id: string
  serialNumber: string
  itemName: string
  value: number
  unit: string
  weight: number
  status: "Available" | "Reserved" | "Out of Stock" | "Damaged"
  location?: string
  supplierId?: string
  createdAt: string
  updatedAt: string
}

export interface StockRequest {
  id: string
  serialNumber: string
  itemName: string
  value: number
  unit: string
  weight: number
  status: "Pending" | "Approved" | "Declined" | "In Process" | "Fulfilled"
  requestedBy: string
  requestedByName: string
  department: string
  approvedBy?: string
  approvedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Delivery {
  id: string
  serialNumber: string
  itemName: string
  value: number
  unit: string
  weight: number
  supplierId: string
  supplierName: string
  deliveryId: string
  receiptId: string
  status: "Pending" | "Received" | "Declined" | "Confirmed"
  deliveredAt: string
  confirmedAt?: string
}

export interface BlockchainLog {
  id: string
  serialNumber: string
  itemName: string
  timeApplied: string
  hash: string
  action: "Created" | "Updated" | "Approved" | "Declined" | "Delivered" | "Confirmed"
  user: string
  userId: string
  transactionId: string
}

export interface DashboardStats {
  approved: number
  declined: number
  inProcess: number
  totalUsers: number
  totalStockItems: number
  pendingRequests: number
  contractsExpiring: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  read: boolean
  createdAt: string
  userId?: string
}

export interface ContractStage {
  stage: string
  count: number
  percentage: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}
