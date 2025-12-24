import { useUser } from "@/composables/modules/auth/user";

export default defineNuxtRouteMiddleware((to) => {
  const { token } = useUser();
  const isLoggedIn = Boolean(token.value);

  // Public pages that don't need authentication
  const publicRoutes = [
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/verify-login',
    '/verify',
    '/welcome',
    '/privacy-policy',
    '/terms-of-use',
    '/account-selection'
  ];

  const isPublicRoute =
    publicRoutes.includes(to.path) ||
    publicRoutes.some(route => to.path.startsWith(route + '/'));

  if (!isLoggedIn && !isPublicRoute) {
    return navigateTo('/login');
  }

  if (isLoggedIn && ['/login', '/register'].includes(to.path)) {
    return navigateTo('/');
  }

  // ✅ Otherwise, continue
});
