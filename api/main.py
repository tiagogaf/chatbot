from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from . import service, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try : 
        yield db
    finally:
        db.close()

@app.get("/api/contexts/", response_model=list[schemas.ChatContext])
def get_contexts(db:Session=Depends(get_db)):
    contexts = service.get_contexts(db)
    return contexts

@app.post("/api/session/", response_model=schemas.ChatSession)
def post_session(chat_session:schemas.ChatSessionCreate, db:Session=Depends(get_db)):
    return service.create_session(db=db, chat_session=chat_session)

@app.get("/api/session/{session_id}/", response_model=schemas.ChatSession)
def get_session(session_id:str, db:Session=Depends(get_db)):
    chat_session = service.get_session(db, session_id = session_id )
    if chat_session is None:
        raise HTTPException(status_code=404, detail="Session not found")
    return chat_session
