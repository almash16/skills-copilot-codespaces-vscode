# Getting Started with PDF Editor App

## Quick Start Guide

### 1. Installation

First, install all dependencies:

```bash
npm install
```

This will install all the required packages including:
- Expo SDK and tooling
- React Native components
- PDF handling libraries
- File system utilities

### 2. Running the App

#### Option A: Using Expo Go (Easiest)

1. Start the development server:
   ```bash
   npm start
   ```

2. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

3. The app will open in Expo Go

**Note**: In Expo Go, PDF rendering on mobile is limited. The app will show PDF information and allow all editing features, but full PDF display requires a development build.

#### Option B: Web Browser

```bash
npm run web
```

The app will open in your default browser with full PDF viewing support via iframe.

#### Option C: Development Build (Full Features)

For native PDF rendering on mobile:

```bash
# Install development client
npm install expo-dev-client

# Create native projects
expo prebuild

# Run on your device
expo run:ios    # for iOS
expo run:android # for Android
```

### 3. Using the App

#### Opening a PDF

1. Click/Tap the **"📁 Open PDF"** button in the toolbar
2. Select a PDF file from your device
3. The file name will appear in the header
4. The PDF content will be displayed

#### Adding Annotations

Once a PDF is loaded:

1. **Highlight**: Click the **"🖍️ Highlight"** button to add a highlight annotation
2. **Note**: Click the **"📝 Note"** button to add a note annotation
3. View your annotations in the panel below the PDF viewer
4. Each annotation shows its type and timestamp

#### Saving Your Work

1. Click the **"💾 Save/Share"** button
2. Choose your preferred sharing option:
   - Save to Files (iOS)
   - Save to Downloads (Android)
   - Share with other apps
   - Email as attachment
   - And more...

#### Clearing Annotations

- Click the **"🗑️ Clear"** button to remove all annotations
- A confirmation will show the annotations have been cleared
- This action cannot be undone

## Features Overview

### Current Features

✅ **PDF File Selection**
- Browse and select PDF files from your device
- Support for all standard PDF documents
- Visual confirmation of loaded file

✅ **Annotation System**
- Add highlight markers
- Add text notes
- Track all annotations with timestamps
- View annotation history

✅ **Export & Share**
- Save edited PDFs
- Share via system share sheet
- Compatible with common apps and services

✅ **Clean Interface**
- Material Design-inspired UI
- Intuitive toolbar controls
- Responsive layout for all screen sizes
- Clear visual feedback for all actions

### Platform Compatibility

| Feature | Web | iOS (Expo Go) | Android (Expo Go) | iOS (Dev Build) | Android (Dev Build) |
|---------|-----|---------------|-------------------|-----------------|---------------------|
| PDF Picker | ✅ | ✅ | ✅ | ✅ | ✅ |
| PDF Display | ✅ (iframe) | ℹ️ (info only) | ℹ️ (info only) | ✅ (native) | ✅ (native) |
| Annotations | ✅ | ✅ | ✅ | ✅ | ✅ |
| Save/Share | ✅ | ✅ | ✅ | ✅ | ✅ |

## Troubleshooting

### Common Issues

**Q: PDF doesn't display on my phone**
- A: In Expo Go, native PDF rendering is limited. For full PDF display, create a development build using `expo prebuild` and `expo run:ios` or `expo run:android`.

**Q: "Cannot pick document" error**
- A: Ensure you've granted file access permissions to the app. Check your device's app settings.

**Q: Share button doesn't work**
- A: Verify that your device supports sharing (it should on all modern iOS/Android devices). Try restarting the app.

**Q: App crashes when opening large PDFs**
- A: Large PDF files may require more memory. Try using a smaller PDF or close other apps to free up memory.

### Need More Help?

Check the main [README.md](./README.md) for:
- Detailed installation instructions
- Development build setup
- Project structure
- Technical documentation
- Contributing guidelines

## Next Steps

Once you're comfortable with the basics:

1. Explore the codebase in `App.js` and `components/PDFViewer.js`
2. Customize the UI colors and styling to match your preferences
3. Add additional annotation types
4. Implement more advanced PDF features
5. Create a development build for full native features

Happy PDF editing! 📄✨
