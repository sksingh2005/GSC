import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Shield, Users } from 'lucide-react-native';
import * as Animatable from "react-native-animatable";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4F46E5', '#7C3AED']}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.content}>
      <Animatable.View style={styles.header}
      animation="bounce"
      duration={800}
      iterationCount={'infinite'}
      >
        <Text style={styles.title}>SafeHaven</Text>
        <Text style={styles.subtitle}>Your safe space for support and guidance</Text>
      </Animatable.View>

        <View style={styles.features}>
          <Feature
            icon={<Shield color="#fff" size={24} />}
            title="Legal Protection"
            description="Access pro-bono legal support and guidance"
          />
          <Feature
            icon={<Heart color="#fff" size={24} />}
            title="Mental Health"
            description="24/7 AI-powered emotional support"
          />
          <Feature
            icon={<Users color="#fff" size={24} />}
            title="Community"
            description="Connect with others in a safe space"
          />
        </View>

        <Link href="/sign-in" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

function Feature({ icon, title, description }:{ icon: React.ReactNode, title: string, description: string }) {
  return (
    <View style={styles.feature}>
      <View style={styles.featureIcon}>{icon}</View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 36,
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 8,
    textAlign: 'center',
  },
  features: {
    gap: 24,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#fff',
  },
  featureDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    flex: 1,
  },
  button: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#4F46E5',
  },
});