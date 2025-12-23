import Draggable from "./DraggableNode.jsx";
import "../Styles/Components/Toolbar.css";

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-nodes">
        <Draggable type="customInput" label="Input" />
        <Draggable type="llm" label="LLM" />
        <Draggable type="customOutput" label="Output" />
        <Draggable type="text" label="Text" />
      </div>
    </div>
  );
};