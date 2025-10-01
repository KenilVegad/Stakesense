
import Link from 'next/link';
import {
  ArrowLeft,
  Activity,
  Info,
  Download,
  FileText,
  CheckCircle,
  XCircle,
  MinusCircle
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
import { OverallSentimentDistributionChart, OverallSentimentScoreTrendChart } from '@/components/charts';

const overallComments = [
  {
    id: 'CMT001',
    name: 'Rajesh Kumar',
    company: 'Tech Solutions Pvt. Ltd.',
    comment: 'This is an excellent initiative towards digital transformation. The proposed amendments will significantly streamline corporate compliance processes and reduce bureaucratic overhead. I fully support these modernization efforts and believe they will position India as a global leader in digital governance.',
    score: '8.8',
    date: '19/1/2024',
    tags: ['excellent', 'digital transformation', 'streamline', 'support', 'modernization', 'global leader'],
    theme: 'Digital Transformation',
    initial: 'R',
    sentiment: 'Positive',
    ageGroup: '31-50',
    gender: 'Male',
    location: 'Urban'
  },
  {
    id: 'CMT002',
    name: 'Priya Sharma',
    company: 'Corporate Governance Institute',
    comment: 'The stakeholder engagement provisions are excellent and will improve corporate decision-making processes significantly. This represents a major step forward in corporate transparency and accountability. The digital-first approach aligns perfectly with modern business practices.',
    score: '9.2',
    date: '20/1/2024',
    tags: ['stakeholder engagement', 'transparency', 'accountability', 'digital-first', 'modern practices'],
    theme: 'Stakeholder Engagement',
    initial: 'P',
    sentiment: 'Positive',
    ageGroup: '31-50',
    gender: 'Female',
    location: 'Urban'
  },
  {
    id: 'CMT003',
    name: 'Amit Patel',
    company: 'Digital India Foundation',
    comment: 'Digital documentation requirements will streamline the process and reduce paperwork significantly. This is exactly what we need to modernize our corporate framework. The security protocols are well-designed and will protect sensitive information effectively.',
    score: '8.5',
    date: '21/1/2024',
    tags: ['digital documentation', 'streamline', 'reduce paperwork', 'modernize', 'security protocols'],
    theme: 'Digital Infrastructure',
    initial: 'A',
    sentiment: 'Positive',
    ageGroup: '18-30',
    gender: 'Male',
    location: 'Urban'
  },
  {
    id: 'CMT004',
    name: 'Suresh Gupta',
    company: 'Small Business Association',
    comment: 'Implementation of these new compliance requirements may create additional burden on small and medium enterprises. The timeline is too aggressive, and the costs associated are prohibitive for smaller entities. We request a phased implementation and financial support for SMEs.',
    score: '3.2',
    date: '22/1/2024',
    tags: ['burden', 'SMEs', 'aggressive timeline', 'costs', 'phased implementation', 'financial support'],
    theme: 'Implementation Timeline',
    initial: 'S',
    sentiment: 'Negative',
    ageGroup: '51+',
    gender: 'Male',
    location: 'Rural'
  }
];

const keywords = ["digital transformation", "compliance", "governance", "SMEs", "burden", "transparency", "modernization", "timeline", "costs", "framework", "consultation", "impact", "data security", "innovation", "inclusion"];

export default async function OverallAnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-8">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Public Sentiment Analysis Report</h2>
            <Button variant="outline" asChild>
                <Link href={`/dashboard/comments/${id}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Document
                </Link>
            </Button>
        </div>

        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
            <Info className="h-4 w-4 !text-blue-800" />
            <AlertTitle>Official Notice</AlertTitle>
            <AlertDescription>
            This report is generated using AI-powered sentiment analysis on public comments. It provides an aggregated overview of stakeholder opinions and should be used for informational purposes to guide policy-making.
            </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href={`/dashboard/sentiment-analysis/${id}/positive`}>
                <Card className="hover:shadow-lg transition-shadow border-green-500 border-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Positive Feedback</CardTitle>
                        <CheckCircle className="h-6 w-6 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-green-600">62.5%</div>
                        <p className="text-xs text-muted-foreground">3125 out of 5000 comments</p>
                        <p className="text-sm font-medium mt-2 text-green-600 hover:underline">View Positive Comments &rarr;</p>
                    </CardContent>
                </Card>
            </Link>

            <Link href={`/dashboard/sentiment-analysis/${id}/neutral`}>
                <Card className="hover:shadow-lg transition-shadow border-yellow-500 border-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Neutral Feedback</CardTitle>
                        <MinusCircle className="h-6 w-6 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-yellow-600">25%</div>
                        <p className="text-xs text-muted-foreground">1250 out of 5000 comments</p>
                        <p className="text-sm font-medium mt-2 text-yellow-600 hover:underline">View Neutral Comments &rarr;</p>
                    </CardContent>
                </Card>
            </Link>

            <Link href={`/dashboard/sentiment-analysis/${id}/negative`}>
                <Card className="hover:shadow-lg transition-shadow border-red-500 border-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Negative Feedback</CardTitle>
                        <XCircle className="h-6 w-6 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-red-600">12.5%</div>
                        <p className="text-xs text-muted-foreground">625 out of 5000 comments</p>
                        <p className="text-sm font-medium mt-2 text-red-600 hover:underline">View Negative Comments &rarr;</p>
                    </CardContent>
                </Card>
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Sentiment Distribution</CardTitle>
                    <CardDescription>Overall feedback categorization based on 5000 comments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <OverallSentimentDistributionChart />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Sentiment Breakdown by Theme</CardTitle>
                    <CardDescription>Sentiment distribution across key amendment categories.</CardDescription>
                </CardHeader>
                <CardContent>
                  Chart data is not available.
                </CardContent>
            </Card>
        </div>

        <div>
            <h2 className="text-2xl font-bold mb-4">Examples of Public Feedback</h2>
            <div className="space-y-4">
                {overallComments.map((comment, index) => (
                    <Card key={index} className={`border-l-4 ${comment.sentiment === 'Positive' ? 'border-green-500' : comment.sentiment === 'Negative' ? 'border-red-500' : 'border-yellow-500'} hover:shadow-md transition-shadow`}>
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <Avatar className={`h-12 w-12 border-2 ${comment.sentiment === 'Positive' ? 'border-green-200' : comment.sentiment === 'Negative' ? 'border-red-200' : 'border-yellow-200'}`}>
                                    <AvatarFallback className={`${comment.sentiment === 'Positive' ? 'bg-green-50 text-green-700' : comment.sentiment === 'Negative' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'} font-semibold text-lg`}>{comment.initial}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-base">{comment.name}</p>
                                            <p className="text-sm text-muted-foreground">{comment.company}</p>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant="outline" className={`font-semibold ${comment.sentiment === 'Positive' ? 'border-green-400 text-green-800 bg-green-50' : comment.sentiment === 'Negative' ? 'border-red-400 text-red-800 bg-red-50' : 'border-yellow-400 text-yellow-800 bg-yellow-50'}`}>Sentiment: {comment.sentiment}</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Submitted: {comment.date}</p>
                                        </div>
                                    </div>
                                    <Separator className="my-3" />
                                    <p className="text-base text-foreground/90 leading-relaxed">{comment.comment}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {comment.tags.map(tag => <Badge key={tag} variant="secondary" className={`${comment.sentiment === 'Positive' ? 'bg-green-100 text-green-800 hover:bg-green-200' : comment.sentiment === 'Negative' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}>{tag}</Badge>)}
                                        </div>
                                        <Link href={`/dashboard/comments/analysis/${comment.id}`} passHref>
                                          <Button variant="link" className="p-0 h-auto">View Full Analysis &rarr;</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </div>
  );
}
