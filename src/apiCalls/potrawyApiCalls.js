import {getCurrentUser} from "../helpers/authHelper";

const potrawyBaseUrl = 'http://localhost:3000/api/Potrawy'

export function getPotrawyApiCall()
{
    const user = getCurrentUser();
    let token;
    if(user&&user.token)
        token=user.token;
    const req = {
        headers:
            {
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+token
            }
    };
    const promise = fetch(potrawyBaseUrl,req);
    return promise;
}
export function deletePotrawyApiCall(idPotrawa)
{
    const user = getCurrentUser();
    let token;
    if(user&&user.token)
        token=user.token;
    const req = {
        headers:
            {
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+token
            }
    };
    const url = `${potrawyBaseUrl}/delete/${idPotrawa}`;
    const promise = fetch(url,req);
    return promise;
}

export function addPotrawyApiCall(potrawa)
{
    const user = getCurrentUser();
    let token;
    if(user&&user.token)
        token=user.token;
    const req = {
        method: 'POST',
        headers:
            {
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+token
            },
        body: JSON.stringify(potrawa)
    };
    const url=`${potrawyBaseUrl}/add`
    const promise= fetch(url,req)
    return promise;
}
export function editPotrawyApiCall(idPotrawa,potrawa)
{
    const user = getCurrentUser();
    let token;
    if(user&&user.token)
        token=user.token;
    potrawa.idPotrawa=idPotrawa;
    const req = {
        method: 'PUT',
        headers:
            {
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+token
            },
        body: JSON.stringify(potrawa)
    };
    const url=`${potrawyBaseUrl}/edit/${idPotrawa}`
    const promise= fetch(url,req)
    return promise;
}
export function getPotrawyByIdApiCall(idPotrawa)
{
    const user = getCurrentUser();
    let token;
    if(user&&user.token)
        token=user.token;
    const req = {
        headers:
            {
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+token
            }
    };
    const url=`${potrawyBaseUrl}/${idPotrawa}`
    const promise= fetch(url,req)
    return promise;
}

