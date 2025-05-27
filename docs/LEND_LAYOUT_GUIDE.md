# LendLayout - Руководство по использованию

## Описание

`LendLayout` - это специальный layout, созданный на основе референсного HTML файла `src/temp/LEND/index.html`. Он предназначен для создания лендинговых страниц с медицинской тематикой и включает в себя все необходимые стили и интерактивные элементы.

## Структура

### Layout файл

- `src/layouts/base/LendLayout.astro` - основной layout файл

### Компоненты

- `src/components/lend/DoorsGame.astro` - игра с дверями для получения скидки
- `src/components/lend/OrderForm.astro` - форма заказа с таймером
- `src/components/lend/SurveyResults.astro` - отображение результатов опроса
- `src/components/lend/CommentSection.astro` - секция комментариев пользователей

### Пример использования

- `src/content/lend-example.mdx` - пример MDX файла с использованием layout

## Использование

### 1. Создание MDX файла

Создайте новый MDX файл с frontmatter:

```mdx
---
layout: LendLayout
title: 'Заголовок страницы'
description: 'Описание страницы'
author: 'Автор'
date: '2024-01-15'
language: 'es'
---

import DoorsGame from '../components/lend/DoorsGame.astro';
import OrderForm from '../components/lend/OrderForm.astro';
import SurveyResults from '../components/lend/SurveyResults.astro';
import CommentSection from '../components/lend/CommentSection.astro';

# Ваш контент здесь

<DoorsGame productName="Название продукта" />

<OrderForm
  productName="Название продукта"
  productImage="/images/product.png"
  originalPrice="1580MXN"
  discountPrice="790MXN"
  discountText="con descuento"
/>

<SurveyResults productName="Название продукта" />

<CommentSection />
```

### 2. Параметры компонентов

#### DoorsGame

- `productName` - название продукта (по умолчанию: "Bururan")
- `discountText` - текст скидки (по умолчанию: "50% de descuento")

#### OrderForm

- `productName` - название продукта
- `productImage` - путь к изображению продукта
- `originalPrice` - оригинальная цена
- `discountPrice` - цена со скидкой
- `discountText` - текст скидки

#### SurveyResults

- `productName` - название продукта
- `results` - массив результатов опроса:
  ```typescript
  results: Array<{
    label: string;
    percentage: number;
    color?: string;
  }>;
  ```

#### CommentSection

- `comments` - массив комментариев:
  ```typescript
  comments: Array<{
    name: string;
    date: string;
    text: string;
    image?: string;
    gender?: 'man' | 'woman';
  }>;
  ```

### 3. Стили

Layout включает в себя все необходимые CSS стили из оригинального HTML файла:

- Основные стили (`index.css`)
- Стили для игры с дверями (`doors.css`)
- Стили для хедера и футера (`header-footer.css`)

### 4. Интерактивность

Layout включает JavaScript функциональность:

- Игра с дверями для получения скидки
- Таймер обратного отсчета в форме заказа
- Обработка отправки формы
- Динамическое отображение даты
- Плавная прокрутка к элементам

## Особенности

1. **Адаптивный дизайн** - layout адаптируется под разные размеры экранов
2. **SEO оптимизация** - включены все необходимые meta теги
3. **Многоязычность** - поддержка разных языков через параметр `language`
4. **Безопасность** - все пользовательские данные обрабатываются безопасно
5. **Производительность** - оптимизированные изображения и CSS

## Кастомизация

Для кастомизации layout:

1. Измените стили в соответствующих CSS секциях в `LendLayout.astro`
2. Добавьте новые компоненты в папку `src/components/lend/`
3. Обновите типы в компонентах для новых параметров
4. Создайте новые варианты layout для разных тематик

## Примеры использования

### Медицинская тематика

```mdx
---
layout: LendLayout
title: 'Революционное лечение'
language: 'es'
---

import DoorsGame from '../components/lend/DoorsGame.astro';

# Медицинская статья

<DoorsGame productName="Медицинский препарат" />
```

### Косметическая тематика

```mdx
---
layout: LendLayout
title: 'Секрет молодости'
language: 'es'
---

import OrderForm from '../components/lend/OrderForm.astro';

# Косметическая статья

<OrderForm productName="Крем для лица" originalPrice="2000MXN" discountPrice="1000MXN" />
```

## Поддержка

Для получения помощи или сообщения об ошибках, обратитесь к команде разработки.
