import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { MapPin, Bell, Camera, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function Alerts() {
  const [locationShared, setLocationShared] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const handleLocationShare = () => {
    if (Platform.OS === 'web') {
      // Web implementation for location sharing
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationShared(true);
            // Handle location data
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
  };

  const handlePhotoUpload = () => {
    // Implement photo upload logic
    setPhotoUploaded(true);
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={80} tint="light" style={styles.header}>
        <Text style={styles.headerTitle}>Emergency Alerts</Text>
        <Text style={styles.headerSubtitle}>Quick access to help and support</Text>
      </BlurView>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency SOS</Text>
          <TouchableOpacity style={styles.sosButton}>
            <AlertTriangle color="#fff" size={32} />
            <Text style={styles.sosButtonText}>Activate Emergency SOS</Text>
            <Text style={styles.sosButtonSubtext}>
              Immediately alert emergency contacts and share your location
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Check-in</Text>
          
          <BlurView intensity={80} tint="light" style={styles.card}>
            <View style={styles.cardHeader}>
              <MapPin size={24} color="#4F46E5" />
              <Text style={styles.cardTitle}>Share Location</Text>
            </View>
            <Text style={styles.cardDescription}>
              Share your current location with trusted contacts
            </Text>
            <TouchableOpacity
              style={[styles.actionButton, locationShared && styles.actionButtonSuccess]}
              onPress={handleLocationShare}>
              <Text style={styles.actionButtonText}>
                {locationShared ? 'Location Shared' : 'Share Location'}
              </Text>
            </TouchableOpacity>
          </BlurView>

          <BlurView intensity={80} tint="light" style={styles.card}>
            <View style={styles.cardHeader}>
              <Camera size={24} color="#4F46E5" />
              <Text style={styles.cardTitle}>Upload Photo</Text>
            </View>
            <Text style={styles.cardDescription}>
              Take or upload a photo for your safety record
            </Text>
            <TouchableOpacity
              style={[styles.actionButton, photoUploaded && styles.actionButtonSuccess]}
              onPress={handlePhotoUpload}>
              <Text style={styles.actionButtonText}>
                {photoUploaded ? 'Photo Uploaded' : 'Upload Photo'}
              </Text>
            </TouchableOpacity>
          </BlurView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          
          <BlurView intensity={80} tint="light" style={styles.alertCard}>
            <Bell size={20} color="#DC2626" />
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Emergency Alert Triggered</Text>
              <Text style={styles.alertTime}>Today, 2:30 PM</Text>
            </View>
          </BlurView>

          <BlurView intensity={80} tint="light" style={styles.alertCard}>
            <MapPin size={20} color="#4F46E5" />
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Location Shared</Text>
              <Text style={styles.alertTime}>Today, 1:15 PM</Text>
            </View>
          </BlurView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 24,
    color: '#111827',
  },
  headerSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  sosButton: {
    backgroundColor: '#DC2626',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  sosButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#fff',
    marginTop: 12,
  },
  sosButtonSubtext: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  cardDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonSuccess: {
    backgroundColor: '#059669',
  },
  actionButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    gap: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#111827',
  },
  alertTime: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});