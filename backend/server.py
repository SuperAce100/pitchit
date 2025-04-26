from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel, HttpUrl
from typing import Optional, Dict, Any
import re
import sys
import os
import json
from pathlib import Path
import uvicorn
import orchestrator
from fastapi.middleware.cors import CORSMiddleware

sys.path.append(str(Path(__file__).parent))
from main import clone_github_repo

app = FastAPI(title="Pitch it", description="Pitch it is a platform for creating and sharing pitches.")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class GitHubRepo(BaseModel):
    repo_url: str
    description: Optional[str] = None

class PitchResponse(BaseModel):
    message: str
    data: Optional[Dict[str, Any]] = None

@app.get("/")
def read_root():
    return {"message": "Loading..."}

def extract_repo_name(repo_url: str) -> str:
    """Extract repository name from GitHub URL."""
    pattern = r"github\.com/[^/]+/([^/]+)"
    match = re.search(pattern, str(repo_url))
    if not match:
        raise HTTPException(status_code=400, detail="Invalid GitHub repository URL")
    return match.group(1)

def extract_username(repo_url: str) -> str:
    """Extract username from GitHub URL."""
    pattern = r"github\.com/([^/]+)/[^/]+"
    match = re.search(pattern, str(repo_url))
    if not match:
        raise HTTPException(status_code=400, detail="Invalid GitHub repository URL")
    return match.group(1)

def create_repo_json(repo_url: str, repo_name: str, repo_path: str, description: Optional[str] = None) -> object:
    # Extract username from the URL
    username = extract_username(repo_url)
    
    # Read README content if it exists
    readme_content = ""
    readme_paths = [
        os.path.join(repo_path, "README.md"),
        os.path.join(repo_path, "Readme.md"),
        os.path.join(repo_path, "readme.md")
    ]
    
    for readme_path in readme_paths:
        if os.path.exists(readme_path):
            try:
                with open(readme_path, 'r', encoding='utf-8') as f:
                    readme_content = f.read()
                break
            except Exception as e:
                print(f"Error reading README: {str(e)}")
    
    
    tree_structure = orchestrator.create_orchestrator_plan(repo_path)
    
    # Create repository data according to schema
    repo_data = {
        "github_repo": {
            "name": repo_name,
            "description": description or "",
            "url": str(repo_url),
            "readme": readme_content,
            "created_by": username,
            "tree": tree_structure
        }
    }
    
    # Create a directory for storing JSON files if it doesn't exist
    json_dir = os.path.join("..", ".data", "repo_data")
    os.makedirs(json_dir, exist_ok=True)
    
    # Save the data to a JSON file
    json_path = os.path.join(json_dir, f"{repo_name}.json")
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(repo_data, f, indent=4)
    
    return json_path

@app.post("/github", response_model=PitchResponse)
def initialize_github_repo(repo: GitHubRepo):
    repo_name = extract_repo_name(repo.repo_url)
    
    try:
        # Clone the repository and get the path
        repo_path = clone_github_repo(str(repo.repo_url), repo_name)
        
        # Create JSON file for the repository
        json_path = create_repo_json(
            repo_url=str(repo.repo_url),
            repo_name=repo_name,
            repo_path=repo_path,
            description=repo.description
        )
        
        return PitchResponse(
            message=f"GitHub repo '{repo_name}' initialized successfully",
            data={
                "repo_name": repo_name, 
                "repo_url": str(repo.repo_url),
                "repo_path": repo_path,
                "json_path": json_path
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to clone repository: {str(e)}")
    
    

@app.post("/github/{repo_name}/orchestrator_plan", response_model=PitchResponse)
def get_orchestrator_plan(repo_name: str, additional_info: Dict[str, Any] = Body({})):
    # Here you would implement the logic to generate the orchestrator plan
    plan_data = {
        "steps": [
            "Analyze repository code and structure",
            "Generate technical brief",
            "Create branding guidelines",
            "Conduct market research",
            "Prepare pitch deck"
        ],
        "timeline": "2 weeks",
        # Add more plan details as needed
    }
    
    return PitchResponse(
        message=f"Orchestrator plan for '{repo_name}' generated successfully",
        data=plan_data
    )

@app.post("/github/{repo_name}/technical_brief", response_model=PitchResponse)
def get_technical_brief(repo_name: str, additional_info: Dict[str, Any] = Body({})):
    # Here you would implement the logic to generate the technical brief
    brief_data = {
        "architecture": "Microservices",
        "technologies": ["Python", "FastAPI", "React", "PostgreSQL"],
        "key_features": ["User authentication", "Data visualization", "API integration"],
        # Add more technical details as needed
    }
    
    return PitchResponse(
        message=f"Technical brief for '{repo_name}' generated successfully",
        data=brief_data
    )

@app.post("/github/{repo_name}/branding", response_model=PitchResponse)
def get_branding(repo_name: str, additional_info: Dict[str, Any] = Body({})):
    # Here you would implement the logic to generate branding information
    branding_data = {
        "name": f"{repo_name.capitalize()} Solutions",
        "tagline": "Innovative solutions for modern problems",
        "color_palette": ["#3498db", "#2ecc71", "#e74c3c", "#f39c12"],
        "target_audience": "Tech-savvy professionals",
        # Add more branding details as needed
    }
    
    return PitchResponse(
        message=f"Branding for '{repo_name}' generated successfully",
        data=branding_data
    )

@app.post("/github/{repo_name}/market_research", response_model=PitchResponse)
def get_market_research(repo_name: str, additional_info: Dict[str, Any] = Body({})):
    # Here you would implement the logic to generate market research
    research_data = {
        "market_size": "$2.5 billion",
        "competitors": ["CompetitorA", "CompetitorB", "CompetitorC"],
        "opportunities": ["Emerging market in Asia", "Growing demand for automation"],
        "challenges": ["Regulatory compliance", "Market saturation"],
        # Add more research details as needed
    }
    
    return PitchResponse(
        message=f"Market research for '{repo_name}' generated successfully",
        data=research_data
    )

@app.post("/github/{repo_name}/pitch_deck", response_model=PitchResponse)
def get_pitch_deck(repo_name: str, additional_info: Dict[str, Any] = Body({})):
    # Here you would implement the logic to generate pitch deck
    pitch_deck_data = {
        "slides": [
            {"title": "Introduction", "content": f"Introducing {repo_name.capitalize()}"},
            {"title": "Problem", "content": "The problem we're solving"},
            {"title": "Solution", "content": "Our innovative solution"},
            {"title": "Market", "content": "Market size and opportunity"},
            {"title": "Business Model", "content": "How we make money"},
            {"title": "Team", "content": "Our exceptional team"},
            {"title": "Ask", "content": "What we're looking for"},
        ],
        "download_url": f"/api/download/pitch_deck/{repo_name}",
        # Add more pitch deck details as needed
    }
    
    return PitchResponse(
        message=f"Pitch deck for '{repo_name}' generated successfully",
        data=pitch_deck_data
    )

def main():
    uvicorn.run(app, host="127.0.0.1", port=8000)

if __name__ == "__main__":
    main()