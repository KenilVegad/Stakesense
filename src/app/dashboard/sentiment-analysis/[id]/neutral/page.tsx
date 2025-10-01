'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Meh,
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

const neutralComments = [
  {
    id: 'CMT006',
    name: 'Policy Analyst',
    company: 'Centre for Public Policy',
    comment: 'The regulatory framework needs to be more comprehensive to address current market challenges. While the amendments are a good start, they do not go far enough in several areas. We recommend a more thorough review and consultation process to ensure all market realities are considered.',
    score: '5.5',
    date: '22/1/2024',
    tags: ['comprehensive', 'market challenges', 'thorough review', 'consultation', 'market realities'],
    theme: 'Regulatory Framework',
    initial: 'P'
  },
  {
    id: 'CMT007',
    name: 'Small Business Owner',
    company: 'SME Alliance of India',
    comment: 'The impact on small businesses needs to be assessed more thoroughly. While the digital filing is a welcome move, the immediate transition may be challenging. We suggest a grace period and support for smaller firms to adapt to the new systems.',
    score: '6.2',
    date: '23/1/2024',
    tags: ['impact', 'small businesses', 'assessed', 'grace period', 'support'],
    theme: 'SME Impact',
    initial: 'S'
  }
];

const keywords = ["comprehensive", "market challenges", "thorough review", "consultation", "market realities", "impact", "assessed", "grace period", "support", "needs to be", "further consideration", "requires more study", "mixed impact", "balanced approach"];

const pieData = [
  { name: 'Slightly Neutral', value: 45 },
  { name: 'Purely Neutral', value: 35 },
  { name: 'Leaning Neutral', value: 20 },
];

const areaData = [
    { date: '20/1', score: 5.5 },
    { date: '21/1', score: 5.8 },
    { date: '22/1', score: 6.0 },
    { date: '23/1', score: 5.7 },
    { date: '24/1', score: 6.2 },
    { date: '25/1', score: 6.1 },
];

const COLORS = ['#F59E0B', '#FBBF24', '#FCD34D'];

export default function NeutralSentimentAnalysisPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href={`/dashboard/sentiment-analysis/${id}`} className="hover:underline text-primary">Sentiment Dashboard</Link>
        <span className='font-semibold'>/</span>
        <span className="text-foreground font-semibold">Neutral Feedback Analysis</span>
      </div>

      <Card>
        <CardHeader>
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-yellow-100 text-yellow-700">
                    <Meh className="h-8 w-8" />
                </div>
                <div>
                    <CardTitle className='text-2xl'>Neutral Sentiment Analysis</CardTitle>
                    <CardDescription>Comprehensive analysis of neutral stakeholder feedback and sentiment trends.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
                <Info className="h-4 w-4 !text-yellow-800" />
                <AlertTitle>Analysis Summary</AlertTitle>
                <AlertDescription>
                A total of 203 out of 1350 comments (15%) expressed neutral views, suggesting areas for further review and consideration. Key themes include the need for a more comprehensive regulatory framework and a thorough assessment of the impact on small businesses.
                </AlertDescription>
            </Alert>
        </CardContent>
      </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardHeader className='pb-2'><CardTitle className="text-sm font-medium">Neutral Comments</CardTitle></CardHeader>
                <CardContent><div className="text-4xl font-bold text-yellow-600">203</div><p className="text-xs text-muted-foreground">Total Count</p></CardContent>
            </Card>
            <Card>
                <CardHeader className='pb-2'><CardTitle className="text-sm font-medium">Overall Percentage</CardTitle></CardHeader>
                <CardContent><div className="text-4xl font-bold text-yellow-600">15%</div><p className="text-xs text-muted-foreground">Of All Feedback</p></CardContent>
            </Card>
            <Card>
                <CardHeader className='pb-2'><CardTitle className="text-sm font-medium">Avg. Sentiment Score</CardTitle></CardHeader>
                <CardContent><div className="text-4xl font-bold text-yellow-600">5.8</div><p className="text-xs text-muted-foreground">Out of 10</p></CardContent>
            </Card>
            <Card>
                <CardHeader className='pb-2'><CardTitle className="text-sm font-medium">Key Neutral Themes</CardTitle></CardHeader>
                <CardContent><div className="text-4xl font-bold text-yellow-600">2</div><p className="text-xs text-muted-foreground">Identified</p></CardContent>
            </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Neutral Sentiment Distribution</CardTitle>
                    <CardDescription>Breakdown of neutral feedback intensity across all comments.</CardDescription>
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
                        Neutral feedback highlights a need for a more comprehensive regulatory framework and a deeper impact assessment for SMEs. Scores are stable but suggest a lack of strong opinion.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-4 text-blue-600">Get Actionable Insights &rarr;</Button>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Neutral Sentiment Score Trend</CardTitle>
                <CardDescription>Timeline of average neutral sentiment scores over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="score" stroke="#D97706" fillOpacity={1} fill="url(#colorNeutral)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Areas for Further Consideration</CardTitle>
                <CardDescription>Top themes and categories in neutral feedback, based on AI analysis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium">Regulatory Framework</span><span className="text-sm font-semibold text-yellow-600">65% Neutral</span></div>
                    <Progress value={65} className="h-2 [&>div]:bg-yellow-500" />
                    <p className="text-xs text-muted-foreground mt-1">Suggestions for a more comprehensive framework to address all market challenges.</p>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium">SME Impact Assessment</span><span className="text-sm font-semibold text-yellow-600">72% Neutral</span></div>
                    <Progress value={72} className="h-2 [&>div]:bg-yellow-500" />
                    <p className="text-xs text-muted-foreground mt-1">Calls for a more thorough assessment of the impact on small businesses and a phased rollout.</p>
                </div>
            </CardContent>
        </Card>

        <div>
            <h2 className="text-2xl font-bold mb-4">All Neutral Comments</h2>
            <div className="space-y-4">
                {neutralComments.map((comment, index) => (
                    <Card key={index} className="border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12 border-2 border-yellow-200"><AvatarFallback className="bg-yellow-50 text-yellow-700 font-semibold text-lg">{comment.initial}</AvatarFallback></Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-base">{comment.name}</p>
                                            <p className="text-sm text-muted-foreground">{comment.company}</p>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant="outline" className="font-semibold border-yellow-400 text-yellow-800 bg-yellow-50">Sentiment Score: {comment.score}/10</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Submitted: {comment.date}</p>
                                        </div>
                                    </div>
                                    <Separator className="my-3" />
                                    <p className="text-base text-foreground/90 leading-relaxed">{comment.comment}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {comment.tags.map(tag => <Badge key={tag} variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">{tag}</Badge>)}
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
                    <CardTitle>Neutral Keywords & Phrases</CardTitle>
                    <CardDescription>Most frequently mentioned neutral terms.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {keywords.map(kw => <Badge key={kw} variant="outline" className="border-yellow-300 text-yellow-800 bg-yellow-50">{kw}</Badge>)}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Actions & Reports</CardTitle>
                    <CardDescription>Export the analysis of neutral feedback for official records.</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                    <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
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
