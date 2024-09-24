from logging import getLogger


def newLogger(name: str):
    return getLogger(f"uvicorn.{name}")
