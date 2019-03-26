
"""
Utilities
"""


def sort_users(users):
    """Sort users by username"""
    return sorted(users, key=lambda u: u.account.canonical_name)

