from fastapi import APIRouter, Query
from .search_service import SearchService

router = APIRouter(prefix="/search", tags=["Search"])


@router.get("/jobs")
async def search_jobs(
    keyword: str = Query(None),
    location: str = Query(None),
    skill: str = Query(None)
):
    return SearchService.search_jobs(
        keyword=keyword,
        location=location,
        skill=skill
    )


@router.get("/recommend")
async def recommend_jobs(skills: str):
    skills_list = skills.split(",")

    return SearchService.recommend_jobs(skills_list)