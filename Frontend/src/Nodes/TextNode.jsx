import { useState, useEffect, useRef } from "react";
import BaseNode from "./BaseNode";
import "../styles/textNode.css";

const VARIABLE_REGEX = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // 🔹 Extract variables from text
  useEffect(() => {
    const matches = [...(text.matchAll(VARIABLE_REGEX) || [])];
    const vars = [...new Set(matches.map((m) => m[1]))];
    setVariables(vars);
  }, [text]);

  // 🔹 Auto resize textarea
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
      inputs={variables.map((v) => `${id}-${v}`)}
      outputs={[`${id}-output`]}
    >
      <div className="text-node-field">
        <label>
          Text
          <textarea
            ref={textareaRef}
            value={text}
            placeholder="Enter text (use {{variable}})"
            onChange={(e) => setText(e.target.value)}
            rows={1}
          />
        </label>
      </div>
    </BaseNode>
  );
};