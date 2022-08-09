import {getCurrentUser} from "../helpers/authHelper";

const samochodyBaseUrl = 'http://localhost:3000/api/Samochody'

export function getSamochodyApiCall()
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
    const promise = fetch(samochodyBaseUrl,req);
    return promise;
}
export function deleteSamochodApiCall(SamochodId)
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
    const url = `${samochodyBaseUrl}/delete/${SamochodId}`;
    const promise = fetch(url,req);
    return promise;
}

export function addSamochodApiCall(sam)
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
    const url=`${samochodyBaseUrl}/add`
    const promise= fetch(url,req)
    return promise;
}
export function editSamochodApiCall(idSam,sam)
{
    sam.idSamochod=idSam;
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
        body: JSON.stringify(sam)
    };
    const url=`${samochodyBaseUrl}/edit/${idSam}`
    const promise= fetch(url,req)
    return promise;
}
export function getSamochodyByIdApiCall(SamochodId)
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
    const url=`${samochodyBaseUrl}/${SamochodId}`
    const promise= fetch(url,req)
    return promise;
}

