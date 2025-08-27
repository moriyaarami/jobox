import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Volume2, VolumeX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const NotificationSettings = ({ onSave }) => {
  const [settings, setSettings] = useState({
    // Push notifications
    pushEnabled: true,
    pushNewMessages: true,
    pushJobMatches: true,
    pushInterviews: true,
    pushPayments: false,
    pushMarketing: false,
    
    // Email notifications
    emailEnabled: true,
    emailNewMessages: false,
    emailJobMatches: true,
    emailInterviews: true,
    emailPayments: true,
    emailWeeklyDigest: true,
    emailMarketing: false,
    
    // Notification timing
    quietHoursEnabled: true,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
    
    // Frequency settings
    emailFrequency: 'immediate', // immediate, daily, weekly
    pushFrequency: 'immediate'
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSave) {
        onSave(settings);
      }
      
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save notification settings:', error);
    }
  };

  const notificationTypes = [
    {
      key: 'newMessages',
      title: 'הודעות חדשות',
      description: 'התראות על הודעות חדשות ממעסיקים או מועמדים',
      icon: Mail,
      important: true
    },
    {
      key: 'jobMatches',
      title: 'התאמות עבודה',
      description: 'התראות על הזדמנויות עבודה רלוונטיות',
      icon: Bell,
      important: true
    },
    {
      key: 'interviews',
      title: 'ראיונות עבודה',
      description: 'תזכורות לראיונות ועדכונים על סטטוס',
      icon: Bell,
      important: true
    },
    {
      key: 'payments',
      title: 'תשלומים וחיובים',
      description: 'עדכונים על תשלומים, חשבוניות ועמלות',
      icon: Bell,
      important: false
    },
    {
      key: 'marketing',
      title: 'שיווק וקידום',
      description: 'הצעות מיוחדות, עדכוני מוצר וחדשות הפלטפורמה',
      icon: Bell,
      important: false
    }
  ];

  const frequencyOptions = [
    { value: 'immediate', label: 'מיידי' },
    { value: 'daily', label: 'יומי' },
    { value: 'weekly', label: 'שבועי' }
  ];

  return (
    <div className="space-y-6">
      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right">
            <Smartphone className="w-5 h-5" />
            התראות דחיפה (Push)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Master toggle */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <Switch
              checked={settings.pushEnabled}
              onCheckedChange={(checked) => handleSettingChange('pushEnabled', checked)}
              id="push-master"
            />
            <div className="text-right flex-1">
              <Label htmlFor="push-master" className="text-base font-semibold">
                הפעל התראות דחיפה
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                התראות מיידיות למכשיר הנייד שלך
              </p>
            </div>
          </div>

          {settings.pushEnabled && (
            <div className="space-y-4">
              {notificationTypes.map((type) => {
                const IconComponent = type.icon;
                const pushKey = `push${type.key.charAt(0).toUpperCase() + type.key.slice(1)}`;
                
                return (
                  <div key={type.key} className="flex items-center justify-between py-3">
                    <Switch
                      checked={settings[pushKey]}
                      onCheckedChange={(checked) => handleSettingChange(pushKey, checked)}
                      id={`push-${type.key}`}
                    />
                    <div className="text-right flex-1">
                      <div className="flex items-center gap-2 justify-end mb-1">
                        <Label htmlFor={`push-${type.key}`} className="font-medium">
                          {type.title}
                        </Label>
                        <IconComponent className="w-4 h-4 text-muted-foreground" />
                        {type.important && (
                          <Badge variant="secondary" className="text-xs">
                            חשוב
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                  </div>
                );
              })}

              <Separator />

              {/* Push frequency */}
              <div className="flex items-center justify-between">
                <Select
                  value={settings.pushFrequency}
                  onValueChange={(value) => handleSettingChange('pushFrequency', value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Label className="text-right">תדירות התראות דחיפה</Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right">
            <Mail className="w-5 h-5" />
            התראות אימייל
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Master toggle */}
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <Switch
              checked={settings.emailEnabled}
              onCheckedChange={(checked) => handleSettingChange('emailEnabled', checked)}
              id="email-master"
            />
            <div className="text-right flex-1">
              <Label htmlFor="email-master" className="text-base font-semibold">
                הפעל התראות אימייל
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                עדכונים חשובים לתיבת המייל שלך
              </p>
            </div>
          </div>

          {settings.emailEnabled && (
            <div className="space-y-4">
              {notificationTypes.map((type) => {
                const IconComponent = type.icon;
                const emailKey = `email${type.key.charAt(0).toUpperCase() + type.key.slice(1)}`;
                
                return (
                  <div key={type.key} className="flex items-center justify-between py-3">
                    <Switch
                      checked={settings[emailKey]}
                      onCheckedChange={(checked) => handleSettingChange(emailKey, checked)}
                      id={`email-${type.key}`}
                    />
                    <div className="text-right flex-1">
                      <div className="flex items-center gap-2 justify-end mb-1">
                        <Label htmlFor={`email-${type.key}`} className="font-medium">
                          {type.title}
                        </Label>
                        <IconComponent className="w-4 h-4 text-muted-foreground" />
                        {type.important && (
                          <Badge variant="secondary" className="text-xs">
                            חשוב
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Weekly digest */}
              <div className="flex items-center justify-between py-3 border-t">
                <Switch
                  checked={settings.emailWeeklyDigest}
                  onCheckedChange={(checked) => handleSettingChange('emailWeeklyDigest', checked)}
                  id="email-digest"
                />
                <div className="text-right flex-1">
                  <Label htmlFor="email-digest" className="font-medium">
                    סיכום שבועי
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    סיכום שבועי של הפעילות והזדמנויות חדשות
                  </p>
                </div>
              </div>

              <Separator />

              {/* Email frequency */}
              <div className="flex items-center justify-between">
                <Select
                  value={settings.emailFrequency}
                  onValueChange={(value) => handleSettingChange('emailFrequency', value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Label className="text-right">תדירות התראות אימייל</Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right">
            {settings.quietHoursEnabled ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
            שעות שקט
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Switch
              checked={settings.quietHoursEnabled}
              onCheckedChange={(checked) => handleSettingChange('quietHoursEnabled', checked)}
              id="quiet-hours"
            />
            <div className="text-right flex-1">
              <Label htmlFor="quiet-hours" className="font-medium">
                הפעל שעות שקט
              </Label>
              <p className="text-sm text-muted-foreground">
                ללא התראות דחיפה בשעות שקט (אימייל עדיין יישלח)
              </p>
            </div>
          </div>

          {settings.quietHoursEnabled && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label className="text-right block">שעת סיום</Label>
                <Select
                  value={settings.quietHoursEnd}
                  onValueChange={(value) => handleSettingChange('quietHoursEnd', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-right block">שעת התחלה</Label>
                <Select
                  value={settings.quietHoursStart}
                  onValueChange={(value) => handleSettingChange('quietHoursStart', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      {hasChanges && (
        <div className="flex justify-center">
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            שמור הגדרות התראות
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;

