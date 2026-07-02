
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Clock,
  User,
  Search,
  Filter,
  Calendar,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Meh,
  ArrowLeft
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const commentSuggestions = [
  {
    id: 1,
    user: 'Amit Patel',
    timestamp: '2024-09-21T10:30:00Z',
    sentiment: 'Positive',
    subject: 'Digital Documentation',
    comment:
      'Excellent initiative! The digital documentation requirement will significantly reduce paperwork and improve transparency.',
    actions: ['Mark as Addressed', 'Share with Team'],
  },
  {
    id: 2,
    user: 'Rajesh Kumar',
    timestamp: '2024-09-21T11:00:00Z',
    sentiment: 'Neutral',
    subject: 'Board Meeting Procedures',
    comment:
      'The proposed changes for board meetings are reasonable, but clause 3.2 needs clarification on virtual meeting authentication.',
    actions: ['Flag for Follow-up', 'Assign to Legal'],
  },
  {
    id: 3,
    user: 'Suresh Gupta',
    timestamp: '2024-09-22T14:00:00Z',
    sentiment: 'Negative',
    subject: 'Compliance Timelines',
    comment:
      'The proposed timeline is too aggressive for small businesses. We need at least 6 more months to comply.',
    actions: ['Escalate to Committee', 'Request More Info'],
  },
  // Add more comments as needed
];

const subjects = [
  'Digital Documentation',
  'Board Meeting Procedures',
  'Compliance Timelines',
  'Director Appointments',
  'Audit Committee Requirements',
];

const sentimentConfig: { [key: string]: { className: string; icon: JSX.Element } } = {
    Positive: {
      className: 'text-green-600 border-green-200 bg-green-50',
      icon: <ThumbsUp className="h-4 w-4 mr-1.5" />,
    },
    Negative: {
      className: 'text-red-600 border-red-200 bg-red-50',
      icon: <ThumbsDown className="h-4 w-4 mr-1.5" />,
    },
    Neutral: {
      className: 'text-gray-600 border-gray-200 bg-gray-50',
      icon: <Meh className="h-4 w-4 mr-1.5" />,
    },
};


export default function CommentSuggestionDashboard() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredComments = commentSuggestions.filter(
    comment =>
      (activeTab === 'All' || comment.subject === activeTab) &&
      comment.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex gap-8 p-8 bg-slate-50 min-h-screen font-sans" suppressHydrationWarning>
      {/* Filters Sidebar */}
      <aside className="w-1/4 min-w-[280px]">
        <Card className="sticky top-8 border-2 border-slate-200/60 shadow-sm">
          <CardHeader className='border-b-2 border-slate-200/60'>
            <CardTitle className="flex items-center text-xl text-slate-800">
                <Filter className="h-5 w-5 mr-3 text-slate-500"/>
                Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-600 text-base">Filter by Subject</h3>
              <div className="space-y-2.5">
                {subjects.map(subject => (
                  <div key={subject} className="flex items-center">
                    <Checkbox id={subject} className="w-5 h-5 rounded-[4px]" suppressHydrationWarning />
                    <label htmlFor={subject} className="ml-3 text-sm font-medium text-slate-700">
                      {subject}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-600 text-base">Filter by Sentiment</h3>
              <div className="space-y-2.5">
                <div className="flex items-center">
                  <Checkbox id="positive" className="w-5 h-5 rounded-[4px]" suppressHydrationWarning />
                  <label htmlFor="positive" className="ml-3 text-sm font-medium text-slate-700">
                    Positive
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="negative" className="w-5 h-5 rounded-[4px]" suppressHydrationWarning />
                  <label htmlFor="negative" className="ml-3 text-sm font-medium text-slate-700">
                    Negative
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="neutral" className="w-5 h-5 rounded-[4px]" suppressHydrationWarning/>
                  <label htmlFor="neutral" className="ml-3 text-sm font-medium text-slate-700">
                    Neutral
                  </label>
                </div>
              </div>
            </div>
            <Separator />
            <div className='space-y-3'>
                <h3 className="font-semibold text-slate-600 text-base">Filter by Date</h3>
                <div className='relative'>
                    <Input type="text" placeholder="Select Date Range" className="pl-10 h-11" suppressHydrationWarning/>
                    <Calendar className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400'/>
                </div>
            </div>
          </CardContent>
        </Card>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className='flex items-center gap-4 mb-6'>
            <Button variant="outline" size="icon" onClick={() => router.back()} suppressHydrationWarning>
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <Card className="flex-1 border-2 border-slate-200/60 shadow-sm">
                <CardHeader>
                    <CardTitle className='text-2xl text-slate-800'>Comment Suggestions</CardTitle>
                    <CardDescription className='text-base text-slate-600'>Actionable insights from stakeholder feedback.</CardDescription>
                </CardHeader>
            </Card>
        </div>
        
        <div className="flex items-center mb-6">
            <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                    placeholder="Search comments by keyword..."
                    className="pl-12 h-12 text-base rounded-md border-2 border-slate-200/80"
                    onChange={e => setSearchTerm(e.target.value)}
                    suppressHydrationWarning
                />
            </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-200/80 p-1.5 h-auto rounded-lg">
            <TabsTrigger value="All" className='px-4 text-base'>All Subjects</TabsTrigger>
            {subjects.map(subject => (
              <TabsTrigger key={subject} value={subject} className='px-4 text-base'>
                {subject}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="mt-6 space-y-4">
             {filteredComments.map(comment => (
                <Card key={comment.id} className="border shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className='pb-3'>
                    <div className="flex justify-between items-start">
                        <div>
                            <Badge variant="secondary" className='font-semibold'>{comment.subject}</Badge>
                            <p className="text-lg font-semibold text-slate-800 mt-2">{comment.comment}</p>
                        </div>
                        <Badge 
                            className={`flex items-center font-bold text-sm px-3 py-1 rounded-full border ${sentimentConfig[comment.sentiment].className}`}
                        >
                            {sentimentConfig[comment.sentiment].icon}
                            {comment.sentiment}
                        </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span className='font-medium'>{comment.user}</span>
                            </div>
                            <Separator orientation='vertical' className='h-4'/>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {isClient && <span>{new Date(comment.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>}
                            </div>
                        </div>
                        <div className="flex gap-2">
                          {comment.actions.map(action => (
                            <Button key={action} variant="ghost" size="sm" className='text-slate-600 hover:bg-slate-100' suppressHydrationWarning>
                              {action}
                            </Button>
                          ))}
                        </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </Tabs>
      </main>
    </div>
  );
}
