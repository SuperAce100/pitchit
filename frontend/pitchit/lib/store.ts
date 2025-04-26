import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GitHubRepoData } from './api';

interface RepoStore {
  repoData: GitHubRepoData | null;
  marketResearchGenerated: boolean;
  setRepoData: (data: GitHubRepoData | null) => void;
  setMarketResearchGenerated: (generated: boolean) => void;
  clearRepoData: () => void;
}

export const useRepoStore = create<RepoStore>()(
  persist(
    (set) => ({
      repoData: null,
      marketResearchGenerated: false,
      setRepoData: (data) => set({ repoData: data }),
      setMarketResearchGenerated: (generated) => set({ marketResearchGenerated: generated }),
      clearRepoData: () => set({ repoData: null, marketResearchGenerated: false }),
    }),
    {
      name: 'repo-storage',
    }
  )
); 