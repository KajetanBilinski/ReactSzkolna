import {getCurrentUser} from "../helpers/authHelper";

const aferaBaseUrl = 'http://localhost:3000/api/Afery'

export function getAferaApiCall()
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
    const promise = fetch(aferaBaseUrl,req);
    return promise;
}

export function getAferaByIdApiCall(aferaId)
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
    const url=`${aferaBaseUrl}/${aferaId}`
    const promise = fetch(url,req);
    return promise;
}

export function deleteAferaApiCall(aferaId)
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
    const url=`${aferaBaseUrl}/delete/${aferaId}`
    const promise = fetch(url,req);
    return promise;
}

export function addAferaApiCall(sam)
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
        body: JSON.stringify(sam)
    };
    const url=`${aferaBaseUrl}/add`
    const promise= fetch(url,req)
    return promise;
}
export function editAferaApiCall(aferaId,afera)
{
    afera.idAfera=aferaId;

    const user = getCurrentUser();
    let token;
    if(user&&user.token)
        token=user.token;

    const req = {
        method: 'PUT',
        headers:
            {
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+token
            },
        body: JSON.stringify(afera)
    };
    const url=`${aferaBaseUrl}/edit/${aferaId}`
    const promise= fetch(url,req)
    return promise;
}

