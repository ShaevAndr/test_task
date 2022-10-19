/**
 * Основной модуль приложения - точка входа.
 */

const express = require("express");
const api = require("./api");
const logger = require("./logger");
const config = require("./config");
const utils = require("./utils")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function get_age(date) {
    const birthdate = new Date(date*1000)
    const today = new Date()

	if (birthdate > today) {
		return undefined}

    const age = today.getFullYear()-birthdate.getFullYear()
    if (today.getMonth()<=birthdate.getMonth() && today.getDate()<birthdate.getDate()) {
        return age - 1
    }
    return age
}



api.getAccessToken().then(() => {
	app.get("/ping", (req, res) => res.send("pong " + Date.now()));

	app.post("/", (req, res) => {
		for (contact of req.body.contacts.add) {
			api.getContact(contact.id)
			.then(data=>{
				const birthday = utils.getFieldValue(data.custom_fields_values, 1157239)
				
				if (!birthday) {
					throw new Error('дата рождения не задана')
				}
				
				const customer_age = get_age(birthday)
				if (!customer_age) {
					throw new Error('неверная дата рождения')
				}	
				
				data.custom_fields_values = [...data.custom_fields_values, utils.makeField(1159055, customer_age)]
				api.updateContacts(data)
			})
			.catch(error=>console.log(error))
		}

		return res.send("ok")
	});

	app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));
});
