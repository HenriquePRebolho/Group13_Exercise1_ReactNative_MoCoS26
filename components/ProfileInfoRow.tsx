import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

interface Props {
  field: string;
  value: string;
  iconName: IconName;
  iconColor: string;
}

export function ProfileInfoRow({ field, value, iconName, iconColor }: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconCircle, { backgroundColor: iconColor }]}>
        <MaterialIcons name={iconName} size={20} color="#fff" />
      </View>
      <View style={styles.textCol}>
        <Text style={styles.field}>{field}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textCol: { flex: 1 },
  field: { fontWeight: '300', fontSize: 13, color: '#555' },
  value: { fontWeight: 'bold', fontSize: 15 },
});
