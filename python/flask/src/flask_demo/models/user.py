from dataclasses import dataclass
from typing import Optional


@dataclass
class User:
    """User model."""
    name: str
    email: str
    age: Optional[int] = None

    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "age": self.age
        }
