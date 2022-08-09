export function checkRequired(value)
{
    if(!value)
        return false;
    value=value.toString().trim();
    return value !== "";
}
export function checkTextLengthRange (value,min,max)
{
    if(!value)
        return false
    value=value.toString().trim();
    const length = value.length;
    if(max && length > max)
        return false;
    if(min && length < min)
        return false;
    return true;
}
export function checkDate(value,realDate)
{
    const dateValue = new Date(value);
    const dateReal = new Date(realDate);
    console.log("DATY")
    console.log(dateValue)
    console.log(realDate)
    console.log(realDate<=dateValue +"Czy realdate jest mniejsze równe dateValue")


    return dateReal >= dateValue;
}
export function checkLetters(value)
{
    let valid=true;
    value=value.toString().trim();
    for (let i = 0; i <value.toString().length ; i++)
    {
        if(!isLetter(value.toString()[i]))
        {
            valid=false;
        }
    }
    return valid;
}
export function checkNumbers(value)
{
    let valid=true;
    value=value.toString().trim();
    for (let i = 0; i <value.toString().length ; i++)
    {
        if(!isNumber(value.toString()[i]))
        {
            valid=false;
        }
    }
    return valid;
}
function isLetter(character)
{
    return (/[a-zA-Z]/).test(character);
}
function isNumber(character)
{
    return (/[0-9]/).test(character);
}