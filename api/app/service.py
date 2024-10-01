from sqlalchemy.orm import Session

from . import models, schemas, bot_service

def create_session(db: Session):
    """
    Create a new chat session in the database.

    Args:
        db (Session): The database session object used for database operations.

    Returns:
        models.ChatSession: The newly created chat session object.
    """
    db_chat_session = models.ChatSession(
        is_active = True,
    )
    db.add(db_chat_session)
    db.commit()
    db.refresh(db_chat_session)
    send_message_to_bot(db, chat_session = db_chat_session)
    return db_chat_session

def get_session(db: Session, session_id: str):
    """
    Retrieve a chat session from the database by its ID.

    Args:
        db (Session): The database session object used for querying.
        session_id (str): The unique identifier of the chat session to retrieve.

    Returns:
        models.ChatSession or None: The ChatSession object matching the provided session_id
        and is_active flag, or None if no such session exists.
    """
    return db.query(models.ChatSession).filter(
        models.ChatSession.id == session_id, 
        models.ChatSession.is_active).first()

def close_session(db: Session, session_id: str):
    """
    Deactivate a chat session in the database.

    This function retrieves a chat session from the database using the provided session_id,
    marks it as inactive, and commits the changes to the database.

    Args:
        db (Session): The database session object used for querying and updating.
        session_id (str): The unique identifier of the chat session to deactivate.

    Returns:
        models.ChatSession or None: The deactivated ChatSession object if found, or None
        if no active session with the provided session_id exists.
    """
    db_chat_session = get_session(db, session_id)
    if db_chat_session is None:
        return None
    db_chat_session.is_active = False
    db.commit()
    db.refresh(db_chat_session)
    return db_chat_session

def send_message_to_bot(db: Session, chat_session: schemas.ChatSession):
    """
    Send a message to the bot and store the response in the database.

    Args:
        db (Session): The database session object.
        chat_session (schemas.ChatSession): The chat session object.

    Returns:
        models.ChatMessage: The database object representing the bot's response.
    """
    bot_response = bot_service.send_message_to_bot(
        chat_session = chat_session, 
    )
    db_chat_bot_message = models.ChatMessage(
        is_bot_message = True,
        content = bot_response,
        session_id = chat_session.id,
    )
    db.add(db_chat_bot_message)
    db.commit()
    db.refresh(db_chat_bot_message)
    return db_chat_bot_message

def create_message(db: Session, chat_message: schemas.ChatMessageCreate):
    """
    Create a new chat message and store it in the database, along with the bot's response.

    Args:
        db (Session): The database session object.
        chat_message (schemas.ChatMessageCreate): The chat message object to be created.

    Returns:
        schemas.ChatSession: The chat session associated with the created message.
    """
    db_chat_message = models.ChatMessage(
        content = chat_message.content,
        session_id = chat_message.session_id,
    )
    db.add(db_chat_message)
    db.commit()
    db.refresh(db_chat_message)

    bot_response = send_message_to_bot(db, chat_session = db_chat_message.session)
    db_chat_message.response_id = bot_response.id
    db.commit()
    db.refresh(db_chat_message)
    return db_chat_message.session

def edit_message(db: Session, chat_message: schemas.ChatMessageEdit):
    """
    Edit an existing chat message and update the bot's response.

    Args:
        db (Session): The database session object.
        chat_message (schemas.ChatMessageEdit): The edited chat message object.

    Returns:
        schemas.ChatSession or None: The chat session associated with the edited message,
        or None if the message cannot be edited.
    """
    db_chat_message = db.query(models.ChatMessage).filter(
        models.ChatMessage.id == chat_message.id).first()
    
    if db_chat_message is None:
        return None
    if not db_chat_message.session.is_active:
        return None
    if db_chat_message.is_bot_message:
        return None
    
    other_chat_messages = db.query(models.ChatMessage).filter(
        models.ChatMessage.session_id == db_chat_message.session_id,
        models.ChatMessage.created_at > db_chat_message.created_at)

    other_chat_messages.delete()
    db_chat_message.content = chat_message.content
    bot_response = send_message_to_bot(db, chat_session = db_chat_message.session)
    db_chat_message.response_id = bot_response.id
    db.commit()
    db.refresh(db_chat_message)
    return db_chat_message.session

def delete_message(db: Session, chat_message_id: str):
    """
    Delete a chat message and any subsequent messages in the same session.

    Args:
        db (Session): The database session object.
        chat_message_id (str): The ID of the chat message to be deleted.

    Returns:
        schemas.ChatSession or None: The updated chat session object if the message was deleted,
        or None if the message cannot be deleted.
    """
    db_chat_message = db.query(models.ChatMessage).filter(
        models.ChatMessage.id == chat_message_id).first()
    
    if db_chat_message is None:
        return None
    if not db_chat_message.session.is_active:
        return None
    if db_chat_message.is_bot_message:
        return None
    
    session = db_chat_message.session
    other_chat_messages = db.query(models.ChatMessage).filter(
        models.ChatMessage.session_id == db_chat_message.session_id,
        models.ChatMessage.created_at > db_chat_message.created_at)

    other_chat_messages.delete()
    db.delete(db_chat_message)
    db.commit()
    db.refresh(session)
    return session