import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { MapPin, Bell, Camera, TriangleAlert as AlertTriangle, ShieldCheck, CheckCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function Alerts() {
  const [locationShared, setLocationShared] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const handleLocationShare = () => {
    if (Platform.OS === 'web') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationShared(true);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
  };

  const handlePhotoUpload = () => {
    setPhotoUploaded(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <AlertTriangle size={32} color="#DC2626" />
          <View>
            <Text style={styles.headerTitle}>Emergency Alerts</Text>
            <Text style={styles.headerSubtitle}>Quick Help & Support</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Emergency SOS Section */}
        <TouchableOpacity style={styles.sosButton}>
          <View style={styles.sosButtonInner}>
            <AlertTriangle color="#fff" size={40} />
            <Text style={styles.sosButtonText}>Emergency SOS</Text>
            <Text style={styles.sosButtonSubtext}>
              Instantly alert emergency contacts and share precise location
            </Text>
          </View>
        </TouchableOpacity>

        {/* Safety Check-in Section */}
        <View style={styles.safetySection}>
          <Text style={styles.sectionTitle}>Safety Check-in</Text>

          <View style={styles.cardRow}>
            <TouchableOpacity
              style={[styles.card, locationShared && styles.cardSuccess]}
              onPress={handleLocationShare}
            >
              <View style={styles.cardHeader}>
                <MapPin size={24} color="#4F46E5" />
                <Text style={styles.cardTitle}>Share Location</Text>
              </View>
              <Text style={styles.cardDescription}>
                {locationShared
                  ? 'Location shared with trusted contacts'
                  : 'Share your current location'}
              </Text>
              <View style={styles.cardFooter}>
                {locationShared ? (
                  <ShieldCheck size={24} color="#059669" />
                ) : (
                  <Text style={styles.cardAction}>Share Now</Text>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, photoUploaded && styles.cardSuccess]}
              onPress={handlePhotoUpload}
            >
              <View style={styles.cardHeader}>
                <Camera size={24} color="#4F46E5" />
                <Text style={styles.cardTitle}>Upload Photo</Text>
              </View>
              <Text style={styles.cardDescription}>
                {photoUploaded
                  ? 'Safety photo recorded'
                  : 'Take or upload a safety record photo'}
              </Text>
              <View style={styles.cardFooter}>
                {photoUploaded ? (
                  <CheckCircle size={24} color="#059669" />
                ) : (
                  <Text style={styles.cardAction}>Upload</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Alerts Section */}
        <View style={styles.alertSection}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>

          {[
            { icon: <Bell size={20} color="#DC2626" />, title: 'Emergency Alert Triggered', time: 'Today, 2:30 PM' },
            { icon: <MapPin size={20} color="#4F46E5" />, title: 'Location Shared', time: 'Today, 1:15 PM' }
          ].map((alert, index) => (
            <View key={index} style={styles.alertCard}>
              {alert.icon}
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
            </View>
          ))}
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    color: '#111827',
  },
  headerSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sosButton: {
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: '#DC2626',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  sosButtonInner: {
    padding: 24,
    alignItems: 'center',
  },
  sosButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
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
  safetySection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: width / 2 - 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSuccess: {
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
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
    fontSize: 13,
    color: '#6B7280',
    minHeight: 40,
  },
  cardFooter: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  cardAction: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#4F46E5',
  },
  alertSection: {
    marginTop: 16,
    marginBottom: 24,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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