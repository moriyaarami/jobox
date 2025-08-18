import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CreditCard, 
  Download, 
  Eye, 
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const BillingPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');

  // Mock billing data
  const billingStats = {
    totalRevenue: 45000,
    successfulHires: 18,
    pendingPayments: 3,
    averageCommission: 2500
  };

  const invoices = [
    {
      id: 'INV-001',
      candidateName: 'מועמד א׳',
      position: 'Senior Full Stack Developer',
      hireDate: '2024-08-15',
      salary: 30000,
      commission: 3000,
      status: 'paid',
      paidDate: '2024-08-20'
    },
    {
      id: 'INV-002',
      candidateName: 'מועמד ב׳',
      position: 'UX/UI Designer',
      hireDate: '2024-08-10',
      salary: 25000,
      commission: 2500,
      status: 'pending',
      dueDate: '2024-08-25'
    },
    {
      id: 'INV-003',
      candidateName: 'מועמד ג׳',
      position: 'Project Manager',
      hireDate: '2024-08-05',
      salary: 35000,
      commission: 3500,
      status: 'overdue',
      dueDate: '2024-08-20'
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'credit-card',
      last4: '4532',
      brand: 'Visa',
      isDefault: true
    },
    {
      id: 2,
      type: 'bank-transfer',
      bankName: 'בנק הפועלים',
      accountLast4: '1234',
      isDefault: false
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">שולם</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">ממתין לתשלום</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">פיגור בתשלום</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">חיוב ותשלומים</h1>
          <p className="text-muted-foreground">
            ניהול חשבוניות ותשלומים עבור גיוסים מוצלחים
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">החודש הנוכחי</SelectItem>
              <SelectItem value="last-month">החודש הקודם</SelectItem>
              <SelectItem value="last-3-months">3 חודשים אחרונים</SelectItem>
              <SelectItem value="last-year">השנה האחרונה</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="ml-2 h-4 w-4" />
            ייצא דוח
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">סה״כ הכנסות</p>
                <p className="text-2xl font-bold">₪{billingStats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">גיוסים מוצלחים</p>
                <p className="text-2xl font-bold">{billingStats.successfulHires}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">תשלומים ממתינים</p>
                <p className="text-2xl font-bold">{billingStats.pendingPayments}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">עמלה ממוצעת</p>
                <p className="text-2xl font-bold">₪{billingStats.averageCommission.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoices */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>חשבוניות אחרונות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(invoice.status)}
                      <div>
                        <h4 className="font-medium">{invoice.candidateName}</h4>
                        <p className="text-sm text-muted-foreground">{invoice.position}</p>
                        <p className="text-xs text-muted-foreground">
                          גויס ב-{new Date(invoice.hireDate).toLocaleDateString('he-IL')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">₪{invoice.commission.toLocaleString()}</span>
                        {getStatusBadge(invoice.status)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {invoice.status === 'paid' 
                          ? `שולם ב-${new Date(invoice.paidDate).toLocaleDateString('he-IL')}`
                          : `תאריך יעד: ${new Date(invoice.dueDate).toLocaleDateString('he-IL')}`
                        }
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>אמצעי תשלום</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {method.type === 'credit-card' 
                          ? `${method.brand} ****${method.last4}`
                          : `${method.bankName} ****${method.accountLast4}`
                        }
                      </p>
                      {method.isDefault && (
                        <Badge variant="secondary" className="text-xs">ברירת מחדל</Badge>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    ערוך
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                הוסף אמצעי תשלום
              </Button>
            </CardContent>
          </Card>

          {/* Commission Info */}
          <Card>
            <CardHeader>
              <CardTitle>מידע על עמלות</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium mb-2">מודל העמלות שלנו:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• 10% מהשכר החודשי הראשון</li>
                  <li>• תשלום רק בגיוס מוצלח</li>
                  <li>• ללא עלויות נסתרות</li>
                  <li>• תנאי תשלום: 30 יום</li>
                </ul>
              </div>
              <div className="pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  התשלום מתבצע אוטומטית לאחר אישור הגיוס המוצלח
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>פעולות מהירות</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="ml-2 h-4 w-4" />
                הגדר תזכורות תשלום
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="ml-2 h-4 w-4" />
                הורד דוח שנתי
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="ml-2 h-4 w-4" />
                עדכן פרטי תשלום
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;

