const { makeid } = require('./id');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');
const { upload } = require('./mega');
const express = require('express');
const pino = require('pino');
const {
  default: Maher_Zubair,
  useMultiFileAuthState,
  jidNormalizedUser,
  Browsers,
  delay,
} = require('@whiskeysockets/baileys');

let router = express.Router();
var auth_path = './sessions/';

// In-memory store for pending QR buffers & connection state
let qrBuffer = null;
let sessionReady = false;
let connectionClosed = false;

function removeFile(FilePath) {
  if (!fs.existsSync(FilePath)) return false;
  fs.rmSync(FilePath, { recursive: true, force: true });
}

// ── Serve the styled QR page ──────────────────────────────
router.get('/', (req, res) => {
  res.send(buildQrPage());
});

// ── Raw QR image endpoint (polled by the page) ────────────
router.get('/image', async (req, res) => {
  if (qrBuffer) {
    res.setHeader('Content-Type', 'image/png');
    return res.end(qrBuffer);
  }
  // 404 tells the page "not ready yet"
  res.status(404).end();
});

// ── Status endpoint (polled for "connected" state) ────────
router.get('/status', (req, res) => {
  res.json({ ready: sessionReady, closed: connectionClosed });
});

// ── Start Baileys session ─────────────────────────────────
router.get('/start', async (req, res) => {
  qrBuffer = null;
  sessionReady = false;
  connectionClosed = false;

  res.json({ started: true });

  async function SIGMA_MD_QR_CODE() {
    const { state, saveCreds } = await useMultiFileAuthState('./sessions');
    try {
      let sock = Maher_Zubair({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        browser: Browsers.macOS('Desktop'),
      });

      sock.ev.on('creds.update', saveCreds);
      sock.ev.on('connection.update', async (s) => {
        const { connection, lastDisconnect, qr } = s;

        if (qr) {
          qrBuffer = await QRCode.toBuffer(qr);
        }

if (connection === 'open') {
  sessionReady = true;
  await delay(5000);
  const user_jid = jidNormalizedUser(sock.user.id);
  const mega_url = await upload(
    fs.createReadStream(auth_path + 'creds.json'),
    `${user_jid}.json`
  );
  const string_session = mega_url.replace('https://mega.nz/file/', '');

  const vpvv = '`';
  const pvpp = '```';

  let SIGMA_MD_TEXT = `*Hellow, Welcome to* ${pvpp}DIMENSION-X MOVIE DOWNLOADER BOT${pvpp} 👾✅
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

*${vpvv}Do not share This Code ( YOUR SESSION_ID ) with Enyone..! ⚠️${vpvv}*

* *Github Repository :-*
${pvpp}https://github.com/CYBERKILLERSTEAM-OFFICIAL/DIMENSION-X${pvpp}

* *Developer :-*

*𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 :-*
${pvpp}https://wa.me/94766632281${pvpp}

*𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦 :-*
${pvpp}https://t.me/Isuru_Chamika${pvpp}


*© POWERED BY CYBERKILLERSTEAM*`;

  let sessionmsg = await sock.sendMessage(sock.user.id, {
    text: 'cyber-x@;;;' + string_session,
  });

  await sock.sendMessage(
    sock.user.id,
    {
      text: SIGMA_MD_TEXT,
      contextInfo: {
        mentionedJid: [''],
        groupMentions: [],
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363261989936335@newsletter',
          newsletterName: 'D I M E N S I O N  -  X',
          serverMessageId: 127,
        },
        externalAdReply: {
          title: 'D I M E N S I O N  -  X',
          body: 'ᴍ ᴏ ᴠ ɪ ᴇ  ᴅ ᴏ ᴡ ɴ ʟ ᴏ ᴀ ᴅ ᴇ ʀ  ʙ ᴏ ᴛ',
          mediaType: 1,
          sourceUrl: 'https://whatsapp.com/channel/0029VaZn08Q7j6gBT4I8Ig23',
          thumbnailUrl: 'https://i.ibb.co/0XpH6Hy/2668b757ad5bb759.jpg',
          renderLargerThumbnail: false,
          showAdAttribution: true,
        },
      },
    },
    { quoted: sessionmsg }
  );

          await delay(100);
          await sock.ws.close();
          connectionClosed = true;
          removeFile('sessions');
        } else if (
          connection === 'close' &&
          lastDisconnect?.error?.output?.statusCode !== 401
        ) {
          await delay(10000);
          SIGMA_MD_QR_CODE();
        }
      });
    } catch (err) {
      console.log(err);
      removeFile('sessions');
    }
  }

  SIGMA_MD_QR_CODE();
});

