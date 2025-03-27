import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Send, Mic, Camera } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router'; // Import useNavigation

interface Message {
  id: string;
  sender: string;
  text?: string;
  imageUri?: string;
  audioUri?: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // Use navigation to detect focus/blur events
  const navigation = useNavigation();

  useEffect(() => {
    const serverUrl = 'ws://192.168.0.102:3000/chat';
    socketRef.current = new WebSocket(serverUrl);

    socketRef.current.onopen = () => {
      console.log('WebSocket connection established');
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), sender: 'bot', text: 'Welcome to AI Support Chat' },
      ]);
    };

    socketRef.current.onmessage = async (event) => {
      const response = JSON.parse(event.data);
      if (response.type === 'ai_response') {
        if (isSpeaking) {
          Speech.stop();
          setIsSpeaking(false);
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now().toString(), sender: 'bot', text: response.message },
        ]);
        setIsLoading(false);

        setIsSpeaking(true);
        Speech.speak(response.message, {
          language: 'en-US',
          pitch: 1.0,
          rate: 1.0,
          onDone: () => setIsSpeaking(false),
          onError: (error) => {
            console.error('Speech error:', error);
            setIsSpeaking(false);
          },
        });
      } else if (response.type === 'error') {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now().toString(), sender: 'bot', text: response.message },
        ]);
        setIsLoading(false);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), sender: 'bot', text: 'Connection error. Please try again.' },
      ]);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      Speech.stop();
      setIsSpeaking(false);
    };
  }, []);

  // Add navigation event listeners to stop speech when the screen loses focus
  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      console.log('ChatScreen lost focus, stopping speech');
      Speech.stop();
      setIsSpeaking(false);
    });

    const unsubscribeFocus = navigation.addListener('focus', () => {
      console.log('ChatScreen gained focus');
      // Optionally, you can resume or restart something here if needed
    });

    return () => {
      unsubscribeBlur();
      unsubscribeFocus();
    };
  }, [navigation]);

  const requestAudioPermission = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access microphone is required!');
      return false;
    }
    return true;
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera is required!');
      return false;
    }
    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (libraryStatus !== 'granted') {
      alert('Permission to access photo library is required!');
      return false;
    }
    return true;
  };

  const startRecording = async () => {
    const hasPermission = await requestAudioPermission();
    if (!hasPermission) return;

    setIsRecording(true);
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording:', err);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (uri) {
        const newMessage: Message = {
          id: Date.now().toString(),
          sender: 'user',
          audioUri: uri,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({
            type: 'user_audio',
            audioUri: uri,
          }));
        }
      }
    } catch (err) {
      console.error('Failed to stop recording:', err);
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        imageUri: uri,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({
          type: 'user_image',
          imageUri: uri,
        }));
      }
    }
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsLoading(true);

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'user_message',
        message: inputText.trim(),
      }));
    } else {
      console.error('WebSocket not connected');
      setIsLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), sender: 'bot', text: 'Not connected to server.' },
      ]);
    }

    setInputText('');
  };

  return (
    <LinearGradient
      colors={['#c5cae9', '#e1bee7', '#ffcdd2']}
      style={styles.container}
      start={{ x: 1, y: 0.5 }}
      end={{ x: 0.5, y: 0 }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>AI Support Chat</Text>
          <Text style={styles.subtitle}>Confidential 24/7 support</Text>
        </View>

        <ScrollView
          style={styles.chatContainer}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.sender === 'user' && styles.userMessageContainer,
              ]}
            >
              <Text style={styles.botName}>
                {message.sender === 'bot' ? 'SafeHaven AI' : 'You'}
              </Text>
              <View
                style={[
                  styles.botMessage,
                  message.sender === 'user' && styles.userMessage,
                ]}
              >
                {message.text && (
                  <Text style={styles.messageText}>{message.text}</Text>
                )}
                {message.imageUri && (
                  <Image
                    source={{ uri: message.imageUri }}
                    style={styles.messageImage}
                    resizeMode="contain"
                  />
                )}
                {message.audioUri && (
                  <Text style={styles.messageText}>[Voice Message]</Text>
                )}
              </View>
            </View>
          ))}

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="green" />
              <Text style={styles.loadingText}>AI is thinking...</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#e64a19"
            multiline
            value={inputText}
            onChangeText={setInputText}
          />
          <Pressable
            style={styles.actionButton}
            onPress={pickImage}
            disabled={isLoading}
          >
            <Camera size={24} color={isLoading ? '#999' : 'green'} />
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={isRecording ? stopRecording : startRecording}
            disabled={isLoading}
          >
            <Mic size={24} color={isRecording ? 'red' : isLoading ? '#999' : 'green'} />
          </Pressable>
          <Pressable
            style={styles.sendButton}
            onPress={sendMessage}
            disabled={inputText.trim() === '' || isLoading}
          >
            <Send size={24} color={inputText.trim() === '' || isLoading ? '#999' : 'green'} />
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 3,
    borderBottomColor: '#795548',
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
    color: 'green',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 14,
    color: '#666666',
  },
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  botName: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  botMessage: {
    backgroundColor: '#F3D6B1',
    padding: 16,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: 'green',
    shadowColor: '#5300eb',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#E3F2FD',
    borderColor: '#1976D2',
    shadowColor: '#1976D2',
  },
  messageText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 16,
    color: 'black',
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 3,
    borderTopColor: '#000000',
    gap: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: 'green',
    padding: 12,
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 16,
    color: 'black',
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#cfd8dc',
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'green',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  actionButton: {
    backgroundColor: '#cfd8dc',
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'green',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 8,
  },
  loadingText: {
    marginLeft: 8,
    fontFamily: 'SpaceGrotesk-Regular',
    color: 'green',
  },
});