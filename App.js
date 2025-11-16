import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import PDFViewer from './components/PDFViewer';

export default function App() {
  const [pdfUri, setPdfUri] = useState(null);
  const [fileName, setFileName] = useState('');
  const [annotations, setAnnotations] = useState([]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success' || !result.canceled) {
        const uri = result.assets ? result.assets[0].uri : result.uri;
        const name = result.assets ? result.assets[0].name : result.name;
        setPdfUri(uri);
        setFileName(name);
        setAnnotations([]);
        Alert.alert('Success', 'PDF loaded successfully!');
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to load PDF file');
    }
  };

  const handleAnnotation = (type) => {
    const newAnnotation = {
      id: Date.now(),
      type: type,
      timestamp: new Date().toISOString(),
    };
    setAnnotations([...annotations, newAnnotation]);
    Alert.alert('Added', `${type} annotation added`);
  };

  const clearAnnotations = () => {
    setAnnotations([]);
    Alert.alert('Cleared', 'All annotations have been cleared');
  };

  const savePDF = async () => {
    try {
      if (!pdfUri) {
        Alert.alert('Error', 'No PDF loaded');
        return;
      }

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Error', 'Sharing is not available on this platform');
        return;
      }

      await Sharing.shareAsync(pdfUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Save PDF',
        UTI: 'com.adobe.pdf',
      });
    } catch (error) {
      console.error('Error sharing PDF:', error);
      Alert.alert('Error', 'Failed to save PDF');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PDF Editor</Text>
        {fileName && <Text style={styles.fileName}>{fileName}</Text>}
      </View>

      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.button} onPress={pickDocument}>
          <Text style={styles.buttonText}>📁 Open PDF</Text>
        </TouchableOpacity>
        
        {pdfUri && (
          <>
            <TouchableOpacity 
              style={[styles.button, styles.editButton]} 
              onPress={() => handleAnnotation('Highlight')}
            >
              <Text style={styles.buttonText}>🖍️ Highlight</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.editButton]} 
              onPress={() => handleAnnotation('Note')}
            >
              <Text style={styles.buttonText}>📝 Note</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <ScrollView style={styles.content}>
        {pdfUri ? (
          <PDFViewer uri={pdfUri} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No PDF loaded</Text>
            <Text style={styles.placeholderSubtext}>
              Tap "Open PDF" to select a document
            </Text>
          </View>
        )}

        {annotations.length > 0 && (
          <View style={styles.annotationsPanel}>
            <Text style={styles.annotationsTitle}>
              Annotations ({annotations.length})
            </Text>
            {annotations.map((annotation) => (
              <View key={annotation.id} style={styles.annotationItem}>
                <Text style={styles.annotationText}>
                  {annotation.type} - {new Date(annotation.timestamp).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {pdfUri && (
        <View style={styles.bottomBar}>
          <TouchableOpacity 
            style={[styles.button, styles.clearButton]} 
            onPress={clearAnnotations}
          >
            <Text style={styles.buttonText}>🗑️ Clear</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.saveButton]} 
            onPress={savePDF}
          >
            <Text style={styles.buttonText}>💾 Save/Share</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  fileName: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    opacity: 0.9,
  },
  toolbar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  clearButton: {
    backgroundColor: '#f44336',
    flex: 1,
    marginRight: 5,
  },
  saveButton: {
    backgroundColor: '#FF9800',
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 100,
  },
  placeholderText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 10,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  annotationsPanel: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  annotationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  annotationItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  annotationText: {
    fontSize: 14,
    color: '#555',
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});
