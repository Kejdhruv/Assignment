import { useState } from "react";
import BaseNode from "../../Layout/BaseNode";
import "../../Styles/Nodes/OutputNode.css"

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );

  const [outputType, setOutputType] = useState(
    data?.outputType || "Text"
  );

  return (
    <BaseNode
      title="Output"
      inputs={[`${id}-value`]}
      outputs={[]}
    >
      <div className="output-node-field">
        <label>
          Name
          <input
            type="text"
            value={currName}
            placeholder="Enter output name"
            onChange={(e) => setCurrName(e.target.value)}
          />
        </label>

        <label>
          Type
          <select
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};