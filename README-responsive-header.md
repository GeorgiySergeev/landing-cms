# Адаптивный хедер с бургер-меню

## Описание

Создан полнофункциональный адаптивный хедер с бургер-меню для системы лендинг-страниц. Хедер автоматически адаптируется под разные размеры экранов и поддерживает языки как LTR, так и RTL.

## Особенности

### ✅ Адаптивный дизайн

- **Desktop (>768px)**: горизонтальная навигация с бордерами
- **Tablet (769px-1024px)**: сжатая навигация
- **Mobile (<768px)**: бургер-меню с выпадающей навигацией

### ✅ Бургер-меню

- Анимированная иконка "гамбургер"
- Плавные переходы (slide-down анимация)
- Автоматическое закрытие при клике вне меню
- Закрытие при клике на пункт навигации

### ✅ UX улучшения

- Блокировка скролла страницы при открытом меню
- Правильные z-index для корректного наложения
- Hover-эффекты для навигационных элементов
- Плавные CSS-transitions

### ✅ RTL поддержка

- Полная поддержка языков справа налево (арабский, иврит и др.)
- Корректное расположение элементов для RTL
- Автоматическое определение направления по языку

## Файлы

### Основные файлы:

- `src/layouts/base/UniversalAdultLayout.astro` - обновленный макет с бургер-меню
- `src/styles/responsive-header.css` - стили для адаптивного хедера
- `src/styles/universal-layout.css` - основные стили (обновлены)

### Тестовые страницы:

- `src/pages/header-test.astro` - тест на английском (LTR)
- `src/pages/header-test-rtl.astro` - тест на арабском (RTL)

## Как использовать

### 1. Подключение

Файл `responsive-header.css` автоматически подключается в `UniversalAdultLayout.astro`.

### 2. HTML структура

```html
<header class="header">
  <div class="container">
    <div class="header__container">
      <!-- Логотип и название -->
      <div class="header__logo-container">
        <img class="header__country-flag" src="..." alt="..." />
        <div class="header__site-name">Country Name</div>
      </div>

      <!-- Бургер-меню кнопка -->
      <button class="header__burger" id="burger-menu">
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      </button>

      <!-- Навигация -->
      <nav class="header__nav" id="header-nav">
        <ul class="header__nav-list">
          <li class="header__nav-item"><a href="#">News</a></li>
          <li class="header__nav-item"><a href="#">Society</a></li>
          <li class="header__nav-item"><a href="#">Video</a></li>
          <li class="header__nav-item"><a href="#">Live</a></li>
        </ul>
      </nav>
    </div>
  </div>
</header>
```

### 3. JavaScript функциональность

Автоматически добавляется в `UniversalAdultLayout.astro`:

- Переключение активного состояния бургер-меню
- Закрытие меню при клике вне области
- Блокировка скролла при открытом меню

## Тестирование

### Desktop:

1. Откройте любую страницу в браузере
2. Навигация должна отображаться горизонтально с бордерами

### Mobile:

1. Откройте тестовые страницы:
   - `/header-test` (английский)
   - `/header-test-rtl` (арабский)
2. Уменьшите ширину браузера до <768px
3. Должна появиться кнопка бургер-меню
4. При клике навигация выезжает сверху
5. Клик вне меню или на пункт навигации закрывает меню

## CSS классы

### Основные:

- `.header__burger` - кнопка бургер-меню
- `.burger-line` - линии иконки гамбургера
- `.header__nav.active` - активное состояние навигации
- `.header__burger.active` - активное состояние кнопки
- `body.menu-open` - блокировка скролла

### Breakpoints:

- `max-width: 768px` - мобильные устройства
- `max-width: 1024px` и `min-width: 769px` - планшеты
- `max-width: 480px` - малые мобильные устройства

## Кастомизация

### Изменение breakpoint:

Измените значение в медиа-запросе `@media (max-width: 768px)` в файле `responsive-header.css`.

### Изменение анимации:

Настройте `transition` свойства в классах `.header__nav` и `.burger-line`.

### RTL настройки:

RTL стили автоматически применяются при `dir="rtl"` на html элементе.
