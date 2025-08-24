import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data
  const mockUsers = {
    'seeker@example.com': {
      id: '1',
      email: 'seeker@example.com',
      name: 'מחפש עבודה',
      type: 'seeker',
      profile: {
        title: 'מפתח Full Stack Senior',
        location: 'תל אביב',
        experience: '7+ שנים',
        skills: ['React', 'Node.js', 'TypeScript', 'Python']
      }
    },
    'employer@example.com': {
      id: '2',
      email: 'employer@example.com',
      name: 'מעסיק',
      type: 'employer',
      company: {
        name: 'חברת טכנולוגיה מובילה',
        size: '50-100 עובדים',
        industry: 'טכנולוגיה'
      }
    }
  };

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('jobox_token');
    const userData = localStorage.getItem('jobox_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('jobox_token');
        localStorage.removeItem('jobox_user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    try {
      // Mock authentication - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const user = mockUsers[email];
      if (user && password === 'password123') {
        const token = 'mock_jwt_token_' + Date.now();
        
        localStorage.setItem('jobox_token', token);
        localStorage.setItem('jobox_user', JSON.stringify(user));
        setUser(user);
        
        return { success: true, user };
      } else {
        throw new Error('אימייל או סיסמה שגויים');
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    
    try {
      // Mock signup - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        type: userData.type,
        ...(userData.type === 'seeker' ? {
          profile: {
            title: userData.title || '',
            location: userData.location || '',
            experience: userData.experience || '',
            skills: userData.skills || []
          }
        } : {
          company: {
            name: userData.companyName || '',
            size: userData.companySize || '',
            industry: userData.industry || ''
          }
        })
      };
      
      const token = 'mock_jwt_token_' + Date.now();
      
      localStorage.setItem('jobox_token', token);
      localStorage.setItem('jobox_user', JSON.stringify(newUser));
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('jobox_token');
    localStorage.removeItem('jobox_user');
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    
    try {
      // Mock profile update - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...user,
        ...(user.type === 'seeker' ? {
          profile: { ...user.profile, ...profileData }
        } : {
          company: { ...user.company, ...profileData }
        })
      };
      
      localStorage.setItem('jobox_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // OAuth login simulation
 /*  const loginWithGoogle = async () => {
    setLoading(true);
    
    try {
      // Mock Google OAuth - in real app, this would integrate with Google OAuth
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const googleUser = {
        id: 'google_' + Date.now(),
        email: 'user@gmail.com',
        name: 'משתמש Google',
        type: 'seeker',
        provider: 'google',
        profile: {
          title: '',
          location: '',
          experience: '',
          skills: []
        }
      };
      
      const token = 'mock_google_token_' + Date.now();
      
      localStorage.setItem('jobox_token', token);
      localStorage.setItem('jobox_user', JSON.stringify(googleUser));
      setUser(googleUser);
      
      return { success: true, user: googleUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const loginWithLinkedIn = async () => {
    setLoading(true);
    
    try {
      // Mock LinkedIn OAuth - in real app, this would integrate with LinkedIn OAuth
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const linkedInUser = {
        id: 'linkedin_' + Date.now(),
        email: 'user@linkedin.com',
        name: 'משתמש LinkedIn',
        type: 'seeker',
        provider: 'linkedin',
        profile: {
          title: 'Senior Developer',
          location: 'תל אביב',
          experience: '5+ שנים',
          skills: ['JavaScript', 'React', 'Node.js']
        }
      };
      
      const token = 'mock_linkedin_token_' + Date.now();
      
      localStorage.setItem('jobox_token', token);
      localStorage.setItem('jobox_user', JSON.stringify(linkedInUser));
      setUser(linkedInUser);
      
      return { success: true, user: linkedInUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }; */

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
   /*  loginWithGoogle,
    loginWithLinkedIn, */
    isAuthenticated: !!user,
    isSeeker: user?.type === 'seeker',
    isEmployer: user?.type === 'employer'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

