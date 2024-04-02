from pydantic import BaseModel
from typing import List

class UserPayload(BaseModel):
    username: str
    password: str

class Item(BaseModel):
    product_id: int
    quantity: int

class CartPayload(BaseModel):
    items: List[Item]