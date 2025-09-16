import * as React from "react";

type RequestTableHeaderProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

const RequestTableHeader: React.FC<RequestTableHeaderProps> = ({
  title = "Requests",
  subtitle,
  children,
}) => {
  return (
    <div className="requestTableHeader p-4 bg-light rounded d-flex justify-content-between align-items-center">
      <div>
        <h2 className="mb-0">{title}</h2>
        {subtitle && <small className="text-muted">{subtitle}</small>}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default RequestTableHeader;
