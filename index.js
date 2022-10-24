/**
 * Основной модуль приложения - точка входа.
 */

const express = require("express");
const api = require("./api");
const logger = require("./logger");
const config = require("./config");
const utils = require("./utils");
const FIELD_ID = require("./constants");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


api.getAccessToken().then(() => {
	app.get("/ping", (req, res) => res.send("pong " + Date.now()));

	
	app.post("/", async (req, res) => {
		const [updatedDeal] = req.body.leads.update		
		const deal = await api.getDeal(updatedDeal.id, ["contacts"])
		const services = utils.getFieldValues(deal.custom_fields_values, FIELD_ID.SERVICES)
		const mainContactId = utils.getMainContactId(deal._embedded.contacts)
		
		if (!mainContactId || !services.length) {
			if (deal.price !== 0){
				api.updateDeals({"id": deal.id, "price":0})
			}				
			return 
		}
			
		const contact = await api.getContact(mainContactId)
		const costServices = utils.calculateCostServices(services, contact.custom_fields_values)
		
		if (deal.price === costServices){
			return 
		}

		api.updateDeals({"id": deal.id, "price":costServices})
		const task = await api.getTasks( 10, ['filter[task_type][]=3', 
			'&filter[entity_type][]="leads"',
			`&filter[entity_id][]=${deal.id}`])
		.then(data=>{console.log(data)})
		return 
	});


	app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));
});