// ── HTML page builder ─────────────────────────────────────
function buildQrPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QR Scanner · Cyber-X</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --dmx-jd01: #00ff9d;
      --dmx-jd02: #7b2fff;
      --dmx-jd03: #ff2d78;
      --dmx-jd04: #0a0a0f;
      --dmx-jd05: rgba(0,255,157,0.1);
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      min-height: 100vh;
      background: var(--dmx-jd04);
      font-family: 'Space Grotesk', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    /* grid bg */
    #dmx-jdnd::before {
      content:'';
      position:fixed; inset:0;
      background-image:
        linear-gradient(rgba(0,255,157,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,157,0.03) 1px, transparent 1px);
      background-size:36px 36px;
      animation: jd-grid 22s linear infinite;
      pointer-events:none; z-index:0;
    }
    @keyframes jd-grid {
      0%   { background-position:0 0; }
      100% { background-position:36px 36px; }
    }

    /* glow blobs */
    #dmx-jdnd::after {
      content:'';
      position:fixed;
      width:500px; height:500px; border-radius:50%;
      background:radial-gradient(circle, rgba(123,47,255,0.13) 0%, transparent 70%);
      top:-180px; right:-120px;
      pointer-events:none; z-index:0;
      animation: jd-blob 9s ease-in-out infinite alternate;
    }
    @keyframes jd-blob {
      0%   { transform:scale(1) translate(0,0); }
      100% { transform:scale(1.2) translate(-40px, 60px); }
    }

    /* scan line */
    #dmx-jdsc {
      position:fixed; top:-2px; left:0;
      width:100%; height:2px;
      background:linear-gradient(90deg,transparent,var(--dmx-jd01),transparent);
      opacity:0.22;
      animation: jd-scan 7s linear infinite;
      pointer-events:none; z-index:5;
    }
    @keyframes jd-scan {
      0%   { top:-2px; }
      100% { top:100vh; }
    }

    #dmx-jdgl {
      position:fixed; bottom:-100px; left:-80px;
      width:340px; height:340px; border-radius:50%;
      background:radial-gradient(circle, rgba(255,45,120,0.07) 0%, transparent 70%);
      pointer-events:none; z-index:0;
    }

    /* Card */
    #dmx-jdcd {
      position:relative; z-index:10;
      width:min(440px, calc(100vw - 32px));
    }

    /* Back link */
    #dmx-jdbk {
      display:inline-flex; align-items:center; gap:6px;
      color:rgba(255,255,255,0.28);
      text-decoration:none;
      font-size:0.73rem; letter-spacing:0.08em; text-transform:uppercase;
      margin-bottom:18px;
      transition:color 0.2s;
    }
    #dmx-jdbk:hover { color:var(--dmx-jd01); }

    /* Card body */
    #dmx-jdbd {
      background:rgba(255,255,255,0.03);
      border:1px solid rgba(255,255,255,0.07);
      border-radius:20px;
      padding:32px;
      backdrop-filter:blur(20px);
      position:relative; overflow:hidden;
    }
    #dmx-jdbd::before {
      content:'';
      position:absolute; top:0; left:0; right:0; height:1px;
      background:linear-gradient(90deg,transparent,rgba(0,255,157,0.45),transparent);
    }

    /* Header */
    #dmx-jdhr {
      display:flex; align-items:center; gap:14px;
      margin-bottom:26px;
    }
    #dmx-jdhr .jd-icon-box {
      width:46px; height:46px; border-radius:12px;
      background:rgba(0,255,157,0.1);
      border:1px solid rgba(0,255,157,0.25);
      display:flex; align-items:center; justify-content:center;
      flex-shrink:0;
    }
    #dmx-jdhr .jd-icon-box svg { width:22px; height:22px; color:var(--dmx-jd01); }
    #dmx-jdhr .jd-titles h2 {
      font-size:1.12rem; font-weight:700; color:#fff; letter-spacing:0.02em;
    }
    #dmx-jdhr .jd-titles p {
      font-size:0.71rem; color:rgba(255,255,255,0.32);
      margin-top:3px; letter-spacing:0.04em;
    }

    /* QR frame */
    #dmx-jdqr {
      position:relative;
      width:220px; height:220px;
      margin:0 auto 22px;
    }

    /* Corner brackets */
    #dmx-jdqr::before,
    #dmx-jdqr::after,
    .jd-br, .jd-bl {
      content:'';
      position:absolute;
      width:24px; height:24px;
      border-color:var(--dmx-jd01);
      border-style:solid;
      pointer-events:none;
    }
    #dmx-jdqr::before { top:0; left:0;  border-width:2px 0 0 2px; border-radius:4px 0 0 0; }
    #dmx-jdqr::after  { top:0; right:0; border-width:2px 2px 0 0; border-radius:0 4px 0 0; }
    .jd-br { bottom:0; right:0; border-width:0 2px 2px 0; border-radius:0 0 4px 0; }
    .jd-bl { bottom:0; left:0;  border-width:0 0 2px 2px; border-radius:0 0 0 4px; }

    /* inner area */
    #dmx-jdqr .jd-inner {
      position:absolute;
      inset:10px;
      border-radius:10px;
      overflow:hidden;
      background:rgba(255,255,255,0.03);
      display:flex; align-items:center; justify-content:center;
    }

    #dmx-qr-img {
      width:100%; height:100%;
      object-fit:contain;
      border-radius:8px;
      display:none;
      image-rendering:pixelated;
    }

    /* Placeholder / spinner state */
    #dmx-jdph {
      display:flex; flex-direction:column;
      align-items:center; gap:10px;
      text-align:center;
    }
    #dmx-jdph .jd-spin {
      width:32px; height:32px;
      border:2px solid rgba(0,255,157,0.15);
      border-top-color:var(--dmx-jd01);
      border-radius:50%;
      animation:jd-spin 0.8s linear infinite;
    }
    @keyframes jd-spin { to { transform:rotate(360deg); } }
    #dmx-jdph p {
      font-size:0.72rem; color:rgba(255,255,255,0.3);
      letter-spacing:0.06em;
    }

    /* Status bar */
    #dmx-jdst {
      display:flex; align-items:center; justify-content:center;
      gap:8px;
      font-size:0.7rem; letter-spacing:0.1em; text-transform:uppercase;
      color:rgba(255,255,255,0.28);
      margin-bottom:20px;
    }
    #dmx-jdst .jd-dot {
      width:7px; height:7px; border-radius:50%;
      background:var(--dmx-jd01);
      box-shadow:0 0 6px var(--dmx-jd01);
      animation:jd-blink 2s ease-in-out infinite;
    }
    #dmx-jdst .jd-dot.jd-warn {
      background:#ffd700;
      box-shadow:0 0 6px #ffd700;
    }
    #dmx-jdst .jd-dot.jd-ok {
      background:var(--dmx-jd01);
      animation:none;
    }
    @keyframes jd-blink {
      0%,100%{opacity:1}
      50%{opacity:0.2}
    }
    #dmx-jdst-msg { color:rgba(255,255,255,0.35); }

    /* Steps */
    #dmx-jdsp {
      display:flex; flex-direction:column; gap:8px;
    }
    .jd-step {
      display:flex; align-items:flex-start; gap:10px;
      padding:10px 12px;
      background:rgba(255,255,255,0.025);
      border:1px solid rgba(255,255,255,0.05);
      border-radius:9px;
    }
    .jd-step .jd-num {
      width:20px; height:20px; border-radius:50%; flex-shrink:0;
      background:rgba(0,255,157,0.1);
      border:1px solid rgba(0,255,157,0.2);
      display:flex; align-items:center; justify-content:center;
      font-size:0.65rem; font-weight:700; color:var(--dmx-jd01);
    }
    .jd-step p {
      font-size:0.75rem; color:rgba(255,255,255,0.38);
      line-height:1.45; margin-top:1px;
    }
    .jd-step p b { color:rgba(255,255,255,0.65); font-weight:600; }

    /* divider */
    .jd-div { height:1px; background:rgba(255,255,255,0.05); margin:20px 0; }

    /* footer */
    #dmx-jdft {
      text-align:center;
      font-size:0.65rem; letter-spacing:0.08em; text-transform:uppercase;
      color:rgba(255,255,255,0.16);
    }
    #dmx-jdft span { color:var(--dmx-jd01); opacity:0.55; }

    /* refresh btn */
    #dmx-jdrf {
      display:none;
      margin:14px auto 0;
      padding:9px 22px;
      background:rgba(0,255,157,0.08);
      border:1px solid rgba(0,255,157,0.22);
      border-radius:8px;
      color:var(--dmx-jd01);
      font-family:'Space Grotesk',sans-serif;
      font-size:0.75rem; font-weight:600;
      letter-spacing:0.08em; text-transform:uppercase;
      cursor:pointer;
      transition:background 0.2s, transform 0.15s;
    }
    #dmx-jdrf:hover { background:rgba(0,255,157,0.15); transform:translateY(-1px); }

    /* success overlay */
    #dmx-jdok {
      display:none;
      flex-direction:column; align-items:center; gap:8px;
      padding:18px;
    }
    #dmx-jdok .jd-check svg { width:40px; height:40px; color:var(--dmx-jd01); }
    #dmx-jdok h3 { font-size:1rem; color:#fff; }
    #dmx-jdok p  { font-size:0.75rem; color:rgba(255,255,255,0.35); text-align:center; }
  </style>
