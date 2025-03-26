import { Stack } from 'expo-router';

export default function ResourcesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff'
        },
        headerTintColor: '#4F46E5',
        headerTitleStyle: {
          fontFamily: 'Inter_600SemiBold',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Healing Resources',
        }}
      />
      <Stack.Screen name="video-player" options={{ title: 'Video Player' }} />
      <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
    </Stack>
  );
}