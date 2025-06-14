import React, { useRef, useState } from 'react';
import {
    Editor,
    EditorState,
    RichUtils,
    DraftHandleValue,
    getDefaultKeyBinding,
    Modifier,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {
    Box,
    ButtonGroup,
    IconButton,
    Paper,
    MenuItem,
    Select,
    SelectChangeEvent,
    Divider,
    Tooltip,
    Typography,
    FormControl,
    InputLabel,
    Input,
    FormHelperText
} from '@mui/material';
import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    FormatListBulleted,
    FormatListNumbered,
    FormatAlignLeft,
    FormatAlignCenter,
    FormatAlignRight,
} from '@mui/icons-material';

// Custom inline style map for font sizes
const styleMap: any = {};
for (let size = 11; size <= 21; size++) {
    styleMap[`FONTSIZE-${size}`] = { fontSize: `${size}px` };
}

type RichTextEditorProps = {
    value: EditorState;
    onChange: (value: EditorState) => void;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
    const [editorState, setEditorState] = useState(value);
    const [fontSize, setFontSize] = useState('16');
    const editorRef = useRef<Editor>(null);

    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);
        onChange(state);
    };

    const handleKeyCommand = (
        command: string,
        state: EditorState
    ): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(state, command);
        if (newState) {
            handleEditorChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const toggleInlineStyle = (style: string) => {
        handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
    };

    const toggleBlockType = (blockType: string) => {
        handleEditorChange(RichUtils.toggleBlockType(editorState, blockType));
    };

    const applyFontSize = (size: string) => {
        const selection = editorState.getSelection();
        let nextContentState = editorState.getCurrentContent();

        // Remove all font size styles
        for (let s = 11; s <= 21; s++) {
            nextContentState = Modifier.removeInlineStyle(nextContentState, selection, `FONTSIZE-${s}`);
        }

        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );

        // Apply the new font size
        nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, `FONTSIZE-${size}`);
        setFontSize(size);
        handleEditorChange(nextEditorState);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {/* Header */}
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                Project Overview
            </Typography>
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap" mb={2}>

                {/* Bold, Italic, Underline Buttons */}
                <ButtonGroup variant="outlined" size="small" sx={{ backgroundColor: '#f1f1f1', borderRadius: 1 }}>
                    <Tooltip title="Bold">
                        <IconButton onClick={() => toggleInlineStyle('BOLD')} sx={{ color: '#000' }}>
                            <FormatBold />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Italic">
                        <IconButton onClick={() => toggleInlineStyle('ITALIC')} sx={{ color: '#000' }}>
                            <FormatItalic />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Underline">
                        <IconButton onClick={() => toggleInlineStyle('UNDERLINE')} sx={{ color: '#000' }}>
                            <FormatUnderlined />
                        </IconButton>
                    </Tooltip>
                </ButtonGroup>

                {/* Bullet & Numbered List */}
                <ButtonGroup variant="outlined" size="small" sx={{ backgroundColor: '#f1f1f1', borderRadius: 1 }}>
                    <Tooltip title="Bulleted List">
                        <IconButton onClick={() => toggleBlockType('unordered-list-item')} sx={{ color: '#000' }}>
                            <FormatListBulleted />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Numbered List">
                        <IconButton onClick={() => toggleBlockType('ordered-list-item')} sx={{ color: '#000' }}>
                            <FormatListNumbered />
                        </IconButton>
                    </Tooltip>
                </ButtonGroup>

                {/* Text Alignments */}
                <ButtonGroup variant="outlined" size="small" sx={{ backgroundColor: '#f1f1f1', borderRadius: 1 }}>
                    <Tooltip title="Align Left">
                        <IconButton onClick={() => toggleBlockType('unstyled')} sx={{ color: '#000' }}>
                            <FormatAlignLeft />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Align Center">
                        <IconButton onClick={() => toggleBlockType('center')} sx={{ color: '#000' }}>
                            <FormatAlignCenter />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Align Right">
                        <IconButton onClick={() => toggleBlockType('right')} sx={{ color: '#000' }}>
                            <FormatAlignRight />
                        </IconButton>
                    </Tooltip>
                </ButtonGroup>

                {/* Font Size Dropdown */}
                <FormControl size="small" sx={{ minWidth: 80 }}>
                    <Select
                        value={fontSize}
                        onChange={(e: SelectChangeEvent<string>) => applyFontSize(e.target.value)}
                        displayEmpty
                        sx={{
                            '& .MuiSelect-icon': {
                                color: '#000',
                            },
                        }}
                    >
                        {Array.from({ length: 11 }, (_, i) => {
                            const size = (i + 11).toString();
                            return <MenuItem key={size} value={size}>{size}px</MenuItem>;
                        })}
                    </Select>
                </FormControl>
            </Box>

            {/* Editor */}
            <Paper
                elevation={2}
                sx={{
                    minHeight: 200,
                    padding: 2,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    cursor: 'text',
                    backgroundColor: '#fafafa',
                }}
                onClick={() => editorRef.current?.focus()}
            >
                <Editor
                    ref={editorRef}
                    editorState={editorState}
                    onChange={handleEditorChange}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={getDefaultKeyBinding}
                    customStyleMap={styleMap}
                />
            </Paper>

            <FormHelperText sx={{ mt: 1 }}>Write your project overview here...</FormHelperText>
        </Box>
    );
};

export default RichTextEditor;
