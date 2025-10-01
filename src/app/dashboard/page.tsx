
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CalendarDays,
  Users,
  FolderKanban,
  MessageSquare,
  BookMarked,
  Landmark,
  FilePlus,
} from 'lucide-react';

const amendments = [
  {
    id: 'DOC-2024-001',
    title: 'Draft Companies (Amendment) Rules, 2024',
    description:
      'Proposed amendments to enhance corporate governance and director responsibilities.',
    category: 'Companies Act',
    published: '2024-08-01',
    deadline: '2024-09-30',
    stakeholders: 'Public, Companies, LLPs',
    status: 'Open',
    comments: 1350,
  },
  {
    id: 'DOC-2024-002',
    title: 'Taxation Laws (Second Amendment) Bill, 2024',
    description:
      'Introduction of new sections to address tax evasion and promote digital transactions.',
    category: 'Taxation',
    published: '2024-07-15',
    deadline: '2024-08-15',
    stakeholders: 'Public, Companies, LLPs',
    status: 'Closed',
    comments: 1150,
  },
  {
    id: 'DOC-2024-003',
    title: 'Insolvency and Bankruptcy Code (Amendment) Bill, 2024',
    description:
      'Strengthening the insolvency resolution process for corporate debtors.',
    category: 'IBC',
    published: '2024-08-10',
    deadline: '2024-10-15',
    stakeholders: 'Public, Companies, LLPs',
    status: 'Open',
    comments: 1550,
  },
  {
    id: 'DOC-2024-004',
    title: 'Limited Liability Partnership (Amendment) Rules, 2024',
    description:
      'Simplifying the reporting and compliance framework for LLPs.',
    category: 'LLP Act',
    published: '2024-08-20',
    deadline: '2024-10-05',
    stakeholders: 'Public, Companies, LLPs',
    status: 'Open',
    comments: 950,
  },
];

const getDaysLeft = (deadline: string) => {
  const today = new Date();
  const dead = new Date(deadline);
  if (dead < today) return 0;
  const diffTime = Math.abs(dead.getTime() - today.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

type DashboardPageProps = {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const resolvedSearchParams = await searchParams;
  const activeCategory = resolvedSearchParams.category ?? 'All';
  const searchTerm = resolvedSearchParams.search ?? '';

  const filteredAmendments = amendments.filter(
    item =>
      (activeCategory === 'All' || item.category === activeCategory) &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-card-foreground">Total Consultations</CardTitle>
            <BookMarked className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{amendments.length}</div>
            <p className="text-sm text-muted-foreground">Active and historical</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-card-foreground">Open for Comments</CardTitle>
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {amendments.filter(a => a.status === 'Open').length}
            </div>
            <p className="text-sm text-muted-foreground">Active consultations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-card-foreground">Total Comments</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {amendments.reduce((acc, a) => acc + a.comments, 0)}
            </div>
            <p className="text-sm text-muted-foreground">From all stakeholders</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-card-foreground">Stakeholder Entities</CardTitle>
            <Landmark className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,250+</div>
            <p className="text-sm text-muted-foreground">Companies, LLPs, etc.</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
            <div>
                <h2 className="text-2xl font-bold text-primary">Active and Recent Consultations</h2>
                <p className="text-muted-foreground">Review and manage all ongoing and recently closed public consultations.</p>
            </div>
            <Button asChild>
                <Link href="/dashboard/add-amendment">
                    <FilePlus className="mr-2 h-4 w-4" />
                    Add Consultation
                </Link>
            </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {filteredAmendments.map((item, index) => {
            const daysLeft = getDaysLeft(item.deadline);

            return (
                <Card key={index} className="flex flex-col hover:border-primary/50 transition-colors duration-300">
                    <CardContent className="p-6 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                            <Badge
                                className={`whitespace-nowrap ${item.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {item.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm pt-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <FolderKanban className="h-4 w-4" />
                                <span>
                                Category: <strong className="text-foreground">{item.category}</strong>
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>
                                Stakeholders: <strong className="text-foreground">{item.stakeholders}</strong>
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <CalendarDays className="h-4 w-4" />
                                <span>
                                Published: <strong className="text-foreground">{new Date(item.published).toLocaleDateString()}</strong>
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MessageSquare className="h-4 w-4" />
                                <span>Comments: <strong className="text-foreground">{item.comments}</strong></span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-dashed mt-2">
                             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CalendarDays className="h-4 w-4 text-destructive" />
                                <span>
                                Deadline: {new Date(item.deadline).toLocaleDateString()} &bull; 
                                <span className={daysLeft > 0 ? 'text-positive' : 'text-destructive'}> {daysLeft > 0 ? `${daysLeft} days left` : 'Period Ended'}</span>
                                </span>
                            </div>
                            <Button asChild variant="default">
                                <Link href={`/dashboard/comments/${item.id}`} passHref>
                                View Details
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            );
            })}
        </div>
      </div>
    </div>
  );
}
