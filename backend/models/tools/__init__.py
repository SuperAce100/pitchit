from backend.models.tools.tool import Tool
from backend.models.tools.web_search import web_search_tool
from backend.models.tools.file_traversal import ls_tool, cd_tool, read_file_tool, pwd_tool
from typing import Dict, Optional


class ToolRegistry:
    def __init__(self) -> None:
        self._tools: Dict[str, Tool] = {}

    def register(self, tool: Tool) -> None:
        """Register a tool in the registry.

        Args:
            tool (Tool): The tool to register
        """
        self._tools[tool.name] = tool

    def get_tool(self, name: str) -> Optional[Tool]:
        """Get a tool by name.

        Args:
            name (str): The name of the tool to get

        Returns:
            Optional[Tool]: The tool if found, None otherwise
        """
        return self._tools.get(name)

    def get_all_tools(self) -> list[Tool]:
        """Get all registered tools.

        Returns:
            list[Tool]: List of all registered tools
        """
        return list(self._tools.values())


# Global registry instance
tool_registry = ToolRegistry()

tool_registry.register(web_search_tool)
tool_registry.register(ls_tool)
tool_registry.register(cd_tool)
tool_registry.register(read_file_tool)
tool_registry.register(pwd_tool)

__all__ = ["Tool", "tool_registry"]