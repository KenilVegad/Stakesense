'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Cake,
  Smile, 
  Meh, 
  Frown,
  BarChart,
  Download,
  Filter
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';

const ageData = [
    { ageGroup: '18-24', positive: 150, negative: 30, neutral: 40 },
    { ageGroup: '25-34', positive: 250, negative: 50, neutral: 60 },
    { ageGroup: '35-44', positive: 200, negative: 40, neutral: 50 },
    { ageGroup: '45-54', positive: 180, negative: 35, neutral: 45 },
    { ageGroup: '55+', positive: 120, negative: 25, neutral: 35 },
];

export default function AgeSentimentPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="space-y-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/dashboard/sentiment-analysis/${id}`} className="hover:underline text-primary">Sentiment Dashboard</Link>
          <span className='font-semibold'>/</span>
          <span className="text-foreground font-semibold">Age-wise Sentiment Analysis</span>
        </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Cake className="h-8 w-8 text-orange-500" />
            <div>
              <CardTitle className="text-2xl">Age-wise Sentiment Dashboard</CardTitle>
              <CardDescription>Analysis of feedback across different age demographics.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-3">
              <CardHeader>
                  <CardTitle>Sentiment Breakdown by Age Group</CardTitle>
              </CardHeader>
              <CardContent style={{ height: '350px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={ageData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="ageGroup" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="positive" fill="#10B981" name="Positive" />
                          <Bar dataKey="neutral" fill="#F59E0B" name="Neutral" />
                          <Bar dataKey="negative" fill="#EF4444" name="Negative" />
                      </RechartsBarChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Detailed Age-Group Sentiment Data</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Age Group</th>
                <th className="p-2">Positive Comments</th>
                <th className="p-2">Negative Comments</th>
                <th className="p-2">Neutral Comments</th>
                <th className="p-2">Total Comments</th>
              </tr>
            </thead>
            <tbody>
              {ageData.map(d => (
                <tr key={d.ageGroup} className="border-b">
                  <td className="p-2 font-semibold text-orange-700">{d.ageGroup}</td>
                  <td className="p-2 text-green-600">{d.positive}</td>
                  <td className="p-2 text-red-600">{d.negative}</td>
                  <td className="p-2 text-yellow-600">{d.neutral}</td>
                  <td className="p-2 font-bold">{d.positive + d.negative + d.neutral}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
            <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>Export or filter the age-based analysis.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Export Age Analysis (PDF)
                </Button>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter Data
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
