import asyncio
import os
from exa_py import Exa
from pydantic import BaseModel
from backend.models.tools import Tool
from dotenv import load_dotenv
import chainlit as cl

load_dotenv()

exa = Exa(api_key=os.environ.get("EXA_API_KEY"))


async def search_web_async(query: str) -> str:
    print(f"Searching web for {query}")
    search_results = "\n".join(
        [
            f"{result.title}\n{result.url}\n{result.highlights}"
            for result in exa.search_and_contents(
                query=query, type="auto", highlights=True
            ).results
        ]
    )

    search_results_element = cl.CustomElement(
        name="WebSearch",
        props={"args": {"query": query}, "response": search_results},
    )

    await cl.Message(content="", elements=[search_results_element]).send()

    return search_results

def search_web(query: str) -> str:
    return asyncio.run(search_web_async(query)) 


class WebSearchArgs(BaseModel):
    query: str


web_search_tool = Tool(
    name="web_search",
    description="Search the web for information",
    function=search_web,
    argument_schema=WebSearchArgs,
)

if __name__ == "__main__":
    print(
        search_web("All soccer matches between 1990 and 1994 with brazilian referees")
    )
