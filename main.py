import os
from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

@app.get('/api/test')
def test_get():
    return {"message": "Hello from GET endpoint!"}

@app.post('/api/test')
def test_post(request: Request):
    # In a real app, you'd parse the request body
    return {"message": "Hello from POST endpoint! Received data."}

if os.path.isdir("frontend/build"):
    app.mount("/static", StaticFiles(directory="frontend/build/static"), name="static")

    @app.get("/{path:path}")
    async def serve_frontend(request: Request):
        return FileResponse("frontend/build/index.html")
else:
    @app.get("/")
    def read_root():
        return {"message": "Frontend build not found. API is running."}
