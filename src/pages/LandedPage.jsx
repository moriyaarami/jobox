
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  MessageCircle, 
  Clock, 
  Shield, 
  Zap, 
  Search,
  CheckCircle,
  ArrowLeft,
  Star,
  Quote
} from 'lucide-react'

// Import generated assets
import heroIllustration from '@/assets/jobox_hero_illustration.png'
import valueIcon1 from '@/assets/jobox_value_prop_icon1.png'
import valueIcon2 from '@/assets/jobox_value_prop_icon2.png'
import valueIcon3 from '@/assets/jobox_value_prop_icon3.png'
import valueIcon4 from '@/assets/jobox_value_prop_icon4.png'
import jobSeekerProcess from '@/assets/jobox_job_seeker_process.png'
import employerProcess from '@/assets/jobox_employer_process.png'
import successIllustration from '@/assets/jobox_success_illustration.png'
import { getRouteProps, Routes } from '@/lib/routes'
import { Link } from 'react-router-dom'

function LandedPage() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              Jobox
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                איך זה עובד
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                המלצות
              </button>
              <Button variant="outline" size="sm">
                 <Link to={Routes.login} {...getRouteProps(Routes.login)}>
              כניסה למערכת
            </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right fade-in">
              <Badge variant="secondary" className="mb-6 text-sm">
                🚀 פלטפורמת חיפוש עבודה הפוכה
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Jobox – המקום שבו{' '}
                <span className="text-primary">מעסיקים פונים אליך</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                צור פרופיל, קבל הצעות מותאמות ממעסיקים, ונהל איתם שיחה ישירה בצ'אט – 
                בצורה פשוטה, קלה וחכמה.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {console.log()}
                <Button 
                  size="lg" 
                  asChild
                >
                  <Link to={Routes.signup} state={{usertype:'seeker'}} {...getRouteProps(Routes.signup)} >
                    אני מחפש עבודה
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild
                >
                    <Link to={Routes.signup} state={{usertype:'employer'}} {...getRouteProps(Routes.signup)}>
                      אני מחפש עובדים
                    </Link>
                </Button>
         
              </div>
              <div >
             
                       <div className="block md:hidden text-center px-2">
   <p className="mt-10 mb-3 text-lg text-muted-foreground">משתמש רשום ?</p>

                                  <Link to={Routes.login} {...getRouteProps(Routes.login)} className='text-sm font-bold'>
                                  כניסה למערכת
                                  </Link>
                            
               </div>
              </div>
            </div>
            <div className="slide-in-left">
              <img 
                src={heroIllustration} 
                alt="Jobox - פלטפורמת חיפוש עבודה הפוכה" 
                className="w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              אז למה לבחור ב-Jobox?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              כי הגיע הזמן שחיפוש עבודה יעבוד בשבילך.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card-hover fade-in">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <img src={valueIcon1} alt="מעסיקים פונים אליך" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">מעסיקים פונים אליך</h3>
                <p className="text-muted-foreground">
                  לא עוד שליחת מאות קורות חיים. המעסיקים יפנו אליך ישירות.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover fade-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <img src={valueIcon2} alt="התאמות חכמות" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">התאמות חכמות</h3>
                <p className="text-muted-foreground">
                  רק הצעות רלוונטיות שמתאימות לכישורים והניסיון שלך.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <img src={valueIcon3} alt="שיחות ישירות" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">שיחות ישירות</h3>
                <p className="text-muted-foreground">
                  מאצ'ינג מיידי בין מחפשי עבודה למעסיקים בצ'אט פרטי.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover fade-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <img src={valueIcon4} alt="חוסך זמן" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">חוסך זמן</h3>
                <p className="text-muted-foreground">
                  תהליך מהיר, פשוט ויעיל שחוסך לך שעות של חיפוש.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              איך זה עובד?
            </h2>
            <p className="text-xl text-muted-foreground">
              תהליך פשוט ומהיר לשני הצדדים
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Job Seekers Process */}
            <div className="slide-in-right">
              <div className="text-center mb-8">
                <img 
                  src={jobSeekerProcess} 
                  alt="תהליך למחפשי עבודה" 
                  className="w-64 h-64 mx-auto mb-6"
                />
                <h3 className="text-2xl font-bold mb-4 text-primary">למחפשי עבודה</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">צור פרופיל תוך דקות</h4>
                    <p className="text-muted-foreground">
                      הוסף את הכישורים, הניסיון והעדפות השכר שלך בפרופיל מקצועי.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">קבל הצעות עבודה ממעסיקים</h4>
                    <p className="text-muted-foreground">
                      מעסיקים יפנו אליך ישירות עם הצעות עבודה מותאמות לפרופיל שלך.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">אשר את פתיחת הצ'אט</h4>
                    <p className="text-muted-foreground">
                      דבר ישירות עם המעסיק, שתף קורות חיים ותעשה ריאיון.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Employers Process */}
            <div className="slide-in-left">
              <div className="text-center mb-8">
                <img 
                  src={employerProcess} 
                  alt="תהליך למעסיקים" 
                  className="w-64 h-64 mx-auto mb-6"
                />
                <h3 className="text-2xl font-bold mb-4 text-secondary-foreground">למעסיקים</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">פתח חשבון חברה מאומת</h4>
                    <p className="text-muted-foreground">
                      הרשם כמעסיק ואמת את פרטי החברה שלך במערכת.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">חפש מועמדים לפי פילטרים חכמים</h4>
                    <p className="text-muted-foreground">
                      סנן מועמדים לפי כישורים, מיקום, שכר וניסיון רלוונטי.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">שלח בקשה לפתיחת צ'אט</h4>
                    <p className="text-muted-foreground">
                      פנה למועמדים רלוונטיים והתחל תהליך גיוס יעיל.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              אנשים אמיתיים, תוצאות אמיתיות
            </h2>
            <p className="text-xl text-muted-foreground">
              הצטרפו לאלפי מחפשי עבודה ומעסיקים מרוצים
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover fade-in">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  "מצאתי עבודה תוך שבועיים – בלי לשלוח אפילו קורות חיים אחד! 
                  המעסיקים פנו אליי ישירות והתהליך היה מהיר ויעיל."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">נועה כהן</p>
                    <p className="text-sm text-muted-foreground">מפתחת תוכנה</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover fade-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  "הצלחנו לאייש תפקיד קריטי תוך ימים ספורים. 
                  הפלטפורמה מביאה מועמדים איכותיים שבאמת מתאימים לדרישות."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">אלי רוזן</p>
                    <p className="text-sm text-muted-foreground">מנהל משאבי אנוש</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  "סוף סוף פלטפורמה שמבינה מה אני מחפש! 
                  קיבלתי הצעות רלוונטיות ומצאתי את העבודה המושלמת."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">דני לוי</p>
                    <p className="text-sm text-muted-foreground">מעצב UX/UI</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cta-gradient py-20 text-black">
        <div className="container mx-auto px-4">
          <div className="text-center fade-in">
            <div className="mb-8">
              <img 
                src={successIllustration} 
                alt="הצלחה בחיפוש עבודה" 
                className="w-32 h-32 mx-auto mb-6 opacity-90"
              />
            </div>
      
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  מוכנים לשלב הבא בקריירה או בגיוס?
                </h2>
                <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
                  הצטרפו עכשיו ל-Jobox – ותנו לעבודה למצוא אתכם
                </p>
            </div>
            <Button 
              size="lg" 
              variant="outline"
              className="btn-secondary text-lg px-8 py-6 bg-black text-white"
            >
              נסו עכשיו בחינם
            </Button>
       
          
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-primary mb-4">
                Jobox
              </div>
              <p className="text-muted-foreground">
                פלטפורמת חיפוש עבודה הפוכה שמחברת בין מחפשי עבודה למעסיקים בצורה חכמה ויעילה.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">קישורים מהירים</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">איך זה עובד</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">עלינו</a></li>
               
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">משפטי</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">תנאי שימוש</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">מדיניות פרטיות</a></li>
               
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">תמיכה</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">מרכז עזרה</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">שאלות נפוצות</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">יצירת קשר</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Jobox. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandedPage;
