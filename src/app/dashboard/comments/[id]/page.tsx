
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  ArrowLeft,
  FileText,
  Calendar,
  MessageSquare,
  Smile,
  Cloud,
  Download,
  Info,
  BarChart3,
  FileSignature
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const commentsData = {
  'DOC-2024-001': {
    id: 'DOC-2024-001',
    title: 'Draft Companies (Amendment) Rules, 2024',
    uploaded: 'January 15, 2024',
    pdfSize: '2.4 MB',
    commentCount: 1350,
    dueDate: 'February 15, 2024',
    description:
      'This comprehensive draft proposal outlines significant amendments to the Companies Rules, 2024, focusing on modernizing board meeting procedures, streamlining director appointment processes, and enhancing overall corporate governance standards for companies operating in India.',
    keyAmendments: [
      {
        title: 'Board Meeting Procedures',
        description:
          'Introduction of hybrid meeting formats allowing both physical and virtual participation, with enhanced security protocols for digital attendance verification.',
      },
      {
        title: 'Director Appointments',
        description:
          'Simplified nomination processes for independent directors, including revised qualification criteria and streamlined background verification procedures.',
      },
      {
        title: 'Compliance Timelines',
        description:
          'Extended deadlines for smaller companies to file board resolutions, recognizing resource constraints while maintaining governance standards.',
      },
      {
        title: 'Digital Documentation',
        description:
          'Mandatory electronic filing of board minutes and resolutions through the MCA portal, reducing paperwork and improving transparency.',
      },
      {
        title: 'Audit Committee Requirements',
        description:
          'Enhanced responsibilities for audit committees in reviewing internal controls and risk management frameworks.',
      },
    ],
    publicConsultation:
      'Stakeholders are invited to submit their comments, suggestions, and feedback on these proposed amendments. All submissions will be carefully reviewed and considered before finalizing the rules. The consultation period remains open until February 15, 2024.',
    publicComments: [
      {
        name: 'Rajesh Kumar',
        id: 'CMT001',
        email: 'r.kumar@example.com',
        date: '1/16/2024',
        sentiment: 'Positive',
        comment:
          'The proposed changes to board meeting requirements seem reasonable and well-thought-out. However, clause 3.2 needs clarification regarding virtual meetings, especially concerning the authentication process for directors joining remotely. I suggest adding specific guidelines for technical requirements and backup procedures.',
        initial: 'R',
      },
      {
        name: 'Priya Sharma',
        id: 'CMT002',
        email: 'p.sharma@example.com',
        date: '1/17/2024',
        sentiment: 'Neutral',
        comment:
          'I strongly suggest extending the compliance timeline for smaller companies as they may need more time to adapt to these new requirements. The current 30-day period seems insufficient for proper implementation, especially for companies with limited resources.',
        initial: 'P',
      },
      {
        name: 'Amit Patel',
        id: 'CMT003',
        email: 'a.patel@example.com',
        date: '1/18/2024',
        sentiment: 'Positive',
        comment:
          "Excellent initiative! The digital documentation requirement will significantly reduce paperwork and improve transparency. This aligns perfectly with the government\'s digital India vision. I recommend including provisions for data security and backup requirements.",
        initial: 'A',
      },
      {
        name: 'Suresh Gupta',
        id: 'CMT004',
        email: 's.gupta@example.com',
        date: '1/19/2024',
        sentiment: 'Negative',
        comment: "The proposed timeline is too aggressive for small businesses. We need at least 6 more months to comply with these regulations. Rushing this will lead to errors and penalties for many companies that lack the resources for such a quick transition.",
        initial: 'S',
      },
      {
        name: 'Sunita Williams',
        id: 'CMT005',
        email: 's.williams@example.com',
        date: '1/20/2024',
        sentiment: 'Positive',
        comment: 'The move towards digital documentation is a significant step forward. It will enhance transparency and efficiency. I hope to see robust security measures in place to protect the digital records.',
        initial: 'S',
      },
      {
        name: 'Vikram Singh',
        id: 'CMT006',
        email: 'v.singh@example.com',
        date: '1/21/2024',
        sentiment: 'Neutral',
        comment: 'The extension of compliance timelines for smaller companies is a welcome move. However, the definition of a "smaller company" should be clarified to avoid ambiguity.',
        initial: 'V',
      },
      {
        name: 'Anjali Mehta',
        id: 'CMT007',
        email: 'a.mehta@example.com',
        date: '1/22/2024',
        sentiment: 'Negative',
        comment: 'The proposed amendments do not sufficiently address the liabilities of independent directors. More clarity is needed to protect them from frivolous litigation.',
        initial: 'A',
      },
      {
        name: 'Rohan Sharma',
        id: 'CMT008',
        email: 'r.sharma@example.com',
        date: '1/23/2024',
        sentiment: 'Positive',
        comment: 'I commend the effort to modernize the Companies Rules. The introduction of hybrid meetings will provide much-needed flexibility to companies and their boards.',
        initial: 'R',
      },
       ...Array.from({ length: 50 }, (_, i) => ({
        name: `User ${i + 9}`,
        id: `CMT${(i + 9).toString().padStart(3, '0')}`,
        email: `user.${i + 9}@example.com`,
        date: `1/${Math.floor(Math.random() * 10) + 20}/2024`,
        sentiment: ['Positive', 'Negative', 'Neutral'][Math.floor(Math.random() * 3)],
        comment: 'This is a dummy comment generated to populate the UI and demonstrate pagination. The proposed changes have wide-ranging implications that require careful consideration from all stakeholders.',
        initial: 'U',
      })),
    ],
  },
  'DOC-2024-002': {
    id: 'DOC-2024-002',
    title: 'Taxation Laws (Second Amendment) Bill, 2024',
    uploaded: 'July 15, 2024',
    pdfSize: '1.8 MB',
    commentCount: 1150,
    dueDate: 'August 15, 2024',
    description: 'Introduction of new sections to address tax evasion and promote digital transactions.',
    keyAmendments: [
      {
        title: 'Digital Transaction Incentives',
        description: 'Introduction of tax benefits for businesses adopting digital payment methods and reducing cash transactions.'
      },
      {
        title: 'Enhanced Reporting Requirements',
        description: 'Mandatory disclosure of high-value transactions and cross-border payments to combat tax evasion.'
      },
      {
        title: 'SME Tax Relief',
        description: 'Simplified tax filing procedures for small and medium enterprises with annual turnover below ₹50 crores.'
      }
    ],
    publicConsultation: 'The consultation period is closed.',
    publicComments: [
      {
        name: 'Dr. Meera Singh',
        id: 'CMT005',
        email: 'meera.singh@taxconsultants.com',
        date: '7/16/2024',
        sentiment: 'Positive',
        comment: 'The digital transaction incentives are a game-changer for modern businesses. This will significantly reduce the cash economy and improve tax compliance. I particularly appreciate the simplified filing for SMEs.',
        initial: 'M',
      },
      {
        name: 'Vikram Agarwal',
        id: 'CMT006',
        email: 'vikram@agarwalgroup.com',
        date: '7/17/2024',
        sentiment: 'Neutral',
        comment: 'While the intent is good, the implementation timeline seems rushed. Small businesses will need more time to adapt to digital systems. The penalties for non-compliance are quite steep.',
        initial: 'V',
      },
      {
        name: 'Anita Desai',
        id: 'CMT009',
        email: 'a.desai@example.com',
        date: '7/18/2024',
        sentiment: 'Positive',
        comment: 'The tax relief for SMEs is a great initiative that will foster growth in the small business sector. This will definitely help the economy.',
        initial: 'A',
      },
      {
        name: 'Rajiv Kumar',
        id: 'CMT010',
        email: 'r.kumar@example.com',
        date: '7/19/2024',
        sentiment: 'Negative',
        comment: 'The enhanced reporting requirements will increase the compliance burden on businesses. The government should provide more support and training for a smooth transition.',
        initial: 'R',
      }
    ]
  },
  'DOC-2024-003': {
    id: 'DOC-2024-003',
    title: 'Insolvency and Bankruptcy Code (Amendment) Bill, 2024',
    uploaded: 'August 10, 2024',
    pdfSize: '3.1 MB',
    commentCount: 1550,
    dueDate: 'October 15, 2024',
    description: 'Strengthening the insolvency resolution process for corporate debtors.',
    keyAmendments: [
      {
        title: 'Fast-Track Resolution',
        description: 'Introduction of 90-day resolution timeline for small and medium enterprises with simplified procedures.'
      },
      {
        title: 'Creditor Protection',
        description: 'Enhanced protection for operational creditors and improved voting mechanisms in committee of creditors.'
      },
      {
        title: 'Cross-Border Insolvency',
        description: 'New provisions for handling cross-border insolvency cases and international cooperation frameworks.'
      }
    ],
    publicConsultation: 'Stakeholders are invited to submit their comments.',
    publicComments: [
      {
        name: 'Adv. Rajesh Khanna',
        id: 'CMT026',
        email: 'rajesh.khanna@legal.com',
        date: '8/11/2024',
        sentiment: 'Positive',
        comment: 'The fast-track resolution for SMEs is a much-needed reform. The current 180-day timeline is too long for small businesses. This will help preserve value and jobs.',
        initial: 'R',
      },
      {
        name: 'Sunil Gavaskar',
        id: 'CMT027',
        email: 's.gavaskar@example.com',
        date: '8/12/2024',
        sentiment: 'Positive',
        comment: 'The cross-border insolvency provisions are a landmark change. This will improve Indias standing in the global business community.',
        initial: 'S',
      },
      {
        name: 'Meena Kumari',
        id: 'CMT028',
        email: 'm.kumari@example.com',
        date: '8/13/2024',
        sentiment: 'Neutral',
        comment: 'The fast-track resolution is a good idea, but the infrastructure to support it needs to be strengthened. We need more trained insolvency professionals.',
        initial: 'M',
      }
    ]
  },
   'DOC-2024-004': {
    id: 'DOC-2024-004',
    title: 'Limited Liability Partnership (Amendment) Rules, 2024',
    uploaded: 'August 20, 2024',
    pdfSize: '1.2 MB',
    commentCount: 950,
    dueDate: 'October 05, 2024',
    description: 'Simplifying the reporting and compliance framework for LLPs.',
    keyAmendments: [
      {
        title: 'Simplified Annual Returns',
        description: 'Introduction of consolidated annual return filing reducing multiple forms to a single comprehensive return.'
      },
      {
        title: 'Digital Compliance',
        description: 'Mandatory digital filing of all LLP documents with enhanced security features and reduced processing time.'
      },
      {
        title: 'Partner Liability Framework',
        description: 'Clear guidelines on partner liability and protection mechanisms for genuine business decisions.'
      }
    ],
    publicConsultation: 'Stakeholders are invited to submit their comments.',
    publicComments: [
      {
        name: 'CA Rajesh Agarwal',
        id: 'CMT041',
        email: 'rajesh@agarwalca.com',
        date: '8/21/2024',
        sentiment: 'Positive',
        comment: 'The simplified annual return filing is a great relief for LLP partners. The current multiple form system was confusing and time-consuming. This will significantly reduce compliance burden.',
        initial: 'R',
      },
      {
        name: 'Kiran Bedi',
        id: 'CMT042',
        email: 'k.bedi@example.com',
        date: '8/22/2024',
        sentiment: 'Positive',
        comment: 'Simplifying annual returns is a welcome change. This will reduce a lot of paperwork and make compliance easier for LLPs.',
        initial: 'K',
      },
      {
        name: 'Arvind Kejriwal',
        id: 'CMT043',
        email: 'a.kejriwal@example.com',
        date: '8/23/2024',
        sentiment: 'Neutral',
        comment: 'The digital compliance requirement is a good step, but the government needs to ensure that the online portal is robust and user-friendly, especially for those in remote areas.',
        initial: 'A',
      }
    ]
  },
};

