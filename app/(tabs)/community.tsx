import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Heart, MessageCircle, Share2, Shield, Users, Calendar, MapPin, CheckCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

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

  const renderDiscussionPost = (post) => (
    <BlurView key={post.id} intensity={80} tint="light" style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.author}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
            {post.author.isVerified && (
              <View style={styles.verifiedBadge}>
                <CheckCircle size={12} color="#fff" />
              </View>
            )}
          </View>
          <View>
            <Text style={styles.authorName}>{post.author.name}</Text>
            <Text style={styles.timestamp}>{post.timestamp}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      {post.image && (
        <View style={styles.postImageContainer}>
          <Image source={{ uri: post.image }} style={styles.postImage} />
        </View>
      )}

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.action}>
          <Heart size={20} color="#FF6B6B" fill="#FF6B6B" />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action}>
          <MessageCircle size={20} color="#4ECDC4" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action}>
          <Share2 size={20} color="#A78BFA" />
        </TouchableOpacity>
      </View>
    </BlurView>
  );

  const renderEventCard = (event) => (
    <BlurView key={event.id} intensity={80} tint="light" style={styles.event}>
      <View style={styles.eventImageContainer}>
        <Image source={{ uri: event.image }} style={styles.eventImage} />
        <View style={styles.eventBadge}>
          <Calendar size={16} color="#fff" />
        </View>
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.eventDetailsRow}>
          <Calendar size={16} color="#4F46E5" />
          <Text style={styles.eventDetailText}>{event.date}</Text>
        </View>
        <View style={styles.eventDetailsRow}>
          <MapPin size={16} color="#4F46E5" />
          <Text style={styles.eventDetailText}>{event.location}</Text>
        </View>
        <View style={styles.eventDetailsRow}>
          <Users size={16} color="#4F46E5" />
          <Text style={styles.eventDetailText}>{event.attendees} attending</Text>
        </View>

        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join Event</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );

  return (
    <View style={styles.container}>
      <BlurView intensity={80} tint="light" style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Community</Text>
          <Text style={styles.headerSubtitle}>Connect, share, and grow together</Text>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'discussions' && styles.activeTab]}
            onPress={() => setActiveTab('discussions')}>
            <MessageCircle
              size={16}
              color={activeTab === 'discussions' ? '#fff' : '#6B7280'}
            />
            <Text style={[styles.tabText, activeTab === 'discussions' && styles.activeTabText]}>
              Discussions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'events' && styles.activeTab]}
            onPress={() => setActiveTab('events')}>
            <Calendar
              size={16}
              color={activeTab === 'events' ? '#fff' : '#6B7280'}
            />
            <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
              Events
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {activeTab === 'discussions'
            ? discussions.map(renderDiscussionPost)
            : events.map(renderEventCard)
          }
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
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 28,
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  tabs: {
    flexDirection: 'row',
    gap: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
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
  contentContainer: {
    padding: 16,
    gap: 16,
  },
  post: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    padding: 2,
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
  postImageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  actionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#4F46E5',
  },
  event: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImageContainer: {
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(79, 70, 229, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 12,
  },
  eventDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  eventDetailText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  joinButton: {
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  joinButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
});