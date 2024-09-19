from datetime import datetime
from pydantic import BaseModel


class ChatMessageBase(BaseModel):
    content : str

class ChatMessageCreate(ChatMessageBase):
    session_id : str
    pass

class ChatMessageEdit(ChatMessageBase):
    id : str

class ChatMessage(ChatMessageBase):
    id : str
    is_bot_message : bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ChatSessionBase(BaseModel):
    pass

class ChatSession(ChatSessionBase):
    id : str
    is_active : bool
    messages : list[ChatMessage] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