const sentimentColors: { [key: string]: string } = {
  Positive: 'bg-positive/10 text-positive border-positive/20',
  Neutral: 'bg-neutral/10 text-neutral border-neutral/20',
  Negative: 'bg-destructive/10 text-destructive border-destructive/20',
};


export default function CommentPage() {
  const params = useParams();
  const id = params.id as keyof typeof commentsData;
  const data = commentsData[id] || commentsData['DOC-2024-001'];

  const [visibleComments, setVisibleComments] = useState(5);

  const handleExportCSV = () => {
    if (!data.publicComments.length) return;

    const headers = ['id', 'name', 'email', 'date', 'sentiment', 'comment'];
    const csvRows = [headers.join(',')];

    for (const row of data.publicComments) {
      const values = headers.map(header => {
        const escaped = ('' + (row as any)[header]).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${data.id}-comments.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="space-y-8">
       <Card>
        <CardHeader className="border-b pb-6">
          <div className="flex items-center justify-between mb-4">
             <h1 className="text-3xl font-bold text-primary">{data.title}</h1>
             <Badge variant="outline" className="text-base font-semibold">{data.id}</Badge>
          </div>
          <CardDescription className="text-lg">{data.description}</CardDescription>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-4 text-base">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-5 w-5" />
              <span>Uploaded: <strong>{data.uploaded}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-5 w-5" />
              <span>PDF Size: <strong>{data.pdfSize}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="h-5 w-5" />
              <span>Comments: <strong>{data.commentCount}</strong></span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-destructive">
              <Calendar className="h-5 w-5" />
              <span>Deadline: <strong>{data.dueDate}</strong></span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h2 className="font-bold text-xl mb-3">Key Amendments Proposed</h2>
              <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
                {data.keyAmendments.map((amendment, index) => (
                  <li key={index}>
                    <strong className="font-semibold text-foreground">{amendment.title}:</strong> {amendment.description}
                  </li>
                ))}
              </ul>
            </div>
            <Alert className="bg-accent/20 border-accent/30">
              <Info className="h-5 w-5 text-accent-foreground" />
              <AlertTitle className="font-bold">Public Consultation Period</AlertTitle>
              <AlertDescription className="text-foreground/80">{data.publicConsultation}</AlertDescription>
            </Alert>
          </div>
        </CardContent>
         <CardFooter>
            <Button size="lg">
                <Download className="mr-2 h-5 w-5" />
                Download Amendment PDF
            </Button>
        </CardFooter>
      </Card>

       <Card>
        <CardHeader>
            <CardTitle>Feedback Analysis</CardTitle>
            <CardDescription>Explore AI-powered insights derived from public comments and feedback.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <Link href={`/dashboard/sentiment-analysis/${id}`} className="block group">
            <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6 flex items-center gap-6">
                    <div className="bg-primary/10 text-primary p-4 rounded-lg">
                        <BarChart3 className="h-8 w-8" />
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Sentiment Analysis</h3>
                    <p className="text-muted-foreground text-sm">View public opinion trends and sentiment distribution.</p>
                    </div>
                </CardContent>
            </Card>
          </Link>
          <Link href={`/dashboard/feedback-analysis`} className="block group">
            <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6 flex items-center gap-6">
                <div className="bg-primary/10 text-primary p-4 rounded-lg">
                    <FileSignature className="h-8 w-8" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Detailed Feedback Reports</h3>
                    <p className="text-muted-foreground text-sm">Generate and view in-depth feedback analysis reports.</p>
                </div>
                </CardContent>
            </Card>
          </Link>
        </CardContent>
      </Card>

      <div id="comments">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Public Comments ({data.commentCount})</h2>
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export as CSV
          </Button>
        </div>
        <div className="space-y-6">
          {data.publicComments.slice(0, visibleComments).map((comment, index) => (
            <Card key={index} className="border-l-4 border-transparent hover:border-primary/80 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 border-2 border-border">
                    <AvatarFallback className="text-lg font-semibold">{comment.initial}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-base">{comment.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ID: {comment.id} &bull; Submitted on {comment.date}
                        </p>
                      </div>
                      <Badge className={`${sentimentColors[comment.sentiment]} border font-semibold text-sm`}>
                        {comment.sentiment}
                      </Badge>
                    </div>
                    <Separator className="my-4" />
                    <p className="text-base text-foreground/90 leading-relaxed">
                      {comment.comment}
                    </p>
                     <div className="mt-4">
                        <Link href={`/dashboard/comments/analysis/${comment.id}`} passHref>
                          <Button variant="link" className="p-0 h-auto text-primary font-semibold">View Detailed Analysis &rarr;</Button>
                        </Link>
                      </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {visibleComments < data.publicComments.length && (
          <div className="text-center mt-6">
            <Button onClick={() => setVisibleComments(prev => prev + 5)}>
              See More Comments
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
