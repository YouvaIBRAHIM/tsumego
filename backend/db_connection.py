from pymongo import MongoClient
import os
DB_NAME = os.environ.get('MONGO_DB_NAME')
PWD = os.environ.get('MONGO_DB_PWD')
USER = os.environ.get('MONGO_DB_USERNAME')
PORT = int(os.environ.get('MONGO_DB_PORT',27017))

uri ='mongodb://{USER}:{PWD}@{DB_NAME}:{PORT}'.format(USER=USER,PWD=PWD,DB_NAME=DB_NAME,PORT=PORT)
client = MongoClient(uri)

db = client[DB_NAME]