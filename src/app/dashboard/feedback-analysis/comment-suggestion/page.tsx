
'use client';

import { useState, useMemo } from 'react';
import { ChevronsUpDown, Search, SlidersHorizontal, Tag, Calendar, User, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ClientOnly } from '@/components/client-only';

// --- MOCK DATA & FIRESTORE SCHEMA --- //
/*
Firestore Schema Suggestion:

Collection: 'comments'
Document: {commentId}
  - text: "The new compliance rules are too strict..."
  - timestamp: Firestore Timestamp (e.g., 2024-08-15T10:00:00Z)
  - userId: "user123"
  - userName: "John Doe"
  - sentiment: "Negative" | "Positive" | "Neutral"
  - subject: "Compliance Burden" | "Feature Request" | ... (Detected by backend function)
  - status: "new" | "addressed" | "flagged"

Collection: 'subjects'
Document: {subjectName}
  - commentCount: 25
  - lastCommentAt: Firestore Timestamp
  - trendingScore: 0.85

Backend Function (e.g., onCommentCreate):
- Triggered on new doc in 'comments'.
- Uses a text classification model (Vertex AI / OpenAI) to analyze `comment.text`.
- Determines the `subject` and updates the comment document.
- Updates aggregation in the corresponding 'subjects' document.
*/

const mockComments = [
  { id: 'CMT001', userName: 'Ravi Sharma', timestamp: '2024-08-15T10:00:00Z', text: 'The new reporting requirements are too burdensome for traditional businesses. We need more training programs.', sentiment: 'Negative', subject: 'Compliance Burden', status: 'new' },
  { id: 'CMT002', userName: 'Anita Joshi', timestamp: '2024-08-14T14:30:00Z', text: 'The SME tax relief provisions are fantastic! This will significantly reduce our compliance burden.', sentiment: 'Positive', subject: 'Praise & Feedback', status: 'addressed' },
  { id: 'CMT003', userName: 'Suresh Kumar', timestamp: '2024-08-14T11:00:00Z', text: 'The digital-first approach is perfect. Can we get an API for integration?', sentiment: 'Positive', subject: 'Feature Request', status: 'new' },
  { id: 'CMT004', userName: 'Priya Iyer', timestamp: '2024-08-13T09:00:00Z', text: 'The 90-day timeline for fast-track resolution might be too aggressive for complex cases.', sentiment: 'Neutral', subject: 'Process Concerns', status: 'flagged' },
  { id: 'CMT005', userName: 'Vikram Singh', timestamp: '2024-08-12T16:20:00Z', text: 'I found a bug in the new filing portal. The date picker is not working on Firefox.', sentiment: 'Negative', subject: 'Bug Report', status: 'new' },
  { id: 'CMT006', userName: 'Meera Desai', timestamp: '2024-08-11T18:00:00Z', text: 'Great update! The UI is much cleaner now.', sentiment: 'Positive', subject: 'Praise & Feedback', status: 'addressed' },
  { id: 'CMT007', userName: 'Arun Gupta', timestamp: '2024-08-10T12:00:00Z', text: 'The mandatory digital documentation needs better data security provisions. Is it encrypted at rest?', sentiment: 'Negative', subject: 'Security Concerns', status: 'flagged' },
  { id: 'CMT008', userName: 'Sunita Rao', timestamp: '2024-08-09T15:45:00Z', text: 'Could you add a feature to export reports to CSV?', sentiment: 'Neutral', subject: 'Feature Request', status: 'new' },
];

const allSubjects = [...new Set(mockComments.map(c => c.subject))];

// --- COMPONENTS --- //

