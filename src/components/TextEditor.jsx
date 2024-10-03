import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.css';

function TextEditor() {
  const [content, setContent] = useState('');
  const quillRef = useRef(null);

  const handleChange = useCallback((value) => {
    setContent(value);
  }, []);

  const customButton = useCallback(() => {
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();
    if (range) {
      editor.insertText(range.index, 'Custom text');
    }
  }, []);

  const undoChange = useCallback(() => {
    const editor = quillRef.current.getEditor();
    editor.history.undo();
  }, []);

  const redoChange = useCallback(() => {
    const editor = quillRef.current.getEditor();
    editor.history.redo();
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'undo': '' }, { 'redo': '' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean'],
        ['custom-button']
      ],
      handlers: {
        'undo': undoChange,
        'redo': redoChange,
        'custom-button': customButton
      }
    }
  }), [undoChange, redoChange, customButton]);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'font', 'align',
    'link', 'image'
  ];

  return (
    <div className="text-editor-container">
      <div className="text-editor">
        <ReactQuill 
          theme="snow"
          value={content}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          ref={quillRef}
          style={{height: '100%', display: 'flex', flexDirection: 'column'}}
        />
      </div>
    </div>
  );
}

export default TextEditor;
