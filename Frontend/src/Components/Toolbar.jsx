import Draggable from "./DraggableNode";
import "../Styles/Components/Toolbar.css";

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-title">Nodes</div>

      <div className="toolbar-nodes">
        <Draggable type="customInput" label="Input" />
        <Draggable type="llm" label="LLM" />
        <Draggable type="customOutput" label="Output" />
              <Draggable type="text" label="Text" />
              <Draggable type="condition" label="Condition" />
      </div>
    </div>
  );
};