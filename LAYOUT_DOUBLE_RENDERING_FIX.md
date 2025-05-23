# Исправление проблемы двойного рендеринга Layout'ов

## 🔍 Диагностика проблемы

### Симптомы

- Рендерится "две страницы одна в другой"
- Layout накладываются друг на друга
- Дублирование HTML структуры

### Причина

**Множественные layout'ы содержат полную HTML структуру (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`)**

## 🏗️ Текущая архитектура (ПРОБЛЕМНАЯ)

```
src/layouts/
├── base/
│   ├── BaseLayout.astro          ← ✅ Содержит полную HTML структуру
│   ├── NewsLayout.astro          ← ❌ Наследует BaseLayout + содержит свою структуру
│   └── UniversalAdultLayout.astro ← ❌ ТАКЖЕ содержит полную HTML структуру
├── templates/
│   └── news/
│       └── HealthNewsTemplate.astro ← ❌ Наследует NewsLayout
└── locale/
    └── [theme]/
        └── [template].astro      ← ❌ Могут наследовать проблемные layout'ы
```

### Проблемная цепочка вложенности:

```
Страница → Template → NewsLayout → BaseLayout
   ↓           ↓          ↓          ↓
  <Layout>  <NewsLayout> <BaseLayout> <html><body>
                           ↓          ↓
                      <html><body>  ДУБЛИРОВАНИЕ!
```

## 🛠️ Решение

### Новая архитектура layout'ов:

#### 1. **BASE LAYOUTS** - Полная HTML структура

- `BaseLayout.astro` ✅
- `UniversalAdultLayout.astro` ✅
- Должны содержать: `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`

#### 2. **TEMPLATE LAYOUTS** - Только композиция контента

- `NewsLayout.astro` ← ИСПРАВИТЬ
- `HealthNewsTemplate.astro` ← ИСПРАВИТЬ
- Должны содержать: только компоненты и стили, БЕЗ HTML структуры

#### 3. **LOCALE LAYOUTS** - Региональные вариации

- Наследуют от templates, НЕ от base

## 🔧 Файлы для исправления

### 1. `src/layouts/base/NewsLayout.astro`

**ТЕКУЩАЯ ПРОБЛЕМА:**

```astro
<BaseLayout {...baseProps}>
  <!-- Content внутри BaseLayout -->
</BaseLayout>
```

**РЕШЕНИЕ:** Преобразовать в template без HTML структуры

### 2. `src/layouts/templates/news/HealthNewsTemplate.astro`

**ТЕКУЩАЯ ПРОБЛЕМА:**

```astro
<NewsLayout {...rest}>
  <!-- Content -->
</NewsLayout>
```

**РЕШЕНИЕ:** Должен напрямую использовать BaseLayout

### 3. `src/pages/landing/[layout]/[country]/[language]/[article]/[variant]/index.astro`

**ПРОВЕРИТЬ:** Логику выбора layout'а

## 📋 Пошаговый план исправления

### Шаг 1: Исправить NewsLayout.astro

```astro
<!-- ИЗ: -->
<BaseLayout {...baseProps}>
  <article class="news-article">
    <slot />
  </article>
</BaseLayout>

<!-- В: -->
<article class="news-article">
  <slot />
</article>
```

### Шаг 2: Исправить Template'ы

```astro
<!-- ИЗ: -->
<NewsLayout {...rest}>
  <slot />
</NewsLayout>

<!-- В: -->
<BaseLayout {...rest}>
  <article class="news-article">
    <slot />
  </article>
</BaseLayout>
```

### Шаг 3: Обновить getLayout.ts

- Убедиться что возвращаются только BASE layouts
- Template'ы должны возвращать композиционный контент

## ⚠️ Важные замечания

1. **Только ONE layout на страницу должен содержать HTML структуру**
2. **Templates = композиционные компоненты, НЕ layouts**
3. **Base layouts = полные HTML документы**
4. **Проверить все imports и наследования**

## 🧪 Тестирование

После исправления проверить:

- [ ] Нет дублирования `<html>`, `<head>`, `<body>`
- [ ] Стили применяются корректно
- [ ] Контент рендерится в правильном порядке
- [ ] Все landing pages работают

## 📁 Файлы для изменения

1. `src/layouts/base/NewsLayout.astro` - преобразовать в template
2. `src/layouts/templates/news/HealthNewsTemplate.astro` - обновить imports
3. `src/layouts/templates/news/BengaliNewsTemplate.astro` - обновить imports
4. Любые другие template'ы в `src/layouts/templates/`
5. Проверить все файлы в `src/layouts/locale/`
