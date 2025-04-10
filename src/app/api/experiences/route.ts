import { NextResponse } from 'next/server';
import { getExperienceIds } from '@/utils/messages';

export async function GET(request: Request) {
  try {
    // Get the locale from the URL or query parameter
    const url = new URL(request.url);
    const locale = url.searchParams.get('locale') || 'it';
    
    console.log(`API: Fetching experience IDs for locale: ${locale}`);
    
    // Get the experience IDs for the specified locale (now awaiting the async function)
    const experienceIds = await getExperienceIds(locale);
    
    console.log(`API: Found ${experienceIds.length} experience IDs`);
    
    // Return the experience IDs as JSON
    return NextResponse.json({ experienceIds });
  } catch (error) {
    console.error('Error in experiences API route:', error);
    return NextResponse.json({ error: 'Failed to fetch experiences', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
