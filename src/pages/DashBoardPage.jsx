import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming an AuthContext exists
import { Button } from '../components/ui/button'; // Assuming Shadcn/UI button
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'; // Assuming Shadcn/UI card

const DashboardPage = () => {
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  if (!user) {
    // Optionally redirect if user is not logged in, or show a message
    navigate('/login');
    return null; // Or a loading spinner
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">ברוך הבא, {user.name || 'משתמש'}!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg mb-6">זהו הדף הראשי שלך לאחר ההתחברות.</p>
          <div className="space-y-4">
            <Button className="w-full" onClick={() => navigate('/profile')}>
              צפה בפרופיל שלך
            </Button>
            <Button className="w-full" onClick={() => navigate('/search')}>
              חפש משרות
            </Button>
            <Button className="w-full" onClick={() => navigate('/chat')}>
              הודעות
            </Button>
            <Button className="w-full" variant="destructive" onClick={handleLogout}>
              התנתק
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;


