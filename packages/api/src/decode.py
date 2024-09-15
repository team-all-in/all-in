import os
import binascii
from dotenv import load_dotenv
from Crypto.Cipher import AES

# .envファイルを読み込む
load_dotenv()

# AES-256-CBCで復号する関数
def decrypt(encrypted_data):
    key = binascii.unhexlify(os.getenv('KEY'))
    iv = binascii.unhexlify(os.getenv('IV'))
    cipher = AES.new(key, AES.MODE_CBC, iv)
    decrypted_data = cipher.decrypt(binascii.unhexlify(encrypted_data))

    # PKCS#7パディングを取り除く
    pad_len = decrypted_data[-1]
    decrypted_data = decrypted_data[:-pad_len]

    return decrypted_data.decode('utf-8')
