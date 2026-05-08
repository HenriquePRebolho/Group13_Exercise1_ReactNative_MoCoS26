import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search' }: Props) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={20} color="#666" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 12,
    marginVertical: 8,
    paddingHorizontal: 10,
    height: 44,
  },
  icon: { marginRight: 6 },
  input: { flex: 1, fontSize: 15, color: '#111' },
});
