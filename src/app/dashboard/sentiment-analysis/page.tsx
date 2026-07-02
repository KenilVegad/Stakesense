
'use client';

import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ArrowLeft,
  FileText,
  RefreshCw,
  Download,
  CheckCircle, 
  MinusCircle, 
  AlertCircle,
  Info
} from 'lucide-react';

const thematicData = [
  {
    theme: 'Digital Transformation',
    sentiment: 'Highly Positive',
    approval: 85,
    color: 'bg-blue-500',
  },
  {
    theme: 'Governance Improvements',
    sentiment: 'Positive',
    approval: 75,
    color: 'bg-green-500',
  },
  {
    theme: 'Implementation Timeline',
    sentiment: 'Mixed Response',
    satisfaction: 60,
    color: 'bg-yellow-500',
  },
  {
    theme: 'Rural Connectivity',
    sentiment: 'Concern Raised',
    satisfaction: 40,
    color: 'bg-red-500',
  },
];

const sentimentTrendData = [
    { date: 'Jan 15', positive: 4, negative: 1, neutral: 2 },
    { date: 'Jan 20', positive: 7, negative: 2, neutral: 3 },
    { date: 'Jan 25', positive: 10, negative: 3, neutral: 5 },
    { date: 'Jan 30', positive: 15, negative: 4, neutral: 7 },
    { date: 'Feb 05', positive: 20, negative: 5, neutral: 10 },
    { date: 'Feb 10', positive: 22, negative: 6, neutral: 12 },
    { date: 'Feb 15', positive: 25, negative: 7, neutral: 15 },
];

export default function SentimentAnalysisPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <header className="mb-8">
        <Button variant="link" onClick={() => router.back()} className="px-0 mb-4 text-slate-600">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous Page
        </Button>
        <h1 className="text-3xl font-bold text-slate-800">Public Sentiment Analysis Report</h1>
        <p className="text-base text-slate-500 mt-1">Draft Companies (Amendment) Rules, 2024 - Stakeholder Feedback Analysis</p>
        <Alert className="mt-4 bg-blue-50 border-blue-200 text-blue-800">
            <Info className="h-5 w-5" />
            <AlertTitle>Official Notice</AlertTitle>
            <AlertDescription>
            This analysis is based on public comments received during the consultation period. All feedback has been processed using AI-powered sentiment analysis tools to provide insights into stakeholder opinions.
            </AlertDescription>
        </Alert>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <main className="col-span-12 lg:col-span-9 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-2 border-green-200/80 shadow-sm">
                    <CardHeader>
                        <CardTitle className='text-lg text-green-700'>Positive Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className='flex items-center justify-between'>
                        <div className='text-4xl font-bold text-green-600'>50%</div>
                        <CheckCircle className='h-12 w-12 text-green-400'/>
                    </CardContent>
                    <CardDescription className='px-6 pb-4 text-sm text-slate-500'>4 out of 8 comments</CardDescription>
                </Card>
                <Card className="border-2 border-yellow-200/80 shadow-sm">
                    <CardHeader>
                        <CardTitle className='text-lg text-yellow-700'>Neutral Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className='flex items-center justify-between'>
                        <div className='text-4xl font-bold text-yellow-600'>25%</div>
                        <MinusCircle className='h-12 w-12 text-yellow-400'/>
                    </CardContent>
                    <CardDescription className='px-6 pb-4 text-sm text-slate-500'>2 out of 8 comments</CardDescription>
                </Card>
                <Card className="border-2 border-red-200/80 shadow-sm">
                    <CardHeader>
                        <CardTitle className='text-lg text-red-700'>Negative Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className='flex items-center justify-between'>
                        <div className='text-4xl font-bold text-red-600'>25%</div>
                        <AlertCircle className='h-12 w-12 text-red-400'/>
                    </CardContent>
                    <CardDescription className='px-6 pb-4 text-sm text-slate-500'>2 out of 8 comments</CardDescription>
                </Card>
            </div>

          <Card className="shadow-sm border-2 border-slate-200/60">
            <CardHeader>
              <CardTitle>Thematic Analysis of Public Feedback</CardTitle>
              <CardDescription>
                Key topics and sentiment patterns identified in stakeholder comments.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {thematicData.map(item => (
                <div key={item.theme} className="p-4 rounded-lg border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-slate-700">{item.theme}</h3>
                    <span className="text-sm font-medium text-slate-500">{item.sentiment}</span>
                  </div>
                  <Progress value={item.approval || item.satisfaction} className="h-3" indicatorClassName={item.color} />
                  <p className="text-sm text-slate-600">
                    {item.approval ? `Strong support for digitalization initiatives (${item.approval}% approval)` : `Concerns about timeline feasibility (${item.satisfaction}% satisfaction)`}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-2 border-slate-200/60">
            <CardHeader>
              <CardTitle>Sentiment Trends Over Time</CardTitle>
              <CardDescription>Daily progression of public feedback during consultation period.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sentimentTrendData}>
                   <XAxis dataKey="date" axisLine={false} tickLine={false} dy={10} />
                   <YAxis hide={true} />
                   <Tooltip />
                   <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={2} />
                   <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} />
                   <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </main>

        <aside className="col-span-12 lg:col-span-3 space-y-6">
          <Card className="sticky top-8 border-2 border-slate-200/60 shadow-sm">
            <CardHeader>
              <CardTitle>Official Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button size="lg" className="w-full">
                <Download className="h-5 w-5 mr-2" />
                Download Official Report
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                <RefreshCw className="h-5 w-5 mr-2" />
                Refresh Analysis
              </Button>
               <Button variant="outline" size="lg" className="w-full text-green-600 border-green-300 hover:bg-green-50 hover:text-green-700">
                <FileText className="h-5 w-5 mr-2" />
                View All Comments
              </Button>
            </CardContent>
             <CardFooter className='text-xs text-slate-400' suppressHydrationWarning>
                Last updated: {new Date().toLocaleDateString()}
             </CardFooter>
          </Card>
        </aside>
      </div>
    </div>
  );
}
