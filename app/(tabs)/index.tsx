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
      <ScrollView contentContainerStyle={styles.content}>
        <BlurView intensity={80} tint="light" style={styles.header}>
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
        </BlurView>

        <TouchableOpacity style={styles.emergencyButton}>
          <View style={styles.emergencyContent}>
            <AlertTriangle color="#DC2626" size={24} />
            <Text style={styles.emergencyText}>SOS Emergency Alert</Text>
          </View>
          <Text style={styles.emergencyDescription}>
            Tap for immediate assistance and location sharing
          </Text>
        </TouchableOpacity>

        <View style={styles.quickActions}>
          <Link href="/chat" asChild>
            <TouchableOpacity style={styles.quickAction}>
              <MessageCircle size={24} color="#4F46E5" />
              <Text style={styles.quickActionText}>Chat Support</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.quickAction}>
              <Users size={24} color="#4F46E5" />
              <Text style={styles.quickActionText}>Community</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.quickAction}>
            <Calendar size={24} color="#4F46E5" />
            <Text style={styles.quickActionText}>Events</Text>
          </TouchableOpacity>
          <Link href="/resources" asChild>
          <TouchableOpacity style={styles.quickAction}>
            <BookOpen size={24} color="#4F46E5" />
            <Text style={styles.quickActionText}>Resources</Text>
          </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.eventsScroll}>
            {upcomingEvents.map(event => (
              <BlurView key={event.id} intensity={80} tint="light" style={styles.eventCard}>
                <Image source={{ uri: event.image }} style={styles.eventImage} />
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventTime}>{event.time}</Text>
                </View>
              </BlurView>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support Services</Text>
          <View style={styles.services}>
            <ServiceCard
              icon={<Shield color="#4F46E5" size={24} />}
              title="Legal Aid"
              description="Connect with pro-bono lawyers"
              action="Connect Now"
            />
            <ServiceCard
              icon={<MessageCircle color="#4F46E5" size={24} />}
              title="24/7 Support"
              description="Chat with our AI assistant"
              action="Start Chat"
            />
            <ServiceCard
              icon={<Phone color="#4F46E5" size={24} />}
              title="Helpline"
              description="Call our support team"
              action="Call Now"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Helpful Resources</Text>
          {resources.map(resource => (
            <BlurView key={resource.id} intensity={80} tint="light" style={styles.resourceCard}>
              <Image source={{ uri: resource.image }} style={styles.resourceImage} />
              <View style={styles.resourceContent}>
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <Text style={styles.resourceDescription}>{resource.description}</Text>
                <TouchableOpacity style={styles.resourceButton}>
                  <Text style={styles.resourceButtonText}>Read More</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function ServiceCard({ icon, title, description, action }) {
  return (
    <BlurView intensity={80} tint="light" style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>{icon}</View>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <Text style={styles.cardDescription}>{description}</Text>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>{action}</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  greeting: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  name: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 24,
    color: '#111827',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  quickAction: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#111827',
  },
  emergencyButton: {
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  emergencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emergencyText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#DC2626',
  },
  emergencyDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#DC2626',
    opacity: 0.8,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 16,
  },
  eventsScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  eventCard: {
    width: 280,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  eventImage: {
    width: '100%',
    height: 140,
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  eventTime: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  services: {
    gap: 16,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  cardDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  cardButton: {
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  resourceCard: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  resourceImage: {
    width: 100,
    height: '100%',
  },
  resourceContent: {
    flex: 1,
    padding: 16,
  },
  resourceTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  resourceDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  resourceButton: {
    backgroundColor: '#EEF2FF',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  resourceButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#4F46E5',
  },
});