</head>
<body>

<div id="dmx-jdnd"></div>
<div id="dmx-jdsc"></div>
<div id="dmx-jdgl"></div>

<div id="dmx-jdcd">
  <a id="dmx-jdbk" href="/">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 12H5M12 5l-7 7 7 7"/>
    </svg>
    Back
  </a>

  <div id="dmx-jdbd">

    <!-- Header -->
    <div id="dmx-jdhr">
      <div class="jd-icon-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
          <path d="M14 14h3v3M17 20v1M20 14v3M20 20v1M14 20h3"/>
        </svg>
      </div>
      <div class="jd-titles">
        <h2>QR Code Login</h2>
        <p>Scan with WhatsApp to link device</p>
      </div>
    </div>

    <!-- Status bar -->
    <div id="dmx-jdst">
      <div class="jd-dot jd-warn" id="dmx-jd-dot"></div>
      <span id="dmx-jdst-msg">Generating QR code…</span>
    </div>

    <!-- QR Frame -->
    <div id="dmx-jdqr">
      <div class="jd-br"></div>
      <div class="jd-bl"></div>
      <div class="jd-inner">
        <!-- Loading placeholder -->
        <div id="dmx-jdph">
          <div class="jd-spin"></div>
          <p>Please wait</p>
        </div>
        <!-- Actual QR image -->
        <img id="dmx-qr-img" src="" alt="QR Code" />
        <!-- Success state -->
        <div id="dmx-jdok">
          <div class="jd-check">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h3>Connected!</h3>
          <p>Session saved. You may close this tab.</p>
        </div>
      </div>
    </div>

    <button id="dmx-jdrf" onclick="location.reload()">↻ Refresh QR</button>

    <!-- Steps -->
    <div id="dmx-jdsp">
      <div class="jd-step">
        <div class="jd-num">1</div>
        <p>Open WhatsApp → tap <b>Settings → Linked Devices</b></p>
      </div>
      <div class="jd-step">
        <div class="jd-num">2</div>
        <p>Tap <b>Link a Device</b> and point camera at the QR code</p>
      </div>
      <div class="jd-step">
        <div class="jd-num">3</div>
        <p>Session key will be sent to your <b>WhatsApp chat</b> automatically</p>
      </div>
    </div>

    <div class="jd-div"></div>

    <div id="dmx-jdft">
      Powered by <span>Cyber&#8209;X</span> &nbsp;·&nbsp; Secure &amp; Encrypted
    </div>

  </div>
