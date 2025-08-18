import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Routes, getRouteProps } from '@/lib/routes';
import { Mail, Lock, Eye, EyeOff, User, Building2 } from 'lucide-react';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('seeker');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    companyName: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement signup logic
    console.log('Signup attempt:', { ...formData, userType });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12">
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">הצטרפו ל-Jobox</h1>
          <p className="text-muted-foreground">
            צרו חשבון חדש והתחילו את המסע שלכם
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Type Selection */}
          <div className="space-y-3">
            <Label>סוג המשתמש</Label>
            <RadioGroup value={userType} onValueChange={setUserType} className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="seeker" id="seeker" />
                <Label htmlFor="seeker" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  מחפש עבודה
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="employer" id="employer" />
                <Label htmlFor="employer" className="flex items-center gap-2 cursor-pointer">
                  <Building2 className="h-4 w-4" />
                  מעסיק
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Personal Information */}
          {userType === 'seeker' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">שם פרטי</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="שם פרטי"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">שם משפחה</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="שם משפחה"
                />
              </div>
            </div>
          )}

          {/* Company Information */}
          {userType === 'employer' && (
            <div className="space-y-2">
              <Label htmlFor="companyName">שם החברה</Label>
              <Input
                id="companyName"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                placeholder="שם החברה"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">כתובת אימייל</Label>
            <div className="relative">
              <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="pr-10"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">סיסמה</Label>
            <div className="relative">
              <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                className="pr-10 pl-10"
                placeholder="בחרו סיסמה חזקה"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute left-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">אישור סיסמה</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="הזינו שוב את הסיסמה"
            />
          </div>

          <Button type="submit" className="w-full">
            הרשמה
          </Button>
        </form>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">או</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              Google
            </Button>
            <Button variant="outline" className="w-full">
              LinkedIn
            </Button>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            כבר יש לכם חשבון?{' '}
            <Link 
              to={Routes.login} 
              {...getRouteProps(Routes.login)}
              className="font-medium text-primary hover:underline"
            >
              היכנסו כאן
            </Link>
          </p>
          <Link 
            to={Routes.home} 
            {...getRouteProps(Routes.home)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            חזרה לדף הבית
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

