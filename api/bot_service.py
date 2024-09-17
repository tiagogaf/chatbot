from openai import OpenAI
from dotenv import load_dotenv
import os

from . import schemas

load_dotenv()

client = OpenAI(
    api_key = os.getenv("OPENAI_API_KEY")
)

main_context = "You are a helpful assistant."

def send_message_to_bot(chat_message: schemas.ChatMessage):
    response = client.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages = [
            {"role": "system", "content": main_context},
            {"role": "user", "content": chat_message.content}
        ]
    )
    print(response)
    return response.choices[0].message.content