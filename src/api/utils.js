export const generateBody = (object) => {
    let body = '';
    let first = true;
    for (let key in object) {
        let value = typeof object[key] === 'undefined' ? '' : object[key];
        let result = key + '=' + value;
        if (first) {
            body = result;
            first = false;
        } else {
            body += '&' + result;
        }
    }
    return body;
}