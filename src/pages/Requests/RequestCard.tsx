import { useState } from "react";
import AppButton from "../../components/other/AppButton";
import DetailsModal from "../../components/other/DetailsModal";
import { useUserContext } from "../../hooks/UserContextHook";
import { useApprovalManagementContext } from "../../hooks/useApprovalContext";

const roleLabels: Record<string, string> = {
  STORES_MANAGER: "Stores Manager",
  PROCUREMENT_OFFICER: "Procurement Officer",
  CFO: "Chief Financial Officer",
};

function RequestCard({ request }) {
  const { user } = useUserContext();
  const userRole = user?.user?.role;
  const [open, setOpen] = useState(false);

  console.log(request);

  const {
    approvals = { all: [], pending: [], approved: [], rejected: [] },
    approve,
    reject,
  } = useApprovalManagementContext();

  // Get latest request from approvals context
  const updatedRequest =
    approvals.all?.find((r) => r.id === request.id) || request;

  const steps = updatedRequest.ApprovalSteps || [];
  const currentIndex = steps.findIndex((s) => s.status === "PENDING");
  const isCurrentStep = steps[currentIndex]?.role === userRole;

  const handleApprove = async () => approve(updatedRequest.id);
  const handleReject = async (reason) => reject(updatedRequest.id, reason);

  return (
    <div className="w-full mb-4 rounded-xl border border-gray-200 bg-white shadow hover:shadow-md transition">
      {/* Header */}
      <div className="flex justify-between items-center border-b p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {updatedRequest.item_name}
        </h2>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            updatedRequest.status === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : updatedRequest.status === "APPROVED"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {updatedRequest.status}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-2 text-sm text-gray-600">
        <div className="flex gap-6 flex-wrap">
          <div>
            <span className="font-medium">Quantity:</span>{" "}
            {updatedRequest.quantity}
          </div>
          <div>
            <span className="font-medium">Priority:</span>{" "}
            <span
              className={`font-semibold ${
                updatedRequest.priority === "HIGH"
                  ? "text-red-600"
                  : updatedRequest.priority === "MEDIUM"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {updatedRequest.priority}
            </span>
          </div>
          <div>
            <span className="font-medium">Department:</span>{" "}
            {updatedRequest.department}
          </div>
        </div>

        <div className="mt-2">
          <span className="font-high"></span> {updatedRequest.reason}
        </div>

        {/* Show rejection reason if status = REJECTED */}
        {updatedRequest.status === "REJECTED" &&
          updatedRequest.rejection_reason && (
            <div className="mt-2 p-2 bg-red-50 text-red-700 rounded">
              <span className="font-medium">Rejection Reason:</span>{" "}
              {updatedRequest.rejection_reason}
            </div>
          )}

        {/* Action Buttons */}
        {isCurrentStep && updatedRequest.status === "PENDING" && (
          <div className="flex gap-3 mt-4">
            <AppButton
              color="success"
              onClick={handleApprove}
              variant="contained"
            >
              Approve
            </AppButton>
            <AppButton
              color="error"
              onClick={() => setOpen(true)}
              variant="contained"
            >
              Reject
            </AppButton>
          </div>
        )}
      </div>

      {/* Footer / Approval Steps */}
      <div className="flex justify-between items-center border-t p-4 text-xs text-gray-500">
        {updatedRequest.type === "CONSUMPTION" ? (
          <div className="flex gap-2 flex-wrap">
            {steps.slice(0, 1).map((step) => {
              let badgeStyle = "";
              let icon = "";
              const label = roleLabels[step.role] || step.role;

              if (step.status === "APPROVED") {
                badgeStyle = "bg-green-100 text-green-700";
                icon = "✅";
              } else if (step.status === "REJECTED") {
                badgeStyle = "bg-red-100 text-red-700";
                icon = "❌";
              } else {
                badgeStyle = "bg-yellow-100 text-yellow-700";
                icon = "⏳";
              }

              return (
                <span
                  key={step.id}
                  className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${badgeStyle}`}
                  title={
                    step.status === "REJECTED" ? step.rejection_reason : ""
                  }
                >
                  {icon} {label}
                </span>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {steps.map((step, idx) => {
              let badgeStyle = "";
              let icon = "";
              const label = roleLabels[step.role] || step.role;

              if (idx < currentIndex) {
                if (step.status === "APPROVED") {
                  badgeStyle = "bg-green-100 text-green-700";
                  icon = "✅";
                } else {
                  badgeStyle = "bg-red-100 text-red-700";
                  icon = "❌";
                }
              } else if (idx === currentIndex) {
                badgeStyle = "bg-yellow-100 text-yellow-700";
                icon = "⏳";
              } else {
                badgeStyle = "bg-gray-200 text-gray-500";
                icon = "🔒";
              }

              return (
                <span
                  key={step.id}
                  className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${badgeStyle}`}
                  title={
                    step.status === "REJECTED" ? step.rejection_reason : ""
                  }
                >
                  {icon} {label}
                </span>
              );
            })}
          </div>
        )}

        <div>{new Date(updatedRequest.created_at).toLocaleString()}</div>
      </div>

      {/* Rejection Modal */}
      {open && (
        <DetailsModal
          open={open}
          onClose={() => setOpen(false)}
          title="Reason for rejecting"
          closeLabel="Cancel"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const reason = e.target.reason.value;
              handleReject(reason);
              setOpen(false);
            }}
            className="space-y-3"
          >
            <textarea
              name="reason"
              placeholder="Enter reason for rejection"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400"
              rows={4}
              required
            />
            <AppButton type="submit" color="error" variant="contained">
              Reject Request
            </AppButton>
          </form>
        </DetailsModal>
      )}
    </div>
  );
}

export default RequestCard;
