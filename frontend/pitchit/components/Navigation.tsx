'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useContext } from 'react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/dashboard', alwaysVisible: true },
    { name: 'Generate', path: '/generate', alwaysVisible: false },
    { name: 'Technical Brief', path: '/technical', alwaysVisible: false },
    { name: 'Branding', path: '/branding', alwaysVisible: false },
    { name: 'Market Research', path: '/market', alwaysVisible: false },
    { name: 'Deck', path: '/deck', alwaysVisible: false },
  ];

  return (
    <div className="sticky top-0 z-50 border-b border-border bg-background/50 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex flex-row items-center">
                <Image className="mr-2 w-8 h-8" src="/logo.svg" alt="MarketMind" width={295} height={326} />
                <span className="text-2xl mr-8 tracking-tight">PitchIt</span>
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <NavigationMenuLink
                      href={item.path}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === item.path ? "bg-background/50" : "bg-transparent",
                        "hover:bg-background/80 transition-colors duration-200"
                      )}
                      active={pathname === item.path}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

export default Navigation;