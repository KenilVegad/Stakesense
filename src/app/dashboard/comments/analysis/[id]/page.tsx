
import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Building,
  Calendar,
  ClipboardList,
  MessageSquare,
  Smile,
  Sparkles,
  User,
} from 'lucide-react';
import Link from 'next/link';


const commentData = {
    user: {
        name: 'Michael Kaufmann',
        initials: 'MK',
        id: 'USR-2024-7891',
        designation: 'Senior Product Manager',
        company: 'Techinnovate GmbH',
        loyaltyPoints: '2,847',
        memberSince: 'March 2022',
        totalReviews: '23 Reviews',
        engagementLevel: 87,
        helpfulnessScore: 94.2,
        lastActivity: '2 hours ago',
    },
    sentiment: {
        positive: 91.3,
        neutral: 6.8,
        negative: 1.9,
    },
    originalReview: `
    "Als Senior Product Manager mit über 15 Jahren Erfahrung in der Technologiebranche kann ich mit Überzeugung sagen, dass dieses Produkt und der dazugehörige Service außergewöhnlich sind. Die Qualität der Materialien und die Verarbeitung übertreffen deutlich meine hohen Erwartungen, die ich aufgrund meiner beruflichen Expertise in der Produktentwicklung habe. Das Engineering-Team hat offensichtlich großen Wert auf Details gelegt - jeder Aspekt des Produkts zeigt durchdachte Designentscheidungen und hochwertige Implementierung. Der Kundenservice war bemerkenswert professionell und technisch versiert. Als jemand, der täglich mit komplexen technischen Spezifikationen arbeitet, war ich beeindruckt von der Kompetenz des Support-Teams. Sie konnten alle meine detaillierten Fragen beantworten und haben sogar zusätzliche technische Dokumentation bereitgestellt, die für meine berufliche Bewertung hilfreich war. Die Lieferlogistik war tadellos - pünktlich, sicher verpackt und mit vollständiger Nachverfolgung. Das Unboxing-Erlebnis war durchdacht gestaltet, was die Aufmerksamkeit für die gesamte Customer Journey zeigt. Aus geschäftlicher Sicht ist das Preis-Leistungs-Verhältnis hervorragend. Ich habe bereits eine Empfehlung an unser Procurement-Team weitergegeben und werde dieses Unternehmen definitiv für zukünftige Projekte in Betracht ziehen. Die Kombination aus technischer Exzellenz, professionellem Service und zuverlässiger Ausführung macht dies zu einer erstklassigen Geschäftserfahrung. Fünf Sterne und eine klare Weiterempfehlung für andere Fachkräfte in der Branche."
    `,
    englishTranslation: `
    "As a Senior Product Manager with over 15 years of experience in the technology industry, I can confidently say that this product and associated service are exceptional. The quality of materials and workmanship significantly exceed my high expectations, which I have due to my professional expertise in product development. The engineering team has obviously placed great value on details - every aspect of the product shows thoughtful design decisions and high-quality implementation. The customer service was remarkably professional and technically proficient. As someone who works daily with complex technical specifications, I was impressed by the competence of the support team. They were able to answer all my detailed questions and even provided additional technical documentation that was helpful for my professional evaluation. The delivery logistics were impeccable - punctual, securely packaged, and with complete tracking. The unboxing experience was thoughtfully designed, showing attention to the entire customer journey. From a business perspective, the price-performance ratio is excellent. I have already passed on a recommendation to our procurement team and will definitely consider this company for future projects. The combination of technical excellence, professional service, and reliable execution makes this a first-class business experience. Five stars and a clear recommendation for other professionals in the industry."
    `,
    metrics: {
        wordCount: 312,
        charCount: '1,847',
        readingTime: '1.8 minutes',
        languageConfidence: 'German (99.7%)',
        professionalLevel: 'Expert',
    },
    keywords: ['exceptional', 'professional', 'technical excellence', 'procurement', 'engineering', 'implementation', 'business value', 'industry expert'],
    emotionAnalysis: [
        { name: 'Confidence', value: 94 },
        { name: 'Satisfaction', value: 91 },
        { name: 'Trust', value: 88 },
        { name: 'Recommendation Intent', value: 96 },
    ],
    businessImpact: {
        score: 9.4,
        b2bLead: true,
        enterpriseCredibility: true,
        futureProjects: true,
    },
    executiveSummary: 'This is an exceptionally detailed and professional review from a senior industry expert with 15+ years of experience. The review demonstrates deep technical knowledge and provides a comprehensive evaluation across product quality, service excellence, and business value proposition.',
    keyInsights: [
        'Technical Expertise: Review demonstrates deep understanding of engineering and product development',
        'Business Impact: Explicit mention of procurement team recommendation and future project consideration',
        'Industry Credibility: 15+ years experience adds significant weight to the testimonial',
        'Comprehensive Evaluation: Covers product, service, logistics, and business value',
    ],
    businessValueIndicators: 'The review indicates high-value B2B customer satisfaction with explicit mentions of procurement recommendations, future project considerations, and industry peer recommendations. This represents significant business development potential and customer lifetime value.'
};

