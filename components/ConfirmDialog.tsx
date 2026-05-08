import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ visible, text, onConfirm, onCancel }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.text}>{text}</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.btn} onPress={onConfirm}>
              <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.cancelBtn]} onPress={onCancel}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    minWidth: 260,
    elevation: 5,
  },
  text: { fontSize: 16, marginBottom: 16, textAlign: 'center' },
  row: { flexDirection: 'row', gap: 10 },
  btn: {
    backgroundColor: '#0a7ea4',
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  cancelBtn: { backgroundColor: '#888' },
  btnText: { color: '#fff', fontWeight: 'bold' },
});
