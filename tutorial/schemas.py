from pydantic import BaseModel


class StaffBase(BaseModel):
    name: str
    lastname: str
    email: str
    phone: str


class StaffCreate(StaffBase):
    id: int


class StaffResponse(StaffBase):
    id: int

    model_config = {"from_attributes": True}


class StaffUpdate(BaseModel):
    name: str | None = None
    lastname: str | None = None
    email: str | None = None
    phone: str | None = None
