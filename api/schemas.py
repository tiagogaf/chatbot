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
    context_id : str
    user_name : str
    language : str | None

class ChatSessionCreate(ChatSessionBase):
    pass

class ChatSession(ChatSessionBase):
    id : str
    is_active : bool
    messages : list[ChatMessage] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ChatContextBase(BaseModel):
    name : str

class ChatContextCreate(ChatContextBase):
    pass

class ChatContext(ChatContextBase):
    id : str

    class Config:
        from_attributes = True
