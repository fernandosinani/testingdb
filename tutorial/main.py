from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import engine, get_db
from models import Base, Staff
from schemas import StaffCreate, StaffResponse, StaffUpdate

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Kontakt info")


@app.post("/staff", response_model=StaffResponse, status_code=201)
def create_staff(staff: StaffCreate, db: Session = Depends(get_db)):
    existing = db.get(Staff, staff.id)
    if existing:
        raise HTTPException(status_code=409, detail="Staff member with this ID already exists")
    db_staff = Staff(**staff.model_dump())
    db.add(db_staff)
    db.commit()
    db.refresh(db_staff)
    return db_staff


@app.get("/staff", response_model=list[StaffResponse])
def list_staff(db: Session = Depends(get_db)):
    return db.query(Staff).all()


@app.get("/staff/{staff_id}", response_model=StaffResponse)
def get_staff(staff_id: int, db: Session = Depends(get_db)):
    staff = db.get(Staff, staff_id)
    if not staff:
        raise HTTPException(status_code=404, detail="Staff member not found")
    return staff


@app.put("/staff/{staff_id}", response_model=StaffResponse)
def update_staff(staff_id: int, staff_data: StaffUpdate, db: Session = Depends(get_db)):
    staff = db.get(Staff, staff_id)
    if not staff:
        raise HTTPException(status_code=404, detail="Staff member not found")
    update_fields = staff_data.model_dump(exclude_unset=True)
    for field, value in update_fields.items():
        setattr(staff, field, value)
    db.commit()
    db.refresh(staff)
    return staff


@app.delete("/staff/{staff_id}", status_code=204)
def delete_staff(staff_id: int, db: Session = Depends(get_db)):
    staff = db.get(Staff, staff_id)
    if not staff:
        raise HTTPException(status_code=404, detail="Staff member not found")
    db.delete(staff)
    db.commit()
