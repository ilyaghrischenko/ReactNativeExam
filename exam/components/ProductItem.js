import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Checkbox, Text, IconButton, Dialog, Portal, Button, TextInput } from 'react-native-paper';
import { useShoppingList } from '../context/ShoppingListContext';

const ProductItem = ({ product, listId }) => {
  const { dispatch } = useShoppingList();
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editedName, setEditedName] = useState(product.name);
  const [editedQuantity, setEditedQuantity] = useState(product.quantity.toString());

  const handleToggleComplete = () => {
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: {
        listId,
        product: { ...product, completed: !product.completed },
      },
    });
  };

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: { listId, productId: product.id },
    });
    setDeleteDialogVisible(false);
  };

  const handleEdit = () => {
    if (editedName.trim() && editedQuantity.trim()) {
      dispatch({
        type: 'UPDATE_PRODUCT',
        payload: {
          listId,
          product: {
            ...product,
            name: editedName.trim(),
            quantity: parseInt(editedQuantity) || 1,
          },
        },
      });
      setEditDialogVisible(false);
    }
  };

  return (
    <>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Checkbox
            status={product.completed ? 'checked' : 'unchecked'}
            onPress={handleToggleComplete}
          />
          <View style={styles.productInfo}>
            <Text style={[
              styles.productName,
              product.completed && styles.completedText
            ]}>
              {product.name}
            </Text>
            <Text style={styles.quantity}>Кількість: {product.quantity}</Text>
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
          <Dialog.Title>Видалити товар</Dialog.Title>
          <Dialog.Content>
            <Text>Ви впевнені, що хочете видалити товар "{product.name}"?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>Скасувати</Button>
            <Button onPress={handleDelete}>Видалити</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={editDialogVisible} onDismiss={() => setEditDialogVisible(false)}>
          <Dialog.Title>Редагувати товар</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Назва товару"
              value={editedName}
              onChangeText={setEditedName}
              style={styles.input}
            />
            <TextInput
              label="Кількість"
              value={editedQuantity}
              onChangeText={setEditedQuantity}
              keyboardType="numeric"
              style={styles.input}
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
    marginVertical: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
    marginLeft: 8,
  },
  productName: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
  },
  input: {
    marginBottom: 10,
  },
});

export default ProductItem; 