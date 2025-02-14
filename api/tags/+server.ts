import { PUBLIC_STORYBLOK_TOKEN } from '$env/static/public';
import StoryblokClient from 'storyblok-js-client';
import { json } from '@sveltejs/kit';

const Storyblok = new StoryblokClient({
  accessToken: PUBLIC_STORYBLOK_TOKEN,
  region: 'us',
  https: true
});

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://app.storyblok.com',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export async function GET({ request }) {
  // Handle preflight request
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const response = await Storyblok.get('cdn/tags', {});
    
    // Transform the tags into the desired format
    const formattedTags = response.data.tags.map(tag => ({
      value: tag.name,
      key: tag.name
    }));

    // Return the formatted tags as a JSON response with CORS headers
    return json(formattedTags, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching tags:', error);
    
    // Return a 500 error response if something goes wrong, with CORS headers
    return new Response(JSON.stringify({ error: 'Failed to fetch tags' }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
}

// Handle OPTIONS requests for CORS preflight
export function OPTIONS() {
  return new Response(null, { headers: corsHeaders });
}