import { onRequestGet as health } from './functions/api/health.js';
import { onRequestPost as generateListing } from './functions/api/generate-listing.js';
import { onRequestPost as publish } from './functions/api/publish.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const context = { request, env };

    if (url.pathname === '/api/health' && request.method === 'GET') {
      return health(context);
    }
    if (url.pathname === '/api/generate-listing' && request.method === 'POST') {
      return generateListing(context);
    }
    if (url.pathname === '/api/publish' && request.method === 'POST') {
      return publish(context);
    }
    if (url.pathname.startsWith('/api/')) {
      return Response.json({ ok: false, error: 'API route not found' }, { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
};
