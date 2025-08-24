import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
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
  Clock, 
  DollarSign, 
  Star, 
  MessageCircle, 
  Heart,
  Share2,
  Eye,
  EyeOff,
  Shield,
  Verified,
  Edit3,
  Trash2,
  Upload,
  FileText,
  Download
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ProfilePage = () => {
  const { id } = useParams();
  const [isInterested, setIsInterested] = useState(false);
  const [cvRequested, setCvRequested] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const fileInputRef = useRef(null);

  const { user } = useAuth();

  // Mock candidate data - now as state to allow editing
  const [candidate, setCandidate] = useState({
    id: id || '1',
    name: 'מועמד מקצועי',
    title: 'מפתח Full Stack Senior',
    location: 'תל אביב',
    experience: '7+ שנים',
    salary: '28,000-35,000 ₪',
    rating: 4.9,
    isVerified: true,
    isOnline: true,
    profileImage: null,
    bio: 'מפתח תוכנה מנוסה עם התמחות בטכנולוגיות מודרניות. בעל ניסיון רב בפיתוח אפליקציות web ומובייל. אוהב לעבוד בצוות ולקחת אחריות על פרויקטים מורכבים.',
    skills: [
      'React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 
      'MongoDB', 'PostgreSQL', 'GraphQL', 'Redis', 'Kubernetes', 'Git'
    ],
    languages: ['עברית - שפת אם', 'אנגלית - רמה גבוהה', 'ערבית - בסיסי'],
    education: [
      {
        degree: 'תואר ראשון במדעי המחשב',
        institution: 'אוניברסיטת תל אביב',
        year: '2016-2020'
      }
    ],
    experience_details: [
      {
        title: 'Senior Full Stack Developer',
        company: 'חברת טכנולוגיה מובילה',
        period: '2021-עכשיו',
        description: 'פיתוח ותחזוקה של מערכות web מורכבות, הובלת צוות פיתוח קטן'
      },
      {
        title: 'Full Stack Developer',
        company: 'סטארט-אפ בתחום הפינטק',
        period: '2019-2021',
        description: 'פיתוח מערכת תשלומים מתקדמת, עבודה עם API-ים חיצוניים'
      }
    ],
    preferences: {
      workType: 'היברידי',
      availability: 'זמין להתחלה מיידית',
      remoteWork: true
    },
    cvFileName: null
  });

  const [editForm, setEditForm] = useState({ ...candidate });

  const handleInterest = () => {
    setIsInterested(!isInterested);
  };

  const handleCvRequest = () => {
    setCvRequested(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setCandidate({ ...editForm });
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

  const handleObjectInputChange = (field, subField, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value
      }
    }));
  };

  const addArrayItem = (field) => {
    if (field === 'experience_details') {
      setEditForm(prev => ({
        ...prev,
        [field]: [...prev[field], { title: '', company: '', period: '', description: '' }]
      }));
    } else if (field === 'education') {
      setEditForm(prev => ({
        ...prev,
        [field]: [...prev[field], { degree: '', institution: '', year: '' }]
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [field]: [...prev[field], '']
      }));
    }
  };

  const removeArrayItem = (field, index) => {
    setEditForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleCvUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setCvFile(file);
      setCandidate(prev => ({
        ...prev,
        cvFileName: file.name
      }));
      // Here you would typically upload the file to your backend
      console.log('CV uploaded:', file.name);
    } else {
      alert('אנא בחר קובץ PDF בלבד');
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="w-24 h-24">
                <AvatarImage src={candidate.profileImage} />
                <AvatarFallback className="text-2xl">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center justify-center mt-2 gap-1">
                {candidate.isOnline && (
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                )}
                <span className="text-xs text-muted-foreground">
                  {candidate.isOnline ? 'מחובר עכשיו' : 'לא מחובר'}
                </span>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{candidate.name}</h1>
                  {candidate.isVerified && (
                    <Verified className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <p className="text-lg text-muted-foreground">{candidate.title}</p>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {candidate.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {candidate.experience}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {candidate.salary}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {candidate.rating}
                </div>
              </div>
              
              <p className="text-muted-foreground">{candidate.bio}</p>
            </div>
          </div>
          {id!==user.id ?<div className="flex flex-wrap gap-3 mt-6">
            <Button 
              onClick={handleInterest}
              variant={isInterested ? "default" : "outline"}
              className="flex-1 sm:flex-none"
            >
              <Heart className={`ml-2 h-4 w-4 ${isInterested ? 'fill-current' : ''}`} />
              {isInterested ? 'מעוניין' : 'סמן כמעוניין'}
            </Button>
            
            <Button 
              onClick={handleCvRequest}
              disabled={cvRequested}
              className="flex-1 sm:flex-none"
            >
              {cvRequested ? (
                <>
                  <EyeOff className="ml-2 h-4 w-4" />
                  בקשה נשלחה
                </>
              ) : (
                <>
                  <Eye className="ml-2 h-4 w-4" />
                  בקש לראות קורות חיים
                </>
              )}
            </Button>
            
            <Button variant="outline" className="flex-1 sm:flex-none">
              <MessageCircle className="ml-2 h-4 w-4" />
              שלח הודעה
            </Button>
            
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div> :(<>
            {/* Profile Management Buttons */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <Edit3 className="ml-2 h-4 w-4" />
                  עריכת פרטים
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>עריכת פרופיל</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">שם מלא</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">תפקיד</Label>
                      <Input
                        id="title"
                        value={editForm.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
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
                      <Label htmlFor="experience">ניסיון</Label>
                      <Input
                        id="experience"
                        value={editForm.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="salary">שכר מבוקש</Label>
                      <Input
                        id="salary"
                        value={editForm.salary}
                        onChange={(e) => handleInputChange('salary', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">תיאור אישי</Label>
                    <Textarea
                      id="bio"
                      value={editForm.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>כישורים</Label>
                    {editForm.skills.map((skill, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={skill}
                          onChange={(e) => handleArrayInputChange('skills', index, e.target.value)}
                          placeholder="כישור"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('skills', index)}
                        >
                          הסר
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('skills')}
                      className="mt-2"
                    >
                      הוסף כישור
                    </Button>
                  </div>
                  
                  <div>
                    <Label>שפות</Label>
                    {editForm.languages.map((language, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={language}
                          onChange={(e) => handleArrayInputChange('languages', index, e.target.value)}
                          placeholder="שפה ורמה"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('languages', index)}
                        >
                          הסר
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('languages')}
                      className="mt-2"
                    >
                      הוסף שפה
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="workType">סוג עבודה</Label>
                      <Input
                        id="workType"
                        value={editForm.preferences.workType}
                        onChange={(e) => handleObjectInputChange('preferences', 'workType', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="availability">זמינות</Label>
                      <Input
                        id="availability"
                        value={editForm.preferences.availability}
                        onChange={(e) => handleObjectInputChange('preferences', 'availability', e.target.value)}
                      />
                    </div>
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

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleCvUpload}
              accept=".pdf"
              style={{ display: 'none' }}
            />
            
            <Button variant="outline" onClick={triggerFileUpload} className="flex-1 sm:flex-none">
              <Upload className="ml-2 h-4 w-4" />
              העלה קורות חיים
            </Button>
            
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
          </>
          
          )
          
          }
          

         
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>כישורים טכניים</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle>ניסיון תעסוקתי</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {candidate.experience_details.map((exp, index) => (
                <div key={index} className="border-r-2 border-primary pr-4">
                  <h4 className="font-semibold">{exp.title}</h4>
                  <p className="text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                  <p className="mt-2">{exp.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle>השכלה</CardTitle>
            </CardHeader>
            <CardContent>
              {candidate.education.map((edu, index) => (
                <div key={index}>
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <p className="text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.year}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* CV File */}
          {candidate.cvFileName && (
            <Card>
              <CardHeader>
                <CardTitle>קורות חיים</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="text-sm truncate">{candidate.cvFileName}</span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Languages */}
          <Card>
            <CardHeader>
              <CardTitle>שפות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {candidate.languages.map((lang, index) => (
                  <div key={index} className="text-sm">
                    {lang}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>העדפות עבודה</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="font-medium">סוג עבודה: </span>
                <span className="text-muted-foreground">{candidate.preferences.workType}</span>
              </div>
              <div>
                <span className="font-medium">זמינות: </span>
                <span className="text-muted-foreground">{candidate.preferences.availability}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm">פרופיל מאומת</span>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">הגנת פרטיות</p>
                  <p className="text-muted-foreground">
                    פרטי הקשר יחשפו רק לאחר אישור המועמד לבקשת הקורות חיים
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

