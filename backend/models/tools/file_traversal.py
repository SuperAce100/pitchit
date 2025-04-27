import os
import asyncio
from typing import List, Optional
from pydantic import BaseModel
from backend.models.tools import Tool
import chainlit as cl
current_path = "."

def set_current_path(path: str):   
    global current_path
    current_path = path

async def list_directory_async(path: str = current_path) -> str:
    """List files and directories in the specified path."""
    global current_path
    full_path = os.path.normpath(os.path.join(current_path, path))
    print(f"Listing directory: {full_path}")
    try:
        items = os.listdir(full_path)
        files = []
        directories = []
        
        for item in items:
            item_path = os.path.join(full_path, item)
            if os.path.isdir(item_path):
                directories.append(f"{item}/")
            else:
                files.append(item)
        
        # Sort and format the output
        directories.sort()
        files.sort()
        
        result = "Directories:\n"
        result += "\n".join(directories) if directories else "None"
        result += "\n\nFiles:\n"
        result += "\n".join(files) if files else "None"
        
        list_directory_element = cl.CustomElement(
            name="ListDirectory",
            props={"file_path": path, "response": result},
        )

        await cl.Message(content="", elements=[list_directory_element]).send()
        return result
    except Exception as e:
        return f"Error listing directory: {str(e)}"

def list_directory(path: str = current_path) -> str:
    return asyncio.run(list_directory_async(path))


def change_directory(path: str) -> str:
    """Change the current working directory."""
    global current_path
    try:
        new_path = os.path.normpath(os.path.join(current_path, path))
        print(f"Changing directory to: {new_path}")
        
        if not os.path.exists(new_path):
            return f"Error: Path '{new_path}' does not exist."
            
        if not os.path.isdir(new_path):
            return f"Error: '{new_path}' is not a directory."
            
        current_path = new_path
        return f"Changed directory to: {current_path}"
    except Exception as e:
        return f"Error changing directory: {str(e)}"

async def read_file_async(path: str) -> str:
    """Read the contents of a file."""
    global current_path
    full_path = os.path.normpath(os.path.join(current_path, path))
    print(f"Reading file: {full_path}")
    try:
        if not os.path.exists(full_path):
            print(f"File does not exist: {full_path}")
            return f"Error: File '{full_path}' does not exist."
        
        if os.path.isdir(full_path):
            print(f"File is a directory: {full_path}")
            return f"Error: '{full_path}' is a directory, not a file."
        
        with open(full_path, 'r') as file:
            content = file.read()

        read_file_element = cl.CustomElement(
            name="ReadFile",
            props={"file_path": path, "response": content},
        )

        await cl.Message(content="", elements=[read_file_element]).send()
        
        return f"{content}"
    except Exception as e:
        return f"Error reading file: {str(e)}"
    
def read_file(path: str) -> str:
    return asyncio.run(read_file_async(path))

def get_current_directory() -> str:
    """Get the current working directory."""
    global current_path
    try:
        return f"Current directory: {current_path}"
    except Exception as e:
        return f"Error getting current directory: {str(e)}"


class ListDirectoryArgs(BaseModel):
    path: Optional[str] = "."

class ChangeDirectoryArgs(BaseModel):
    path: str

class ReadFileArgs(BaseModel):
    path: str

class GetCurrentDirectoryArgs(BaseModel):
    pass

# Tool definitions

ls_tool = Tool(
    name="ls",
    description="List files and directories in the specified path",
    function=list_directory,
    argument_schema=ListDirectoryArgs,
)

cd_tool = Tool(
    name="cd",
    description="Change the current working directory",
    function=change_directory,
    argument_schema=ChangeDirectoryArgs,
)

read_file_tool = Tool(
    name="read_file",
    description="Read the contents of a file",
    function=read_file,
    argument_schema=ReadFileArgs,
)

pwd_tool = Tool(
    name="pwd",
    description="Get the current working directory",
    function=get_current_directory,
    argument_schema=GetCurrentDirectoryArgs,
)

# Export all tools
file_traversal_tools = [ls_tool, cd_tool, read_file_tool, pwd_tool]

# For testing
if __name__ == "__main__":
    #print(list_directory())
    #print(get_current_directory())
    # print(change_directory(".."))
    print(read_file("server.py"))