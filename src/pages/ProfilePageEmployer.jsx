import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  MapPin, 
  Building, 
  Users, 
  Edit3, 
  Trash2,
  Briefcase,
  Target,
  CheckCircle
} from 'lucide-react';

const ProfilePageEmployer = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [employerData, setEmployerData] = useState({
    id: '1',
    companyName: 'חברת טכנולוגיה מובילה',
    position: 'מנהל משאבי אנוש',
    location: 'תל אביב',
    companySize: '100-500 עובדים',
    industry: 'טכנולוגיה',
    profileImage: null,
    description: 'אנחנו חברת טכנולוגיה מובילה המתמחה בפיתוח פתרונות חדשניים. אנו מחפשים אנשי מקצוע מוכשרים להצטרף לצוות שלנו.',
    hiringFor: [
      'מפתח Full Stack Senior',
      'מהנדס DevOps',
      'מנהל מוצר',
      'מעצב UX/UI'
    ],
    lookingFor: 'אנחנו מחפשים מועמדים עם ניסיון מוכח, יכולת עבודה בצוות, ורצון ללמוד ולהתפתח. חשוב לנו שהמועמדים יהיו בעלי מוטיבציה גבוהה ויכולת פתרון בעיות.',
    benefits: [
      'משכורת תחרותית',
      'אופציות',
      'ביטוח בריאות מורחב',
      'עבודה היברידית',
      'תקציב הכשרות'
    ]
  });

  const [editForm, setEditForm] = useState({ ...employerData });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEmployerData({ ...editForm });
    setIsEditDialogOpen(false);
    // Here you would typically make an API call to update the data
  };

  const handleDelete = () => {
    // Here you would typically make an API call to delete the profile
    console.log('Profile deleted');
    // Redirect to home or login page
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayInputChange = (field, index, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setEditForm(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setEditForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="w-24 h-24">
                <AvatarImage src={employerData.profileImage} />
                <AvatarFallback className="text-2xl">
                  {employerData.companyName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl font-bold">{employerData.companyName}</h1>
                <p className="text-lg text-muted-foreground">{employerData.position}</p>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {employerData.location}
                </div>
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  {employerData.industry}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {employerData.companySize}
                </div>
              </div>
              
              <p className="text-muted-foreground">{employerData.description}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 sm:flex-none">
                  <Edit3 className="ml-2 h-4 w-4" />
                  עריכת פרטים
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>עריכת פרופיל מעסיק</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">שם החברה</Label>
                      <Input
                        id="companyName"
                        value={editForm.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">תפקיד בחברה</Label>
                      <Input
                        id="position"
                        value={editForm.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">מיקום</Label>
                      <Input
                        id="location"
                        value={editForm.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="industry">תחום</Label>
                      <Input
                        id="industry"
                        value={editForm.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="companySize">גודל החברה</Label>
                      <Input
                        id="companySize"
                        value={editForm.companySize}
                        onChange={(e) => handleInputChange('companySize', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">תיאור החברה</Label>
                    <Textarea
                      id="description"
                      value={editForm.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>תפקידים מגויסים</Label>
                    {editForm.hiringFor.map((role, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={role}
                          onChange={(e) => handleArrayInputChange('hiringFor', index, e.target.value)}
                          placeholder="תפקיד"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('hiringFor', index)}
                        >
                          הסר
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('hiringFor')}
                      className="mt-2"
                    >
                      הוסף תפקיד
                    </Button>
                  </div>
                  
                  <div>
                    <Label htmlFor="lookingFor">מה אנחנו מחפשים במועמדים</Label>
                    <Textarea
                      id="lookingFor"
                      value={editForm.lookingFor}
                      onChange={(e) => handleInputChange('lookingFor', e.target.value)}
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>הטבות</Label>
                    {editForm.benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={benefit}
                          onChange={(e) => handleArrayInputChange('benefits', index, e.target.value)}
                          placeholder="הטבה"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('benefits', index)}
                        >
                          הסר
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('benefits')}
                      className="mt-2"
                    >
                      הוסף הטבה
                    </Button>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      ביטול
                    </Button>
                    <Button type="submit">
                      שמור שינויים
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex-1 sm:flex-none">
                  <Trash2 className="ml-2 h-4 w-4" />
                  מחק פרופיל
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>האם אתה בטוח?</AlertDialogTitle>
                  <AlertDialogDescription>
                    פעולה זו תמחק את הפרופיל שלך לצמיתות. לא ניתן לבטל פעולה זו.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>ביטול</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    מחק פרופיל
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Currently Hiring */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                תפקידים פתוחים
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {employerData.hiringFor.map((role, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* What We're Looking For */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                מה אנחנו מחפשים
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {employerData.lookingFor}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>הטבות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {employerData.benefits.map((benefit, index) => (
                  <Badge key={index} variant="secondary">
                    {benefit}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle>פרטי החברה</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="font-medium">תחום: </span>
                <span className="text-muted-foreground">{employerData.industry}</span>
              </div>
              <div>
                <span className="font-medium">גודל: </span>
                <span className="text-muted-foreground">{employerData.companySize}</span>
              </div>
              <div>
                <span className="font-medium">מיקום: </span>
                <span className="text-muted-foreground">{employerData.location}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageEmployer;

