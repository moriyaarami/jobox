import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Routes, getRouteProps } from '@/lib/routes';
import { Home, Search, ArrowRight } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">הדף לא נמצא</h2>
          <p className="text-muted-foreground">
            מצטערים, הדף שחיפשתם לא קיים או הועבר למיקום אחר.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to={Routes.home} {...getRouteProps(Routes.home)}>
                <Home className="ml-2 h-4 w-4" />
                חזרה לדף הבית
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to={Routes.search} {...getRouteProps(Routes.search)}>
                <Search className="ml-2 h-4 w-4" />
                חיפוש משרות
              </Link>
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-3">קישורים מועילים:</h3>
            <div className="space-y-2 text-sm">
              <Link 
                to={Routes.login} 
                {...getRouteProps(Routes.login)}
                className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                כניסה למערכת
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link 
                to={Routes.signup} 
                {...getRouteProps(Routes.signup)}
                className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                הרשמה חדשה
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link 
                to={Routes.support} 
                {...getRouteProps(Routes.support)}
                className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                צור קשר
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

