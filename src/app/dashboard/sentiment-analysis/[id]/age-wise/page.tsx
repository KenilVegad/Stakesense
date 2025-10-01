
import Link from 'next/link';
import {
  ArrowLeft,
  Cake,
  Info,
  Download,
  FileText,
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

const ageWiseComments = [
  {
    id: 'CMT010',
    name: 'Young Professional',
    company: 'Fintech Startup',
    comment: 'The emphasis on digital-first governance is exactly what India needs. This will attract young talent to the corporate sector and foster innovation. We are excited about the possibilities this will unlock for the new generation of entrepreneurs.',
    score: '9.1',
    date: '26/1/2024',
    tags: ['digital-first', 'young talent', 'innovation', 'new generation', 'entrepreneurs'],
    theme: 'Youth & Innovation',
    initial: 'Y',
    sentiment: 'Positive',
    ageGroup: '18-30',
    gender: 'Male',
    location: 'Urban'
  },
  {
    id: 'CMT011',
    name: 'Senior Executive',
    company: 'Established Corporation',
    comment: 'While modernization is important, the transition needs to be managed carefully to avoid disrupting established processes. We need more clarity on data security and the legal validity of digital documents. The concerns of experienced professionals should be taken into account.',
    score: '6.5',
    date: '27/1/2024',
    tags: ['modernization', 'transition', 'data security', 'legal validity', 'experienced professionals'],
    theme: 'Transition Management',
    initial: 'S',
    sentiment: 'Neutral',
    ageGroup: '51+',
    gender: 'Male',
    location: 'Urban'
  },
  {
    id: 'CMT012',
    name: 'Millennial Entrepreneur',
    company: 'Tech Innovation Hub',
    comment: 'This is the future we\'ve been waiting for! The digital transformation will create massive opportunities for young entrepreneurs. The streamlined processes will help us compete globally and attract international investments.',
    score: '9.3',
    date: '28/1/2024',
    tags: ['future', 'digital transformation', 'young entrepreneurs', 'global competition', 'international investments'],
    theme: 'Global Opportunities',
    initial: 'M',
    sentiment: 'Positive',
    ageGroup: '18-30',
    gender: 'Female',
    location: 'Urban'
  },
  {
    id: 'CMT013',
    name: 'Experienced Professional',
    company: 'Corporate Advisory Services',
    comment: 'The amendments are well-intentioned but need careful implementation. As someone with decades of experience, I can see both the benefits and challenges. We need to ensure that experience and wisdom are not overlooked in the rush to digitalize.',
    score: '6.9',
    date: '29/1/2024',
    tags: ['well-intentioned', 'careful implementation', 'experience', 'benefits and challenges', 'wisdom'],
    theme: 'Balanced Approach',
    initial: 'E',
    sentiment: 'Neutral',
    ageGroup: '51+',
    gender: 'Male',
    location: 'Urban'
  },
  {
    id: 'CMT014',
    name: 'Gen Z Innovator',
    company: 'AI Startup',
    comment: 'Finally! A regulatory framework that understands technology. This will unleash the potential of India\'s young tech talent. We can now build solutions that compete with Silicon Valley companies. The future is bright!',
    score: '9.5',
    date: '30/1/2024',
    tags: ['regulatory framework', 'technology', 'young tech talent', 'Silicon Valley', 'future'],
    theme: 'Tech Leadership',
    initial: 'G',
    sentiment: 'Positive',
    ageGroup: '18-30',
    gender: 'Female',
    location: 'Urban'
  },
  {
    id: 'CMT015',
    name: 'Seasoned Business Owner',
    company: 'Family Business Enterprise',
    comment: 'I\'ve been running my business for 40 years, and these changes are overwhelming. While I understand the need for modernization, the digital requirements are too complex for traditional businesses like ours. We need more support.',
    score: '4.2',
    date: '31/1/2024',
    tags: ['family business', 'overwhelming', 'modernization', 'digital requirements', 'traditional business', 'support'],
    theme: 'Traditional Business Concerns',
    initial: 'S',
    sentiment: 'Negative',
    ageGroup: '51+',
    gender: 'Male',
    location: 'Rural'
  },
  {
    id: 'CMT016',
    name: 'Young Professional',
    company: 'E-commerce Platform',
    comment: 'The digital-first approach is perfect for our generation. We\'ve grown up with technology, so these changes feel natural. This will help us build more efficient and scalable businesses. I\'m excited about the possibilities!',
    score: '8.8',
    date: '1/2/2024',
    tags: ['digital-first', 'our generation', 'technology', 'efficient', 'scalable businesses', 'possibilities'],
    theme: 'Natural Progression',
    initial: 'Y',
    sentiment: 'Positive',
    ageGroup: '18-30',
    gender: 'Male',
    location: 'Urban'
  },
  {
    id: 'CMT017',
    name: 'Mid-Career Professional',
    company: 'Consulting Firm',
    comment: 'As someone in the middle of my career, I can see both sides of this debate. The digital transformation is necessary, but we need to ensure that experienced professionals can transition smoothly. Training and support are crucial.',
    score: '7.1',
    date: '2/2/2024',
    tags: ['mid-career', 'both sides', 'digital transformation', 'experienced professionals', 'training', 'support'],
    theme: 'Career Transition',
    initial: 'M',
    sentiment: 'Neutral',
    ageGroup: '31-50',
    gender: 'Female',
    location: 'Urban'
  },
  {
    id: 'CMT018',
    name: 'Retired Executive',
    company: 'Industry Association',
    comment: 'Having worked in corporate governance for decades, I can appreciate the need for modernization. However, the pace of change is concerning. We need to preserve institutional knowledge while embracing new technologies.',
    score: '6.3',
    date: '3/2/2024',
    tags: ['corporate governance', 'modernization', 'pace of change', 'institutional knowledge', 'new technologies'],
    theme: 'Institutional Knowledge',
    initial: 'R',
    sentiment: 'Neutral',
    ageGroup: '51+',
    gender: 'Male',
    location: 'Urban'
  },
  {
    id: 'CMT019',
    name: 'Young Entrepreneur',
    company: 'Social Impact Startup',
    comment: 'This is exactly what we need to build a more inclusive economy! The simplified procedures will help young entrepreneurs from all backgrounds. This will democratize access to business opportunities.',
    score: '9.0',
    date: '4/2/2024',
    tags: ['inclusive economy', 'simplified procedures', 'young entrepreneurs', 'all backgrounds', 'democratize access'],
    theme: 'Inclusive Growth',
    initial: 'Y',
    sentiment: 'Positive',
    ageGroup: '18-30',
    gender: 'Female',
    location: 'Urban'
  }
];

const keywords = ["youth", "millennial", "gen-z", "experienced professionals", "senior citizens", "age-related concerns", "generational gap", "digital literacy", "adoption rate", "long-term impact", "pensioners", "new generation", "next-gen", "age demographics"];

export default async function AgeWiseAnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/dashboard/sentiment-analysis/${id}`} className="hover:underline text-primary">Sentiment Dashboard</Link>
          <span className='font-semibold'>/</span>
          <span className="text-foreground font-semibold">Age-wise Feedback Analysis</span>
        </div>
        <Button variant="outline" asChild>
            <Link href={`/dashboard/comments/${id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Document
            </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-100 text-purple-700">
                    <Cake className="h-8 w-8" />
                </div>
                <div>
                    <CardTitle className='text-2xl'>Age-wise Sentiment Analysis</CardTitle>
                    <CardDescription>Comprehensive analysis of stakeholder feedback based on age demographics.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Alert className="bg-purple-50 border-purple-200 text-purple-800">
                <Info className="h-4 w-4 !text-purple-800" />
                <AlertTitle>Analysis Summary</AlertTitle>
                <AlertDescription>
                Younger demographics (18-30) are highly enthusiastic about the digital-first approach, seeing it as a driver of innovation. Older demographics (51+) are more cautious, emphasizing the need for a smooth transition and data security. Feedback from the 31-50 age group is mixed.
                </AlertDescription>
            </Alert>
        </CardContent>
      </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardHeader className='pb-2'>
                    <CardTitle className="text-sm font-medium">18-30 Age Group</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-purple-600">40%</div>
                    <p className="text-xs text-muted-foreground">Of All Feedback</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='pb-2'>
                    <CardTitle className="text-sm font-medium">31-50 Age Group</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-purple-600">35%</div>
                    <p className="text-xs text-muted-foreground">Of All Feedback</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='pb-2'>
                    <CardTitle className="text-sm font-medium">51+ Age Group</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-purple-600">25%</div>
                    <p className="text-xs text-muted-foreground">Of All Feedback</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='pb-2'>
                    <CardTitle className="text-sm font-medium">Avg. Youth Score</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-purple-600">8.9</div>
                    <p className="text-xs text-muted-foreground">Out of 10</p>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Age-wise Sentiment Distribution</CardTitle>
                <CardDescription>Breakdown of feedback sentiment across different age groups.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Chart data is not available.</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Key Themes by Age Group</CardTitle>
                <CardDescription>Top themes and categories based on age demographics.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">18-30: Youth & Innovation</span>
                        <span className="text-sm font-semibold text-green-600">92% Positive</span>
                    </div>
                    <Progress value={92} className="h-2 [&>div]:bg-green-500" />
                    <p className="text-xs text-muted-foreground mt-1">High enthusiasm for digital-first policies and opportunities for young entrepreneurs.</p>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">51+: Transition Management</span>
                        <span className="text-sm font-semibold text-yellow-600">68% Neutral</span>
                    </div>
                    <Progress value={68} className="h-2 [&>div]:bg-yellow-500" />
                    <p className="text-xs text-muted-foreground mt-1">Cautious optimism with a focus on data security and the need for a smooth transition.</p>
                </div>
            </CardContent>
        </Card>

        <div>
            <h2 className="text-2xl font-bold mb-4">All Age-based Comments</h2>
            <div className="space-y-4">
                {ageWiseComments.map((comment, index) => (
                    <Card key={index} className={`border-l-4 ${comment.ageGroup === '18-30' ? 'border-purple-500' : 'border-orange-500'} hover:shadow-md transition-shadow`}>
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <Avatar className={`h-12 w-12 border-2 ${comment.ageGroup === '18-30' ? 'border-purple-200' : 'border-orange-200'}`}>
                                    <AvatarFallback className={`${comment.ageGroup === '18-30' ? 'bg-purple-50 text-purple-700' : 'bg-orange-50 text-orange-700'} font-semibold text-lg`}>{comment.initial}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-base">{comment.name}</p>
                                            <p className="text-sm text-muted-foreground">{comment.company}</p>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant="outline" className={`font-semibold ${comment.ageGroup === '18-30' ? 'border-purple-400 text-purple-800 bg-purple-50' : 'border-orange-400 text-orange-800 bg-orange-50'}`}>Age Group: {comment.ageGroup}</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Submitted: {comment.date}</p>
                                        </div>
                                    </div>
                                    <Separator className="my-3" />
                                    <p className="text-base text-foreground/90 leading-relaxed">{comment.comment}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {comment.tags.map(tag => <Badge key={tag} variant="secondary" className={`${comment.ageGroup === '18-30' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' : 'bg-orange-100 text-orange-800 hover:bg-orange-200'}`}>{tag}</Badge>)}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Age-related Keywords</CardTitle>
                    <CardDescription>Most frequently mentioned terms by age group.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {keywords.map(kw => <Badge key={kw} variant="outline" className="border-purple-300 text-purple-800 bg-purple-50">{kw}</Badge>)}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sentiment Score Trend by Age</CardTitle>
                    <CardDescription>Timeline of average sentiment scores from different age groups.</CardDescription>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground">Chart data is not available.</p>
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Actions & Reports</CardTitle>
                <CardDescription>Export the analysis of age-based feedback for official records.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Export Age Analysis (PDF)
                </Button>
                <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Download Detailed Report
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
