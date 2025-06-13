import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, IconButton, Dialog, Portal, Button, TextInput } from 'react-native-paper';
import { useShoppingList } from '../context/ShoppingListContext';

const ListItem = ({ list, onPress }) => {
  const { dispatch } = useShoppingList();
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editedName, setEditedName] = useState(list.name);

  const completedProducts = list.products?.filter(product => product.completed)?.length || 0;
  const totalProducts = list.products?.length || 0;

  const handleDelete = () => {
    dispatch({ type: 'DELETE_LIST', payload: list.id });
    setDeleteDialogVisible(false);
  };

  const handleEdit = () => {
    if (editedName.trim()) {
      dispatch({
        type: 'UPDATE_LIST',
        payload: { ...list, name: editedName.trim() },
      });
      setEditDialogVisible(false);
    }
  };

  return (
    <>
      <Card style={styles.card} onPress={onPress}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.titleContainer}>
            <Title>{list.name}</Title>
            <Paragraph>
              {totalProducts} товарів, з них {completedProducts} куплено
            </Paragraph>
          </View>
          <View style={styles.actions}>
            <IconButton
              icon="pencil"
              onPress={() => setEditDialogVisible(true)}
            />
            <IconButton
              icon="delete"
              onPress={() => setDeleteDialogVisible(true)}
            />
          </View>
        </Card.Content>
      </Card>

      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={() => setDeleteDialogVisible(false)}>
          <Dialog.Title>Видалити список</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Ви впевнені, що хочете видалити список "{list.name}"?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>Скасувати</Button>
            <Button onPress={handleDelete}>Видалити</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={editDialogVisible} onDismiss={() => setEditDialogVisible(false)}>
          <Dialog.Title>Редагувати список</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Назва списку"
              value={editedName}
              onChangeText={setEditedName}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditDialogVisible(false)}>Скасувати</Button>
            <Button onPress={handleEdit}>Зберегти</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
});

export default ListItem; 