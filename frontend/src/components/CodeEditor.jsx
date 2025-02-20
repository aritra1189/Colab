import { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";

const CodeEditor = ({ code, onChange, language, theme }) => {
  const editorRef = useRef(null);
  const editorContainerRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = monaco.editor.create(editorContainerRef.current, {
        value: code,
        language,
        theme,
        automaticLayout: true, // Ensures responsive resizing
      });

      editorRef.current.onDidChangeModelContent(() => {
        onChange(editorRef.current.getValue());
      });
    }
  }, []); // Only run on mount

  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model && model.getValue() !== code) {
        model.setValue(code); // Ensure Monaco updates when `code` changes
      }
    }
  }, [code]);

  useEffect(() => {
    if (editorRef.current) {
      monaco.editor.setTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (editorRef.current) {
      monaco.editor.setModelLanguage(editorRef.current.getModel(), language);
    }
  }, [language]);

  return <div ref={editorContainerRef} style={{ height: "70vh", width: "100%" }} />;
};

export default CodeEditor;


