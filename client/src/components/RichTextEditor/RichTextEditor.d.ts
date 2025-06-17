import React from 'react';
import { EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
type RichTextEditorProps = {
    value: EditorState;
    onChange: (value: EditorState) => void;
};
declare const RichTextEditor: React.FC<RichTextEditorProps>;
export default RichTextEditor;
