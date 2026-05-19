from typing import List


class SearchService:

    @staticmethod
    def search_jobs(
        keyword: str = None,
        location: str = None,
        skill: str = None
    ):

        return {
            "success": True,
            "filters": {
                "keyword": keyword,
                "location": location,
                "skill": skill
            },
            "jobs": [
                {
                    "title": "Python Developer",
                    "location": "Delhi",
                    "skills": ["python", "django"]
                },
                {
                    "title": "Backend Developer",
                    "location": "Bangalore",
                    "skills": ["fastapi", "sql"]
                }
            ]
        }

    @staticmethod
    def recommend_jobs(user_skills: List[str]):

        jobs = [
            {
                "title": "Python Developer",
                "skills": ["python", "django"]
            },
            {
                "title": "Frontend Developer",
                "skills": ["react", "javascript"]
            }
        ]

        recommended = []

        for job in jobs:

            matched = set(user_skills).intersection(job["skills"])

            if matched:
                recommended.append({
                    "job_title": job["title"],
                    "matched_skills": list(matched)
                })

        return {
            "success": True,
            "recommendations": recommended
        }