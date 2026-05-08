import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import { EventCard } from '@/components/EventCard';
import { SearchBar } from '@/components/SearchBar';
import { AppEvent } from '@/types/models';

export default function NewScreen() {
  const { eventsList, setSelectedEvent } = useAppContext();
  const [search, setSearch] = useState('');
  const router = useRouter();

  function handleEventPress(event: AppEvent) {
    setSelectedEvent(event);
    router.push('/event-detail');
  }

  const filtered = search.trim()
    ? eventsList.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
    : eventsList;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <TouchableOpacity style={styles.createBtn} onPress={() => router.push('/create-event')}>
          <Text style={styles.createBtnText}>Create new event</Text>
          <MaterialIcons name="add-circle" size={22} color="#fff" />
        </TouchableOpacity>

        <SearchBar value={search} onChangeText={setSearch} placeholder="Search events" />

        {filtered.length === 0
          ? <Text style={styles.empty}>No events match your search.</Text>
          : filtered.map((event) => (
              <EventCard key={event.id} event={event} onPress={() => handleEventPress(event)} />
            ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  createBtn: {
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
  createBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
  empty: { textAlign: 'center', color: '#999', marginVertical: 16, fontSize: 14 },
});
