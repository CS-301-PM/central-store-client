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
        const URL = `${import.meta.env.VITE_SERVER}/api/log/all`;
        const res = await fetch(URL, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ requestId, statusType }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const allLogs = await res.json();
        setLogs(allLogs);
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
