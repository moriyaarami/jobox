import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Phone, 
  Eye, 
  EyeOff, 
  Shield, 
  Key, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

const SecuritySettings = () => {
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [emailDialog, setEmailDialog] = useState(false);
  const [phoneDialog, setPhoneDialog] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [emailForm, setEmailForm] = useState({
    newEmail: '',
    password: ''
  });

  const [phoneForm, setPhoneForm] = useState({
    newPhone: '',
    verificationCode: ''
  });

  const [verificationSent, setVerificationSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock current user data
  const currentUser = {
    email: 'user@example.com',
    phone: '+972-50-1234567',
    lastPasswordChange: '2024-01-15',
    twoFactorEnabled: false,
    loginSessions: 3
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 25) return { text: 'חלשה מאוד', color: 'text-red-600' };
    if (strength < 50) return { text: 'חלשה', color: 'text-orange-600' };
    if (strength < 75) return { text: 'בינונית', color: 'text-yellow-600' };
    if (strength < 100) return { text: 'חזקה', color: 'text-blue-600' };
    return { text: 'חזקה מאוד', color: 'text-green-600' };
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('הסיסמאות החדשות אינן תואמות');
      return;
    }

    setIsLoading(true);
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPasswordDialog(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Failed to change password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = async () => {
    setIsLoading(true);
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 2000));
      setEmailDialog(false);
      setEmailForm({ newEmail: '', password: '' });
    } catch (error) {
      console.error('Failed to change email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = async () => {
    if (!verificationSent) {
      // Send verification code
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVerificationSent(true);
      } catch (error) {
        console.error('Failed to send verification:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Verify code and change phone
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setPhoneDialog(false);
        setPhoneForm({ newPhone: '', verificationCode: '' });
        setVerificationSent(false);
      } catch (error) {
        console.error('Failed to verify phone:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);
  const strengthInfo = getPasswordStrengthText(passwordStrength);

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">החשבון שלך מאובטח</h3>
                <p className="text-sm text-green-700">כל הגדרות האבטחה פעילות ומעודכנות</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              רמת אבטחה: גבוהה
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right">
            <Lock className="w-5 h-5" />
            שינוי סיסמה
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <Button onClick={() => setPasswordDialog(true)}>
              שנה סיסמה
            </Button>
            <div className="text-right">
              <p className="font-medium">סיסמה נוכחית</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                עודכנה לאחרונה: {new Date(currentUser.lastPasswordChange).toLocaleDateString('he-IL')}
              </p>
            </div>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-right">
              <strong>טיפים לסיסמה חזקה:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• לפחות 8 תווים</li>
                <li>• שילוב של אותיות גדולות וקטנות</li>
                <li>• מספרים וסימנים מיוחדים</li>
                <li>• הימנע מסיסמאות נפוצות</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right">
            <Mail className="w-5 h-5" />
            שינוי כתובת אימייל
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <Button onClick={() => setEmailDialog(true)}>
              שנה אימייל
            </Button>
            <div className="text-right">
              <p className="font-medium">אימייל נוכחי</p>
              <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-right">
              שינוי כתובת האימייל ידרוש אימות של הכתובת החדשה. תקבל הודעת אימות לכתובת החדשה.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Phone Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right">
            <Phone className="w-5 h-5" />
            שינוי מספר טלפון
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <Button onClick={() => setPhoneDialog(true)}>
              שנה טלפון
            </Button>
            <div className="text-right">
              <p className="font-medium">טלפון נוכחי</p>
              <p className="text-sm text-muted-foreground">{currentUser.phone}</p>
            </div>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-right">
              שינוי מספר הטלפון ידרוש אימות SMS למספר החדש. ודא שהמספר זמין לקבלת הודעות.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Security Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right">
            <Shield className="w-5 h-5" />
            סטטוס אבטחה
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Badge variant={currentUser.twoFactorEnabled ? "default" : "secondary"}>
                  {currentUser.twoFactorEnabled ? "פעיל" : "לא פעיל"}
                </Badge>
                <h4 className="font-medium">אימות דו-שלבי</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                הגנה נוספת על החשבון שלך
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="default">{currentUser.loginSessions}</Badge>
                <h4 className="font-medium">התחברויות פעילות</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                מכשירים מחוברים כרגע
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium text-right">פעילות אחרונה</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-muted-foreground">היום 14:30</span>
                <span>התחברות מ-Chrome (Windows)</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-muted-foreground">אתמול 09:15</span>
                <span>התחברות מ-Safari (iPhone)</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-muted-foreground">לפני 3 ימים</span>
                <span>שינוי הגדרות פרופיל</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialog} onOpenChange={setPasswordDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">שינוי סיסמה</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-right block">סיסמה נוכחית</Label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="text-right pl-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute left-0 top-0 h-full px-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-right block">סיסמה חדשה</Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="text-right pl-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute left-0 top-0 h-full px-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              
              {passwordForm.newPassword && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={strengthInfo.color}>{strengthInfo.text}</span>
                    <span>חוזק הסיסמה</span>
                  </div>
                  <Progress value={passwordStrength} className="h-2" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-right block">אישור סיסמה חדשה</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="text-right pl-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute left-0 top-0 h-full px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              
              {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                <p className="text-sm text-red-600 text-right">הסיסמאות אינן תואמות</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setPasswordDialog(false)}>
                ביטול
              </Button>
              <Button 
                onClick={handlePasswordChange}
                disabled={isLoading || !passwordForm.currentPassword || !passwordForm.newPassword || passwordForm.newPassword !== passwordForm.confirmPassword}
                className="flex-1"
              >
                {isLoading ? 'משנה...' : 'שנה סיסמה'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Change Dialog */}
      <Dialog open={emailDialog} onOpenChange={setEmailDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">שינוי כתובת אימייל</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-right block">כתובת אימייל חדשה</Label>
              <Input
                type="email"
                value={emailForm.newEmail}
                onChange={(e) => setEmailForm(prev => ({ ...prev, newEmail: e.target.value }))}
                placeholder="example@email.com"
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-right block">סיסמה נוכחית לאישור</Label>
              <Input
                type="password"
                value={emailForm.password}
                onChange={(e) => setEmailForm(prev => ({ ...prev, password: e.target.value }))}
                className="text-right"
              />
            </div>

            <Alert>
              <AlertDescription className="text-right">
                נשלח אימות לכתובת החדשה. עליך לאמת את הכתובת תוך 24 שעות.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEmailDialog(false)}>
                ביטול
              </Button>
              <Button 
                onClick={handleEmailChange}
                disabled={isLoading || !emailForm.newEmail || !emailForm.password}
                className="flex-1"
              >
                {isLoading ? 'משנה...' : 'שנה אימייל'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Phone Change Dialog */}
      <Dialog open={phoneDialog} onOpenChange={setPhoneDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">שינוי מספר טלפון</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-right block">מספר טלפון חדש</Label>
              <Input
                type="tel"
                value={phoneForm.newPhone}
                onChange={(e) => setPhoneForm(prev => ({ ...prev, newPhone: e.target.value }))}
                placeholder="050-1234567"
                className="text-right"
                disabled={verificationSent}
              />
            </div>

            {verificationSent && (
              <div className="space-y-2">
                <Label className="text-right block">קוד אימות</Label>
                <Input
                  type="text"
                  value={phoneForm.verificationCode}
                  onChange={(e) => setPhoneForm(prev => ({ ...prev, verificationCode: e.target.value }))}
                  placeholder="123456"
                  className="text-right"
                  maxLength={6}
                />
                <p className="text-sm text-muted-foreground text-right">
                  נשלח קוד אימות ל-{phoneForm.newPhone}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => {
                setPhoneDialog(false);
                setVerificationSent(false);
                setPhoneForm({ newPhone: '', verificationCode: '' });
              }}>
                ביטול
              </Button>
              <Button 
                onClick={handlePhoneChange}
                disabled={isLoading || !phoneForm.newPhone || (verificationSent && !phoneForm.verificationCode)}
                className="flex-1"
              >
                {isLoading ? 'מעבד...' : verificationSent ? 'אמת ושנה' : 'שלח קוד אימות'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecuritySettings;

