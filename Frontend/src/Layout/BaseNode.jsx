import { Handle, Position } from "reactflow";
import "../Styles/Nodes/BaseNode.css";

const BaseNode = ({ title, inputs = [], outputs = [], children }) => {
  return (
    <div className="base-node">
      <div className="base-node-title">{title}</div>

      {/* INPUT HANDLES ONLY (NO LABELS) */}
      {inputs.map((input, index) => (
        <Handle
          key={input}
          type="target"
          position={Position.Left}
          id={input}
          className="base-node-handle"
          style={{ top: 50 + index * 18 }}
        />
      ))}

      <div className="base-node-content">{children}</div>

      {/* OUTPUT HANDLES */}
      {outputs.map((output, index) => (
        <Handle
          key={output}
          type="source"
          position={Position.Right}
          id={output}
          className="base-node-handle"
          style={{ top: 50 + index * 18 }}
        />
      ))}
    </div>
  );
};

export default BaseNode;