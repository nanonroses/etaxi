import { client } from './sanity.client';

// Types para los documentos de Sanity
export interface SiteSettings {
  title: string;
  description: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
}

export interface AppDownload {
  headline: string;
  subheadline?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  qrImage?: any;
}

export interface Benefit {
  title: string;
  description: string;
  icon?: string;
}

export interface HomePage {
  heroTitle: string;
  heroSubtitle: string;
  benefits?: Benefit[];
  safetyIntro?: string;
}

export interface SafetySection {
  title: string;
  description: string;
  icon?: string;
}

export interface SafetyPage {
  title: string;
  intro: string;
  sections?: SafetySection[];
}

export interface Regulation {
  title: string;
  description: string;
  icon?: string;
}

export interface CompliancePage {
  title: string;
  intro: string;
  lawMention: string;
  extraNotes?: string;
  regulations?: Regulation[];
}

export interface EnterpriseBenefit {
  title: string;
  description: string;
}

export interface GuildBenefit {
  title: string;
  body: string;
}

export interface BusinessPage {
  heroTitle: string;
  heroSubtitle: string;
  enterpriseBenefits?: EnterpriseBenefit[];
  guildIntro?: string;
  guildBenefits?: GuildBenefit[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButton?: string;
}

// Queries
export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!client) return null;

  try {
    const query = '*[_type == "siteSettings"][0]';
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export async function getAppDownload(): Promise<AppDownload | null> {
  if (!client) return null;

  try {
    const query = '*[_type == "appDownload"][0]';
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching app download:', error);
    return null;
  }
}

export async function getHomePage(): Promise<HomePage | null> {
  if (!client) return null;

  try {
    const query = '*[_type == "homePage"][0]';
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching home page:', error);
    return null;
  }
}

export async function getSafetyPage(): Promise<SafetyPage | null> {
  if (!client) return null;

  try {
    const query = '*[_type == "safetyPage"][0]';
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching safety page:', error);
    return null;
  }
}

export async function getCompliancePage(): Promise<CompliancePage | null> {
  if (!client) return null;

  try {
    const query = '*[_type == "compliancePage"][0]';
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching compliance page:', error);
    return null;
  }
}

export async function getBusinessPage(): Promise<BusinessPage | null> {
  if (!client) return null;

  try {
    const query = '*[_type == "businessPage"][0]';
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching business page:', error);
    return null;
  }
}
