import { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'מחפש עבודה א׳',
      email: 'seeker1@example.com',
      type: 'seeker',
      status: 'active',
      joinDate: '2024-07-15',
      lastActive: '2024-08-17',
      profileComplete: 95,
      isVerified: true
    },
    {
      id: '2',
      name: 'מעסיק א׳',
      email: 'employer1@example.com',
      type: 'employer',
      status: 'pending_verification',
      joinDate: '2024-08-01',
      lastActive: '2024-08-16',
      profileComplete: 80,
      isVerified: false,
      companyName: 'חברת טכנולוגיה מובילה'
    },
    {
      id: '3',
      name: 'מחפש עבודה ב׳',
      email: 'seeker2@example.com',
      type: 'seeker',
      status: 'suspended',
      joinDate: '2024-06-20',
      lastActive: '2024-08-10',
      profileComplete: 60,
      isVerified: false,
      suspensionReason: 'דיווחים על התנהגות לא הולמת'
    }
  ]);

  const [reports, setReports] = useState([
    {
      id: '1',
      reporterId: '2',
      reporterName: 'מעסיק א׳',
      reportedId: '3',
      reportedName: 'מחפש עבודה ב׳',
      type: 'inappropriate_behavior',
      description: 'התנהגות לא מקצועית בצ׳אט',
      status: 'resolved',
      createdDate: '2024-08-10',
      resolvedDate: '2024-08-12',
      adminNotes: 'משתמש הושעה לשבוע'
    },
    {
      id: '2',
      reporterId: '1',
      reporterName: 'מחפש עבודה א׳',
      reportedId: '2',
      reportedName: 'מעסיק א׳',
      type: 'spam',
      description: 'שליחת הודעות ספאם',
      status: 'pending',
      createdDate: '2024-08-15',
      adminNotes: ''
    }
  ]);

  const [ads, setAds] = useState([
    {
      id: '1',
      title: 'קורס פיתוח Full Stack',
      type: 'banner',
      position: 'header',
      status: 'active',
      startDate: '2024-08-01',
      endDate: '2024-09-01',
      clicks: 1250,
      impressions: 15000,
      revenue: 2500,
      advertiser: 'אקדמיית הקוד'
    },
    {
      id: '2',
      title: 'כלי ניהול פרויקטים',
      type: 'sidebar',
      position: 'right',
      status: 'paused',
      startDate: '2024-07-15',
      endDate: '2024-08-15',
      clicks: 890,
      impressions: 12000,
      revenue: 1800,
      advertiser: 'ProjectPro'
    },
    {
      id: '3',
      title: 'ביטוח בריאות למפתחים',
      type: 'inline',
      position: 'search_results',
      status: 'active',
      startDate: '2024-08-10',
      endDate: '2024-09-10',
      clicks: 340,
      impressions: 5000,
      revenue: 850,
      advertiser: 'ביטוח דיגיטל'
    }
  ]);

  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    pendingVerifications: 23,
    totalReports: 45,
    resolvedReports: 38,
    totalRevenue: 15750,
    monthlyGrowth: 12.5
  });

  const verifyUser = async (userId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, isVerified: true, status: 'active' }
          : user
      ));
      
      setStats(prev => ({
        ...prev,
        pendingVerifications: prev.pendingVerifications - 1
      }));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const suspendUser = async (userId, reason) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, status: 'suspended', suspensionReason: reason }
          : user
      ));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const reactivateUser = async (userId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, status: 'active', suspensionReason: undefined }
          : user
      ));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const resolveReport = async (reportId, adminNotes) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setReports(prev => prev.map(report => 
        report.id === reportId 
          ? { 
              ...report, 
              status: 'resolved', 
              resolvedDate: new Date().toISOString().split('T')[0],
              adminNotes 
            }
          : report
      ));
      
      setStats(prev => ({
        ...prev,
        resolvedReports: prev.resolvedReports + 1
      }));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const createAd = async (adData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newAd = {
        id: Date.now().toString(),
        ...adData,
        clicks: 0,
        impressions: 0,
        revenue: 0,
        status: 'active'
      };
      
      setAds(prev => [newAd, ...prev]);
      
      return { success: true, ad: newAd };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateAd = async (adId, updates) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAds(prev => prev.map(ad => 
        ad.id === adId 
          ? { ...ad, ...updates }
          : ad
      ));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteAd = async (adId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAds(prev => prev.filter(ad => ad.id !== adId));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getAnalytics = async (period = 'month') => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock analytics data
      const analytics = {
        period,
        userGrowth: [
          { date: '2024-08-01', users: 1180 },
          { date: '2024-08-08', users: 1205 },
          { date: '2024-08-15', users: 1247 }
        ],
        revenue: [
          { date: '2024-08-01', amount: 12500 },
          { date: '2024-08-08', amount: 14200 },
          { date: '2024-08-15', amount: 15750 }
        ],
        adPerformance: ads.map(ad => ({
          id: ad.id,
          title: ad.title,
          ctr: ((ad.clicks / ad.impressions) * 100).toFixed(2),
          revenue: ad.revenue
        }))
      };
      
      return { success: true, analytics };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const exportData = async (type) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const data = {
        users: type === 'users' ? users : undefined,
        reports: type === 'reports' ? reports : undefined,
        ads: type === 'ads' ? ads : undefined,
        exportDate: new Date().toISOString()
      };
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
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
    getAnalytics,
    exportData,
    // Computed values
    pendingReports: reports.filter(report => report.status === 'pending').length,
    activeAds: ads.filter(ad => ad.status === 'active').length,
    totalAdRevenue: ads.reduce((sum, ad) => sum + ad.revenue, 0),
    pendingVerifications: users.filter(user => user.status === 'pending_verification').length
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;

