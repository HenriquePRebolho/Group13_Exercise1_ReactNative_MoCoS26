import React from 'react';
import { Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { User } from '@/types/models';

interface Props {
  user: User;
  showAddButton?: boolean;
  onPress?: () => void;
  onAdd?: () => void;
}

export function FriendCard({ user, showAddButton, onPress, onAdd }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress} android_ripple={{ color: '#eee' }}>
      <MaterialIcons name="account-circle" size={52} color="#aaa" style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      {showAddButton && (
        <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 80,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: { marginRight: 12 },
  name: { fontWeight: 'bold', fontSize: 18, flex: 1 },
  addBtn: {
    backgroundColor: '#0a7ea4',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  addText: { color: '#fff', fontWeight: 'bold' },
});
