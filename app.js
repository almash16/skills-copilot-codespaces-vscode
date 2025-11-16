// Application state
let pdfFile = null;
let annotations = [];
let textNotes = [];
let pdfFileName = '';

// UI elements
const uploadInput = document.getElementById('pdf-upload');
const editControls = document.getElementById('edit-controls');
const pdfViewer = document.getElementById('pdf-viewer');
const placeholder = document.getElementById('placeholder');
const pdfDisplay = document.getElementById('pdf-display');
const pdfIframe = document.getElementById('pdf-iframe');
const annotationsPanel = document.getElementById('annotations-panel');
const annotationsList = document.getElementById('annotations-list');
const infoPanel = document.getElementById('info-panel');
const pdfInfo = document.getElementById('pdf-info');
const addTextBtn = document.getElementById('add-text-btn');
const addAnnotationBtn = document.getElementById('add-annotation-btn');
const clearEditsBtn = document.getElementById('clear-edits-btn');
const downloadBtn = document.getElementById('download-btn');

// Event Listeners
uploadInput.addEventListener('change', handleFileUpload);
addTextBtn.addEventListener('click', addTextNote);
addAnnotationBtn.addEventListener('click', addAnnotation);
clearEditsBtn.addEventListener('click', clearEdits);
downloadBtn.addEventListener('click', downloadAnnotations);

// Handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file || file.type !== 'application/pdf') {
        alert('Please select a valid PDF file');
        return;
    }

    pdfFile = file;
    pdfFileName = file.name;
    
    // Create URL for PDF
    const fileURL = URL.createObjectURL(file);
    
    // Display PDF in iframe
    pdfIframe.src = fileURL;
    
    // Show controls and PDF display
    editControls.style.display = 'flex';
    placeholder.style.display = 'none';
    pdfDisplay.style.display = 'block';
    annotationsPanel.style.display = 'block';
    infoPanel.style.display = 'block';
    
    // Display PDF info
    displayPdfInfo(file);
    
    // Clear previous annotations
    annotations = [];
    textNotes = [];
    updateAnnotationsList();
}

// Display PDF information
function displayPdfInfo(file) {
    const fileSizeKB = (file.size / 1024).toFixed(2);
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    const lastModified = new Date(file.lastModified).toLocaleString();
    
    pdfInfo.innerHTML = `
        <div class="info-item">
            <strong>File Name:</strong> ${file.name}
        </div>
        <div class="info-item">
            <strong>File Size:</strong> ${fileSizeMB} MB (${fileSizeKB} KB)
        </div>
        <div class="info-item">
            <strong>Last Modified:</strong> ${lastModified}
        </div>
        <div class="info-item">
            <strong>Type:</strong> ${file.type}
        </div>
    `;
}

// Add text note
function addTextNote() {
    const text = prompt('Enter your text note:');
    if (text && text.trim()) {
        const note = {
            id: Date.now(),
            type: 'text',
            content: text,
            timestamp: new Date().toLocaleString()
        };
        textNotes.push(note);
        updateAnnotationsList();
    }
}

// Add annotation
function addAnnotation() {
    const title = prompt('Enter annotation title:');
    if (!title || !title.trim()) return;
    
    const description = prompt('Enter annotation description:');
    if (!description || !description.trim()) return;
    
    const annotation = {
        id: Date.now(),
        type: 'annotation',
        title: title,
        description: description,
        timestamp: new Date().toLocaleString()
    };
    annotations.push(annotation);
    updateAnnotationsList();
}

// Update annotations list
function updateAnnotationsList() {
    let html = '';
    
    // Display text notes
    if (textNotes.length > 0) {
        html += '<div class="annotation-section"><h4>✏️ Text Notes</h4>';
        textNotes.forEach(note => {
            html += `
                <div class="annotation-item">
                    <div class="annotation-content">${note.content}</div>
                    <div class="annotation-time">${note.timestamp}</div>
                    <button class="btn-delete" onclick="deleteNote(${note.id}, 'text')">🗑️ Delete</button>
                </div>
            `;
        });
        html += '</div>';
    }
    
    // Display annotations
    if (annotations.length > 0) {
        html += '<div class="annotation-section"><h4>📝 Annotations</h4>';
        annotations.forEach(ann => {
            html += `
                <div class="annotation-item">
                    <div class="annotation-title"><strong>${ann.title}</strong></div>
                    <div class="annotation-content">${ann.description}</div>
                    <div class="annotation-time">${ann.timestamp}</div>
                    <button class="btn-delete" onclick="deleteNote(${ann.id}, 'annotation')">🗑️ Delete</button>
                </div>
            `;
        });
        html += '</div>';
    }
    
    if (html === '') {
        html = '<p class="no-annotations">No annotations yet. Click "Add Text" or "Add Note" to get started.</p>';
    }
    
    annotationsList.innerHTML = html;
}

// Delete note
function deleteNote(id, type) {
    if (type === 'text') {
        textNotes = textNotes.filter(note => note.id !== id);
    } else {
        annotations = annotations.filter(ann => ann.id !== id);
    }
    updateAnnotationsList();
}

// Clear all edits
function clearEdits() {
    if (confirm('Are you sure you want to clear all annotations and notes?')) {
        annotations = [];
        textNotes = [];
        updateAnnotationsList();
    }
}

// Download annotations
function downloadAnnotations() {
    const data = {
        pdfFileName: pdfFileName,
        textNotes: textNotes,
        annotations: annotations,
        exportDate: new Date().toLocaleString()
    };
    
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFileName.replace('.pdf', '_annotations.json');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Annotations downloaded successfully!');
}

// Make deleteNote available globally
window.deleteNote = deleteNote;
