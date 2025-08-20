import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Routes, getRouteProps } from '@/lib/routes';
import { 
  Home, 
  Search, 
  MessageCircle, 
  User, 
  Settings, 
  Menu,
  X,
  Sun,
  Moon,
  Building2,
  Users
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  

  // Navigation items for job seekers
  const seekerNavItems = [
    { icon: Home, label: 'דף הבית', route: Routes.home },
    { icon: MessageCircle, label: 'הודעות', route: Routes.messages },
    { icon: User, label: 'פרופיל', route: Routes.seekerDash },
    { icon: Settings, label: 'הגדרות', route: Routes.settings }
  ];

  // Navigation items for employers
  const employerNavItems = [
    { icon: Home, label: 'דף הבית', route: Routes.home },
    { icon: Users, label: 'חיפוש מועמדים', route: Routes.search },
    { icon: MessageCircle, label: 'הודעות', route: Routes.messages },
    { icon: Building2, label: 'לוח בקרה', route: Routes.employerDash },
    { icon: Settings, label: 'הגדרות', route: Routes.settings }
  ];

  // For now, using seeker nav items as default
  const {user}=useAuth();
  
  const navItems = !user?null : user.type === 'seeker' ? seekerNavItems : employerNavItems;

  const NavItem = ({ icon: Icon, label, route, isMobile = false }) => {
    const isActive = location.pathname === route;
    
    return (
      <Link
        to={route}
        {...getRouteProps(route)}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
          isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        } ${isMobile ? 'flex-col gap-1 text-xs' : ''}`}
        onClick={() => isMobile && setIsSidebarOpen(false)}
      >
        <Icon className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'}`} />
        <span className={isMobile ? 'text-xs' : ''}>{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:right-0 md:z-50 md:w-64 md:flex md:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-l bg-card px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <Link to={Routes.home} {...getRouteProps(Routes.home)} className="text-xl font-bold">
              Jobox
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="h-8 w-8"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {user && navItems.map((item) => (
                    <li key={item.route}>
                      <NavItem {...item} />
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-card px-4 py-4 shadow-sm md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(true)}
          className="h-8 w-8"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <div className="flex-1 text-sm font-semibold leading-6">
          <Link to={Routes.home} {...getRouteProps(Routes.home)} className="text-xl font-bold">
            Jobox
          </Link>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="h-8 w-8"
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="relative z-50 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-card px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
            <div className="flex items-center justify-between">
              <Link to={Routes.home} {...getRouteProps(Routes.home)} className="text-xl font-bold">
                Jobox
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="mt-6">
              <ul role="list" className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.route}>
                    <NavItem {...item} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="md:pr-64">
        <div className="px-4 py-6 md:px-6 md:py-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t md:hidden">
        <nav className="flex justify-around py-2">
          {user&&navItems.slice(0, 5).map((item) => (
            <NavItem key={item.route} {...item} isMobile />
          ))}
        </nav>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="h-16 md:hidden" />
    </div>
  );
};

export default Layout;

