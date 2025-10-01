import RequestTableHeader from "../../components/other/RequestTableHeader";
import Requests from "../Common/Requests";
// import { Link } from "react-router-dom";
// import AppButton from "../../components/other/AppButton";

function Funds() {
  return (
    <div className="">
      <RequestTableHeader
        title="Financial operations"
        subtitle="Review and authorize budget officer requests"
      />
      <Requests role="CFO" />
    </div>
  );
}

export default Funds;

// import { useState } from "react";
// import { Box, Button, Modal, Typography } from "@mui/material";
// import RequestTableHeader from "../../components/other/RequestTableHeader";

// type Request = {
//   id: number;
//   request: {
//     title: string;
//     description: string;
//     priority: string;
//     items: { product_detail: { name: string }; quantity: number }[];
//   };
//   requested_by_username: string;
//   status: string;
// };

// const style = {
//   position: "absolute" as const,
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   borderRadius: 2,
//   boxShadow: 24,
//   p: 4,
// };

// function Funds() {
//   const mockRequests: Request[] = [
//     {
//       id: 1,
//       request: {
//         title: "Computer Lab Equipment",
//         description: "Request for 10 new desktop computers for Lab 3.",
//         priority: "High",
//         items: [
//           { product_detail: { name: "Desktop Computer" }, quantity: 10 },
//           { product_detail: { name: "UPS Units" }, quantity: 5 },
//         ],
//       },
//       requested_by_username: "Procurement Officer",
//       status: "Pending CFO Approval",
//     },
//     {
//       id: 2,
//       request: {
//         title: "Stationery Refill",
//         description: "Need pens, markers, and notebooks for Semester Exams.",
//         priority: "Medium",
//         items: [
//           { product_detail: { name: "Pens" }, quantity: 200 },
//           { product_detail: { name: "Notebooks" }, quantity: 150 },
//         ],
//       },
//       requested_by_username: "Procurement Officer",
//       status: "Pending CFO Approval",
//     },
//   ];

//   const [requests, setRequests] = useState<Request[]>(mockRequests);
//   const [open, setOpen] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
//   const [comment, setComment] = useState("");

//   const handleClose = () => {
//     setOpen(false);
//     setComment("");
//     setSelectedRequest(null);
//   };

//   // Call backend API
//   const sendToBackend = async (
//     requestId: number,
//     status: "APPROVED" | "REJECTED",
//     reason?: string
//   ) => {
//     try {
//       // const response = await fetch(/api/requests/${requestId}/decision, {
//       // 	method: "POST",
//       // 	headers: { "Content-Type": "application/json" },
//       // 	body: JSON.stringify({ status, reason }),
//       // });

//       // if (!response.ok) throw new Error("Failed to update request");

//       console.log(" Backend updated:", { requestId, status, reason });
//     } catch (error) {
//       console.error(" API error:", error);
//     }
//   };

//   const handleApprove = (req: Request) => {
//     sendToBackend(req.id, "APPROVED");
//     setRequests((prev) => prev.filter((r) => r.id !== req.id));
//     // alert(Request "${req.request.title}" has been approved.);
//   };

//   const handleReject = () => {
//     if (selectedRequest) {
//       sendToBackend(selectedRequest.id, "REJECTED", comment);
//       setRequests((prev) => prev.filter((r) => r.id !== selectedRequest.id));
//       alert();
//       // Request "${selectedRequest.request.title}" has been rejected.\nReason: ${comment}
//     }
//     handleClose();
//   };

//   return (
//     <div className="p-4">
//       <RequestTableHeader
//         title="Financial operations"
//         subtitle="Review and authorize procurement officer requests"
//       />

//       <table className="min-w-full border border-gray-300 text-sm mt-4">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 border">Request Title</th>
//             <th className="p-2 border">Requested By</th>
//             <th className="p-2 border">Priority</th>
//             <th className="p-2 border">Status</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requests.map((req) => (
//             <tr key={req.id}>
//               <td className="p-2 border">{req.request.title}</td>
//               <td className="p-2 border">{req.requested_by_username}</td>
//               <td className="p-2 border">{req.request.priority}</td>
//               <td className="p-2 border">{req.status}</td>
//               <td className="p-2 border flex gap-2">
//                 <Button
//                   size="small"
//                   variant="contained"
//                   color="success"
//                   onClick={() => handleApprove(req)}
//                 >
//                   Approve
//                 </Button>
//                 <Button
//                   size="small"
//                   variant="contained"
//                   color="error"
//                   onClick={() => {
//                     setSelectedRequest(req);
//                     setOpen(true);
//                   }}
//                 >
//                   Reject
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Reject Modal */}
//       <Modal open={open} onClose={handleClose}>
//         <Box sx={style}>
//           <Typography variant="h6" gutterBottom>
//             Reject Request
//           </Typography>
//           {selectedRequest && (
//             <>
//               <Typography variant="body2" sx={{ mb: 2 }}>
//                 {selectedRequest.request.title} —{" "}
//                 {selectedRequest.request.description}
//               </Typography>
//               <textarea
//                 placeholder="Enter reason for rejection"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 style={{
//                   width: "100%",
//                   minHeight: "80px",
//                   padding: "8px",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                 }}
//               />
//             </>
//           )}
//           <Box
//             sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}
//           >
//             <Button variant="outlined" onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button variant="contained" color="error" onClick={handleReject}>
//               Submit
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

// export default Funds;
