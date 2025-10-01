'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Smile,
  Info,
  LineChart,
  Download,
  FileText,
  ThumbsUp,
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

const positiveComments = [
  {
    id: 'CMT001',
    name: 'Rajesh Kumar',
    company: 'Tech Solutions Pvt. Ltd.',
    comment: 'This is an excellent initiative towards digital transformation. The proposed amendments will significantly streamline corporate compliance processes and reduce bureaucratic overhead. I fully support these modernization efforts and believe they will position India as a global leader in digital governance.',
    score: '8.8',
    date: '19/1/2024',
    tags: ['excellent', 'digital transformation', 'streamline', 'support', 'modernization', 'global leader'],
    theme: 'Digital Transformation',
    initial: 'R'
  },
  {
    id: 'CMT002',
    name: 'Priya Sharma',
    company: 'Corporate Legal Associates',
    comment: 'The amendments show a progressive approach to governance. The transparency measures and simplified procedures will benefit both companies and stakeholders. This is a step in the right direction that will enhance corporate accountability while reducing compliance burdens.',
    score: '8.7',
    date: '19/1/2024',
    tags: ['progressive', 'governance', 'transparency', 'simplified', 'benefit', 'accountability'],
    theme: 'Governance Improvements',
    initial: 'P'
  },
  {
    id: 'CMT003',
    name: 'Amit Patel',
    company: 'Startup Innovators Hub',
    comment: 'Excellent initiative! The digital documentation requirement will significantly reduce paperwork and improve transparency. This aligns perfectly with the government\'s digital India vision. I recommend including provisions for data security and backup requirements.',
    score: '9.2',
    date: '18/1/2024',
    tags: ['excellent', 'digital', 'transparency', 'data security'],
    theme: 'Digital Transformation',
    initial: 'A',
  },
  {
    id: 'CMT004',
    name: 'Sunita Singh',
    company: 'Financial Express',
    comment: 'A much-needed reform that will boost investor confidence. The emphasis on transparency and ease of doing business is commendable. It will surely attract more foreign investment.',
    score: '9.0',
    date: '18/1/2024',
    tags: ['reform', 'investor confidence', 'transparency', 'ease of doing business'],
    theme: 'Economic Impact',
    initial: 'S'
  },
  {
    id: 'CMT005',
    name: 'Vikram Mehta',
    company: 'Global Trade Corp',
    comment: 'These amendments are a game-changer for international trade. The simplified compliance will make Indian companies more competitive on the global stage. We are excited to see the positive impact on our operations.',
    score: '8.9',
    date: '17/1/2024',
    tags: ['game-changer', 'international trade', 'simplified compliance', 'competitive'],
    theme: 'Global Competitiveness',
    initial: 'V'
  },
  {
    id: 'CMT006',
    name: 'Anjali Devi',
    company: 'SME Association of India',
    comment: 'Finally, a government that listens to small businesses! These changes will reduce the burden on SMEs and allow us to focus on innovation and growth. A big thumbs up!',
    score: '9.5',
    date: '17/1/2024',
    tags: ['small businesses', 'SMEs', 'innovation', 'growth'],
    theme: 'SME Support',
    initial: 'A'
  }
];

const keywords = ["excellent", "forward-thinking", "support", "digital transformation", "transparency", "efficiency", "innovative", "beneficial", "progressive", "comprehensive", "streamline", "well-structured", "laudable", "visionary", "game-changer"];

const pieData = [
  { name: 'Very Positive', value: 400 },
  { name: 'Moderately Positive', value: 300 },
  { name: 'Slightly Positive', value: 300 },
];

const areaData = [
  { date: '15/1', score: 8.2 },
  { date: '16/1', score: 8.5 },
  { date: '17/1', score: 8.3 },
  { date: '18/1', score: 9.0 },
  { date: '19/1', score: 8.8 },
  { date: '20/1', score: 9.2 },
];

const COLORS = ['#059669', '#10B981', '#34D399'];

export default function PositiveSentimentAnalysisPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href={`/dashboard/sentiment-analysis/${id}`} className="hover:underline text-primary">Sentiment Dashboard</Link>
        <span className='font-semibold'>/</span>
        <span className="text-foreground font-semibold">Positive Feedback Analysis</span>
      </div>

      <Card>
        <CardHeader>
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-green-100 text-green-700">
                    <ThumbsUp className="h-8 w-8" />
                </div>
                <div>
                    <CardTitle className='text-2xl'>Positive Sentiment Analysis</CardTitle>
                    <CardDescription>Comprehensive analysis of positive stakeholder feedback and sentiment trends.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Alert className="bg-green-50 border-green-200 text-green-800">
                <Info className="h-4 w-4 !text-green-800" />
                <AlertTitle>Analysis Summary</AlertTitle>
                <AlertDescription>
                A total of 1012 out of 1350 comments (75%) expressed positive views, lauding the proposed amendments. Key themes include strong support for digital transformation, governance improvements, and modernization efforts.
                </AlertDescription>
            </Alert>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
            <CardHeader className='pb-2'><CardTitle className="text-sm font-medium">Positive Comments</CardTitle></CardHeader>
            <CardContent><div className="text-4xl font-bold text-green-600">1012</div><p className="text-xs text-muted-foreground">Total Count</p></CardContent>
        </Card>
        <Card>
            <CardHeader className='pb-2'><CardTitle className="text-sm font-medium">Overall Percentage</CardTitle></CardHeader>
            <CardContent><div className="text-4xl font-bold text-green-600">75%</div><p className="text-xs text-muted-foreground">Of All Feedback</p></CardContent>
        </Card>
        <Card>
            <CardHeader className='pb-2'><CardTitle className="text-sm font-medium">Avg. Sentiment Score</CardTitle></CardHeader>
            <CardContent><div className="text-4xl font-bold text-green-600">8.4</div><p className="text-xs text-muted-foreground">Out of 10</p></CardContent>
        </Card>
        <Card>
            <CardHeader className='pb-2'><CardTitle className="text-sm font-medium">Key Positive Themes</CardTitle></CardHeader>
            <CardContent><div className="text-4xl font-bold text-green-600">5</div><p className="text-xs text-muted-foreground">Identified</p></CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Positive Sentiment Distribution</CardTitle>
            <CardDescription>Breakdown of positive feedback intensity across all comments.</CardDescription>
          </CardHeader>
          <CardContent style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#8884d8" paddingAngle={5} dataKey="value" labelLine={false}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{filter: 'url(#glow)'}} />
                  ))}
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
                    The sentiment is overwhelmingly positive. Digital Transformation is the most appreciated theme. There is a consistent upward trend in positive scores over the last week.
                </p>
                <Button variant="link" className="p-0 h-auto mt-4 text-blue-600">Explore Themes &rarr;</Button>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Positive Sentiment Score Trend</CardTitle>
          <CardDescription>Timeline of average positive sentiment scores over the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#059669" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Most Appreciated Aspects</CardTitle>
            <CardDescription>Top themes and categories in positive feedback, based on AI analysis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium">Digital Transformation</span><span className="text-sm font-semibold text-green-600">94% Positive</span></div>
                <Progress value={94} className="h-2 [&>div]:bg-green-500" />
                <p className="text-xs text-muted-foreground mt-1">Overwhelming support for digitalization initiatives and streamlined processes.</p>
            </div>
            <div>
                <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium">Governance & Compliance</span><span className="text-sm font-semibold text-green-600">91% Positive</span></div>
                <Progress value={91} className="h-2 [&>div]:bg-green-500" />
                <p className="text-xs text-muted-foreground mt-1">Strong appreciation for enhanced governance measures and transparency.</p>
            </div>
            <div>
                <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium">Business Ecosystem</span><span className="text-sm font-semibold text-green-600">87% Positive</span></div>
                <Progress value={87} className="h-2 [&>div]:bg-green-500" />
                <p className="text-xs text-muted-foreground mt-1">Support for startup and SME-friendly policies promoting growth.</p>
            </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4">All Positive Comments</h2>
        <div className="space-y-4">
            {positiveComments.map((comment, index) => (
                <Card key={index} className="border-l-4 border-green-500 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12 border-2 border-green-200"><AvatarFallback className="bg-green-50 text-green-700 font-semibold text-lg">{comment.initial}</AvatarFallback></Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-base">{comment.name}</p>
                                        <p className="text-sm text-muted-foreground">{comment.company}</p>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant="outline" className="font-semibold border-green-400 text-green-800 bg-green-50">Sentiment Score: {comment.score}/10</Badge>
                                        <p className="text-xs text-muted-foreground mt-1">Submitted: {comment.date}</p>
                                    </div>
                                </div>
                                <Separator className="my-3" />
                                <p className="text-base text-foreground/90 leading-relaxed">{comment.comment}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                        {comment.tags.map(tag => <Badge key={tag} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">{tag}</Badge>)}
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
                <CardTitle>Positive Keywords & Phrases</CardTitle>
                <CardDescription>Most frequently mentioned positive terms.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {keywords.map(kw => <Badge key={kw} variant="outline" className="border-green-300 text-green-800 bg-green-50">{kw}</Badge>)}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Actions & Reports</CardTitle>
                <CardDescription>Export the analysis of positive feedback for official records.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
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
