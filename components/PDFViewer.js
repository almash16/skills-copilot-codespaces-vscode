import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const PDFViewer = ({ uri }) => {
  // Note: react-native-pdf requires native modules and won't work in Expo Go
  // For a production app, you would need to use expo prebuild or a development build
  // This is a placeholder component that shows the PDF info

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <iframe
          src={uri}
          style={{
            width: '100%',
            height: 600,
            border: 'none',
          }}
          title="PDF Viewer"
        />
      </View>
    );
  }

  // For mobile platforms in Expo Go, we show PDF information
  // In a production build with react-native-pdf, you would use:
  // import Pdf from 'react-native-pdf';
  // return <Pdf source={{ uri }} style={styles.pdf} />;

  return (
    <View style={styles.container}>
      <View style={styles.pdfInfoCard}>
        <Text style={styles.infoTitle}>PDF Loaded</Text>
        <Text style={styles.infoText}>URI: {uri}</Text>
        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>📱 Development Note:</Text>
          <Text style={styles.noteText}>
            Full PDF rendering requires a development build or production build.
          </Text>
          <Text style={styles.noteText}>
            • On Web: PDFs are displayed in an iframe
          </Text>
          <Text style={styles.noteText}>
            • On Mobile: Use 'expo prebuild' and 'react-native-pdf' for full support
          </Text>
          <Text style={styles.noteText}>
            • The PDF file is loaded and ready to be processed
          </Text>
        </View>
        <View style={styles.featureBox}>
          <Text style={styles.featureTitle}>✨ Editor Features:</Text>
          <Text style={styles.featureText}>✓ Open PDF files</Text>
          <Text style={styles.featureText}>✓ Add annotations (Highlight, Notes)</Text>
          <Text style={styles.featureText}>✓ Save/Share PDFs</Text>
          <Text style={styles.featureText}>✓ Clear annotations</Text>
          <Text style={styles.featureText}>✓ Track annotation history</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  pdfInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  noteBox: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
    lineHeight: 20,
  },
  featureBox: {
    backgroundColor: '#F1F8E9',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
    lineHeight: 20,
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
});

export default PDFViewer;
