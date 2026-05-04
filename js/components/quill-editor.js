// Create and return a Quill rich-text editor wrapped in a shell container.
// Accepts an optional placeholder string for the editor.
export function renderQuillEditor(placeholder = 'Write something here...') {
    const editorShell = document.createElement('div');
    editorShell.className = 'editor-shell';

    // Check if Quill library was loaded; if not, show an error message.
    if (!globalThis.Quill) {
        const errorElement = document.createElement('p');
        errorElement.textContent = 'Quill editor failed to load.';
        editorShell.appendChild(errorElement);
        return editorShell;
    }

    // Create the editor container and mount it in the shell.
    const editor = document.createElement('div');
    editor.id = 'editor';
    editorShell.appendChild(editor);

    // Initialize Quill on the editor element with snow theme and custom placeholder.
    // Store the instance on the shell for potential later access (e.g., save content).
    editorShell.quill = new globalThis.Quill(editor, {
        theme: 'snow',
        placeholder: placeholder
    });

    return editorShell;
}