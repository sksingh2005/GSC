import { Tabs } from 'expo-router';
import { Home, MessageCircle, Users, Bell, User, Bot } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1, // Adds border around tab bar
          borderColor: '#E5E7EB', // Light gray border
          elevation: 5, // Adds shadow for a better look
          shadowOpacity: 0.2,
          shadowRadius: 5,
          height: 70, // Slightly increased height for better spacing
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontFamily: 'Inter_400Regular',
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color="#4F46E5" />, // Blue Home Icon
        }}
      />
      <Tabs.Screen
        name="resource"
        options={{
          title: 'Support',
          tabBarIcon: ({ color, size }) => <MessageCircle size={size} color="#14B8A6" />, // Teal Support Icon
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'AI Chat',
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#4F46E5',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 26, // Lifts the icon
              }}>
              <Bot size={28} color="#fff" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color, size }) => <Users size={size} color="#22C55E" />, // Green Community Icon
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, size }) => <Bell size={size} color="#FFD700" />, // Golden Alert Icon
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
