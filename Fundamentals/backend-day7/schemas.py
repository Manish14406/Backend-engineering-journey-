# schemas.py what the api data should look like 

# Model = how we store
# Schema = how data enters/leaves our api
# Pydantic = the tool/library we use to define that schema and validate the data
from pydantic import BaseModel  
class TaskCreate(BaseModel):
    title : str
    description : str


# Client JSON
#     ↓
# TaskCreate schema
#     ↓
# Pydantic validates
#     ↓
# Python object