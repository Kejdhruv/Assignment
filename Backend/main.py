from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from Functions.dag import is_dag
from fastapi.middleware.cors import CORSMiddleware 


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ping": "Pong"}


# -------- Models --------

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

# -------- API --------

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    nodes = [node.dict() for node in pipeline.nodes]
    edges = [edge.dict() for edge in pipeline.edges]

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag(nodes, edges)
    }