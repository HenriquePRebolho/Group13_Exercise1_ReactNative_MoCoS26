import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  items: string[];
}

export function Listing({ title, items }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.flow}>
        {items.map((item, i) => (
          <View key={i} style={styles.pill}>
            <Text style={styles.pillText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 10 },
  title: { fontWeight: 'bold', fontSize: 15, marginBottom: 8 },
  flow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  pillText: { fontSize: 13 },
});
