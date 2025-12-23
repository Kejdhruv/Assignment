import BaseNode from "../BaseNode";
import "../../Styles/Nodes/LLMNode.css"

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      title="LLM"
      inputs={[`${id}-system`, `${id}-prompt`]}
      outputs={[`${id}-response`]}
    >
      <div className="llm-node-content">
        This is a LLM.
      </div>
    </BaseNode>
  );
};