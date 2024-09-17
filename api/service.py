from sqlalchemy.orm import Session

from . import models, schemas

def get_contexts(db: Session):
    return db.query(models.ChatContext).all()

def create_session(db: Session, chat_session:schemas.ChatSessionCreate):
    db_chat_session = models.ChatSession(
        user_name = chat_session.user_name,
        context_id = chat_session.context_id,
        is_active = True
    )
    db.add(db_chat_session)
    db.commit()
    db.refresh(db_chat_session)
    return db_chat_session

def get_session(db: Session, session_id: str):
    return db.query(models.ChatSession).filter(models.ChatSession.id == session_id).first()