'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DebateSetupProps {
  onStart: (config: {
    topic: string;
    userPosition: string;
    aiPosition: string;
    difficulty: string;
  }) => void;
}

const PRESET_TOPICS = [
  'Social media does more harm than good',
  'AI will create more jobs than it destroys',
  'Universal basic income should be implemented',
  'Space exploration should be prioritized over ocean exploration',
  'Remote work is better than office work',
];

export function DebateSetup({ onStart }: DebateSetupProps) {
  const [topic, setTopic] = useState('');
  const [userPosition, setUserPosition] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');

  const handleStart = () => {
    if (!topic || !userPosition || !difficulty) return;

    const aiPosition = userPosition === 'For' ? 'Against' : 'For';

    onStart({
      topic,
      userPosition,
      aiPosition,
      difficulty,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="p-8">
        <h1 className="text-4xl font-bold mb-2">DebateGPT</h1>
        <p className="text-muted-foreground mb-6">
          Practice your debate skills against an AI opponent that adapts to your level
        </p>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Debate Topic</label>
            <Input
              placeholder="Enter a debate topic or choose from presets below"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {PRESET_TOPICS.map((preset) => (
              <Button
                key={preset}
                variant="outline"
                size="sm"
                onClick={() => setTopic(preset)}
                className="text-left h-auto py-2 px-3 justify-start"
              >
                {preset}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Position</label>
            <Select value={userPosition} onValueChange={setUserPosition}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your stance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="For">For (supporting the topic)</SelectItem>
                <SelectItem value="Against">Against (opposing the topic)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Difficulty Level</label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">
                  Beginner - Simple arguments, encouraging feedback
                </SelectItem>
                <SelectItem value="intermediate">
                  Intermediate - Moderate complexity and reasoning
                </SelectItem>
                <SelectItem value="advanced">
                  Advanced - Sophisticated arguments and deep analysis
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleStart}
            disabled={!topic || !userPosition || !difficulty}
            className="w-full"
            size="lg"
          >
            Start Debate
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-muted">
        <h3 className="font-semibold mb-2">How it works</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Choose a topic and take a position</li>
          <li>• Make your arguments turn by turn</li>
          <li>• The AI responds with counter-arguments</li>
          <li>• Practice logical reasoning and persuasion</li>
          <li>• Get better at structured argumentation</li>
        </ul>
      </Card>
    </div>
  );
}
