# from fastapi import FastAPI
# from pydantic import BaseModel,Field

# app = FastAPI()

# class Ideacreate(BaseModel):
#     title : str = Field(...,min_length=5)
#     description : str = Field(...,min_length=20)

# @app.post("/ideas",status_code=201)
# def create_ideas(idea:Ideacreate):
#     return{
#         "id":1,
#         "title":idea.title,
#         "description":idea.description,
#         "status":"pending"
#     }

from fastapi import FastAPI
from pydantic import BaseModel,Field

app = FastAPI()

# Idea-create
class Ideacreate(BaseModel):
    title:str = Field(...,min_length=5)
    description : str = Field(...,min_length=20)

@app.post("/ideas",status_code=201)
def create_ideas(idea:Ideacreate):
    return{
        "id":1,
        "title":idea.title,
        "description":idea.description,
        "status":"pending"
    }

# Idea update
class Update_idea(BaseModel):
    status:str 
    

@app.put("/ideas/{id}")
def update(id:int,update:Update_idea,):
    return{
        "id":id,
        "status":update.status
    }



