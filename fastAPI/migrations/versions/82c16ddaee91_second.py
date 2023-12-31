"""second

Revision ID: 82c16ddaee91
Revises: f5a56e13f53a
Create Date: 2023-08-28 16:45:23.184192

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '82c16ddaee91'
down_revision: Union[str, None] = 'f5a56e13f53a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('movies', sa.Column('isDone', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('movies', 'isDone')
    # ### end Alembic commands ###
