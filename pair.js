const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
const { upload } = require('./mega')
var auth_path = './sessions/'
let router = express.Router()
const pino = require("pino");
const {
    default: Maher_Zubair,
    useMultiFileAuthState,
    delay,
    jidNormalizedUser,
    makeCacheableSignalKeyStore,
    Browsers
} = require("@whiskeysockets/baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
        async function SIGMA_MD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./sessions')
     try {
            let Pair_Code_By_Maher_Zubair = Maher_Zubair({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: ["Ubuntu", "Chrome", "20.0.04"],
             });
             if(!Pair_Code_By_Maher_Zubair.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await Pair_Code_By_Maher_Zubair.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            Pair_Code_By_Maher_Zubair.ev.on('creds.update', saveCreds)
            Pair_Code_By_Maher_Zubair.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(5000);
                let data =  fs.readFileSync('./sessions/creds.json')
                await delay(800);
                const user_jid = jidNormalizedUser(Pair_Code_By_Maher_Zubair.user.id);
                                   const mega_url = await upload(fs.createReadStream(auth_path + 'creds.json'), `${user_jid}.json`);
                const string_session = mega_url.replace('https://mega.nz/file/', '')
                                   let sessionmsg = await Pair_Code_By_Maher_Zubair.sendMessage(Pair_Code_By_Maher_Zubair.user.id, { text: 'DIMENSION-X~' + string_session });

                let SIGMA_MD_TEXT = `⚠️ *Do not share this code with others. Use this to create the DIMENSION-X bot.*

GITHUB: https://github.com/

OUR CHANNEL:  https://whatsapp.com/channel/0029VaZn08Q7j6gBT4I8Ig23

CONNECT DEV: https://wa.me/94766632281`

    await Pair_Code_By_Maher_Zubair.sendMessage(Pair_Code_By_Maher_Zubair.user.id, { text: SIGMA_MD_TEXT ,
contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363261989936335@newsletter',
      newsletterName: 'ᦔ𝓲ꪑꫀꪀ𝘴𝓲ꪮꪀ-᥊',
      serverMessageId: 127
    },
externalAdReply: {
title: 'ＤＩＭＥＮＳＩＯＮ-Ｘ',
body: 'ᴡ ʜ ᴀ ᴛ ꜱ ᴀ ᴘ ᴘ  ᴍ ᴏ ᴠ ɪ ᴇ  ʙ ᴏ ᴛ',
mediaType: 1,
sourceUrl: "https://whatsapp.com/channel/0029VaZn08Q7j6gBT4I8Ig23" ,
thumbnailUrl: 'https://i.ibb.co/0XpH6Hy/2668b757ad5bb759.jpg' ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}},{quoted:sessionmsg })

        await delay(100);
        await Pair_Code_By_Maher_Zubair.ws.close();
        return await removeFile('./sessions');
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    SIGMA_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./sessions');
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await SIGMA_MD_PAIR_CODE()
});
module.exports = router