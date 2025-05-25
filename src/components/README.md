# Компоненты

## SocialShareButtons

Компонент для кнопок социального шеринга с использованием иконок из `lucide-preact`.

### Возможности

- 🎨 Чистые SVG иконки из Lucide
- 📱 Поддержка Native Share API (мобильные устройства)
- 📋 Копирование ссылки в буфер обмена
- ⚙️ Настраиваемые платформы
- 🎯 Автоматическая генерация URL для шеринга
- ♿ Доступность (aria-label, title)

### Использование

#### Базовое использование

```astro
---
import SocialShareButtons from '../components/SocialShareButtons.tsx';
---

<SocialShareButtons title="Заголовок статьи" client:load />
```

#### С пользовательскими платформами

```astro
<SocialShareButtons title="Заголовок статьи" platforms={['facebook', 'twitter', 'whatsapp', 'copy']} client:load />
```

#### Все доступные платформы

```astro
<SocialShareButtons
  title="Заголовок статьи"
  platforms={['facebook', 'twitter', 'email', 'whatsapp', 'linkedin', 'copy']}
  client:load
/>
```

### Props

| Prop        | Тип      | По умолчанию                                   | Описание                        |
| ----------- | -------- | ---------------------------------------------- | ------------------------------- |
| `title`     | `string` | `"Check this out!"`                            | Заголовок для шеринга           |
| `url`       | `string` | `window.location.href`                         | URL для шеринга                 |
| `className` | `string` | `""`                                           | Дополнительные CSS классы       |
| `platforms` | `Array`  | `['facebook', 'twitter', 'email', 'whatsapp']` | Список платформ для отображения |

### Поддерживаемые платформы

- `facebook` - Facebook
- `twitter` - Twitter/X
- `email` - Email
- `whatsapp` - WhatsApp
- `linkedin` - LinkedIn
- `copy` - Копирование ссылки

### Стили

Стили для кнопок определены в `src/styles/universal-layout.css`. Каждая платформа имеет свои цвета:

- Facebook: `#1877f2`
- Twitter: `#1da1f2`
- Email: `#6c757d`
- WhatsApp: `#25d366`
- LinkedIn: `#0077b5`
- Copy: `#6c757d` (зеленый при копировании)
- Native: `#8b5cf6`

### Особенности

1. **Native Share API**: На поддерживающих устройствах автоматически показывается кнопка нативного шеринга
2. **Feedback при копировании**: Кнопка копирования меняет цвет и текст при успешном копировании
3. **Responsive design**: Кнопки адаптируются под мобильные устройства
4. **Анимации**: Hover эффекты с translateY для лучшего UX

### Пример интеграции в layout

```astro
---
import SocialShareButtons from '../../components/SocialShareButtons.tsx';
---

<!-- В footer статьи -->
<footer class="article-footer">
  <div class="container">
    <SocialShareButtons title={title || undefined} client:load />
  </div>
</footer>
```
