import React, { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { useShoppingList } from '../context/ShoppingListContext';
import ProductItem from '../components/ProductItem';
import AddProductModal from '../components/AddProductModal';

const ListDetailScreen = ({ route, navigation }) => {
  const { listId } = route.params;
  const { state } = useShoppingList();
  const [addModalVisible, setAddModalVisible] = useState(false);

  const list = state.lists.find((l) => l.id === listId);
  const completedProducts = list?.products?.filter((p) => p.completed)?.length || 0;
  const totalProducts = list?.products?.length || 0;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: list?.name || 'Список покупок',
      headerRight: () => (
        <Text style={styles.headerStats}>
          {completedProducts}/{totalProducts}
        </Text>
      ),
    });
  }, [navigation, list, completedProducts, totalProducts]);

  if (!list) {
    return (
      <View style={styles.container}>
        <Text>Список не знайдено</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <ProductItem product={item} listId={listId} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={list.products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      <AddProductModal
        visible={addModalVisible}
        onDismiss={() => setAddModalVisible(false)}
        listId={listId}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setAddModalVisible(true)}
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
  headerStats: {
    marginRight: 16,
    fontSize: 16,
  },
});

export default ListDetailScreen; 