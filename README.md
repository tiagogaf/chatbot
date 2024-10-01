# Chatbot App 🤖

- [Live demo](https://chatbotweb-six.vercel.app/)

- [API Docs](https://chatbotapi-one.vercel.app/docs)

## What was used

**Frontend**: React, Typescript, Material UI, Tailwind, Axios, and Jest

**Backend**: Python, FastAPI, SQLAlchemy, and MySQL for the database

## How it Works

<img width="326" alt="image" src="https://github.com/user-attachments/assets/2ade5dc9-b7e6-4488-88c1-df2b32618e46">

The application aims to create a chatbot that will help website users solve their problems or answer questions.

The user clicks on the chat icon at the bottom of the page and has access to the virtual assistant. When the page is reloaded, the messages are lost and a new session begins.

This application supports the following actions:

- Send a message
  - The chatbot will always respond with a message
- Delete message
  - The user can delete a message that they’ve sent
- Edit message
  - The user can edit the message they’ve sent

Note: I added IDs for all action elements and `aria-label` attributes for accessibility use.

## OpenAI Integration

Behind the chatbot, I used an integration with the [OpenAI API](https://platform.openai.com/docs/api-reference/introduction?lang=python), so whenever the user sends a message, this message is sent to OpenAI using the "gpt-3.5-turbo" model.

When starting the conversation, I tell the bot what the context of the conversation is and explain how it should behave. The messages follow a history of sendings, that is, they are all linked to the same context.

The integration with the [OpenAI API](https://platform.openai.com/docs/api-reference/introduction?lang=python) allowed for great flexibility in serving users, they can change the subject whenever they want and even use the language they prefer, for example, having a conversation in Portuguese.

## Running Locally

### API

- Create a `.env` file in the `/api` folder
  - Add the following environment variables:
    - `DB_URL`: The URL to connect to the MySQL database
    - `OPENAI_API_KEY`: The OpenAI API Access Key
- Run the following commands:
  - `cd api`
  - `pip install -r requirements.txt`
  - `fastapi dev main.py`
- You should be able to access the API documentation at: `http://localhost:8000/docs`

### Web App

- Create a `.env` file in the `/web-app` folder
  - Add the following environment variables:
    - `REACT_APP_API_URL`: The URL to connect to the API
- Run the following commands:
  - `cd web-app`
  - `npm install`
  - `npm start`
- You should be able to access the API documentation at: `http://localhost:8000/docs`

## Unit Tests

### API

- Make sure you have a `.env` file with the environment variables.
  - See: [Create a .env file][#web-app]
- Run the following commands:
  - `cd api`
  - `python3 -m unittest`

### Web App

- Run the following commands:
  - `cd web-app`
  - `npm test`

## Future improvements

### API

- Add [Alembic](https://alembic.sqlalchemy.org/en/latest/) as a database migration tool for use with [SQLAlchemy](https://www.sqlalchemy.org/).

### Web App

- Improve the handling of errors that may occur when interacting with the chatbot, for this I will use the Material UI [Snackbar](https://mui.com/material-ui/react-snackbar/).
- Add more unit tests and configure Playwright for E2E testing.
- Display the day and time the message was sent/received.
