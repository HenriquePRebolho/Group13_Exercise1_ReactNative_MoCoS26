import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/context/AppContext';

export default function CreateEventScreen() {
  const { createEvent } = useAppContext();
  const router = useRouter();

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [limitPeople, setLimitPeople] = useState('10');
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState('');
  const [languages, setLanguages] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [bring, setBring] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  function splitCSV(str: string): string[] {
    return str.split(',').map(s => s.trim()).filter(Boolean);
  }

  function handleCreate() {
    if (!name.trim()) {
      Alert.alert('Missing field', 'Event name is required.');
      return;
    }
    createEvent({
      name: name.trim(),
      date: date.trim() || 'TBD',
      timeStart: timeStart.trim() || '--:--',
      timeEnd: timeEnd.trim() || '--:--',
      location: location.trim() || 'TBD',
      description: description.trim(),
      tags: splitCSV(tags),
      restrictions: splitCSV(restrictions),
      languages: splitCSV(languages),
      limitPeople: parseInt(limitPeople) || 10,
      public: isPublic,
      bring: splitCSV(bring),
      contactInfo: splitCSV(contactInfo),
    });
    router.back();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

          <Field label="Event name *" value={name} onChangeText={setName} placeholder="e.g. Hiking trip" />
          <Field label="Date" value={date} onChangeText={setDate} placeholder="dd/mm/yyyy" />

          <View style={styles.row}>
            <View style={styles.half}>
              <Field label="Start time" value={timeStart} onChangeText={setTimeStart} placeholder="14:00" />
            </View>
            <View style={styles.half}>
              <Field label="End time" value={timeEnd} onChangeText={setTimeEnd} placeholder="16:00" />
            </View>
          </View>

          <Field label="Location" value={location} onChangeText={setLocation} placeholder="Street, City" />
          <Field label="Description" value={description} onChangeText={setDescription} placeholder="What is this event about?" multiline />
          <Field label="Max participants" value={limitPeople} onChangeText={setLimitPeople} placeholder="10" keyboardType="numeric" />

          <View style={styles.switchRow}>
            <Text style={styles.label}>Public event</Text>
            <Switch
              value={isPublic}
              onValueChange={setIsPublic}
              trackColor={{ false: '#ccc', true: '#0a7ea4' }}
              thumbColor="#fff"
            />
          </View>

          <Text style={styles.sectionTitle}>Optional</Text>
          <Field label="Tags (comma separated)" value={tags} onChangeText={setTags} placeholder="Outdoor, Sport, Music" />
          <Field label="Languages (comma separated)" value={languages} onChangeText={setLanguages} placeholder="English, Spanish" />
          <Field label="Restrictions (comma separated)" value={restrictions} onChangeText={setRestrictions} placeholder="18+, No pets" />
          <Field label="What to bring (comma separated)" value={bring} onChangeText={setBring} placeholder="Water, Sunscreen" />
          <Field label="Contact info (comma separated)" value={contactInfo} onChangeText={setContactInfo} placeholder="+1 234-5678, @handle" />

          <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
            <Text style={styles.createBtnText}>Create Event</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric';
}

function Field({ label, value, onChangeText, placeholder, multiline, keyboardType = 'default' }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        multiline={multiline}
        keyboardType={keyboardType}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16, paddingBottom: 40 },
  row: { flexDirection: 'row', gap: 8 },
  half: { flex: 1 },
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 4 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#111',
  },
  multiline: { height: 90 },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 4,
  },
  createBtn: {
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  createBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
});
