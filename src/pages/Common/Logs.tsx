import { useEffect, useState } from "react";
import DynamicTable from "../../components/other/DynamicTable";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import { Role } from "../../types/User";
import { useBlockchainContext } from "../../hooks/useBlockchainContextHook";

export type Log = Record<string, any>;

function Logs({ role }: { role: Role }) {
  const [logsList, setLogsList] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getLogs, logs } = useBlockchainContext(); // only get the function

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        setError(null);

        await getLogs();
        setLogsList(logs || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch logs");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [setLogsList]);

  return (
    <div>
      <RequestTableHeader
        title="Blockchain Logs"
        subtitle="All transactional logs"
      />

      {loading && <p>Loading logs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <DynamicTable data={logsList} />}
    </div>
  );
}

export default Logs;
