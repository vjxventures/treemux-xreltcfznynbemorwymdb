'use client';

import { useState } from 'react';
import { DebateSetup } from '@/components/debate-setup';
import { DebateInterface } from '@/components/debate-interface';

interface DebateConfig {
  topic: string;
  userPosition: string;
  aiPosition: string;
  difficulty: string;
}

export default function Home() {
  const [debateConfig, setDebateConfig] = useState<DebateConfig | null>(null);

  if (!debateConfig) {
    return (
      <main className="min-h-screen p-8 bg-gradient-to-br from-background to-muted">
        <DebateSetup onStart={setDebateConfig} />
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-background to-muted">
      <div className="max-w-4xl mx-auto space-y-4">
        <button
          onClick={() => setDebateConfig(null)}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Start New Debate
        </button>
        <DebateInterface {...debateConfig} />
      </div>
    </main>
  );
}
