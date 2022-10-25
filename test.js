const querystring = require("querystring");

const filter = {
    "filter[task_type][]":"FIELD_ID.CHECK_PRICE_TASK_ID",
		"filter[entity_type][]": "leads",
		"filter[entity_id][]": 4,
}

const url = `/api/v4/tasks?${querystring.stringify(
    filter
)}`;

console.log(url)

const complete_date = []
console.log(Array.isArray(complete_date))