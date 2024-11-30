import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../context/auth';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  const MenuCard = ({ title, description, onPress, icon }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.cardIcon}>
        <Image
          source={{ uri: icon }}
          style={styles.icon}
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Banner Section */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Selamat Datang di ALDIFAR</Text>
        <Text style={styles.bannerSubtitle}>Platform Pembelajaran Interaktif</Text>
      </View>

      {/* Menu Grid */}
      <View style={styles.menuGrid}>
        <MenuCard
          title="Materi Pembelajaran"
          description="Akses materi pembelajaran lengkap"
          onPress={() => router.push('/(tabs)/materi')}
          icon="/api/placeholder/50/50"
        />
        <MenuCard
          title="Latihan Soal"
          description="Latihan soal untuk mengasah kemampuan"
          onPress={() => router.push('/(tabs)/latihan')}
          icon="/api/placeholder/50/50"
        />
        <MenuCard
          title="Progress Belajar"
          description="Pantau perkembangan belajar Anda"
          onPress={() => {}}
          icon="/api/placeholder/50/50"
        />
        <MenuCard
          title="Diskusi"
          description="Diskusi dengan teman dan pengajar"
          onPress={() => {}}
          icon="/api/placeholder/50/50"
        />
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Materi Selesai</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>85%</Text>
          <Text style={styles.statLabel}>Progress</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Latihan Soal</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  banner: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingVertical: 40,
    marginBottom: 20,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  menuGrid: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardIcon: {
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: '31%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});