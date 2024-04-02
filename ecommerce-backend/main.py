from fastapi import FastAPI, Path, Depends
from fastapi.middleware.cors import CORSMiddleware
import os

import models
from schemas import UserPayload, CartPayload
from database import engine, SessionLocal
from sqlalchemy.orm import Session

import services

app = FastAPI()

# Creates database if it doesn't exist
models.Base.metadata.create_all(bind=engine)

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# TEST ENDPOINT
@app.get("/")
def read_root():
    return "Hello World"

# LOGIN/SIGNUP ENDPOINTS
@app.post("/signup")
def signup(user: UserPayload, db: Session = Depends(get_db)):
    return services.create_user(user.username, user.password, db)

@app.post("/login")
def login(user: UserPayload, db: Session = Depends(get_db)):
    return services.authenticate_user(user.username, user.password, db)

# SHOPPING ENDPOINTS
@app.get("/cart/{user_id}")
def get_cart(user_id: int, db: Session = Depends(get_db)):
    return services.get_cart(user_id, db)

@app.post("/cart/{user_id}")
def update_cart(cart: CartPayload, user_id: int, db: Session = Depends(get_db)):
    return services.update_cart(cart, user_id, db)

# @app.post("/cart/{user_id}")
# def add_item(item: ItemData, user_id: int, db: Session = Depends(get_db)):
#     return services.add_item(user_id, item.product_id, item.quantity, db)

# @app.put("/cart/{user_id}")
# def update_item(item: ItemData, user_id: int, db: Session = Depends(get_db)):
#     return services.update_item(user_id, item.product_id, item.quantity, db)

# @app.delete("/cart/{user_id}")
# def remove_item(item: RemoveItemData, user_id: int, db: Session = Depends(get_db)):
#     return services.remove_item(user_id, item.product_id, db)