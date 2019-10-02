from models import Recipes, User
from sqlalchemy import create_engine, orm
from dotenv import load_dotenv, find_dotenv
from os import getenv
from typing import List, Dict

load_dotenv(find_dotenv())

PROVIDER = getenv('PROVIDER')
USER = getenv('DB_USER')
PASSWORD = getenv('PASSWORD')
DATABASE = getenv('DATABASE')

engine = create_engine(
    f'{PROVIDER}://{USER}:{PASSWORD}@localhost:5432/{DATABASE}'
)

connection = engine.connect()
session = orm.sessionmaker()
session.configure(bind=engine)
db_session = session()


def get_all_recipes():
    entries = []
    for entry in db_session.query(Recipes).order_by(Recipes.name).all():
        e = {
            'id': entry.id,
            'name': entry.name,
            'ingredients': entry.ingredients,
            'instructions': entry.instructions
        }
        entries.append(e)
    return entries, 200


def get_recipe_by_id(id: int):
    entry = db_session.query(Recipes).get(id)

    if entry is None:
        return f'Recipe ID {id} does not exist', 404

    return {
        'id': id,
        'name': entry.name,
        'ingredients': entry.ingredients,
        'instructions': entry.instructions
    }, 200


def create_recipe(**kwargs):
    entry = Recipes(**kwargs)
    db_session.add(entry)
    db_session.commit()


def update_recipe(id, name, ingredients, instructions):
    entry = db_session.query(Recipes).get(id)

    if entry is None:
        return f'Recipe ID {id} does not exist', 404

    entry.name = name
    entry.ingredients = ingredients
    entry.instructions = instructions
    db_session.commit()
    return None, 204


def delete_recipe(id: int):
    entry = db_session.query(Recipes).get(id)
    db_session.delete(entry)
    return None, 204


def create_user(username, password):
    user = User(username=username)
    user.set_password(password)
    db_session.add(user)
    db_session.commit()
    return True, 204


def is_user(username, password):
    if username:
        user = db_session.query(User).filter_by(username=username).first()
        if user is not None:
            if user.check_password(password):
                return True, 200
    return False, 403
