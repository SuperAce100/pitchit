import requests
import os
import json
from pathlib import Path

def test_github_clone():
    """Test the GitHub repository cloning functionality."""
    
    # URL of your FastAPI server
    base_url = "http://localhost:8000"
    
    # GitHub repository to clone (using a public repository for testing)
    test_repo = {
        "repo_url": "https://github.com/mrTSB/marketmind",
        "description": "Test marketmindrepository for cloning"
    }
    
    print(f"Testing GitHub clone with repository: {test_repo['repo_url']}")
    
    try:
        # Send request to the /github endpoint
        response = requests.post(
            f"{base_url}/github",
            json=test_repo
        )
        
        # Check if request was successful
        response.raise_for_status()
        
        # Parse response
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        # Verify response contains expected data
        assert "data" in result, "Response missing 'data' field"
        assert "repo_path" in result["data"], "Response missing 'repo_path' field"
        
        # Get repository path from response
        repo_path = result["data"]["repo_path"]
        
        # Check if directory exists
        assert os.path.exists(repo_path), f"Repository directory not found at {repo_path}"
        
        # Check if it's a git repository by looking for .git directory
        git_dir = Path(repo_path) / ".git"
        assert git_dir.exists(), f"Not a git repository: .git directory not found in {repo_path}"
        
        print(f"✅ Test passed! Repository successfully cloned to {repo_path}")
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"❌ HTTP request failed: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response status code: {e.response.status_code}")
            print(f"Response body: {e.response.text}")
        return False
    except AssertionError as e:
        print(f"❌ Test assertion failed: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

if __name__ == "__main__":
    # Make sure the FastAPI server is running before executing this test
    print("Starting GitHub clone test...")
    test_github_clone() 