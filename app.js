// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Application state
let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let currentScale = 1.5;
let editMode = null;
let annotations = [];
let pdfFileName = '';

// Canvas elements
const pdfCanvas = document.getElementById('pdf-canvas');
const editCanvas = document.getElementById('edit-canvas');
const pdfCtx = pdfCanvas.getContext('2d');
const editCtx = editCanvas.getContext('2d');

// UI elements
const uploadInput = document.getElementById('pdf-upload');
const editControls = document.getElementById('edit-controls');
const navigation = document.getElementById('navigation');
const canvasContainer = document.getElementById('canvas-container');
const pdfViewer = document.getElementById('pdf-viewer');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const currentPageSpan = document.getElementById('current-page');
const totalPagesSpan = document.getElementById('total-pages');
const addTextBtn = document.getElementById('add-text-btn');
const addHighlightBtn = document.getElementById('add-highlight-btn');
const clearEditsBtn = document.getElementById('clear-edits-btn');
const downloadBtn = document.getElementById('download-btn');

// Event Listeners
uploadInput.addEventListener('change', handleFileUpload);
prevPageBtn.addEventListener('click', () => changePage(-1));
nextPageBtn.addEventListener('click', () => changePage(1));
addTextBtn.addEventListener('click', () => setEditMode('text'));
addHighlightBtn.addEventListener('click', () => setEditMode('highlight'));
clearEditsBtn.addEventListener('click', clearEdits);
downloadBtn.addEventListener('click', downloadPDF);
editCanvas.addEventListener('click', handleCanvasClick);

// Handle file upload
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file || file.type !== 'application/pdf') {
        alert('Please select a valid PDF file');
        return;
    }

    pdfFileName = file.name;
    const fileReader = new FileReader();

    fileReader.onload = async function() {
        const typedArray = new Uint8Array(this.result);
        
        try {
            pdfDoc = await pdfjsLib.getDocument(typedArray).promise;
            totalPages = pdfDoc.numPages;
            currentPage = 1;
            annotations = [];
            
            // Show controls and hide placeholder
            editControls.style.display = 'flex';
            navigation.style.display = 'flex';
            canvasContainer.style.display = 'block';
            pdfViewer.style.display = 'none';
            
            await renderPage(currentPage);
        } catch (error) {
            console.error('Error loading PDF:', error);
            alert('Error loading PDF file');
        }
    };

    fileReader.readAsArrayBuffer(file);
}

// Render PDF page
async function renderPage(pageNumber) {
    const page = await pdfDoc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: currentScale });

    // Set canvas dimensions
    pdfCanvas.width = viewport.width;
    pdfCanvas.height = viewport.height;
    editCanvas.width = viewport.width;
    editCanvas.height = viewport.height;

    // Render PDF page
    const renderContext = {
        canvasContext: pdfCtx,
        viewport: viewport
    };
    await page.render(renderContext).promise;

    // Update page info
    currentPageSpan.textContent = currentPage;
    totalPagesSpan.textContent = totalPages;

    // Update navigation buttons
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;

    // Render annotations for current page
    renderAnnotations();
}

// Change page
async function changePage(delta) {
    const newPage = currentPage + delta;
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        await renderPage(currentPage);
    }
}

// Set edit mode
function setEditMode(mode) {
    editMode = mode;
    canvasContainer.classList.remove('text-mode', 'highlight-mode');
    
    // Update button states
    addTextBtn.style.opacity = mode === 'text' ? '1' : '0.7';
    addHighlightBtn.style.opacity = mode === 'highlight' ? '1' : '0.7';
    
    if (mode === 'text') {
        canvasContainer.classList.add('text-mode');
    } else if (mode === 'highlight') {
        canvasContainer.classList.add('highlight-mode');
    }
}

// Handle canvas click
function handleCanvasClick(event) {
    if (!editMode) return;

    const rect = editCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (editMode === 'text') {
        const text = prompt('Enter text:');
        if (text) {
            addTextAnnotation(x, y, text);
        }
    } else if (editMode === 'highlight') {
        addHighlightAnnotation(x, y);
    }
}

// Add text annotation
function addTextAnnotation(x, y, text) {
    annotations.push({
        page: currentPage,
        type: 'text',
        x: x,
        y: y,
        text: text
    });
    renderAnnotations();
}

// Add highlight annotation
function addHighlightAnnotation(x, y) {
    annotations.push({
        page: currentPage,
        type: 'highlight',
        x: x,
        y: y,
        width: 100,
        height: 20
    });
    renderAnnotations();
}

// Render annotations
function renderAnnotations() {
    // Clear edit canvas
    editCtx.clearRect(0, 0, editCanvas.width, editCanvas.height);

    // Draw annotations for current page
    const pageAnnotations = annotations.filter(a => a.page === currentPage);
    
    pageAnnotations.forEach(annotation => {
        if (annotation.type === 'text') {
            editCtx.font = '16px Arial';
            editCtx.fillStyle = '#000000';
            editCtx.fillText(annotation.text, annotation.x, annotation.y);
        } else if (annotation.type === 'highlight') {
            editCtx.fillStyle = 'rgba(255, 255, 0, 0.4)';
            editCtx.fillRect(annotation.x, annotation.y, annotation.width, annotation.height);
        }
    });
}

// Clear all edits
function clearEdits() {
    if (confirm('Are you sure you want to clear all edits?')) {
        annotations = [];
        renderAnnotations();
    }
}

// Download PDF with annotations
async function downloadPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4'
        });

        // Render each page
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            if (pageNum > 1) {
                pdf.addPage();
            }

            const page = await pdfDoc.getPage(pageNum);
            const viewport = page.getViewport({ scale: currentScale });
            
            // Create temporary canvas for this page
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            tempCanvas.width = viewport.width;
            tempCanvas.height = viewport.height;

            // Render PDF page
            await page.render({
                canvasContext: tempCtx,
                viewport: viewport
            }).promise;

            // Draw annotations on temp canvas
            const pageAnnotations = annotations.filter(a => a.page === pageNum);
            pageAnnotations.forEach(annotation => {
                if (annotation.type === 'text') {
                    tempCtx.font = '16px Arial';
                    tempCtx.fillStyle = '#000000';
                    tempCtx.fillText(annotation.text, annotation.x, annotation.y);
                } else if (annotation.type === 'highlight') {
                    tempCtx.fillStyle = 'rgba(255, 255, 0, 0.4)';
                    tempCtx.fillRect(annotation.x, annotation.y, annotation.width, annotation.height);
                }
            });

            // Add to PDF
            const imgData = tempCanvas.toDataURL('image/jpeg', 1.0);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        }

        // Download
        const fileName = pdfFileName.replace('.pdf', '_edited.pdf');
        pdf.save(fileName);
    } catch (error) {
        console.error('Error downloading PDF:', error);
        alert('Error downloading PDF. Please try again.');
    }
}
