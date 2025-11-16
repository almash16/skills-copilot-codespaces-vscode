# PDF Editor App

A web-based PDF editor application that allows you to view, annotate, and edit PDF documents directly in your browser.

## Features

- 📁 **Upload PDF files** - Load any PDF document
- 📄 **View PDFs** - Navigate through pages with easy controls
- ✏️ **Add Text** - Add custom text annotations anywhere on the PDF
- 🖍️ **Highlight** - Add highlight annotations to emphasize content
- 💾 **Download** - Save your edited PDF with all annotations
- 🗑️ **Clear Edits** - Remove all annotations and start fresh

## How to Use

1. **Open the Application**
   - Open `index.html` in a modern web browser (Chrome, Firefox, Safari, or Edge)
   - Or use a local web server for best results

2. **Upload a PDF**
   - Click the "📁 Upload PDF" button
   - Select a PDF file from your computer

3. **Navigate the PDF**
   - Use "← Previous" and "Next →" buttons to navigate between pages
   - Current page and total pages are displayed in the middle

4. **Edit the PDF**
   - **Add Text**: Click "✏️ Add Text", then click anywhere on the PDF to place text
   - **Highlight**: Click "🖍️ Highlight", then click on the PDF to add a highlight box
   - **Clear Edits**: Click "🗑️ Clear Edits" to remove all annotations

5. **Download Edited PDF**
   - Click "💾 Download PDF" to save your edited PDF
   - The file will be saved with "_edited" appended to the original filename

## Technical Details

### Technologies Used
- **HTML5** - Structure and layout
- **CSS3** - Styling and responsive design
- **JavaScript** - Application logic
- **PDF.js** - PDF rendering and manipulation
- **jsPDF** - PDF generation for downloads

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Local Development

To run this application locally:

1. Clone the repository
2. Open `index.html` in a web browser, or
3. Use a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```
4. Navigate to `http://localhost:8000` in your browser

## License

This project is open source and available for educational purposes.
