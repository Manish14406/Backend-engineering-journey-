from fastapi import FastAPI,HTTPException

app = FastAPI()

@app.post("/ideas",status_code=201)
def create_ideas(title:str = None,description:str = None):

    #missing 
    if title == None or description == None:
        raise HTTPException(
            status_code = 400,
            detail = "Title and description is cannot be missing"
        )



    #Empty string 
    if title.strip() == "" or description.strip() == "  ":
        raise HTTPException(
            status_code = 400,
            detail = "Title and desciption cannot be empty"
        )
    if(len(title)<5):
        raise HTTPException(
            status_code = 400,
            detail = "Length must be greater then 5"
        )
    
    if(len(description)<20):
        raise HTTPException(
            status_code = 400,
            detail = "Length should be greater then 20"
        )
    

    idea = {
        "id":1,
        "title":title,
        "description":description,
        "status":"pending"
    }
    return idea

    