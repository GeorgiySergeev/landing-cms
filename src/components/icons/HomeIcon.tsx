// src/components/MyIconComponent.tsx
import { Home } from 'lucide-preact';

export default function HomeIcon({ name }: { name: string }) {
  return (
    <div>
      <Home class="h-8 w-8 text-green-500" />
      <p>{name}</p>
    </div>
  );
}
