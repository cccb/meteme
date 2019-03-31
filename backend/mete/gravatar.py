

"""
Implement gravatar avatar fetching and local caching
"""

import hashlib


def gravahash(email: str) -> str:
    """Calculate md5sum of normalized email"""
    email = email.strip().lower()
    md5sum = hashlib.md5()
    md5sum.update(email.encode())
    hexhash = md5sum.hexdigest()

    return hexhash


def avatar_url(email: str) -> str:
    """Get avatar url"""
    email_hash = gravahash(email)

    return f"https://www.gravatar.com/avatar/{email_hash}?d=404&s=250&r=x"


