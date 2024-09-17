from sqlalchemy.orm import Session

from . import models, schemas

def get_contexts(db: Session):
    return db.query(models.ChatContext).all()

def create_session(db: Session, chat_session: schemas.ChatSessionCreate):
    db_chat_session = models.ChatSession(
        user_name = chat_session.user_name,
        context_id = chat_session.context_id,
    )
    db.add(db_chat_session)
    db.commit()
    db.refresh(db_chat_session)
    return db_chat_session

def get_session(db: Session, session_id: str):
    return db.query(models.ChatSession).filter(
        models.ChatSession.id == session_id, 
        models.ChatSession.is_active == True).first()

def close_session(db: Session, session_id: str):
    db_chat_session = get_session(db, session_id)
    if db_chat_session is None:
        return None
    db_chat_session.is_active = False
    db.commit()
    db.refresh(db_chat_session)
    return db_chat_session

def send_message_to_bot(db: Session, chat_message: schemas.ChatMessage):
    # TODO: Call ChatGPT API and return response
    content = "Response here!"
    db_chat_bot_message = models.ChatMessage(
        is_bot_message = True,
        content = content,
        session_id = chat_message.session_id,
    )
    db.add(db_chat_bot_message)
    db.commit()
    db.refresh(db_chat_bot_message)
    return db_chat_bot_message

def create_message(db: Session, chat_message: schemas.ChatMessageCreate):
    db_chat_message = models.ChatMessage(
        content = chat_message.content,
        session_id = chat_message.session_id,
    )
    db.add(db_chat_message)
    db.commit()
    db.refresh(db_chat_message)

    bot_response = send_message_to_bot(db, db_chat_message)
    db_chat_message.response_id = bot_response.id
    db.commit()
    db.refresh(db_chat_message)
    return bot_response

def edit_message(db: Session, chat_message: schemas.ChatMessageEdit):
    db_chat_message = db.query(models.ChatMessage).filter(
        models.ChatMessage.id == chat_message.id).first()
    
    if db_chat_message is None:
        return None
    if db_chat_message.session.is_active == False:
        return None
    if db_chat_message.response_id:
        db_chat_response_message = db.query(models.ChatMessage).filter(
            models.ChatMessage.id == db_chat_message.response_id
        ).first()
        db.delete(db_chat_response_message)

    db_chat_message.content = chat_message.content
    bot_response = send_message_to_bot(db, db_chat_message)
    db_chat_message.response_id = bot_response.id
    db.commit()
    db.refresh(db_chat_message)
    return bot_response

def delete_message(db: Session, chat_message_id: str):
    db_chat_message = db.query(models.ChatMessage).filter(
        models.ChatMessage.id == chat_message_id).first()
    
    if db_chat_message is None:
        return None
    if db_chat_message.session.is_active == False:
        return None
    if db_chat_message.is_bot_message == True:
        return None
    
    other_chat_messages = db.query(models.ChatMessage).filter(
        models.ChatMessage.session_id == db_chat_message.session_id,
        models.ChatMessage.created_at > db_chat_message.created_at)

    other_chat_messages.delete()
    db.delete(db_chat_message)
    db.commit()
    return db_chat_message