import { useState } from "react";
import {
  Check,
  Clock,
  X,
  AlertCircle,
  User,
  Calendar,
  MessageCircle,
} from "lucide-react";

// --- Types ---
export type StepStatus = "pending" | "approved" | "rejected" | "locked";

export interface ApprovalStepData {
  id: string;
  role: string;
  status: StepStatus;
  approverName?: string | null;
  nodeAddress: string;
  timestamp?: string | null;
  rejectionReason?: string | null;
  blockchainTxId?: string | null;
}

interface ApprovalStepProps {
  step: ApprovalStepData;
  isActive: boolean;
  isLast: boolean;
  onApprove: (stepId: string) => void;
  onReject: (stepId: string, reason: string) => void;
}

interface ApprovalChainProps {
  title: string;
  steps: ApprovalStepData[];
  onStepAction?: (
    stepId: string,
    action: StepStatus,
    reason?: string,
    blockchainTxId?: string
  ) => void;
  currentUserRole: string;
  isRestock?: boolean;
  restockParent?: string | null;
  isReadOnly?: boolean;
}

// --- Status Configurations ---
const STATUS_CONFIG: Record<
  StepStatus,
  { icon: any; color: string; bgColor: string; borderColor: string }
> = {
  pending: {
    icon: Clock,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  approved: {
    icon: Check,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  rejected: {
    icon: X,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  locked: {
    icon: AlertCircle,
    color: "text-gray-400",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
  },
};

// --- Individual Approval Step ---
const ApprovalStep: React.FC<ApprovalStepProps> = ({
  step,
  isActive,
  isLast,
  onApprove,
  onReject,
}) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const config = STATUS_CONFIG[step.status];
  const IconComponent = config.icon;
  const isActionable = isActive && step.status === "pending";

  const formatTimestamp = (timestamp?: string) =>
    timestamp
      ? new Date(timestamp).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

  const handleReject = () => {
    if (rejectReason.trim()) {
      onReject(step.id, rejectReason.trim());
      setRejectReason("");
      setShowRejectModal(false);
    }
  };

  return (
    <div className="relative">
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200" />
      )}

      <div
        className={`flex items-start space-x-4 p-4 rounded-lg border transition-all duration-200 ${
          config.bgColor
        } ${config.borderColor} ${isActionable ? "shadow-md" : "shadow-sm"}`}
      >
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${config.borderColor} bg-white`}
        >
          <IconComponent className={`w-6 h-6 ${config.color}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{step.role}</h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${config.color} ${config.bgColor} border ${config.borderColor}`}
            >
              {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
            </span>
          </div>

          {(step.approverName || step.nodeAddress) && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <User className="w-4 h-4" />
              <span>
                {step.status === "approved" ? "Approved" : "Rejected"} by{" "}
                {step.approverName ?? step.nodeAddress}
              </span>
            </div>
          )}

          {step.status === "rejected" && step.rejectionReason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2">
              <div className="flex items-start space-x-2">
                <MessageCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-700">
                    Rejection Reason:
                  </p>
                  <p className="text-sm text-red-600 mt-1">
                    {step.rejectionReason}
                  </p>
                </div>
              </div>
            </div>
          )}

          {step.timestamp && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
              <Calendar className="w-4 h-4" />
              <span>{formatTimestamp(step.timestamp)}</span>
            </div>
          )}

          {step.blockchainTxId && (
            <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
              <span>Tx: {step.blockchainTxId}</span>
            </div>
          )}

          {isActionable && (
            <div className="flex space-x-3">
              <button
                onClick={() => onApprove(step.id)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg flex items-center space-x-2 transition-colors duration-200"
              >
                <Check className="w-4 h-4" />
                <span>Approve</span>
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg flex items-center space-x-2 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </div>
          )}

          {step.status === "locked" && (
            <p className="text-sm text-gray-500 italic">
              Locked until previous approvals are completed
            </p>
          )}
        </div>
      </div>

      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Reject Request
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Please provide a reason for rejecting this request.
              </p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter rejection reason..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                rows={4}
                autoFocus
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectReason("");
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={!rejectReason.trim()}
                  className={`px-4 py-2 text-white rounded-lg ${
                    rejectReason.trim()
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-red-300 cursor-not-allowed"
                  }`}
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Approval Chain ---
const ApprovalChain: React.FC<ApprovalChainProps> = ({
  title,
  steps,
  onStepAction,
  currentUserRole,
  isRestock = false,
  restockParent = null,
  isReadOnly = false,
}) => {
  const currentStepIndex =
    steps?.findIndex((step) => step.status === "pending") ?? -1;
  const isDepartmentUser = currentUserRole?.includes("Department");

  const handleApprove = (stepId: string) => onStepAction?.(stepId, "approved");
  const handleReject = (stepId: string, reason: string) =>
    onStepAction?.(stepId, "rejected", reason);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isRestock && <div className="text-2xl">🔄</div>}
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>
          {(isDepartmentUser || isReadOnly) && (
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
              👁️ View Only
            </div>
          )}
        </div>
        {isRestock && restockParent && (
          <p className="text-sm text-amber-600 mt-2 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
            Restock triggered by {restockParent}
          </p>
        )}
        {isDepartmentUser && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Department View:</span> You can
              track the approval progress but cannot take actions on this
              request.
            </p>
          </div>
        )}
      </div>

      {/* Steps */}
      <div className="flex flex-col space-y-4">
        {steps?.map((step, index) => {
          const isActive =
            !isDepartmentUser &&
            !isReadOnly &&
            currentUserRole === step.role &&
            index === currentStepIndex;
          const isLast = index === steps.length - 1;
          return (
            <ApprovalStep
              key={step.id}
              step={step}
              isActive={isActive}
              isLast={isLast}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ApprovalChain;
