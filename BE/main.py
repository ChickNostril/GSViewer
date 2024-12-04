# venv\Scripts\activate
# uvicorn main:app --reload

from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uuid
import json
from pathlib import Path

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 클라이언트 Origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to store project data
DATA_FILE = Path("data/projects.json")
STATIC_DIR = Path("static/")
STATIC_DIR.mkdir(exist_ok=True)

# Check if data file exists, if not create an empty one
if not DATA_FILE.exists():
    DATA_FILE.write_text(json.dumps([]))


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
    try:
        # JSON 파일 읽기
        projects = json.loads(DATA_FILE.read_text(encoding="utf-8"))
        # 파일이 JSON 배열인지 확인
        if not isinstance(projects, list):
            raise ValueError("Invalid JSON structure")
    except (json.JSONDecodeError, ValueError, UnicodeDecodeError):
        # JSON 파일이 손상된 경우 초기화
        projects = []
        DATA_FILE.write_text(json.dumps(projects, indent=4), encoding="utf-8")
    return projects


# Upload a new project
@app.post("/projects", response_model=Project)
async def upload_project(
    name: str = Form(...),
    createdBy: str = Form(...),
    date: str = Form(...),
    image: UploadFile = File(...),
):
    # Generate unique ID for the project
    project_id = str(uuid.uuid4())

    # Save the image file
    image_path = STATIC_DIR / f"{project_id}_{image.filename}"
    with image_path.open("wb") as f:
        f.write(image.file.read())

    # Generate a dummy data URL (replace with actual logic if needed)
    image_url = "https://placebeard.it/250/250"
    source_url = f"https://lumalabs.ai/capture/ca9ea966-ca24-4ec1-ab0f-af665cb546ff"

    # Create new project data
    new_project = {
        "id": project_id,
        "name": name,
        "createdBy": createdBy,
        "date": date,
        "image": image_url,
        "source": source_url,  # 서버에서 생성
    }

    # Save project data to file
    projects = json.loads(DATA_FILE.read_text(encoding="utf-8"))  # 인코딩 지정
    projects.append(new_project)
    DATA_FILE.write_text(json.dumps(projects, indent=4), encoding="utf-8")  # 인코딩 지정

    return new_project


# Get a specific project by ID
@app.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    projects = json.loads(DATA_FILE.read_text())
    project = next((p for p in projects if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    try:
        projects = json.loads(DATA_FILE.read_text(encoding="utf-8"))
        project = next((p for p in projects if p["id"] == project_id), None)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")

        # 프로젝트 삭제
        projects = [p for p in projects if p["id"] != project_id]
        DATA_FILE.write_text(json.dumps(projects, indent=4), encoding="utf-8")

        # 이미지 파일 삭제
        image_path = STATIC_DIR / project["image"].lstrip("/")
        if image_path.exists():
            image_path.unlink()

        return {"message": "Project deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

