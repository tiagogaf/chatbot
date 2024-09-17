import uuid
from sqlalchemy import Boolean, Column, ForeignKey, String, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .database import Base

class ChatContext(Base):
    __tablename__ = "chat_contexts"
    id = Column(String(36), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String(255), index=True)

    sessions = relationship("ChatSession", back_populates="context")


class ChatSession(Base):
    __tablename__ = "chat_sessions"
    id = Column(String(36), primary_key=True, index=True, default=uuid.uuid4)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())
    context_id = Column(String(36), ForeignKey("chat_contexts.id"))
    
    context = relationship("ChatContext", back_populates="sessions")
    messages = relationship("ChatMessage", back_populates="session", order_by="ChatMessage.created_at.asc()")


class ChatMessage(Base):
    __tablename__ = "chat_messages"
    id = Column(String(36), primary_key=True, index=True, default=uuid.uuid4)
    content = Column(String(600), index=True)
    is_bot_message = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())
    session_id = Column(String(36), ForeignKey("chat_sessions.id", ondelete='CASCADE'))
    response_id = Column(String(36), ForeignKey("chat_messages.id", ondelete='SET NULL'), )

    session = relationship("ChatSession", back_populates="messages")