import React from "react";

interface OrdenacaoProps {
  sortField: string;
  currentSortField: string;
  sortOrder: string;
  onSortChange: (field: string) => void;
}

const Ordenacao: React.FC<OrdenacaoProps> = ({ sortField, currentSortField, sortOrder, onSortChange }) => {
  const handleSortChange = (field: string) => {
    onSortChange(field);
  };

  return (
    <span onClick={() => handleSortChange(sortField)} style={{ cursor: "pointer" }}>
      { sortField === "none" ? <></> : 
        currentSortField === sortField
            ? sortOrder === "asc"
            ? "▲"
            : "▼"
            : "↕"}
        </span>
  );
};

export default Ordenacao;