
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Search, TrendingUp, Tags, FileText, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const EnhancedWordCloud = dynamic(
  () => import('@/components/charts').then(mod => mod.EnhancedWordCloud),
  {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full w-full min-h-[400px]"><p>Loading Word Cloud...</p></div>,
  }
);

// Greatly expanded mock data
const wordData = [
  // Existing words from previous steps
  { text: 'compliance', value: 95, sentiment: 'Negative', rank: 1, trend: [10, 20, 35, 50, 95], comments: [{ text: "The new compliance rules are too strict.", sentiment: "Negative", company: "TechCorp" }] },
  { text: 'transparency', value: 82, sentiment: 'Positive', rank: 2, trend: [5, 15, 25, 60, 82], comments: [{ text: "We appreciate the move towards greater transparency.", sentiment: "Positive", company: "Global Solutions" }] },
  { text: 'governance', value: 78, sentiment: 'Positive', rank: 3, trend: [12, 22, 38, 55, 78], comments: [{ text: "Good governance is key to building trust.", sentiment: "Positive", company: "United Enterprises" }] },
  { text: 'regulatory', value: 65, sentiment: 'Negative', rank: 4, trend: [15, 25, 40, 50, 65], comments: [{ text: "The regulatory framework is becoming too complex.", sentiment: "Negative", company: "Future Systems" }] },
  { text: 'burden', value: 60, sentiment: 'Negative', rank: 5, trend: [10, 20, 30, 45, 60], comments: [{ text: "This will place a significant burden on our resources.", sentiment: "Negative", company: "Innovate Inc." }] },
  { text: 'security', value: 90, sentiment: 'Positive', rank: 10, trend: [15, 25, 40, 60, 90], comments: [{ text: "New security measures will protect our data.", sentiment: "Positive", company: "Secure Solutions" }] },
  { text: 'risk', value: 85, sentiment: 'Negative', rank: 8, trend: [20, 30, 45, 60, 85], comments: [{ text: "The potential risks are too high.", sentiment: "Negative", company: "Risk Averse Inc." }] },
  { text: 'policy', value: 50, sentiment: 'Neutral', rank: 9, trend: [5, 10, 20, 30, 50], comments: [{ text: "The new company policy will be implemented next month.", sentiment: "Neutral", company: "Policy Makers Ltd." }] },
  { text: 'collaboration', value: 85, sentiment: 'Positive', rank: 18, trend: [20, 30, 50, 70, 85], comments: [{ text: "Collaboration has improved.", sentiment: "Positive", company: "Synergy Corp" }] },
  { text: 'stakeholder', value: 77, sentiment: 'Neutral', rank: 19, trend: [15, 25, 40, 60, 77], comments: [{ text: "We need to consider all stakeholder feedback.", sentiment: "Neutral", company: "BoardRoom Inc." }] },
  { text: 'impact', value: 92, sentiment: 'Neutral', rank: 20, trend: [30, 40, 55, 75, 92], comments: [{ text: "The impact of this decision is not yet clear.", sentiment: "Neutral", company: "Analysis Ltd." }] },
  { text: 'delay', value: 68, sentiment: 'Negative', rank: 21, trend: [10, 20, 30, 50, 68], comments: [{ text: "The project has been hit with another delay.", sentiment: "Negative", company: "SlowMovers" }] },
  { text: 'proposal', value: 58, sentiment: 'Neutral', rank: 22, trend: [5, 15, 25, 40, 58], comments: [{ text: "The new proposal is under review.", sentiment: "Neutral", company: "Planning Dept." }] },
  { text: 'cost', value: 98, sentiment: 'Negative', rank: 23, trend: [40, 50, 65, 80, 98], comments: [{ text: "The rising cost is a major concern.", sentiment: "Negative", company: "Finance Corp" }] },
  { text: 'framework', value: 73, sentiment: 'Neutral', rank: 24, trend: [10, 25, 45, 60, 73], comments: [{ text: "We need a new framework for this process.", sentiment: "Neutral", company: "Structurize" }] },
  { text: 'shareholder', value: 65, sentiment: 'Neutral', rank: 26, trend: [12, 22, 32, 45, 65], comments: [{ text: "Shareholder value is our top priority.", sentiment: "Neutral", company: "Investment Group" }] },
  { text: 'identity', value: 100, sentiment: 'Positive', rank: 28, trend: [30, 45, 60, 80, 100], comments: [{ text: "Our brand identity is stronger than ever.", sentiment: "Positive", company: "Brand Co" }] },
  { text: 'product', value: 96, sentiment: 'Positive', rank: 29, trend: [40, 50, 70, 85, 96], comments: [{ text: "The new product launch was a huge success.", sentiment: "Positive", company: "Productive Inc." }] },
  { text: 'advertising', value: 88, sentiment: 'Positive', rank: 30, trend: [25, 40, 60, 75, 88], comments: [{ text: "The advertising campaign reached a wide audience.", sentiment: "Positive", company: "Ad Wizards" }] },
  { text: 'brand', value: 93, sentiment: 'Positive', rank: 31, trend: [35, 55, 70, 80, 93], comments: [{ text: "Our brand is recognized for its quality.", sentiment: "Positive", company: "Quality Brands" }] },
  { text: 'marketing', value: 85, sentiment: 'Positive', rank: 32, trend: [20, 35, 50, 70, 85], comments: [{ text: "Our marketing strategy is paying off.", sentiment: "Positive", company: "Market Movers" }] },
  { text: 'creativeness', value: 75, sentiment: 'Positive', rank: 33, trend: [15, 25, 40, 60, 75], comments: [{ text: "We encourage creativeness in all our projects.", sentiment: "Positive", company: "Creative Minds" }] },
  { text: 'design', value: 89, sentiment: 'Positive', rank: 34, trend: [30, 45, 65, 80, 89], comments: [{ text: "The new design is both beautiful and functional.", sentiment: "Positive", company: "DesignWorks" }] },
  { text: 'business', value: 97, sentiment: 'Neutral', rank: 35, trend: [40, 60, 75, 85, 97], comments: [{ text: "Business operations are running smoothly.", sentiment: "Neutral", company: "Biz Corp" }] },
  { text: 'advice', value: 68, sentiment: 'Positive', rank: 36, trend: [10, 20, 35, 50, 68], comments: [{ text: "The advice from the experts was invaluable.", sentiment: "Positive", company: "Wise Guides" }] },
  { text: 'management', value: 81, sentiment: 'Neutral', rank: 37, trend: [22, 38, 55, 70, 81], comments: [{ text: "Management has set clear goals.", sentiment: "Neutral", company: "LeadWell" }] },
  { text: 'presentation', value: 72, sentiment: 'Positive', rank: 38, trend: [12, 28, 45, 60, 72], comments: [{ text: "The presentation was very well-received.", sentiment: "Positive", company: "Podium Masters" }] },
  { text: 'concept', value: 79, sentiment: 'Positive', rank: 39, trend: [18, 32, 50, 68, 79], comments: [{ text: "The new concept is innovative and exciting.", sentiment: "Positive", company: "Idea Hub" }] },
  { text: 'client', value: 94, sentiment: 'Positive', rank: 40, trend: [38, 58, 72, 85, 94], comments: [{ text: "Our clients are very satisfied with our service.", sentiment: "Positive", company: "ClientFirst" }] },
  { text: 'positioning', value: 70, sentiment: 'Positive', rank: 41, trend: [15, 30, 48, 62, 70], comments: [{ text: "Our market positioning has strengthened.", sentiment: "Positive", company: "Market Leaders" }] },
  { text: 'trademark', value: 65, sentiment: 'Neutral', rank: 42, trend: [10, 22, 38, 50, 65], comments: [{ text: "The new trademark has been officially registered.", sentiment: "Neutral", company: "Legal Eagles" }] },
  { text: 'strategy', value: 87, sentiment: 'Positive', rank: 43, trend: [28, 42, 60, 75, 87], comments: [{ text: "The new strategy will drive growth.", sentiment: "Positive", company: "Visionary Inc." }] },
  { text: 'value', value: 91, sentiment: 'Positive', rank: 44, trend: [32, 50, 68, 82, 91], comments: [{ text: "We deliver great value to our customers.", sentiment: "Positive", company: "ValuePlus" }] },
  { text: 'innovation', value: 88, sentiment: 'Positive', rank: 45, trend: [25, 40, 60, 75, 88], comments: [{ text: "Innovation is at the heart of what we do.", sentiment: "Positive", company: "InnovateForward" }] },
  { text: 'integration', value: 76, sentiment: 'Positive', rank: 46, trend: [15, 30, 50, 65, 76], comments: [{ text: "The integration of the new systems was seamless.", sentiment: "Positive", company: "ConnectAll" }] },
  { text: 'service', value: 99, sentiment: 'Positive', rank: 47, trend: [45, 60, 75, 90, 99], comments: [{ text: "Customer service was exceptional.", sentiment: "Positive", company: "ServiceFirst" }] },
  { text: 'quality', value: 95, sentiment: 'Positive', rank: 48, trend: [40, 55, 70, 85, 95], comments: [{ text: "The quality of the product exceeded expectations.", sentiment: "Positive", company: "TopNotch" }] },
  { text: 'team', value: 83, sentiment: 'Positive', rank: 49, trend: [20, 35, 55, 70, 83], comments: [{ text: "The team worked together effectively.", sentiment: "Positive", company: "TeamPlayers" }] },
  { text: 'project', value: 92, sentiment: 'Neutral', rank: 50, trend: [30, 45, 65, 80, 92], comments: [{ text: "The project is on track to meet its deadline.", sentiment: "Neutral", company: "ProjectManagers" }] },
  { text: 'deadline', value: 71, sentiment: 'Negative', rank: 51, trend: [10, 25, 40, 55, 71], comments: [{ text: "We are concerned about the upcoming deadline.", sentiment: "Negative", company: "TimeCrunch" }] },
  { text: 'budget', value: 80, sentiment: 'Negative', rank: 52, trend: [20, 30, 50, 65, 80], comments: [{ text: "The project is over budget.", sentiment: "Negative", company: "MoneyWatchers" }] },
  { text: 'customer', value: 98, sentiment: 'Positive', rank: 53, trend: [50, 65, 80, 90, 98], comments: [{ text: "Our customers are our top priority.", sentiment: "Positive", company: "CustomerCentric" }] },
  { text: 'satisfaction', value: 86, sentiment: 'Positive', rank: 54, trend: [25, 40, 60, 75, 86], comments: [{ text: "Customer satisfaction is at an all-time high.", sentiment: "Positive", company: "HappyClients" }] },
  { text: 'feedback', value: 79, sentiment: 'Positive', rank: 55, trend: [18, 32, 50, 68, 79], comments: [{ text: "We value the feedback we receive.", sentiment: "Positive", company: "ListenUp" }] },
  { text: 'support', value: 90, sentiment: 'Positive', rank: 56, trend: [30, 45, 60, 75, 90], comments: [{ text: "The support team was very helpful.", sentiment: "Positive", company: "SupportStars" }] },
  { text: 'performance', value: 87, sentiment: 'Positive', rank: 57, trend: [28, 42, 60, 75, 87], comments: [{ text: "The performance of the new system is excellent.", sentiment: "Positive", company: "PeakPerformance" }] },
  { text: 'efficiency', value: 84, sentiment: 'Positive', rank: 58, trend: [22, 38, 55, 70, 84], comments: [{ text: "We have seen a significant increase in efficiency.", sentiment: "Positive", company: "Streamliners" }] },
  { text: 'growth', value: 93, sentiment: 'Positive', rank: 59, trend: [35, 50, 68, 82, 93], comments: [{ text: "The company is experiencing rapid growth.", sentiment: "Positive", company: "GrowthGurus" }] },
  { text: 'opportunity', value: 78, sentiment: 'Positive', rank: 60, trend: [15, 30, 48, 62, 78], comments: [{ text: "This is a great opportunity for us.", sentiment: "Positive", company: "OpportunityKnocks" }] },
  { text: 'challenge', value: 69, sentiment: 'Negative', rank: 61, trend: [12, 25, 40, 55, 69], comments: [{ text: "We are facing a significant challenge.", sentiment: "Negative", company: "Challengers" }] },
  { text: 'solution', value: 81, sentiment: 'Positive', rank: 62, trend: [20, 35, 52, 68, 81], comments: [{ text: "We have found a solution to the problem.", sentiment: "Positive", company: "SolutionFinders" }] },
  { text: 'communication', value: 77, sentiment: 'Positive', rank: 63, trend: [18, 30, 45, 60, 77], comments: [{ text: "Clear communication is essential for success.", sentiment: "Positive", company: "TalkRight" }] },
  { text: 'success', value: 96, sentiment: 'Positive', rank: 64, trend: [40, 55, 72, 85, 96], comments: [{ text: "We celebrate our success as a team.", sentiment: "Positive", company: "WinnersCircle" }] },
  { text: 'planning', value: 45, sentiment: 'Neutral', rank: 65, trend: [5, 10, 15, 25, 45], comments: [{ text: "Better planning is needed for the next quarter.", sentiment: "Neutral", company: "Strategy Co" }] },
  { text: 'execution', value: 55, sentiment: 'Positive', rank: 66, trend: [10, 20, 30, 40, 55], comments: [{ text: "The execution of the plan was flawless.", sentiment: "Positive", company: "ExecuPro" }] },
  { text: 'alignment', value: 35, sentiment: 'Positive', rank: 67, trend: [5, 10, 15, 25, 35], comments: [{ text: "There is strong alignment between the teams.", sentiment: "Positive", company: "AlignCorp" }] },
  { text: 'resources', value: 25, sentiment: 'Negative', rank: 68, trend: [5, 10, 15, 20, 25], comments: [{ text: "We need more resources to complete the project.", sentiment: "Negative", company: "ResourceFinders" }] },
  { text: 'timeline', value: 15, sentiment: 'Negative', rank: 69, trend: [2, 5, 8, 12, 15], comments: [{ text: "The timeline is too aggressive.", sentiment: "Negative", company: "TimeKeepers" }] },
];

