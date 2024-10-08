from fastapi import FastAPI, Depends, HTTPException, __version__
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from time import time
import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__)))
from app import service, models, schemas
from app.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title = "Tiago Guimaraes - Chatbot",
    redirect_slashes = False
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"])

def get_db():
    db = SessionLocal()
    try : 
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return HTMLResponse("Tiago Guimaraes - Chatbot")

@app.get('/ping')
async def hello():
    return {'res': 'pong', 'version': __version__, "time": time()}

@app.post("/api/session", response_model=schemas.ChatSession)
def post_session(db:Session=Depends(get_db)):
    return service.create_session(db=db)

@app.get("/api/session/{session_id}", response_model=schemas.ChatSession)
def get_session(session_id:str, db:Session=Depends(get_db)):
    chat_session = service.get_session(db, session_id = session_id )
    if chat_session is None:
        raise HTTPException(status_code=404, detail="Session not found")
    return chat_session

@app.post("/api/session/{session_id}/close", response_model=schemas.ChatSession)
def close_session(session_id:str, db:Session=Depends(get_db)):
    chat_session = service.get_session(db, session_id = session_id )
    if chat_session is None:
        raise HTTPException(status_code=404, detail="Session not found")
    return service.close_session(db=db, session_id=session_id)

@app.post("/api/message", response_model=schemas.ChatSession)
def create_message(chat_message:schemas.ChatMessageCreate, db:Session=Depends(get_db)):
    return service.create_message(db=db, chat_message=chat_message)

@app.put("/api/message", response_model=schemas.ChatSession)
def edit_message(chat_message:schemas.ChatMessageEdit, db:Session=Depends(get_db)):
    return service.edit_message(db=db, chat_message=chat_message)

@app.delete("/api/message/{chat_message_id}", response_model=schemas.ChatSession | None)
def delete_message(chat_message_id:str, db:Session=Depends(get_db)):
    return service.delete_message(db=db, chat_message_id=chat_message_id)