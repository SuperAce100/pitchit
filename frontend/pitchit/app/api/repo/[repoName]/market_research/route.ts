import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { repoName: string } }
) {
  try {
    const repoName = params.repoName;
    
    // Path to the .data directory (relative to the project root)
    const dataDir = path.join(process.cwd(), '..', '..', '..', '.data', 'repo_data');
    const repoFilePath = path.join(dataDir, `${repoName}.json`);
    
    // Check if the file exists
    if (!fs.existsSync(repoFilePath)) {
      return NextResponse.json(
        { error: `Repository data for ${repoName} not found` },
        { status: 404 }
      );
    }
    
    // Read the file
    const fileContent = fs.readFileSync(repoFilePath, 'utf-8');
    const repoData = JSON.parse(fileContent);
    
    // Check if market research data exists
    if (!repoData.market_research) {
      return NextResponse.json(
        { error: `Market research data for ${repoName} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(repoData.market_research);
  } catch (error) {
    console.error('Error fetching market research data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market research data' },
      { status: 500 }
    );
  }
} 