# venv\Scripts\activate
# uvicorn main:app --reload

from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uuid
import json
from pathlib import Path

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 클라이언트 Origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = Path("data/projects.json") # Data 저장 임시 경로 (json 사용)
STATIC_DIR = Path("static/") # 임시 업로드 파일 저장 경로
STATIC_DIR.mkdir(exist_ok=True)

if not DATA_FILE.exists():
    DATA_FILE.write_text(json.dumps([]))

class Project(BaseModel):
    id: str
    name: str
    createdBy: str
    date: str
    image: str
    source: str


# API Routes
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
    # 프로젝트 ID 생성
    project_id = str(uuid.uuid4())

    # FE에서 업로드한 파일 경로 static 폴더에 처리 (임시)
    image_path = STATIC_DIR / f"{project_id}_{image.filename}"
    with image_path.open("wb") as f:
        f.write(image.file.read())

    # 더미 데이터 url (임시)
    image_url = "https://placebeard.it/250/250" # 프로젝트 카드 썸네일 (임시)
    source_url = f"https://lumalabs.ai/capture/ca9ea966-ca24-4ec1-ab0f-af665cb546ff" # 뷰어 링크 (임시)

    new_project = {
        "id": project_id,
        "name": name,
        "createdBy": createdBy,
        "date": date,
        "image": image_url,
        "source": source_url,
    }

    projects = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    projects.append(new_project)
    DATA_FILE.write_text(json.dumps(projects, indent=4), encoding="utf-8")

    return new_project


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

