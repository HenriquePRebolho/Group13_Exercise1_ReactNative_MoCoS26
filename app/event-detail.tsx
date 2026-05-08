import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppContext } from '@/context/AppContext';
import { Listing } from '@/components/Listing';

export default function EventDetailScreen() {
  const { selectedEvent, profile, joinEvent, leaveEvent } = useAppContext();
  const event = selectedEvent;

  if (!event) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.empty}>No event selected.</Text>
      </SafeAreaView>
    );
  }

  const inEvent = event.participants.includes(profile.name);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <View style={styles.imagePlaceholder}>
          <MaterialIcons name="event" size={80} color="#aaa" />
        </View>

        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.description}>{event.description}</Text>

        <View style={styles.infoRow}>
          <MaterialIcons name="schedule" size={16} color="#aaa" style={styles.icon} />
          <Text style={styles.infoText}>{event.date}, {event.timeStart}–{event.timeEnd}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={16} color="#aaa" style={styles.icon} />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="group" size={16} color="#aaa" style={styles.icon} />
          <Text style={styles.infoText}>{event.participants.length}/{event.limitPeople} joined</Text>
        </View>

        <Text style={styles.meta}>Created by: {event.owner}</Text>
        <Text style={styles.meta}>{event.contactInfo.join(', ')}</Text>

        <Listing title="Tags"         items={event.tags} />
        <Listing title="Restrictions" items={event.restrictions} />
        <Listing title="Languages"    items={event.languages} />
        <Listing title="Bring"        items={event.bring} />

        <TouchableOpacity
          style={[styles.actionBtn, inEvent ? styles.leaveBtn : styles.joinBtn]}
          onPress={() => inEvent ? leaveEvent(event.id) : joinEvent(event.id)}
        >
          <Text style={styles.actionBtnText}>{inEvent ? 'Leave' : 'Join'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  empty: { padding: 20, color: '#555' },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontWeight: 'bold', fontSize: 20, padding: 12 },
  description: { paddingHorizontal: 12, paddingBottom: 10, color: '#333' },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, marginBottom: 4 },
  icon: { marginRight: 6 },
  infoText: { fontSize: 14, color: '#555', flex: 1 },
  meta: { paddingHorizontal: 12, paddingVertical: 2, color: '#555', fontSize: 13 },
  actionBtn: {
    margin: 12,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  joinBtn: { backgroundColor: '#4CAF50' },
  leaveBtn: { backgroundColor: '#F44336' },
  actionBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
