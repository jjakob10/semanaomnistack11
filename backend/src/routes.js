const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const OngController = require("./controllers/OngController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const IncidentController = require("./controllers/IncidentController")


const routes = express.Router();

routes.post("/sessions", SessionController.create)

routes.get("/ongs", OngController.index);
routes.post("/ongs", celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.number().required().min(10).max(12),
    city: Joi.string().required(),
    uf: Joi.string().required().length()
  })
}), OngController.create);

routes.get("/profile", ProfileController.index);

routes.post("/incidents", IncidentController.create);
routes.get("/incidents", IncidentController.index);
routes.delete("/incidents/:id", IncidentController.delete);

module.exports = routes;