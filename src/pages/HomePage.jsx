import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Routes, getRouteProps } from '@/lib/routes';
import { Search, Users, MessageCircle, Shield, Zap, Globe } from 'lucide-react';
import heroImage from '@/assets/hero-image.png';
import jobSeekerIllustration from '@/assets/job-seeker-illustration.png';
import employerIllustration from '@/assets/employer-illustration.png';
import successIllustration from '@/assets/success-illustration.png';

const HomePage = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="mb-8">
          <img 
            src={heroImage} 
            alt="Jobox - פלטפורמת חיפוש עבודה הפוכה" 
            className="mx-auto max-w-2xl w-full h-auto"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          ברוכים הבאים ל-<span className="text-primary">Jobox</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          פלטפורמת חיפוש עבודה הפוכה בה מעסיקים פונים אליכם על בסיס הפרופיל שלכם.
          שמרו על האנונימיות, בחרו מתי לחשוף את הקורות חיים, וקבלו הצעות עבודה רלוונטיות.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to={Routes.signup} {...getRouteProps(Routes.signup)}>
              הצטרפו כמחפשי עבודה
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to={Routes.signup} {...getRouteProps(Routes.signup)}>
              הצטרפו כמעסיקים
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">פרטיות מלאה</h3>
          <p className="text-muted-foreground">
            שמרו על האנונימיות שלכם ובחרו בדיוק מתי לחשוף את פרטיכם למעסיקים
          </p>
        </div>
        
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">תהליך מהיר</h3>
          <p className="text-muted-foreground">
            מעסיקים פונים אליכם ישירות, ללא צורך בחיפוש אינסופי אחר משרות
          </p>
        </div>
        
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Globe className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">גלובלי</h3>
          <p className="text-muted-foreground">
            מתחילים בישראל אבל בנויים להתרחב לכל העולם
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">איך זה עובד?</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* For Job Seekers */}
          <div className="space-y-6">
            <div className="text-center mb-6">
              <img 
                src={jobSeekerIllustration} 
                alt="מחפש עבודה יוצר פרופיל" 
                className="mx-auto w-48 h-48 object-contain"
              />
            </div>
            <h3 className="text-2xl font-semibold text-center">למחפשי עבודה</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">צרו פרופיל</h4>
                  <p className="text-muted-foreground">הוסיפו את הכישורים והניסיון שלכם</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">קבלו הצעות</h4>
                  <p className="text-muted-foreground">מעסיקים יפנו אליכם על בסיס הפרופיל</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">בחרו מתי לחשוף</h4>
                  <p className="text-muted-foreground">אשרו שיתוף קורות חיים רק למעסיקים רלוונטיים</p>
                </div>
              </div>
            </div>
          </div>

          {/* For Employers */}
          <div className="space-y-6">
            <div className="text-center mb-6">
              <img 
                src={employerIllustration} 
                alt="מעסיק מחפש מועמדים" 
                className="mx-auto w-48 h-48 object-contain"
              />
            </div>
            <h3 className="text-2xl font-semibold text-center">למעסיקים</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">חפשו מועמדים</h4>
                  <p className="text-muted-foreground">סננו לפי כישורים, מיקום ושכר</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">פנו למועמדים</h4>
                  <p className="text-muted-foreground">שלחו בקשות עניין למועמדים רלוונטיים</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">שלמו רק בהצלחה</h4>
                  <p className="text-muted-foreground">10% עמלה רק בעת גיוס מוצלח</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted rounded-lg p-8 text-center space-y-6">
        <div className="mb-6">
          <img 
            src={successIllustration} 
            alt="הצלחה בחיפוש עבודה" 
            className="mx-auto w-32 h-32 object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold">מוכנים להתחיל?</h2>
        <p className="text-muted-foreground">
          הצטרפו לפלטפורמה שמשנה את דרך חיפוש העבודה
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to={Routes.signup} {...getRouteProps(Routes.signup)}>
              הרשמה חינם
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={Routes.login} {...getRouteProps(Routes.login)}>
              כניסה למערכת
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

