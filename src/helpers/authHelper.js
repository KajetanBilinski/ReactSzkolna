export function getCurrentUser()
{
    return JSON.parse(localStorage.getItem('user'));
}
export function isAuthenticated()
{
    const user= getCurrentUser()
    return !!user;
}

export function isBoss()
{
    const user= getCurrentUser()
    if(user)
    {
        return user.idSzkolniak===1
    }
    return false;
}


