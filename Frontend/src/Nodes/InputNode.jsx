import { useState } from "react";
import BaseNode from "./BaseNode";
import "../Styles/Nodes/InputNode.css"

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(
    data?.inputType || "Text"
  );

  return (
    <BaseNode
      title="Input"
      inputs={[]}
      outputs={[`${id}-value`]}
    >
      <div className="input-node-field">
        <label>
          Name
          <input
            type="text"
            value={currName}
            placeholder="Enter input name"
            onChange={(e) => setCurrName(e.target.value)}
          />
        </label>

        <label>
          Type
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};