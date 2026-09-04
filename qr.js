const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('eCmCuhvbpwR5CHhMX0PeXsGJ5yQS9lRO')
const {makeid} = require('./id');
const QRCode = require('qrcode');
var auth_path = './sessions/'
const express = require('express');
const path = require('path');
const fs = require('fs');
const { upload } = require('./mega')
let router = express.Router()
const pino = require("pino");
const {
	default: Maher_Zubair,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require('@whiskeysockets/baileys')

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function SIGMA_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./sessions')
		try {
			let Qr_Code_By_Maher_Zubair = Maher_Zubair({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Maher_Zubair.ev.on('creds.update', saveCreds)
			Qr_Code_By_Maher_Zubair.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					const session = fs.readFileSync('./sessions/creds.json')
					await delay(800);
				   const user_jid = jidNormalizedUser(Qr_Code_By_Maher_Zubair.user.id);
				   const mega_url = await upload(fs.createReadStream(auth_path + 'creds.json'), `${user_jid}.json`);
                const string_session = mega_url.replace('https://mega.nz/file/', '')
				   let sessionmsg = await Qr_Code_By_Maher_Zubair.sendMessage(Qr_Code_By_Maher_Zubair.user.id, { text: 'cyber-x@;;;' + string_session });
	
				   let SIGMA_MD_TEXT = `* Pair Code Connecting Successfully*

Don't share this code with any others

https://wa.me/94740952096

*ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ*`
	 await Qr_Code_By_Maher_Zubair.sendMessage(Qr_Code_By_Maher_Zubair.user.id,{text:SIGMA_MD_TEXT},{quoted:sessionmsg})



					await delay(100);
					await Qr_Code_By_Maher_Zubair.ws.close();
					return await removeFile("sessions");
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					SIGMA_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service Unavailable"
				});
			}
			console.log(err);
			await removeFile("sessions");
		}
	}
	return await SIGMA_MD_QR_CODE()
});
module.exports = router
