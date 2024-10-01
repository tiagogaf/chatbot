import unittest

from app.schemas import ChatMessageCreate
from app import service
from app.database import SessionLocal

class TestServiceMethods(unittest.TestCase):

    def setUp(self):
        self.db = SessionLocal()

    def test_create_session(self):
        session = service.create_session(db=self.db)
        # The new session should be active
        self.assertTrue(session.is_active)
        # The session should have a single message (bot)
        self.assertEqual(len(session.messages), 1)
   
    def test_get_session(self):
        session = service.create_session(db=self.db)
        retrieved_session = service.get_session(session_id=session.id, db=self.db)
        # The retrieved session should be the same as the created one
        self.assertTrue(retrieved_session.is_active)
        self.assertEqual(session.id, retrieved_session.id)

    def test_close_session(self):
        session = service.create_session(db=self.db)
        retrieved_session = service.close_session(session_id=session.id, db=self.db)
        # The closed session should be disabled
        self.assertFalse(retrieved_session.is_active)

    def test_send_message(self):
        session = service.create_session(db=self.db)
        chat_message = ChatMessageCreate(
            session_id=session.id,
            content="Hello, this is a test message."
        )
        # Send a message from the user
        updated_session = service.create_message(db=self.db, chat_message=chat_message)
        # The session should have 3 messages (bot greeting message + user message + bot answer)
        self.assertEqual(len(updated_session.messages), 3)
        # The second message should be the user's message
        self.assertFalse(updated_session.messages[1].is_bot_message)
        self.assertEqual(updated_session.messages[1].content, chat_message.content)
        # The last message should be the bot's message
        self.assertTrue(updated_session.messages[-1].is_bot_message)

if __name__ == '__main__':
    unittest.main()