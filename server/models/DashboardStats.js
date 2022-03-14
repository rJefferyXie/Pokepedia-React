const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DashboardSchema = new Schema({
    users: Schema.Types.Mixed,
    regions: Schema.Types.Mixed,
    pokemon: Schema.Types.Mixed,
    types: Schema.Types.Mixed,
});

module.exports = DashboardStats = mongoose.model("dashboardStats", DashboardSchema);