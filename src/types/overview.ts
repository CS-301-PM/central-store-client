export interface NotificationType {
  id: string;
  message: string;
  timestamp: string; // ISO string
}

export interface OverviewType {
  approved: number;
  declined: number;
  inProcess: number;
  notifications: NotificationType[];
}
