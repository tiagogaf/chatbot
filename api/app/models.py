import uuid
from sqlalchemy import Boolean, Column, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .database import Base

class ChatSession(Base):
    __tablename__ = "chat_sessions"
    id = Column(String(36), primary_key=True, index=True, default=uuid.uuid4)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())
    
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