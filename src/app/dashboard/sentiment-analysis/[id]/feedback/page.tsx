'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  FileText,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

export default function DetailedFeedbackReportsPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href={`/dashboard/sentiment-analysis/${id}`} className="hover:underline text-primary">Sentiment Dashboard</Link>
        <span className='font-semibold'>/</span>
        <span className="text-foreground font-semibold">Detailed Feedback Reports</span>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Detailed Feedback Reports</CardTitle>
              <CardDescription>Generate and view in-depth feedback analysis reports.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page is under construction. Please check back later for detailed feedback reports.</p>
        </CardContent>
      </Card>
    </div>
  );
}
