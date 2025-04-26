import os
import uuid
import subprocess
from pathlib import Path

def clone_github_repo(repo_url, repo_name):
    unique_id = str(uuid.uuid4())
    
    data_dir = Path(".data")
    repo_dir = data_dir / f"{repo_name}_{unique_id}"
    
    os.makedirs(data_dir, exist_ok=True)
    
    try:
        subprocess.run(
            ["git", "clone", repo_url, str(repo_dir)],
            check=True,
            capture_output=True,
            text=True
        )
        print(f"Successfully cloned {repo_url} to {repo_dir}")
        return str(repo_dir)
    except subprocess.CalledProcessError as e:
        print(f"Failed to clone repository: {e.stderr}")
        raise RuntimeError(f"Failed to clone repository: {e.stderr}")

def main():
    print("Hello from backend!")


if __name__ == "__main__":
    main()
