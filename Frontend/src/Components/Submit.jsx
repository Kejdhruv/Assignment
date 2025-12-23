import { useState } from "react";
import { useStore } from "./Store";
import PipelineModal from "./PipelineSummaryModal";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [summary, setSummary] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nodes: nodes.map((n) => ({ id: n.id })),
          edges: edges.map((e) => ({
            source: e.source,
            target: e.target,
          })),
        }),
      });

      if (!response.ok) throw new Error("Backend error");

      const result = await response.json();
      setSummary(result);
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
      alert("Failed to submit pipeline");
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <PipelineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        summary={summary}
      />
    </>
  );
};