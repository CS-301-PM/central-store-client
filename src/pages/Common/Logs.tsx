import { useEffect, useState } from "react";
import DynamicTable from "../../components/other/DynamicTable";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import { Role } from "../../types/User";
import { blockchainLogs } from "../../utils/Constants";

export type Log = Record<string, any>;

function Logs({ role }: { role: Role }) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        // const response = await fetch("/api/logs"); // adjust API endpoint
        // if (!response.ok) {
        //   throw new Error("Failed to fetch logs");
        // }
        // const data = await response.json();
        setLogs(blockchainLogs);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <RequestTableHeader
        title="Blockchain Logs"
        subtitle="All transactional logs"
      />

      {loading && <p>Loading logs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <DynamicTable data={logs} />}
    </div>
  );
}

export default Logs;
