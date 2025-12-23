import { useState } from "react";
import BaseNode from "../../Layout/BaseNode";

export const ConditionNode = ({ id , data }) => {
  const [condition, setCondition] = useState(
    data?.condition || "value !== null"
  );

  return (
    <BaseNode
      title="Condition"
      inputs={["value"]}
      outputs={["true", "false"]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 12, color: "#94a3b8" }}>
          Condition
        </label>
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. value > 10"
          style={{
            padding: "6px 8px",
            borderRadius: 6,
            border: "1px solid #e5e7eb",
            fontSize: 12,
          }}
        />
      </div>
    </BaseNode>
  );
}; 