'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ArgumentAnalysis {
  logicalStrength: number;
  evidenceQuality: number;
  persuasiveness: number;
  structure: number;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  feedback: string;
}

interface ArgumentFeedbackProps {
  messageId: string;
  argument: string;
  topic: string;
  position: string;
}

export function ArgumentFeedback({
  messageId,
  argument,
  topic,
  position,
}: ArgumentFeedbackProps) {
  const [analysis, setAnalysis] = useState<ArgumentAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeArgument = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ argument, topic, position }),
      });
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Failed to analyze argument:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!analysis) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={analyzeArgument}
        disabled={isAnalyzing}
        className="mt-2"
      >
        {isAnalyzing ? 'Analyzing...' : 'Get AI Feedback'}
      </Button>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="mt-3 p-4 bg-muted/50">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">AI Feedback</h4>
          <Badge variant="outline" className={getScoreColor(analysis.overallScore)}>
            Overall: {analysis.overallScore}/10
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <span>Logical Strength:</span>
            <span className={getScoreColor(analysis.logicalStrength)}>
              {analysis.logicalStrength}/10
            </span>
          </div>
          <div className="flex justify-between">
            <span>Evidence:</span>
            <span className={getScoreColor(analysis.evidenceQuality)}>
              {analysis.evidenceQuality}/10
            </span>
          </div>
          <div className="flex justify-between">
            <span>Persuasiveness:</span>
            <span className={getScoreColor(analysis.persuasiveness)}>
              {analysis.persuasiveness}/10
            </span>
          </div>
          <div className="flex justify-between">
            <span>Structure:</span>
            <span className={getScoreColor(analysis.structure)}>
              {analysis.structure}/10
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">{analysis.feedback}</p>
        </div>

        <div className="space-y-2">
          <div>
            <h5 className="text-sm font-medium text-green-600">Strengths</h5>
            <ul className="text-sm text-muted-foreground list-disc list-inside">
              {analysis.strengths.map((strength, idx) => (
                <li key={idx}>{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-medium text-blue-600">Areas for Improvement</h5>
            <ul className="text-sm text-muted-foreground list-disc list-inside">
              {analysis.improvements.map((improvement, idx) => (
                <li key={idx}>{improvement}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
