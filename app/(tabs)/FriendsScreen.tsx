import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import { FriendCard } from '@/components/FriendCard';
import { SearchBar } from '@/components/SearchBar';
import { User } from '@/types/models';

export default function FriendsScreen() {
  const { usersList, setSelectedFriend, addFriend, removeFriend, profile } = useAppContext();
  const [search, setSearch] = useState('');
  const router = useRouter();

  const isSearching = search.trim().length > 0;
  const filtered = isSearching
    ? usersList.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
    : usersList;

  function handleFriendPress(user: User) {
    setSelectedFriend(user);
    router.push('/friend-detail');
  }

  function handleAdd(user: User) {
    if (profile.friends.includes(user.name)) {
      removeFriend(user.name);
    } else {
      addFriend(user.name);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <SearchBar value={search} onChangeText={setSearch} placeholder="Search new friend" />
      <ScrollView>
        {filtered.length === 0
          ? <Text style={styles.empty}>No friends found.</Text>
          : filtered.map((user) => (
              <FriendCard
                key={user.name}
                user={user}
                showAddButton={isSearching}
                onPress={() => handleFriendPress(user)}
                onAdd={() => handleAdd(user)}
              />
            ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  empty: { textAlign: 'center', color: '#999', marginVertical: 16, fontSize: 14 },
});
