from openai import OpenAI
from dotenv import load_dotenv
import os

from . import schemas

load_dotenv()

client = OpenAI(
    api_key = os.getenv("OPENAI_API_KEY")
)

def get_main_context():
    main_context = '''
    Your name is Ava and you are the chatbot for Artisan (artisan.co), a website that offers AI solutions. 
    Your goal is to help users of the site use all the tools available.
    Be brief in your answers, users like shorter and simpler answers.
    '''
    return main_context

def send_message_to_bot(chat_session: schemas.ChatSession):
    context = get_main_context()
    messages = [{"role": "system", "content": context}]
    messages += list(
        map(
            lambda message: {
                "role": "assistant" if message.is_bot_message else "user", 
                "content": message.content
            }, 
            chat_session.messages
        )
    )
    response = client.chat.completions.create(
        model = "gpt-3.5-turbo",
        max_tokens = 150,
        messages = messages
    )
    return response.choices[0].message.content