import type { MiddlewareHandler } from 'astro';

// Common redirects for mistyped URLs
const redirects: Record<string, string> = {
  '/home': '/',
  '/index': '/',
  '/main': '/',
  '/homepage': '/',
  '/blog': '/news',
  '/articles': '/news',
  '/posts': '/news',
  '/template': '/templates',
  '/example': '/examples',
  '/sample': '/examples',
  '/demos': '/examples',
  '/demo': '/examples',
};

// Handle 404 errors and redirects
export const onRequest: MiddlewareHandler = async (context, next) => {
  const { request, url } = context;
  const pathname = url.pathname;

  // Check for exact redirects first
  if (redirects[pathname]) {
    return Response.redirect(new URL(redirects[pathname], url.origin), 301);
  }

  // Check for trailing slash issues
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const withoutTrailingSlash = pathname.slice(0, -1);
    if (redirects[withoutTrailingSlash]) {
      return Response.redirect(new URL(redirects[withoutTrailingSlash], url.origin), 301);
    }
  }

  // Check for case-insensitive redirects
  const lowerPathname = pathname.toLowerCase();
  if (lowerPathname !== pathname && redirects[lowerPathname]) {
    return Response.redirect(new URL(redirects[lowerPathname], url.origin), 301);
  }

  // Continue with the request
  const response = await next();
  
  // If the response is a 404, ensure proper headers are set
  if (response.status === 404) {
    // Add cache headers to prevent caching of 404 responses
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    // Add custom header for debugging
    response.headers.set('X-Page-Status', '404-Not-Found');
    
    // Log 404 for server-side analytics/monitoring
    console.warn(`404 Not Found: ${pathname} - Referrer: ${request.headers.get('referer') || 'direct'}`);
  }

  return response;
}; 