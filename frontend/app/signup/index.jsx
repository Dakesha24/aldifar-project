import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { registerUser } from '../../services/api';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const showAlert = (title, message, onOk) => {
    if (Platform.OS === 'web') {
      // Untuk web browser
      window.alert(message);
      if (onOk) onOk();
    } else {
      // Untuk mobile
      Alert.alert(title, message, [
        {
          text: 'OK',
          onPress: onOk
        }
      ]);
    }
  };

  const handleSignup = async () => {
    try {
      if (!username || !email || !password) {
        showAlert('Error', 'Please fill all fields');
        return;
      }

      setLoading(true);
      const response = await registerUser(username, email, password);
      console.log('Signup response:', response);
      
      const message = Array.isArray(response) ? response[0].Message : response.Message;
      
      if (message === 'Complete--!') {
        showAlert(
          'Success',
          'Registration successful!',
          () => {
            setUsername('');
            setEmail('');
            setPassword('');
            router.replace('/login');
          }
        );
      } else {
        showAlert('Error', message || 'Registration failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      showAlert('Error', 'Something went wrong during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        editable={!loading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')} disabled={loading}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    minHeight: 50,
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
});