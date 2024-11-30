import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getCategories, getMaterials } from '../../services/api';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;

export default function Materi() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMaterials = async (categoryId) => {
    try {
      setLoading(true);
      const data = await getMaterials(categoryId);
      setMaterials(data);
    } catch (error) {
      console.error('Error loading materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (category) => {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null);
      setMaterials([]);
    } else {
      setSelectedCategory(category);
      loadMaterials(category.id);
    }
  };

  const handleMaterialPress = (material) => {
    router.push(`/materi/${material.id}`);
  };

  const CategoryCard = ({ category }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory?.id === category.id && styles.selectedCategory
      ]}
      onPress={() => handleCategoryPress(category)}
    >
      <View style={styles.categoryHeader}>
        <MaterialIcons 
          name={category.icon || "school"} 
          size={24} 
          color={selectedCategory?.id === category.id ? "#007AFF" : "#666"} 
        />
        <Text style={[
          styles.categoryTitle,
          selectedCategory?.id === category.id && styles.selectedText
        ]}>
          {category.title}
        </Text>
      </View>
      <Text style={styles.categoryDescription}>{category.description}</Text>
    </TouchableOpacity>
  );

  const MaterialCard = ({ material }) => (
    <TouchableOpacity
      style={styles.materialCard}
      onPress={() => handleMaterialPress(material)}
    >
      <View style={styles.materialHeader}>
        <MaterialIcons name="article" size={20} color="#007AFF" />
        <Text style={styles.materialTitle}>{material.title}</Text>
      </View>
      <Text 
        style={styles.materialPreview}
        numberOfLines={2}
      >
        {material.content}
      </Text>
      <View style={styles.readMoreContainer}>
        <Text style={styles.readMore}>Baca selengkapnya</Text>
        <MaterialIcons name="arrow-forward" size={16} color="#007AFF" />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Materi Pembelajaran</Text>
          <Text style={styles.subtitle}>
            Pilih kategori untuk melihat materi yang tersedia
          </Text>
        </View>
        
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </View>

        {selectedCategory && materials.length > 0 && (
          <View style={styles.materialsContainer}>
            <Text style={styles.sectionTitle}>
              Materi {selectedCategory.title}
            </Text>
            {materials.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </View>
        )}

        {selectedCategory && materials.length === 0 && !loading && (
          <View style={styles.emptyState}>
            <MaterialIcons name="info" size={48} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada materi tersedia</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 15,
  },
  categoryCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: cardWidth,
    alignSelf: 'center',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#f0f9ff',
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  selectedText: {
    color: '#007AFF',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 34,
  },
  materialsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
    paddingHorizontal: 5,
  },
  materialCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  materialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  materialTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  materialPreview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginLeft: 30,
    marginBottom: 10,
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  readMore: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});