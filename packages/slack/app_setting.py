import os

from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()

# データベース設定
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

supabase_client: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
