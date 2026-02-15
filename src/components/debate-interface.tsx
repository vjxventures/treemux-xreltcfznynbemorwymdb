'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DebateInterfaceProps {
  topic: string;
  userPosition: string;
  aiPosition: string;
  difficulty: string;
}

export function DebateInterface({
  topic,
  userPosition,
  aiPosition,
  difficulty,
}: DebateInterfaceProps) {
  const [currentArgument, setCurrentArgument] = useState('');

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/debate',
        body: {
          topic,
          position: aiPosition,
          difficulty,
        },
      }),
    [topic, aiPosition, difficulty]
  );

  const { messages, sendMessage, status } = useChat({
    transport,
  });

  const isLoading = status === 'streaming';

  const handleSubmit = async () => {
    if (!currentArgument.trim()) return;

    await sendMessage({
      text: currentArgument,
    });

    setCurrentArgument('');
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Debate Topic</h2>
          <p className="text-lg">{topic}</p>
          <div className="flex gap-2 mt-4">
            <Badge variant="outline">You: {userPosition}</Badge>
            <Badge variant="secondary">AI: {aiPosition}</Badge>
            <Badge>{difficulty}</Badge>
          </div>
        </div>
      </Card>

      <div className="space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto">
        {messages.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">
            <p className="text-lg">Make your opening argument to begin the debate.</p>
            <p className="text-sm mt-2">The AI will respond and challenge your points.</p>
          </Card>
        )}

        {messages.map((message) => (
          <Card
            key={message.id}
            className={`p-4 ${
              message.role === 'user'
                ? 'bg-primary text-primary-foreground ml-8'
                : 'bg-secondary mr-8'
            }`}
          >
            <div className="flex items-start gap-3">
              <Badge variant={message.role === 'user' ? 'default' : 'secondary'}>
                {message.role === 'user' ? 'You' : 'AI Opponent'}
              </Badge>
              <div className="flex-1 whitespace-pre-wrap">
                {message.parts
                  .filter((part) => part.type === 'text')
                  .map((part, idx) => (
                    <span key={idx}>{(part as { text: string }).text}</span>
                  ))}
              </div>
            </div>
          </Card>
        ))}

        {isLoading && (
          <Card className="p-4 bg-secondary mr-8">
            <div className="flex items-center gap-3">
              <Badge variant="secondary">AI Opponent</Badge>
              <div className="flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <Textarea
            value={currentArgument}
            onChange={(e) => setCurrentArgument(e.target.value)}
            placeholder="Type your argument here..."
            className="min-h-[120px]"
            disabled={isLoading}
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {currentArgument.length} characters
            </p>
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !currentArgument.trim()}
            >
              {isLoading ? 'AI is responding...' : 'Submit Argument'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
