const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticate, authorize, addRecord, deleteRecord, calculateSummary, calculateSummaryContract, calculateDepartmentSummary, calculateDepartmentSubSummary } = require('./controllers');

const routes = express.Router();


const validateRequestSchema = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

routes.post('/auth', [
    body('username').isString(),
    body('password').isString()
], validateRequestSchema, authenticate);

routes.post('/add', [
    body('name').isString(),
    body('salary').isNumeric(),
    body('department').isString(),
    body('sub_department').isString(),
    body('on_contract').isString()
], validateRequestSchema, authorize, addRecord);

routes.delete('/record/:name', validateRequestSchema, authorize, deleteRecord);


routes.get('/salary-summary', calculateSummary);

routes.get('/salary-summary-contract', calculateSummaryContract);

routes.get('/salary-summary-department', calculateDepartmentSummary);

routes.get('/salary-summary-department-sub', calculateDepartmentSubSummary);

module.exports = routes;
