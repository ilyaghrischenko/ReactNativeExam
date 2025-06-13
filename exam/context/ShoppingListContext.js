import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingListContext = createContext();

const initialState = {
  lists: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LISTS':
      return { ...state, lists: action.payload };
    case 'ADD_LIST':
      return { ...state, lists: [...state.lists, action.payload] };
    case 'UPDATE_LIST':
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.id ? action.payload : list
        ),
      };
    case 'DELETE_LIST':
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                products: [...list.products, action.payload.product],
              }
            : list
        ),
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                products: list.products.map((product) =>
                  product.id === action.payload.product.id
                    ? action.payload.product
                    : product
                ),
              }
            : list
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                products: list.products.filter(
                  (product) => product.id !== action.payload.productId
                ),
              }
            : list
        ),
      };
    default:
      return state;
  }
};

export const ShoppingListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadLists();
  }, []);

  useEffect(() => {
    saveLists();
  }, [state.lists]);

  const loadLists = async () => {
    try {
      const listsJson = await AsyncStorage.getItem('shoppingLists');
      if (listsJson) {
        dispatch({ type: 'SET_LISTS', payload: JSON.parse(listsJson) });
      }
    } catch (error) {
      console.error('Помилка завантаження списків:', error);
    }
  };

  const saveLists = async () => {
    try {
      await AsyncStorage.setItem('shoppingLists', JSON.stringify(state.lists));
    } catch (error) {
      console.error('Помилка збереження списків:', error);
    }
  };

  return (
    <ShoppingListContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
}; 