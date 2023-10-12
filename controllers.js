const fs = require('fs');
const jwt = require('jsonwebtoken');
const { calculateSummaryStatistics } = require('./utils/statistics');

const datasetFilePath = './utils/dataset.json';


try {
    const data = fs.readFileSync(datasetFilePath, 'utf8');
    dataset = JSON.parse(data);
} catch (err) {
    console.error('Error reading data from file:', err);
}

const secretKey = 'PW_Divyanshu';

function saveDatasetToFile() {
    fs.writeFileSync(datasetFilePath, JSON.stringify(dataset, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing data to file:', err);
        }
    });
}

function authenticate(req, res) {
    try {
        const { username, password } = req.body;
        if (username === 'username123' && password === 'password123') {
            const token = jwt.sign({ username }, secretKey);
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function authorize(req, res, next) {
    try {
        const token = req.header('Authorization').split(' ')[1]; 
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid token found' });
    }
}

async function addRecord(req, res) {
    try {
        const { name, salary, department, sub_department, on_contract } = req.body;
        if (!name || !salary || !department || !sub_department) {
            return res.status(400).json({ error: 'Fields cannot be left empty' });
        }
        const existingRecord = dataset.find(record => record.name === name);
        if (existingRecord) {
            return res.status(409).json({ error: 'Record with this name already exists' });
        }
        const newRecord = {
            name,
            salary,
            department,
            sub_department,
            on_contract
        };
        dataset.push(newRecord);

        // Write updated dataset to JSON file
        saveDatasetToFile();

        res.json({ message: 'Record added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteRecord(req, res) {
    try {
        const name = req.params.name;
        const index = dataset.findIndex(record => record.name === name);
        if (index === -1) {
            return res.status(404).json({ error: 'Record not found' });
        }
        dataset.splice(index, 1);

        // Write updated dataset to JSON file
        saveDatasetToFile();

        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function calculateSummary(req, res) {
    try {
        const salaries = dataset.map(record => parseFloat(record.salary));
        const summary = calculateSummaryStatistics(salaries);
        res.json(summary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function calculateSummaryContract(req, res) {
    try {
        const filteredSalaries = dataset
            .filter(record => record.on_contract === 'true')
            .map(record => parseFloat(record.salary));
        const summary = calculateSummaryStatistics(filteredSalaries);
        res.json(summary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function calculateDepartmentSummary(req, res) {
    try {
        const departments = Array.from(new Set(dataset.map(record => record.department)));
        const departmentSummaries = departments.map(department => {
            const filteredSalaries = dataset
                .filter(record => record.department === department)
                .map(record => parseFloat(record.salary));
            const summary = calculateSummaryStatistics(filteredSalaries);
            return { department, ...summary };
        });
        res.json(departmentSummaries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function calculateDepartmentSubSummary(req, res) {
    try {
        const departmentSubDepartmentSummaries = [];
        dataset.forEach(record => {
            const { department, sub_department, salary } = record;
            const filteredSalaries = dataset
                .filter(item => item.department === department && item.sub_department === sub_department)
                .map(item => parseFloat(item.salary));
            const summary = calculateSummaryStatistics(filteredSalaries);
            departmentSubDepartmentSummaries.push({ department, sub_department, ...summary });
        });
        res.json(departmentSubDepartmentSummaries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    authenticate,
    authorize,
    addRecord,
    deleteRecord,
    calculateSummary,
    calculateSummaryContract,
    calculateDepartmentSummary,
    calculateDepartmentSubSummary
};
