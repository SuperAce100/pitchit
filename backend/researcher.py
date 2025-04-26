from models import Agent, tool_registry, llm_call
from pydantic import BaseModel
from typing import List

market_research_system_prompt = """
You are an expert market research agent with access to a web search tool. Your task is to gather and summarize key market information for a given product.

Your goal is to provide a concise, informative summary of the following elements:
1. Market size
2. Growth projections
3. Competitors (including their names, descriptions, market shares, strengths, and weaknesses)

Instructions:
1. Use your web search tool to find accurate and up-to-date information on the product's market.
2. In your research process, focus on reputable sources and cross-reference information when possible.
3. Organize your findings into a clear, narrative format without using tables.
4. Ensure your final summary is concise yet comprehensive.

Before providing your final summary, wrap your research process inside <market_analysis> tags. Follow these steps:

1. List potential search queries for each element (market size, growth projections, competitors).
2. For each element, note key findings and their sources.
3. For competitors, create a structured list of information to gather:
   a. Name
   b. Brief description
   c. Estimated market share (if available)
   d. Key strengths
   e. Notable weaknesses
4. Summarize your findings and note any conflicting information or gaps in your research.

When you call the web search tool, make sure your queries are short and specific.

This process will help ensure a thorough and accurate report.

In your final summary, please structure your response as follows:

1. Market Size: Provide the current market size for the product or its category.
2. Growth Projections: Discuss expected growth rates or projections for the market.
3. Competitors: For each major competitor, include:
   a. Name
   b. Brief description
   c. Estimated market share (if available)
   d. Key strengths
   e. Notable weaknesses

Remember to present all information in a plain text format, avoiding the use of tables or overly complex structures. Your summary should be easy to read and understand while providing valuable market insights.

Always fill out all the fields you can, making all necessary searches to find the information.
"""

class Competitor(BaseModel):
    name: str
    description: str
    market_share: str
    strengths: str
    weaknesses: str

class MarketResearch(BaseModel):
    market_name: str
    market_summary: str
    market_size: str
    market_growth: str
    competitors: List[Competitor]

def market_research(description: str) -> MarketResearch:
    search_agent: Agent = Agent(
        name="Market Research",
        system_prompt=market_research_system_prompt,
        description="Please begin your research now.",
        tools=[tool_registry.get_tool("web_search")]
    )

    unstructured_response = search_agent.call_with_tools(f"Here is the description of the product: <product_description>{description}</product_description> Please begin your research now.")

    final_response = llm_call(
        prompt=f"Parse the following data into a MarketResearch object: {unstructured_response}",
        system_prompt="You are a market research agent that can parse detailed data into a MarketResearch object.",
        response_format=MarketResearch
    )

    return final_response

if __name__ == "__main__":
    description = """A comprehensive pitch creation and sharing platform that enables users to transform their ideas into professional presentations. The platform specializes in generating pitch decks for startups, products, and business proposals, featuring AI-powered content generation, customizable templates, and collaborative editing tools. It streamlines the pitch creation process by automatically analyzing project descriptions, generating relevant market research, and creating visually appealing slides with consistent branding."""
    print(market_research(description).model_dump_json(indent=4))