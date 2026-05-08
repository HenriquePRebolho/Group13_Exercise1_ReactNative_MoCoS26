import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import { EventCard } from '@/components/EventCard';
import { AppEvent } from '@/types/models';

export default function EventsScreen() {
  const { eventsList, profile, visibilityOwned, visibilityJoined, setVisibilityOwned, setVisibilityJoined, setSelectedEvent } = useAppContext();
  const router = useRouter();

  const ownedEvents = eventsList.filter(e => e.owner === profile.name);
  const joinedEvents = eventsList.filter(e => e.participants.includes(profile.name) && e.owner !== profile.name);

  function handleEventPress(event: AppEvent) {
    setSelectedEvent(event);
    router.push('/event-detail');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <TouchableOpacity style={styles.sectionBtn} onPress={() => setVisibilityOwned(!visibilityOwned)}>
          <Text style={styles.sectionBtnText}>Owned Events</Text>
          <MaterialIcons name={visibilityOwned ? 'remove' : 'add'} size={22} color="#fff" />
        </TouchableOpacity>
        {visibilityOwned && (
          ownedEvents.length === 0
            ? <Text style={styles.empty}>No owned events yet.</Text>
            : ownedEvents.map((event) => (
                <EventCard key={`owned-${event.id}`} event={event} onPress={() => handleEventPress(event)} />
              ))
        )}

        <TouchableOpacity style={styles.sectionBtn} onPress={() => setVisibilityJoined(!visibilityJoined)}>
          <Text style={styles.sectionBtnText}>Joined Events</Text>
          <MaterialIcons name={visibilityJoined ? 'remove' : 'add'} size={22} color="#fff" />
        </TouchableOpacity>
        {visibilityJoined && (
          joinedEvents.length === 0
            ? <Text style={styles.empty}>No joined events yet.</Text>
            : joinedEvents.map((event) => (
                <EventCard key={`joined-${event.id}`} event={event} onPress={() => handleEventPress(event)} />
              ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  sectionBtn: {
    backgroundColor: '#0a7ea4',
    margin: 10,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  sectionBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
  empty: { textAlign: 'center', color: '#999', marginVertical: 16, fontSize: 14 },
});
