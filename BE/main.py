# .ply or .splat 로드 기능 추가
#  → WebGL 3DGS Viewer로 변경. S3 storage/Local에서 ply, splat 파일을 불러올 수 있도록 구현
#  → Local(BE/static/model.splat)에서 splat 파일을 불러올 수 있도록 구현 완료.

# 사용자가 프로젝트 생성
# 1) 사용자가 프로젝트 생성 버튼 클릭, mp4, mov, zip을 업로드
# 2) Frontend → Backend 리퀘스트 전달 (동영상 데이터 buffer 전송)
# 3) Backend에서 동영상 buffer 수신, 서버 내 임의의 위치에 저장 → BE/static 폴더에 저장 (임시).
# 4) Frontend에 “처리 중” 상태의 프로젝트 카드 추가

# Backend의 3DGS 생성 (Dummy version)
# 1) 시나리오 3 - 3)까지 수행된 상태
# 2) Backend는 일정 시간(10 sec) 대기 후 사전에 준비한 ply(or splat)파일의 썸네일을 Frontend로 전달
# 3) Frontend는 Backend의 정보를 받아 대응 프로젝트의 상태를 “처리 중”에서 “완료”로 바꿈

# “완료” 상태 프로젝트 클릭시 viewer로 전환
# 1) 사용자가 “완료” 상태 프로젝트 클릭
# 2) WebGL 3DGS Viewer 로 대응하는 splat파일을 로드해 시각화

# venv\Scripts\activate
# uvicorn main:app --reload

from fastapi import FastAPI, HTTPException, File, UploadFile, Form, BackgroundTasks
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import uuid
import json
import shutil
import os
import time

# FastAPI 초기화
app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 클라이언트 Origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 데이터 및 파일 경로
DATA_FILE = Path("data/projects.json")
STATIC_DIR = Path("static/")
STATIC_DIR.mkdir(exist_ok=True)

if not DATA_FILE.exists():
    DATA_FILE.write_text(json.dumps([]))

# 프로젝트 데이터 모델
class Project(BaseModel):
    id: str
    name: str
    createdBy: str
    date: str
    image: str
    status: str
    source: str

# 프로젝트 리스트 조회
@app.get("/projects", response_model=list[Project])
async def get_projects():
    try:
        projects = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        projects = []
        DATA_FILE.write_text(json.dumps(projects, indent=4))
    return projects

# 프로젝트 생성
@app.post("/projects", response_model=Project)
async def create_project(
    name: str = Form(...),
    createdBy: str = Form(...),
    date: str = Form(...),
    video: UploadFile = File(...),
    background_tasks: BackgroundTasks = None
):
    # 프로젝트 ID 생성
    project_id = str(uuid.uuid4())

    # 동영상 파일 저장
    video_path = STATIC_DIR / f"{project_id}_{video.filename}"
    with video_path.open("wb") as f:
        shutil.copyfileobj(video.file, f)

    # 기본 상태는 "처리 중"
    new_project = {
        "id": project_id,
        "name": name,
        "createdBy": createdBy,
        "date": date,
        "image": "",  # 썸네일은 처리 후 추가
        "status": "처리 중",
        "source": "",  # ply/splat 파일은 처리 후 추가
    }

    # 프로젝트 데이터 저장
    projects = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    projects.append(new_project)
    DATA_FILE.write_text(json.dumps(projects, indent=4))

    # 백엔드 처리 작업 시작
    background_tasks.add_task(process_project, project_id)

    return new_project

# 백그라운드에서 프로젝트 처리
def process_project(project_id: str):
    time.sleep(10)  # 더미 대기 (10초)

    # 더미 썸네일 및 ply 파일 경로 설정
    thumbnail_path = "http://127.0.0.1:8000/static/ExampleThumbnail.png"
    source_path = "http://127.0.0.1:8000/get-file"

    # 프로젝트 상태 업데이트
    projects = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    for project in projects:
        if project["id"] == project_id:
            project["status"] = "완료"
            project["image"] = thumbnail_path
            project["source"] = source_path
            break
    DATA_FILE.write_text(json.dumps(projects, indent=4))

# 프로젝트 ID로 조회
@app.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    projects = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    project = next((p for p in projects if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    print(f"DELETE request received for project_id: {project_id}")
    try:
        projects = json.loads(DATA_FILE.read_text(encoding="utf-8"))
        print(f"Existing projects: {projects}")
        project = next((p for p in projects if p["id"] == project_id), None)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")

        # 프로젝트 삭제
        projects = [p for p in projects if p["id"] != project_id]
        DATA_FILE.write_text(json.dumps(projects, indent=4), encoding="utf-8")
        print(f"Project deleted. Remaining projects: {projects}")

        return {"message": "Project deleted successfully"}
    except Exception as e:
        print(f"Error deleting project: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# WebGL 뷰어를 위한 파일 제공
@app.get("/get-file")
async def get_file():
    file_path = STATIC_DIR / "model.splat"  # 임시 splat 파일 경로
    if file_path.exists():
        return FileResponse(file_path, media_type="application/octet-stream", filename="model.splat")
    raise HTTPException(status_code=404, detail="File not found")

# # 서버의 로컬 .splat 파일 경로
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# FILE_PATH = os.path.join(BASE_DIR, "model.splat")

# # 서버의 로컬 .splat 파일 호출
# @app.get("/get-file")
# async def get_file():
#     # 파일이 존재하는지 확인
#     if os.path.exists(FILE_PATH):
#         return FileResponse(FILE_PATH, media_type="application/octet-stream", filename="model.splat")
#     return {"error": "File not found"}
