import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Routes, getRouteProps } from '@/lib/routes';
import { Search, Users, MessageCircle, Shield, Zap, Globe } from 'lucide-react';
import heroImage from '@/assets/hero-image.png';
import jobSeekerIllustration from '@/assets/job-seeker-illustration.png';
import employerIllustration from '@/assets/employer-illustration.png';
import successIllustration from '@/assets/success-illustration.png';
import { GetLogInStatus, SetLogInStorage } from '@/LocalStorage/logInStorage';
import { useAuth } from '@/contexts/AuthContext';
import LandedPage from './LandedPage';

const PlaceholderPage = ({ title }) => (
  <div className="text-center space-y-4">
    <h1 className="text-3xl font-bold">{title}</h1>
    <p className="text-muted-foreground">עמוד זה בפיתוח</p>
  </div>
);

const HomePage = () => {
   const { user, isAuthenticated } = useAuth();
  if (isAuthenticated && user) {
    return (
      <div className="space-y-12">
        {/* Welcome Section for Authenticated Users */}
        <section className="text-center space-y-6">
          <div className="mb-8">
            <img 
              src={heroImage} 
              alt="Jobox - פלטפורמת חיפוש עבודה הפוכה" 
              className="mx-auto max-w-2xl w-full h-auto"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            ברוך הבא, <span className="text-primary">{user.name}</span>!
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {user.type === 'seeker' 
              ? 'הפרופיל שלך פעיל ומעסיקים יכולים לפנות אליך. בדוק את ההודעות שלך לעדכונים.'
              : 'ברוך הבא למערכת החיפוש שלנו. מצא את המועמדים המושלמים לחברה שלך.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           {/*  <Button size="lg" asChild>
              <Link to="/dashboard">
                לוח הבקרה שלי
              </Link>
            </Button> */}
             <Button size="lg"  asChild>
              <Link to="/messages">הודעות</Link>
            </Button>
            {console.log(user.type==='seeker')}
      <Button size="lg" variant="outline" asChild>
  {user.type === 'seeker' ? (
    <Link to={Routes.profile(user.id)} {...getRouteProps(Routes.profile(user.id))}>
      הפרופיל שלי
    </Link>
  ) : (
    <Link to={Routes.employerProfile(user.id)} {...getRouteProps(Routes.employerProfile(user.id))}>
      הפרופיל שלי
    </Link>
  )}
</Button>
            {user.type==="employer"&&(
             <Button size="lg" variant="outline" asChild>
              <Link to="/search">
           חפש מועמדים
              </Link>
            </Button>  
            )}

          </div>
        </section>

        {/* Quick Actions for Authenticated Users */}
        <section className={`grid ${user.type === 'seeker' ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8`}>
          <div className="text-center space-y-4">
            הצעות עבודה
          </div>
         {/*  <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">הפרופיל שלי</h3>
            <p className="text-muted-foreground">
              עדכן את הפרטים שלך ושפר את הנראות שלך למעסיקים
            </p>
            <Button variant="outline" asChild>
              <Link to={Routes.profile(user.id)}>צפה בפרופיל</Link>
            </Button>
          </div>
          
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">הודעות</h3>
            <p className="text-muted-foreground">
              בדוק הודעות חדשות ופניות ממעסיקים
            </p>
            <Button variant="outline" asChild>
              <Link to="/messages">הודעות</Link>
            </Button>
          </div>
          {user.type === 'employer' && (
    <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">חיפוש</h3>
              <p className="text-muted-foreground">
                {user.type === 'seeker' ? 'חפש משרות פתוחות' : 'חפש מועמדים מתאימים'}
              </p>
              <Button variant="outline" asChild>
                <Link to="/search">התחל חיפוש</Link>
              </Button>
            </div> 
          )} */}
        
        </section>

        {/* Info Section */}
        <section className="bg-muted rounded-lg p-8 text-center space-y-6">
          <div className="mb-6">
            <img 
              src={successIllustration} 
              alt="הצלחה בחיפוש עבודה" 
              className="mx-auto w-32 h-32 object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold">רוצה לדעת עוד על Jobox?</h2>
          <p className="text-muted-foreground">
            למד עוד על הפלטפורמה שלנו ואיך היא עובדת
          </p>
          <Button variant="outline" asChild>
            <Link to="/info">מידע נוסף</Link>
          </Button>
        </section>
      </div>
    );
  }
  return (<>
  
  <LandedPage/>
  
  </>
  
  );
};

export default HomePage;

