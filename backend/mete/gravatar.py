

"""
Implement gravatar avatar fetching and local caching
"""

import hashlib
from os.path import basename
from urllib.request import urlretrieve
from urllib.parse import urlsplit

from django.core.files import File

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


def download_to_account(account):
    """Download avatar"""
    if not account.user.email:
        return

    # Download gravatar
    url = avatar_url(account.user.email)
    try:
        tempname, _ = urlretrieve(url)
    except:
        return

    account.avatar.save(
        basename(urlsplit(url).path), File(open(tempname, 'rb')))
    
