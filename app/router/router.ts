export const ROUTES = {
  HOME: "/",
  ABOUT: "#about",
  SKILLS: "#skills",
  PROJECTS: "#projects",
  CONTACT: "#contact",
} as const;

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];

// Helper function to check if a route exists
export const isValidRoute = (route: string): route is Routes => {
  return Object.values(ROUTES).includes(route as Routes);
};

// Helper function to get route by name
export const getRoute = (routeName: keyof typeof ROUTES): Routes => {
  return ROUTES[routeName];
};

// Helper function to scroll to section
export const scrollToSection = (route: Routes) => {
  if (route === "/") return;

  const element = document.querySelector(route);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
