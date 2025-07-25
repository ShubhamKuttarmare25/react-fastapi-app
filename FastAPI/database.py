from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


#using SQLite for this project

URL_DATABASE = 'sqlite:///./finance.db' 

engine = create_engine(URL_DATABASE, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autoflush= False, autocommit = False, bind= engine)

Base = declarative_base()