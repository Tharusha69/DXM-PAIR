//=================npm======================
const express = require("express");
const router = express.Router();
const fs = require("fs");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
const cheerio = require("cheerio");
const axios = require("axios");
//========================lib============================
const errmg = 'Server is busy now. Try again later. Please report to the help center !!'
const l = console.log
const { copilot } = require("./lib/copliot");
//====================================functions===========================
const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

const runtime = (seconds) => {
	seconds = Number(seconds)
	var d = Math.floor(seconds / (3600 * 24))
	var h = Math.floor(seconds % (3600 * 24) / 3600)
	var m = Math.floor(seconds % 3600 / 60)
	var s = Math.floor(seconds % 60)
	var dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : ''
	var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : ''
	var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : ''
	var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : ''
	return dDisplay + hDisplay + mDisplay + sDisplay;
}


router.get("/", (req, res) => {
    res.send("./html/index.html");
});

router.get("/status", (req, res) => {
        res.send({runtime: `${runtime(process.uptime())}`,ram: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB`});
});

router.get("/ai/codemirror", (req, res) => {
    const url = req.query.q || req.query.query;
    if(!url) return res.send({status: false, owner: '@vihangayt0', err: 'Please give me a prompt !'});
    copilot(url)
        .then(async(dadsta) => {
            res.send({status: true, owner: '@vihangayt0', data: dadsta });
            
        })
        .catch((err) => {
            res.send({status: false, owner: '@vihangayt0', err: errmg});
            l(err)
        });
});



module.exports = router;