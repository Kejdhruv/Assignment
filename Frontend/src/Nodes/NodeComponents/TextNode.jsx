import { useState, useEffect, useRef } from "react";
import BaseNode from "../../Layout/BaseNode";
import "../../Styles/Nodes/TextNode.css";

const VARIABLE_REGEX = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState("");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    const matches = [...(text || "").matchAll(VARIABLE_REGEX)];
    const vars = [
      ...new Set(
        matches
          .map((m) => m[1])
          .filter((v) => v !== "input")
      ),
    ];
    setVariables(vars);
  }, [text]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [text]);

  return (
    <BaseNode
      title="Text"
      inputs={["value", ...variables]}
      outputs={["output"]}
    >
      <div className="text-node-field">
        <textarea
          ref={textareaRef}
          value={text}
          placeholder="Enter text (use {{variable}})"
          onChange={(e) => setText(e.target.value)}
          rows={1}
        />

        {variables.length > 0 && (
          <div className="text-node-vars">
            <span className="vars-label">Inputs:</span>
            {variables.map((v) => (
              <span key={v} className="var-chip">{v}</span>
            ))}
          </div>
        )}
      </div>
    </BaseNode>
  );
};