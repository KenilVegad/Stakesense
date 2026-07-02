
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Cloud, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import d3Cloud from 'd3-cloud';

// Word data interfaces
interface Word {
  text: string;
  value: number;
}

interface ComputedWord extends d3Cloud.Word {
  text: string;
  value: number;
}

const positiveKeywords: Word[] = [
    { text: 'Satisfaction', value: 64 }, { text: 'Appreciation', value: 40 },
    { text: 'Happiness', value: 55 }, { text: 'Success', value: 70 },
    { text: 'Trust', value: 45 }, { text: 'Optimism', value: 30 },
    { text: 'Joy', value: 50 }, { text: 'Approval', value: 35 },
    { text: 'Excitement', value: 60 }, { text: 'Confidence', value: 65 },
    { text: 'Delight', value: 48 }, { text: 'Gratitude', value: 52 },
    { text: 'Motivation', value: 58 }, { text: 'Positive feedback', value: 75 },
    { text: 'Recommendation', value: 68 },
];

const negativeKeywords: Word[] = [
    { text: 'Dissatisfaction', value: 70 }, { text: 'Frustration', value: 60 },
    { text: 'Anger', value: 50 }, { text: 'Complaint', value: 80 },
    { text: 'Disappointment', value: 65 }, { text: 'Distrust', value: 40 },
    { text: 'Rejection', value: 30 }, { text: 'Anxiety', value: 45 },
    { text: 'Criticism', value: 75 }, { text: 'Failure', value: 55 },
    { text: 'Negative feedback', value: 85 }, { text: 'Hostility', value: 35 },
    { text: 'Fear', value: 25 }, { text: 'Resentment', value: 48 },
    { text: 'Disapproval', value: 52 },
];

const neutralKeywords: Word[] = [
    { text: 'Information', value: 60 }, { text: 'Statement', value: 50 },
    { text: 'Fact', value: 70 }, { text: 'Observation', value: 55 },
    { text: 'Neutral opinion', value: 40 }, { text: 'Explanation', value: 65 },
    { text: 'Clarification', value: 45 }, { text: 'Query', value: 30 },
    { text: 'Comment', value: 75 }, { text: 'Report', value: 68 },
    { text: 'Discussion', value: 52 }, { text: 'Suggestion', value: 35 },
    { text: 'Description', value: 48 }, { text: 'Context', value: 25 },
    { text: 'Inquiry', value: 38 },
];

const WordCloud = ({ words, color }: { words: Word[], color: string }) => {
  const [computedWords, setComputedWords] = useState<ComputedWord[]>([]);

  useEffect(() => {
    const layout = d3Cloud()
      .size([500, 300])
      .words(words.map(word => ({ ...word, size: 12 + word.value / 4, rotate: 0 })))
      .padding(5)
      .rotate(0)
      .fontSize(d => d.size || 10)
      .on('end', (words: d3Cloud.Word[]) => {
        setComputedWords(words as ComputedWord[]);
      });

    layout.start();
  }, [words]);

  return (
    <div style={{ width: '100%', height: '300px', position: 'relative' }}>
      <div style={{ position: 'absolute', width: '100%', height: '100%', transform: `translate(250px, 150px)` }}>
        {computedWords.map((word, i) => (
          <span
            key={i}
            className={color}
            style={{
              position: 'absolute',
              fontSize: `${word.size}px`,
              fontWeight: 500 + (word.value / 20) * 100,
              opacity: 0.8 + (word.value % 20) / 100,
              transform: `translate(${word.x}px, ${word.y}px) rotate(${word.rotate}deg)`,
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            {word.text}
          </span>
        ))}
      </div>
    </div>
  );
};


export default function WordCloudPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className='flex items-center gap-4 mb-6'>
                <Button variant="outline" size="icon" onClick={() => router.back()} suppressHydrationWarning>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className='text-3xl font-bold text-slate-800 flex items-center'>
                    <Cloud className="h-8 w-8 mr-3 text-slate-600"/>
                    Sentiment Word Cloud
                </h1>
            </div>
        
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="border-2 border-green-200/80 shadow-sm">
                    <CardHeader className="border-b-2 border-green-200/80">
                        <CardTitle className="flex items-center text-xl text-green-700">
                            <ThumbsUp className="h-5 w-5 mr-3"/>
                            Positive Keywords
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WordCloud words={positiveKeywords} color="text-green-600" />
                    </CardContent>
                </Card>

                <Card className="border-2 border-red-200/80 shadow-sm">
                    <CardHeader className="border-b-2 border-red-200/80">
                        <CardTitle className="flex items-center text-xl text-red-700">
                            <ThumbsDown className="h-5 w-5 mr-3"/>
                            Negative Keywords
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WordCloud words={negativeKeywords} color="text-red-600" />
                    </CardContent>
                </Card>

                <Card className="border-2 border-slate-200/80 shadow-sm">
                    <CardHeader className="border-b-2 border-slate-200/80">
                        <CardTitle className="flex items-center text-xl text-slate-700">
                            <Meh className="h-5 w-5 mr-3"/>
                            Neutral Keywords
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WordCloud words={neutralKeywords} color="text-slate-600" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
