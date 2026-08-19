# Basically question is to build so that the item existing in items with id number should have a status pending and approved 


from fastapi import FastAPI,HTTPException

app = FastAPI()

@app.put("/items/{id}")
def put_items(id:int,status:str=None):
    items = [
    {"id": 1, "name": "pen", "status": "pending"},
    {"id": 2, "name": "book", "status": "approved"},
    {"id": 3, "name": "pencil", "status": "rejected"}
    ]

    found_item = None
    for item in items:
        if(item["id"] == id):
            found_item = item
            break

    
    if found_item is None:
        raise HTTPException(
            status_code = 404,
            detail = "Enter a valid ID"
        )
    
    if status not in ["approved","rejected"]:
        raise HTTPException(
            status_code = 400,
            detail = "Error typing"
        )

    if(found_item["status"]!= "pending"):
        raise HTTPException(
                status_code = 400,
                detail = "already done"
            )
    found_item["status"] = status
    return {"items":found_item}