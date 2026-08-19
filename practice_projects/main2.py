# Basically I must create a array of dictionary which consist items and each keyvalue pair has id and item 
# name so basically using query parameter I should filterout orelse just return all items and the validation
#  to be made as of 400 for invalid name and 404 for not found   


from fastapi import FastAPI,HTTPException

app = FastAPI()

@app.get("/items")
def get_items(name:str=None):
    items = [
        {"id":1,"name":"pen"},
        {"id":2,"name":"pencil"},
        {"id":3,"name":"erasor"},
        {"id":4,"name":"sketch"},
        {"id":5,"name":"book"}
    ]

    # If items are not requested to query parameters return all
    if(name == None):
        return{"items":items}
    
    # If invalid input
    if(name.strip() == ""):
        raise HTTPException(
            status_code = 400,
            detail = "Space doesn't determine a name"
        )

    # Items based on query
    filtered_items = []
    for item in items:
        if(item["name"]==name ):
            filtered_items.append(item)

    # If resource not found 
    if not filtered_items:
        raise HTTPException(
            status_code = 404,
            detail = f"The name does not exist {name}"
        )

    return{"items":filtered_items}