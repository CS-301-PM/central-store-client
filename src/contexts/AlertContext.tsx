import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import AlertMessage from "../components/other/AlertMessage";
import { LinearProgress } from "@mui/material";

export type AlertSeverity = "success" | "error" | "warning" | "info";

type AlertContextType = {
  show: (message: string, severity?: AlertSeverity) => void;
  clear: () => void;
  activeRequests: number;
};

const AlertContext = createContext<AlertContextType>({
  show: () => {},
  clear: () => {},
  activeRequests: 0,
});

export const useAlert = () => useContext(AlertContext);

// Component that renders global loading bar and last error toast
export const GlobalFetchAlerts: React.FC = () => {
  const { activeRequests } = useAlert();
  const [error, setError] = useState<string | null>(null);
  const onWindowError = (e: CustomEvent) => {
    setError(String(e.detail?.message || "Request failed"));
  };
  useEffect(() => {
    const handler = (e: Event) => onWindowError(e as CustomEvent);
    window.addEventListener("fetch:error", handler as EventListener);
    return () => window.removeEventListener("fetch:error", handler as EventListener);
  }, []);

  return (
    <>
      {activeRequests > 0 && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 13000 }}>
          <LinearProgress />
        </div>
      )}
      {error && (
        <AlertMessage
          message={error}
          severity="error"
          onClose={() => setError(null)}
        />
      )}
    </>
  );
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRequests, setActiveRequests] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<AlertSeverity>("info");
  const originalFetchRef = useRef<typeof fetch | null>(null);

  const show = (msg: string, sev: AlertSeverity = "info") => {
    setMessage(msg);
    setSeverity(sev);
  };
  const clear = () => setMessage(null);

  useEffect(() => {
    // install global fetch interceptor once
    if ((window as any).__fetch_interceptor_installed) return;
    (window as any).__fetch_interceptor_installed = true;

    originalFetchRef.current = window.fetch.bind(window);

    window.fetch = async (...args: Parameters<typeof fetch>): Promise<Response> => {
      try {
        setActiveRequests((n) => n + 1);
        const res = await (originalFetchRef.current as any)(...args);
        if (!res.ok) {
          const url = (args[0] as RequestInfo) as any;
          const method = (args[1] as RequestInit | undefined)?.method || "GET";
          const msg = `Request ${method} ${typeof url === "string" ? url : "[resource]"} failed (${res.status})`;
          window.dispatchEvent(new CustomEvent("fetch:error", { detail: { message: msg } }));
        }
        return res;
      } catch (err: any) {
        const url = (args[0] as RequestInfo) as any;
        const method = (args[1] as RequestInit | undefined)?.method || "GET";
        const msg = `Network error on ${method} ${typeof url === "string" ? url : "[resource]"}`;
        window.dispatchEvent(new CustomEvent("fetch:error", { detail: { message: msg } }));
        throw err;
      } finally {
        setActiveRequests((n) => Math.max(0, n - 1));
      }
    };

    return () => {
      if (originalFetchRef.current) {
        window.fetch = originalFetchRef.current;
      }
    };
  }, []);

  const value = useMemo(() => ({ show, clear, activeRequests }), [activeRequests]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      {message && (
        <AlertMessage message={message} severity={severity} onClose={clear} />)
      }
    </AlertContext.Provider>
  );
};