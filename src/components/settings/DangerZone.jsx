import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Trash2, 
  Pause, 
  Play, 
  Shield, 
  Download,
  Clock,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DangerZone = () => {
  const [deactivateDialog, setDeactivateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [deactivateForm, setDeactivateForm] = useState({
    reason: '',
    duration: '30',
    feedback: '',
    confirmText: ''
  });

  const [deleteForm, setDeleteForm] = useState({
    reason: '',
    feedback: '',
    confirmText: '',
    downloadData: false,
    confirmDeletion: false,
    password: ''
  });

  // Mock user data
  const userData = {
    accountCreated: '2023-06-15',
    totalConnections: 45,
    totalMessages: 127,
    profileViews: 892,
    isEmployer: false
  };

  const deactivationReasons = [
    { value: 'break', label: 'רוצה לקחת הפסקה מחיפוש עבודה' },
    { value: 'found_job', label: 'מצאתי עבודה' },
    { value: 'privacy', label: 'חששות פרטיות' },
    { value: 'too_many_messages', label: 'יותר מדי הודעות' },
    { value: 'not_relevant', label: 'ההצעות לא רלוונטיות' },
    { value: 'other', label: 'סיבה אחרת' }
  ];

  const deletionReasons = [
    { value: 'found_job', label: 'מצאתי עבודה ולא זקוק יותר לשירות' },
    { value: 'privacy', label: 'חששות פרטיות' },
    { value: 'not_satisfied', label: 'לא מרוצה מהשירות' },
    { value: 'too_complex', label: 'השירות מורכב מדי' },
    { value: 'cost', label: 'עלות השירות' },
    { value: 'other', label: 'סיבה אחרת' }
  ];

  const deactivationDurations = [
    { value: '7', label: '7 ימים' },
    { value: '30', label: '30 ימים' },
    { value: '90', label: '3 חודשים' },
    { value: '180', label: '6 חודשים' },
    { value: 'indefinite', label: 'ללא הגבלת זמן' }
  ];

  const handleDeactivate = async () => {
    if (confirmationStep === 1) {
      setConfirmationStep(2);
      return;
    }

    if (deactivateForm.confirmText !== 'השבת זמנית') {
      alert('נא הקלד "השבת זמנית" בדיוק כפי שמופיע');
      return;
    }

    setIsLoading(true);
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate account deactivation
      alert('החשבון הושבת זמנית בהצלחה');
      setDeactivateDialog(false);
      setConfirmationStep(1);
      setDeactivateForm({
        reason: '',
        duration: '30',
        feedback: '',
        confirmText: ''
      });
    } catch (error) {
      console.error('Failed to deactivate account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirmationStep === 1) {
      setConfirmationStep(2);
      return;
    }

    if (confirmationStep === 2) {
      setConfirmationStep(3);
      return;
    }

    if (deleteForm.confirmText !== 'מחק לצמיתות') {
      alert('נא הקלד "מחק לצמיתות" בדיוק כפי שמופיע');
      return;
    }

    if (!deleteForm.confirmDeletion) {
      alert('נא אשר שהבנת שהמחיקה היא לצמיתות');
      return;
    }

    setIsLoading(true);
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate account deletion
      alert('החשבון נמחק לצמיתות');
      // In real app, this would redirect to a goodbye page
    } catch (error) {
      console.error('Failed to delete account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadData = async () => {
    try {
      // API call to download user data would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate file download
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('User data export...'));
      element.setAttribute('download', 'jobox-user-data.json');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error('Failed to download data:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Warning Header */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>אזור מסוכן:</strong> הפעולות בחלק זה הן בלתי הפיכות או משפיעות באופן משמעותי על החשבון שלך. 
          אנא קרא בעיון לפני ביצוע כל פעולה.
        </AlertDescription>
      </Alert>

      {/* Account Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right">
            <Shield className="w-5 h-5" />
            סטטיסטיקות החשבון
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{userData.totalConnections}</div>
              <div className="text-sm text-muted-foreground">קשרים</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{userData.totalMessages}</div>
              <div className="text-sm text-muted-foreground">הודעות</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{userData.profileViews}</div>
              <div className="text-sm text-muted-foreground">צפיות בפרופיל</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {Math.floor((Date.now() - new Date(userData.accountCreated).getTime()) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="text-sm text-muted-foreground">ימים בפלטפורמה</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right">
            <Download className="w-5 h-5" />
            ייצוא נתונים
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-right">
            הורד עותק של כל הנתונים שלך מהפלטפורמה, כולל פרופיל, הודעות, וקשרים.
          </p>
          
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
            <Button onClick={handleDownloadData} variant="outline">
              <Download className="w-4 h-4 ml-2" />
              הורד נתונים
            </Button>
            <div className="text-right">
              <p className="font-medium">ייצוא נתוני המשתמש</p>
              <p className="text-sm text-muted-foreground">
                קובץ JSON עם כל המידע שלך
              </p>
            </div>
          </div>

          <Alert>
            <AlertDescription className="text-right">
              הנתונים יכללו את הפרופיל שלך, היסטוריית הודעות, קשרים, והגדרות. 
              הקובץ יישלח אליך באימייל תוך 24 שעות.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Temporary Deactivation */}
      <Card className="border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right text-yellow-800">
            <Pause className="w-5 h-5" />
            השבתה זמנית של החשבון
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-right">
            השבת את החשבון שלך זמנית. תוכל לחזור ולהפעיל אותו בכל עת.
          </p>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2 text-right">מה קורה כשמשביתים את החשבון?</h4>
            <ul className="text-sm text-yellow-700 space-y-1 text-right">
              <li>• הפרופיל שלך לא יהיה גלוי למעסיקים</li>
              <li>• לא תקבל הודעות חדשות</li>
              <li>• לא תופיע בתוצאות חיפוש</li>
              <li>• כל הנתונים שלך יישמרו בבטחה</li>
              <li>• תוכל לחזור ולהפעיל בכל עת</li>
            </ul>
          </div>

          <Button 
            onClick={() => setDeactivateDialog(true)}
            variant="outline"
            className="w-full border-yellow-300 text-yellow-700 hover:bg-yellow-50"
          >
            <Pause className="w-4 h-4 ml-2" />
            השבת חשבון זמנית
          </Button>
        </CardContent>
      </Card>

      {/* Permanent Deletion */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right text-red-800">
            <Trash2 className="w-5 h-5" />
            מחיקת החשבון לצמיתות
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-right">
            מחק את החשבון שלך לצמיתות. <strong>פעולה זו בלתי הפיכה!</strong>
          </p>

          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2 text-right">מה קורה כשמוחקים את החשבון?</h4>
            <ul className="text-sm text-red-700 space-y-1 text-right">
              <li>• כל הנתונים שלך יימחקו לצמיתות</li>
              <li>• הפרופיל שלך יוסר מהפלטפורמה</li>
              <li>• כל ההודעות והקשרים יימחקו</li>
              <li>• לא תוכל לשחזר את החשבון</li>
              <li>• תצטרך להירשם מחדש אם תרצה לחזור</li>
            </ul>
          </div>

          <Button 
            onClick={() => setDeleteDialog(true)}
            variant="destructive"
            className="w-full"
          >
            <Trash2 className="w-4 h-4 ml-2" />
            מחק חשבון לצמיתות
          </Button>
        </CardContent>
      </Card>

      {/* Deactivation Dialog */}
      <Dialog open={deactivateDialog} onOpenChange={setDeactivateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">השבתה זמנית של החשבון</DialogTitle>
          </DialogHeader>
          
          {confirmationStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-right block">מה הסיבה להשבתה?</Label>
                <Select
                  value={deactivateForm.reason}
                  onValueChange={(value) => setDeactivateForm(prev => ({ ...prev, reason: value }))}
                >
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="בחר סיבה" />
                  </SelectTrigger>
                  <SelectContent>
                    {deactivationReasons.map((reason) => (
                      <SelectItem key={reason.value} value={reason.value}>
                        {reason.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-right block">למשך כמה זמן?</Label>
                <Select
                  value={deactivateForm.duration}
                  onValueChange={(value) => setDeactivateForm(prev => ({ ...prev, duration: value }))}
                >
                  <SelectTrigger className="text-right">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {deactivationDurations.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-right block">משוב נוסף (אופציונלי)</Label>
                <Textarea
                  value={deactivateForm.feedback}
                  onChange={(e) => setDeactivateForm(prev => ({ ...prev, feedback: e.target.value }))}
                  placeholder="איך נוכל לשפר את הפלטפורמה?"
                  className="text-right min-h-[80px]"
                  dir="rtl"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setDeactivateDialog(false)}>
                  ביטול
                </Button>
                <Button 
                  onClick={handleDeactivate}
                  disabled={!deactivateForm.reason}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                >
                  המשך
                </Button>
              </div>
            </div>
          )}

          {confirmationStep === 2 && (
            <div className="space-y-4">
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  אתה עומד להשבית את החשבון שלך זמנית. תוכל לחזור ולהפעיל אותו בכל עת.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label className="text-right block">
                  הקלד "השבת זמנית" כדי לאשר:
                </Label>
                <Input
                  value={deactivateForm.confirmText}
                  onChange={(e) => setDeactivateForm(prev => ({ ...prev, confirmText: e.target.value }))}
                  placeholder="השבת זמנית"
                  className="text-right"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setConfirmationStep(1)}>
                  חזור
                </Button>
                <Button 
                  onClick={handleDeactivate}
                  disabled={isLoading || deactivateForm.confirmText !== 'השבת זמנית'}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                >
                  {isLoading ? 'משבית...' : 'השבת חשבון'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Deletion Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right text-red-800">מחיקת החשבון לצמיתות</DialogTitle>
          </DialogHeader>
          
          {confirmationStep === 1 && (
            <div className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>אזהרה:</strong> מחיקת החשבון היא בלתי הפיכה. כל הנתונים שלך יימחקו לצמיתות.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label className="text-right block">מה הסיבה למחיקה?</Label>
                <Select
                  value={deleteForm.reason}
                  onValueChange={(value) => setDeleteForm(prev => ({ ...prev, reason: value }))}
                >
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="בחר סיבה" />
                  </SelectTrigger>
                  <SelectContent>
                    {deletionReasons.map((reason) => (
                      <SelectItem key={reason.value} value={reason.value}>
                        {reason.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-right block">משוב נוסף (אופציונלי)</Label>
                <Textarea
                  value={deleteForm.feedback}
                  onChange={(e) => setDeleteForm(prev => ({ ...prev, feedback: e.target.value }))}
                  placeholder="איך נוכל לשפר את הפלטפורמה?"
                  className="text-right min-h-[80px]"
                  dir="rtl"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setDeleteDialog(false)}>
                  ביטול
                </Button>
                <Button 
                  onClick={handleDelete}
                  disabled={!deleteForm.reason}
                  variant="destructive"
                  className="flex-1"
                >
                  המשך
                </Button>
              </div>
            </div>
          )}

          {confirmationStep === 2 && (
            <div className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <Download className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  לפני המחיקה, האם תרצה להוריד עותק של הנתונים שלך?
                </AlertDescription>
              </Alert>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="download-data"
                  checked={deleteForm.downloadData}
                  onCheckedChange={(checked) => setDeleteForm(prev => ({ ...prev, downloadData: checked }))}
                />
                <Label htmlFor="download-data" className="text-right">
                  כן, הורד את הנתונים שלי לפני המחיקה
                </Label>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setConfirmationStep(1)}>
                  חזור
                </Button>
                <Button 
                  onClick={handleDelete}
                  variant="destructive"
                  className="flex-1"
                >
                  המשך למחיקה
                </Button>
              </div>
            </div>
          )}

          {confirmationStep === 3 && (
            <div className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>שלב אחרון:</strong> אישור סופי למחיקת החשבון
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label className="text-right block">
                  הקלד "מחק לצמיתות" כדי לאשר:
                </Label>
                <Input
                  value={deleteForm.confirmText}
                  onChange={(e) => setDeleteForm(prev => ({ ...prev, confirmText: e.target.value }))}
                  placeholder="מחק לצמיתות"
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-right block">סיסמה נוכחית לאישור:</Label>
                <Input
                  type="password"
                  value={deleteForm.password}
                  onChange={(e) => setDeleteForm(prev => ({ ...prev, password: e.target.value }))}
                  className="text-right"
                />
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="confirm-deletion"
                  checked={deleteForm.confirmDeletion}
                  onCheckedChange={(checked) => setDeleteForm(prev => ({ ...prev, confirmDeletion: checked }))}
                />
                <Label htmlFor="confirm-deletion" className="text-right text-sm">
                  אני מבין שמחיקת החשבון היא בלתי הפיכה וכל הנתונים יימחקו לצמיתות
                </Label>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setConfirmationStep(2)}>
                  חזור
                </Button>
                <Button 
                  onClick={handleDelete}
                  disabled={isLoading || deleteForm.confirmText !== 'מחק לצמיתות' || !deleteForm.confirmDeletion || !deleteForm.password}
                  variant="destructive"
                  className="flex-1"
                >
                  {isLoading ? 'מוחק...' : 'מחק חשבון לצמיתות'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DangerZone;

