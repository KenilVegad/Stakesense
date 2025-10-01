
import Link from 'next/link';
import {
  ArrowLeft,
  Users,
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

const genderWiseComments = [
  {
    id: 'CMT012',
    name: 'Anjali Verma',
    company: 'Women in Tech Foundation',
    comment: 'The provisions for digital literacy and inclusion are a huge step forward for women entrepreneurs. This will empower more women to participate in the formal economy. We strongly support the focus on gender-inclusive policies.',
    score: '9.3',
    date: '28/1/2024',
    tags: ['digital literacy', 'inclusion', 'women entrepreneurs', 'empowerment', 'gender-inclusive'],
    theme: 'Women Empowerment',
    initial: 'A',
    gender: 'Female'
  },
  {
    id: 'CMT013',
    name: 'Vikram Singh',
    company: 'Gender Equality Forum',
    comment: 'While the policy is gender-neutral on the surface, its implementation must address the existing gender gap in digital access. We recommend targeted programs to ensure women are not left behind in this digital transformation journey.',
    score: '7.1',
    date: '29/1/2024',
    tags: ['gender-neutral', 'implementation', 'gender gap', 'digital access', 'targeted programs'],
    theme: 'Gender Gap',
    initial: 'V',
    gender: 'Male'
  }
];

const keywords = ["women empowerment", "gender equality", "gender gap", "inclusion", "diversity", "women in tech", "female entrepreneurs", "gender-specific policies", "unconscious bias", "equal opportunity", "gender perspective", "male-dominated", "female leadership", "gender-neutral language"];

export default async function GenderWiseAnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/dashboard/sentiment-analysis/${id}`} className="hover:underline text-primary">Sentiment Dashboard</Link>
          <span className='font-semibold'>/</span>
          <span className="text-foreground font-semibold">Gender-wise Feedback Analysis</span>
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
                <div className="p-3 rounded-lg bg-pink-100 text-pink-700">
                    <Users className="h-8 w-8" />
                </div>
                <div>
                    <CardTitle className='text-2xl'>Gender-wise Sentiment Analysis</CardTitle>
                    <CardDescription>Comprehensive analysis of stakeholder feedback based on gender.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Alert className="bg-pink-50 border-pink-200 text-pink-800">
                <Info className="h-4 w-4 !text-pink-800" />
                <AlertTitle>Analysis Summary</AlertTitle>
                <AlertDescription>
                Female respondents have shown strong support for the policy, particularly its focus on digital literacy and inclusion. Male respondents, while generally positive, have raised concerns about the need for targeted programs to bridge the existing gender gap in digital access.
                </AlertDescription>
            </Alert>
        </CardContent>
      </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardHeader className='pb-2'>
                    <CardTitle className="text-sm font-medium">Female Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-pink-600">60%</div>
                    <p className="text-xs text-muted-foreground">Of All Feedback</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='pb-2'>
                    <CardTitle className="text-sm font-medium">Male Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-pink-600">40%</div>
                    <p className="text-xs text-muted-foreground">Of All Feedback</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='pb-2'>
                    <CardTitle className="text-sm font-medium">Avg. Female Score</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-pink-600">8.5</div>
                    <p className="text-xs text-muted-foreground">Out of 10</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='pb-2'>
                    <CardTitle className="text-sm font-medium">Avg. Male Score</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-pink-600">7.2</div>
                    <p className="text-xs text-muted-foreground">Out of 10</p>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Gender-wise Sentiment Distribution</CardTitle>
                <CardDescription>Breakdown of feedback sentiment across genders.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Chart data is not available.</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Key Themes by Gender</CardTitle>
                <CardDescription>Top themes and categories based on gender.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Female: Women Empowerment</span>
                        <span className="text-sm font-semibold text-green-600">90% Positive</span>
                    </div>
                    <Progress value={90} className="h-2 [&>div]:bg-green-500" />
                    <p className="text-xs text-muted-foreground mt-1">Strong support for policies promoting digital literacy and inclusion for women.</p>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Male: Bridging the Gender Gap</span>
                        <span className="text-sm font-semibold text-yellow-600">60% Neutral</span>
                    </div>
                    <Progress value={60} className="h-2 [&>div]:bg-yellow-500" />
                    <p className="text-xs text-muted-foreground mt-1">Emphasis on the need for targeted programs to ensure equitable digital access.</p>
                </div>
            </CardContent>
        </Card>

        <div>
            <h2 className="text-2xl font-bold mb-4">All Gender-based Comments</h2>
            <div className="space-y-4">
                {genderWiseComments.map((comment, index) => (
                    <Card key={index} className={`border-l-4 ${comment.gender === 'Female' ? 'border-pink-500' : 'border-indigo-500'} hover:shadow-md transition-shadow`}>
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <Avatar className={`h-12 w-12 border-2 ${comment.gender === 'Female' ? 'border-pink-200' : 'border-indigo-200'}`}>
                                    <AvatarFallback className={`${comment.gender === 'Female' ? 'bg-pink-50 text-pink-700' : 'bg-indigo-50 text-indigo-700'} font-semibold text-lg`}>{comment.initial}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-base">{comment.name}</p>
                                            <p className="text-sm text-muted-foreground">{comment.company}</p>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant="outline" className={`font-semibold ${comment.gender === 'Female' ? 'border-pink-400 text-pink-800 bg-pink-50' : 'border-indigo-400 text-indigo-800 bg-indigo-50'}`}>Gender: {comment.gender}</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Submitted: {comment.date}</p>
                                        </div>
                                    </div>
                                    <Separator className="my-3" />
                                    <p className="text-base text-foreground/90 leading-relaxed">{comment.comment}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {comment.tags.map(tag => <Badge key={tag} variant="secondary" className={`${comment.gender === 'Female' ? 'bg-pink-100 text-pink-800 hover:bg-pink-200' : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'}`}>{tag}</Badge>)}
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
                    <CardTitle>Gender-related Keywords</CardTitle>
                    <CardDescription>Most frequently mentioned terms by gender.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {keywords.map(kw => <Badge key={kw} variant="outline" className="border-pink-300 text-pink-800 bg-pink-50">{kw}</Badge>)}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sentiment Score Trend by Gender</CardTitle>
                    <CardDescription>Timeline of average sentiment scores from different genders.</CardDescription>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground">Chart data is not available.</p>
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Actions & Reports</CardTitle>
                <CardDescription>Export the analysis of gender-based feedback for official records.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Export Gender Analysis (PDF)
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