export default async function CommentAnalysisPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // In a real app, you would fetch data based on this id.
    const { user, sentiment, originalReview, englishTranslation, metrics, keywords, emotionAnalysis, businessImpact, executiveSummary, keyInsights, businessValueIndicators } = commentData;

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/sentiment-analysis/DOC-2024-001/positive`}>
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Positive Comments</span>
            </Link>
          </Button>
          <div className="text-sm text-muted-foreground">Analysis Date: {new Date().toLocaleDateString()}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <User className="h-5 w-5 text-primary"/>
                            Commenter Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Avatar className="w-24 h-24 mb-4 border-4 border-primary mx-auto">
                            <AvatarFallback className="text-4xl bg-primary/10 text-primary">{user.initials}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <p className="text-base text-muted-foreground">{user.designation}</p>
                        <p className="text-sm text-muted-foreground">{user.company}</p>
                        <Separator className='my-4'/>
                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div className='flex items-center gap-2 text-sm'><Calendar className='h-4 w-4 text-muted-foreground' /> <div><span className='font-semibold'>Member Since:</span> {user.memberSince}</div></div>
                            <div className='flex items-center gap-2 text-sm'><MessageSquare className='h-4 w-4 text-muted-foreground' /> <div><span className='font-semibold'>Total Reviews:</span> {user.totalReviews}</div></div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className='flex items-center gap-2'><Smile className="h-5 w-5 text-primary"/>Sentiment Analysis</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className='text-center'>
                           <p className="text-5xl font-bold text-green-600">{sentiment.positive}%</p>
                           <p className="text-sm font-semibold text-green-700">Overall Positive</p>
                        </div>
                        <div className='flex justify-around text-center'>
                            <div>
                                <p className="text-lg font-bold text-gray-600">{sentiment.neutral}%</p>
                                <p className="text-xs text-gray-500">Neutral</p>
                            </div>
                             <div>
                                <p className="text-lg font-bold text-red-600">{sentiment.negative}%</p>
                                <p className="text-xs text-red-500">Negative</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className='flex items-center gap-2'><Sparkles className="h-5 w-5 text-primary"/>AI-Powered Analysis</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                       {emotionAnalysis.map(emo => (
                           <div key={emo.name}>
                             <div className="flex justify-between text-sm mb-1">
                                <span>{emo.name}</span>
                                <span className="font-semibold">{emo.value}%</span>
                             </div>
                             <Progress value={emo.value} className="h-2" />
                           </div>
                       ))}
                    </CardContent>
                </Card>
            </div>
            
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            Original Comment
                            <Badge variant="secondary">German 🇩🇪</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-base leading-relaxed max-h-48 overflow-y-auto">
                      <p>{originalReview}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            AI-Powered Translation
                             <Badge variant="secondary" className="bg-green-100 text-green-800">✓ English 🇬🇧</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-foreground text-base leading-relaxed max-h-48 overflow-y-auto">
                       <p>{englishTranslation}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className='flex items-center gap-2'><ClipboardList className="h-5 w-5 text-primary"/>AI-Generated Summary & Insights</CardTitle></CardHeader>
                    <CardContent>
                        <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg mb-6">
                            <h4 className="font-semibold text-primary">Executive Summary</h4>
                            <p className="text-sm text-primary/90 mt-1">{executiveSummary}</p>
                        </div>
                         <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg mb-6">
                            <h4 className="font-semibold text-blue-800">Key Professional Insights</h4>
                            <ul className="text-sm text-blue-700 mt-1 list-disc list-inside space-y-1">
                               {keyInsights.map((insight, i) => <li key={i}>{insight}</li>)}
                            </ul>
                        </div>
                        <div className="p-4 bg-teal-50 border-l-4 border-teal-500 rounded-r-lg">
                            <h4 className="font-semibold text-teal-800">Business Value Indicators</h4>
                            <p className="text-sm text-teal-700 mt-1">{businessValueIndicators}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    );
}
