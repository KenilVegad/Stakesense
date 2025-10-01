'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Users,
  Smile, 
  Meh, 
  Frown,
  Download,
  Share
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const genderData = [
    { gender: 'Female', positive: 450, negative: 80, neutral: 120 },
    { gender: 'Male', positive: 380, negative: 160, neutral: 100 },
    { gender: 'Non-binary', positive: 25, negative: 10, neutral: 15 },
    { gender: 'Prefer not to say', positive: 5, negative: 2, neutral: 3 },
];

const pieData = genderData.map(d => ({ 
    name: d.gender, 
    value: d.positive + d.negative + d.neutral 
}));

const COLORS = ['#EC4899', '#3B82F6', '#9333EA', '#6B7280'];

export default function GenderSentimentPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="space-y-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/dashboard/sentiment-analysis/${id}`} className="hover:underline text-primary">Sentiment Dashboard</Link>
          <span className='font-semibold'>/</span>
          <span className="text-foreground font-semibold">Gender-wise Sentiment Analysis</span>
        </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Users className="h-8 w-8 text-pink-500" />
            <div>
              <CardTitle className="text-2xl">Gender-wise Sentiment Analysis</CardTitle>
              <CardDescription>Inclusive analysis of feedback across different gender identities.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Comment Distribution by Gender</CardTitle>
            </CardHeader>
            <CardContent style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                            {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Sentiment Breakdown by Gender</CardTitle>
            </CardHeader>
            <CardContent style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={genderData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="gender" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="positive" fill="#10B981" name="Positive" />
                        <Bar dataKey="neutral" fill="#F59E0B" name="Neutral" />
                        <Bar dataKey="negative" fill="#EF4444" name="Negative" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Detailed Gender Sentiment Data</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Gender Identity</th>
                <th className="p-2">Positive Comments</th>
                <th className="p-2">Negative Comments</th>
                <th className="p-2">Neutral Comments</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {genderData.map(d => (
                <tr key={d.gender} className="border-b">
                  <td className="p-2 font-semibold text-pink-700">{d.gender}</td>
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
                <CardTitle>Actions & Reports</CardTitle>
                <CardDescription>Export the analysis of gender-based feedback.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Export Gender Analysis (PDF)
                </Button>
                <Button variant="outline">
                    <Share className="mr-2 h-4 w-4" />
                    Share Report
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
