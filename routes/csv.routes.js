const { requireUser } = require("../middlewares/requireUser.js");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

module.exports = app => {
    const csv = require("../controllers/csv.controller.js");

    app.get('/csv/get-data', requireUser, csv.getJsonData);
    app.post('/csv/upload', upload.single('file'), requireUser, csv.processCsvToJson);
}