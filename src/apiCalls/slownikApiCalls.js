import {getCurrentUser} from "../helpers/authHelper";

const slownikBaseUrl = 'http://localhost:3000/api/Slownik'

export function getSlowaApiCall()
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
    const promise = fetch(slownikBaseUrl,req);
    return promise;
}
export function deleteSlowoApiCall(idSlowo)
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
    const url = `${slownikBaseUrl}/delete/${idSlowo}`;
    const promise = fetch(url,req);
    return promise;
}

export function addSlowaApiCall(sam)
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
    const url=`${slownikBaseUrl}/add`
    const promise= fetch(url,req)
    return promise;
}
export function editSlowaApiCall(idSlowo,slowo)
{
    slowo.idSlowo=idSlowo;
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
        body: JSON.stringify(slowo)
    };
    const url=`${slownikBaseUrl}/edit/${idSlowo}`
    const promise= fetch(url,req)
    return promise;
}
export function getSlowoApiCall(idSlowo)
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
    const url=`${slownikBaseUrl}/${idSlowo}`
    const promise= fetch(url,req)
    return promise;
}

