
'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  UserPlus,
  ArrowRight,
  Loader2,
  ListChecks,
  ShieldCheck,
  Wand2
} from 'lucide-react';
import {
  suggestRoleBasedAccess,
  SuggestRoleBasedAccessOutput,
} from '@/ai/flows/suggest-role-based-access';

const formSchema = z.object({
  fullName: z.string().min(3, 'Full name is required.'),
  email: z.string().email('Invalid email address.'),
  department: z.string().min(1, 'Department is required.'),
  jobTitle: z.string().min(1, 'Job title is required.'),
});

const departments = [
  'Policy Division',
  'Legal Division',
  'Investigation & Inspection Wing',
  'Corporate Governance Cell',
  'IT Department',
  'Administration',
];

export default function UserManagementPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] =
    useState<SuggestRoleBasedAccessOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      department: '',
      jobTitle: '',
    },
  });

  const handleSuggestRoles = async () => {
    const { department, jobTitle } = form.getValues();
    if (!department || !jobTitle) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide both department and job title.',
      });
      return;
    }
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestRoleBasedAccess({ department, jobTitle });
      setSuggestion(result);
    } catch (error) {
      console.error('Error suggesting roles:', error);
      toast({
        variant: 'destructive',
        title: 'AI Suggestion Failed',
        description: 'Could not get role suggestions at this time.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'User Created Successfully',
      description: `${values.fullName} has been added to the system.`,
    });
    form.reset();
    setSuggestion(null);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">
                  Create New User Account
                </CardTitle>
                <CardDescription>
                  Fill in the details to create a new user account for the
                  e-governance platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Arjun Sharma" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="e.g., arjun.sharma@gov.in"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Department</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Job Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Deputy Director"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button type="submit" size="lg">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create User Account
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-8 bg-muted/30 border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-bold">
                <Wand2 className="text-primary" />
                AI-Powered Role Suggester
            </CardTitle>
            <CardDescription>
              Get AI-driven recommendations for roles and permissions based on
              the user's job profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full bg-card"
              onClick={handleSuggestRoles}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Suggestions...
                </>
              ) : (
                'Suggest Roles & Permissions'
              )}
            </Button>
            {suggestion && (
              <div className="mt-6 space-y-6 animate-in fade-in">
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <ShieldCheck size={18} className="text-primary" /> Suggested Roles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.suggestedRoles.map((role) => (
                      <Badge key={role} variant="secondary" className="text-base font-medium">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <ListChecks size={18} className="text-primary" /> Suggested Permissions
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.suggestedPermissions.map((perm) => (
                      <Badge key={perm} variant="outline" className="font-normal">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
