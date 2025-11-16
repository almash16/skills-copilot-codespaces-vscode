# PDF Editor App - React Native Expo

A feature-rich PDF editor application built with React Native and Expo.

## Features

- 📁 **Open PDF Files**: Pick PDF documents from your device
- 🖍️ **Highlight**: Add highlight annotations to your PDFs
- 📝 **Add Notes**: Create notes and annotations
- 💾 **Save/Share**: Export and share your edited PDFs
- 🗑️ **Clear Annotations**: Remove all annotations at once
- 📊 **Annotation Tracking**: Keep track of all your edits

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your preferred platform:
   - **iOS**: Press `i` in the terminal or run `npm run ios`
   - **Android**: Press `a` in the terminal or run `npm run android`
   - **Web**: Press `w` in the terminal or run `npm run web`

## Usage

### Opening a PDF
1. Tap the "📁 Open PDF" button
2. Select a PDF file from your device
3. The PDF will be loaded and displayed

### Adding Annotations
1. Load a PDF first
2. Use the toolbar buttons to add annotations:
   - 🖍️ **Highlight**: Add a highlight annotation
   - 📝 **Note**: Add a note annotation
3. Annotations are tracked in the annotations panel below the PDF

### Saving Your Work
1. After making edits, tap the "💾 Save/Share" button
2. Choose where to save or which app to share with
3. Your PDF will be exported with all metadata

### Clearing Annotations
- Tap the "🗑️ Clear" button to remove all annotations
- This action cannot be undone

## Platform Support

### Web
- Full PDF viewing support via iframe
- All editing features available

### Mobile (iOS/Android)
- PDF picker and file handling supported in Expo Go
- Full PDF rendering requires a development build or production build
- To enable full PDF rendering on mobile:
  1. Run `expo prebuild` to generate native projects
  2. Build the app with `expo run:android` or `expo run:ios`

## Development Build (Advanced)

For full native PDF rendering capabilities on mobile:

```bash
# Install expo-dev-client
npm install expo-dev-client

# Generate native projects
expo prebuild

# Run on iOS
expo run:ios

# Run on Android
expo run:android
```

## Tech Stack

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform for React Native
- **expo-document-picker**: PDF file selection
- **expo-file-system**: File management
- **expo-sharing**: Share and export PDFs
- **react-native-pdf**: PDF rendering (requires dev build)

## Project Structure

```
pdf-editor-app/
├── App.js                 # Main application component
├── components/
│   └── PDFViewer.js      # PDF viewing component
├── assets/               # Images and static assets
├── app.json             # Expo configuration
├── package.json         # Dependencies
└── babel.config.js      # Babel configuration
```

## Troubleshooting

### PDF not displaying on mobile
- In Expo Go, native PDF rendering is limited
- For full support, create a development build with `expo prebuild`

### File picker not working
- Ensure you're running on a supported platform
- Check that permissions are granted for file access

### Cannot save PDF
- Verify that sharing is available on your device
- Check storage permissions

## Future Enhancements

- Text editing capabilities
- Drawing and freehand annotations
- Page management (add, delete, reorder)
- Form filling
- Digital signatures
- Multiple PDF merging
- OCR (Optical Character Recognition)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
