import {getCurrentUser} from "../helpers/authHelper";

const szkolniakBaseUrl = 'http://localhost:3000/api/Szkolniaks'

export function getSzkolniakApiCall()
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
    const promise = fetch(szkolniakBaseUrl,req);
    return promise;
}

export function deleteSzkolniakApiCall(szkolId)
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
    const url=`${szkolniakBaseUrl}/delete/${szkolId}`
    const promise= fetch(url,req)
    return promise;
}

export function getSzkolniakByIdApiCall(szkolId)
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
    const url=`${szkolniakBaseUrl}/${szkolId}`
    const promise= fetch(url,req)
    return promise;
}

export function addSzkolniakApiCall(szkol)
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
        body: JSON.stringify(szkol)
    };
    const url=`${szkolniakBaseUrl}/add`
    const promise= fetch(url,req)
    return promise;
}
export function editSzkolniakApiCall(idSzkol,szkol)
{
    szkol.idBio=1;
    szkol.idSzkolniak=idSzkol;
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
        body: JSON.stringify(szkol)
    };
    console.log(szkol.idSzkolniak)
    console.log(szkol);
    const url=`${szkolniakBaseUrl}/edit/${idSzkol}`
    const promise= fetch(url,req)
    return promise;
}


export function getSzkolniakandAfera(szkolId)
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
    const url=`${szkolniakBaseUrl}/details/${szkolId}`
    const promise = fetch(url,req);
    return promise;
}

export function deleteSzkolniakAfera(szkolId,aferaId)
{
    const user = getCurrentUser();
    let token;
    if(user&&user.token)
        token=user.token;
    const url=`${szkolniakBaseUrl}/deleteAfera/${szkolId}/${aferaId}`
    const req = {
        headers:
            {
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+token
            }
    };
    const promise= fetch(url,req)
    return promise;
}

export function addSzkolniaktoAferaApiCall(aferaId,szkolId)
{
    const szkol=
        {
            idAfera:szkolId,
            idSzkolniak:aferaId
        }
    const user = getCurrentUser();
    let token;
    if(user&&user.token)
        token=user.token;
    const url=`${szkolniakBaseUrl}/addAfera`
    const req = {
        method: 'POST',
        headers:
            {
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+token
            },
        body: JSON.stringify(szkol)
    };
    const promise= fetch(url,req)
    return promise;
}

export function addSzkolniaktoPotrawaApiCall(szkolId,idPotrawa)
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
    const url=`${szkolniakBaseUrl}/addPotrawa/${szkolId}/${idPotrawa}`
    const promise= fetch(url,req)
    return promise;
}

export function deleteSzkolniaktoPotrawaApiCall(szkolId,idPotrawa)
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
    const url=`${szkolniakBaseUrl}/deletePotrawa/${szkolId}/${idPotrawa}`
    const promise= fetch(url,req)
    return promise;
}