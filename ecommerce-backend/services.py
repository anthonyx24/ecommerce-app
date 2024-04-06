import models
from sqlalchemy.orm import Session
from schemas import CartPayload

def create_user(username: str, password: str, db: Session):
    # Check if username already exists in the database
    existing_user = db.query(models.User).filter(models.User.username == username).first()
    if existing_user:
        return "Username already exists"
    user = models.User(username=username, password=password)
    db.add(user)
    db.commit()
    
    # Now return the user id
    return db.query(models.User).filter(models.User.username == username).first().id

def authenticate_user(username: str, password: str, db: Session):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        return "User not found"
    if user.password != password:
        return "Password incorrect"
    return user.id

def get_cart(user_id: int, db: Session):
    items = db.query(models.Item).filter(models.Item.user_id == user_id).all()
    return items

def update_cart(cart: CartPayload, user_id: int, db: Session):
    # Clear all items from the cart
    db.query(models.Item).filter(models.Item.user_id == user_id).delete()
    db.commit()
    
    # Add all items from the cart
    for item in cart.items:
        db.add(models.Item(user_id=user_id, id=item.id, quantity=item.quantity))
    db.commit()
    return "Cart updated"

# def add_item(user_id: int, product_id: int, quantity: int, db: Session):
#     # If product id already exists in the cart, then just increase existing quantity by the new quantity
#     existing_item = db.query(models.Item).filter(models.Item.user_id == user_id and models.Item.product_id == product_id).first()
#     if existing_item:
#         item.quantity += quantity
#         db.commit()
#         return "Added to existing item"

#     item = models.Item(user_id=user_id, product_id=product_id, quantity=quantity)
#     db.add(item)
#     db.commit()
#     return "Created new item"

# def update_item(user_id: int, product_id: int, quantity: int, db: Session):
#     item = db.query(models.Item).filter(models.Item.user_id == user_id and models.Item.product_id == product_id).first()
#     item.quantity = quantity
#     db.commit()
#     return "Item updated"

# def remove_item(user_id: int, product_id: int, db: Session):
#     item = db.query(models.Item).filter(models.Item.user_id == user_id and models.Item.product_id == product_id).first()
#     db.delete(item)
#     db.commit()
#     return "Item removed"

