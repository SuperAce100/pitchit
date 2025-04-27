import asyncio
from typing import List, cast
from dotenv import load_dotenv
import os
from datetime import datetime
import random
import string

from backend import server, researcher

import chainlit as cl


load_dotenv()

def name_process():
    date_str = datetime.now().strftime("%Y%m%d_%H%M%S")
    rand_str = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
    return f"{date_str}_{rand_str}"




def todos_left(task_list_tasks: List[cl.Task]):
    return [task for task in task_list_tasks if task.status == cl.TaskStatus.READY]



async def display_message(message):
    if message.type == "human":
        await cl.Message(content="## " + message.content, author="Human").send()
    elif message.type == "tool":
        await cl.Message(content=message.content, author="Tool").send()

    elif message.type == "ai":
        await cl.Message(content=message.content, author="AI").send()

        if message.tool_calls:
            for tool_call in message.tool_calls:
                args_list = [f"- {k}: {v}" for k, v in tool_call['args'].items()]
                formatted_args = "\n".join(args_list)
                await cl.Message(content=f"### Called Tool {tool_call['name']}\n\n{formatted_args}", author=tool_call['name']).send()



@cl.on_message
async def on_message(msg: cl.Message):

    await display_message(msg)


    if msg.content.startswith("https://github.com/") or msg.content.startswith("git@github.com:"):
        repo_name = msg.content.split("/")[-1]
        repo_data = await cl.make_async(server.clone_github_repo)(msg.content, repo_name)

        repo_view_element = cl.CustomElement(
            name="RepoView",
            props=repo_data,
        )

        await cl.Message(content=f"## Cloned Repository {repo_name}\n\n", elements=[repo_view_element]).send()

        orchestrator_branches = await cl.make_async(server.create_orchestrator_branches)(repo_data["tree"])

        # await cl.Message(content=f"## Created Orchestrator Branches\n\n", elements=[]).send()

        full_response = await cl.make_async(server.create_sub_agents)(orchestrator_branches, repo_data["repo_path"])

        # await cl.Message(content=f"## Sub agents explored: {full_response}\n\n", elements=[]).send()

        with cl.Step("Creating Technical Brief"):
            technical_brief = await cl.make_async(server.create_technical_brief)(repo_name, full_response)

        technical_brief_element = cl.CustomElement(
            name="TechnicalBriefViewer",
            props={"briefData": technical_brief.model_dump()},
        )

        await cl.Message(content=f"## Technical Brief\n\n", elements=[technical_brief_element]).send()

        await cl.Message(content="## Conducting Market Research...", elements=[]).send()

        market_research = await cl.make_async(researcher.market_research)(repo_data["readme_content"])

        market_research_element = cl.CustomElement(
            name="MarketResearchViewer",
            props={"marketData": market_research.model_dump()},
        )

        await cl.Message(content=f"### Market Research\n\n", elements=[market_research_element]).send()


        slides = cl.CustomElement(
            name="SlideDeckViewer",
            props={"marketResearchData": market_research.model_dump(), "technicalBriefData": technical_brief.model_dump()},
        )

        await cl.Message(content=f"# Final Deck\n\n", elements=[slides]).send()

        






