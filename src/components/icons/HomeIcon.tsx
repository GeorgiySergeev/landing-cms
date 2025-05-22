// src/components/MyIconComponent.tsx
import { Home } from 'lucide-preact';

export default function HomeIcon({ name }: { name: string }) {
  return (
    <div>
      <Home class="text-green-500 w-8 h-8" />
      <p>{name}</p>
    </div>
  );
}
