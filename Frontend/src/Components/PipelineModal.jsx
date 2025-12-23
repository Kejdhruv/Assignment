import "../Styles/Components/Modal.css";

const PipelineModal = ({ isOpen, onClose, summary }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Pipeline Summary</h2>
<div className="modal-content">
  <div className="info-card">
    <span className="info-label">Nodes</span>
    <p>{summary.num_nodes}</p>
  </div>

  <div className="info-card">
    <span className="info-label">Edges</span>
    <p>{summary.num_edges}</p>
  </div>

  <div className="info-card status-card">
    <span className="info-label">Valid DAG</span>
    <p className={summary.is_dag ? "dag-yes" : "dag-no"}>
      {summary.is_dag ? "Yes" : "No"}
    </p>
  </div>
</div>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PipelineModal;