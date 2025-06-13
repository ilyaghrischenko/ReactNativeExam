import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { FAB, Portal, Dialog, TextInput, Button } from 'react-native-paper';
import { useShoppingList } from '../context/ShoppingListContext';
import ListItem from '../components/ListItem';

const ListsScreen = ({ navigation }) => {
  const { state, dispatch } = useShoppingList();
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleAddList = () => {
    if (newListName.trim()) {
      dispatch({
        type: 'ADD_LIST',
        payload: {
          id: Date.now().toString(),
          name: newListName.trim(),
          products: [],
        },
      });
      setNewListName('');
      setAddDialogVisible(false);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem
      list={item}
      onPress={() => navigation.navigate('ListDetail', { listId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={state.lists}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      <Portal>
        <Dialog visible={addDialogVisible} onDismiss={() => setAddDialogVisible(false)}>
          <Dialog.Title>Новий список покупок</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Назва списку"
              value={newListName}
              onChangeText={setNewListName}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAddDialogVisible(false)}>Скасувати</Button>
            <Button onPress={handleAddList}>Створити</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setAddDialogVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingVertical: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ListsScreen; 