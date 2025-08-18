import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  Ban,
  Play,
  Pause,
  Trash2,
  Plus,
  Download,
  BarChart3,
  Shield,
  MessageSquare
} from 'lucide-react';

const AdminPage = () => {
  const { 
    users, 
    reports, 
    ads, 
    stats,
    verifyUser,
    suspendUser,
    reactivateUser,
    resolveReport,
    createAd,
    updateAd,
    deleteAd,
    exportData,
    pendingReports,
    activeAds,
    totalAdRevenue,
    pendingVerifications
  } = useAdmin();

  const [selectedTab, setSelectedTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [newAdData, setNewAdData] = useState({
    title: '',
    type: 'banner',
    position: 'header',
    advertiser: '',
    startDate: '',
    endDate: ''
  });

  const handleVerifyUser = async (userId) => {
    setLoading(true);
    await verifyUser(userId);
    setLoading(false);
  };

  const handleSuspendUser = async (userId, reason) => {
    setLoading(true);
    await suspendUser(userId, reason);
    setLoading(false);
  };

  const handleReactivateUser = async (userId) => {
    setLoading(true);
    await reactivateUser(userId);
    setLoading(false);
  };

  const handleResolveReport = async (reportId, notes) => {
    setLoading(true);
    await resolveReport(reportId, notes);
    setLoading(false);
  };

  const handleCreateAd = async () => {
    setLoading(true);
    const result = await createAd(newAdData);
    if (result.success) {
      setNewAdData({
        title: '',
        type: 'banner',
        position: 'header',
        advertiser: '',
        startDate: '',
        endDate: ''
      });
    }
    setLoading(false);
  };

  const handleUpdateAdStatus = async (adId, status) => {
    setLoading(true);
    await updateAd(adId, { status });
    setLoading(false);
  };

  const handleDeleteAd = async (adId) => {
    setLoading(true);
    await deleteAd(adId);
    setLoading(false);
  };

  const handleExportData = async (type) => {
    setLoading(true);
    const result = await exportData(type);
    if (result.success) {
      // In a real app, this would trigger a download
      console.log('Exported data:', result.data);
    }
    setLoading(false);
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: 'default',
      pending_verification: 'secondary',
      suspended: 'destructive',
      resolved: 'default',
      pending: 'secondary',
      paused: 'outline'
    };
    
    const labels = {
      active: 'פעיל',
      pending_verification: 'ממתין לאימות',
      suspended: 'מושעה',
      resolved: 'נפתר',
      pending: 'ממתין',
      paused: 'מושהה'
    };

    return (
      <Badge variant={variants[status] || 'outline'}>
        {labels[status] || status}
      </Badge>
    );
  };

  const StatCard = ({ title, value, icon: Icon, trend, color = 'blue' }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline ml-1" />
                {trend}% מהחודש הקודם
              </p>
            )}
          </div>
          <Icon className={`h-8 w-8 text-${color}-600`} />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">פאנל ניהול</h1>
          <p className="text-muted-foreground">ניהול משתמשים, דיווחים ופרסומות</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExportData('users')}>
            <Download className="h-4 w-4 ml-2" />
            ייצא נתונים
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
          <TabsTrigger value="users">ניהול משתמשים</TabsTrigger>
          <TabsTrigger value="reports">דיווחים</TabsTrigger>
          <TabsTrigger value="ads">ניהול פרסומות</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="סה״כ משתמשים"
              value={stats.totalUsers.toLocaleString()}
              icon={Users}
              trend={stats.monthlyGrowth}
              color="blue"
            />
            <StatCard
              title="משתמשים פעילים"
              value={stats.activeUsers.toLocaleString()}
              icon={CheckCircle}
              color="green"
            />
            <StatCard
              title="דיווחים פתוחים"
              value={pendingReports}
              icon={AlertTriangle}
              color="yellow"
            />
            <StatCard
              title="הכנסות מפרסומות"
              value={`₪${totalAdRevenue.toLocaleString()}`}
              icon={DollarSign}
              color="green"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>פעולות דרושות</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-yellow-600" />
                    <span>אימותים ממתינים</span>
                  </div>
                  <Badge variant="secondary">{pendingVerifications}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-red-600" />
                    <span>דיווחים פתוחים</span>
                  </div>
                  <Badge variant="destructive">{pendingReports}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    <span>פרסומות פעילות</span>
                  </div>
                  <Badge variant="default">{activeAds}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>פעילות אחרונה</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">משתמש חדש נרשם</p>
                  <p className="text-muted-foreground">לפני 2 שעות</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">דיווח חדש התקבל</p>
                  <p className="text-muted-foreground">לפני 4 שעות</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">פרסומת הופעלה</p>
                  <p className="text-muted-foreground">לפני יום</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ניהול משתמשים</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(user.status)}
                          <Badge variant="outline">{user.type === 'seeker' ? 'מחפש עבודה' : 'מעסיק'}</Badge>
                          {user.isVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {user.status === 'pending_verification' && (
                        <Button size="sm" onClick={() => handleVerifyUser(user.id)} disabled={loading}>
                          <CheckCircle className="h-4 w-4 ml-1" />
                          אמת
                        </Button>
                      )}
                      {user.status === 'active' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Ban className="h-4 w-4 ml-1" />
                              השעה
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>השעיית משתמש</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Label>סיבת השעיה</Label>
                              <Textarea placeholder="הזן סיבה להשעיה..." />
                              <Button onClick={() => handleSuspendUser(user.id, 'הפרת תנאי השימוש')}>
                                השעה משתמש
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                      {user.status === 'suspended' && (
                        <Button size="sm" onClick={() => handleReactivateUser(user.id)} disabled={loading}>
                          <Play className="h-4 w-4 ml-1" />
                          הפעל מחדש
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ניהול דיווחים</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{report.reporterName} דיווח על {report.reportedName}</p>
                        <p className="text-sm text-muted-foreground">סוג: {report.type}</p>
                      </div>
                      {getStatusBadge(report.status)}
                    </div>
                    <p className="text-sm">{report.description}</p>
                    {report.status === 'pending' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 ml-1" />
                            פתור דיווח
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>פתרון דיווח</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Label>הערות מנהל</Label>
                            <Textarea placeholder="הזן הערות על הפתרון..." />
                            <Button onClick={() => handleResolveReport(report.id, 'דיווח נפתר')}>
                              סמן כנפתר
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    {report.adminNotes && (
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm font-medium">הערות מנהל:</p>
                        <p className="text-sm">{report.adminNotes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ads" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">ניהול פרסומות</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  הוסף פרסומת
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>פרסומת חדשה</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>כותרת</Label>
                    <Input 
                      value={newAdData.title}
                      onChange={(e) => setNewAdData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="כותרת הפרסומת"
                    />
                  </div>
                  <div>
                    <Label>מפרסם</Label>
                    <Input 
                      value={newAdData.advertiser}
                      onChange={(e) => setNewAdData(prev => ({ ...prev, advertiser: e.target.value }))}
                      placeholder="שם המפרסם"
                    />
                  </div>
                  <div>
                    <Label>סוג פרסומת</Label>
                    <Select value={newAdData.type} onValueChange={(value) => setNewAdData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="banner">באנר</SelectItem>
                        <SelectItem value="sidebar">סייד-בר</SelectItem>
                        <SelectItem value="inline">בתוך התוכן</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreateAd} disabled={loading}>
                    צור פרסומת
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ads.map((ad) => (
              <Card key={ad.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{ad.title}</CardTitle>
                    {getStatusBadge(ad.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">מפרסם</p>
                      <p className="text-muted-foreground">{ad.advertiser}</p>
                    </div>
                    <div>
                      <p className="font-medium">סוג</p>
                      <p className="text-muted-foreground">{ad.type}</p>
                    </div>
                    <div>
                      <p className="font-medium">קליקים</p>
                      <p className="text-muted-foreground">{ad.clicks.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-medium">הכנסות</p>
                      <p className="text-muted-foreground">₪{ad.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {ad.status === 'active' && (
                      <Button size="sm" variant="outline" onClick={() => handleUpdateAdStatus(ad.id, 'paused')}>
                        <Pause className="h-4 w-4 ml-1" />
                        השהה
                      </Button>
                    )}
                    {ad.status === 'paused' && (
                      <Button size="sm" onClick={() => handleUpdateAdStatus(ad.id, 'active')}>
                        <Play className="h-4 w-4 ml-1" />
                        הפעל
                      </Button>
                    )}
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteAd(ad.id)}>
                      <Trash2 className="h-4 w-4 ml-1" />
                      מחק
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;

