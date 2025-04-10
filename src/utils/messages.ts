import fs from 'fs/promises';
import path from 'path';
import { cache } from 'react';

/**
 * Reads the contents of a messages file by locale
 * @param locale The locale code (e.g., 'en', 'it')
 * @returns The parsed JSON content of the messages file
 */
export const getMessagesContent = cache(async function(locale: string) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'messages', `${locale}.json`);
    console.log(`Reading messages file from: ${filePath}`);
    
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading messages file for locale ${locale}:`, error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    return null;
  }
});

/**
 * Gets all experience IDs from the messages file
 * @param locale The locale code (e.g., 'en', 'it')
 * @returns Array of experience IDs
 */
export async function getExperienceIds(locale: string): Promise<string[]> {
  const messages = await getMessagesContent(locale);
  
  if (!messages || !messages.experiences) {
    console.log(`No experiences found for locale: ${locale}`);
    return [];
  }
  
  // Get all keys from the experiences object
  const experienceIds = Object.keys(messages.experiences);
  console.log(`Found experience IDs: ${experienceIds.join(', ')}`);
  
  // Sort experiences by the most recent year in the period field
  return experienceIds.sort((a, b) => {
    const aYear = messages.experiences[a].period.match(/\d{4}/)?.[0] || '0';
    const bYear = messages.experiences[b].period.match(/\d{4}/)?.[0] || '0';
    
    // Sort in descending order (most recent first)
    return parseInt(bYear) - parseInt(aYear);
  });
}

/**
 * Gets all education IDs from the messages file
 * @param locale The locale code (e.g., 'en', 'it')
 * @returns Array of education IDs
 */
export async function getEducationIds(locale: string): Promise<string[]> {
  const messages = await getMessagesContent(locale);
  
  if (!messages || !messages.education) {
    console.log(`No education found for locale: ${locale}`);
    return [];
  }
  
  // Get all keys from the education object except 'title'
  const educationIds = Object.keys(messages.education).filter(key => key !== 'title');
  console.log(`Found education IDs: ${educationIds.join(', ')}`);
  
  // Sort education by the most recent year in the period field
  return educationIds.sort((a, b) => {
    const aYear = messages.education[a].period.match(/\d{4}/)?.[0] || '0';
    const bYear = messages.education[b].period.match(/\d{4}/)?.[0] || '0';
    
    // Sort in descending order (most recent first)
    return parseInt(bYear) - parseInt(aYear);
  });
}
