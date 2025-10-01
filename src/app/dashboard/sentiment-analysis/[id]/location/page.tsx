'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  MapPin,
  Smile, 
  Meh, 
  Frown,
  Users,
  Globe,
  BarChart2,
  Filter, 
  Search,
  FileText,
  MessageSquare,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { ResponsiveContainer } from "recharts";

const INDIA_GEO_URL = "/india-states.json";

const locationData = {
    "Maharashtra": { positive: 303, negative: 41, neutral: 61 },
    "Delhi": { positive: 242, negative: 34, neutral: 62 },
    "Karnataka": { positive: 203, negative: 27, neutral: 41 },
    "Tamil Nadu": { positive: 152, negative: 20, neutral: 30 },
    "Uttar Pradesh": { positive: 72, negative: 42, neutral: 20 },
};

const detailedFeedback = {
  executiveSummary: 'This is an exceptionally detailed and professional review from a senior industry expert with 15+ years of experience. The review demonstrates deep technical knowledge and provides a comprehensive evaluation across product quality, service excellence, and business value proposition.',
  keyInsights: [
      'Technical Expertise: Review demonstrates deep understanding of engineering and product development',
      'Business Impact: Explicit mention of procurement team recommendation and future project consideration',
      'Industry Credibility: 15+ years experience adds significant weight to the testimonial',
      'Comprehensive Evaluation: Covers product, service, logistics, and business value',
  ],
  fullComment: "As a Senior Product Manager with over 15 years of experience in the technology industry, I can confidently say that this product and associated service are exceptional. The quality of materials and workmanship significantly exceed my high expectations, which I have due to my professional expertise in product development. The engineering team has obviouslyplaced great value on details - every aspect of the product shows thoughtful design decisions and high-quality implementation. The customer service was remarkably professional and technically proficient. As someone who works daily with complex technical specifications, I was impressed by the competence of the support team. They were able to answer all my detailed questions and even provided additional technical documentation that was helpful for my professional evaluation. The delivery logistics were impeccable - punctual, securely packaged, and with complete tracking. The unboxing experience was thoughtfully designed, showing attention to the entire customer journey. From a business perspective, the price-performance ratio is excellent. I have already passed on a recommendation to our procurement team and will definitely consider this company for future projects. The combination of technical excellence, professional service, and reliable execution makes this a first-class business experience. Five stars and a clear recommendation for other professionals in the industry."
};

const getSentimentFill = (stateName: string) => {
    const data = locationData[stateName as keyof typeof locationData];
    if (!data) return "url(#default)";

    const { positive, negative, neutral } = data;

    if (positive >= negative && positive >= neutral) {
        return "url(#positiveGrid)";
    }
    if (negative >= positive && negative >= neutral) {
        return "url(#negativeGrid)";
    }
    return "url(#neutralGrid)";
};

