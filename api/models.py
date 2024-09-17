from sqlalchemy import Boolean, Column, ForeignKey, String, String
from sqlalchemy.orm import relationship
import uuid

from .database import Base

class ChatContext(Base):
    __tablename__ = "chat_contexts"
    id = Column(String(36), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String(255), index=True)

    sessions = relationship("ChatSession", back_populates="context")


class ChatSession(Base):
    __tablename__ = "chat_sessions"
    id = Column(String(36), primary_key=True, index=True, default=uuid.uuid4)
    user_name = Column(String(255), index=True)
    is_active = Column(Boolean, default=False)
    context_id = Column(String(36), ForeignKey("chat_contexts.id"))
    
    context = relationship("ChatContext", back_populates="sessions")
    messages = relationship("ChatMessage", back_populates="session")


class ChatMessage(Base):
    __tablename__ = "chat_messages"
    id = Column(String(36), primary_key=True, index=True, default=uuid.uuid4)
    content = Column(String(255), index=True)
    is_bot_message = Column(Boolean, default=False)
    session_id = Column(String(36), ForeignKey("chat_sessions.id"))

    session = relationship("ChatSession", back_populates="messages")