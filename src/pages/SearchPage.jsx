import { useState, useEffect } from 'react';
import { useSearch } from '@/contexts/SearchContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, MapPin, DollarSign, Clock, Star, Loader2, CheckCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfilePage from './ProfilePage';

const SearchPage = () => {
  const { 
    searchResults, 
    loading, 
    filters, 
    searchCandidates, 
    updateFilters, 
    clearFilters,
    getLocations,
    totalResults
  } = useSearch();

  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    // Load initial results
    searchCandidates();
  }, []);

  const handleSearch = async () => {
    updateFilters(localFilters);
    await searchCandidates(localFilters);
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      keywords: '',
      location: '',
      experience: '',
      salary: '',
      skills: [],
      workType: '',
      availability: ''
    };
    setLocalFilters(emptyFilters);
    updateFilters(emptyFilters);
    clearFilters();
  };

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const CandidateCard = ({ candidate }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
              {candidate.name.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-lg">{candidate.name}</CardTitle>
              <p className="text-muted-foreground">{candidate.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {candidate.isVerified && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            {candidate.isOnline && (
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
        </div>
        
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{candidate.rating}</span>
          <span className="text-sm text-muted-foreground">
            • {candidate.workType} • {candidate.availability}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground">{candidate.bio}</p>
        
        <div className="flex flex-wrap gap-2">
          {candidate.skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {candidate.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{candidate.skills.length - 4}
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1">
            שלח בקשת עניין
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="h-4 w-4 ml-1" />
            <Link to={`/profile/${candidate.id}`} element={<ProfilePage />}>
              צפה בפרופיל
            </Link>
          </Button>
        </div>
        
        {candidate.matchScore && (
          <div className="text-center">
            <Badge variant="outline" className="text-green-600 border-green-600">
              התאמה: {candidate.matchScore}%
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">חיפוש מועמדים</h1>
        <p className="text-muted-foreground">
          מצאו את המועמדים המתאימים ביותר לצרכים שלכם
        </p>
      </div>

      {/* Search Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="keywords">חיפוש חופשי</Label>
              <Input
                id="keywords"
                placeholder="כישורים, תפקיד, חברה..."
                value={localFilters.keywords}
                onChange={(e) => handleFilterChange('keywords', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>מיקום</Label>
              <Select 
                value={localFilters.location} 
                onValueChange={(value) => handleFilterChange('location', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="בחר מיקום" />
                </SelectTrigger>
                <SelectContent>
                  {getLocations().map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>ניסיון</Label>
              <Select 
                value={localFilters.experience} 
                onValueChange={(value) => handleFilterChange('experience', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="שנות ניסיון" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+ שנים</SelectItem>
                  <SelectItem value="3">3+ שנים</SelectItem>
                  <SelectItem value="5">5+ שנים</SelectItem>
                  <SelectItem value="7">7+ שנים</SelectItem>
                  <SelectItem value="10">10+ שנים</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>סוג עבודה</Label>
              <Select 
                value={localFilters.workType} 
                onValueChange={(value) => handleFilterChange('workType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="סוג עבודה" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="במשרד">במשרד</SelectItem>
                  <SelectItem value="מרחוק">מרחוק</SelectItem>
                  <SelectItem value="היברידי">היברידי</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button onClick={handleSearch} disabled={loading} className="flex-1 md:flex-none">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                  מחפש...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 ml-2" />
                  חפש
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleClearFilters}>
              נקה פילטרים
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">תוצאות חיפוש</h2>
          <span className="text-muted-foreground">
            {totalResults} מועמדים נמצאו
          </span>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : searchResults.length === 0 ? (
          <Alert>
            <AlertDescription>
              לא נמצאו מועמדים התואמים לקריטריונים שלכם. נסו לשנות את הפילטרים.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {searchResults.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

