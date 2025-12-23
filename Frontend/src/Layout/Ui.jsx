import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { shallow } from "zustand/shallow";
import "reactflow/dist/style.css";
import "../Styles/Components/PipelineUi.css";
import { useStore } from "../Components/Store";
import { SubmitButton } from "../Components/Submit";
import { PipelineToolbar } from "../Components/Toolbar";

import { InputNode } from "../Nodes/NodeComponents/InputNode";
import { LLMNode } from "../Nodes/NodeComponents/LLMNode";
import { OutputNode } from "../Nodes/NodeComponents/OutputNode";
import { TextNode } from "../Nodes/NodeComponents/TextNode";


const gridSize = 20;


const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const rawData = event.dataTransfer.getData("application/reactflow");

      if (!rawData || !reactFlowInstance) return;

      const { nodeType } = JSON.parse(rawData);
      if (!nodeType) return;

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID = getNodeID(nodeType);

      addNode({
        id: nodeID,
        type: nodeType,
        position,
        data: getInitNodeData(nodeID, nodeType),
      });
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

 return (
  <div className="pipeline-root">
    {/* LEFT TOOLBAR */}
    <PipelineToolbar />

    {/* CANVAS */}
    <div
      ref={reactFlowWrapper}
      style={{ flex: 1, position: "relative" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
    <MiniMap
  position="top-right"
  style={{
    backgroundColor: "#0f172a",
    borderRadius: 8,
    border: "2px solid #6366f1",
    boxShadow: "0 6px 18px rgba(99,102,241,0.25)",
    width: 140,
    height: 100,
  }}
  nodeColor={() => "#6366f1"}
  maskColor="rgba(0,0,0,0)"
  pannable
/>
      </ReactFlow>

      {/* 🔥 SUBMIT BUTTON */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 10,
        }}
      >
        <SubmitButton />
      </div>
    </div>
  </div>
);
};