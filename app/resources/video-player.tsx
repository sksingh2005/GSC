import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useLocalSearchParams } from 'expo-router'; // Use this to get query params

export default function VideoPlayerScreen() {
  const { videoId } = useLocalSearchParams(); // Get videoId from query params

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A1232', '#1B3557']}
        style={styles.backgroundGradient}
      >
        <YoutubePlayer
          height={300}
          play={true} // Auto-play the video
          videoId={videoId as string} // Play the selected video
        />
        <Text style={styles.note}>
          Note: Video playback requires an internet connection.
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  note: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 20,
    textAlign: 'center',
  },
});