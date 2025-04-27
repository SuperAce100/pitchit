import asyncio
import json
import os
import subprocess
from typing import List
import uuid
from pathlib import Path
from pydantic import BaseModel
from directory_tree import DisplayTree

from backend.models.agents import Agent
from backend.models.agents import AgentConfig
from backend.models.llms import llm_call
from backend.models.tools import tool_registry
from backend.models.tools.file_traversal import set_current_path
import chainlit as cl

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
        repo_path = str(repo_dir)
    except subprocess.CalledProcessError as e:
        print(f"Failed to clone repository: {e.stderr}")
        raise RuntimeError(f"Failed to clone repository: {e.stderr}")
    
    # Read the README.md file if it exists
    readme_path = Path(repo_path) / "README.md"
    readme_content = None
    if readme_path.exists():
        try:
            with open(readme_path, 'r', encoding='utf-8') as f:
                readme_content = f.read()
        except Exception as e:
            print(f"Error reading README.md: {str(e)}")
            readme_content = None

    tree = DisplayTree(
        dirPath=repo_path,
        stringRep=True,
        showHidden=False,
        ignoreList = ".git"
    )

    repo_data = {
        "repo_path": repo_path,
        "repo_name": repo_name,
        "repo_url": repo_url,
        "readme_content": readme_content,
        "tree": tree
    }

    return repo_data


class Branch(BaseModel):
    name: str
    description: str
    files: List[str]

class BranchList(BaseModel):
    branches: List[Branch]


def create_orchestrator_branches(tree: str):
    response = llm_call(
        prompt=f"Break this tree structure into branches that can be explored by sub-agents: {tree}",
        system_prompt="""
        You are a helpful assistant that creates branches for the 
        given tree structure. The maximum number of branches is 3. 
        For each branch, you should provide a name,
        description and a list of files that will be explored. The maximum number of
        files that can be explored in each branch is 3. The name
        should be a two-word phrase that captures the purpose of the branch.
        The description should be a short description of the purpose and goals
        of exploring the branch. The files should be a list of files that will
        be explored.
        """,
        response_format=BranchList
    )
    return response

def create_sub_agents(response: BranchList, repo_path: str) -> str:
    set_current_path(repo_path)
    instructions = response.branches

    system_prompt = """
    You are a helpful assistant that explores a branch of a codebase. 
    You will be given a branch of a codebase and a list of files that will be explored.
    You will need to use the tools provided to explore the branch by going into each file, 
    reading it, and then understanding the code semantically.
    The results should include the file that was explored, the takeaway from the exploration,
    and the path to the file. 
    """ 

    config = AgentConfig(
        name="agent", system_prompt=system_prompt, description="", 
        tools=["ls", "cd", "read_file", "pwd"]
    )

    full_response = ""
    
    async def process_instruction(instruction):
        print(f"New Agent Processing instruction: {instruction.name}")
        print(f"starting at path: {repo_path}")
        set_current_path(repo_path)
        agent = Agent.from_config(config)
        
        content = f"Explore branch: {instruction.name}\n\nDescription: {instruction.description}\n\nFiles to explore:\n" + \
                  "\n".join([f"- {file}" for file in instruction.files])
        
        await cl.Message(content=f"### Exploring {instruction.name}\n\n {instruction.description}\n\nFiles to explore:\n" + \
                  "\n".join([f"- {file}" for file in instruction.files]), author="AI").send()
        
        return agent.call_with_tools(content)
    
    for instruction in instructions:
        result = asyncio.run(process_instruction(instruction))
        full_response += result

    return full_response # this should be put into json file

class TechnicalBrief(BaseModel):
    product_idea: str
    product_overview: str
    steps: List[str]
    features: List[str]
    technologies_used: List[str]
    x_factors: List[str]

def create_technical_brief(repo_name: str, full_response: str) -> str:
    system_prompt = f"""
    Based on the following information about the repository '{repo_name}', create a comprehensive technical brief:
    
    {full_response}
    
    The technical brief should include:
    1. A concise product idea
    2. A product overview
    3. Key steps in the development or usage process
    4. Main features of the product
    5. Technologies used in the project
    6. X-factors or unique selling points
    
    Format your response as a structured JSON object.
    """

    brief = llm_call(
        prompt=system_prompt,
        response_format=TechnicalBrief
    )

    return brief