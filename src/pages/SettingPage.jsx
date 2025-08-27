
import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  HelpCircle, 
  Shield, 
  AlertTriangle,
  User,
  Save,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Toaster } from 'sonner';

// Import our settings components
import NotificationSettings from '@/components/settings/NotificationSettings';
import SupportInformation from '@/components/settings/SupportInformation';
import SecuritySettings from '@/components/settings/SecuritySettings';
import DangerZone from '@/components/settings/DangerZone';

const SettingsPage = () => {
  const toast = Toaster;

  const [activeTab, setActiveTab] = useState('notifications');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock user data
  const currentUser = {
    name: 'יוסי כהן',
    email: 'yossi.cohen@example.com',
    userType: 'job_seeker', // or 'employer'
    accountStatus: 'active',
    memberSince: '2023-06-15',
    lastLogin: new Date().toISOString()
  };

  const handleNotificationSave = (settings) => {
    setHasUnsavedChanges(false);
    toast({
      title: "הגדרות התראות נשמרו",
      description: "ההגדרות החדשות יכנסו לתוקף מיידית.",
      duration: 3000,
    });
  };

  const tabsConfig = [
    {
      id: 'notifications',
      label: 'התראות',
      icon: Bell,
      description: 'נהל התראות דחיפה ואימייל',
      component: NotificationSettings,
      props: { onSave: handleNotificationSave }
    },
    {
      id: 'support',
      label: 'תמיכה ומידע',
      icon: HelpCircle,
      description: 'עזרה, תנאי שימוש ויצירת קשר',
      component: SupportInformation,
      props: {}
    },
    {
      id: 'security',
      label: 'אבטחה',
      icon: Shield,
      description: 'סיסמה, אימייל וטלפון',
      component: SecuritySettings,
      props: {}
    },
    {
      id: 'danger',
      label: 'אזור מסוכן',
      icon: AlertTriangle,
      description: 'השבתה ומחיקת חשבון',
      component: DangerZone,
      props: {},
      dangerous: true
    }
  ];

  const getUserTypeLabel = (userType) => {
    return userType === 'job_seeker' ? 'מחפש עבודה' : 'מעסיק';
  };

  const getAccountStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'פעיל', variant: 'default', color: 'bg-green-100 text-green-800' },
      inactive: { label: 'לא פעיל', variant: 'secondary', color: 'bg-gray-100 text-gray-800' },
      suspended: { label: 'מושעה', variant: 'destructive', color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="text-right">
              <CardTitle className="text-2xl flex items-center gap-2 justify-end">
                <Settings className="w-6 h-6" />
                הגדרות
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                נהל את החשבון והעדפות שלך
              </p>
            </div>
            
            <div className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-semibold">{currentUser.name}</span>
                {getAccountStatusBadge(currentUser.accountStatus)}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>{getUserTypeLabel(currentUser.userType)}</p>
                <p>חבר מאז: {new Date(currentUser.memberSince).toLocaleDateString('he-IL')}</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Unsaved changes alert */}
      {hasUnsavedChanges && (
        <Alert className="border-amber-200 bg-amber-50">
          <Save className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            יש לך שינויים שלא נשמרו. אל תשכח לשמור לפני שתעזוב את הדף.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          {tabsConfig.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`flex flex-col items-center gap-2 p-4 h-auto ${
                  tab.dangerous ? 'data-[state=active]:bg-red-50 data-[state=active]:text-red-700' : ''
                }`}
              >
                <IconComponent className={`w-5 h-5 ${tab.dangerous ? 'text-red-600' : ''}`} />
                <div className="text-center">
                  <div className="font-medium">{tab.label}</div>
                  <div className="text-xs text-muted-foreground hidden md:block">
                    {tab.description}
                  </div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Tab Contents */}
        {tabsConfig.map((tab) => {
          const ComponentToRender = tab.component;
          return (
            <TabsContent key={tab.id} value={tab.id} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-right">
                    <tab.icon className={`w-5 h-5 ${tab.dangerous ? 'text-red-600' : ''}`} />
                    {tab.label}
                  </CardTitle>
                  <p className="text-muted-foreground text-right">
                    {tab.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ComponentToRender {...tab.props} />
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-blue-900">
              זקוק לעזרה נוספת?
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('support')}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                <HelpCircle className="w-4 h-4 ml-2" />
                מרכז העזרה
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('mailto:support@jobox.co.il', '_blank')}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                צור קשר עם התמיכה
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <div className="text-center text-sm text-muted-foreground py-4">
        <p>
          הגדרות אלו חלות על החשבון שלך בפלטפורמת Jobox. 
          לשאלות נוספות, <button 
            onClick={() => setActiveTab('support')} 
            className="text-blue-600 hover:underline"
          >
            צור קשר עמנו
          </button>.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;




/* import { useAuth } from "@/contexts/AuthContext";
import { SetLogInStorage } from "@/LocalStorage/logInStorage";
import { Button } from "@/components/ui/button";
const SettingPage=()=>{
    
    const {logout} = useAuth();

    const handleOnClick=()=>{
        confirm("Are you sure you want to log out?") && (
            logout(),
            SetLogInStorage('false')
        );
    }

    return(
        <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">הגדרות</h1>
           <Button size="lg" variant="destructive" onClick={handleOnClick}>
              התנתק
            </Button>
        </div>
    )
}

export default SettingPage; */