const TrendChart = ({ data, sentiment }) => {
  const trendData = data.map((value: any, index: number) => ({ name: `T${index + 1}`, value }));
  const strokeColor = sentiment === 'Positive' ? '#22c55e' : sentiment === 'Negative' ? '#ef4444' : '#60a5fa';

  return (
    <ResponsiveContainer width="100%" height={120}>
      <RechartsLineChart data={trendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
        <YAxis axisLine={false} tickLine={false} fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(5px)',
            border: '1px solid #e2e8f0',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }}
        />
        <Line type="monotone" dataKey="value" stroke={strokeColor} strokeWidth={2.5} dot={{ r: 4 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default function WordCloudPage() {
  const [selectedWord, setSelectedWord] = useState(wordData.find(word => word.text === 'risk') || wordData[0]);

  const handleWordClick = (word) => {
    const wordDetails = wordData.find(w => w.text === word.text);
    if (wordDetails) {
      setSelectedWord(wordDetails);
    }
  };

  const getSentimentProps = (sentiment) => {
    switch (sentiment) {
      case 'Positive':
        return { variant: 'default', className: 'bg-green-100 text-green-800 border-green-200' };
      case 'Negative':
        return { variant: 'destructive', className: 'bg-red-100 text-red-800 border-red-200' };
      default:
        return { variant: 'secondary', className: 'bg-blue-100 text-blue-800 border-blue-200' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      <div className="space-y-8">
        <Card className="bg-white/60 backdrop-blur-lg border-gray-200/60 shadow-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold text-gray-900">Interactive Word Cloud</CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  AI-powered analysis of keywords, with interactive filtering and detailed insights.
                </CardDescription>
              </div>
              <Button variant="outline" className="mt-4 sm:mt-0">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Select><SelectTrigger><SelectValue placeholder="Filter by Date Range" /></SelectTrigger></Select>
              <Select><SelectTrigger><SelectValue placeholder="Filter by Sentiment" /></SelectTrigger></Select>
              <Select><SelectTrigger><SelectValue placeholder="Filter by Category" /></SelectTrigger></Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-white/60 backdrop-blur-lg border-gray-200/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Word Cloud Visualization</CardTitle>
              <CardDescription className="text-sm text-gray-500">Click a word to see its detailed analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <EnhancedWordCloud words={wordData} onWordClick={handleWordClick} />
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-lg border-gray-200/60 shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Search className="h-6 w-6 text-gray-500" />
                <CardTitle className="text-xl font-semibold text-gray-800">Word Details: "{selectedWord.text}"</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">

              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                   <FileText className="h-5 w-5 text-gray-500" />
                   <h4 className="font-semibold text-gray-800">Metrics</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Appears <span className="font-bold text-primary">{selectedWord.value}</span> times (Rank <span className="font-bold text-primary">#{selectedWord.rank}</span>)</p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                   <Tags className="h-5 w-5 text-gray-500" />
                   <h4 className="font-semibold text-gray-800">Sentiment</h4>
                </CardHeader>
                <CardContent>
                   <Badge {...getSentimentProps(selectedWord.sentiment)}>
                     {selectedWord.sentiment}
                   </Badge>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                   <TrendingUp className="h-5 w-5 text-gray-500" />
                   <h4 className="font-semibold text-gray-800">Usage Trend</h4>
                </CardHeader>
                <CardContent>
                  <TrendChart data={selectedWord.trend} sentiment={selectedWord.sentiment} />
                </CardContent>
              </Card>

              <Card className="bg-white">
                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                   <MessageSquare className="h-5 w-5 text-gray-500" />
                   <h4 className="font-semibold text-gray-800">Example Comment</h4>
                </CardHeader>
                <CardContent>
                  {selectedWord.comments.map((comment, index) => (
                    <div key={index} className="border-l-4 pl-4 py-2 border-gray-200">
                      <p className="italic text-gray-700">"{comment.text}"</p>
                      <p className="text-sm mt-2 text-gray-500">- {comment.company}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
