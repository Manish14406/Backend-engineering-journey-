from security import create_access_token


token = create_access_token(1)

print("JWT:")
print(token)