from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from pydantic import BaseModel
from typing import List
import uuid
import json
from pathlib import Path

# Initialize FastAPI app
app = FastAPI()

# Path to store project data
DATA_FILE = Path("../projects.ts")

# Check if data file exists, if not create an empty one
if not DATA_FILE.exists():
    with open(DATA_FILE, "w") as f:
        json.dump([], f)


# Project Model
class Project(BaseModel):
    id: str
    name: str
    createdBy: str
    date: str
    image: str
    source: str


# API Routes

# Get all projects
@app.get("/projects", response_model=List[Project])
async def get_projects():
    with open(DATA_FILE, "r") as f:
        projects = json.load(f)
    return projects


# Upload a new project
@app.post("/projects", response_model=Project)
async def upload_project(
    name: str = Form(...),
    createdBy: str = Form(...),
    date: str = Form(...),
    image: UploadFile = File(...),
    source: str = Form(...),
):
    # Generate unique ID for the project
    project_id = str(uuid.uuid4())

    # Save the image file
    image_path = f"static/{project_id}_{image.filename}"
    with open(image_path, "wb") as f:
        f.write(image.file.read())

    # Create new project data
    new_project = {
        "id": project_id,
        "name": name,
        "createdBy": createdBy,
        "date": date,
        "image": image_path,
        "source": source,
    }

    # Save project data to file
    with open(DATA_FILE, "r") as f:
        projects = json.load(f)
    projects.append(new_project)
    with open(DATA_FILE, "w") as f:
        json.dump(projects, f, indent=4)

    return new_project


# Get a specific project by ID
@app.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    with open(DATA_FILE, "r") as f:
        projects = json.load(f)
    project = next((p for p in projects if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
