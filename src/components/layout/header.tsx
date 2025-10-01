'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Settings,
  ExternalLink,
  LogOut,
  ChevronsUpDown,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/';

  if (isLoginPage) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1E293B] shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image src="/stakesense.jpg" alt="StakeSense Logo" width={50} height={50} className="rounded-md" />
        </div>
        <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Backoffice Portal</h1>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center gap-2">
                <Avatar className="h-12 w-12 border-2 border-slate-400/80">
                  <AvatarImage src="https://picsum.photos/100" />
                  <AvatarFallback>AO</AvatarFallback>
                </Avatar>
                <div className="hidden flex-col text-left sm:flex">
                  <span className="font-semibold text-slate-200">
                    Admin Officer
                  </span>
                  <span className="text-sm text-slate-400">
                    admin.officer@mca.gov.in
                  </span>
                </div>
                <ChevronsUpDown className="h-5 w-5 text-slate-400" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-base font-semibold">Admin Officer</p>
                  <p className="text-xs text-muted-foreground">
                    admin.officer@mca.gov.in
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Back to Main Portal</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
