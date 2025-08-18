import { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fontSize, setFontSize] = useState('normal'); // small, normal, large, extra-large

  useEffect(() => {
    // Check for user preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    setReducedMotion(prefersReducedMotion);
    setHighContrast(prefersHighContrast);

    // Load saved preferences
    const savedFontSize = localStorage.getItem('jobox-font-size');
    const savedHighContrast = localStorage.getItem('jobox-high-contrast') === 'true';
    const savedReducedMotion = localStorage.getItem('jobox-reduced-motion') === 'true';

    if (savedFontSize) setFontSize(savedFontSize);
    if (savedHighContrast !== null) setHighContrast(savedHighContrast);
    if (savedReducedMotion !== null) setReducedMotion(savedReducedMotion);
  }, []);

  useEffect(() => {
    // Apply accessibility settings to document
    const root = document.documentElement;
    
    // Font size
    root.setAttribute('data-font-size', fontSize);
    
    // High contrast
    if (highContrast) {
      root.setAttribute('data-high-contrast', 'true');
    } else {
      root.removeAttribute('data-high-contrast');
    }
    
    // Reduced motion
    if (reducedMotion) {
      root.setAttribute('data-reduced-motion', 'true');
    } else {
      root.removeAttribute('data-reduced-motion');
    }

    // Save preferences
    localStorage.setItem('jobox-font-size', fontSize);
    localStorage.setItem('jobox-high-contrast', highContrast.toString());
    localStorage.setItem('jobox-reduced-motion', reducedMotion.toString());
  }, [fontSize, highContrast, reducedMotion]);

  const announce = (message, priority = 'polite') => {
    const id = Date.now();
    const announcement = { id, message, priority };
    
    setAnnouncements(prev => [...prev, announcement]);
    
    // Remove announcement after it's been read
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    }, 3000);
  };

  const increaseFontSize = () => {
    const sizes = ['small', 'normal', 'large', 'extra-large'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex < sizes.length - 1) {
      setFontSize(sizes[currentIndex + 1]);
      announce('גודל הגופן הוגדל');
    }
  };

  const decreaseFontSize = () => {
    const sizes = ['small', 'normal', 'large', 'extra-large'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1]);
      announce('גודל הגופן הוקטן');
    }
  };

  const resetFontSize = () => {
    setFontSize('normal');
    announce('גודל הגופן אופס');
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => {
      const newValue = !prev;
      announce(newValue ? 'מצב ניגודיות גבוהה הופעל' : 'מצב ניגודיות גבוהה בוטל');
      return newValue;
    });
  };

  const toggleReducedMotion = () => {
    setReducedMotion(prev => {
      const newValue = !prev;
      announce(newValue ? 'מצב תנועה מופחתת הופעל' : 'מצב תנועה מופחתת בוטל');
      return newValue;
    });
  };

  // Keyboard navigation helpers
  const handleKeyboardNavigation = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  const focusManagement = {
    trapFocus: (container) => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      container.addEventListener('keydown', handleTabKey);
      return () => container.removeEventListener('keydown', handleTabKey);
    },

    restoreFocus: (previousElement) => {
      if (previousElement && typeof previousElement.focus === 'function') {
        previousElement.focus();
      }
    }
  };

  const value = {
    announcements,
    highContrast,
    reducedMotion,
    fontSize,
    announce,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleHighContrast,
    toggleReducedMotion,
    handleKeyboardNavigation,
    focusManagement
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      
      {/* Screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {announcements
          .filter(a => a.priority === 'polite')
          .map(a => (
            <div key={a.id}>{a.message}</div>
          ))}
      </div>
      
      <div
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
        role="alert"
      >
        {announcements
          .filter(a => a.priority === 'assertive')
          .map(a => (
            <div key={a.id}>{a.message}</div>
          ))}
      </div>
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityProvider;