function CommentCard({ comment }) {
  const sentimentConfig = {
    Positive: { color: 'border-green-500', bg: 'bg-green-500/10', text: 'text-green-700 dark:text-green-400' },
    Negative: { color: 'border-red-500', bg: 'bg-red-500/10', text: 'text-red-700 dark:text-red-400' },
    Neutral: { color: 'border-gray-500', bg: 'bg-gray-500/10', text: 'text-gray-700 dark:text-gray-400' },
  };

  const statusConfig = {
    new: { text: 'New', color: 'bg-blue-500' },
    addressed: { text: 'Addressed', color: 'bg-green-600' },
    flagged: { text: 'Flagged', color: 'bg-yellow-500' },
  };

  return (
    <Card className={`mb-4 ${sentimentConfig[comment.sentiment].bg} border-l-4 ${sentimentConfig[comment.sentiment].color}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-muted">{comment.userName.charAt(0)}</div>
            <div>
              <CardTitle className="text-base">{comment.userName}</CardTitle>
                <ClientOnly>
                    <CardDescription>{new Date(comment.timestamp).toLocaleString()}</CardDescription>
                </ClientOnly>
            </div>
          </div>
           <Badge variant="secondary" className={`${statusConfig[comment.status].color} text-white`}>{statusConfig[comment.status].text}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{comment.text}</p>
        <div className="flex items-center justify-between">
            <Badge className={sentimentConfig[comment.sentiment].text}>{comment.sentiment}</Badge>
            <div className="flex gap-2">
                <Button variant="outline" size="sm">Mark Addressed</Button>
                <Button variant="outline" size="sm">Assign</Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FilterSidebar({ subjects, activeSubjects, setActiveSubjects, sentiments, activeSentiments, setActiveSentiments }) {
  return (
    <Card className="h-fit sticky top-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          <CardTitle>Filters</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <h4 className="font-semibold flex items-center gap-2"><Tag className="h-4 w-4"/> Subjects</h4>
            <ChevronsUpDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-2">
            {subjects.map(subject => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox id={subject} checked={activeSubjects.includes(subject)} onCheckedChange={() => setActiveSubjects(prev => prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject])} />
                <label htmlFor={subject} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{subject}</label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <h4 className="font-semibold flex items-center gap-2"><MessageSquare className="h-4 w-4"/> Sentiment</h4>
            <ChevronsUpDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-2">
            {sentiments.map(sentiment => (
              <div key={sentiment} className="flex items-center space-x-2">
                <Checkbox id={sentiment} checked={activeSentiments.includes(sentiment)} onCheckedChange={() => setActiveSentiments(prev => prev.includes(sentiment) ? prev.filter(s => s !== sentiment) : [...prev, sentiment])} />
                <label htmlFor={sentiment} className="text-sm font-medium leading-none">{sentiment}</label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Add more filters for Date, User etc. here */}
      </CardContent>
    </Card>
  );
}

export default function CommentSuggestionPage() {
  const [activeTab, setActiveTab] = useState(allSubjects[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSubjects, setActiveSubjects] = useState(allSubjects);
  const [activeSentiments, setActiveSentiments] = useState(['Positive', 'Negative', 'Neutral']);

  const filteredComments = useMemo(() => {
    return mockComments
      .filter(c => searchTerm ? c.text.toLowerCase().includes(searchTerm.toLowerCase()) : true)
      .filter(c => activeSubjects.length > 0 ? activeSubjects.includes(c.subject) : true)
      .filter(c => activeSentiments.length > 0 ? activeSentiments.includes(c.sentiment) : true);
  }, [searchTerm, activeSubjects, activeSentiments]);

  const commentsBySubject = (subject) => filteredComments.filter(c => c.subject === subject);

  const clearFilters = () => {
      setActiveSubjects(allSubjects);
      setActiveSentiments(['Positive', 'Negative', 'Neutral']);
      setSearchTerm('');
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
      {/* --- Filter Sidebar (Left Column) --- */}
      <div className="col-span-1">
        <FilterSidebar 
          subjects={allSubjects}
          activeSubjects={activeSubjects}
          setActiveSubjects={setActiveSubjects}
          sentiments={['Positive', 'Negative', 'Neutral']}
          activeSentiments={activeSentiments}
          setActiveSentiments={setActiveSentiments}
        />
      </div>

      {/* --- Main Content (Right Column) --- */}
      <div className="col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Comment Subjects Analysis</CardTitle>
            <CardDescription>AI-categorized comments from user feedback. Use the filters to refine your view.</CardDescription>
             <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search comments..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 flex-wrap mb-4">
                {(activeSubjects.length !== allSubjects.length || activeSentiments.length !== 3 || searchTerm) && (
                    <Badge variant="secondary">Filters Applied</Badge>
                )}
                {activeSubjects.length !== allSubjects.length && activeSubjects.map(s => <Badge key={s} variant="outline">{s} <X onClick={() => setActiveSubjects(p => p.filter(i => i !== s))} className="ml-1 h-3 w-3 cursor-pointer"/></Badge>)}
                {activeSentiments.length !== 3 && activeSentiments.map(s => <Badge key={s} variant="outline">{s} <X onClick={() => setActiveSentiments(p => p.filter(i => i !== s))} className="ml-1 h-3 w-3 cursor-pointer"/></Badge>)}
                {searchTerm && <Badge variant="outline">Keyword: "{searchTerm}" <X onClick={() => setSearchTerm('')} className="ml-1 h-3 w-3 cursor-pointer"/></Badge>}
                {(activeSubjects.length !== allSubjects.length || activeSentiments.length !== 3 || searchTerm) && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>Clear All</Button>
                )}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <ScrollArea className="w-full whitespace-nowrap rounded-md border-b">
                <TabsList className="-mb-px">
                  {allSubjects.map(subject => (
                     <TabsTrigger key={subject} value={subject}>
                        {subject} ({commentsBySubject(subject).length})
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>

              {allSubjects.map(subject => (
                <TabsContent key={subject} value={subject}>
                    <ScrollArea className="h-[600px] mt-4 pr-4">
                        {commentsBySubject(subject).length > 0 ? (
                            commentsBySubject(subject).map(comment => <CommentCard key={comment.id} comment={comment} />)
                        ) : (
                            <div className="text-center text-muted-foreground py-16">
                                <p>No comments match the current filters for this subject.</p>
                            </div>
                        )}
                    </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
