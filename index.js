/**
 * Основной модуль приложения - точка входа.
 */

const express = require("express");
const api = require("./api");
const logger = require("./logger");
const config = require("./config");
const utils = require("./utils");
const FIELD_ID = require("./constants");
const { createNote } = require("./api");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const checkTask = async (dealId)=> {
	const filters = {
		"filter[task_type][]": FIELD_ID.CHECK_PRICE_TASK_ID,
		"filter[entity_type][]": "leads",
		"filter[entity_id][]": dealId,
	}

	const task = await api.getTasks({filters})
	.then(data=>data)
	return task
}

const createNewTask = (dealId) => {
	const complete_date = Math.ceil((new Date().getTime() + 86400000)/1000)
		const newTask = {
			"task_type_id": FIELD_ID.CHECK_PRICE_TASK_ID,
			"text": "Проверить бюджет",
			"complete_till": complete_date,
			"entity_id": dealId,
			"entity_type": "leads",
		}
		api.createTasks(newTask)
}

const createLeadNote = (leadId) => {
	const data = {
		"entity_id": leadId,
		"note_type": "common",
		"params":{
			"text": "Бюджет проверен, ошибок нет"
			}
		}
	api.createNote(data)
}

api.getAccessToken().then(() => {
	let i = 1
	app.get("/ping", (req, res) => res.send("pong " + Date.now()));

	
	app.post("/", async (req, res) => {
		console.log(i++)
		const [lead] = req.body.leads.update ? req.body.leads.update : req.body.leads.add
		const deal = await api.getDeal(lead.id, ["contacts"])
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
		
		const haveTask = await checkTask(deal.id)
		if (!haveTask) {
			createNewTask(deal.id)
		}
	});

	app.post("/change_task", async (req, res) => {
		const [task] = req.body.task.update
		if (task.status === '0') {
			return
		}
		
		const currnetTask = await api.getTask(task.id)
		createLeadNote(currnetTask.entity_id)
		
	});

	app.post("/create_lead", (req, res)=>{
		console.log(req.body)
	})


	app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));
});
