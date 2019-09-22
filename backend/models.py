from sqlalchemy import Column, Text, Integer, JSON, String
from sqlalchemy.ext.declarative import declarative_base
from werkzeug.security import generate_password_hash, check_password_hash

Base = declarative_base()


class Recipes(Base):
    __tablename__ = 'recipe'

    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    ingredients = Column(JSON, nullable=False)
    instructions = Column(Text, nullable=False)


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(Text, nullable=False)
    password = Column(String(128), nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
