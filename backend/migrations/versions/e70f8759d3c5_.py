"""empty message

Revision ID: e70f8759d3c5
Revises: 3b0a4e9b5e0d
Create Date: 2019-05-14 17:51:33.308826

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e70f8759d3c5'
down_revision = '3b0a4e9b5e0d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('theme', sa.Column('url', sa.String(length=512), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('theme', 'url')
    # ### end Alembic commands ###
