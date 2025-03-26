import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { Heart, MessageCircle, Share2, Shield } from 'lucide-react-native';

export default function Community() {
  const [activeTab, setActiveTab] = useState('discussions');

  const discussions = [
    {
      id: 1,
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&fit=crop',
        isVerified: true,
      },
      content: 'Just attended an amazing workshop on building emotional resilience. Here are my key takeaways...',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&h=400&fit=crop',
      likes: 128,
      comments: 32,
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      author: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&fit=crop',
        isVerified: true,
      },
      content: 'Remember: Your story matters. Your voice matters. You are not alone in this journey.',
      likes: 256,
      comments: 45,
      timestamp: '4 hours ago',
    },
  ];

  const events = [
    {
      id: 1,
      title: 'Legal Rights Workshop',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&h=400&fit=crop',
      date: 'March 15, 2024',
      time: '2:00 PM - 4:00 PM',
      location: 'Virtual Event',
      attendees: 156,
    },
    {
      id: 2,
      title: 'Healing Through Art',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600&h=400&fit=crop',
      date: 'March 20, 2024',
      time: '6:00 PM - 8:00 PM',
      location: 'Community Center',
      attendees: 89,
    },
  ];

  return (
    <View style={styles.container}>
      <BlurView intensity={80} tint="light" style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <Text style={styles.headerSubtitle}>Connect, share, and grow together</Text>
        
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'discussions' && styles.activeTab]}
            onPress={() => setActiveTab('discussions')}>
            <Text style={[styles.tabText, activeTab === 'discussions' && styles.activeTabText]}>
              Discussions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'events' && styles.activeTab]}
            onPress={() => setActiveTab('events')}>
            <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
              Events
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>

      <ScrollView style={styles.content}>
        {activeTab === 'discussions' ? (
          <View style={styles.discussions}>
            {discussions.map((post) => (
              <BlurView key={post.id} intensity={80} tint="light" style={styles.post}>
                <View style={styles.postHeader}>
                  <View style={styles.author}>
                    <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
                    <View>
                      <Text style={styles.authorName}>{post.author.name}</Text>
                      <Text style={styles.timestamp}>{post.timestamp}</Text>
                    </View>
                  </View>
                  {post.author.isVerified && (
                    <Shield size={16} color="#4F46E5" />
                  )}
                </View>
                
                <Text style={styles.postContent}>{post.content}</Text>
                
                {post.image && (
                  <Image source={{ uri: post.image }} style={styles.postImage} />
                )}
                
                <View style={styles.postActions}>
                  <TouchableOpacity style={styles.action}>
                    <Heart size={20} color="#6B7280" />
                    <Text style={styles.actionText}>{post.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action}>
                    <MessageCircle size={20} color="#6B7280" />
                    <Text style={styles.actionText}>{post.comments}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action}>
                    <Share2 size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </BlurView>
            ))}
          </View>
        ) : (
          <View style={styles.events}>
            {events.map((event) => (
              <BlurView key={event.id} intensity={80} tint="light" style={styles.event}>
                <Image source={{ uri: event.image }} style={styles.eventImage} />
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDate}>{event.date}</Text>
                  <Text style={styles.eventTime}>{event.time}</Text>
                  <Text style={styles.eventLocation}>{event.location}</Text>
                  <Text style={styles.eventAttendees}>{event.attendees} attending</Text>
                  
                  <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>Join Event</Text>
                  </TouchableOpacity>
                </View>
              </BlurView>
            ))}
          </View>
        )}
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
  tabs: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#4F46E5',
  },
  tabText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  discussions: {
    padding: 16,
    gap: 16,
  },
  post: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  timestamp: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  postContent: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    gap: 24,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  events: {
    padding: 16,
    gap: 16,
  },
  event: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  eventImage: {
    width: '100%',
    height: 160,
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 8,
  },
  eventDate: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#4F46E5',
    marginBottom: 4,
  },
  eventTime: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  eventLocation: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  eventAttendees: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
});