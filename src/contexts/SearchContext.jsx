import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    keywords: '',
    location: '',
    experience: '',
    salary: '',
    skills: [],
    workType: '',
    availability: ''
  });

  // Mock candidate data
  const mockCandidates = [
    {
      id: '1',
      name: 'מועמד מקצועי א׳',
      title: 'מפתח Full Stack Senior',
      location: 'תל אביב',
      experience: '7+ שנים',
      salary: '28,000-35,000 ₪',
      rating: 4.9,
      isVerified: true,
      isOnline: true,
      skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'],
      workType: 'היברידי',
      availability: 'זמין מיידית',
      bio: 'מפתח תוכנה מנוסה עם התמחות בטכנולוגיות מודרניות',
      matchScore: 95
    },
    {
      id: '2',
      name: 'מועמד מקצועי ב׳',
      title: 'UX/UI Designer Senior',
      location: 'תל אביב',
      experience: '5+ שנים',
      salary: '22,000-28,000 ₪',
      rating: 4.7,
      isVerified: true,
      isOnline: false,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      workType: 'מרחוק',
      availability: 'זמין בעוד חודש',
      bio: 'מעצב UX/UI עם ניסיון בחברות טכנולוגיה מובילות',
      matchScore: 88
    },
    {
      id: '3',
      name: 'מועמד מקצועי ג׳',
      title: 'Data Scientist',
      location: 'חיפה',
      experience: '4+ שנים',
      salary: '25,000-32,000 ₪',
      rating: 4.8,
      isVerified: true,
      isOnline: true,
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'R'],
      workType: 'במשרד',
      availability: 'זמין מיידית',
      bio: 'מדען נתונים עם התמחות בלמידת מכונה ובינה מלאכותית',
      matchScore: 82
    },
    {
      id: '4',
      name: 'מועמד מקצועי ד׳',
      title: 'DevOps Engineer',
      location: 'ירושלים',
      experience: '6+ שנים',
      salary: '30,000-38,000 ₪',
      rating: 4.6,
      isVerified: false,
      isOnline: true,
      skills: ['AWS', 'Kubernetes', 'Docker', 'Jenkins', 'Terraform'],
      workType: 'היברידי',
      availability: 'זמין בעוד שבועיים',
      bio: 'מהנדס DevOps עם ניסיון בפריסת מערכות בענן',
      matchScore: 79
    },
    {
      id: '5',
      name: 'מועמד מקצועי ה׳',
      title: 'Product Manager',
      location: 'תל אביב',
      experience: '8+ שנים',
      salary: '35,000-45,000 ₪',
      rating: 4.9,
      isVerified: true,
      isOnline: false,
      skills: ['Product Strategy', 'Agile', 'Analytics', 'User Research'],
      workType: 'היברידי',
      availability: 'זמין בעוד חודש',
      bio: 'מנהל מוצר בכיר עם ניסיון בהובלת מוצרים דיגיטליים',
      matchScore: 91
    },
    {
      id: '6',
      name: 'מועמד מקצועי ו׳',
      title: 'Frontend Developer',
      location: 'רמת גן',
      experience: '3+ שנים',
      salary: '18,000-25,000 ₪',
      rating: 4.4,
      isVerified: true,
      isOnline: true,
      skills: ['React', 'Vue.js', 'JavaScript', 'CSS', 'HTML'],
      workType: 'מרחוק',
      availability: 'זמין מיידית',
      bio: 'מפתח Frontend צעיר ומוכשר עם תשוקה לטכנולוגיות חדשות',
      matchScore: 76
    }
  ];

  const searchCandidates = async (searchFilters = filters) => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let results = [...mockCandidates];
      
      // Filter by keywords (title, skills, bio)
      if (searchFilters.keywords) {
        const keywords = searchFilters.keywords.toLowerCase();
        results = results.filter(candidate => 
          candidate.title.toLowerCase().includes(keywords) ||
          candidate.bio.toLowerCase().includes(keywords) ||
          candidate.skills.some(skill => skill.toLowerCase().includes(keywords))
        );
      }
      
      // Filter by location
      if (searchFilters.location) {
        results = results.filter(candidate => 
          candidate.location.includes(searchFilters.location)
        );
      }
      
      // Filter by experience
      if (searchFilters.experience) {
        const expNum = parseInt(searchFilters.experience);
        results = results.filter(candidate => {
          const candidateExp = parseInt(candidate.experience);
          return candidateExp >= expNum;
        });
      }
      
      // Filter by work type
      if (searchFilters.workType) {
        results = results.filter(candidate => 
          candidate.workType === searchFilters.workType
        );
      }
      
      // Filter by skills
      if (searchFilters.skills && searchFilters.skills.length > 0) {
        results = results.filter(candidate =>
          searchFilters.skills.some(skill =>
            candidate.skills.some(candidateSkill =>
              candidateSkill.toLowerCase().includes(skill.toLowerCase())
            )
          )
        );
      }
      
      // Sort by match score
      results.sort((a, b) => b.matchScore - a.matchScore);
      
      setSearchResults(results);
      return { success: true, results };
    } catch (error) {
      console.error('Search error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      keywords: '',
      location: '',
      experience: '',
      salary: '',
      skills: [],
      workType: '',
      availability: ''
    });
    setSearchResults([]);
  };

  const getPopularSkills = () => {
    return [
      'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
      'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL',
      'Figma', 'Adobe XD', 'Machine Learning', 'DevOps', 'Agile'
    ];
  };

  const getLocations = () => {
    return [
      'תל אביב', 'ירושלים', 'חיפה', 'רמת גן', 'פתח תקווה',
      'באר שבע', 'נתניה', 'רחובות', 'הרצליה', 'כפר סבא'
    ];
  };

  const value = {
    searchResults,
    loading,
    filters,
    searchCandidates,
    updateFilters,
    clearFilters,
    getPopularSkills,
    getLocations,
    totalResults: searchResults.length
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;