export default function LocationSentimentPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="space-y-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/dashboard/sentiment-analysis/${id}`} className="hover:underline text-primary">Sentiment Dashboard</Link>
          <span className='font-semibold'>/</span>
          <span className="text-foreground font-semibold">Location-wise Sentiment Analysis</span>
        </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <MapPin className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Location-wise Sentiment Analysis with India Map</CardTitle>
              <CardDescription>
                Interactive map displaying sentiment intensity. Regions are color-coded: 🟢 Positive, 🟡 Neutral, 🔴 Negative.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card className='h-full'>
                <CardHeader>
                    <CardTitle>Sentiment Map of India</CardTitle>
                    <CardDescription>Hover over a state for detailed sentiment breakdown.</CardDescription>
                </CardHeader>
                <CardContent style={{ height: '500px', width: '100%' }}>
                    <ResponsiveContainer>
                        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 800, center: [82, 22] }}>
                            <defs>
                                <pattern id="positiveGrid" patternUnits="userSpaceOnUse" width="4" height="4">
                                    <rect width="4" height="4" fill="#22c55e" fillOpacity="0.6" />
                                    <rect width="2" height="2" fill="#16a34a" fillOpacity="0.8"/>
                                </pattern>
                                <pattern id="negativeGrid" patternUnits="userSpaceOnUse" width="4" height="4">
                                    <rect width="4" height="4" fill="#ef4444" fillOpacity="0.6"/>
                                    <rect width="2" height="2" fill="#dc2626" fillOpacity="0.8"/>
                                </pattern>
                                <pattern id="neutralGrid" patternUnits="userSpaceOnUse" width="4" height="4">
                                    <rect width="4" height="4" fill="#f59e0b" fillOpacity="0.6"/>
                                    <rect width="2" height="2" fill="#d97706" fillOpacity="0.8"/>
                                </pattern>
                                <pattern id="default" patternUnits="userSpaceOnUse" width="4" height="4">
                                    <rect width="4" height="4" fill="#E5E7EB" />
                                </pattern>
                            </defs>
                            <Geographies geography={INDIA_GEO_URL}>
                                {({ geographies }) =>
                                    geographies.map(geo => (
                                        <Geography 
                                            key={geo.rsmKey} 
                                            geography={geo} 
                                            fill={getSentimentFill(geo.properties.st_nm)} 
                                            stroke="#FFF" 
                                            style={{
                                                default: { outline: 'none' },
                                                hover: { fill: "#2563EB", outline: 'none' },
                                                pressed: { outline: 'none' },
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>
                        </ComposableMap>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Top Positive State</CardTitle></CardHeader>
            <CardContent><p className="text-xl font-bold text-green-600">Maharashtra</p><p>303 Positive Comments</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Top Negative State</CardTitle></CardHeader>
            <CardContent><p className="text-xl font-bold text-red-600">Uttar Pradesh</p><p>42 Negative Comments</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Top Neutral State</CardTitle></CardHeader>
            <CardContent><p className="text-xl font-bold text-yellow-600">Delhi</p><p>62 Neutral Comments</p></CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sentiment Breakdown by State</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-2">State</th>
                <th className="p-2">Positive</th>
                <th className="p-2">Negative</th>
                <th className="p-2">Neutral</th>
                <th className="p-2">Total Comments</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(locationData).map(([state, data]) => (
                <tr key={state} className="border-b">
                  <td className="p-2 font-semibold">{state}</td>
                  <td className="p-2 text-green-600">{data.positive}</td>
                  <td className="p-2 text-red-600">{data.negative}</td>
                  <td className="p-2 text-yellow-600">{data.neutral}</td>
                  <td className="p-2">{data.positive + data.negative + data.neutral}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight">Feedback Analysis</CardTitle>
            <CardDescription>Explore AI-powered insights derived from public comments and feedback.</CardDescription>
        </CardHeader>
        <div className="grid gap-6 md:grid-cols-2">
          <Link href={`/dashboard/sentiment-analysis/${id}`}>
            <Card>
              <CardContent className="p-4 flex items-start gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <BarChart2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Sentiment Analysis</h3>
                  <p className="text-sm text-muted-foreground">View public opinion trends and sentiment distribution.</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href={`/dashboard/sentiment-analysis/${id}/feedback`}>
            <Card>
              <CardContent className="p-4 flex items-start gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Word Cloud Analysis</h3>
                  <p className="text-sm text-muted-foreground">Visualize the most frequent keywords in the feedback.</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                    <h2 className="text-xl font-bold">Detailed Feedback Report</h2>
                    <p className="text-muted-foreground">In-depth analysis of a professional review.</p>
                </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <h3 className="font-semibold text-md">Executive Summary</h3>
                <p className="text-muted-foreground text-sm">{detailedFeedback.executiveSummary}</p>
            </div>
    
            <div className="space-y-2">
                <h3 className="font-semibold text-md">Key Insights</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    {detailedFeedback.keyInsights.map((insight, i) => <li key={i}>{insight}</li>)}
                </ul>
            </div>
    
            <div className="space-y-2">
                <h3 className="font-semibold text-md">Full Comment</h3>
                <p className="text-muted-foreground text-sm leading-relaxed p-4 bg-gray-50 dark:bg-gray-900/40 rounded-md border">{detailedFeedback.fullComment}</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
