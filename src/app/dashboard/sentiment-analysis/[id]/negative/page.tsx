'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  ThumbsDown,
  Info,
  Download,
  FileText,
  Lightbulb,
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

const negativeComments = [
  {
    id: 'CMT004',
    name: 'Concerned Citizen',
    company: 'Small Business Association',
    comment: 'Implementation of these new compliance requirements may create additional burden on small and medium enterprises. The timeline is too aggressive, and the costs associated are prohibitive for smaller entities. We request a phased implementation and financial support for SMEs.',
    score: '3.2',
    date: '20/1/2024',
    tags: ['burden', 'SMEs', 'aggressive timeline', 'costs', 'phased implementation', 'financial support'],
    theme: 'Implementation Timeline',
    initial: 'C'
  },
  {
    id: 'CMT005',
    name: 'Industry Expert',
    company: 'Legal & Compliance Watchdog',
    comment: 'The proposed changes are too complex and may lead to confusion among practitioners. While the intent is good, the execution is flawed. The language is ambiguous, and there is a lack of clarity on several key provisions. This will likely increase litigation and compliance challenges.',
    score: '2.8',
    date: '21/1/2024',
    tags: ['complex', 'confusion', 'ambiguous', 'lack of clarity', 'litigation risk'],
    theme: 'Regulatory Complexity',
    initial: 'I'
  }
];

const keywords = ["burden", "complex", "confusion", "aggressive", "costs", "prohibitive", "ambiguous", "lack of clarity", "litigation risk", "challenges", "impractical", "overly-complex", "problematic", "unclear", "difficult"];

const pieData = [
  { name: 'Strongly Negative', value: 60 },
  { name: 'Moderately Negative', value: 25 },
  { name: 'Slightly Negative', value: 15 },
];

const areaData = [
    { date: '18/1', score: 3.5 },
    { date: '19/1', score: 3.3 },
    { date: '20/1', score: 3.2 },
    { date: '21/1', score: 2.8 },
    { date: '22/1', score: 3.0 },
    { date: '23/1', score: 2.9 },
];

const COLORS = ['#DC2626', '#EF4444', '#F87171'];

export default function NegativeSentimentAnalysisPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href={`/dashboard/sentiment-analysis/${id}`} className="hover:underline text-primary">Sentiment Dashboard</Link>
        <span className='font-semibold'>/</span>
        <span className="text-foreground font-semibold">Negative Feedback Analysis</span>
      </div>

      <Card>
        <CardHeader>
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-red-100 text-red-700">
                    <ThumbsDown className="h-8 w-8" />
                </div>
                <div>
                    <CardTitle className='text-2xl'>Negative Sentiment Analysis</CardTitle>
                    <CardDescription>Comprehensive analysis of negative stakeholder feedback and sentiment trends.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Alert className="bg-red-50 border-red-200 text-red-800">
                <Info className="h-4 w-4 !text-red-800" />
                <AlertTitle>Analysis Summary</AlertTitle>
                <AlertDescription>
                A total of 135 out of 1350 comments (10%) expressed negative views, raising concerns about the implementation timeline and regulatory complexity. Key themes include the burden on SMEs and the potential for confusion.
                </AlertDescription>
            </Alert>
        </CardContent>
      </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardHeader className='pb-2'><CardTitle className="text-sm font-medium">Negative Comments</CardTitle></CardHeader>
                <CardContent><div className="text-4xl font-bold text-red-600">135</div><p className="text-xs text-muted-foreground">Total Count</p></CardContent>
            </Card>
            <Card>
                <CardHeader className='pb-2'><CardTitle className="text-sm font-medium">Overall Percentage</CardTitle></CardHeader>
                <CardContent><div className="text-4xl font-bold text-red-600">10%</div><p className="text-xs text-muted-foreground">Of All Feedback</p></CardContent>
            </Card>
            <Card>
                <CardHeader className='pb-2'><CardTitle className="text-sm font-medium">Avg. Sentiment Score</CardTitle></CardHeader>
                <CardContent><div className="text-4xl font-bold text-red-600">3.0</div><p className="text-xs text-muted-foreground">Out of 10</p></CardContent>
            </Card>
            <Card>
                <CardHeader className='pb-2'><CardTitle className="text-sm font-medium">Key Negative Themes</CardTitle></CardHeader>
                <CardContent><div className="text-4xl font-bold text-red-600">2</div><p className="text-xs text-muted-foreground">Identified</p></CardContent>
            </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Negative Sentiment Distribution</CardTitle>
                    <CardDescription>Breakdown of negative feedback intensity across all comments.</CardDescription>
                </CardHeader>
                <CardContent style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#8884d8" paddingAngle={5} dataKey="value" labelLine={false}>
                            {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Lightbulb className="h-6 w-6 text-yellow-400" />
                    <CardTitle>AI Insights</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        The primary concerns are the aggressive implementation timeline and regulatory complexity. Negative sentiment scores are consistently low, indicating significant issues that need to be addressed.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-4 text-blue-600">Generate Mitigation Plan &rarr;</Button>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Negative Sentiment Score Trend</CardTitle>
                <CardDescription>Timeline of average negative sentiment scores over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="score" stroke="#B91C1C" fillOpacity={1} fill="url(#colorNegative)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Most Criticized Aspects</CardTitle>
                <CardDescription>Top themes and categories in negative feedback, based on AI analysis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium">Implementation Timeline</span><span className="text-sm font-semibold text-red-600">78% Negative</span></div>
                    <Progress value={78} className="h-2 [&>div]:bg-red-500" />
                    <p className="text-xs text-muted-foreground mt-1">Significant concerns about the aggressive timeline and associated costs for SMEs.</p>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium">Regulatory Complexity</span><span className="text-sm font-semibold text-red-600">85% Negative</span></div>
                    <Progress value={85} className="h-2 [&>div]:bg-red-500" />
                    <p className="text-xs text-muted-foreground mt-1">Strong criticism of ambiguous language and lack of clarity, leading to potential confusion.</p>
                </div>
            </CardContent>
        </Card>

        <div>
            <h2 className="text-2xl font-bold mb-4">All Negative Comments</h2>
            <div className="space-y-4">
                {negativeComments.map((comment, index) => (
                    <Card key={index} className="border-l-4 border-red-500 hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12 border-2 border-red-200"><AvatarFallback className="bg-red-50 text-red-700 font-semibold text-lg">{comment.initial}</AvatarFallback></Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-base">{comment.name}</p>
                                            <p className="text-sm text-muted-foreground">{comment.company}</p>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant="outline" className="font-semibold border-red-400 text-red-800 bg-red-50">Sentiment Score: {comment.score}/10</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Submitted: {comment.date}</p>
                                        </div>
                                    </div>
                                    <Separator className="my-3" />
                                    <p className="text-base text-foreground/90 leading-relaxed">{comment.comment}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {comment.tags.map(tag => <Badge key={tag} variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">{tag}</Badge>)}
                                        </div>
                                        <Link href={`/dashboard/comments/analysis/${comment.id}`} passHref><Button variant="link" className="p-0 h-auto">View Full Analysis &rarr;</Button></Link>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Negative Keywords & Phrases</CardTitle>
                    <CardDescription>Most frequently mentioned negative terms.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {keywords.map(kw => <Badge key={kw} variant="outline" className="border-red-300 text-red-800 bg-red-50">{kw}</Badge>)}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Actions & Reports</CardTitle>
                    <CardDescription>Export the analysis of negative feedback for official records.</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                        <Download className="mr-2 h-4 w-4" />
                        Export Analysis (PDF)
                    </Button>
                    <Button variant="outline">
                        <Share className="mr-2 h-4 w-4" />
                        Share Report
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
