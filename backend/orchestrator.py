from directory_tree import DisplayTree
from typing import List, Union

def create_orchestrator_plan(repo_path: str):
    """Create a tree representation of the repository structure."""
    try:
        tree = DisplayTree(
            dirPath=repo_path,
            stringRep=True,
            showHidden=False,
            ignoreList = ".git"
        )
        return tree  
    except Exception as e:
        print(f"Error generating tree structure: {str(e)}")
        return None  



