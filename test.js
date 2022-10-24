const querystring = require("querystring");
const filters = {'filter1':5, 'filter2':5}

const url = `/api/v4/tasks?${querystring.stringify({
    limit:5,
    filter:4,
    ...filters,
})}`

console.log(url)