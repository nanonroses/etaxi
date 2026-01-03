import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Validate projectId format (only a-z, 0-9, and dashes)
const isValidProjectId = /^[a-z0-9-]+$/.test(projectId);

// Only create client if projectId is configured and valid
const isConfigured = projectId !== 'placeholder' && isValidProjectId;

export const client = isConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;
