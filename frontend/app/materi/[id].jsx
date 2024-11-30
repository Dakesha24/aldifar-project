import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getMaterialDetail } from '../../services/api';

export default function MaterialDetail() {
  const { id } = useLocalSearchParams();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMaterialDetail();
  }, [id]);

  const loadMaterialDetail = async () => {
    try {
      setLoading(true);
      const data = await getMaterialDetail(id);
      setMaterial(data);
    } catch (error) {
      console.error('Error loading material detail:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {material && (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{material.title}</Text>
          <View style={styles.divider} />
          <Text style={styles.content}>{material.content}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  divider: {
    height: 2,
    backgroundColor: '#007AFF',
    width: 50,
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});