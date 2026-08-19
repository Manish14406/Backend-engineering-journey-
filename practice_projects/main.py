from fastapi import FastAPI

app = FastAPI()

#Health check
@app.get("/health")
def health():
    return{"status":"ok"}


# get items
# @app.get("/items")
# def items():
#     return{
#       "items":   [
#           {"id":1,"name":"pen"},
#           {"id":2,"name":"book"},
#           {"id":3,"n}ame":"pencil"}  
#         ]
#     }
    
    


#get item by query parameter
@app.get("/items")
def get_item(name:str=None):
    items=[
        {"id":1,"name":"pen"},
        {"id":2,"name":"pencil"}
    ]
    if(name is None):
        return{"items":items}
    filtered_items = []
    for item in items:
        if(item["name"] == name):
            filtered_items.append(item)  
    return{"items":filtered_items}


# get id by path parameter
# @app.get("/items/{id}")
# def get_item(id:int):
#     return{"item_id":id















