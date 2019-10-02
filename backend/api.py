from flask import Flask, request
from flask_restful import Resource, Api
import models
from json import loads, decoder
from flask_cors import CORS
import database as db


app = Flask(__name__)
cors = CORS(app, resources={r'*': {"origins": "*"}})
api = Api(app)


class Recipes(Resource):
    def get(self):
        '''
        Returns all recipes
        Path: /
        '''

        return db.get_all_recipes()

    def post(self):
        '''
        Adds new recipe
        Path: /
        '''

        try:
            print(request.data)
            print(request.json)
            info = loads(request.data.decode())
            db.create_recipe(**info)
        except decoder.JSONDecodeError as e:
            return f'Error decoding json ({str(e)})', 500
        else:
            return None, 204


class Recipe(Resource):
    def get(self, recipe_id):
        '''
        Get recipe by id
        Path: /{id}
        '''
        return db.get_recipe_by_id(recipe_id)

    def put(self, recipe_id):
        '''
        Update recipe by id
        Path: /{id}
        '''
        try:
            data = loads(request.data.decode())
            db.update_recipe(**data)
        except decoder.JSONDecodeError as e:
            return f'Error decoding json ({str(e)})', 500

        return None, 204

    def delete(self, recipe_id):
        '''
        Delete recipe by id
        Path: /{id}
        '''
        return db.delete_recipe(recipe_id)


class Login(Resource):
    def post(self):
        try:
            user = loads(request.data.decode())
            return db.is_user(**user)
        except decoder.JSONDecodeError as e:
            return f'Error decoding json ({str(e)})', 500
        else:
            return None, 204


class Signup(Resource):
    def post(self):
        try:
            info = loads(request.data.decode())
            db.create_user(**info)
        except decoder.JSONDecodeError as e:
            return f'Error decoding json ({str(e)})', 500
        else:
            return None, 204


api.add_resource(Recipes, '/recipes')
api.add_resource(Recipe, '/recipe/<int:recipe_id>')
api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')

if __name__ == "__main__":
    app.run(debug=True)
