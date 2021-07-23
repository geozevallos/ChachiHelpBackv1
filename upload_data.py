#Instalar pymongo

import json
from pymongo import MongoClient

client = MongoClient()

# Nombre de la BD
db = client.SpatialData

#Nombre del coleccion en la BD
dbg = db.razas

#Archivo geojson a ser cargado
data = open("D:\Practica_Libros\Mongo_GEO\Chachi\data\especies.json")


jsondata = json.load(data)

# print (jsondata)
# print (jsondata["features"])

# Insertar los datos en la coleccion
# dbg.insert_many(jsondata["features"])  # Si es GEOJSON

dbg.insert_many(jsondata)




'''
Solo para el caso de las veterinarias:

data = open("D:/Practica_Libros/Mongo_GEO/data/veterinarias.geojson", encoding='utf-8')
jsondata = json.load(data)
jsondatafeatures = jsondata["features"]

output_dict = [x for x in jsondatafeatures if x['geometry']['type'] == 'Point']

dbg = db.veterinarias

dbg.insert_many(output_dict)

'''