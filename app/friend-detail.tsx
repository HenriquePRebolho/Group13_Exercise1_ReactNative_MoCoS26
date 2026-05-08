import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppContext } from '@/context/AppContext';
import { ProfileInfoRow } from '@/components/ProfileInfoRow';
import { Listing } from '@/components/Listing';

export default function FriendDetailScreen() {
  const { selectedFriend, profile, addFriend, removeFriend } = useAppContext();
  const user = selectedFriend;

  if (!user) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.empty}>No friend selected.</Text>
      </SafeAreaView>
    );
  }

  const isFriend = profile.friends.includes(user.name);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <MaterialIcons name="account-circle" size={100} color="#aaa" />
          <View style={styles.nameRow}>
            <Text style={styles.name}>{user.name}</Text>
            <MaterialIcons name="male" size={22} color="#555" />
          </View>
          <Text style={styles.description}>{user.description}</Text>
          <TouchableOpacity
            style={[styles.friendBtn, isFriend ? styles.removeBtn : styles.addBtn]}
            onPress={() => isFriend ? removeFriend(user.name) : addFriend(user.name)}
          >
            <Text style={styles.friendBtnText}>{isFriend ? 'Remove friend' : 'Add friend'}</Text>
          </TouchableOpacity>
        </View>

        <Listing title="Hobbies"   items={user.hobbies} />
        <Listing title="Languages" items={user.languages} />

        <ProfileInfoRow field="Location"     value={user.location}             iconName="home"     iconColor="#4CAF50" />
        <ProfileInfoRow field="Birthday"     value={user.birthday}             iconName="cake"     iconColor="#2196F3" />
        <ProfileInfoRow field="Instagram"    value={user.contactInfo[1] ?? ''} iconName="language" iconColor="#00BCD4" />
        <ProfileInfoRow field="Phone number" value={user.contactInfo[0] ?? ''} iconName="phone"    iconColor="#F44336" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  empty: { padding: 20, color: '#555' },
  content: { paddingBottom: 30 },
  avatarSection: { alignItems: 'center', paddingTop: 20, paddingBottom: 10 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  name: { fontSize: 20 },
  description: {
    fontWeight: '300',
    textAlign: 'center',
    paddingHorizontal: 24,
    marginTop: 4,
    marginBottom: 8,
    color: '#333',
  },
  friendBtn: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  addBtn: { backgroundColor: '#0a7ea4' },
  removeBtn: { backgroundColor: '#F44336' },
  friendBtnText: { color: '#fff', fontWeight: 'bold' },
});
