import json
from pymongo import MongoClient

client = MongoClient()

db = client.SpatialData

dbg = db.provincias

data = open("D:\Practica_Libros\Mongo_GEO\Chachi\data\provincias.geojson")


jsondata = json.load(data)




# print (jsondata)
# print (jsondata["features"])

dbg.insert_many(jsondata["features"])




'''
veterinarias

data = open("D:/Practica_Libros/Mongo_GEO/data/veterinarias.geojson", encoding='utf-8')
jsondata = json.load(data)
jsondatafeatures = jsondata["features"]

output_dict = [x for x in jsondatafeatures if x['geometry']['type'] == 'Point']

dbg = db.veterinarias

dbg.insert_many(output_dict)

'''