</div>

<script>
  const imgEl    = document.getElementById('dmx-qr-img');
  const phEl     = document.getElementById('dmx-jdph');
  const okEl     = document.getElementById('dmx-jdok');
  const dotEl    = document.getElementById('dmx-jd-dot');
  const msgEl    = document.getElementById('dmx-jdst-msg');
  const rfBtn    = document.getElementById('dmx-jdrf');

  let pollTimer  = null;
  let attempts   = 0;
  const MAX_WAIT = 120; // seconds

  // Kick off Baileys session
  fetch('/qr/start').catch(() => {});

  function showQR(src) {
    phEl.style.display  = 'none';
    okEl.style.display  = 'none';
    imgEl.src           = src;
    imgEl.style.display = 'block';
    dotEl.className     = 'jd-dot';
    msgEl.textContent   = 'Scan now with WhatsApp';
  }

  function showOK() {
    clearInterval(pollTimer);
    phEl.style.display  = 'none';
    imgEl.style.display = 'none';
    okEl.style.display  = 'flex';
    dotEl.className     = 'jd-dot jd-ok';
    dotEl.style.animation = 'none';
    msgEl.textContent   = 'Connected successfully';
    rfBtn.style.display = 'none';
  }

  function showTimeout() {
    clearInterval(pollTimer);
    dotEl.className   = 'jd-dot jd-warn';
    msgEl.textContent = 'QR expired — click Refresh';
    rfBtn.style.display = 'block';
  }

  async function poll() {
    attempts++;
    if (attempts > MAX_WAIT) { showTimeout(); return; }

    // Check connected
    try {
      const st = await fetch('/qr/status').then(r => r.json());
      if (st.ready || st.closed) { showOK(); return; }
    } catch(_) {}

    // Fetch QR image
    try {
      const r = await fetch('/qr/image?t=' + Date.now());
      if (r.ok) {
        const blob = await r.blob();
        const url  = URL.createObjectURL(blob);
        showQR(url);
      }
    } catch(_) {}
  }

  // Poll every second
  pollTimer = setInterval(poll, 1000);
</script>
</body>
</html>`;
}

module.exports = router;