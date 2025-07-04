# ShoppingList - Мобільний додаток для управління списками покупок

ShoppingList - це мобільний додаток, розроблений на React Native з використанням Expo, який дозволяє користувачам створювати та керувати списками покупок. Додаток має зручний україномовний інтерфейс та підтримує всі основні функції для ефективного управління списками покупок.

## Функціональні можливості

- Створення та управління списками покупок
- Додавання, редагування та видалення товарів
- Позначення товарів як куплених
- Підрахунок загальної кількості товарів та куплених позицій
- Підтвердження перед видаленням списку чи товару
- Підтримка темної та світлої теми

## Технічний стек

- React Native + Expo
- React Navigation (Stack Navigator)
- React Native Paper (UI компоненти)
- AsyncStorage для локального зберігання даних
- React Context для управління станом

## Вимоги до системи

- Node.js (версія 14 або вище)
- npm або yarn
- Expo CLI
- Android Studio (для Android емулятора)
- Xcode (опціонально, для iOS розробки)

## Встановлення та запуск

1. Клонуйте репозиторій:
```bash
git clone [URL репозиторію]
cd shoppingList
```

2. Встановіть залежності:
```bash
npm install
# або
yarn install
```

3. Запустіть проект:
```bash
npm start
# або
yarn start
```

4. Відскануйте QR-код за допомогою Expo Go на вашому мобільному пристрої або запустіть на емуляторі:
- Для Android: `npm run android`
- Для iOS: `npm run ios`

## Структура проекту

```
shoppingList/
├── App.js                 # Головний компонент додатку
├── /components           # Перевикористовувані компоненти
│   ├── ListItem.js       # Компонент елементу списку
│   ├── ProductItem.js    # Компонент товару
│   └── AddProductModal.js # Модальне вікно додавання товару
├── /screens             # Екрани додатку
│   ├── ListsScreen.js   # Головний екран зі списками
│   └── ListDetailScreen.js # Екран деталей списку
├── /context            # Контекст для управління станом
│   └── ShoppingListContext.js
├── /storage           # Логіка зберігання даних
│   └── storage.js
└── /assets           # Зображення та іконки
```

## Використання

1. На головному екрані ви можете:
   - Переглядати всі списки покупок
   - Створювати нові списки
   - Редагувати назви існуючих списків
   - Видаляти списки

2. На екрані деталей списку ви можете:
   - Додавати нові товари
   - Змінювати статус товарів (куплено/не куплено)
   - Редагувати інформацію про товари
   - Видаляти товари

## Ліцензія

Цей проект розповсюджується під ліцензією MIT.

## Автор

[Грищенко Ілля Володимирович]

## Підтримка

Якщо у вас виникли питання або проблеми, будь ласка, створіть issue в репозиторії проекту. 