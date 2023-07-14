const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewars");

const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getContacts);

router.get("/:id", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema, `missing fields`),
  ctrl.addNewContact
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema, `missing fields`),
  ctrl.getContactById
);

router.patch(
  "/:id/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema, `missing field favorite`),
  ctrl.updateFavorite
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

module.exports = router;
