import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GitHubRepoData } from './api';

interface RepoStore {
  repoData: GitHubRepoData | null;
  marketResearchGenerated: boolean;
  technicalBriefGenerated: boolean;
  brandingGenerated: boolean;
  pitchDeckGenerated: boolean;
  setRepoData: (data: GitHubRepoData | null) => void;
  setMarketResearchGenerated: (generated: boolean) => void;
  setTechnicalBriefGenerated: (generated: boolean) => void;
  setBrandingGenerated: (generated: boolean) => void;
  setPitchDeckGenerated: (generated: boolean) => void;
  clearRepoData: () => void;
}

export const useRepoStore = create<RepoStore>()(
  persist(
    (set) => ({
      repoData: null,
      marketResearchGenerated: false,
      technicalBriefGenerated: false,
      brandingGenerated: false,
      pitchDeckGenerated: false,
      setRepoData: (data) => set({ repoData: data }),
      setMarketResearchGenerated: (generated) => set({ marketResearchGenerated: generated }),
      setTechnicalBriefGenerated: (generated) => set({ technicalBriefGenerated: generated }),
      setBrandingGenerated: (generated) => set({ brandingGenerated: generated }),
      setPitchDeckGenerated: (generated) => set({ pitchDeckGenerated: generated }),
      clearRepoData: () => set({ 
        repoData: null, 
        marketResearchGenerated: false,
        technicalBriefGenerated: false,
        brandingGenerated: false,
        pitchDeckGenerated: false
      }),
    }),
    {
      name: 'repo-storage',
    }
  )
); 