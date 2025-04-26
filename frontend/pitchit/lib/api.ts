// API utility functions for interacting with the backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface GitHubRepoData {
  name: string;
  description: string;
  url: string;
  readme: string;
  created_by: string;
  tree: string;
}

export interface Competitor {
  name: string;
  description: string;
  market_share: string;
  strengths: string;
  weaknesses: string;
}

export interface MarketResearchData {
  market_name: string;
  market_summary: string;
  market_size: string;
  market_growth: string;
  competitors: Competitor[];
}

export interface PitchDeckData {
  slide_1_title: {
    company_name: string;
    tagline: string;
  };
  slide_2_problem: {
    problem_statement: string;
    why_now: string;
  };
  slide_3_solution: {
    product_overview: string;
    key_features: string[];
    unique_value_proposition: string;
  };
  slide_4_market_opportunity: {
    target_market: string;
    market_size: string;
    market_growth: string;
  };
  slide_5_product_demonstration: {
    how_it_works: string;
    user_experience_highlights: string;
  };
  slide_6_business_model: {
    revenue_streams: string;
    pricing_strategy: string;
  };
  slide_7_roadmap: {
    milestones_achieved: string[];
    future_plans: string[];
  };
  slide_8_call_to_action: {
    funding_needs: string;
    use_of_funds: string;
    vision_statement: string;
  };
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

/**
 * Fetches repository data from the backend
 * @param repoUrl GitHub repository URL
 * @returns Repository data
 */
export async function fetchRepoData(repoUrl: string): Promise<GitHubRepoData> {
  try {
    // First, initialize the repository
    const initResponse = await fetch(`${API_BASE_URL}/github`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repo_url: repoUrl }),
    }).catch(error => {
      console.error('Network error when initializing repository:', error);
      throw new Error('Failed to connect to the backend server. Please make sure the server is running.');
    });

    if (!initResponse.ok) {
      throw new Error(`Failed to initialize repository: ${initResponse.statusText}`);
    }

    const initData: ApiResponse<{ repo_name: string }> = await initResponse.json();
    
    // Then, fetch the repository data from the .data directory
    const repoResponse = await fetch(`/api/repo/${initData.data.repo_name}`).catch(error => {
      console.error('Network error when fetching repository data:', error);
      throw new Error('Failed to fetch repository data from the API route.');
    });
    
    if (!repoResponse.ok) {
      throw new Error(`Failed to fetch repository data: ${repoResponse.statusText}`);
    }
    
    const repoData = await repoResponse.json();
    return repoData.github_repo;
  } catch (error) {
    console.error('Error fetching repository data:', error);
    throw error;
  }
}

/**
 * Fetches pitch deck data from the backend
 * @param repoName Repository name
 * @returns Pitch deck data
 */
export async function fetchPitchDeckData(repoName: string): Promise<PitchDeckData> {
  try {
    const response = await fetch(`${API_BASE_URL}/github/${repoName}/pitch_deck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }).catch(error => {
      console.error('Network error when fetching pitch deck data:', error);
      throw new Error('Failed to connect to the backend server. Please make sure the server is running.');
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch pitch deck data: ${response.statusText}`);
    }

    const data: ApiResponse<PitchDeckData> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching pitch deck data:', error);
    throw error;
  }
}

/**
 * Fetches market research data from the backend
 * @param repoName Repository name
 * @returns Market research data
 */
export async function fetchMarketResearchData(repoName: string): Promise<MarketResearchData> {
  try {
    const response = await fetch(`${API_BASE_URL}/github/${repoName}/market_research`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }).catch(error => {
      console.error('Network error when fetching market research data:', error);
      throw new Error('Failed to connect to the backend server. Please make sure the server is running.');
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch market research data: ${response.statusText}`);
    }

    const data: ApiResponse<MarketResearchData> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching market research data:', error);
    throw error;
  }
} 