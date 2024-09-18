from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

DB_URL = os.getenv("DB_URL")
connect_args={'ssl':{'fake_flag_to_enable_tls': True}}
engine = create_engine(DB_URL, echo=True, connect_args=connect_args, pool_recycle=60 * 5, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()