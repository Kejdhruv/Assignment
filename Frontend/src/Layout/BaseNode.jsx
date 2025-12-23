import { Handle, Position } from "reactflow";
import "../Styles/Nodes/Basenode.css"

export default function BaseNode({
  title,
  inputs = [],
  outputs = [],
  children
}) {
  return (
    <div className="base-node">
      <div className="node-title">{title}</div>

      {inputs.map((input, idx) => (
        <Handle
          key={input}
          type="target"
          position={Position.Left}
          id={input}
          style={{ top: 40 + idx * 20 }}
        />
      ))}

      <div className="node-content">{children}</div>

      {outputs.map((output, idx) => (
        <Handle
          key={output}
          type="source"
          position={Position.Right}
          id={output}
          style={{ top: 40 + idx * 20 }}
        />
      ))}
    </div>
  );
}