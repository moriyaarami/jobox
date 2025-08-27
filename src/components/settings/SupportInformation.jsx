import React, { useState } from 'react';
import { 
  HelpCircle, 
  FileText, 
  Shield, 
  Accessibility, 
  Mail, 
  Star, 
  MessageSquare, 
  ExternalLink,
  ChevronLeft,
  Phone,
  Clock,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SupportInformation = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [contactForm, setContactForm] = useState({
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });

  const supportItems = [
    {
      id: 'terms',
      title: 'תנאי השימוש',
      description: 'קרא את תנאי השימוש המלאים של הפלטפורמה',
      icon: FileText,
      action: () => window.open('/terms-of-service', '_blank'),
      badge: null
    },
    {
      id: 'privacy',
      title: 'מדיניות הפרטיות',
      description: 'מידע על איך אנחנו מגינים על הפרטיות שלך',
      icon: Shield,
      action: () => window.open('/privacy-policy', '_blank'),
      badge: 'עודכן'
    },
    {
      id: 'accessibility',
      title: 'נגישות',
      description: 'מידע על תכונות הנגישות בפלטפורמה',
      icon: Accessibility,
      action: () => window.open('/accessibility', '_blank'),
      badge: null
    },
    {
      id: 'contact',
      title: 'צור קשר',
      description: 'שלח לנו הודעה או דווח על בעיה',
      icon: Mail,
      action: () => setContactOpen(true),
      badge: null
    },
    {
      id: 'rating',
      title: 'דרג את הפלטפורמה',
      description: 'עזור לנו להשתפר עם הדירוג שלך',
      icon: Star,
      action: () => setRatingOpen(true),
      badge: null
    },
    {
      id: 'feedback',
      title: 'משוב משתמשים',
      description: 'שתף אותנו ברעיונות ובהצעות לשיפור',
      icon: MessageSquare,
      action: () => setFeedbackOpen(true),
      badge: null
    },
    {
      id: 'faq',
      title: 'שאלות נפוצות',
      description: 'מצא תשובות לשאלות הנפוצות ביותר',
      icon: HelpCircle,
      action: () => window.open('/faq', '_blank'),
      badge: null
    }
  ];

  const contactCategories = [
    { value: 'technical', label: 'בעיה טכנית' },
    { value: 'account', label: 'בעיות חשבון' },
    { value: 'billing', label: 'תשלומים וחיובים' },
    { value: 'feature', label: 'בקשת תכונה חדשה' },
    { value: 'report', label: 'דיווח על תוכן' },
    { value: 'other', label: 'אחר' }
  ];

  const priorityLevels = [
    { value: 'low', label: 'נמוכה', color: 'text-green-600' },
    { value: 'medium', label: 'בינונית', color: 'text-yellow-600' },
    { value: 'high', label: 'גבוהה', color: 'text-red-600' }
  ];

  const handleRatingSubmit = async () => {
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRatingOpen(false);
      setRating(0);
    } catch (error) {
      console.error('Failed to submit rating:', error);
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFeedbackOpen(false);
      setFeedback('');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  const handleContactSubmit = async () => {
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setContactOpen(false);
      setContactForm({ subject: '', category: '', message: '', priority: 'medium' });
    } catch (error) {
      console.error('Failed to submit contact form:', error);
    }
  };

  const StarRating = ({ rating, onRatingChange, readonly = false }) => {
    return (
      <div className="flex gap-1 justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer transition-colors ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300 hover:text-yellow-200'
            } ${readonly ? 'cursor-default' : ''}`}
            onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Support Contact Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-blue-900">
              זקוק לעזרה? אנחנו כאן בשבילך
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <Mail className="w-4 h-4" />
                <span>support@jobox.co.il</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <Phone className="w-4 h-4" />
                <span>03-1234567</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <Clock className="w-4 h-4" />
                <span>א'-ה' 9:00-18:00</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {supportItems.map((item) => {
          const IconComponent = item.icon;
          
          return (
            <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                  
                  <div className="text-right flex-1">
                    <div className="flex items-center gap-2 justify-end mb-2">
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      <h3 className="font-semibold">{item.title}</h3>
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={item.action}
                      className="w-full"
                    >
                      {item.id === 'contact' && 'פתח טופס יצירת קשר'}
                      {item.id === 'rating' && 'דרג עכשיו'}
                      {item.id === 'feedback' && 'שלח משוב'}
                      {!['contact', 'rating', 'feedback'].includes(item.id) && (
                        <>
                          <ExternalLink className="w-4 h-4 ml-1" />
                          פתח
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Platform Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right">
            <Globe className="w-5 h-5" />
            סטטיסטיקות הפלטפורמה
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-muted-foreground">משתמשים רשומים</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">892</div>
              <div className="text-sm text-muted-foreground">משתמשים פעילים</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-muted-foreground">גיוסים מוצלחים</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">4.8</div>
              <div className="text-sm text-muted-foreground">דירוג ממוצע</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Dialog */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">צור קשר עם התמיכה</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-right block">נושא</Label>
              <Input
                value={contactForm.subject}
                onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="תאר את הבעיה בקצרה"
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-right block">קטגוריה</Label>
              <Select
                value={contactForm.category}
                onValueChange={(value) => setContactForm(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="בחר קטגוריה" />
                </SelectTrigger>
                <SelectContent>
                  {contactCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-right block">עדיפות</Label>
              <Select
                value={contactForm.priority}
                onValueChange={(value) => setContactForm(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger className="text-right">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityLevels.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      <span className={priority.color}>{priority.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-right block">הודעה</Label>
              <Textarea
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="תאר את הבעיה או השאלה שלך בפירוט"
                className="text-right min-h-[100px]"
                dir="rtl"
              />
            </div>

            <Alert>
              <AlertDescription className="text-right">
                נענה לפניות תוך 24 שעות בימי עסקים. לבעיות דחופות, התקשר אלינו ישירות.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setContactOpen(false)}>
                ביטול
              </Button>
              <Button onClick={handleContactSubmit} className="flex-1">
                שלח הודעה
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rating Dialog */}
      <Dialog open={ratingOpen} onOpenChange={setRatingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">דרג את הפלטפורמה</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-center">
            <div>
              <p className="text-muted-foreground mb-4">
                איך היית מדרג את החוויה שלך עם Jobox?
              </p>
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>

            {rating > 0 && (
              <div className="text-sm text-muted-foreground">
                {rating === 1 && "מאוד לא מרוצה"}
                {rating === 2 && "לא מרוצה"}
                {rating === 3 && "בסדר"}
                {rating === 4 && "מרוצה"}
                {rating === 5 && "מאוד מרוצה"}
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setRatingOpen(false)}>
                ביטול
              </Button>
              <Button 
                onClick={handleRatingSubmit} 
                disabled={rating === 0}
                className="flex-1"
              >
                שלח דירוג
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">שלח משוב</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-right block">המשוב שלך</Label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="שתף אותנו ברעיונות, הצעות לשיפור או כל דבר אחר שחשוב לך"
                className="text-right min-h-[120px]"
                dir="rtl"
              />
            </div>

            <Alert>
              <AlertDescription className="text-right">
                המשוב שלך עוזר לנו להשתפר ולפתח תכונות חדשות. תודה על השיתוף!
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setFeedbackOpen(false)}>
                ביטול
              </Button>
              <Button 
                onClick={handleFeedbackSubmit}
                disabled={!feedback.trim()}
                className="flex-1"
              >
                שלח משוב
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupportInformation;

