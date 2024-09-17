from pydantic import BaseModel


class ChatMessageBase(BaseModel):
    content : str
    is_bot_message : bool

class ChatMessageCreate(ChatMessageBase):
    pass

class ChatMessage(ChatMessageBase):
    id : str
    session_id : str

    class Config:
        orm_mode = True


class ChatSessionBase(BaseModel):
    user_name : str
    context_id : str

class ChatSessionCreate(ChatSessionBase):
    pass

class ChatSession(ChatSessionBase):
    id : str
    is_active : bool
    messages : list[ChatMessage] = []

    class Config:
        orm_mode = True


class ChatContextBase(BaseModel):
    name : str

class ChatContextCreate(ChatContextBase):
    pass

class ChatContext(ChatContextBase):
    id : str

    class Config:
        orm_mode = True
