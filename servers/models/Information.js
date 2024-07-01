const mongoose = require('mongoose')
const { act } = require('react')


const InfoSchema = new mongoose.Schema({
    actName: String,
    actText: String,
    actImgs: String,
    mediaUrl: String,
    actBrief: String,
    actAssessment: String,
    form: String,
    interactionNum: String,
    startDate: String,
    endDate: String,
    filterList: Array
})
const InfoModel = mongoose.model("act-information", InfoSchema)
module.exports = InfoModel