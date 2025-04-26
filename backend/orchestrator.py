from directory_tree import DisplayTree
from typing import List, Union
from models.llms import llm_call
from pydantic import BaseModel
from models.agents import Agent, AgentConfig
from models.tools import ls_tool, cd_tool, read_file_tool, pwd_tool
from models.tools.file_traversal import set_current_path
from concurrent.futures import ThreadPoolExecutor
import json
import os

def create_orchestrator_plan(repo_path: str):
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
    
    def process_instruction(instruction):
        print(f"New Agent Processing instruction: {instruction.name}")
        print(f"starting at path: {repo_path}")
        set_current_path(repo_path)
        agent = Agent.from_config(config)
        
        content = f"Explore branch: {instruction.name}\n\nDescription: {instruction.description}\n\nFiles to explore:\n" + \
                  "\n".join([f"- {file}" for file in instruction.files])
        
        return agent.call_with_tools(content)
    
    for instruction in instructions:
        result = process_instruction(instruction)
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

    # Create directory for technical briefs if it doesn't exist
    brief_dir = os.path.join("..", ".data", "technical_briefs")
    os.makedirs(brief_dir, exist_ok=True)
    
    # Format the brief according to the schema
    formatted_brief = {
        "technical_brief": {
            "product_idea": brief.product_idea,
            "product_overview": brief.product_overview,
            "steps": [{"name": f"Step {i+1}", "description": step} for i, step in enumerate(brief.steps)],
            "features": [{"name": f"Feature {i+1}", "description": feature} for i, feature in enumerate(brief.features)],
            "technologies_used": [{"name": tech, "description": ""} for tech in brief.technologies_used],
            "x_factors": [{"name": f"X-Factor {i+1}", "description": factor} for i, factor in enumerate(brief.x_factors)]
        }
    }
    
    # Save the technical brief to a JSON file
    brief_path = os.path.join(brief_dir, f"{repo_name}_technical_brief.json")
    with open(brief_path, 'w', encoding='utf-8') as f:
        json.dump(formatted_brief, f, indent=4)
    
    return brief_path

# Add test code at the end of the file
if __name__ == "__main__":
    # Generate a sample tree structure
    sample_tree = create_orchestrator_plan(".data/marketmind_3754178c-9ac6-41e2-b6e8-2cd17a002a77")
    
    if sample_tree:
        # Test the create_orchestrator_branches function
        branches = create_orchestrator_branches(sample_tree)
        
        # Print the results
        print("Generated Branches:")
        for i, branch in enumerate(branches.branches):
            print(f"\nBranch {i+1}: {branch.name}")
            print(f"Description: {branch.description}")
            print("Files:")
            for file in branch.files:
                print(f"  - {file}")
        
        # Test the create_sub_agents function
        print("\n\nTesting Sub-Agents Exploration:")
        exploration_results = create_sub_agents(branches, ".data/marketmind_3754178c-9ac6-41e2-b6e8-2cd17a002a77")
        print("\nExploration Results:")
        print(exploration_results)

        # Test the create_technical_brief function
        print("\n\nTesting Technical Brief Creation:")
        technical_brief = create_technical_brief("marketmind", exploration_results)
        print(f"\nTechnical Brief Path: {technical_brief}")

    




