import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useState } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, Modifier, } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Box, ButtonGroup, IconButton, Paper, MenuItem, Select, Tooltip, Typography, FormControl, FormHelperText } from '@mui/material';
import { FormatBold, FormatItalic, FormatUnderlined, FormatListBulleted, FormatListNumbered, FormatAlignLeft, FormatAlignCenter, FormatAlignRight, } from '@mui/icons-material';
// Custom inline style map for font sizes
const styleMap = {};
for (let size = 11; size <= 21; size++) {
    styleMap[`FONTSIZE-${size}`] = { fontSize: `${size}px` };
}
const RichTextEditor = ({ value, onChange }) => {
    const [editorState, setEditorState] = useState(value);
    const [fontSize, setFontSize] = useState('16');
    const editorRef = useRef(null);
    const handleEditorChange = (state) => {
        setEditorState(state);
        onChange(state);
    };
    const handleKeyCommand = (command, state) => {
        const newState = RichUtils.handleKeyCommand(state, command);
        if (newState) {
            handleEditorChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };
    const toggleInlineStyle = (style) => {
        handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
    };
    const toggleBlockType = (blockType) => {
        handleEditorChange(RichUtils.toggleBlockType(editorState, blockType));
    };
    const applyFontSize = (size) => {
        const selection = editorState.getSelection();
        let nextContentState = editorState.getCurrentContent();
        // Remove all font size styles
        for (let s = 11; s <= 21; s++) {
            nextContentState = Modifier.removeInlineStyle(nextContentState, selection, `FONTSIZE-${s}`);
        }
        let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');
        // Apply the new font size
        nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, `FONTSIZE-${size}`);
        setFontSize(size);
        handleEditorChange(nextEditorState);
    };
    return (_jsxs(Box, { sx: { maxWidth: 800, mx: 'auto' }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, sx: { fontWeight: 'bold', color: '#333' }, children: "Project Overview" }), _jsxs(Box, { display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mb: 2, children: [_jsxs(ButtonGroup, { variant: "outlined", size: "small", sx: { backgroundColor: '#f1f1f1', borderRadius: 1 }, children: [_jsx(Tooltip, { title: "Bold", children: _jsx(IconButton, { onClick: () => toggleInlineStyle('BOLD'), sx: { color: '#000' }, children: _jsx(FormatBold, {}) }) }), _jsx(Tooltip, { title: "Italic", children: _jsx(IconButton, { onClick: () => toggleInlineStyle('ITALIC'), sx: { color: '#000' }, children: _jsx(FormatItalic, {}) }) }), _jsx(Tooltip, { title: "Underline", children: _jsx(IconButton, { onClick: () => toggleInlineStyle('UNDERLINE'), sx: { color: '#000' }, children: _jsx(FormatUnderlined, {}) }) })] }), _jsxs(ButtonGroup, { variant: "outlined", size: "small", sx: { backgroundColor: '#f1f1f1', borderRadius: 1 }, children: [_jsx(Tooltip, { title: "Bulleted List", children: _jsx(IconButton, { onClick: () => toggleBlockType('unordered-list-item'), sx: { color: '#000' }, children: _jsx(FormatListBulleted, {}) }) }), _jsx(Tooltip, { title: "Numbered List", children: _jsx(IconButton, { onClick: () => toggleBlockType('ordered-list-item'), sx: { color: '#000' }, children: _jsx(FormatListNumbered, {}) }) })] }), _jsxs(ButtonGroup, { variant: "outlined", size: "small", sx: { backgroundColor: '#f1f1f1', borderRadius: 1 }, children: [_jsx(Tooltip, { title: "Align Left", children: _jsx(IconButton, { onClick: () => toggleBlockType('unstyled'), sx: { color: '#000' }, children: _jsx(FormatAlignLeft, {}) }) }), _jsx(Tooltip, { title: "Align Center", children: _jsx(IconButton, { onClick: () => toggleBlockType('center'), sx: { color: '#000' }, children: _jsx(FormatAlignCenter, {}) }) }), _jsx(Tooltip, { title: "Align Right", children: _jsx(IconButton, { onClick: () => toggleBlockType('right'), sx: { color: '#000' }, children: _jsx(FormatAlignRight, {}) }) })] }), _jsx(FormControl, { size: "small", sx: { minWidth: 80 }, children: _jsx(Select, { value: fontSize, onChange: (e) => applyFontSize(e.target.value), displayEmpty: true, sx: {
                                '& .MuiSelect-icon': {
                                    color: '#000',
                                },
                            }, children: Array.from({ length: 11 }, (_, i) => {
                                const size = (i + 11).toString();
                                return _jsxs(MenuItem, { value: size, children: [size, "px"] }, size);
                            }) }) })] }), _jsx(Paper, { elevation: 2, sx: {
                    minHeight: 200,
                    padding: 2,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    cursor: 'text',
                    backgroundColor: '#fafafa',
                }, onClick: () => editorRef.current?.focus(), children: _jsx(Editor, { ref: editorRef, editorState: editorState, onChange: handleEditorChange, handleKeyCommand: handleKeyCommand, keyBindingFn: getDefaultKeyBinding, customStyleMap: styleMap }) }), _jsx(FormHelperText, { sx: { mt: 1 }, children: "Write your project overview here..." })] }));
};
export default RichTextEditor;
