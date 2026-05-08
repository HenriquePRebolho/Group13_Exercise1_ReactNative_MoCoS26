import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppContext } from '@/context/AppContext';
import { ProfileInfoRow } from '@/components/ProfileInfoRow';
import { Listing } from '@/components/Listing';

export default function ProfileScreen() {
  const { profile } = useAppContext();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <MaterialIcons name="account-circle" size={100} color="#aaa" />
          <View style={styles.nameRow}>
            <Text style={styles.name}>{profile.name}</Text>
            <MaterialIcons name="male" size={22} color="#555" />
          </View>
          <Text style={styles.description}>{profile.description}</Text>
        </View>

        <Listing title="Hobbies" items={profile.hobbies} />
        <Listing title="Languages" items={profile.languages} />

        <ProfileInfoRow field="Location"     value={profile.location}             iconName="home"     iconColor="#4CAF50" />
        <ProfileInfoRow field="Birthday"     value={profile.birthday}             iconName="cake"     iconColor="#2196F3" />
        <ProfileInfoRow field="Instagram"    value={profile.contactInfo[1] ?? ''} iconName="language" iconColor="#00BCD4" />
        <ProfileInfoRow field="Phone number" value={profile.contactInfo[0] ?? ''} iconName="phone"    iconColor="#F44336" />
        <ProfileInfoRow field="Email"        value={profile.email}                iconName="email"    iconColor="#FFC107" />
        <ProfileInfoRow field="Password"     value="•••••••••••••••"              iconName="lock"     iconColor="#212121" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { paddingBottom: 30 },
  avatarSection: { alignItems: 'center', paddingTop: 20, paddingBottom: 10 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  name: { fontSize: 20 },
  description: {
    fontWeight: '300',
    textAlign: 'center',
    paddingHorizontal: 24,
    marginTop: 4,
    marginBottom: 16,
    color: '#333',
  },
});
