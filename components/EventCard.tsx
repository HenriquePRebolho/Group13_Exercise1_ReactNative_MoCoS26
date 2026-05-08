import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AppEvent } from '@/types/models';

interface Props {
  event: AppEvent;
  onPress?: () => void;
}

export function EventCard({ event, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.name}>{event.name}</Text>
      <View style={styles.row}>
        <MaterialIcons name="schedule" size={16} color="#aaa" style={styles.icon} />
        <Text style={styles.info}>{event.date}, {event.timeStart}–{event.timeEnd}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="location-on" size={16} color="#aaa" style={styles.icon} />
        <Text style={styles.info} numberOfLines={1}>{event.location}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="group" size={16} color="#aaa" style={styles.icon} />
        <Text style={styles.info}>{event.participants.length}/{event.limitPeople} joined</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
    minHeight: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: { fontWeight: 'bold', fontSize: 18, marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  icon: { marginRight: 6 },
  info: { fontSize: 13, color: '#555', flex: 1 },
});
