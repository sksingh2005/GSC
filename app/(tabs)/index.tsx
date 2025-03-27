import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Shield, MessageCircle, TriangleAlert as AlertTriangle, Phone, Calendar, Users, BookOpen } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';

export default function Home() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Support Group Meeting',
      time: '2:00 PM Today',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Legal Rights Workshop',
      time: 'Tomorrow, 11:00 AM',
      image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=300&h=200&fit=crop'
    }
  ];

  const resources = [
    {
      id: 1,
      title: 'Understanding Your Rights',
      description: 'A comprehensive guide to legal protections',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Mental Health Guide',
      description: 'Tips and strategies for emotional well-being',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=300&h=200&fit=crop'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Gradient Header */}
        <View style={styles.gradientHeader}>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&fit=crop' }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.name}>Sarah</Text>
            </View>
          </View>
        </View>

        {/* Emergency Alert with Bold Design */}
        <TouchableOpacity style={styles.emergencyButton}>
          <View style={styles.emergencyContent}>
            <AlertTriangle color="#fff" size={24} />
            <Text style={styles.emergencyText}>SOS Emergency Alert</Text>
          </View>
          <Text style={styles.emergencyDescription}>
            Tap for immediate assistance and location sharing
          </Text>
        </TouchableOpacity>

        {/* Quick Actions with Card-like Design */}
        <View style={styles.quickActionsContainer}>
          <Link href="/chat" asChild>
            <TouchableOpacity style={styles.quickActionCard}>
              <MessageCircle size={24} color="#4F46E5" />
              <Text style={styles.quickActionText}>Chat Support</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/community" asChild>
            <TouchableOpacity style={styles.quickActionCard}>
              <Users size={24} color="#4F46E5" />
              <Text style={styles.quickActionText}>Community</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.quickActionCard}>
            <Calendar size={24} color="#4F46E5" />
            <Text style={styles.quickActionText}>Events</Text>
          </TouchableOpacity>
          <Link href="/resources" asChild>
            <TouchableOpacity style={styles.quickActionCard}>
              <BookOpen size={24} color="#4F46E5" />
              <Text style={styles.quickActionText}>Resources</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Upcoming Events with Enhanced Card Design */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.eventsScroll}
          >
            {upcomingEvents.map(event => (
              <View key={event.id} style={styles.enhancedEventCard}>
                <Image source={{ uri: event.image }} style={styles.eventImage} />
                <View style={styles.eventCardOverlay}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventTime}>{event.time}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Support Services with Bold Card Design */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support Services</Text>
          <View style={styles.servicesContainer}>
            <ServiceCard
              icon={<Shield color="#fff" size={24} />}
              title="Legal Aid"
              description="Connect with pro-bono lawyers"
              action="Connect Now"
              bgColor="#4F46E5"
            />
            <ServiceCard
              icon={<MessageCircle color="#fff" size={24} />}
              title="24/7 Support"
              description="Chat with our AI assistant"
              action="Start Chat"
              bgColor="#16A34A"
            />
            <ServiceCard
              icon={<Phone color="#fff" size={24} />}
              title="Helpline"
              description="Call our support team"
              action="Call Now"
              bgColor="#DC2626"
            />
          </View>
        </View>

        {/* Resources with Expanded Card Design */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Helpful Resources</Text>
          {resources.map(resource => (
            <View key={resource.id} style={styles.expandedResourceCard}>
              <Image source={{ uri: resource.image }} style={styles.resourceImage} />
              <View style={styles.resourceContent}>
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <Text style={styles.resourceDescription}>{resource.description}</Text>
                <TouchableOpacity style={styles.resourceButton}>
                  <Text style={styles.resourceButtonText}>Explore</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function ServiceCard({ icon, title, description, action, bgColor }) {
  return (
    <View style={[styles.serviceCard, { backgroundColor: bgColor }]}>
      <View style={styles.serviceCardContent}>
        <View style={styles.serviceIconContainer}>{icon}</View>
        <Text style={styles.serviceCardTitle}>{title}</Text>
        <Text style={styles.serviceCardDescription}>{description}</Text>
        <TouchableOpacity style={styles.serviceCardButton}>
          <Text style={styles.serviceCardButtonText}>{action}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    paddingBottom: 24,
  },
  // Gradient Header
  gradientHeader: {
    backgroundColor: '#4F46E5',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#fff',
  },
  greeting: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  name: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 24,
    color: '#fff',
  },
  // Emergency Button
  emergencyButton: {
    backgroundColor: '#DC2626',
    marginHorizontal: 24,
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  emergencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emergencyText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  emergencyDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  // Quick Actions
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#111827',
    marginTop: 8,
  },
  // Section Titles
  section: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 16,
  },
  // Events Scroll
  eventsScroll: {
    paddingBottom: 16,
  },
  enhancedEventCard: {
    width: 280,
    height: 200,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  eventImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  eventCardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
  },
  eventTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  eventTime: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  // Services Container
  servicesContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  serviceCard: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  serviceCardContent: {
    padding: 16,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceCardTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  serviceCardDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 16,
  },
  serviceCardButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  serviceCardButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  // Resources
  expandedResourceCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  resourceImage: {
    width: 120,
    height: 'auto',
  },
  resourceContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  resourceTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  resourceDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  resourceButton: {
    backgroundColor: '#4F46E5',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  resourceButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
});