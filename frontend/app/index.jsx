import { Redirect } from "expo-router";
import { useAuth } from "../context/auth";

export default function Index() {
  const { user } = useAuth();

  // Jika user sudah login, redirect ke home
  // Jika belum, redirect ke login
  return user ? <Redirect href="/(tabs)/home" /> : <Redirect href="/login" />;
}