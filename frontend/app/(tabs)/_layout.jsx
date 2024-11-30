import { Tabs } from "expo-router";
import { TouchableOpacity, Text, Alert, Platform, View } from "react-native";
import { useAuth } from "../../context/auth";
import { useRouter } from "expo-router";

export default function TabLayout() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const showConfirmation = (title, message, onConfirm) => {
    if (Platform.OS === 'web') {
      if (window.confirm(message)) {
        onConfirm();
      }
    } else {
      Alert.alert(
        title,
        message,
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Logout',
            onPress: onConfirm,
            style: 'destructive'
          }
        ]
      );
    }
  };

  const handleLogout = () => {
    showConfirmation(
      'Logout',
      'Are you sure you want to logout?',
      () => {
        logout();
        router.replace('/login');
      }
    );
  };

  const CustomHeader = () => (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      height: 60,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    }}>
      <TouchableOpacity
        onPress={() => router.push('/(tabs)/home')}
      >
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold',
          color: '#007AFF'
        }}>
          ALDIFAR
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ 
          color: '#333',
          fontSize: 16,
          marginRight: 15
        }}>
          Welcome, {user?.username || 'User'}
        </Text>
        <TouchableOpacity 
          onPress={handleLogout}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
        >
          <Text style={{ 
            color: '#007AFF',
            fontWeight: '500'
          }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />
      <Tabs 
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="latihan" />
        <Tabs.Screen name="materi" />
      </Tabs>
    </View>
  );
}