import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, TextInput, Button } from 'react-native-paper';
import { useShoppingList } from '../context/ShoppingListContext';

const AddProductModal = ({ visible, onDismiss, listId }) => {
  const { dispatch } = useShoppingList();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');

  const handleAdd = () => {
    if (name.trim() && quantity.trim()) {
      dispatch({
        type: 'ADD_PRODUCT',
        payload: {
          listId,
          product: {
            id: Date.now().toString(),
            name: name.trim(),
            quantity: parseInt(quantity) || 1,
            completed: false,
          },
        },
      });
      setName('');
      setQuantity('1');
      onDismiss();
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <TextInput
          label="Назва товару"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          label="Кількість"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button mode="contained" onPress={handleAdd} style={styles.button}>
          Додати
        </Button>
        <Button onPress={onDismiss}>Скасувати</Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
  },
});

export default AddProductModal; 