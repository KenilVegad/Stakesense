'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Download, RefreshCw, CheckCircle, XCircle, MinusCircle, Smile, MapPin, Cake, Users, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const sentimentData = {
    positive: { percentage: 75, count: 1012 },
    neutral: { percentage: 15, count: 203 },
    negative: { percentage: 10, count: 135 },
};

const thematicAnalysisData = [
    { theme: 'Digital Transformation', approval: 85, sentiment: 'Highly Positive' },
    { theme: 'Implementation Timeline', approval: 60, sentiment: 'Mixed Response' },
    { theme: 'Governance Improvements', approval: 75, sentiment: 'Positive' },
    { theme: 'Rural Connectivity', approval: 40, sentiment: 'Concerns Raised' },
];

const pieChartData = [
    { name: 'Positive', value: sentimentData.positive.percentage },
    { name: 'Neutral', value: sentimentData.neutral.percentage },
    { name: 'Negative', value: sentimentData.negative.percentage },
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

export default function SentimentAnalysisPage() {
    const params = useParams();
    const id = params.id;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="outline" asChild>
                    <Link href={`/dashboard/comments/${id}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        <span>Back to Document</span>
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-lg">
                            <Smile className="h-8 w-8" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold">Public Sentiment Analysis Report</CardTitle>
                            <CardDescription>Draft Companies (Amendment) Rules, 2024 - Stakeholder Feedback Analysis</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-l-4 border-green-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Positive Feedback</CardTitle>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{sentimentData.positive.percentage}%</div>
                        <p className="text-sm text-muted-foreground">{sentimentData.positive.count} out of 1350 comments</p>
                        <Button variant="link" className="p-0 h-auto mt-2 text-green-600" asChild>
                            <Link href={`/dashboard/sentiment-analysis/${id}/positive`}>View Positive Comments &rarr;</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-yellow-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Neutral Feedback</CardTitle>
                        <MinusCircle className="h-5 w-5 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{sentimentData.neutral.percentage}%</div>
                        <p className="text-sm text-muted-foreground">{sentimentData.neutral.count} out of 1350 comments</p>
                        <Button variant="link" className="p-0 h-auto mt-2 text-yellow-600" asChild>
                            <Link href={`/dashboard/sentiment-analysis/${id}/neutral`}>View Neutral Comments &rarr;</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-red-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Negative Feedback</CardTitle>
                        <XCircle className="h-5 w-5 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{sentimentData.negative.percentage}%</div>
                        <p className="text-sm text-muted-foreground">{sentimentData.negative.count} out of 1350 comments</p>
                        <Button variant="link" className="p-0 h-auto mt-2 text-red-600" asChild>
                            <Link href={`/dashboard/sentiment-analysis/${id}/negative`}>View Negative Comments &rarr;</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-l-4 border-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Location-wise Analysis</CardTitle>
                        <MapPin className="h-5 w-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Based on commenter location.</p>
                         <Button variant="link" className="p-0 h-auto mt-2 text-blue-600" asChild>
                            <Link href={`/dashboard/sentiment-analysis/${id}/location`}>View Location-wise Analysis &rarr;</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-purple-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Gender-wise Analysis</CardTitle>
                        <Users className="h-5 w-5 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Based on commenter gender.</p>
                        <Button variant="link" className="p-0 h-auto mt-2 text-purple-600" asChild>
                            <Link href={`/dashboard/sentiment-analysis/${id}/gender`}>View Gender-wise Analysis &rarr;</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Age-wise Analysis</CardTitle>
                        <Cake className="h-5 w-5 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Based on commenter age groups.</p>
                        <Button variant="link" className="p-0 h-auto mt-2 text-orange-600" asChild>
                            <Link href={`/dashboard/sentiment-analysis/${id}/age`}>View Age-wise Analysis &rarr;</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Sentiment Distribution</CardTitle>
                        <CardDescription>Overall feedback categorization based on 1350 comments.</CardDescription>
                    </CardHeader>
                    <CardContent style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <defs>
                                    <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.4}/>
                                    </linearGradient>
                                    <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.4}/>
                                    </linearGradient>
                                    <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0.4}/>
                                    </linearGradient>
                                </defs>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    <Cell key={`cell-0`} fill="url(#colorPositive)" />
                                    <Cell key={`cell-1`} fill="url(#colorNeutral)" />
                                    <Cell key={`cell-2`} fill="url(#colorNegative)" />
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
                            The overall sentiment is <span className="text-green-500 font-semibold">largely positive</span>.
                            Key areas of satisfaction include digital transformation and governance improvements.
                            However, concerns were raised regarding the implementation timeline and rural connectivity.
                        </p>
                        <Button variant="link" className="p-0 h-auto mt-4 text-blue-600">Generate Detailed Report &rarr;</Button>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Thematic Analysis of Public Feedback</CardTitle>
                    <CardDescription>Key topics and their associated approval ratings identified in stakeholder comments.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {thematicAnalysisData.map(item => (
                        <div key={item.theme}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">{item.theme}</span>
                                <span className="text-xs font-semibold text-muted-foreground">{item.sentiment}</span>
                            </div>
                            <Progress value={item.approval} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">
                                {item.theme === 'Digital Transformation' ? `Strong support for digitalization initiatives (${item.approval}% approval)` :
                                    item.theme === 'Implementation Timeline' ? `Concerns about timeline feasibility (${item.approval}% satisfaction)` :
                                        item.theme === 'Governance Improvements' ? `Appreciation for enhanced governance measures (${item.approval}% approval)` :
                                            `Implementation challenges in rural areas (${item.approval}% satisfaction)`
                                }
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Official Actions</CardTitle>
                    <CardDescription>Download reports or refresh the analysis with new data.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download Full Report (PDF)
                    </Button>
                    <Button variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh Analysis
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={`/dashboard/comments/${id}#comments`}>
                            View All Raw Comments
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
