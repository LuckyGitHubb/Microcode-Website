const mongoose = require('mongoose');
const moment = require("moment");

const careerSchema = new mongoose.Schema({
    name:{ type: String },
    mobile: { type: String },
    email: { type: String },
    jobTitle: { type: String },
    file: { type: String },
    coverLetter: { type: String },
    createdAt: { type: String, default: () => moment().format("DD-MM-YYYY hh:mm A") },
    updatedAt: { type: String, default: () => moment().format("DD-MM-YYYY hh:mm A") },
});

careerSchema.pre("save", function (next) {
    this.updatedAt = moment().format("DD-MM-YYYY hh:mm A");
    next();
});

careerSchema.pre("findOneAndUpdate", function (next) {
    this.set({ updatedAt: moment().format("DD-MM-YYYY hh:mm A") });
    next();
});

careerSchema.pre("updateMany", function (next) {
    this.set({ updatedAt: moment().format("DD-MM-YYYY hh:mm A") });
    next();
});

const Career = mongoose.model("Career", careerSchema);
module.exports = Career;
