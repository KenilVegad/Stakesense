
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, MessageSquareQuote } from 'lucide-react';

export default function FeedbackAnalysisPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-bold">Word Analysis</CardTitle>
            <CardDescription>Draft Companies (Amendment) Rules, 2024 - Stakeholder Feedback Analysis</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-l-4 border-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Word Cloud Analysis</CardTitle>
                <BarChart className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Visualize the most frequent keywords in the feedback.</p>
                <Button variant="link" className="p-0 h-auto mt-2 text-blue-600" asChild>
                    <Link href="/dashboard/feedback-analysis/word-cloud">View Word Cloud &rarr;</Link>
                </Button>
            </CardContent>
        </Card>
        <Card className="border-l-4 border-purple-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Comment Suggestions</CardTitle>
                <MessageSquareQuote className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">AI-powered suggestions based on public feedback.</p>
                <Button variant="link" className="p-0 h-auto mt-2 text-purple-600" asChild>
                    <Link href="/dashboard/feedback-analysis/comment-suggestion">View Suggestions &rarr;</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Map of India</CardTitle>
              <CardDescription>Hover over a state for detailed sentiment breakdown.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="recharts-responsive-container" style={{width: '100%', height: '100%', minWidth: 0}}>
                <svg viewBox="0 0 922 476" className="rsm-svg ">
                  <defs>
                    <pattern id="positiveGrid" patternUnits="userSpaceOnUse" width="4" height="4">
                      <rect width="4" height="4" fill="#22c55e" fillOpacity="0.6"></rect>
                      <rect width="2" height="2" fill="#16a34a" fillOpacity="0.8"></rect>
                    </pattern>
                    <pattern id="negativeGrid" patternUnits="userSpaceOnUse" width="4" height="4">
                      <rect width="4" height="4" fill="#ef4444" fillOpacity="0.6"></rect>
                      <rect width="2" height="2" fill="#dc2626" fillOpacity="0.8"></rect>
                    </pattern>
                    <pattern id="neutralGrid" patternUnits="userSpaceOnUse" width="4" height="4">
                      <rect width="4" height="4" fill="#f59e0b" fillOpacity="0.6"></rect>
                      <rect width="2" height="2" fill="#d97706" fillOpacity="0.8"></rect>
                    </pattern>
                    <pattern id="default" patternUnits="userSpaceOnUse" width="4" height="4">
                      <rect width="4" height="4" fill="#E5E7EB"></rect>
                    </pattern>
                  </defs>
                  <g className="rsm-geographies "></g>
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Top Positive State</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-500">Maharashtra</p>
              <p className="text-xs text-muted-foreground">303 Positive Comments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Top Negative State</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-500">Uttar Pradesh</p>
              <p className="text-xs text-muted-foreground">42 Negative Comments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Top Neutral State</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-500">Delhi</p>
              <p className="text-xs text-muted-foreground">62 Neutral Comments</p>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}
