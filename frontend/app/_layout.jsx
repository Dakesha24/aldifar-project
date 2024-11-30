import { Stack } from "expo-router";
import { AuthProvider } from "../context/auth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
        <Stack.Screen name="signup/index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="materi/[id]" 
          options={{ 
            title: 'Detail Materi',
            headerTintColor: '#007AFF',
          }} 
        />
      </Stack>
    </AuthProvider>
  );
}