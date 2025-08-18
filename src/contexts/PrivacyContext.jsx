import { createContext, useContext, useState } from 'react';

const PrivacyContext = createContext();

export const usePrivacy = () => {
  const context = useContext(PrivacyContext);
  if (!context) {
    throw new Error('usePrivacy must be used within a PrivacyProvider');
  }
  return context;
};

export const PrivacyProvider = ({ children }) => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public', // public, private, verified_only
    showSalaryRange: true,
    showLocation: true,
    showExperience: true,
    showSkills: true,
    allowDirectContact: true,
    requireCVApproval: true,
    showOnlineStatus: true,
    allowSearchEngineIndexing: false
  });

  const [blockedCompanies, setBlockedCompanies] = useState([
    {
      id: '1',
      name: 'חברה לא רצויה א׳',
      reason: 'חוויה שלילית בעבר',
      blockedDate: '2024-07-15'
    },
    {
      id: '2',
      name: 'חברה לא רצויה ב׳',
      reason: 'לא מתאים לתחום שלי',
      blockedDate: '2024-06-20'
    }
  ]);

  const [allowedCompanies, setAllowedCompanies] = useState([
    {
      id: '1',
      name: 'Google',
      priority: 'high',
      addedDate: '2024-08-01'
    },
    {
      id: '2',
      name: 'Microsoft',
      priority: 'high',
      addedDate: '2024-08-05'
    },
    {
      id: '3',
      name: 'Meta',
      priority: 'medium',
      addedDate: '2024-08-10'
    }
  ]);

  const [contactRequests, setContactRequests] = useState([
    {
      id: '1',
      companyName: 'חברת טכנולוגיה מובילה',
      position: 'Senior Full Stack Developer',
      recruiterName: 'רחל כהן',
      message: 'שלום, אנחנו מחפשים מפתח מנוסה לצוות שלנו...',
      requestDate: '2024-08-17',
      status: 'pending', // pending, approved, rejected
      salaryRange: '30,000-40,000 ₪'
    },
    {
      id: '2',
      companyName: 'סטארט-אפ חדשני',
      position: 'Tech Lead',
      recruiterName: 'דוד לוי',
      message: 'היי, יש לנו הזדמנות מעניינת בתפקיד הובלה טכנית...',
      requestDate: '2024-08-16',
      status: 'pending',
      salaryRange: '35,000-45,000 ₪'
    }
  ]);

  const updatePrivacySetting = async (setting, value) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPrivacySettings(prev => ({
        ...prev,
        [setting]: value
      }));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const blockCompany = async (companyData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newBlockedCompany = {
        id: Date.now().toString(),
        name: companyData.name,
        reason: companyData.reason || 'לא צוין',
        blockedDate: new Date().toISOString().split('T')[0]
      };
      
      setBlockedCompanies(prev => [newBlockedCompany, ...prev]);
      
      return { success: true, company: newBlockedCompany };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const unblockCompany = async (companyId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setBlockedCompanies(prev => prev.filter(company => company.id !== companyId));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const addAllowedCompany = async (companyData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAllowedCompany = {
        id: Date.now().toString(),
        name: companyData.name,
        priority: companyData.priority || 'medium',
        addedDate: new Date().toISOString().split('T')[0]
      };
      
      setAllowedCompanies(prev => [newAllowedCompany, ...prev]);
      
      return { success: true, company: newAllowedCompany };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const removeAllowedCompany = async (companyId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAllowedCompanies(prev => prev.filter(company => company.id !== companyId));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleContactRequest = async (requestId, action) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setContactRequests(prev => prev.map(request => 
        request.id === requestId 
          ? { ...request, status: action }
          : request
      ));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getPrivacyScore = () => {
    const settings = privacySettings;
    let score = 0;
    let maxScore = 0;
    
    // Calculate privacy score based on settings
    const checks = [
      { setting: settings.profileVisibility === 'private', weight: 20 },
      { setting: !settings.showSalaryRange, weight: 15 },
      { setting: !settings.showLocation, weight: 10 },
      { setting: settings.requireCVApproval, weight: 20 },
      { setting: !settings.allowDirectContact, weight: 15 },
      { setting: !settings.showOnlineStatus, weight: 10 },
      { setting: !settings.allowSearchEngineIndexing, weight: 10 }
    ];
    
    checks.forEach(check => {
      maxScore += check.weight;
      if (check.setting) {
        score += check.weight;
      }
    });
    
    return Math.round((score / maxScore) * 100);
  };

  const getPrivacyRecommendations = () => {
    const recommendations = [];
    
    if (privacySettings.profileVisibility === 'public') {
      recommendations.push({
        type: 'warning',
        message: 'הפרופיל שלך גלוי לכולם. שקול להגביל את הנראות.',
        action: 'הגדר פרופיל פרטי'
      });
    }
    
    if (privacySettings.allowDirectContact && !privacySettings.requireCVApproval) {
      recommendations.push({
        type: 'info',
        message: 'מעסיקים יכולים ליצור איתך קשר ישירות. שקול לדרוש אישור לצפייה בקורות חיים.',
        action: 'הפעל אישור קורות חיים'
      });
    }
    
    if (privacySettings.allowSearchEngineIndexing) {
      recommendations.push({
        type: 'warning',
        message: 'הפרופיל שלך מופיע במנועי חיפוש. זה עלול לחשוף אותך למעסיק הנוכחי.',
        action: 'בטל אינדוקס במנועי חיפוש'
      });
    }
    
    return recommendations;
  };

  const value = {
    privacySettings,
    blockedCompanies,
    allowedCompanies,
    contactRequests,
    updatePrivacySetting,
    blockCompany,
    unblockCompany,
    addAllowedCompany,
    removeAllowedCompany,
    handleContactRequest,
    getPrivacyScore,
    getPrivacyRecommendations,
    // Computed values
    pendingRequests: contactRequests.filter(req => req.status === 'pending').length,
    totalBlockedCompanies: blockedCompanies.length,
    totalAllowedCompanies: allowedCompanies.length
  };

  return (
    <PrivacyContext.Provider value={value}>
      {children}
    </PrivacyContext.Provider>
  );
};

export default PrivacyContext;

