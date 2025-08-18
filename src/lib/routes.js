// Centralized routing structure for Jobox
export const Routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  onboarding: "/onboarding",
  seekerDash: "/seeker/dashboard",
  employerDash: "/employer/dashboard",
  search: "/search",
  profile: (id) => `/profile/${id}`,
  messages: "/messages",
  billing: "/billing",
  admin: "/admin",
  ads: "/ads",
  settings: "/settings",
  support: "/support",
  termsSeekers: "/terms-seekers",
  termsEmployers: "/terms-employers",
  privacy: "/privacy",
  notFound: "/404"
};

// Helper function to get route with data-route attribute
export const getRouteProps = (route) => ({
  'data-route': route
});

// Navigation helper
export const navigate = (route) => {
  if (typeof route === 'function') {
    throw new Error('Route function requires parameters');
  }
  return route;
};

