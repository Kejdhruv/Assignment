import "../Styles/Components/Modal.css";

const PipelineModal = ({ isOpen, onClose, summary }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Pipeline Summary</h2>

        <div className="modal-content">
          <p><strong>Nodes:</strong> {summary.num_nodes}</p>
          <p><strong>Edges:</strong> {summary.num_edges}</p>
          <p>
            <strong>Valid DAG:</strong>{" "}
            <span className={summary.is_dag ? "dag-yes" : "dag-no"}>
              {summary.is_dag ? "Yes" : "No"}
            </span>
          </p>
        </div>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PipelineModal;