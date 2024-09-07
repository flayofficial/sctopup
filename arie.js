require('./Pengaturan/Admin/settings')
const { default: arieConnect, downloadContentFromMessage, makeWASocket, prepareWAMessageMedia, makeWALegacySocket, BufferJSON, Browsers, initInMemoryStore, extractMessageContent, makeInMemoryStore, proto, delay, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, jidDecode, areJidsSameUser, PHONENUMBER_MCC, WA_DEFAULT_EPHEMERAL, relayMessage, getContentType, generateWAMessage, generateWAMessageContent, generateForwardMessageContent, generateWAMessageFromContent } = require("@whiskeysockets/baileys")
const axios = require('axios')
const FileType = require('file-type')
const fetch = require('node-fetch')
const crypto = require('crypto')
const fs = require('fs')
const { sizeFormatter} = require("human-readable")
const format = sizeFormatter()
const os = require('os');
const { exec } = require("child_process");
const speed = require('performance-now');
const util = require('util')
const chalk = require('chalk')
const short = require('short-uuid');
const moment = require('moment-timezone');
const md5 = require('md5');
const FormData = require("form-data");
const { clockString, tanggal, getTime, isUrl, sleep, runtime, fetchJson, getBuffer, jsonformat } = require('./lib/myfunc')
const { color, bgcolor } = require('./Pengaturan/function/color')
const { fee_cus, fee_owner, batas_time, servpaydis, merchpaydis, keypaydis, prpartner, prplatinum, prgold, prmember, ariekey, nomorKu } = require("./Pengaturan/function/apikey")
const banned = JSON.parse(fs.readFileSync("./Pengaturan/database/block.json"))

global.tanggalserver = `${moment.tz('Asia/Jakarta').format('DD/MM/YY')}`;
global.waktuserver = `${moment.tz('Asia/Jakarta').format('HH:mm:ss')}`; 

let http = require('http')
            http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
            resp.on('data', function(ip) {
                (global.ipserver = ip);
            })
          })

global.db = JSON.parse(fs.readFileSync('./Pengaturan/database/database.json'))
if (global.db) global.db = {
sticker: {},
database: {}, 
game: {},
others: {},
settings: {},
users: {},
chats: {},
...(global.db || {})
}

//=================================================

  //=================================================

//━━━━━━━━━━━━━━━[ PREFIX ]━━━━━━━━━━━━━━━━━//

module.exports = arie = async (arie, m, chatUpdate, store) => {
try {
  const gakbisaowner = `${owner}@s.whatsapp.net`
        const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        const budy = (typeof m.text == 'string' ? m.text : '')
        const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : "#";
        const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
        const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
        const args = body.trim().split(/ +/).slice(1);
        const { type, quotedMsg, mentioned, now, fromMe } = m
        const isCmd = body.startsWith(prefix)
        const from = m.key.remoteJid
        
        const pushname = m.pushName || "No Name"
        const botNumber = await arie.decodeJid(arie.user.id)
         
         const groupMetadata = m.isGroup ? await arie.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
         const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const groupMembers = m.isGroup ? groupMetadata.participants : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
      const isBan = banned.includes(m.sender)
         
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
        const tanggal = moment().tz("Asia/Jakarta").format("ll")
		const dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		
		const isMedia = /image|video|sticker|audio/.test(mime)
        const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isAudio = (type == 'audioMessage')
		const isSticker = (type == 'stickerMessage')
		
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
        const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')    
            
        const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
        const isOwner = [`${owner}@s.whatsapp.net`] == sender ? true : ["6285174332583@s.whatsapp.net"].includes(sender) ? true : false
        const senderNumber = sender.split('@')[0]   
        const arg = budy.trim().substring(budy.indexOf(" ") + 1);
        const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);
        const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]      
try {

  const isNumber = x => typeof x === 'number' && !isNaN(x)
  const user = global.db.users[m.sender]
  if (typeof user !== 'object') global.db.users[m.sender] = {}
  const chats = global.db.chats[m.chat]
  if (typeof chats !== 'object') global.db.chats[m.chat] = {}
  if (user) {
  if (!isNumber(user.afkTime)) user.afkTime = -1
  if (!('afkReason' in user)) user.afkReason = ''
  } else global.db.users[m.sender] = {
  afkTime: -1,
  afkReason: '',
  }

ppnyaimg = await arie.sendMessage(m.sender, 'image')
} catch (err) {
ppnyaimg = 'https://telegra.ph/file/558480616af8c2f9efa9f.jpg'
}
//ppnyaimg = await reSize(ppnyaimg, 300, 300)

// Public & Self
if (!arie.public) {
  if (!m.key.fromMe && !isOwner) return
  }


const reply = (teks) => {arie.sendMessage(from, { text: teks }, { quoted: m })}
for (let jid of mentionUser) {
  let user = global.db.users[jid]
  if (!user) continue
  let afkTime = user.afkTime
  if (!afkTime || afkTime < 0) continue
  let reason = user.afkReason || ''
  m.reply(`Jangan tag dia bang, orangnya lagi AFK\n
  ${reason ? 'Alasan : ' + reason : 'Alasan : Nothing.'}
  Selama ${clockString(new Date - afkTime)}
  `.trim())
  }
    
  var mdu = ['red','green','yellow','blue','magenta','cyan','white']
  var halalu = mdu[Math.floor(Math.random() * mdu.length)]
  var mdo = ['red','green','yellow','blue','magenta','cyan','white']
  var halalo = mdo[Math.floor(Math.random() * mdo.length)]
  var mdi = ['red','green','yellow','blue','magenta','cyan','white']
  var halali = mdi[Math.floor(Math.random() * mdi.length)]
  var mda = ['red','green','yellow','blue','magenta','cyan','white']
  var halala = mda[Math.floor(Math.random() * mda.length)]
  var mde = ['red','green','yellow','blue','magenta','cyan','white']
  var halale = mde[Math.floor(Math.random() * mde.length)]
  
  if (m.message) {
        arie.readMessages([m.key]);
        console.log(
          chalk.black(chalk.bgWhite("[ CMD ]")),
          chalk.black(chalk.bgGreen(new Date())),
          chalk.black(chalk.bgBlue(budy || m.mtype)) + "\n" + chalk.magenta("=> From"),
          chalk.green(pushname),
          chalk.yellow(m.sender) + "\n" + chalk.blueBright("=> In"),
          chalk.green(m.isGroup ? pushname : "Chat Pribadi", m.chat)
        );
      }
  
  //if (isCmd) {
  //console.log(chalk.yellow.bgCyan.bold(' AR-BOTz '), color(`[ PESAN MASUK ]`, `${halalu}`), color(`FROM`, `${halalo}`), color(`${pushname}`, `${halali}`), color(`Text :`, `${halala}`), color(`${body}`, `${halale}`))
  // }
    
    
async function sendarieMessage(chatId, message, options = {}){
    let generate = await generateWAMessage(chatId, message, options)
    let type2 = getContentType(generate.message)
    if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
    if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
    return await arie.relayMessage(chatId, generate.message, { messageId: generate.key.id })
}

//let rn = ['recording','composing']
//let jd = rn[Math.floor(Math.random() * rn.length)];

if (command) {
//arie.sendPresenceUpdate(jd, from)
arie.readMessages([m.key])
}
function formatmoney(n, opt = {}) {
  if (!opt.current) opt.current = "IDR"
  return n.toLocaleString("id", { style: "currency", currency: opt.current })
}

function acakindong(min, max = null) {
  if (max !== null) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
  return Math.floor(Math.random() * min) + 1
  }
}


const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return arie.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}

function pickrandoms() {
  var symbols = '0123456789';
  var symbolLength = symbols.length;
  var randomString = 'P';
  for (var i = 0; i < 2; i++) {
    randomString += symbols.charAt(Math.floor(Math.random() * symbolLength));
  }
  randomString += '';
  for (var j = 0; j < 4; j++) {
    randomString += symbols.charAt(Math.floor(Math.random() * symbolLength));
  }
  return randomString;
}

let koderefe =pickrandoms(3);

function pickrandomref() {
  var symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var symbolLength = symbols.length;
  var currentDate = new Date();
  
  // Generate a random 3-letter symbol
  var randomSymbol = '';
  for (var i = 0; i < 3; i++) {
    randomSymbol += symbols.charAt(Math.floor(Math.random() * symbolLength));
  }

  var randomString = 'ARIE' +
    currentDate.getFullYear() +
    ('0' + (currentDate.getMonth() + 1)).slice(-2) +
    ('0' + currentDate.getDate()).slice(-2) + randomSymbol;

  return randomString;
}
    
let koderef = pickrandomref()

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  const randomBytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    const byte = randomBytes[i] % chars.length;
    result += chars.charAt(byte);
  }

  return result.toLowerCase();
}

    const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? arie.sendMessage(from, {text: teks.trim(), jpegThumbnail: global.ariemenu}, text, { sendEphemeral: true, contextInfo: { mentions: memberr } }) : arie.sendMessage(from, {text: teks.trim(), jpegThumbnail: global.ariemenu}, text, { sendEphemeral: true, quoted: m, contextInfo: { mentions: memberr } })
}
    
const randomString = generateRandomString(5);


function boolToString(value) {
  return value ? 'iyah' : 'tidak';
}



const formatp = sizeFormatter({
  std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})

const isUrl = (url) => {
  return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

const jsonformat = (string) => {
  return JSON.stringify(string, null, 2)
}

//=================================================
    
// Berfungsi Untuk Hit Api & Mengirim Data Headers
const fetchJson = async (url, options) => {
  try {
      options ? options : {}
      const res = await axios({
          method: 'GET',
          url: url,
          headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
          },
          ...options
      })
      return res.data
  } catch (err) {
      return err
  }
}


const repPy = {
	key: {
		remoteJid: '0@s.whatsapp.net',
		fromMe: false,
		id: 'AR-BOTz',
		participant: '0@s.whatsapp.net'
	},
	message: {
		requestPaymentMessage: {
			currencyCodeIso4217: "USD",
			amount1000: 999999999,
			requestFrom: '0@s.whatsapp.net',
			noteMessage: {
				extendedTextMessage: {
					text: 'Arie Pulsa'
				}
			},
			expiryTimestamp: 999999999,
			amount: {
				value: 91929291929,
				offset: 1000,
				currencyCode: "USD"
			}
		}
	}
}
      
let r = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'))
let sos = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'))
let ubt = JSON.parse(fs.readFileSync('./Pengaturan/database/user.json'))

const daftar = () => {
m.reply(`*Hai Kak👋*\nKamu belum terdaftar di database.\nSilahkan ketik _*#daftar*_ untuk menggunakan command ini.`)
}
let user = JSON.parse(fs.readFileSync('./Pengaturan/database/user.json'))
const cek = (satu, dua) => { 
let x1 = false
Object.keys(user).forEach((i) => {
if (user[i].id == dua){x1 = i}})
if (x1 !== false) {
if (satu == "id"){ return user[x1].id }
if (satu == "product_name"){ return user[x1].product_name }
if (satu == "tanggal_trx"){ return user[x1].tanggal_trx }    
if (satu == "saldo"){ return user[x1].saldo }
if (satu == "level"){ return user[x1].level }
if (satu == "upharga"){ return user[x1].upharga }
 
if (satu == "price"){ return user[x1].price }
if (satu == "tanggal_deposit"){ return user[x1].tanggal_deposit }    
if (satu == "deposit"){ return user[x1].deposit }
if (satu == "reff_deposit"){ return user[x1].reff_deposit }
if (satu == "link_sc"){ return user[x1].link_sc }
 
if (satu == "desc"){ return user[x1].desc }
if (satu == "status_topup"){ return user[x1].status_topup }
if (satu == "status_sosmed"){ return user[x1].status_sosmed }
if (satu == "status_deposit"){ return user[x1].status_deposit }
if (satu == "status_deposit_otomatis"){ return user[x1].status_deposit_otomatis }
if (satu == "buyer_sku_code"){ return user[x1].buyer_sku_code }
if (satu == "pw_script"){ return user[x1].pw_script }    
if (satu == "tujuan"){ return user[x1].tujuan }
if (satu == "jumlah"){ return user[x1].jumlah }
if (satu == "reff"){ return user[x1].reff }
if (satu == "fee_owner"){ return user[x1].fee_owner }
}
if (x1 == false) { return null } 
}
let sett = (satu, dua, tiga) => { 
Object.keys(user).forEach((i) => {
if (user[i].id == dua){
if (satu == "+saldo")
{ user[i].saldo += tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "-saldo"){
user[i].saldo -= tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "price"){ user[i].price = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "level"){ user[i].level = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "upharga"){ user[i].upharga = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "tanggal_trx"){ user[i].tanggal_trx = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}    
if (satu == "tanggal_deposit"){ user[i].tanggal_deposit = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))} 
if (satu == "status_topup"){ user[i].status_topup = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "status_sosmed"){ user[i].status_sosmed = tiga
  fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "product_name"){ user[i].product_name = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "reff"){ user[i].reff = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "link_sc"){ user[i].link_sc = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "deposit"){ user[i].deposit = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "reff_deposit"){ user[i].reff_deposit = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}

if (satu == "status_deposit"){ user[i].status_deposit = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "status_deposit_otomatis"){ user[i].status_deposit_otomatis = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
    
if (satu == "buyer_sku_code"){ user[i].buyer_sku_code = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
 if (satu == "pw_script"){ user[i].pw_script = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}  
if (satu == "tujuan"){ user[i].tujuan = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "jumlah"){ user[i].jumlah = tiga
  fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "desc"){ user[i].desc = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "fee_owner"){ user[i].fee_owner = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
}})
}
if(cek("id", m.sender) == null){
user.push({id: m.sender, level: "member", upharga: 5, product_name: "", tujuan: "", price: 0, saldo: 0, reff: "", jumlah: "", buyer_sku_code: "", tanggal_trx: "", status_topup: true, status_sosmed: true, status_deposit: true, status_deposit_otomatis: true, desc: "", deposit: "", reff_deposit: "", tanggal_deposit: "", link_sc: "", pw_script: "", fee_owner: 0})
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))
let te = `*PENDAFTARAN SUKSES*
*Nama :* ${m.pushName}
*Level :* ${cek("level", m.sender)}
*Saldo :* ${cek("saldo", m.sender)}
*Waktu :* ${jam} / ${tanggal}

Ketik : *menu* untuk menampilkan menu`
arie.sendMessage(m.chat, {text: `${te}`},{quoted: m})
}

let d = JSON.parse(fs.readFileSync('./Pengaturan/database/admin.json'))
function simpan(path, buff) {
    fs.writeFileSync(path, buff)
    return path
}

// GET STATUS
const get_status = async (id) => {
  const namaproduk = `${cek("product_name", m.sender)}`
  const kode_produk = `${cek("buyer_sku_code", m.sender)}`
  const tujuann = `${cek("tujuan", m.sender)}`
  const harga = `${cek("price", m.sender)}`
  let ref_no = `${sender.split('@')[0]}`
  let user_no = `${tujuann}`
  
  var config = {
    method: 'POST',  // Set the HTTP method to POST
    url: 'https://ariepulsa.com/api/pulsa-botwa',  // Set the target URL
    data: new URLSearchParams(Object.entries({
      api_key: ariekey,
      action: 'status',
      id: id,
      })),
  };
  const parsedHarga = parseFloat(harga);
    axios(config)
    .then(async res => {
  let status = res.data.status;  
  console.log(status)        
  while (status !== 'Success') {
  await sleep(10000); 
  const response = await axios(config);
                      
        if (response.data.data.status == "Success") { 
            m.reply(`           ${toko}\n       𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 ( Sukses )\n══════════════════════\n𝘐𝘋 𝘜𝘴𝘦𝘳 :    ${sender.replace("@s.whatsapp.net", "")}\n𝘕𝘰 𝘗𝘦𝘮𝘣𝘢𝘺𝘢𝘳𝘢𝘯 :      ${randomString}\n𝘐𝘋 𝘛𝘳𝘢𝘯𝘴𝘢𝘬𝘴𝘪 :  ${response.data.data.id}\n────────\n\nNama Produk  : ${namaproduk}\nKode Produk : ${kode_produk}\n𝘔𝘦𝘵𝘰𝘥𝘦 𝘗𝘦𝘮𝘣𝘢𝘺𝘢𝘳𝘢𝘯 : Saldo\nTujuan : ${tujuann}\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\nHarga : ${formatmoney(parsedHarga)}\n\n  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\nSN :   ${response.data.data.catatan}`);
            
            const productDetails = r.find(i => i.product_name === namaproduk);

            if (productDetails) {
              const productInfo = `
          Nama: ${productDetails.product_name}\nHarga: ${formatmoney(productDetails.price)}
          `;
          }

      const filePath = './Pengaturan/database/trxuser.json';
      const hargaModal = productDetails ? productDetails.price : null;
      const parsedModal = parseFloat(hargaModal);
        
          if (!isNaN(parsedModal)) {
            const medanTime = moment.tz('Asia/Jakarta');
            const newTransaction = {
                buyer: m.sender,
                status: response.data.data.status,
                no_pembayaran: koderefe,
                ref_id: response.data.data.id,
                jam: medanTime.format('HH:mm:ss'),
                waktu: medanTime.format('DD/MM/YY'),
                produk: namaproduk,
                harga: parsedHarga,
                harga_modal: parsedModal,
                tujuan: user_no,
                invoice: response.data.data.catatan
            };
        
            try {
                const fileData = fs.readFileSync(filePath, 'utf8');
                let allUserData = [];
        
                if (fileData && fileData.trim() !== '') {
                    allUserData = JSON.parse(fileData);
                    if (!Array.isArray(allUserData)) {
                        allUserData = [];
                    }
                }
        
                allUserData.push(newTransaction);
                fs.writeFileSync(filePath, JSON.stringify(allUserData, null, 2), 'utf8');          
            } catch (error) {
                console.error('Error processing the transaction:', error);
                reply("Gagal, Terjadi Kesalahan Saat Memproses Transaksi. Silakan Coba Lagi.");
            }
        } else {
            reply("Gagal, Modal Harga Tidak Ditemukan Untuk Produk Yang Ditentukan.");
        }
            
            break;
                  }          
        if (response.data.data.status == "Error") {
            sett("+saldo", ref_no+"@s.whatsapp.net", i.price)
            m.reply(`           ${toko}\n       𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 ( Gagal )\n══════════════════════\n𝘐𝘋 𝘜𝘴𝘦𝘳 :    ${sender.replace("@s.whatsapp.net", "")}\n𝘕𝘰 𝘗𝘦𝘮𝘣𝘢𝘺𝘢𝘳𝘢𝘯 :      ${randomString}\n𝘐𝘋 𝘛𝘳𝘢𝘯𝘴𝘢𝘬𝘴𝘪 :  ${response.data.data.id}\n────────\n\nNama Produk  : ${namaproduk}\nKode Produk : ${kode_produk}\n𝘔𝘦𝘵𝘰𝘥𝘦 𝘗𝘦𝘮𝘣𝘢𝘺𝘢𝘳𝘢𝘯 : Saldo\nTujuan : ${tujuann}\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\nHarga : ${formatmoney(parsedHarga)}\n\n  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n   _*Transaksi Gagal, Silahkan Coba Nanti*_`);
            break;                   
            }

sett("product_name", m.sender, "")
sett("price", m.sender, 0)
sett("tujuan", m.sender, "")  
sett("desc", m.sender, "")  
sett("reff", m.sender, "") 
sett("buyer_sku_code", m.sender, "")  
sett("status_topup", m.sender, true)
sett("status_sosmed", m.sender, true)
        }
    })
             
  }

// GET STATUS PAYMENT GATEWAY PAYDISINI
const get_status_paydisini = async (koddep) => {
  const saldomas = `${cek("deposit", m.sender)}`
  const feeown = `${cek("reff_deposit", m.sender)}`
  
  let ref_no = `${sender.split('@')[0]}`
  let third = 'StatusTransaction';
    let hash = crypto.createHash('md5')
        .update(keypaydis + koddep + third)
        .digest('hex');
  
  var config = {
    method: 'POST',  // Set the HTTP method to POST
    url: 'https://paydisini.co.id/api/',  // Set the target URL
    data: new URLSearchParams(Object.entries({
      key: keypaydis,
      request: 'status',
      unique_code: koddep,
      signature: hash,
      })),
  };

    axios(config)
    .then(async res => {
  let status = res.data.data.status;  
  m.reply('Menunggu Pembayaran...!!\nHarap Lakukan Pembayaran\nKetik :\n*canceldepo* Untuk Membatalkan Deposit Otomatis\n*cekdeposit* Jika Deposit Belum Masuk Selama 5 Menit')        
  while (status !== 'Success') {
  await sleep(3000); 
  const response = await axios(config);
                      
        if (response.data.data.status == "Success") {
            sett("+saldo", m.sender, parseInt(saldomas))
            m.reply(`*Hai Kak👋*\n\nSaldo berhasil masuk ke akun kamu sejumlah : *Rp ${saldomas}*\n\nSisa saldo kamu saat ini : *Rp ${cek("saldo", m.sender)}*`);
            sett("status_deposit_otomatis", m.sender, true)
            sett("deposit", m.sender, "")
            sett("fee_owner", m.sender, 0)
            sett("reff_deposit", m.sender, "")  
            sett("tanggal_deposit", m.sender, "")  
            break;
                  }          
        if (response.data.data.status == "Canceled ") {
            m.reply(`Sangat Disayangkan Sekali. Pembayaran Kamu Dibatalkan Oleh Sistem`);
            sett("status_deposit_otomatis", m.sender, true)
            sett("deposit", m.sender, "")
            sett("fee_owner", m.sender, 0)
            sett("reff_deposit", m.sender, "")  
            sett("tanggal_deposit", m.sender, "")  
            break;                   
            }
        }
    })
             
  }
    
const nebal = (angka) => {
return Math.floor(angka)
}

function toRupiah(angka) {
  var angkaStr = angka.toString();
  var angkaTanpaKoma = angkaStr.split('.')[0];
  var angkaRev = angkaTanpaKoma.toString().split('').reverse().join('');
  var rupiah = '';
  for (var i = 0; i < angkaRev.length; i++) {
    if (i % 3 == 0) rupiah += angkaRev.substr(i, 3) + '.';
  }
  return '' + rupiah.split('', rupiah.length - 1).reverse().join('');
}

function updateLevelAndPrice(userId, newLevel) {
  // Load user data from user.json
  let userData = fs.readFileSync('./Pengaturan/database/user.json');
  let users = JSON.parse(userData);

  // Find the user by id and update level and price
  let user = users.find(user => user.id === userId + '@s.whatsapp.net');
  if (user) {
    user.level = newLevel;
    switch (newLevel) {
      case 'member':
        user.upharga = prmember;
        break;
      case 'gold':
        user.upharga = prgold;
        break;
      case 'platinum':
        user.upharga = prplatinum;
        break;
      case 'partner':
        user.upharga = prpartner;
        break;
      default:
        m.reply('Tidak Ada Level Tersedia.\nLevel Tersedia : *member, gold, platinum, partner*');
        return;
    }

    // Save updated user data back to user.json
    fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(users, null, 2));

    m.reply(`User ${userId} Level Terlah DiPerbarui Menjadi ${newLevel} Dengan Upharga ${user.upharga}%.`);
  } else {
    m.reply(`User Dengan ID ${userId} Tidak Terdaftar.`);
  }
}

const admModalPath = './Pengaturan/database/admin.json';

//FITUR CASE BY ARIE
switch (command) {

  case 'setlevel': {
    if (!isOwner) return reply (mess.owner)
    // Split command into userId and newLevel
    let [userId, newLevel] = text.split('|');
    if (!userId) return reply(`Input ID / No Hp Menggunakan 628\nContoh : setlevel 6285174332583|gold`);
    if (!newLevel || !['member', 'gold', 'platinum', 'partner'].includes(newLevel.toLowerCase())) return reply(`Input Levelnya (Huruf Kecil): *member, gold, platinum, partner*\nContoh : setlevel 6285174332583|gold`);
  
    // Update user level and price
    updateLevelAndPrice(userId, newLevel.toLowerCase());
    break;
  }

case 'owner':{
   
var owner_Nya = global.owner
sendContact(from, owner_Nya, global.ownername, m)
reply('Chat aja kak, ga usah malu')
}
break  

case 'topup': {
  if(cek("status_topup", m.sender) == false) return reply(`Ada pesanan topup yang belum selesai, silahkan selesaikan transaksi sebelumnya. atau tekan *.canceltopup* untuk membatalkan.`);
  if(cek("status_sosmed", m.sender) == false) return reply(`Ada pesanan sosmed yang belum selesai, silahkan selesaikan transaksi sebelumnya. atau tekan *.cancelsosmed* untuk membatalkan.`);
    
  let order_contoh = `*Format Salah ‼️* 

  *Contoh TopUp*
  _Contoh Free Fire_ 
  ${prefix}topup [kode]|[tujuan]
  *=> #topup FF5|123456789*
  *-----------------*
  *Contoh Mobile Legends*
  ${prefix}topup [kode]|[tujuan] zone
  *=> topup ML5|123456789 zone*
  *=> topup ML5|12345678912345*
  *-----------------*
  *TopUp Lainnya*
  ${prefix}topup [kode]|[tujuan]
  *=> #topup DANA|0882XXXXXX*
  
  *NOTE :*
  ⚠️ Apabila Ada Kesalahan Nomor Tujuan Bukan Tanggung Jawab ${footer}
  `;

  if (!text) {
    return reply(order_contoh);
  }

  let refferensi = koderef;
  let [produk, tujuan] = text.split("|");

  if (!produk || !tujuan) {
    return reply(order_contoh);
  }

  let uphar = parseFloat(cek("upharga", m.sender));

  for (let i of r) {
    if (i.buyer_sku_code === produk) {
      let totalHarga = i.price + i.price * (uphar / 100) + 100;
      if (totalHarga > cek("saldo", m.sender)) {
        return reply(`Gagal, Tidak Dapat Memproses Pesanan Karena Saldo Tidak Mencukupi\nSilahkan Lakukan Deposit Dahulu\n\nKetik : *deposit*`);
      }

      let har = totalHarga.toFixed(0);
      let nama_produkk = i.product_name;
      let descc = i.desc;

      sett("-saldo", m.sender, parseInt(har));
      sett("price", m.sender, parseInt(har));
      sett("product_name", m.sender, nama_produkk);
      sett("status_topup", m.sender, false);
      sett("status_sosmed", m.sender, true);
      sett("tujuan", m.sender, tujuan);
      sett("buyer_sku_code", m.sender, produk);
      sett("desc", m.sender, descc);
      sett("reff", m.sender, refferensi);

      let axios = require('axios');

      if (produk.startsWith("ML")) {
        let [mlidnick, mlzonenick] = tujuan.split(" ");
        if (!mlidnick || !mlzonenick) {
          return reply(`Format salah. Khusus ML ID Game dan Zone harus dipisahkan dengan tanda "spasi".\nContoh: ${prefix}topup ML5|123456789 1234`);
        }

        axios({
          method: 'POST',
          url: 'https://ariepulsa.com/api/get-nickname-game',
          data: new URLSearchParams({
            api_key: ariekey,
            action: 'get-nickname-game',
            layanan: 'mobile-legends',
            target: mlidnick,
            no_meter: mlzonenick
          })
        }).then((res) => {
          let nickname = '';
          if (res.data.status == true) {
            nickname = res.data.data.nickname;
          }
          let tujuanML = `${mlidnick}${mlzonenick}`;
          sett("tujuan", m.sender, tujuanML);
          let an = `*📑 RINCIAN TRANSAKSI*
          
*Nama :* ${cek("product_name", m.sender)}
*Kode :* ${cek("buyer_sku_code", m.sender)}
*Harga :* Rp ${cek("price", m.sender)}
*Tujuan :* ${cek("tujuan", m.sender)}
*Nickname :* ${nickname}
*ReffID :* ${cek("reff", m.sender)}
*Deskripsi :* ${cek("desc", m.sender)}

Ketik *${prefix}konfirmasi* untuk Melanjutkan Transaksi
Ketik *${prefix}canceltopup* untuk Membatalkan pesanan`;
          m.reply(an);
        }).catch((error) => {
          console.error('Error checking nickname:', error);
          let tujuanML = `${mlidnick}${mlzonenick}`;
          sett("tujuan", m.sender, tujuanML);
          let an = `*📑 RINCIAN TRANSAKSI*
          
*Nama :* ${cek("product_name", m.sender)}
*Kode :* ${cek("buyer_sku_code", m.sender)}
*Harga :* Rp ${cek("price", m.sender)}
*Tujuan :* ${cek("tujuan", m.sender)}
*Nickname :* 
*ReffID :* ${cek("reff", m.sender)}
*Deskripsi :* ${cek("desc", m.sender)}

Ketik *${prefix}konfirmasi* untuk Melanjutkan Transaksi
Ketik *${prefix}canceltopup* untuk Membatalkan pesanan`;
          m.reply(an);
        });
      } else if (produk.startsWith("FF")) {
        let ffnick = tujuan.split(" ")[0];
        if (!ffnick) {
          return reply(`ID Game Nya Mana?\n.ceknickff 1234567890`);
        }

        axios({
          method: 'POST',
          url: 'https://ariepulsa.com/api/get-nickname-game',
          data: new URLSearchParams({
            api_key: ariekey,
            action: 'get-nickname-game',
            layanan: 'free-fire',
            target: ffnick
          })
        }).then((res) => {
          let nickname = '';
          if (res.data.status == true) {
            nickname = res.data.data.nickname;
          }
          sett("tujuan", m.sender, ffnick);
          let an = `*📑 RINCIAN TRANSAKSI*
          
*Nama :* ${cek("product_name", m.sender)}
*Kode :* ${cek("buyer_sku_code", m.sender)}
*Harga :* Rp ${cek("price", m.sender)}
*Tujuan :* ${cek("tujuan", m.sender)}
*Nickname :* ${nickname}
*ReffID :* ${cek("reff", m.sender)}
*Deskripsi :* ${cek("desc", m.sender)}

Ketik *${prefix}konfirmasi* untuk Melanjutkan Transaksi
Ketik *${prefix}canceltopup* untuk Membatalkan pesanan`;
          m.reply(an);
        }).catch((error) => {
          console.error('Error checking nickname:', error);
          sett("tujuan", m.sender, ffnick);
          let an = `*📑 RINCIAN TRANSAKSI*
          
*Nama :* ${cek("product_name", m.sender)}
*Kode :* ${cek("buyer_sku_code", m.sender)}
*Harga :* Rp ${cek("price", m.sender)}
*Tujuan :* ${cek("tujuan", m.sender)}
*Nickname :* 
*ReffID :* ${cek("reff", m.sender)}
*Deskripsi :* ${cek("desc", m.sender)}

Ketik *${prefix}konfirmasi* untuk Melanjutkan Transaksi
Ketik *${prefix}canceltopup* untuk Membatalkan pesanan`;
          m.reply(an);
        });
      } else if (produk.startsWith("DANA")) {
        axios({
          method: 'POST',
          url: 'https://ariepulsa.com/api/get-nickname-ewallet-trx',
          data: new URLSearchParams({
            api_key: ariekey,
            action: 'get-nickname-ewallet',
            layanan: 'DANA',
            target: tujuan
          })
        }).then((res) => {
          let nickname = '';
          if (res.data.status == true) {
            nickname = res.data.data.nama;
          }
          sett("tujuan", m.sender, tujuan);
          let an = `*📑 RINCIAN TRANSAKSI*
          
*Nama :* ${cek("product_name", m.sender)}
*Kode :* ${cek("buyer_sku_code", m.sender)}
*Harga :* Rp ${cek("price", m.sender)}
*Tujuan :* ${cek("tujuan", m.sender)}
*Nickname :* ${nickname}
*ReffID :* ${cek("reff", m.sender)}
*Deskripsi :* ${cek("desc", m.sender)}

Ketik *${prefix}konfirmasi* untuk Melanjutkan Transaksi
Ketik *${prefix}canceltopup* untuk Membatalkan pesanan`;
          m.reply(an);
        }).catch((error) => {
          console.error('Error checking nickname:', error);
          sett("tujuan", m.sender, tujuan);
          let an = `*📑 RINCIAN TRANSAKSI*
          
*Nama :* ${cek("product_name", m.sender)}
*Kode :* ${cek("buyer_sku_code", m.sender)}
*Harga :* Rp ${cek("price", m.sender)}
*Tujuan :* ${cek("tujuan", m.sender)}
*Nickname :* 
*ReffID :* ${cek("reff", m.sender)}
*Deskripsi :* ${cek("desc", m.sender)}

Ketik *${prefix}konfirmasi* untuk Melanjutkan Transaksi
Ketik *${prefix}canceltopup* untuk Membatalkan pesanan`;
          m.reply(an);
        });
      } else if (produk.startsWith("OVO")) {
        axios({
          method: 'POST',
          url: 'https://ariepulsa.com/api/get-nickname-ewallet-trx',
          data: new URLSearchParams({
            api_key: ariekey,
            action: 'get-nickname-ewallet',
            layanan: 'OVO',
            target: tujuan
          })
        }).then((res) => {
          let nickname = '';
          if (res.data.status == true) {
            nickname = res.data.data.nama;
          }
          sett("tujuan", m.sender, tujuan);
          let an = `*📑 RINCIAN TRANSAKSI*
          
*Nama :* ${cek("product_name", m.sender)}
*Kode :* ${cek("buyer_sku_code", m.sender)}
*Harga :* Rp ${cek("price", m.sender)}
*Tujuan :* ${cek("tujuan", m.sender)}
*Nickname :* ${nickname}
*ReffID :* ${cek("reff", m.sender)}
*Deskripsi :* ${cek("desc", m.sender)}

Ketik *${prefix}konfirmasi* untuk Melanjutkan Transaksi
Ketik *${prefix}canceltopup* untuk Membatalkan pesanan`;
          m.reply(an);
        }).catch((error) => {
          console.error('Error checking nickname:', error);
          sett("tujuan", m.sender, tujuan);
          let an = `*📑 RINCIAN TRANSAKSI*
          
*Nama :* ${cek("product_name", m.sender)}
*Kode :* ${cek("buyer_sku_code", m.sender)}
*Harga :* Rp ${cek("price", m.sender)}
*Tujuan :* ${cek("tujuan", m.sender)}
*Nickname :* 
*ReffID :* ${cek("reff", m.sender)}
*Deskripsi :* ${cek("desc", m.sender)}

Ketik *${prefix}konfirmasi* untuk Melanjutkan Transaksi
Ketik *${prefix}canceltopup* untuk Membatalkan pesanan`;
          m.reply(an);
        });
      } else if (produk.startsWith("SHOPEEPAY")) {
        axios({
          method: 'POST',
          url: 'https://ariepulsa.com/api/get-nickname-ewallet-trx',
          data: new URLSearchParams({
            api_key: ariekey,
            action: 'get-nickname-ewallet',
            layanan: 'SHOPEEPAY',
            target: tujuan
          })
        }).then((res) => {
          let nickname = '';
          if (res.data.status == true) {
            nickname = res.data.data.nama;
          }
          sett("tujuan", m.sender, tujuan);
          let an = `*📑 RINCIAN TRANSAKSI*
          
*Nama :* ${cek("product_name", m.sender)}
*Kode :* ${cek("buyer_sku_code", m.sender)}
*Harga :* Rp ${cek("price", m.sender)}
*Tujuan :* ${cek("tujuan", m.sender)}
*Nickname :* ${nickname}
*ReffID :* ${cek("reff", m.sender)}
*Deskripsi :* ${cek("desc", m.sender)}

Ketik *${prefix}konfirmasi* untuk Melanjutkan Transaksi
Ketik *${prefix}canceltopup* untuk Membatalkan pesanan`;
          m.reply(an);
        }).catch((error) => {
          console.error('Error checking nickname:', error);
          sett("tujuan", m.sender, tujuan);
          let an = `*📑 RINCIAN TRANSAKSI*
          
*Nama :* ${cek("product_name", m.sender)}
*Kode :* ${cek("buyer_sku_code", m.sender)}
*Harga :* Rp ${cek("price", m.sender)}
*Tujuan :* ${cek("tujuan", m.sender)}
*Nickname :* 
*ReffID :* ${cek("reff", m.sender)}
*Deskripsi :* ${cek("desc", m.sender)}

Ketik *${prefix}konfirmasi* untuk Melanjutkan Transaksi
Ketik *${prefix}canceltopup* untuk Membatalkan pesanan`;
          m.reply(an);
        });
      } else if (produk.startsWith("PLN")) {
        axios({
          method: 'POST',
          url: 'https://api.digiflazz.com/v1/transaction',
          data: {
            commands: "pln-subscribe",
            customer_no: tujuan,
          }
        }).then((res) => {
          if (res.data.data) {
            let nickname = res.data.data.name;
            let daya = res.data.data.segment_power;
            let subscriber_id = res.data.data.subscriber_id;

            sett("tujuan", m.sender, tujuan);
            let an = `*📑 RINCIAN TRANSAKSI*
            
*Nama :* ${cek("product_name", m.sender)}
*Kode :* ${cek("buyer_sku_code", m.sender)}
*Harga :* Rp ${cek("price", m.sender)}
*Tujuan :* ${cek("tujuan", m.sender)}
*Nickname :* ${nickname}
*Daya :* ${daya}
*ReffID :* ${cek("reff", m.sender)}
*Deskripsi :* ${cek("desc", m.sender)}

Ketik *${prefix}konfirmasi* untuk Melanjutkan Transaksi
Ketik *${prefix}canceltopup* untuk Membatalkan pesanan`;
            m.reply(an);
          } else {
            return reply('Gagal mendapatkan informasi pelanggan PLN.');
          }
        }).catch((error) => {
          console.error('Error checking PLN:', error);
          return reply('Gagal mendapatkan informasi pelanggan PLN.');
        });
      } else {
        sett("tujuan", m.sender, tujuan);
        let an = `*📑 RINCIAN TRANSAKSI*
        
*Nama :* ${cek("product_name", m.sender)}
*Kode :* ${cek("buyer_sku_code", m.sender)}
*Harga :* Rp ${cek("price", m.sender)}
*Tujuan :* ${cek("tujuan", m.sender)}
*ReffID :* ${cek("reff", m.sender)}
*Deskripsi :* ${cek("desc", m.sender)}
        
Ketik *${prefix}konfirmasi* untuk Melanjutkan Transaksi
Ketik *${prefix}canceltopup* untuk Membatalkan pesanan`;
        m.reply(an);
      }
      break;
    }
  }
}
break;

//Konfirmasi Topup
case 'konfirmasi': {
  if (cek("status_topup", m.sender) == true) {
    return reply(`Tidak ada pesanan sebelumnya, silahkan melakukan pembelian produk kembali.`);
  }
  if (cek("status_sosmed", m.sender) == false) {
    return reply(`Perintah ini bukan untuk orderan Topup. Silahkan ketik : *order* untuk melanjutkan orderan sosmed.`);
  }

  let kode_buyer = cek("buyer_sku_code", m.sender);
  for (let i of r) {
    if (i.buyer_sku_code === kode_buyer) {
      let tujuan = cek("tujuan", m.sender);
      let harga = cek("price", m.sender);
      let referdf = cek("reff", m.sender);
      let ref_no = m.sender.split('@')[0];
      let namaproduk = cek("product_name", m.sender);
      let parsedHarga = parseFloat(harga);

      const apiURL = "https://ariepulsa.com/api/pulsa-botwa";
      const params = new URLSearchParams({
        api_key: ariekey,
        action: 'pemesanan',
        layanan: kode_buyer,
        target: tujuan,
        oid: referdf
      });

      try {
        const response = await fetch(apiURL, {
          method: "POST",
          body: params,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

        const responseData = await response.json();

        if (response.ok && responseData.status === true) {
          const { id } = responseData.data;
          reply(`*「 𝗧𝗿𝗮𝗻𝘀𝗮𝗸𝘀𝗶 𝗣𝗲𝗻𝗱𝗶𝗻𝗴 」*\n\nReffID: ${id}\nNama Produk: ${namaproduk}\nHarga: Rp ${formatmoney(parsedHarga)}\nTujuan: ${tujuan}`);
          sett("reff", m.sender, id);
          get_status(id);
        } else {
          sett("+saldo", m.sender, parsedHarga);
          reply(`           ${toko}\n       𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 ( Gagal )\n══════════════════════\nID User: ${m.sender.replace("@s.whatsapp.net", "")}\nNo Pembayaran: ${randomString}\nID Transaksi: ${referdf}\n────────\n\nNama Produk: ${namaproduk}\nKode Produk: ${kode_buyer}\nMetode Pembayaran: Saldo\nTujuan: ${tujuan}\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\nHarga: Rp ${formatmoney(parsedHarga)}\n\n  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n   _*Transaksi Gagal, Silahkan Coba Nanti*_`);
        }

        // Reset status and data
        sett("product_name", m.sender, "");
        sett("price", m.sender, 0);
        sett("tujuan", m.sender, "");
        sett("desc", m.sender, "");
        sett("reff", m.sender, "");
        sett("buyer_sku_code", m.sender, "");
        sett("status_topup", m.sender, true);
        sett("status_sosmed", m.sender, true);

      } catch (error) {
        console.error('Error during transaction:', error);
        sett("+saldo", m.sender, parsedHarga);
        reply(`           ${toko}\n       𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 ( Gagal )\n══════════════════════\nID User: ${m.sender.replace("@s.whatsapp.net", "")}\nNo Pembayaran: ${randomString}\nID Transaksi: ${referdf}\n────────\n\nNama Produk: ${namaproduk}\nKode Produk: ${kode_buyer}\nMetode Pembayaran: Saldo\nTujuan: ${tujuan}\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\nHarga: Rp ${formatmoney(parsedHarga)}\n\n  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n   _*Transaksi Gagal, Silahkan Coba Nanti*_`);
        // Reset status and data
        sett("product_name", m.sender, "");
        sett("price", m.sender, 0);
        sett("tujuan", m.sender, "");
        sett("desc", m.sender, "");
        sett("reff", m.sender, "");
        sett("buyer_sku_code", m.sender, "");
        sett("status_topup", m.sender, true);
        sett("status_sosmed", m.sender, true);
      }
      break; // Keluar dari loop setelah menemukan produk
    }
  }
  break;
}

case 'cektopup': {
  if (cek("status_topup", m.sender) == true) {
    return reply(`Tidak ada pesanan sebelumnya, silahkan melakukan pembelian produk kembali.`);
  }
  if (cek("status_sosmed", m.sender) == false) {
    return reply(`Ini Perintah Bukan Untuk cek orderan topup. silahkan ketik : *ceksosmed kode|ReffID* untuk cek orderan sosmed`);
  }

  let namaproduk = cek("product_name", m.sender);
  let kode_produk = cek("buyer_sku_code", m.sender);
  let tujuann = cek("tujuan", m.sender);
  let harga = cek("price", m.sender);
  let ref_no = m.sender.split('@')[0];
  let user_no = tujuann;

  let id = cek("reff", m.sender); // Tambahkan ini untuk mendapatkan ID referensi dari pengguna.

  let config = {
    method: 'POST',
    url: 'https://ariepulsa.com/api/pulsa-botwa',
    data: new URLSearchParams({
      api_key: ariekey,
      action: 'status',
      id: id,
    }),
  };

  axios(config)
    .then(async res => {
      let status = res.data.data.status;

      if (status === "Pending") {
        arie.sendMessage(m.sender, {
          text: `${toko}\n       𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 「 Pending 」\n══════════════════════\nID User: ${m.sender.replace("@s.whatsapp.net", "")}\nNo Pembayaran: ${randomString}\n────────\nWaktu: ${moment.tz('Asia/Jakarta').format('HH:mm:ss')} | ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}\nProduk: ${namaproduk}\nID Produk: ${kode_produk}\nID Transaksi: ${ref_no}\nMetode Pembayaran: Saldo\nKode Unik: 0\nTujuan: ${tujuann}\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\nBiaya Admin: 0\nPotongan Harga: 0\nTotal: Rp ${formatmoney(harga)}\n\n*Status Masih Pending*`
        }, { quoted: m });
        return;
      }

      if (status === "Error") {
        sett("+saldo", m.sender, harga);
        arie.sendMessage(m.sender, {
          text: `${toko}\n       𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 「 Gagal 」\n══════════════════════\nID User: ${m.sender.replace("@s.whatsapp.net", "")}\nNo Pembayaran: ${randomString}\n────────\nWaktu: ${moment.tz('Asia/Jakarta').format('HH:mm:ss')} | ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}\nProduk: ${namaproduk}\nID Produk: ${kode_produk}\nID Transaksi: ${ref_no}\nMetode Pembayaran: Saldo\nKode Unik: 0\nTujuan: ${tujuann}\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\nBiaya Admin: 0\nPotongan Harga: 0\nTotal: Rp ${formatmoney(harga)}\n\n*Mohon Maaf Produk Sedang Gangguan, Silahkan coba lagi nanti*`
        }, { quoted: m });
        sett("product_name", m.sender, "");
        sett("price", m.sender, 0);
        sett("tujuan", m.sender, "");
        sett("desc", m.sender, "");
        sett("reff", m.sender, "");
        sett("buyer_sku_code", m.sender, "");
        sett("status_topup", m.sender, true);
        sett("status_sosmed", m.sender, true);
        return;
      }

      if (status === "Success") {
        arie.sendMessage(m.sender, {
          text: `${toko}\n       𝚂𝚝𝚛𝚞𝚌 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 「 Sukses 」\n══════════════════════\nID User: ${m.sender.replace("@s.whatsapp.net", "")}\nNo Pembayaran: ${randomString}\n────────\nWaktu: ${moment.tz('Asia/Jakarta').format('HH:mm:ss')} | ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}\nProduk: ${namaproduk}\nID Produk: ${kode_produk}\nID Transaksi: ${ref_no}\nMetode Pembayaran: Saldo\nKode Unik: 0\nTujuan: ${tujuann}\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\nBiaya Admin: 0\nPotongan Harga: 0\nTotal: Rp ${formatmoney(harga)}\n\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n${res.data.data.catatan}`
        }, { quoted: m });

        const parsedHarga = parseFloat(harga);
        const productDetails = r.find(i => i.product_name === namaproduk);

        if (productDetails) {
          const filePath = './Pengaturan/database/trxuser.json';
          const hargaModal = productDetails.price;
          const parsedModal = parseFloat(hargaModal);

          if (!isNaN(parsedModal)) {
            const MedanTime = moment.tz('Asia/Jakarta');
            const newTransaction = {
              buyer: m.sender,
              status: res.data.data.message,
              no_pembayaran: ref_no,
              ref_id: res.data.data.ref_id,
              jam: MedanTime.format('HH:mm:ss'),
              waktu: MedanTime.format('DD/MM/YY'),
              produk: namaproduk,
              harga: parsedHarga,
              harga_modal: parsedModal,
              tujuan: tujuann,
              invoice: res.data.data.catatan
            };

            try {
              const fileData = fs.readFileSync(filePath, 'utf8');
              let allUserData = [];

              if (fileData && fileData.trim() !== '') {
                allUserData = JSON.parse(fileData);
                if (!Array.isArray(allUserData)) {
                  allUserData = [];
                }
              }

              allUserData.push(newTransaction);
              fs.writeFileSync(filePath, JSON.stringify(allUserData, null, 2), 'utf8');
            } catch (error) {
              console.error('Error processing the transaction:', error);
              reply("Gagal, Terjadi Kesalahan Saat Memproses Transaksi. Silakan Coba Lagi.");
            }
          } else {
            reply("Gagal, Modal Harga Tidak Ditemukan Untuk Produk Yang Ditentukan.");
          }
        }
        sett("product_name", m.sender, "");
        sett("price", m.sender, 0);
        sett("tujuan", m.sender, "");
        sett("desc", m.sender, "");
        sett("reff", m.sender, "");
        sett("buyer_sku_code", m.sender, "");
        sett("status_topup", m.sender, true);
        sett("status_sosmed", m.sender, true);
        return;
      }
    })
  break;
}

// ========================================= CASE SOSMED =====================
case 'sosmed': {
  if (cek("status_sosmed", m.sender) == false) {
    return reply(`Ada pesanan Sosmed yang belum selesai, silahkan selesaikan transaksi sebelumnya atau tekan *.cancelsosmed* untuk membatalkan.`);
  }
  if (cek("status_topup", m.sender) == false) {
    return reply(`Ada pesanan Topup yang belum selesai, silahkan selesaikan transaksi sebelumnya atau tekan *.canceltopup* untuk membatalkan.`);
  }

  let sal = `*Format Salah ‼️* 

  *Contoh Order Sosmed*
  ${prefix}order [kode]|[jumlah]|[link/username]
  *=> #order 1234|1000|ariepulsa*
  *-----------------*
  
  ⚠️ Masukan link / username dengan benar agar tidak terjadi kesalahan saat proses.
  `;

  if (!text) return reply(sal);

  let [produk, jumlahh, tujuan] = text.split("|");

  if (!produk || !jumlahh || !tujuan) {
    return reply(sal);
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  for (let i of sos) {
    if (i.sid === produk) {
      let harga = parseFloat(i.price);
      let totalHarga = harga + (harga * uphar);
      let totalOrder = ((totalHarga * parseInt(jumlahh) / 1000) + 100).toFixed(0);

      if (parseFloat(totalOrder) > cek("saldo", m.sender)) {
        return reply(`Gagal, Tidak Dapat Memproses Pesanan Karena Saldo Tidak Mencukupi\nSilahkan Lakukan Deposit Dahulu\n\nKetik : *deposit*`);
      }

      let har = parseFloat(totalOrder);
      let nama_produkk = i.layanan;
      let descc = i.catatan;

      sett("-saldo", m.sender, har);
      sett("price", m.sender, har);
      sett("product_name", m.sender, nama_produkk);
      sett("status_sosmed", m.sender, false);
      sett("tujuan", m.sender, tujuan);
      sett("buyer_sku_code", m.sender, produk);
      sett("desc", m.sender, descc);
      sett("jumlah", m.sender, parseInt(jumlahh));

      let an = `*📑 RINCIAN TRANSAKSI*
      
*Nama :* ${cek("product_name", m.sender)}
*Jumlah :* ${cek("jumlah", m.sender)}
*Harga :* Rp ${cek("price", m.sender)}
*Tujuan :* ${cek("tujuan", m.sender)}
*Deskripsi :* ${cek("desc", m.sender)}

Ketik *${prefix}order* untuk Melanjutkan Transaksi
Ketik *${prefix}cancelsosmed* untuk Membatalkan pesanan`;

      return reply(an);
    }
  }

  return reply(`Maaf, produk *${produk}* tidak ditemukan. Silahkan lihat kode produk di *${prefix}listharga*`);
}
break;

case 'order': {
  if (cek("status_sosmed", m.sender) == true) {
    return reply(`Tidak ada pesanan sebelumnya, silahkan melakukan pembelian produk kembali.`);
  }
  if (cek("status_topup", m.sender) == false) {
    return reply(`Perintah ini hanya untuk orderan Sosmed. Silahkan ketik : *konfirmasi* untuk melanjutkan orderan Topup.`);
  }

  let kode_buyer = cek("buyer_sku_code", m.sender);
  let jumlahh = cek("jumlah", m.sender);

  for (let i of sos) {
    if (i.sid === kode_buyer) {
      let tujuann = cek("tujuan", m.sender);
      let harga = cek("price", m.sender);
      let referdf = cek("reff", m.sender);
      let ref_no = m.sender.split('@')[0];
      let namaproduk = cek("product_name", m.sender);

      const apiURL = "https://ariepulsa.com/api/sosial-media";
      const params = new URLSearchParams({
        api_key: ariekey,
        action: "pemesanan",
        layanan: kode_buyer,
        target: tujuann,
        jumlah: jumlahh
      });

      fetch(apiURL, {
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(async (response) => {
        const responseData = await response.json();

        if (response.status === 200 && responseData.status === true) {
          const id = responseData.data.id;
          const jumlahnya = responseData.data.jumlah;

          m.reply(`*「 Sosmed Berhasil DiProses 」*\n\nReffID : ${id}\nLayanan : ${namaproduk}\nJumlah : ${jumlahnya}\nTujuan : ${tujuann}\n\nSimpan Kode ReffIDnya : *${id}* Untuk Mengecek Status Secara Berkala\nKetik : *ceksosmed ${id}*`);
          // Mengatur ulang data pengguna setelah berhasil
          sett("product_name", m.sender, "");
          sett("price", m.sender, 0);
          sett("tujuan", m.sender, "");
          sett("desc", m.sender, "");
          sett("reff", m.sender, "");
          sett("jumlah", m.sender, "");
          sett("buyer_sku_code", m.sender, "");
          sett("status_topup", m.sender, true);
          sett("status_sosmed", m.sender, true);
        } else {
          sett("+saldo", m.sender, parseFloat(harga)); // Mengembalikan saldo
          m.reply(`Gagal Memproses Orderan Sosmed ReffID ${referdf}`);
          // Mengatur ulang data pengguna setelah gagal
          sett("product_name", m.sender, "");
          sett("price", m.sender, 0);
          sett("tujuan", m.sender, "");
          sett("desc", m.sender, "");
          sett("reff", m.sender, "");
          sett("jumlah", m.sender, "");
          sett("buyer_sku_code", m.sender, "");
          sett("status_topup", m.sender, true);
          sett("status_sosmed", m.sender, true);
        }
      })
      .catch(error => {
        console.error('Error during transaction:', error);
        sett("+saldo", m.sender, parseFloat(harga)); // Mengembalikan saldo
        reply("Gagal, Terjadi Kesalahan Saat Memproses Transaksi. Silakan Coba Lagi.");
        // Mengatur ulang data pengguna setelah gagal
        sett("product_name", m.sender, "");
        sett("price", m.sender, 0);
        sett("tujuan", m.sender, "");
        sett("desc", m.sender, "");
        sett("reff", m.sender, "");
        sett("jumlah", m.sender, "");
        sett("buyer_sku_code", m.sender, "");
        sett("status_topup", m.sender, true);
        sett("status_sosmed", m.sender, true);
      });
      break; // Keluar dari loop setelah menemukan produk
    }
  }
  break;
}

case 'ceksosmed': {
  let kodeid = text.split("|")[0];

  if (!kodeid) {
    return reply(`Format salah. Gunakan: ${prefix}ceksosmed [ReffID]`);
  }

  let config = {
    method: 'POST', // Set the HTTP method to POST
    url: 'https://ariepulsa.com/api/sosial-media', // Set the target URL
    data: new URLSearchParams({
      api_key: ariekey,
      action: 'status',
      id: kodeid
    }),
  };

  axios(config)
    .then(response => {
      const data = response.data.data;
      if (data) {
        m.reply(`*「 Orderan Sosmed ${data.status} 」*\n\nReffID: ${data.id}\nLayanan: ${data.layanan}\nTarget: ${data.target}\nJumlah: ${data.jumlah}\nStart Count: ${data.start_count}\nRemain: ${data.remains}`);
      } else {
        m.reply("Tidak ada data yang ditemukan.");
      }
    })
    .catch(error => {
      console.error('Error fetching sosmed order status:', error);
      m.reply("Terjadi kesalahan saat mengambil data.");
    });

  break;
}



case 'bukti':{
if (!quoted) return reply(`Kirim/Reply Gambar Dengan Caption *${prefix + command}*`)
if (/image/.test(mime)) {
let media = await quoted.download()
m.reply(`Bukti berhasil terkirim ke owner,silahkan menunggu konfirmasi`)
let idny = m.sender.split("@")[0]
let buktii = `「 *DEPOSIT USER* 」
⭔ID:  ${cek("reff_deposit" ,m.sender)}
⭔Nomer: @${cek("id" ,m.sender)}
⭔Payment: Qris Alpayment
⭔Tanggal: ${cek("tanggal_deposit" ,m.sender)}
⭔Jumlah Deposit: ${formatmoney(cek("deposit" ,m.sender))}
⭔Pajak: Rp0
⭔Total Bayar: ${formatmoney(cek("deposit" ,m.sender))}

Ada yang deposit nih kak, coba dicek saldonya, jika sudah masuk konfirmasi dengan 

#addsaldo ${sender.split('@')[0]}|${cek("deposit" ,m.sender)}
`
arie.sendMessage(global.owner+'@s.whatsapp.net', {image: media, caption: buktii},{quoted: null})
}
else {
reply(`Kirim/Reply Gambar Dengan Caption *${prefix + command}*`)
}
}
break

//CEK NAMA E-WALLET ARIEPULSA
case 'cekewallet': {
   
let noreq = text.split('.')[0]
let iddd = text.split('.')[1]
if (!noreq && !iddd) return reply(`✧༝┉˚*❋ FORMAT SALAH ❋*˚┉༝✧

*Cara Cek Nama E-Wallet*
${prefix}cekewallet kodewallet.nomortujuan
=> .cekewallet dana.085174332383

*KODE E-WALLET*
=> DANA : dana
=> OVO : ovo
=> GOPAY CUSTOMER : gopay
=> GOPAY DRIVER : gopaydriver
=> SHOPEEPAY : shopeepay
=> ISAKU : isaku
=> LINKAJA : linkaja


⚠️ Masukan Kode Dan Nomor Tujuan Yang Benar
`) 
   let axios = require('axios')
    axios('https://ariepulsa.com/api/get-nickname-ewallet',{
method: 'POST',
data: new URLSearchParams(Object.entries({
api_key: ariekey,
action: 'get-nickname-ewallet',
layanan: noreq,
target: iddd,
}))}).then((res) => {
if (res.data.status == false) {
        m.reply(`${res.data.data.pesan}`)
      }
if (res.data.status == true) {
            m.reply(`*----CEK NAMA E-WALLET ----*\n\n*Rekening :* ${res.data.data.nomor}\n*Nama :* ${res.data.data.nama}\n\n${toko}`)
          }
        })
      }
  break

 //CEK NAMA REKENING ALL BANK ARIEPULSA
case 'cekrekening': {
   
let noreq = text.split('.')[0]
let iddd = text.split('.')[1]
if (!noreq && !iddd) return reply(`✧༝┉˚*❋ FORMAT SALAH ❋*˚┉༝✧

*Cara Cek Nama Rekening*
${prefix}cekrekening kodebank.nomorrekening
=> .cekrekening bca.1234567890

*KODE BANK*
=> BANK BCA : bca
=> BANK BRI : bri
=> BANK MANDIRI : mandiri
=> BANK BNI : bni

⚠️ Masukan Kode Dan Nomor Tujuan Yang Benar
`) 
   let axios = require('axios')
    axios('https://ariepulsa.com/api/get-nickname-bank',{
method: 'POST',
data: new URLSearchParams(Object.entries({
api_key: ariekey,
action: 'get-nickname-bank',
layanan: noreq,
target: iddd,
}))}).then((res) => {
if (res.data.status == false) {
        m.reply(`${res.data.data.pesan}`)
      }
if (res.data.status == true) {
            m.reply(`*----CEK NAMA REKENING ----*\n\n*Rekening :* ${res.data.data.nomor}\n*Nama :* ${res.data.data.nama}\n\n${toko}`)
          }
        })
      }
  break

//CEK NICKMANE GAME
case 'ceknickml':{
   
  let mlidnick = q.split("|")[0]
  let mlzonenick = q.split("|")[1]
   if (!mlidnick) return reply(`ID Game Nya Mana?\n.ceknickml 12345678|1234`)
  if (!mlzonenick) return reply(`ID Server Nya Mana?\n.ceknickml 12345678|1234`)
   let nickid = `${mlidnick}`
   let nickzone = `${mlzonenick}`
    let axios = require('axios')
    axios('https://ariepulsa.com/api/get-nickname-game',{
method: 'POST',
data: new URLSearchParams(Object.entries({
api_key: ariekey,
action: 'get-nickname-game',
layanan: 'mobile-legends',
target: nickid,
no_meter: nickzone,
}))}).then((res) => {
if (res.data.status == false) {
        m.reply(`${res.data.data.pesan}`)
      }
if (res.data.status == true) {
            m.reply(`*── 「 YOUR NICKNAME 」 ──*\n\n› Game : Mobile Lengeds\n› ID Game : ${mlidnick}\n› Server : (${mlzonenick})\n› NickName : ${res.data.data.nickname}\n\n${toko}`)
          }
        })
      }
  break
  case 'ceknickvalorant':{
     
    let valonick = q.split(" ")[0]
    if (!valonick) return reply(`ID Game Nya Mana?\n.ceknickvalorant 1234567890`)
     let nickvalo = `${valonick}`
      let axios = require('axios')
    axios('https://ariepulsa.com/api/get-nickname-game',{
method: 'POST',
data: new URLSearchParams(Object.entries({
api_key: ariekey,
action: 'get-nickname-game',
layanan: 'valorant',
target: nickvalo,
}))}).then((res) => {
if (res.data.status == false) {
          m.reply(`${res.data.data.pesan}`)
        }
if (res.data.status == true) {
              m.reply(`*── 「 YOUR NICKNAME 」 ──*\n\n› Game : Valorant\n› ID Game : ${valonick}\n› NickName : ${res.data.data.nickname}\n\n${toko}`)
            }
          })
        }
    break
case 'ceknickgenshin':{
   
  let mlidnick = q.split("|")[0]
  let mlzonenick = q.split("|")[1]
   if (!mlidnick) return reply(`ID Game Nya Mana?\n.ceknickgenshin 12345678|os_asia
   
   Kode Server :
   => ASIA : os_asia
   => AMERIKA : os_usa
   => EUROPA : os_euro
   => TW/HK/MO : os_cht
   
   `)
  if (!mlzonenick) return reply(`Kode Server Nya Mana?\n.ceknickgenshin 12345678|os_asia
   
   Kode Server :
   => ASIA : os_asia
   => AMERIKA : os_usa
   => EUROPA : os_euro
   => TW/HK/MO : os_cht
   
   `)
   let nickid = `${mlidnick}`
   let nickzone = `${mlzonenick}`
    let axios = require('axios')
    axios('https://ariepulsa.com/api/get-nickname-game',{
method: 'POST',
data: new URLSearchParams(Object.entries({
api_key: ariekey,
action: 'get-nickname-game',
layanan: 'genshin-impact',
target: nickid,
no_meter: nickzone,
}))}).then((res) => {
if (res.data.status == false) {
        m.reply(`${res.data.data.pesan}`)
      }
if (res.data.status == true) {
            m.reply(`*── 「 YOUR NICKNAME 」 ──*\n\n› Game : Genshin Impact\n› ID Game : ${mlidnick}\n› Server : ${mlzonenick}\n› NickName : ${res.data.data.nickname}\n\n${toko}`)
          }
        })
      }
  break
case 'ceknickff':{
   
    let ffnick = q.split(" ")[0]
    if (!ffnick) return reply(`ID Game Nya Mana?\n.ceknickff 1234567890`)
     let nick1 = `${ffnick}`
      let axios = require('axios')
    axios('https://ariepulsa.com/api/get-nickname-game',{
method: 'POST',
data: new URLSearchParams(Object.entries({
api_key: ariekey,
action: 'get-nickname-game',
layanan: 'free-fire',
target: nick1,
}))}).then((res) => {
if (res.data.status == false) {
          m.reply(`${res.data.data.pesan}`)
        }
if (res.data.status == true) {
              m.reply(`*── 「 YOUR NICKNAME 」 ──*\n\n› Game : FreeFire\n› ID Game : ${ffnick}\n› NickName : ${res.data.data.nickname}\n\n${toko}`)
            }
          })
        }
    break
    case 'ceknickhiggs':{
       
        let higgsnick = q.split(" ")[0]
        if (!higgsnick) return reply(`ID Game Nya Mana?\n.ceknickhiggs 1234567890`)
         let nickhiggs = `${higgsnick}`
          let axios = require('axios')
    axios('https://ariepulsa.com/api/get-nickname-game',{
method: 'POST',
data: new URLSearchParams(Object.entries({
api_key: ariekey,
action: 'get-nickname-game',
  layanan: 'higgs-domino',
  target: nickhiggs,
  }))}).then((res) => {
    if (res.data.status == false) {
              m.reply(`${res.data.data.pesan}`)
            }
    if (res.data.status == true) {
                  m.reply(`*── 「 YOUR NICKNAME 」 ──*\n\n› Game : Higgs Domino\n› ID Game : ${ffnick}\n› NickName : ${res.data.data.nickname}\n\n${toko}`)
                }
              })
            }
        break

//CEK ID PLN
case 'cekidpln': {
   
  let no = q.split(" ")[0]
  let yogin = `${no}`     
  if (!no) return reply(`Nomor Nya mana?\n.cekidpln 1234567890`)
  const config = {
    method: 'POST',  // Set the HTTP method to POST
    url: 'https://api.digiflazz.com/v1/transaction',  // Set the target URL
    data: {
     "commands": "pln-subscribe",
      "customer_no": yogin,
  }
  };
  
  axios(config)
    .then(function (response) {
      if (response.data.data){
      m.reply(`*Nama Pelangan :* ${response.data.data.name}\n*Daya :* ${response.data.data.segment_power}\n*Id Pelanggan :* ${response.data.data.subscriber_id}`) 
    } else {
    m.reply(`Server Sedang Sibuk`)
  }
    })
  }
  break

//DEPOSIT REKENING
case 'manual': {
  let reff_deposi = require("crypto").randomBytes(5).toString("hex").toUpperCase();
  if(cek("status_deposit", m.sender) == false) return reply(`Ada deposit yang belum terselesaikan silahkan selesaikan deposit sebelumnya atau batalkan dengan ketik #canceldepo.`)
  if(cek("status_deposit_otomatis", m.sender) == false) return reply(`Ada deposit yang belum terselesaikan silahkan selesaikan deposit sebelumnya atau batalkan dengan ketik #canceldepo.`)
  let jumlah_nya = text.split("|")[0];
  if (!jumlah_nya || parseInt(jumlah_nya) < 1000) return reply(`Format Salah atau Jumlah Deposit Kurang dari Rp 1000\n\nContoh : manual 1000`);
  let data_depo = new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta" });
  sett("deposit", m.sender, jumlah_nya);
  sett("reff_deposit", m.sender, reff_deposi);
  sett("status_deposit", m.sender, false);
  sett("tanggal_deposit", m.sender, data_depo + jam);
  let txt = `「 𝙆𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙎𝙄-𝘿𝙀𝙋𝙊𝙎𝙄𝙏 」

》 ID :  ${cek("reff_deposit", m.sender)}
》 Nomer :  ${cek("id", m.sender)}
${rekening}
》 Jumlah Deposit : ${formatmoney(cek("deposit", m.sender))}
》 Pajak Admin : Rp0
》 Total Pembayaran : ${formatmoney(cek("deposit", m.sender))}

*Silahkan Transfer Atau Scan Qris Di Atas Sesuai Nominal. Jika Sudah Transfer Harap Kirim Gambarnya Dengan Reply/Caption #bukti*`;
  arie.sendMessage(from, { image: qris, caption: txt });
}
break;


 case 'otomatis': {
  if(cek("status_deposit_otomatis", m.sender) == false) return reply(`Ada deposit yang belum terselesaikan silahkan selesaikan deposit sebelumnya atau batalkan dengan ketik #canceldepo.`)
  if(cek("status_deposit", m.sender) == false) return reply(`Ada deposit yang belum terselesaikan silahkan selesaikan deposit sebelumnya atau batalkan dengan ketik #canceldepo.`)
  let reff_deposi = koderef
  let feenya = fee_owner
  let jumlah_nya = text.split("|")[0]
  if (!jumlah_nya || parseInt(jumlah_nya) < 1000) return reply(`Format Salah atau Jumlah Deposit Kurang dari Rp 1000\n\nContoh : manual 1000`);
  let depositnya = parseInt(jumlah_nya) + feenya
  let data_depo = new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"})
  sett("deposit", m.sender, jumlah_nya)
  sett("reff_deposit", m.sender, reff_deposi)
  sett("fee_owner", m.sender, feenya)
  sett("status_deposit_otomatis", m.sender, false)
  sett("tanggal_deposit", m.sender, data_depo + jam) 

  //let batas_time = '1800'; //Batas waktu pembayaran (detik) minimal 1800 30 menit dan maximal 10800 3 jam
    let third = 'NewTransaction';
    let hash = crypto.createHash('md5')
        .update(keypaydis + reff_deposi + servpaydis + depositnya + batas_time + third)
        .digest('hex');

    let nomdep = `${cek("deposit", m.sender)}`
    let nomfee = `${cek("fee_owner", m.sender)}`

    var config = {
        method: 'POST',  // Set the HTTP method to POST
        url: 'https://paydisini.co.id/api/',  // Set the target URL
        data: new URLSearchParams(Object.entries({
            key: keypaydis,
            request: 'new',
            merchant_id: merchpaydis,
            unique_code: reff_deposi,
            service: servpaydis,
            amount: depositnya,
            note: 'Deposit Bot Whatsapp',
            valid_time: batas_time,
            ewallet_phone: '',
            customer_email: '',
            type_fee: fee_cus,
            payment_guide: '',
            callback_count: '',
            return_url: '',
            signature: hash,
        })),
    };

    axios(config)
        .then(function (response) {
          const idddep = response.data.data.pay_id;
          const koddep = response.data.data.unique_code;
          const serdep = response.data.data.service_name;
          const baldep = response.data.data.balance;
          const fee = response.data.data.fee;
          const qrispaydisini = { url: response.data.data.qrcode_url};
            if (response.data.success == true) {
              let txt = `*「 DEPOSIT QRIS OTOMATIS 」*\n\n› ID TRX : ${response.data.data.pay_id}\n› Kode Unik  : ${response.data.data.unique_code}\n› NAMA LAYANAN : ${response.data.data.service_name}\n› NOMINAL : Rp ${nomdep}\n› FEE ADMIN : Rp ${nomfee}\n› FEE SERVER : Rp ${response.data.data.fee}\n› TOTAL : Rp ${response.data.data.amount}\n› STATUS : ${response.data.data.status}\n› EXPIRED  : ${response.data.data.expired}\n`
              arie.sendMessage(from, {image:qrispaydisini, caption:txt})
              sett("reff_deposit", m.sender, koddep)
              sett("reff", m.sender, idddep)
                sett("tanggal_trx", m.sender, data_depo)
                sett("status_deposit_otonatis", m.sender, false)
                get_status_paydisini(koddep)
              } 
            if (response.data.success == false) {
                m.reply(`*「 DEPOSIT QRIS OTOMATIS 」*\n\n› STATUS PAYSDISINI : *GAGAL*\n› PESAN : *${response.data.msg}*\n`)
                sett("reff_deposit", m.sender, "")
                sett("reff", m.sender, "")
                sett("deposit", m.sender, "")
                sett("tanggal_trx", m.sender, "")
                sett("status_deposit_otomatis", m.sender, true)
            }
        })
}
break

case 'cekdeposit':
    {
      if(cek("status_deposit_otomatis", m.sender) == true) return reply(`Ini Perintah Khusus Untuk Deposit Otomatis\nTidak ada deposit otomatis sebelumnya silahkan melakukan deposit Dahulu.\n\nKetik : *otomatis 1000*`)
      let kodedep = `${cek("reff_deposit", m.sender)}`;
      let saldomas = `${cek("deposit", m.sender)}`
      let ref_no = `${sender.split('@')[0]}`
      
    let third = 'StatusTransaction';
    let hash = crypto.createHash('md5')
        .update(keypaydis + kodedep + third)
        .digest('hex');
  
  var config = {
    method: 'POST',  // Set the HTTP method to POST
    url: 'https://paydisini.co.id/api/',  // Set the target URL
    data: new URLSearchParams(Object.entries({
      key: keypaydis,
      request: 'status',
      unique_code: kodedep,
      signature: hash,
      })),
  };

  axios(config)
  .then(async res => {
    let status = res.data.data.status;
      if (status == "Pending") {
          m.reply(`Deposit Status Pending, Silahkan Scan Qris Pembayaran`);
        }
      if (status == "Success") { 
          sett("+saldo", m.sender, parseInt(saldomas))
          m.reply(`*Hai Kak👋*\n\nSaldo berhasil masuk ke akun kamu sejumlah : *Rp ${saldomas}*\n\nSisa saldo kamu saat ini : *Rp ${cek("saldo", m.sender)}*`);
          sett("status_deposit", m.sender, true)
          sett("status_deposit_otomatis", m.sender, true)
          sett("deposit", m.sender, "")
          sett("fee_owner", m.sender, 0)
          sett("reff_deposit", m.sender, "")  
          sett("tanggal_deposit", m.sender, "")  
                }          
      if (status == "Canceled ") {
          m.reply(`Sangat Disayangkan Sekali. Pembayaran Kamu Dibatalkan Oleh Sistem`);
          sett("status_deposit", m.sender, true)
          sett("status_deposit_otomatis", m.sender, true)
          sett("deposit", m.sender, "")
          sett("fee_owner", m.sender, 0)
          sett("reff_deposit", m.sender, "")  
          sett("tanggal_deposit", m.sender, "")  
      }
  })
      
    }
    break;

case "canceldepo":
      {
          if (cek("status_deposit", m.sender) == false && cek("status_deposit_otomatis", m.sender) == true) {
              m.reply(`🗯️ _SUKSES MEMBATALKAN DEPOSIT MANUAL_`);
              sett("status_deposit", m.sender, true);
          } else if (cek("status_deposit", m.sender) == true && cek("status_deposit_otomatis", m.sender) == false) {
              m.reply(`🗯️ _SUKSES MEMBATALKAN DEPOSIT OTOMATIS_`);
              sett("status_deposit_otomatis", m.sender, true);
          } else {
              return reply(`Tidak ada deposit sebelumnya silahkan melakukan deposit dahulu.`);
          }
      
          sett("deposit", m.sender, "")
          sett("fee_owner", m.sender, 0)
          sett("reff_deposit", m.sender, "")  
          sett("tanggal_deposit", m.sender, "")  
      
          break;
      }

case 'addsaldo':{
if(!isOwner) return reply(mess.owner)
if(!text) return reply(`*Contoh :*\n${prefix}addsaldo 62xx|10000`)
let saldo = text.split("|")[1] * 1
let id = text.split("|")[0]
if(!saldo) throw `Masukan aldonya!!`
let cekk = `*${cek("reff_deposit", id+"@s.whatsapp.net")}`
if(cek("status_deposit", id+"@s.whatsapp.net") == true) return reply(`Tidak ada deposit sebelumnya pada ${id}.`)
if(cek("reff_deposit", id+"@s.whatsapp.net") == true) return reply(`Pengguna ${id} Tidak terdaftar di database`)
sett("+saldo", id+"@s.whatsapp.net", parseInt(saldo))
reply(`Sukses menambah saldo pada akun\n*ID :* ${id}\n*Tag :* @${id}\nJumlah saldo sekarang : *Rp ${cek("saldo", id+"@s.whatsapp.net")}*`)
setTimeout(function(){
arie.sendMessage(id+"@s.whatsapp.net", {text:`*Hai Kak👋*\n\nSaldo berhasil masuk ke akun kamu sejumlah : *${formatmoney(saldo)}*\n\nSisa saldo kamu saat ini : *Rp ${cek("saldo", id+"@s.whatsapp.net")}*`}) 
}, 5000)
sett("deposit", id+"@s.whatsapp.net", "")
sett("reff_deposit", id+"@s.whatsapp.net", "")
sett("status_deposit", id+"@s.whatsapp.net", true)      
sett("tanggal_deposit", id+"@s.whatsapp.net", "")
}
break

case 'menu': {
   
if (cek("id", m.sender) == null) return daftar()
let tam = `${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}

  •°INFO MENU ${namabot}°•

✦ *CARA TRANSAKSI* ✦
: ̗̀➛ topup [kode]|[tujuan]
: ̗̀➛ sosmed [kode]|[jumlah]|[link/username]

✦ *CEK TRANSAKSI* ✦
: ̗̀➛ cektopup
: ̗̀➛ ceksosmed [ReffID]

✦ Menu Topup ✦
: ̗̀➛ topuppulsa
: ̗̀➛ topupgame
: ̗̀➛ topupemoney
: ̗̀➛ topuptokenpln
: ̗̀➛ topuptv
: ̗̀➛ voucherdigital

✦ Menu Sosmed ✦
: ̗̀➛ tiktok
: ̗̀➛ instagram
: ̗̀➛ youtube
: ̗̀➛ facebook
: ̗̀➛ snackvideo
: ̗̀➛ telegram
: ̗̀➛ whatsapp
: ̗̀➛ twitch
: ̗̀➛ thread
: ̗̀➛ soundcloud
: ̗̀➛ spotity
: ̗̀➛ linked
: ̗̀➛ shopee
: ̗̀➛ tokopedia

✦ Menu Member ✦
: ̗̀➛ ceksaldo
: ̗̀➛ deposit
: ̗̀➛ deposit
: ̗̀➛ request
: ̗̀➛ gcmember

✦ Menu Riwayat ✦
: ̗̀➛ toplayanan
: ̗̀➛ topuser
: ̗̀➛ cekriwayat
: ̗̀➛ riwayat

✦ Menu Bantuan ✦
: ̗̀➛ cekidpln
: ̗̀➛ cekewallet
: ̗̀➛ cekrekening
: ̗̀➛ ceknickml
: ̗̀➛ ceknickff
: ̗̀➛ ceknickhiggs
: ̗̀➛ ceknickvalorant
: ̗̀➛ ceknickgenshin

_${toko}_
`   
reply(tam)
					} 
				break	

case 'ceksaldo': case 'saldo':     
let myde = `❢◥ ▬▬▬ 𝗗𝗘𝗧𝗔𝗜𝗟 𝗔𝗞𝗨𝗡 ▬▬▬ ◤❢
          
*○*  Saldo :*  ${formatmoney(cek("saldo", m.sender))}
*○*  Name : ${pushname}
*○*  Id : ${sender.replace("@s.whatsapp.net", "")}
*○*  Level : ${cek("level", m.sender)}

Cek Riwayat Transaksi Anda Dengan Cara Ketik *.𝗰𝗲𝗸𝗿𝗶𝘄𝗮𝘆𝗮𝘁*

Cek Riwayat Transaksi Anda Dengan Spesifik Ketik *.𝗿𝗶𝘄𝗮𝘆𝗮𝘁*

𝘐𝘯𝘨𝘪𝘯 𝘥𝘦𝘱𝘰𝘴𝘪𝘵 𝘴𝘪𝘭𝘢𝘩𝘬𝘢𝘯 𝘬𝘦𝘵𝘪𝘬 𝘤𝘰𝘮𝘮𝘢𝘯𝘥 #𝘥𝘦𝘱𝘰𝘴𝘪𝘵`
reply(myde)
break

case "gcmember":
        let tammember = `「 *LINK GC RESMI* 」\n\n${gcresmi}`;
        reply(tammember);
        break;

case "uplevel":
        let tamlevel = `「 *UPLEVEL* 」\n\n${hargalevel}`;
        reply(tamlevel);
        break;

case 'tiktok': {
    let tamtiktok = `「 *LIST SOSMED TIKTOK* 」
: ̗̀➛ tiktokview
: ̗̀➛ tiktokfollowers5
: ̗̀➛ tiktoklikes6
: ̗̀➛ tiktokshare1
: ̗̀➛ tiktokfollowersar3
: ̗̀➛ tiktokfollowersexclusive1
: ̗̀➛ tiktoksaveserver1
: ̗̀➛ tiktoklivestreamviewsbonus
: ̗̀➛ tiktoklivecomments1
: ̗̀➛ tiktoklivestreams5
: ̗̀➛ tiktoklivestreams2
: ̗̀➛ tiktoklivestreams3
: ̗̀➛ tiktoklivelike
: ̗̀➛ tiktokcomments3
: ̗̀➛ tiktoklivestreams1
: ̗̀➛ tiktokstorylikes
: ̗̀➛ tiktokfollowersindo
`;
    reply(tamtiktok);
    break;
  }

  // Kasus untuk Instagram
  case 'instagram': {
    let taminstagram = `「 *LIST SOSMED INSTAGRAM* 」
: ̗̀➛ instagramstoryview
: ̗̀➛ instagramlivevideo
: ̗̀➛ instagramimpressions
: ̗̀➛ instagramlikes3
: ̗̀➛ instagramfollowers31
: ̗̀➛ instagramlikes19
: ̗̀➛ instagramfollowersrefill2
: ̗̀➛ instagramlikesreels7
: ̗̀➛ instagramtvlikes5
: ̗̀➛ instagramfollowersrefill15
: ̗̀➛ instagramcomments5
: ̗̀➛ instagramcommentsindonesia
: ̗̀➛ instagramreelslikes1
: ̗̀➛ instagramfollowersrefill23
: ̗̀➛ instagramfollowersindo12
: ̗̀➛ instagramlikesverified
: ̗̀➛ instagramviewserver4
: ̗̀➛ instagramfollowersup1
: ̗̀➛ instagramfollowersexclusive1
: ̗̀➛ instagramautolikesindonesia
`;
    reply(taminstagram);
    break;
  }

  // Kasus untuk Telegram
  case 'telegram': {
    let tamtelegram = `「 *LIST SOSMED TELEGRAM* 」
: ̗̀➛ telegrampostview
: ̗̀➛ telegramchannelmembers
: ̗̀➛ telegrampartypopper
: ̗̀➛ telegramautopostview
: ̗̀➛ telegrambotstart
: ̗̀➛ telegramstoryviews
`;
    reply(tamtelegram);
    break;
  }

  // Kasus untuk YouTube
  case 'youtube': {
    let tamyoutube = `「 *LIST SOSMED YOUTUBE* 」
: ̗̀➛ youtubelikes
: ̗̀➛ youtubeviews4
: ̗̀➛ youtubelivestreamviews
: ̗̀➛ youtubesubscribers3
: ̗̀➛ youtubesubscribe12
: ̗̀➛ youtubeshortlikes1
: ̗̀➛ youtubeviewsadsense1
: ̗̀➛ youtubeviewtargetindonesia
: ̗̀➛ youtubelivestreamhq
: ̗̀➛ youtubelivestreamlikes
: ̗̀➛ youtubelivestreamserver5
: ̗̀➛ youtubelivestream15min
: ̗̀➛ youtubelivestreamhq30min
: ̗̀➛ youtubeadsviewsserver1
: ̗̀➛ youtubelivestreammax20k
: ̗̀➛ youtubelivestreamranking
: ̗̀➛ youtubeviewshr
: ̗̀➛ youtubeviewsjam17
: ̗̀➛ youtubelikesindo
: ̗̀➛ youtubesubscribelifetime
`;
    reply(tamyoutube);
    break;
  }

  // Kasus untuk Facebook
  case 'facebook': {
    let tamfacebook = `「 *LIST SOSMED FACEBOOK* 」
: ̗̀➛ facebookfollowers1
: ̗̀➛ facebookpostlikes1
: ̗̀➛ facebookvideoviews4
: ̗̀➛ facebookemoticonlikes
: ̗̀➛ facebooklivestreamviews
: ̗̀➛ facebookreelsviews
: ̗̀➛ facebooklivestreamar1
: ̗̀➛ facebooklivestreams1
: ̗̀➛ facebooklivestreamsupercheap
: ̗̀➛ facebookgroupmember
: ̗̀➛ facebooklivestreamar2
: ̗̀➛ facebookpostkomentar
: ̗̀➛ facebookpagefollowers
: ̗̀➛ facebookvideovip
: ̗̀➛ facebookstoryviews
: ̗̀➛ facebookpostshare
`;
    reply(tamfacebook);
    break;
  }

  // Kasus untuk Threads
  case 'thread': {
    let tamthread = `「 *LIST SOSMED THREAD* 」
: ̗̀➛ threadsfollowers
: ̗̀➛ threadslikes
: ̗̀➛ threadscomments
: ̗̀➛ threadsreshare
`;
    reply(tamthread);
    break;
  }

  // Kasus untuk SoundCloud
  case 'soundcloud': {
    let tamsoundcloud = `「 *LIST SOSMED SOUNDCLOUD* 」
: ̗̀➛ soundcloud
`;
    reply(tamsoundcloud);
    break;
  }

  // Kasus untuk Twitter
  case 'twitter': {
    let tamtwitter = `「 *LIST SOSMED TWITTER* 」
: ̗̀➛ twitterviews
: ̗̀➛ twitterasiafollowers
: ̗̀➛ twitterasiafollowers3
: ̗̀➛ twitterretweets1
: ̗̀➛ twitterfollowersindo
: ̗̀➛ twitterlikes1
: ̗̀➛ twitterfollowersar1
: ̗̀➛ twittertweetviews
`;
    reply(tamtwitter);
    break;
  }

  // Kasus untuk Web Traffic
  case 'webtraffic': {
    let tamwebtraffic = `「 *LIST SOSMED WEB TRAFFIC* 」
: ̗̀➛ webtraffic
`;
    reply(tamwebtraffic);
    break;
  }

  // Kasus untuk WhatsApp
  case 'whatsapp': {
    let tamwhatsapp = `「 *LIST SOSMED WHATSAPP* 」
: ̗̀➛ whatsappchannelmembers
: ̗̀➛ whatsappchannelreaction
`;
    reply(tamwhatsapp);
    break;
  }

  // Kasus untuk Snack Video
  case 'snackvideo': {
    let tamsnackvideo = `「 *LIST SOSMED SNACK VIDEO* 」
: ̗̀➛ snackvideofollowers
: ̗̀➛ snackvideolikes
`;
    reply(tamsnackvideo);
    break;
  }

  // Kasus untuk Twitch
  case 'twitch': {
    let tamtwitch = `「 *LIST SOSMED TWITCH* 」
: ̗̀➛ twitchfollowers
: ̗̀➛ twitchliveviews
`;
    reply(tamtwitch);
    break;
  }

  // Kasus untuk LinkedIn
  case 'linked': {
    let tamlinked = `「 *LIST SOSMED LINKEDIN* 」
: ̗̀➛ linkedinfollowers
`;
    reply(tamlinked);
    break;
  }

  // Kasus untuk Spotify
  case 'spotify': {
    let tamspotify = `「 *LIST SOSMED SPOTIFY* 」
: ̗̀➛ spotifyfollowers
: ̗̀➛ spotifyplays
`;
    reply(tamspotify);
    break;
  }

// Kasus untuk Shopee
case 'shopee': {
  let tamshopee = `「 *LIST SOSMED SHOPEE* 」
: ̗̀➛ shopeelivestreamviews
`;
  reply(tamshopee);
  break;
}

// Kasus untuk Tokopedia
case 'tokopedia': {
  let tamtokopedia = `「 *LIST SOSMED TOKOPEDIA* 」
: ̗̀➛ tokopediafollowers
`;
  reply(tamtokopedia);
  break;
}

case "deposit":
let tamdepo = `「 *METHODE DEPOSIT* 」

: ̗̀➛ *manual*
_*Ketik : manual 1000*_
- _Offline Pukul 22.00 - 06.00 WIB_
- _Tidak Ada Biaya Admin_
- _Transfer Di Jam Offline Akan DiProses Ketika Online_

: ̗̀➛ *otomatis*
_*Ketik : otomatis 1000*_
- _Otomatis 24 jam_
- _Ada Biaya Admin_
- _Saldo Langsung Masuk_
`;
reply(tamdepo);
break;

case 'topuppulsa': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST PULSA ALL* 》
┃ *○* ${prefix}telkomsel
┃ *○* ${prefix}indosat
┃ *○* ${prefix}smartfren
┃ *○* ${prefix}axis
┃ *○* ${prefix}xl
┃ *○* ${prefix}tri
┃ *○* ${prefix}byu
╚════

_${toko}_
`
reply(tam)
					} 
				break

//=============================== CASE TOPUP PULSA =======================
case 'telkomsel': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST TELKOMSEL* 》
┃ *○* ${prefix}pulsatelkomsel
┃ *○* ${prefix}pulsatelkomseltf
┃ *○* ${prefix}datatelkomsel
┃ *○* ${prefix}vouchertelkomsel
┃ *○* ${prefix}tlpsmstelkomsel
┃ *○* ${prefix}telkomselmasaaktif
╚════

_${toko}_
`
reply(tam)
					} 
				break

case 'indosat': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST INDOSAT* 》
┃ *○* ${prefix}pulsaindosat
┃ *○* ${prefix}pulsaindosattf
┃ *○* ${prefix}dataindosat
┃ *○* ${prefix}voucherindosat
┃ *○* ${prefix}tlpsmsindosat
┃ *○* ${prefix}indosatmasaaktif
╚════

_${toko}_
`
reply(tam)
					} 
				break

case 'axis': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST AXIS* 》
┃ *○* ${prefix}pulsaaxis
┃ *○* ${prefix}pulsaaxistf
┃ *○* ${prefix}dataaxis
┃ *○* ${prefix}voucheraxis
┃ *○* ${prefix}tlpsmsaxis
┃ *○* ${prefix}axismasaaktif
╚════

_${toko}_
`
reply(tam)
					} 
				break

case 'xl': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST XL* 》
┃ *○* ${prefix}pulsaxl
┃ *○* ${prefix}pulsaxltf
┃ *○* ${prefix}dataxl
┃ *○* ${prefix}voucherxl
┃ *○* ${prefix}tlpsmsxl
┃ *○* ${prefix}xlmasaaktif
╚════

_${toko}_
`
reply(tam)
					} 
				break

case 'tri': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST TRI* 》
┃ *○* ${prefix}pulsatri
┃ *○* ${prefix}pulsatritf
┃ *○* ${prefix}datatri
┃ *○* ${prefix}vouchertri
┃ *○* ${prefix}tlpsmstri
┃ *○* ${prefix}trimasaaktif
╚════

_${toko}_
`
reply(tam)
					} 
				break

case 'smartfren': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST SMARTFREN* 》
┃ *○* ${prefix}pulsasmartfren
┃ *○* ${prefix}pulsasmartfrentf
┃ *○* ${prefix}datasmartfren
┃ *○* ${prefix}vouchersmartfren
┃ *○* ${prefix}tlpsmssmartfren
┃ *○* ${prefix}smartfrenmasaaktif
╚════

_${toko}_
`
reply(tam)
					} 
				break

case 'byu': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST BYU* 》
┃ *○* ${prefix}pulsabyu
┃ *○* ${prefix}pulsabyutf
┃ *○* ${prefix}databyu
┃ *○* ${prefix}voucherbyu
┃ *○* ${prefix}tlpsmsbyu
┃ *○* ${prefix}byumasaaktif
╚════

_${toko}_
`
reply(tam)
					} 
				break

//========================================== CASE TOPUP GAME =====================
case 'topupgame': { 
  if (cek("id", m.sender) == null) return daftar()
  let tam = `◥ TOPUP ${namabot} ◤

╔══《 *LIST TOPUP GAME* 》
┃ *○* ${prefix}freefire
┃ *○* ${prefix}membershipff
┃ *○* ${prefix}mobilelegends
┃ *○* ${prefix}membershipml
┃ *○* ${prefix}pointblank
┃ *○* ${prefix}pubgmobile
┃ *○* ${prefix}callofdutymobile
┃ *○* ${prefix}lordsmobile
┃ *○* ${prefix}speeddrifters
┃ *○* ${prefix}hago
┃ *○* ${prefix}valorant
┃ *○* ${prefix}sausageman
┃ *○* ${prefix}lostsaga
┃ *○* ${prefix}genshinimpact
┃ *○* ${prefix}8ballpool
┃ *○* ${prefix}leagueoflegendwildrift
┃ *○* ${prefix}amongus
┃ *○* ${prefix}clashofclans
┃ *○* ${prefix}supersus
┃ *○* ${prefix}stumbleguys
┃ *○* ${prefix}honkaiimpact3
┃ *○* ${prefix}ragnarokorigin
┃ *○* ${prefix}lita
┃ *○* ${prefix}honkaistarrail
┃ *○* ${prefix}likee
┃ *○* ${prefix}clashroyale
┃ *○* ${prefix}sealmsea
┃ *○* ${prefix}topeleven
┃ *○* ${prefix}undawn
┃ *○* ${prefix}metalslugawakening
┃ *○* ${prefix}bloodstrike
┃ *○* ${prefix}honorofking
╚════
  
╔══《 CEK NICKNAME 》
┃ *○* ${prefix}ceknickml
┃ *○* ${prefix}ceknickff
┃ *○* ${prefix}ceknickhiggs
┃ *○* ${prefix}ceknicvalorant
╚════
  
_${toko}
  `
    reply(tam)
            } 
          break
    
// ============================== TV DIGITAL ==================================

case 'topuptv': { 
  if (cek("id", m.sender) == null) return daftar()
  let tamtv = `◥ TV DIGITAL ◤

╔══《 *LIST TV DIGITAL* 》
┃ *○* ${prefix}nexparabola
┃ *○* ${prefix}kvisiongol
┃ *○* ${prefix}decodergol
┃ *○* ${prefix}transvision
┃ *○* ${prefix}matrix
┃ *○* ${prefix}kawankvision
┃ *○* ${prefix}jawaravision
┃ *○* ${prefix}tanakavoucher
╚════
  
_${toko}
  `
    reply(tamtv)
            } 
          break

// ============================== TV DIGITAL ==================================

case 'transvision': { 
  if (cek("id", m.sender) == null) return daftar()
  let tamtrv = `◥ TRANSVISION ◤

╔══《 *LIST TRANSVISION* 》
┃ *○* ${prefix}samsunghd
┃ *○* ${prefix}tanakahd
┃ *○* ${prefix}samsungsd
╚════
  
_${toko}
  `
    reply(tamtrv)
            } 
          break

//========================================== CASE VOUCHER DIGITAL =====================
case 'voucherdigital': { 
  if (cek("id", m.sender) == null) return daftar()
  let tam = `◥ TOPUP ${namabot} ◤
  
╔══《 *LIST VOUCHER* 》
┃ *○* ${prefix}voucherrazergold
┃ *○* ${prefix}voucherwifiid
┃ *○* ${prefix}voucherpointblank
┃ *○* ${prefix}voucherunipin
┃ *○* ${prefix}vouchernintendoeshop
┃ *○* ${prefix}voucherxbox
╚════
 
  _${toko}
  `
    reply(tam)
            } 
          break

//========================================== CASE VOUCHER DIGITAL =====================
case 'topupemoney': { 
  if (cek("id", m.sender) == null) return daftar()
  let tam = `◥ TOPUP ${namabot} ◤
  
╔══《 *LIST E-Money* 》
┃ *○* ${prefix}gopaycus
┃ *○* ${prefix}gopaydriv
┃ *○* ${prefix}mandirietoll
┃ *○* ${prefix}ovo
┃ *○* ${prefix}grabcus
┃ *○* ${prefix}grabdriv
┃ *○* ${prefix}dana
┃ *○* ${prefix}tixid
┃ *○* ${prefix}linkaja
┃ *○* ${prefix}tapcashbni
┃ *○* ${prefix}shopeepay
┃ *○* ${prefix}brizzi
┃ *○* ${prefix}mitrashopee
┃ *○* ${prefix}isaku
┃ *○* ${prefix}maximcus
┃ *○* ${prefix}maximdriv
┃ *○* ${prefix}sakuku
╚════

╔══《 *CEK NICKNAME* 》
┃ *○* ${prefix}cekewallet
┃ *○* ${prefix}cekrekening
╚════
 
  _${toko}
  `
    reply(tam)
            } 
          break

//========================================== CASE VOUCHER DIGITAL =====================
case 'topuptokenpln': { 
  if (cek("id", m.sender) == null) return daftar()
  let tam = `◥ TOPUP ${namabot} ◤
  
╔══《 *LIST TOKEN PLN* 》
┃ *○* ${prefix}tokenpln
╚════

╔══《 *CEK NICKNAME* 》
┃ *○* ${prefix}cekidpln
╚════
 
  _${toko}
  `
    reply(tam)
            } 
          break			
				
          case 'saldoarie': {
   
            if (m.isGroup) return m.reply('Fitur Khusus Private Chat')
            if (!isOwner) return m.reply("Fitur khusus owner!")
            const crypto = require("crypto")
            const axios = require("axios")
            
              var config = {
                method: 'POST',  // Set the HTTP method to POST
                url: 'https://ariepulsa.com/api/profile',  // Set the target URL
                data: new URLSearchParams(Object.entries({
                  api_key: ariekey,
                  action: 'profile',
                  })),
              };
            
            axios(config)
              .then(function (response) {
                if (response.data.status == true) {
                m.reply(`*「 AKUN ARIE PULSA 」*\n\n› STATUS ARIE PULSA : *TERHUBUNG*\n› USER SERVER  : *${formatmoney(response.data.data.username)}*\n› SALDO SERVER : *Rp. ${response.data.data.sisa_saldo}*\n› POIN SERVER  : *${response.data.data.poin}*\n`)
            
              } if (response.data.status == false) {
              m.reply(`*「 AKUN ARIE PULSA 」*\n\n› STATUS ARIE PULSA : *TERPUTUS*\n› PESAN : *${response.data.data.pesan}*\n`)
            }
              })
            }
            break

case 'saldopay': {
  if (!isOwner) return m.reply("Fitur khusus owner!")
   let third = 'Profile';
   let hash = crypto.createHash('md5')
   .update(keypaydis + third)
   .digest('hex');
  
    var config = {
      method: 'POST',  // Set the HTTP method to POST
      url: 'https://paydisini.co.id/api/',  // Set the target URL
      data: new URLSearchParams(Object.entries({
        key: keypaydis,
        request: 'profile',
        signature: hash,
        })),
    };
  
  axios(config)
    .then(function (response) {
      if (response.data.success == true) {
      m.reply(`*「 AKUN PAYDISINI 」*\n\n› STATUS PAYDISINI : *TERHUBUNG*\n› USER SERVER  : *${response.data.data.full_name}*\n› SALDO ANDA : *Rp ${response.data.data.saldo}*\n› SALDO DITAHAN  : *Rp ${response.data.data.saldo_tertahan}*\n`)
  
    } if (response.data.success == false) {
    m.reply(`*「 AKUN PAYDISINI 」*\n\n› STATUS PAYSDISINI : *TERPUTUS*\n› PESAN : *${response.data.msg}*\n`)
  }
    })
  }
  break

case 'adminmenu':
   
if (!isOwner) return m.reply("Fitur khusus owner!")		
let tam =`
╭──❍
├ › saldoarie
├ › saldopay
├ › gettopup
├ › getsosmed
├ › setlevel
├ › updatelevel
├ › listmember
├ › cekmember 628xxx
├ › rekap
├ › riwayat
├ › topuser
├ › toplayanan
├ › resetlayanan
├ › resetdepo 628xxx
├ › resettrx 628xxx
├ › getip
├ › addsaldo
├ › minsaldo
├ › tambahsaldo
├ › block 628xx
├ › unblock 628xx
├ › listblock
├ › tambah
├ › kurang
├ › kali
├ › bagi
╰──❍
  `
reply(tam)
break

case 'resettrx': {
  if (!isOwner) return reply(mess.owner); // Cek apakah pengguna adalah owner
  if (!text) return reply(`*Contoh :*\n${prefix}resettrx 62xx`); // Perbaikan pesan contoh
  
  // Ambil ID dari teks input
  let id = text.trim(); // Menggunakan trim untuk menghapus spasi di sekitar input
  let userId = `${id}@s.whatsapp.net`; // Format ID pengguna

  // Balasan sukses
//  reply(`Sukses mereset data member ${id}`);

  // Reset status dan informasi pengguna
  let fieldsToReset = [
      "status_topup", "status_sosmed",
      "price", "product_name", "tujuan", "desc", "reff",
      "tanggal_trx", "buyer_sku_code"
  ];

  fieldsToReset.forEach(field => sett(field, userId, 
      field === "status_topup" || field === "status_sosmed" ? true : 
      (field === "price" ? 0 : "")
  ));

  // Tambahan balasan jika diperlukan untuk debugging
  reply(`Member ${userId} telah direset.`);
}
break;

case 'resetdepo': {
  if (!isOwner) return reply(mess.owner); // Cek apakah pengguna adalah owner
  if (!text) return reply(`*Contoh :*\n${prefix}resetdepo 62xx`); // Perbaikan pesan contoh
  
  // Ambil ID dari teks input
  let id = text.trim(); // Menggunakan trim untuk menghapus spasi di sekitar input
  let userId = `${id}@s.whatsapp.net`; // Format ID pengguna

  // Balasan sukses
//  reply(`Sukses mereset data member ${id}`);

  // Reset status dan informasi pengguna
  let fieldsToResetDep = [
      "status_deposit", "status_deposit_otomatis", "deposit", "reff_deposit",
      "tanggal_deposit", "fee_owner"
  ];

  fieldsToResetDep.forEach(field => sett(field, userId, 
      field === "status_deposit" || field === "status_deposit_otomatis" ? true : 
      (field === "fee_owner" ? 0 : "")
  ));

  // Tambahan balasan jika diperlukan untuk debugging
  reply(`Member ${userId} telah direset.`);
}
break;

case 'updatelevel': {
  if (!isOwner) return reply(mess.owner);

  // Load user data dari user.json
  let userData = fs.readFileSync('./Pengaturan/database/user.json');
  let users = JSON.parse(userData);

  // Iterate over all users and update level and price
  users.forEach(user => {
    switch (user.level) {
      case 'member':
        user.upharga = prmember;
        break;
      case 'gold':
        user.upharga = prgold;
        break;
      case 'platinum':
        user.upharga = prplatinum;
        break;
      case 'partner':
        user.upharga = prpartner;
        break;
      default:
        m.reply(`Tidak Ada Level Tersedia Untuk User ID: ${user.id}\nLevel Tersedia : *member, gold, platinum, partner*`);
        return;
    }
  });

  // Save updated user data back to user.json
  fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(users, null, 2));

  m.reply(`Semua Level dan Upharga Member Telah Diperbarui.`);
  break;
}

case 'listmember': {
  if (m.isGroup) return m.reply(mess.private);
  if (!isOwner) return m.reply(mess.owner);
  let listmemb = JSON.parse(fs.readFileSync('./Pengaturan/database/user.json'));
  listmemb.sort((a, b) => b.saldo - a.saldo);
  let listmember1 = "*[ LIST MEMBER ]*\n";
  listmemb.forEach(function (product) {
    listmember1 += `
UID : ${product.id}\nSaldo: ${formatmoney(product.saldo)}\nLevel: ${product.level}\n\n`;
  });

  // Calculate total members
  let totalMembers = listmemb.length;
  reply(`Total Member : ${totalMembers}\n\n${listmember1}`);
}
break;

case 'cekmember':{
  if (m.isGroup) return m.reply(mess.private)	
if (!isOwner) return m.reply(mess.owner)	
let membercek = q.split(" ")[0]
if (!membercek) return reply(`*Masukan ID member*\n*Contoh:* ${prefix}cekmember 62811xxxxxx`)	
let listmemba = JSON.parse(fs.readFileSync('./Pengaturan/database/user.json'));
let listmemsatuan = "*[ DETAIL MEMBER ]*\n";
listmemba.forEach(function(product) {
if (product.id === membercek +"@s.whatsapp.net") {
 listmemsatuan += `
*UID :* ${membercek}\n*Saldo :* ${formatmoney(product.saldo)}\n*Level :* ${product.level}`;
}
});

reply(`${listmemsatuan}`)
}
break

case 'topupgame': {
           
				if (cek("id", m.sender) == null) return reply(`belum terdaftar di database silahkan ketik #daftar`) 
let tam = `◥ ▬▬▬ TOPUP ${toko} ▬▬▬ ◤❢

     
╔══《 𝗧𝗢𝗣𝗨𝗣 𝗚𝗔𝗠𝗘 》
┃ *○* ${prefix}freefire
┃ *○* ${prefix}Genshin
┃ *○* ${prefix}mobilelegends
┃ *○* ${prefix}Pubg
┃ *○* ${prefix}bossdomino
┃ *○* ${prefix}ponitblank
┃ *○* ${prefix}sausageman
┃ *○* ${prefix}valorant
┃ *○* ${prefix}cod
╚════

╔══《 CEK NICKNAME 》
┃ *○* ${prefix}ceknickml
┃ *○* ${prefix}ceknickff
┃ *○* ${prefix}ceknickhiggs
┃ *○* ${prefix}ceknicvalorant
╚════

_${toko}
`
	reply(tam)
					} 
				break				


        
case 'canceltopup': {
  if (cek("status_topup", m.sender) == true) {
    return reply(`Tidak ada pesanan topup sebelumnya, silahkan melakukan pembelian produk kembali.`);
  }
  if (cek("status_sosmed", m.sender) == false) {
    return reply(`Perintah ini bukan untuk orderan topup. Silahkan ketik : *cancelsosmed* untuk membatalkan orderan sosmed.`);
  }

  let harga = cek("price", m.sender);
  if (!harga || harga === 0) {
    return reply(`Tidak ada harga yang ditemukan untuk pembatalan. Pastikan ada pesanan topup yang valid.`);
  }

  sett("+saldo", m.sender, parseFloat(harga)); // Mengembalikan saldo pengguna
  sett("status_topup", m.sender, true);
  sett("product_name", m.sender, "");
  sett("price", m.sender, 0);
  sett("tujuan", m.sender, "");  
  sett("desc", m.sender, "");  
  sett("reff", m.sender, ""); 
  sett("buyer_sku_code", m.sender, "");  

  let echa = `🗯️ SUKSES MEMBATALKAN PESANAN TOPUP`;
  m.reply(echa);
  break;
}

case 'cancelsosmed': {
  if (cek("status_sosmed", m.sender) == true) {
    return reply(`Tidak ada pesanan sosmed sebelumnya, silahkan melakukan pembelian produk kembali.`);
  }
  if (cek("status_topup", m.sender) == false) {
    return reply(`Perintah ini bukan untuk orderan sosmed. Silahkan ketik : *canceltopup* untuk membatalkan orderan topup.`);
  }

  let harga = cek("price", m.sender);
  if (!harga || harga === 0) {
    return reply(`Tidak ada harga yang ditemukan untuk pembatalan. Pastikan ada pesanan topup yang valid.`);
  }

  sett("+saldo", m.sender, parseFloat(harga)); // Mengembalikan saldo pengguna
  sett("status_sosmed", m.sender, true);
  sett("product_name", m.sender, "");
  sett("price", m.sender, 0);
  sett("tujuan", m.sender, "");  
  sett("desc", m.sender, "");  
  sett("reff", m.sender, ""); 
  sett("buyer_sku_code", m.sender, "");  

  let echa = `🗯️ SUKSES MEMBATALKAN PESANAN SOSMED`;
  m.reply(echa);
  break;
}

 //GET LAYANAN ARIE PULSA
 case "gettopup": {
  if (!isOwner) return reply(`khusus owner`);

  var config = {
    method: "POST", // Set the HTTP method to POST
    url: "https://ariepulsa.com/api/pulsa-botwa", // Set the target URL
    data: new URLSearchParams(Object.entries({
      api_key: ariekey,
      action: 'layanan',
    })),
  };

  axios(config)
    .then(function (response) {
      if (response.data.status === false) {
        reply(`pesan: ${response.data.data.pesan}`);
        return;
      }

      let data = JSON.stringify(response.data.data);

      // Simpan data ke file
      fs.writeFileSync("./Pengaturan/database/dataariepulsa.json", data);
      reply(`Berhasil Get Layanan Topup`);
    })
    .catch((error) => {
      console.log("Gagal", error);
      reply(`GAGAL Get Layanan Topup`);
    });
  break;
}

case "getsosmed": {
  if (!isOwner) return reply(`khusus owner`);

  var config = {
    method: "POST", // Set the HTTP method to POST
    url: "https://ariepulsa.com/api/sosial-media", // Set the target URL
    data: new URLSearchParams(Object.entries({
      api_key: ariekey,
      action: 'layanan',
    })),
  };

  axios(config)
    .then(function (response) {
      if (response.data.status === false) {
        reply(`pesan: ${response.data.data.pesan}`);
        return;
      }

      let data = JSON.stringify(response.data.data);

      // Simpan data ke file
      fs.writeFileSync("./Pengaturan/database/dataariesosmed.json", data);
      reply(`Berhasil Get Layanan Sosmed`);
    })
    .catch((error) => {
      console.log("Gagal", error);
      reply(`GAGAL Get Layanan Sosmed`);
    });
  break;
}

case 'getip':{
   
if(!isOwner) return m.reply(mess.owner)
let anu = await fetch(`https://api.myip.com`)
let res = await anu.json()
let Fardan = `*📮INFO SERVER*

*IP :* ${res.ip}
*Country :* ${res.country}

*_jangan menyebarkan ip diatas ke sembarang orang!!_*`
m.reply(Fardan)
}
break

//====================================== CASE PULSA ================
case 'pulsatelkomsel': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST PULSA TELKOMSEL* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Pulsa" && product.brand === "TELKOMSEL" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

  
case 'pulsatelkomseltf': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST TRANSFER TELKOMSEL* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Pulsa" && product.brand === "TELKOMSEL" && product.type === "Pulsa Transfer") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'pulsaindosat': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST PULSA INDOSAT* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Pulsa" && product.brand === "INDOSAT" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}
  
case 'pulsaindosattf': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST TRANSFER INDOSAT* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Pulsa" && product.brand === "INDOSAT" && product.type === "Pulsa Transfer") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'pulsaxl': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST PULSA XL* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Pulsa" && product.brand === "XL" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'pulsaxltf': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST TRANSFER XL* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Pulsa" && product.brand === "XL" && product.type === "Pulsa Transfer") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}
  
case 'pulsaaxis': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST PULSA AXIS* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Pulsa" && product.brand === "AXIS" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'pulsaaxistf': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST TRANSFER AXIS* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Pulsa" && product.brand === "AXIS" && product.type === "Pulsa Transfer") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}
  
case 'pulsasmartfren': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST PULSA SMARTFREN* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Pulsa" && product.brand === "SMARTFREN" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'pulsasmartfrentf': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST TRANSFER SMARTFREN* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Pulsa" && product.brand === "SMARTFREN" && product.type === "Pulsa Transfer") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}
  
case 'pulsabyu': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST PULSA BYU* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Pulsa" && product.brand === "by.U" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'pulsabyutf': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST TRANSFER BYU* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Pulsa" && product.brand === "by.U" && product.type === "Pulsa Transfer") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}
  
case 'pulsatri': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST PULSA TRI* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Pulsa" && product.brand === "TRI" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'pulsatritf': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST TRANSFER TRI* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Pulsa" && product.brand === "TRI" && product.type === "Pulsa Transfer") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

  //==============================CASE PAKET=======================================================
  case 'datatelkomsel': {
    const fs = require('fs');
    let data10;
    try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }
  
    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }
  
    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
    let listProduct10 = "「 *LIST DATA TELKOMSEL* 」\n";
  
    data10.forEach(function (product) {
      if (product.category === "Data" && product.brand === "TELKOMSEL") {
        let harga = parseFloat(product.price);
        let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
        let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
        listProduct10 += `=> ${product.product_name}\n`;
        listProduct10 += `=> Level: ${lev}\n`;
        listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
        listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
        listProduct10 += `=> Status : ${statusIcon}\n`;
        listProduct10 += `=> Kategori : ${product.category}\n`;
        listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
    });
  
    reply(listProduct10);
    break;
  }
  
  case 'dataxl': {
    const fs = require('fs');
    let data10;
    try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }
  
    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }
  
    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
    let listProduct10 = "「 *LIST DATA XL* 」\n";
  
    data10.forEach(function (product) {
      if (product.category === "Data" && product.brand === "XL") {
        let harga = parseFloat(product.price);
        let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
        let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
        listProduct10 += `=> ${product.product_name}\n`;
        listProduct10 += `=> Level: ${lev}\n`;
        listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
        listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
        listProduct10 += `=> Status : ${statusIcon}\n`;
        listProduct10 += `=> Kategori : ${product.category}\n`;
        listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
    });
  
    reply(listProduct10);
    break;
  }  
  
  case 'dataindosat': {
    const fs = require('fs');
    let data10;
    try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }
  
    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }
  
    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
    let listProduct10 = "「 *LIST DATA INDOSAT* 」\n";
  
    data10.forEach(function (product) {
      if (product.category === "Data" && product.brand === "INDOSAT") {
        let harga = parseFloat(product.price);
        let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
        let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
        listProduct10 += `=> ${product.product_name}\n`;
        listProduct10 += `=> Level: ${lev}\n`;
        listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
        listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
        listProduct10 += `=> Status : ${statusIcon}\n`;
        listProduct10 += `=> Kategori : ${product.category}\n`;
        listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
    });
  
    reply(listProduct10);
    break;
  }
  
  case 'dataaxis': {
    const fs = require('fs');
    let data10;
    try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }
  
    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }
  
    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
    let listProduct10 = "「 *LIST DATA AXIS* 」\n";
  
    data10.forEach(function (product) {
      if (product.category === "Data" && product.brand === "AXIS") {
        let harga = parseFloat(product.price);
        let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
        let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
        listProduct10 += `=> ${product.product_name}\n`;
        listProduct10 += `=> Level: ${lev}\n`;
        listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
        listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
        listProduct10 += `=> Status : ${statusIcon}\n`;
        listProduct10 += `=> Kategori : ${product.category}\n`;
        listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
    });
  
    reply(listProduct10);
    break;
  }
  
  
  case 'datasmartfren': {
    const fs = require('fs');
    let data10;
    try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }
  
    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }
  
    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
    let listProduct10 = "「 *LIST DATA SMARTFREN* 」\n";
  
    data10.forEach(function (product) {
      if (product.category === "Data" && product.brand === "SMARTFREN") {
        let harga = parseFloat(product.price);
        let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
        let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
        listProduct10 += `=> ${product.product_name}\n`;
        listProduct10 += `=> Level: ${lev}\n`;
        listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
        listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
        listProduct10 += `=> Status : ${statusIcon}\n`;
        listProduct10 += `=> Kategori : ${product.category}\n`;
        listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
    });
  
    reply(listProduct10);
    break;
  }
  
  case 'databyu': {
    const fs = require('fs');
    let data10;
    try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }
  
    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }
  
    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
    let listProduct10 = "「 *LIST DATA BYU* 」\n";
  
    data10.forEach(function (product) {
      if (product.category === "Data" && product.brand === "by.U") {
        let harga = parseFloat(product.price);
        let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
        let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
        listProduct10 += `=> ${product.product_name}\n`;
        listProduct10 += `=> Level: ${lev}\n`;
        listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
        listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
        listProduct10 += `=> Status : ${statusIcon}\n`;
        listProduct10 += `=> Kategori : ${product.category}\n`;
        listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
    });
  
    reply(listProduct10);
    break;
  }

//=============================================== CASE TV ================================
case 'nexparabola': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST NEX PRABOLA* 」\n";

  data10.forEach(function (product) {
    if (product.category === "TV" && product.brand === "Nex Parabola" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'kvisiongol': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST K-VISION & GOL* 」\n";

  data10.forEach(function (product) {
    if (product.category === "TV" && product.brand === "K-VISION dan GOL" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'decodergol': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST DECODER GOL* 」\n";

  data10.forEach(function (product) {
    if (product.category === "TV" && product.brand === "Decoder GOL" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'matrixgaruda': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST MATRIX GARUDA* 」\n";

  data10.forEach(function (product) {
    if (product.category === "TV" && product.brand === "Matrix Garuda - Sinema - Mola Matrix" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'kawanvision': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST KAWAN KVISION* 」\n";

  data10.forEach(function (product) {
    if (product.category === "TV" && product.brand === "Kawan Kvision" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'jawaravision': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST JAWARA VISION* 」\n";

  data10.forEach(function (product) {
    if (product.category === "TV" && product.brand === "Jawara Vision" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'tanakavoucher': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST TANAKA VOUCHER* 」\n";

  data10.forEach(function (product) {
    if (product.category === "TV" && product.brand === "Tanaka Voucher" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'samsunghd': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST SAMSUNG HD* 」\n";

  data10.forEach(function (product) {
    if (product.category === "TV" && product.brand === "Transvision" && product.type === "Samsung HD") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'tanakahd': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST TANAKA HD* 」\n";

  data10.forEach(function (product) {
    if (product.category === "TV" && product.brand === "Transvision" && product.type === "Tanaka HD") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'samsungsd': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST SAMSUNG SD* 」\n";

  data10.forEach(function (product) {
    if (product.category === "TV" && product.brand === "Transvision" && product.type === "Samsung SD") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

  
//=============================================== CASE GAME ================================
  case 'garena': {
    const fs = require('fs');
    let data10;
    try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }
  
    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }
  
    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
    let listProduct10 = "「 *LIST GARENA* 」\n";
  
    data10.forEach(function (product) {
      if (product.category === "Games" && product.brand === "GARENA" && product.type === "Umum") {
        let harga = parseFloat(product.price);
        let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
        let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
        listProduct10 += `=> ${product.product_name}\n`;
        listProduct10 += `=> Level: ${lev}\n`;
        listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
        listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
        listProduct10 += `=> Status : ${statusIcon}\n`;
        listProduct10 += `=> Kategori : ${product.category}\n`;
        listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
    });
  
    reply(listProduct10);
    break;
  }
  
  case 'diamondml': case 'ml': case 'dmml': case 'diamondmobilelegends': case 'dmmobilelegends': case 'mobilelegends': case 'mobilelegend': {
    const fs = require('fs');
    let data10;
    try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }
  
    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }
  
    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
    let listProduct10 = "「 *LIST DIAMOND MOBILE LEGENDS* 」\n";
  
    data10.forEach(function (product) {
      if (product.category === "Games" && product.brand === "MOBILE LEGENDS" && product.type === "Umum") {
        let harga = parseFloat(product.price);
        let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
        let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
        listProduct10 += `=> ${product.product_name}\n`;
        listProduct10 += `=> Level: ${lev}\n`;
        listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
        listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
        listProduct10 += `=> Status : ${statusIcon}\n`;
        listProduct10 += `=> Kategori : ${product.category}\n`;
        listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
    });
  
    reply(listProduct10);
    break;
  }  
  
case 'membershipml':
case 'memberml':
case 'membershipmobilelegends': {
    const fs = require('fs');
    let data10;
    try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProduct10 = "「 *LIST MEMBERSHIP MOBILE LEGENDS* 」\n";

    data10.forEach(function (product) {
        if (product.category === "Games" && product.brand === "MOBILE LEGENDS" && product.type === "Membership") {
            let harga = parseFloat(product.price);
            let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
            let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

            listProduct10 += `=> ${product.product_name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
            listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
            listProduct10 += `=> Status : ${statusIcon}\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
    });

    reply(listProduct10);
    break;
}

case 'honorofking':
  case 'honorofkings':
  case 'hok': {
    const fs = require('fs');
    let dataGames;

    try {
      dataGames = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    dataGames.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProductHOK = "「 *LIST PRODUK HONOR OF KINGS* 」\n";

    dataGames.forEach(function (product) {
      if (product.category === "Games" && product.brand === "Honor of Kings" && product.type === "Umum") {
        let harga = parseFloat(product.price);
        let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
        let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

        listProductHOK += `=> ${product.product_name}\n`;
        listProductHOK += `=> Level: ${lev}\n`;
        listProductHOK += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
        listProductHOK += `=> *Kode : ${product.buyer_sku_code}*\n`;
        listProductHOK += `=> Status : ${statusIcon}\n`;
        listProductHOK += `=> Kategori : ${product.category}\n`;
        listProductHOK += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
    });

    reply(listProductHOK);
    break;
  }

case 'diamondff':
case 'dmff':
case 'diamondfreefire':
case 'dmfreefire':
case 'freefire':
case 'ff': {
    const fs = require('fs');
    let data10;
    try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProduct10 = "「 *LIST DIAMOND FREE FIRE* 」\n";

    data10.forEach(function (product) {
        if (product.category === "Games" && product.brand === "FREE FIRE" && product.type === "Umum") {
            let harga = parseFloat(product.price);
            let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
            let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

            listProduct10 += `=> ${product.product_name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
            listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
            listProduct10 += `=> Status : ${statusIcon}\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
    });

    reply(listProduct10);
    break;
}
  
case 'membershipff':
  case 'memberff':
  case 'membershipfreefire': {
      const fs = require('fs');
      let data10;
      try {
          data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
      } catch (error) {
          console.error('Gagal membaca file:', error);
          return reply('Gagal membaca data. Silakan coba lagi nanti.');
      }
  
      let uphar = parseFloat(cek("upharga", m.sender)) / 100;
      if (isNaN(uphar)) {
          console.error('Nilai uphar tidak valid:', uphar);
          return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
      }
  
      let lev = `${cek("level", m.sender)}`;
      data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
      let listProduct10 = "「 *LIST MEMBERSHIP FREE FIRE* 」\n";
  
      data10.forEach(function (product) {
          if (product.category === "Games" && product.brand === "FREE FIRE" && product.type === "Membership") {
              let harga = parseFloat(product.price);
              let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
              let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
              listProduct10 += `=> ${product.product_name}\n`;
              listProduct10 += `=> Level: ${lev}\n`;
              listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
              listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
              listProduct10 += `=> Status : ${statusIcon}\n`;
              listProduct10 += `=> Kategori : ${product.category}\n`;
              listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
          }
      });
  
      reply(listProduct10);
      break;
  }
  
  case 'pointblank':
  case 'cashpb':
  case 'cashpointblank': {
      const fs = require('fs');
      let data10;
      try {
          data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
      } catch (error) {
          console.error('Gagal membaca file:', error);
          return reply('Gagal membaca data. Silakan coba lagi nanti.');
      }
  
      let uphar = parseFloat(cek("upharga", m.sender)) / 100;
      if (isNaN(uphar)) {
          console.error('Nilai uphar tidak valid:', uphar);
          return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
      }
  
      let lev = `${cek("level", m.sender)}`;
      data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
      let listProduct10 = "「 *LIST CASH POINT BLANK* 」\n";
  
      data10.forEach(function (product) {
          if (product.category === "Games" && product.brand === "POINT BLANK" && product.type === "Umum") {
              let harga = parseFloat(product.price);
              let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
              let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
              listProduct10 += `=> ${product.product_name}\n`;
              listProduct10 += `=> Level: ${lev}\n`;
              listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
              listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
              listProduct10 += `=> Status : ${statusIcon}\n`;
              listProduct10 += `=> Kategori : ${product.category}\n`;
              listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
          }
      });
  
      reply(listProduct10);
      break;
  }
  
  case 'aov':
  case 'arenaofvalor': {
      const fs = require('fs');
      let data10;
      try {
          data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
      } catch (error) {
          console.error('Gagal membaca file:', error);
          return reply('Gagal membaca data. Silakan coba lagi nanti.');
      }
  
      let uphar = parseFloat(cek("upharga", m.sender)) / 100;
      if (isNaN(uphar)) {
          console.error('Nilai uphar tidak valid:', uphar);
          return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
      }
  
      let lev = `${cek("level", m.sender)}`;
      data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
      let listProduct10 = "「 *LIST ARENA OF VALOR* 」\n";
  
      data10.forEach(function (product) {
          if (product.category === "Games" && product.brand === "ARENA OF VALOR" && product.type === "Umum") {
              let harga = parseFloat(product.price);
              let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
              let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
              listProduct10 += `=> ${product.product_name}\n`;
              listProduct10 += `=> Level: ${lev}\n`;
              listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
              listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
              listProduct10 += `=> Status : ${statusIcon}\n`;
              listProduct10 += `=> Kategori : ${product.category}\n`;
              listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
          }
      });
  
      reply(listProduct10);
      break;
  }  
  
  case 'pubgm':
    case 'pubgmobile': {
      const fs = require('fs');
      let data10;
      try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
      } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
      }
    
      let uphar = parseFloat(cek("upharga", m.sender)) / 100;
      if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
      }
    
      let lev = `${cek("level", m.sender)}`;
      data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    
      let listProduct10 = "「 *LIST PUBG MOBILE* 」\n";
    
      data10.forEach(function (product) {
        if (product.category === "Games" && product.brand === "PUBG MOBILE" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
    
          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
      });
    
      reply(listProduct10);
      break;
    }
    
case 'callofdutymobile':
case 'codm': {
  const fs = require('fs');
  let dataGames;

  try {
    dataGames = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataGames.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProductCOD = "「 *LIST PRODUK CALL OF DUTY MOBILE* 」\n";

  dataGames.forEach(function (product) {
    if (product.category === "Games" && product.brand === "Call of Duty MOBILE" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProductCOD += `=> ${product.product_name}\n`;
      listProductCOD += `=> Level: ${lev}\n`;
      listProductCOD += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProductCOD += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProductCOD += `=> Status : ${statusIcon}\n`;
      listProductCOD += `=> Kategori : ${product.category}\n`;
      listProductCOD += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProductCOD);
  break;
}
    
    case 'lm':
    case 'lordmobile':
    case 'lordsmobile': {
      const fs = require('fs');
      let data10;
      try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
      } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
      }
    
      let uphar = parseFloat(cek("upharga", m.sender)) / 100;
      if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
      }
    
      let lev = `${cek("level", m.sender)}`;
      data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    
      let listProduct10 = "「 *LIST LORDS MOBILE* 」\n";
    
      data10.forEach(function (product) {
        if (product.category === "Games" && product.brand === "LORDS MOBILE" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
    
          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
      });
    
      reply(listProduct10);
      break;
    }    
  
    case 'sd':
case 'speeddrifter':
case 'speeddrifters': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST SPEED DRIFTERS* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Games" && product.brand === "Speed Drifters" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'hago': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST HAGO* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Games" && product.brand === "HAGO" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'valorant': {
  const fs = require('fs');
  let dataValorant;

  try {
    dataValorant = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataValorant.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProductValorant = "「 *LIST PRODUK VALORANT* 」\n";

  dataValorant.forEach(function (product) {
    if (product.category === "Games" && product.brand === "Valorant" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProductValorant += `=> ${product.product_name}\n`;
      listProductValorant += `=> Level: ${lev}\n`;
      listProductValorant += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProductValorant += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProductValorant += `=> Status : ${statusIcon}\n`;
      listProductValorant += `=> Kategori : ${product.category}\n`;
      listProductValorant += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProductValorant);
  break;
}


case 'sausage':
case 'sausageman': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST SAUSAGE MAN* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Games" && product.brand === "Sausage Man" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}
  
case 'ls':
  case 'lostsaga': {
    const fs = require('fs');
    let data10;
    try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }
  
    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }
  
    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
    let listProduct10 = "「 *LIST LOST SAGA* 」\n";
  
    data10.forEach(function (product) {
      if (product.category === "Games" && product.brand === "LOST SAGA" && product.type === "Umum") {
        let harga = parseFloat(product.price);
        let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
        let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
        listProduct10 += `=> ${product.product_name}\n`;
        listProduct10 += `=> Level: ${lev}\n`;
        listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
        listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
        listProduct10 += `=> Status : ${statusIcon}\n`;
        listProduct10 += `=> Kategori : ${product.category}\n`;
        listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
    });
  
    reply(listProduct10);
    break;
  }
  
  case 'genshin':
  case 'genshinimpact': {
    const fs = require('fs');
    let data10;
    try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }
  
    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }
  
    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
    let listProduct10 = "「 *LIST GENSHIN IMPACT* 」\n";
  
    data10.forEach(function (product) {
      if (product.category === "Games" && product.brand === "Genshin Impact" && product.type === "Umum") {
        let harga = parseFloat(product.price);
        let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
        let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
        listProduct10 += `=> ${product.product_name}\n`;
        listProduct10 += `=> Level: ${lev}\n`;
        listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
        listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
        listProduct10 += `=> Status : ${statusIcon}\n`;
        listProduct10 += `=> Kategori : ${product.category}\n`;
        listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
    });
  
    reply(listProduct10);
    break;
  }
  
  case '8ballpool': {
    const fs = require('fs');
    let data10;
    try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }
  
    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }
  
    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
    let listProduct10 = "「 *LIST 8 BALL POOL* 」\n";
  
    data10.forEach(function (product) {
      if (product.category === "Games" && product.brand === "8 Ball Pool" && product.type === "Umum") {
        let harga = parseFloat(product.price);
        let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
        let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
        listProduct10 += `=> ${product.product_name}\n`;
        listProduct10 += `=> Level: ${lev}\n`;
        listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
        listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
        listProduct10 += `=> Status : ${statusIcon}\n`;
        listProduct10 += `=> Kategori : ${product.category}\n`;
        listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
    });
  
    reply(listProduct10);
    break;
  }  
  
  case 'lolwr': 
case 'wildrift': 
case 'leagueoflegendwildrift': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST LEAGUE OF LEGENDS WILD RIFT* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Games" && product.brand === "League Of Legends Wild Rift" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'amongus':
case 'among':
case 'au': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST AMONG US* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Games" && product.brand === "Among Us" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'coc':
case 'clashofclan':
case 'clashofclans': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST CLASH OF CLANS* 」\n";

  data10.forEach(function (product) {
    if (product.category === "Games" && product.brand === "Clash Of Clans" && product.type === "Umum") {
      let harga = parseFloat(product.price);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

      listProduct10 += `=> ${product.product_name}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
      listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
      listProduct10 += `=> Status : ${statusIcon}\n`;
      listProduct10 += `=> Kategori : ${product.category}\n`;
      listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

  
case 'supersus': {
  const fs = require('fs');
  let data10;
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST SUPER SUS* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Games" && product.brand === "Super Sus" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'stumble':
case 'stumbleguys': {
  const fs = require('fs');
  let data10;
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST STUMBLE GUYS* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Games" && product.brand === "Stumble Guys" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'honkaiimpact3':
case 'honkaiimpact': {
  const fs = require('fs');
  let data10;
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST HONKAI IMPACT 3* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Games" && product.brand === "Honkai Impact 3" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}
  
case 'ragnarok':
  case 'ragnarokorigin': {
      const fs = require('fs');
      let data10;
      try {
          data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
      } catch (error) {
          console.error('Gagal membaca file:', error);
          return reply('Gagal membaca data. Silakan coba lagi nanti.');
      }
  
      let uphar = parseFloat(cek("upharga", m.sender)) / 100;
      if (isNaN(uphar)) {
          console.error('Nilai uphar tidak valid:', uphar);
          return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
      }
  
      let lev = `${cek("level", m.sender)}`;
      data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
      let listProduct10 = "「 *LIST RAGNAROK ORIGIN* 」\n";
  
      data10.forEach(function (product) {
          if (product.category === "Games" && product.brand === "Ragnarok Origin" && product.type === "Umum") {
              let harga = parseFloat(product.price);
              let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
              let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
              listProduct10 += `=> ${product.product_name}\n`;
              listProduct10 += `=> Level: ${lev}\n`;
              listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
              listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
              listProduct10 += `=> Status : ${statusIcon}\n`;
              listProduct10 += `=> Kategori : ${product.category}\n`;
              listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
          }
      });
  
      reply(listProduct10);
      break;
  }
  
  case 'lita': {
      const fs = require('fs');
      let data10;
      try {
          data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
      } catch (error) {
          console.error('Gagal membaca file:', error);
          return reply('Gagal membaca data. Silakan coba lagi nanti.');
      }
  
      let uphar = parseFloat(cek("upharga", m.sender)) / 100;
      if (isNaN(uphar)) {
          console.error('Nilai uphar tidak valid:', uphar);
          return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
      }
  
      let lev = `${cek("level", m.sender)}`;
      data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
      let listProduct10 = "「 *LIST LITA* 」\n";
  
      data10.forEach(function (product) {
          if (product.category === "Games" && product.brand === "Lita" && product.type === "Umum") {
              let harga = parseFloat(product.price);
              let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
              let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
              listProduct10 += `=> ${product.product_name}\n`;
              listProduct10 += `=> Level: ${lev}\n`;
              listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
              listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
              listProduct10 += `=> Status : ${statusIcon}\n`;
              listProduct10 += `=> Kategori : ${product.category}\n`;
              listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
          }
      });
  
      reply(listProduct10);
      break;
  }
  
  case 'honkaistarrail': {
      const fs = require('fs');
      let data10;
      try {
          data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
      } catch (error) {
          console.error('Gagal membaca file:', error);
          return reply('Gagal membaca data. Silakan coba lagi nanti.');
      }
  
      let uphar = parseFloat(cek("upharga", m.sender)) / 100;
      if (isNaN(uphar)) {
          console.error('Nilai uphar tidak valid:', uphar);
          return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
      }
  
      let lev = `${cek("level", m.sender)}`;
      data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
      let listProduct10 = "「 *LIST HONKAI STAR RAIL* 」\n";
  
      data10.forEach(function (product) {
          if (product.category === "Games" && product.brand === "Honkai Star Rail" && product.type === "Umum") {
              let harga = parseFloat(product.price);
              let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
              let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";
  
              listProduct10 += `=> ${product.product_name}\n`;
              listProduct10 += `=> Level: ${lev}\n`;
              listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
              listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
              listProduct10 += `=> Status : ${statusIcon}\n`;
              listProduct10 += `=> Kategori : ${product.category}\n`;
              listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
          }
      });
  
      reply(listProduct10);
      break;
  }  
  
  case 'likee': {
    const fs = require('fs');
    let data10;
    try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProduct10 = "「 *LIST LIKEE* 」\n";

    data10.forEach(function (product) {
        if (product.category === "Games" && product.brand === "Likee" && product.type === "Umum") {
            let harga = parseFloat(product.price);
            let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
            let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

            listProduct10 += `=> ${product.product_name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
            listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
            listProduct10 += `=> Status : ${statusIcon}\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
    });

    reply(listProduct10);
    break;
}

case 'clashroyal':
case 'clashroyale': {
    const fs = require('fs');
    let data10;
    try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProduct10 = "「 *LIST CLASH ROYALE* 」\n";

    data10.forEach(function (product) {
        if (product.category === "Games" && product.brand === "Clash Royale" && product.type === "Umum") {
            let harga = parseFloat(product.price);
            let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
            let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

            listProduct10 += `=> ${product.product_name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
            listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
            listProduct10 += `=> Status : ${statusIcon}\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
    });

    reply(listProduct10);
    break;
}

case 'sealmsea': {
    const fs = require('fs');
    let data10;
    try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProduct10 = "「 *LIST SEAL M SEA* 」\n";

    data10.forEach(function (product) {
        if (product.category === "Games" && product.brand === "Seal M Sea" && product.type === "Umum") {
            let harga = parseFloat(product.price);
            let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
            let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

            listProduct10 += `=> ${product.product_name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
            listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
            listProduct10 += `=> Status : ${statusIcon}\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
    });

    reply(listProduct10);
    break;
}

  
case 'topeleven': {
  const fs = require('fs');
  let data10;
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST TOP ELEVEN* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Games" && product.brand === "Top Eleven" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'undawn': {
  const fs = require('fs');
  let data10;
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST UNDAWN* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Games" && product.brand === "Undawn" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'metalslugawakening': {
  const fs = require('fs');
  let data10;
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST METAL SLUG AWAKENING* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Games" && product.brand === "Metal Slug Awakening" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

  
case 'bloodstrike': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST BLOOD STRIKE* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Games" && product.brand === "Blood Strike" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

  
  //=============================================== CASE VOUCHER  ================================
  case 'vouchertelkomsel': {
    const fs = require('fs');
    let data10;

    // Baca file dan tangani kesalahan jika ada
    try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProduct10 = "「 *LIST VOUCHER TELKOMSEL* 」\n";

    data10.forEach(function (product) {
        if (product.category === "Voucher" && product.brand === "TELKOMSEL") {
            let harga = parseFloat(product.price);
            let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
            let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

            listProduct10 += `=> ${product.product_name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
            listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
            listProduct10 += `=> Status : ${statusIcon}\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
    });

    reply(listProduct10);
    break;
}

case 'voucherindosat': {
    const fs = require('fs');
    let data10;

    // Baca file dan tangani kesalahan jika ada
    try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProduct10 = "「 *LIST VOUCHER INDOSAT* 」\n";

    data10.forEach(function (product) {
        if (product.category === "Voucher" && product.brand === "INDOSAT") {
            let harga = parseFloat(product.price);
            let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
            let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

            listProduct10 += `=> ${product.product_name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
            listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
            listProduct10 += `=> Status : ${statusIcon}\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
    });

    reply(listProduct10);
    break;
}
  
case 'voucheraxis': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST VOUCHER AXIS* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Voucher" && product.brand === "AXIS") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'voucherxl': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST VOUCHER XL* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Voucher" && product.brand === "XL") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

  
case 'vouchertri': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST VOUCHER TRI* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Voucher" && product.brand === "TRI") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'vouchersmartfren': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST VOUCHER SMARTFREN* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Voucher" && product.brand === "SMARTFREN") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

  
case 'vouchergarena': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST VOUCHER GARENA* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Voucher" && product.brand === "GARENA") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'vouchergpindo': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST VOUCHER GOOGLE PLAY ID* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Voucher" && product.brand === "GOOGLE PLAY INDONESIA") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

  
case 'vouchermegaxus': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST VOUCHER MEGAXUS* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Voucher" && product.brand === "MEGAXUS") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'voucherrazergold': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST VOUCHER RAZER GOLD* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Voucher" && product.brand === "Razer Gold") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

  
case 'voucherwifiid': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST VOUCHER WIFI ID* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Voucher" && product.brand === "WIFI ID") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'voucherpb': case 'voucherpointblank': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST VOUCHER POINT BLANK* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Voucher" && product.brand === "POINT BLANK") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

  
case 'voucherunipin': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST VOUCHER UNIPIN* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Voucher" && product.brand === "Unipin Voucher") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'vouchernintendoeshop': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST VOUCHER NINTENDO E-SHOP* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Voucher" && product.brand === "Nintendo eShop") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'voucherxbox': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST VOUCHER XBOX* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Voucher" && product.brand === "XBOX") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}
  
  //=============================================== CASE E-MONEY ================================
  case 'gopaycus': {
    const fs = require('fs');
    let data10;

    // Baca file dan tangani kesalahan jika ada
    try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProduct10 = "「 *LIST GOPAY CUSTOMER* 」\n";

    data10.forEach(function (product) {
        if (product.category === "E-Money" && product.brand === "GO PAY" && product.type === "Customer") {
            let harga = parseFloat(product.price);
            let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
            let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

            listProduct10 += `=> ${product.product_name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
            listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
            listProduct10 += `=> Status : ${statusIcon}\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
    });

    reply(listProduct10);
    break;
}

case 'gopaydriv': {
    const fs = require('fs');
    let data10;

    // Baca file dan tangani kesalahan jika ada
    try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProduct10 = "「 *LIST GOPAY DRIVER* 」\n";

    data10.forEach(function (product) {
        if (product.category === "E-Money" && product.brand === "GO PAY" && product.type === "Driver") {
            let harga = parseFloat(product.price);
            let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
            let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

            listProduct10 += `=> ${product.product_name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
            listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
            listProduct10 += `=> Status : ${statusIcon}\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
    });

    reply(listProduct10);
    break;
}
  
case 'mandirietoll': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST MANDIRI E-TOLL* 」\n";

  data10.forEach(function (product) {
      if (product.category === "E-Money" && product.brand === "MANDIRI E-TOLL" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'ovo': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST OVO* 」\n";

  data10.forEach(function (product) {
      if (product.category === "E-Money" && product.brand === "OVO" && product.type === "Admin 1000") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}
  
case 'grabcus': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST GRAB CUSTOMER* 」\n";

  data10.forEach(function (product) {
      if (product.category === "E-Money" && product.brand === "GRAB" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'grabdriv': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST GRAB DRIVER* 」\n";

  data10.forEach(function (product) {
      if (product.category === "E-Money" && product.brand === "GRAB" && product.type === "Driver") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

  
case 'dana': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST DANA* 」\n";

  data10.forEach(function (product) {
      if (product.category === "E-Money" && product.brand === "DANA" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'tixid': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST TIX ID* 」\n";

  data10.forEach(function (product) {
      if (product.category === "E-Money" && product.brand === "TIX ID" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

  
case 'linkaja': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST LINK AJA* 」\n";

  data10.forEach(function (product) {
      if (product.category === "E-Money" && product.brand === "LinkAja" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'tapcashbni': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST TAPCASH BNI* 」\n";

  data10.forEach(function (product) {
      if (product.category === "E-Money" && product.brand === "TAPCASH BNI" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

  
case 'shopeepay': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST SHOPEE PAY* 」\n";

  data10.forEach(function (product) {
      if (product.category === "E-Money" && product.brand === "SHOPEE PAY" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'brizzi': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST BRIZZI* 」\n";

  data10.forEach(function (product) {
      if (product.category === "E-Money" && product.brand === "BRI BRIZZI" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

  
case 'mitrashopee': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST MITRA SHOPEE* 」\n";

  data10.forEach(function (product) {
      if (product.category === "E-Money" && product.brand === "Mitra Shopee" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'isaku': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST ISAKU* 」\n";

  data10.forEach(function (product) {
      if (product.category === "E-Money" && product.brand === "i.saku" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

  
case 'maximcus': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST MAXIM CUSTOMER* 」\n";

  data10.forEach(function (product) {
      if (product.category === "E-Money" && product.brand === "MAXIM" && product.type === "Customer") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'maximdriv': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST MAXIM DRIVER* 」\n";

  data10.forEach(function (product) {
      if (product.category === "E-Money" && product.brand === "MAXIM" && product.type === "Driver") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'sakuku': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST SAKUKU* 」\n";

  data10.forEach(function (product) {
      if (product.category === "E-Money" && product.brand === "Sakuku" && product.type === "Umum") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

  //=============================================== TOKEN PLN ================================
  case 'tokenpln': {
    const fs = require('fs');
    let data10;

    // Baca file dan tangani kesalahan jika ada
    try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProduct10 = "「 *LIST TOKEN PLN* 」\n";

    data10.forEach(function (product) {
        if (product.category === "PLN" && product.brand === "PLN" && product.type === "Umum") {
            let harga = parseFloat(product.price);
            let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
            let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

            listProduct10 += `=> ${product.product_name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
            listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
            listProduct10 += `=> Status : ${statusIcon}\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
    });

    reply(listProduct10);
    break;
}
  
  //=============================================== PAKET NELP & SMS================================
  case 'tlpsmstelkomsel': {
    const fs = require('fs');
    let data10;

    // Baca file dan tangani kesalahan jika ada
    try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProduct10 = "「 *LIST TELP & SMS TELKOMSEL* 」\n";

    data10.forEach(function (product) {
        if (product.category === "Paket SMS & Telpon" && product.brand === "TELKOMSEL") {
            let harga = parseFloat(product.price);
            let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
            let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

            listProduct10 += `=> ${product.product_name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
            listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
            listProduct10 += `=> Status : ${statusIcon}\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
    });

    reply(listProduct10);
    break;
}

case 'tlpsmsindosat': {
    const fs = require('fs');
    let data10;

    // Baca file dan tangani kesalahan jika ada
    try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProduct10 = "「 *LIST TELP & SMS INDOSAT* 」\n";

    data10.forEach(function (product) {
        if (product.category === "Paket SMS & Telpon" && product.brand === "INDOSAT") {
            let harga = parseFloat(product.price);
            let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
            let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

            listProduct10 += `=> ${product.product_name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
            listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
            listProduct10 += `=> Status : ${statusIcon}\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
    });

    reply(listProduct10);
    break;
}

case 'tlpsmsaxis': {
    const fs = require('fs');
    let data10;

    // Baca file dan tangani kesalahan jika ada
    try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProduct10 = "「 *LIST TELP & SMS AXIS* 」\n";

    data10.forEach(function (product) {
        if (product.category === "Paket SMS & Telpon" && product.brand === "AXIS") {
            let harga = parseFloat(product.price);
            let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
            let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

            listProduct10 += `=> ${product.product_name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
            listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
            listProduct10 += `=> Status : ${statusIcon}\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
    });

    reply(listProduct10);
    break;
}

  
case 'tlpsmsxl': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST TELP & SMS XL* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Paket SMS & Telpon" && product.brand === "XL") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'tlpsmstri': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST TELP & SMS TRI* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Paket SMS & Telpon" && product.brand === "TRI") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

  
  //=============================================== CASE MASA AKTIF ================================
  
  case 'telkomselmasaaktif': {
    const fs = require('fs');
    let data10;

    // Baca file dan tangani kesalahan jika ada
    try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProduct10 = "「 *LIST MASA AKTIF TELKOMSEL* 」\n";

    data10.forEach(function (product) {
        if (product.category === "Masa Aktif" && product.brand === "TELKOMSEL") {
            let harga = parseFloat(product.price);
            let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
            let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

            listProduct10 += `=> ${product.product_name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
            listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
            listProduct10 += `=> Status : ${statusIcon}\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
    });

    reply(listProduct10);
    break;
}

case 'indosatmasaaktif': {
    const fs = require('fs');
    let data10;

    // Baca file dan tangani kesalahan jika ada
    try {
        data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    } catch (error) {
        console.error('Gagal membaca file:', error);
        return reply('Gagal membaca data. Silakan coba lagi nanti.');
    }

    let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    if (isNaN(uphar)) {
        console.error('Nilai uphar tidak valid:', uphar);
        return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
    }

    let lev = `${cek("level", m.sender)}`;
    data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let listProduct10 = "「 *LIST MASA AKTIF INDOSAT* 」\n";

    data10.forEach(function (product) {
        if (product.category === "Masa Aktif" && product.brand === "INDOSAT") {
            let harga = parseFloat(product.price);
            let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
            let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

            listProduct10 += `=> ${product.product_name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
            listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
            listProduct10 += `=> Status : ${statusIcon}\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
        }
    });

    reply(listProduct10);
    break;
}

  
case 'axismasaaktif': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST MASA AKTIF AXIS* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Masa Aktif" && product.brand === "AXIS") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

case 'trimasaaktif': {
  const fs = require('fs');
  let data10;

  // Baca file dan tangani kesalahan jika ada
  try {
      data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
  } catch (error) {
      console.error('Gagal membaca file:', error);
      return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
      console.error('Nilai uphar tidak valid:', uphar);
      return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  let listProduct10 = "「 *LIST MASA AKTIF TRI* 」\n";

  data10.forEach(function (product) {
      if (product.category === "Masa Aktif" && product.brand === "TRI") {
          let harga = parseFloat(product.price);
          let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
          let statusIcon = product.seller_product_status === "Normal" ? "🟢" : "⛔";

          listProduct10 += `=> ${product.product_name}\n`;
          listProduct10 += `=> Level: ${lev}\n`;
          listProduct10 += `=> Harga: Rp ${formatmoney(hargaFinal)}\n`;
          listProduct10 += `=> *Kode : ${product.buyer_sku_code}*\n`;
          listProduct10 += `=> Status : ${statusIcon}\n`;
          listProduct10 += `=> Kategori : ${product.category}\n`;
          listProduct10 += `=> Ketik : topup ${product.buyer_sku_code}|Tujuan\n\n`;
      }
  });

  reply(listProduct10);
  break;
}

  
  //=============================================== CASE LAINNYA ================================
  
  case 'req': case 'request':{
  if (!text) return reply(`Jika Ada Produk Yang Ingin Ditambahkan
  
  Silahkan ketik :
  .Request NamaProduk
  
  Contoh :
  .Request Min Tolong Tambahin Game Freefire`)
    reply(`Sip, Saran Anda Telah Kami Terima`)
  arie.sendMessage(nomorKu, {text: `Saran: ${text}
  Sender: wa.me/${sender.split("@")[0]}`                                           
  })
  }
  break;

  case 'resetlayanan': {
    if (!isOwner) return reply (mess.owner)
    const filePath = './Pengaturan/database/dataariepulsa.json';
    const filePath2 = './Pengaturan/database/dataariesosmed.json';

    try {
        // Write an empty array to the file
        fs.writeFileSync(filePath, '[]', 'utf8');
        fs.writeFileSync(filePath2, '[]', 'utf8');
        reply("Sip, Berhasil Menghapus Layanan Topup Dan Sosmed");

    } catch (error) {
        console.error('Error resetting data:', error);
        reply('An error occurred while resetting data.');
    }

    break;
}

case 'minsaldo':{
  if(!isOwner) return reply(mess.owner)
  if(!text) return reply(`*Contoh :*\n${prefix}addsaldo 62xx|10000`)
  let saldo = text.split("|")[1] * 1
  let id = text.split("|")[0]
  if(!saldo) throw `Masukan Saldonya!!`
  sett("-saldo", id+"@s.whatsapp.net", saldo)
  m.reply(`Sukses mengurangkan saldo pada akun\n*ID :* ${id}\n*Tag :* @${id}\nJumlah saldo sekarang : *${cek("saldo", id+"@s.whatsapp.net")}*`)
  setTimeout(function(){
  arie.sendMessage(id+"@s.whatsapp.net", {text:`*Hai Kak👋*\n\nSaldo telah dikurangkan ke akun kamu sejumlah : *${formatmoney(saldo)}*\n\nSisa saldo kamu saat ini : *Rp ${cek("saldo", id+"@s.whatsapp.net")}*`}) 
  }, 5000)
  sett("deposit", m.sender, "")
  sett("reff_deposit", m.sender, "")
  sett("status", id+"@s.whatsapp.net", true)
  sett("status_deposit", id+"@s.whatsapp.net", true) 
  sett("tanggal_deposit", m.sender, "")
  }
  break

  case 'tambahsaldo':{
    if(!isOwner) return reply(mess.owner)
    if(!text) return reply(`*Contoh :*\n${prefix}tambahsaldo 62xx|10000`)
    let saldo = text.split("|")[1] * 1
    let id = text.split("|")[0]
    if(!saldo) throw `Masukan Saldonya!!`
    sett("+saldo", id+"@s.whatsapp.net", parseInt(saldo))
    m.reply(`Sukses menambahkan saldo pada akun\n*ID :* ${id}\n*Tag :* @${id}\nJumlah saldo sekarang : *${cek("saldo", id+"@s.whatsapp.net")}*`)
    setTimeout(function(){
    arie.sendMessage(id+"@s.whatsapp.net", {text:`*Hai Kak👋*\n\nSaldo telah ditambahkan ke akun kamu sejumlah : *${formatmoney(saldo)}*\n\nSisa saldo kamu saat ini : *Rp ${cek("saldo", id+"@s.whatsapp.net")}*`}) 
    }, 5000)
    sett("deposit", id+"@s.whatsapp.net", "")
    sett("reff_deposit", id+"@s.whatsapp.net", "")
    sett("status", id+"@s.whatsapp.net", true)
    sett("status_deposit", id+"@s.whatsapp.net", true)
    sett("tanggal_deposit", id+"@s.whatsapp.net", "")
    }
    break

  //================================================================================
case 'tambah':
  if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1+2`)
  var num_one = q.split('+')[0]
  var num_two = q.split('+')[1]
  if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1+2`)
  if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1+2`)
  var nilai_one = Number(num_one)
  var nilai_two = Number(num_two)
  reply(`${nilai_one + nilai_two}`)
  break
  
  case 'kurang':
  if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1-2`)
  var num_one = q.split('-')[0]
  var num_two = q.split('-')[1]
  if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1-2`)
  if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1-2`)
  var nilai_one = Number(num_one)
  var nilai_two = Number(num_two)
  reply(`${nilai_one - nilai_two}`)
  break
  
  case 'kali':
  if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1*2`)
  var num_one = q.split('*')[0]
  var num_two = q.split('*')[1]
  if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1*2`)
  if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1*2`)
  var nilai_one = Number(num_one)
  var nilai_two = Number(num_two)
  reply(`${nilai_one * nilai_two}`)
  break
  
  case 'bagi':
  if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1:2`)
  var num_one = q.split(':')[0]
  var num_two = q.split(':')[1]
  if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1:2`)
  if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1:2`)
  var nilai_one = Number(num_one)
  var nilai_two = Number(num_two)
  reply(`${nilai_one / nilai_two}`)
  break

  //=================================================//
case 'block': {
  if (!isOwner) throw mess.owner;

  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net';
  
  // Send a pre-block message
  await arie.sendMessage(users, {text: `Kamu Akan Diblacklist/Blokir, Untuk Informasi Lebih Lanjut Silahkan Hubungi Admin wa.me/${owner}`});

  // Introduce a 2-second delay
  setTimeout(async () => {
      // Update block status
      await arie.updateBlockStatus(users, 'block').then(() => {
          // Write to block.json
          const blockedUsers = JSON.parse(fs.readFileSync('./Pengaturan/database/block.json', 'utf8')) || [];
          if (!blockedUsers.includes(users)) {
              blockedUsers.push(users);
              fs.writeFileSync('./Pengaturan/database/block.json', JSON.stringify(blockedUsers, null, 2), 'utf8');
          }
          m.reply('Sip, Berhasil Memblokir Pengguna');
      }).catch((err) => m.reply(jsonformat(err)));
  }, 5000); // 2000 milliseconds (2 seconds)
}
break;

case 'unblock': {
  if (!isOwner) throw mess.owner;

  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net';

  // Update block status
  await arie.updateBlockStatus(users, 'unblock').then(async () => {
      // Send a message after unblocking
      await arie.sendMessage(users, {text: 'Blacklist Telah Dibuka, Harap Tidak Melanggar Peraturan Kembali:)'});
      
      // Remove user from block.json
      const blockedUsers = JSON.parse(fs.readFileSync('./Pengaturan/database/block.json', 'utf8')) || [];
      const index = blockedUsers.indexOf(users);
      if (index !== -1) {
          blockedUsers.splice(index, 1);
          fs.writeFileSync('./Pengaturan/database/block.json', JSON.stringify(blockedUsers, null, 2), 'utf8');
      }

      m.reply('Sip, Berhasil Membuka Blokir Pengguna');
  }).catch((err) => m.reply(jsonformat(err)));
}
break;

case 'listblock': {
  if (!isOwner) throw mess.owner;

  try {
      // Read the blocked users from block.json
      const blockedUsers = JSON.parse(fs.readFileSync('./Pengaturan/database/block.json', 'utf8')) || [];

      // Add a user to the end of the blockedUsers array
      

      // Create an array of formatted user entries with index and user without '@s.whatsapp.net' suffix
      const formattedList = blockedUsers.map((user, index) => `${index + 1}. ${user.replace(/@s.whatsapp.net$/, '')}`).join('\n');

      // Send the formatted list as a reply, including the total number of blocked users
      m.reply(`Jumlah yang di block: ${blockedUsers.length}\n\nBlocked Users:\n${formattedList}`);
  } catch (error) {
      m.reply(`Error reading block.json: ${error.message}`);
  }
}
break;
//===================================== CASE SOSMED ========================================
case 'soundcloud':
case 'sc': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }
  
  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProduct10 = "「 *LIST SOUND CLOUD PLAYS* 」\n";

  data10.forEach(function (product) {
    if (product.kategori === "SoundCloud") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      listProduct10 += `=> ${product.layanan}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${hargaFinal}\n`;
      listProduct10 += `=> *Kode : ${product.sid}*\n`;
      listProduct10 += `=> Min : ${product.min}\n`;
      listProduct10 += `=> Max : ${product.max}\n`;
      listProduct10 += `=> Catatan : ${product.catatan}\n`;
      listProduct10 += `=> Status : 🟢\n`;
      listProduct10 += `=> Kategori : ${product.kategori}\n`;
      listProduct10 += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProduct10);
  break;
}


case 'telegrampostview':
case 'tv': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }
  
  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProduct10 = "「 *LIST TELEGRAM POST VIEWS* 」\n";

  data10.forEach(function (product) {
    if (product.kategori === "Telegram Post View") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      listProduct10 += `=> ${product.layanan}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${hargaFinal}\n`;
      listProduct10 += `=> *Kode : ${product.sid}*\n`;
      listProduct10 += `=> Min : ${product.min}\n`;
      listProduct10 += `=> Max : ${product.max}\n`;
      listProduct10 += `=> Catatan : ${product.catatan}\n`;
      listProduct10 += `=> Status : 🟢\n`;
      listProduct10 += `=> Kategori : ${product.kategori}\n`;
      listProduct10 += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProduct10);
  break;
}


case 'instagramstoryview':
case 'isv': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }
  
  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProduct10 = "「 *LIST INSTAGRAM STORY VIEWS* 」\n";

  data10.forEach(function (product) {
    if (product.kategori === "Instagram Story Views") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      listProduct10 += `=> ${product.layanan}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${hargaFinal}\n`;
      listProduct10 += `=> *Kode : ${product.sid}*\n`;
      listProduct10 += `=> Min : ${product.min}\n`;
      listProduct10 += `=> Max : ${product.max}\n`;
      listProduct10 += `=> Catatan : ${product.catatan}\n`;
      listProduct10 += `=> Status : 🟢\n`;
      listProduct10 += `=> Kategori : ${product.kategori}\n`;
      listProduct10 += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'instagramlivevideo': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }
  
  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProduct10 = "「 *LIST INSTAGRAM LIVE VIDEO LIKES* 」\n";

  data10.forEach(function (product) {
    if (product.kategori === "Instagram Live Video") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      listProduct10 += `=> ${product.layanan}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${hargaFinal}\n`;
      listProduct10 += `=> *Kode : ${product.sid}*\n`;
      listProduct10 += `=> Min : ${product.min}\n`;
      listProduct10 += `=> Max : ${product.max}\n`;
      listProduct10 += `=> Catatan : ${product.catatan}\n`;
      listProduct10 += `=> Status : 🟢\n`;
      listProduct10 += `=> Kategori : ${product.kategori}\n`;
      listProduct10 += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProduct10);
  break;
}


case 'instagramimpressions':
case 'instagramimpression': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }
  
  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProduct10 = "「 *LIST INSTAGRAM IMPRESSIONS* 」\n";

  data10.forEach(function (product) {
    if (product.kategori.includes("Instagram Story / Impressions / Saves / Profile Visit")) {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      listProduct10 += `=> ${product.layanan}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${hargaFinal}\n`;
      listProduct10 += `=> *Kode : ${product.sid}*\n`;
      listProduct10 += `=> Min : ${product.min}\n`;
      listProduct10 += `=> Max : ${product.max}\n`;
      listProduct10 += `=> Catatan : ${product.catatan}\n`;
      listProduct10 += `=> Status : 🟢\n`;
      listProduct10 += `=> Kategori : ${product.kategori}\n`;
      listProduct10 += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProduct10);
  break;
}


case 'twitterviews':
case 'twitterimpressions':
case 'twv':
case 'twi': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }
  
  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProduct10 = "「 *LIST TWITTER VIEWS & IMPRESSIONS* 」\n";

  data10.forEach(function (product) {
    if (product.kategori === "Twitter Views & Impressions") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      listProduct10 += `=> ${product.layanan}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${hargaFinal}\n`;
      listProduct10 += `=> *Kode : ${product.sid}*\n`;
      listProduct10 += `=> Min : ${product.min}\n`;
      listProduct10 += `=> Max : ${product.max}\n`;
      listProduct10 += `=> Catatan : ${product.catatan}\n`;
      listProduct10 += `=> Status : 🟢\n`;
      listProduct10 += `=> Kategori : ${product.kategori}\n`;
      listProduct10 += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProduct10);
  break;
}


case 'websitetraffic':
case 'webtraffic':
case 'wt': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }
  
  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProduct10 = "「 *LIST WEBSITE TRAFFIC* 」\n";

  data10.forEach(function (product) {
    if (product.kategori === "Website Traffic") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0);
      listProduct10 += `=> ${product.layanan}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${hargaFinal}\n`;
      listProduct10 += `=> *Kode : ${product.sid}*\n`;
      listProduct10 += `=> Min : ${product.min}\n`;
      listProduct10 += `=> Max : ${product.max}\n`;
      listProduct10 += `=> Catatan : ${product.catatan}\n`;
      listProduct10 += `=> Status : 🟢\n`;
      listProduct10 += `=> Kategori : ${product.kategori}\n`;
      listProduct10 += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProduct10);
  break;
}


case 'tiktokview':
case 'ttview': {
  const fs = require('fs');
  let data10;
  try {
    data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProduct10 = "「 *LIST TIKTOK VIEW* 」\n";

  data10.forEach(function (product) {
    if (product.kategori === "TikTok View") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProduct10 += `=> ${product.layanan}\n`;
      listProduct10 += `=> Level: ${lev}\n`;
      listProduct10 += `=> Harga: Rp ${hargaFinal}\n`;
      listProduct10 += `=> *Kode : ${product.sid}*\n`;
      listProduct10 += `=> Min : ${product.min}\n`;
      listProduct10 += `=> Max : ${product.max}\n`;
      listProduct10 += `=> Catatan : ${product.catatan}\n`;
      listProduct10 += `=> Status : 🟢\n`;
      listProduct10 += `=> Kategori : ${product.kategori}\n`;
      listProduct10 += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProduct10);
  break;
}

case 'telegramchannelmembers':
case 'tcmembers': {
  const fs = require('fs');
  let dataTelegram;

  try {
    dataTelegram = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTelegram.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTelegram = "「 *LIST TELEGRAM CHANNEL MEMBERS* 」\n";

  dataTelegram.forEach(function (product) {
    if (product.kategori === "Telegram Channnel Members/Group") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTelegram += `=> ${product.layanan}\n`;
      listProductTelegram += `=> Level: ${lev}\n`;
      listProductTelegram += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTelegram += `=> *Kode : ${product.sid}*\n`;
      listProductTelegram += `=> Min : ${product.min}\n`;
      listProductTelegram += `=> Max : ${product.max}\n`;
      listProductTelegram += `=> Catatan : ${product.catatan}\n`;
      listProductTelegram += `=> Status : 🟢\n`;
      listProductTelegram += `=> Kategori : ${product.kategori}\n`;
      listProductTelegram += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTelegram);
  break;
}

case 'spotifyfollowers':
case 'spfollowers': {
  const fs = require('fs');
  let dataSpotify;

  try {
    dataSpotify = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataSpotify.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductSpotify = "「 *LIST SPOTIFY FOLLOWERS* 」\n";

  dataSpotify.forEach(function (product) {
    if (product.kategori === "Spotify") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductSpotify += `=> ${product.layanan}\n`;
      listProductSpotify += `=> Level: ${lev}\n`;
      listProductSpotify += `=> Harga: Rp ${hargaFinal}\n`;
      listProductSpotify += `=> *Kode : ${product.sid}*\n`;
      listProductSpotify += `=> Min : ${product.min}\n`;
      listProductSpotify += `=> Max : ${product.max}\n`;
      listProductSpotify += `=> Catatan : ${product.catatan}\n`;
      listProductSpotify += `=> Status : 🟢\n`;
      listProductSpotify += `=> Kategori : ${product.kategori}\n`;
      listProductSpotify += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductSpotify);
  break;
}

case 'spotifyplays':
case 'spplays': {
  const fs = require('fs');
  let dataSpotifyPlays;

  try {
    dataSpotifyPlays = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataSpotifyPlays.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductSpotifyPlays = "「 *LIST SPOTIFY PLAYS* 」\n";

  dataSpotifyPlays.forEach(function (product) {
    if (product.kategori === "Spotify Plays [ Track | Playlist ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductSpotifyPlays += `=> ${product.layanan}\n`;
      listProductSpotifyPlays += `=> Level: ${lev}\n`;
      listProductSpotifyPlays += `=> Harga: Rp ${hargaFinal}\n`;
      listProductSpotifyPlays += `=> *Kode : ${product.sid}*\n`;
      listProductSpotifyPlays += `=> Min : ${product.min}\n`;
      listProductSpotifyPlays += `=> Max : ${product.max}\n`;
      listProductSpotifyPlays += `=> Catatan : ${product.catatan}\n`;
      listProductSpotifyPlays += `=> Status : 🟢\n`;
      listProductSpotifyPlays += `=> Kategori : ${product.kategori}\n`;
      listProductSpotifyPlays += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductSpotifyPlays);
  break;
}

case 'pinterestboardfollowers':
case 'pbfollowers': {
  const fs = require('fs');
  let dataPinterest;

  try {
    dataPinterest = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataPinterest.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductPinterest = "「 *LIST PINTEREST BOARD FOLLOWERS* 」\n";

  dataPinterest.forEach(function (product) {
    if (product.kategori === "Pinterest") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductPinterest += `=> ${product.layanan}\n`;
      listProductPinterest += `=> Level: ${lev}\n`;
      listProductPinterest += `=> Harga: Rp ${hargaFinal}\n`;
      listProductPinterest += `=> *Kode : ${product.sid}*\n`;
      listProductPinterest += `=> Min : ${product.min}\n`;
      listProductPinterest += `=> Max : ${product.max}\n`;
      listProductPinterest += `=> Catatan : ${product.catatan}\n`;
      listProductPinterest += `=> Status : 🟢\n`;
      listProductPinterest += `=> Kategori : ${product.kategori}\n`;
      listProductPinterest += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductPinterest);
  break;
}

case 'twitterasiafollowers':
case 'twafollowers': {
  const fs = require('fs');
  let dataTwitter;

  try {
    dataTwitter = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTwitter.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTwitter = "「 *LIST TWITTER FOLLOWERS* 」\n";

  dataTwitter.forEach(function (product) {
    if (product.kategori === "Twitter Followers [ No Refill ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTwitter += `=> ${product.layanan}\n`;
      listProductTwitter += `=> Level: ${lev}\n`;
      listProductTwitter += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTwitter += `=> *Kode : ${product.sid}*\n`;
      listProductTwitter += `=> Min : ${product.min}\n`;
      listProductTwitter += `=> Max : ${product.max}\n`;
      listProductTwitter += `=> Catatan : ${product.catatan}\n`;
      listProductTwitter += `=> Status : 🟢\n`;
      listProductTwitter += `=> Kategori : ${product.kategori}\n`;
      listProductTwitter += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTwitter);
  break;
}

case 'tokopediafollowers':
case 'tpfollowers': {
  const fs = require('fs');
  let dataEcommerce;

  try {
    dataEcommerce = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataEcommerce.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductEcommerce = "「 *LIST TOKOPEDIA FOLLOWERS* 」\n";

  dataEcommerce.forEach(function (product) {
    if (product.kategori === "Shopee/Tokopedia/Bukalapak/Lazada") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductEcommerce += `=> ${product.layanan}\n`;
      listProductEcommerce += `=> Level: ${lev}\n`;
      listProductEcommerce += `=> Harga: Rp ${hargaFinal}\n`;
      listProductEcommerce += `=> *Kode : ${product.sid}*\n`;
      listProductEcommerce += `=> Min : ${product.min}\n`;
      listProductEcommerce += `=> Max : ${product.max}\n`;
      listProductEcommerce += `=> Catatan : ${product.catatan}\n`;
      listProductEcommerce += `=> Status : 🟢\n`;
      listProductEcommerce += `=> Kategori : ${product.kategori}\n`;
      listProductEcommerce += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductEcommerce);
  break;
}

case 'instagramlikes3':
case 'ilikes3': {
  const fs = require('fs');
  let dataInstagramLikes;

  try {
    dataInstagramLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramLikes = "「 *LIST INSTAGRAM LIKES* 」\n";

  dataInstagramLikes.forEach(function (product) {
    if (product.kategori === "Instagram Likes [ No Refill ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramLikes += `=> ${product.layanan}\n`;
      listProductInstagramLikes += `=> Level: ${lev}\n`;
      listProductInstagramLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramLikes += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramLikes += `=> Min : ${product.min}\n`;
      listProductInstagramLikes += `=> Max : ${product.max}\n`;
      listProductInstagramLikes += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramLikes += `=> Status : 🟢\n`;
      listProductInstagramLikes += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramLikes);
  break;
}

case 'twitterasiafollowers3':
case 'taf3': {
  const fs = require('fs');
  let dataTwitterFollowers;

  try {
    dataTwitterFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTwitterFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTwitterFollowers = "「 *LIST TWITTER ASIA FOLLOWERS SERVER 3* 」\n";

  dataTwitterFollowers.forEach(function (product) {
    if (product.kategori === "Twitter Followers [ guaranteed/garansi ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTwitterFollowers += `=> ${product.layanan}\n`;
      listProductTwitterFollowers += `=> Level: ${lev}\n`;
      listProductTwitterFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTwitterFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductTwitterFollowers += `=> Min : ${product.min}\n`;
      listProductTwitterFollowers += `=> Max : ${product.max}\n`;
      listProductTwitterFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductTwitterFollowers += `=> Status : 🟢\n`;
      listProductTwitterFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductTwitterFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTwitterFollowers);
  break;
}

case 'youtubelikes':
case 'ylikes': {
  const fs = require('fs');
  let dataYoutubeLikes;

  try {
    dataYoutubeLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeLikes = "「 *LIST YOUTUBE LIKES* 」\n";

  dataYoutubeLikes.forEach(function (product) {
    if (product.kategori === "Youtube Likes / Dislikes / Shares / Comment") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeLikes += `=> ${product.layanan}\n`;
      listProductYoutubeLikes += `=> Level: ${lev}\n`;
      listProductYoutubeLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeLikes += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeLikes += `=> Min : ${product.min}\n`;
      listProductYoutubeLikes += `=> Max : ${product.max}\n`;
      listProductYoutubeLikes += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeLikes += `=> Status : 🟢\n`;
      listProductYoutubeLikes += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeLikes);
  break;
}

case 'youtubeviews4':
case 'yviews4': {
  const fs = require('fs');
  let dataYoutubeViews;

  try {
    dataYoutubeViews = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeViews.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeViews = "「 *LIST YOUTUBE VIEWS SERVER 4* 」\n";

  dataYoutubeViews.forEach(function (product) {
    if (product.kategori === "Youtube Views") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeViews += `=> ${product.layanan}\n`;
      listProductYoutubeViews += `=> Level: ${lev}\n`;
      listProductYoutubeViews += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeViews += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeViews += `=> Min : ${product.min}\n`;
      listProductYoutubeViews += `=> Max : ${product.max}\n`;
      listProductYoutubeViews += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeViews += `=> Status : 🟢\n`;
      listProductYoutubeViews += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeViews += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeViews);
  break;
}

case 'tiktokfollowers5':
case 'ttfollowers5': {
  const fs = require('fs');
  let dataTikTokFollowers;

  try {
    dataTikTokFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokFollowers = "「 *LIST TIKTOK FOLLOWERS SERVER 5* 」\n";

  dataTikTokFollowers.forEach(function (product) {
    if (product.kategori === "TikTok Followers") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokFollowers += `=> ${product.layanan}\n`;
      listProductTikTokFollowers += `=> Level: ${lev}\n`;
      listProductTikTokFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokFollowers += `=> Min : ${product.min}\n`;
      listProductTikTokFollowers += `=> Max : ${product.max}\n`;
      listProductTikTokFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokFollowers += `=> Status : 🟢\n`;
      listProductTikTokFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokFollowers);
  break;
}

case 'tiktoklikes6':
case 'tlikes6': {
  const fs = require('fs');
  let dataTikTokLikes;

  try {
    dataTikTokLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokLikes = "「 *LIST TIK TOK LIKES S6* 」\n";

  dataTikTokLikes.forEach(function (product) {
    if (product.kategori === "TikTok Likes") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokLikes += `=> ${product.layanan}\n`;
      listProductTikTokLikes += `=> Level: ${lev}\n`;
      listProductTikTokLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokLikes += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokLikes += `=> Min : ${product.min}\n`;
      listProductTikTokLikes += `=> Max : ${product.max}\n`;
      listProductTikTokLikes += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokLikes += `=> Status : 🟢\n`;
      listProductTikTokLikes += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokLikes);
  break;
}

case 'facebookfollowers1':
case 'fbfollowers1': {
  const fs = require('fs');
  let dataFacebookFollowers;

  try {
    dataFacebookFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookFollowers = "「 *LIST FACEBOOK PROFILE FOLLOWER AR 1* 」\n";

  dataFacebookFollowers.forEach(function (product) {
    if (product.kategori === "Facebook Followers / Friends") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookFollowers += `=> ${product.layanan}\n`;
      listProductFacebookFollowers += `=> Level: ${lev}\n`;
      listProductFacebookFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookFollowers += `=> Min : ${product.min}\n`;
      listProductFacebookFollowers += `=> Max : ${product.max}\n`;
      listProductFacebookFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookFollowers += `=> Status : 🟢\n`;
      listProductFacebookFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookFollowers);
  break;
}

case 'facebookpostlikes1':
case 'fbpostlikes1': {
  const fs = require('fs');
  let dataFacebookPostLikes;

  try {
    dataFacebookPostLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookPostLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookPostLikes = "「 *LIST FACEBOOK PHOTO / POST LIKES* 」\n";

  dataFacebookPostLikes.forEach(function (product) {
    if (product.kategori === "Facebook Post Likes") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookPostLikes += `=> ${product.layanan}\n`;
      listProductFacebookPostLikes += `=> Level: ${lev}\n`;
      listProductFacebookPostLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookPostLikes += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookPostLikes += `=> Min : ${product.min}\n`;
      listProductFacebookPostLikes += `=> Max : ${product.max}\n`;
      listProductFacebookPostLikes += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookPostLikes += `=> Status : 🟢\n`;
      listProductFacebookPostLikes += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookPostLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookPostLikes);
  break;
}

case 'instagramfollowers31':
case 'ifollowers31': {
  const fs = require('fs');
  let dataInstagramFollowers;

  try {
    dataInstagramFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramFollowers = "「 *LIST INSTAGRAM FOLLOWERS AR 31* 」\n";

  dataInstagramFollowers.forEach(function (product) {
    if (product.kategori === "Instagram Followers [ No Refill ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramFollowers += `=> ${product.layanan}\n`;
      listProductInstagramFollowers += `=> Level: ${lev}\n`;
      listProductInstagramFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramFollowers += `=> Min : ${product.min}\n`;
      listProductInstagramFollowers += `=> Max : ${product.max}\n`;
      listProductInstagramFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramFollowers += `=> Status : 🟢\n`;
      listProductInstagramFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramFollowers);
  break;
}

case 'youtubelivestreamviews':
case 'ylivestreamviews': {
  const fs = require('fs');
  let dataYoutubeLiveStreamViews;

  try {
    dataYoutubeLiveStreamViews = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeLiveStreamViews.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeLiveStreamViews = "「 *LIST YOUTUBE LIVE STREAM VIEWS [ REAL ][ BETA ]* 」\n";

  dataYoutubeLiveStreamViews.forEach(function (product) {
    if (product.kategori === "Youtube Live Stream / Youtube Premiered Waiting") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeLiveStreamViews += `=> ${product.layanan}\n`;
      listProductYoutubeLiveStreamViews += `=> Level: ${lev}\n`;
      listProductYoutubeLiveStreamViews += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeLiveStreamViews += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeLiveStreamViews += `=> Min : ${product.min}\n`;
      listProductYoutubeLiveStreamViews += `=> Max : ${product.max}\n`;
      listProductYoutubeLiveStreamViews += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeLiveStreamViews += `=> Status : 🟢\n`;
      listProductYoutubeLiveStreamViews += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeLiveStreamViews += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeLiveStreamViews);
  break;
}

case 'twitterretweets1':
case 'tretweets1': {
  const fs = require('fs');
  let dataTwitterRetweets;

  try {
    dataTwitterRetweets = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTwitterRetweets.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTwitterRetweets = "「 *LIST TWITTER RETWEETS SERVER 1* 」\n";

  dataTwitterRetweets.forEach(function (product) {
    if (product.kategori === "Twitter Retweets") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTwitterRetweets += `=> ${product.layanan}\n`;
      listProductTwitterRetweets += `=> Level: ${lev}\n`;
      listProductTwitterRetweets += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTwitterRetweets += `=> *Kode : ${product.sid}*\n`;
      listProductTwitterRetweets += `=> Min : ${product.min}\n`;
      listProductTwitterRetweets += `=> Max : ${product.max}\n`;
      listProductTwitterRetweets += `=> Catatan : ${product.catatan}\n`;
      listProductTwitterRetweets += `=> Status : 🟢\n`;
      listProductTwitterRetweets += `=> Kategori : ${product.kategori}\n`;
      listProductTwitterRetweets += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTwitterRetweets);
  break;
}

case 'instagramlikes19':
case 'ilikes19': {
  const fs = require('fs');
  let dataInstagramLikes;

  try {
    dataInstagramLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramLikes = "「 *LIST INSTAGRAM LIKES AR 19* 」\n";

  dataInstagramLikes.forEach(function (product) {
    if (product.kategori === "Instagram Likes [ Guaranteed ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramLikes += `=> ${product.layanan}\n`;
      listProductInstagramLikes += `=> Level: ${lev}\n`;
      listProductInstagramLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramLikes += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramLikes += `=> Min : ${product.min}\n`;
      listProductInstagramLikes += `=> Max : ${product.max}\n`;
      listProductInstagramLikes += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramLikes += `=> Status : 🟢\n`;
      listProductInstagramLikes += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramLikes);
  break;
}

case 'instagramfollowersrefill2':
case 'ifollowersrefill2': {
  const fs = require('fs');
  let dataInstagramFollowers;

  try {
    dataInstagramFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramFollowers = "「 *LIST INSTAGRAM FOLLOWERS REFILL S2* 」\n";

  dataInstagramFollowers.forEach(function (product) {
    if (product.kategori === "Instagram Followers [guaranteed]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramFollowers += `=> ${product.layanan}\n`;
      listProductInstagramFollowers += `=> Level: ${lev}\n`;
      listProductInstagramFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramFollowers += `=> Min : ${product.min}\n`;
      listProductInstagramFollowers += `=> Max : ${product.max}\n`;
      listProductInstagramFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramFollowers += `=> Status : 🟢\n`;
      listProductInstagramFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramFollowers);
  break;
}

case 'twitterfollowersindo':
case 'tfollowersindo': {
  const fs = require('fs');
  let dataTwitterFollowers;

  try {
    dataTwitterFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTwitterFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTwitterFollowers = "「 *LIST TWITTER FOLLOWERS REAL INDONESIA FAST S2* 」\n";

  dataTwitterFollowers.forEach(function (product) {
    if (product.kategori === "Twitter Indonesia") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTwitterFollowers += `=> ${product.layanan}\n`;
      listProductTwitterFollowers += `=> Level: ${lev}\n`;
      listProductTwitterFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTwitterFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductTwitterFollowers += `=> Min : ${product.min}\n`;
      listProductTwitterFollowers += `=> Max : ${product.max}\n`;
      listProductTwitterFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductTwitterFollowers += `=> Status : 🟢\n`;
      listProductTwitterFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductTwitterFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTwitterFollowers);
  break;
}

case 'instagramlikesreels7':
case 'ilikesreels7': {
  const fs = require('fs');
  let dataInstagramLikesReels;

  try {
    dataInstagramLikesReels = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramLikesReels.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramLikesReels = "「 *LIST INSTAGRAM LIKES + REELS INDONESIA AR 7* 」\n";

  dataInstagramLikesReels.forEach(function (product) {
    if (product.kategori === "Instagram Like Indonesia") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramLikesReels += `=> ${product.layanan}\n`;
      listProductInstagramLikesReels += `=> Level: ${lev}\n`;
      listProductInstagramLikesReels += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramLikesReels += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramLikesReels += `=> Min : ${product.min}\n`;
      listProductInstagramLikesReels += `=> Max : ${product.max}\n`;
      listProductInstagramLikesReels += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramLikesReels += `=> Status : 🟢\n`;
      listProductInstagramLikesReels += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramLikesReels += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramLikesReels);
  break;
}

case 'instagramtvlikes5':
case 'itvlikes5': {
  const fs = require('fs');
  let dataInstagramTVLikes;

  try {
    dataInstagramTVLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramTVLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramTVLikes = "「 *LIST INSTAGRAM TV LIKES SERVER 5* 」\n";

  dataInstagramTVLikes.forEach(function (product) {
    if (product.kategori === "Instagram TV") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramTVLikes += `=> ${product.layanan}\n`;
      listProductInstagramTVLikes += `=> Level: ${lev}\n`;
      listProductInstagramTVLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramTVLikes += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramTVLikes += `=> Min : ${product.min}\n`;
      listProductInstagramTVLikes += `=> Max : ${product.max}\n`;
      listProductInstagramTVLikes += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramTVLikes += `=> Status : 🟢\n`;
      listProductInstagramTVLikes += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramTVLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramTVLikes);
  break;
}

case 'youtubesubscribers3':
case 'ysubs3': {
  const fs = require('fs');
  let dataYoutubeSubscribers;

  try {
    dataYoutubeSubscribers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeSubscribers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeSubscribers = "「 *LIST YOUTUBE SUBSCRIBERS SERVER 3* 」\n";

  dataYoutubeSubscribers.forEach(function (product) {
    if (product.kategori === "Youtube Subscribers [ guaranted/garansi ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeSubscribers += `=> ${product.layanan}\n`;
      listProductYoutubeSubscribers += `=> Level: ${lev}\n`;
      listProductYoutubeSubscribers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeSubscribers += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeSubscribers += `=> Min : ${product.min}\n`;
      listProductYoutubeSubscribers += `=> Max : ${product.max}\n`;
      listProductYoutubeSubscribers += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeSubscribers += `=> Status : 🟢\n`;
      listProductYoutubeSubscribers += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeSubscribers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeSubscribers);
  break;
}

case 'instagramfollowersrefill15':
case 'ifollowersrefill15': {
  const fs = require('fs');
  let dataInstagramFollowers;

  try {
    dataInstagramFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramFollowers = "「 *LIST INSTAGRAM FOLLOWERS REFILL S15* 」\n";

  dataInstagramFollowers.forEach(function (product) {
    if (product.kategori === "Instagram Followers [ guaranteed 60 Hari - 99 Hari ] ") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramFollowers += `=> ${product.layanan}\n`;
      listProductInstagramFollowers += `=> Level: ${lev}\n`;
      listProductInstagramFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramFollowers += `=> Min : ${product.min}\n`;
      listProductInstagramFollowers += `=> Max : ${product.max}\n`;
      listProductInstagramFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramFollowers += `=> Status : 🟢\n`;
      listProductInstagramFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramFollowers);
  break;
}

case 'instagramcomments5':
case 'icomments5': {
  const fs = require('fs');
  let dataInstagramComments;

  try {
    dataInstagramComments = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramComments.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramComments = "「 *LIST INSTAGRAM COMMENTS* 」\n";

  dataInstagramComments.forEach(function (product) {
    if (product.kategori === "Instagram Comments/komentar") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramComments += `=> ${product.layanan}\n`;
      listProductInstagramComments += `=> Level: ${lev}\n`;
      listProductInstagramComments += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramComments += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramComments += `=> Min : ${product.min}\n`;
      listProductInstagramComments += `=> Max : ${product.max}\n`;
      listProductInstagramComments += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramComments += `=> Status : 🟢\n`;
      listProductInstagramComments += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramComments += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramComments);
  break;
}

case 'tiktokshare1':
case 'tshare1': {
  const fs = require('fs');
  let dataTikTokShares;

  try {
    dataTikTokShares = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokShares.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokShares = "「 *LIST TIKTOK SHARE AR 1* 」\n";

  dataTikTokShares.forEach(function (product) {
    if (product.kategori === "TikTok share") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokShares += `=> ${product.layanan}\n`;
      listProductTikTokShares += `=> Level: ${lev}\n`;
      listProductTikTokShares += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokShares += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokShares += `=> Min : ${product.min}\n`;
      listProductTikTokShares += `=> Max : ${product.max}\n`;
      listProductTikTokShares += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokShares += `=> Status : 🟢\n`;
      listProductTikTokShares += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokShares += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokShares);
  break;
}

case 'youtubesubscribe12':
case 'ysubscribe12': {
  const fs = require('fs');
  let dataYoutubeSubscribers;

  try {
    dataYoutubeSubscribers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeSubscribers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeSubscribers = "「 *LIST YOUTUBE SUBSCRIBE SERVER 12* 」\n";

  dataYoutubeSubscribers.forEach(function (product) {
    if (product.kategori === "Youtube Subscribers [ No Refill ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeSubscribers += `=> ${product.layanan}\n`;
      listProductYoutubeSubscribers += `=> Level: ${lev}\n`;
      listProductYoutubeSubscribers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeSubscribers += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeSubscribers += `=> Min : ${product.min}\n`;
      listProductYoutubeSubscribers += `=> Max : ${product.max}\n`;
      listProductYoutubeSubscribers += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeSubscribers += `=> Status : 🟢\n`;
      listProductYoutubeSubscribers += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeSubscribers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeSubscribers);
  break;
}

case 'instagramcommentsindonesia':
case 'icommentsindonesia': {
  const fs = require('fs');
  let dataInstagramComments;

  try {
    dataInstagramComments = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramComments.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramComments = "「 *LIST INSTAGRAM CUSTOM COMMENTS INDONESIA* 」\n";

  dataInstagramComments.forEach(function (product) {
    if (product.kategori === "Instagram Comments/komentar Indonesia") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramComments += `=> ${product.layanan}\n`;
      listProductInstagramComments += `=> Level: ${lev}\n`;
      listProductInstagramComments += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramComments += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramComments += `=> Min : ${product.min}\n`;
      listProductInstagramComments += `=> Max : ${product.max}\n`;
      listProductInstagramComments += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramComments += `=> Status : 🟢\n`;
      listProductInstagramComments += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramComments += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramComments);
  break;
}

case 'tiktokfollowersindo':
case 'tfollowersindo': {
  const fs = require('fs');
  let dataTikTokFollowers;

  try {
    dataTikTokFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokFollowers = "「 *LIST TIKTOK FOLLOWERS INDONESIA BONUS++* 」\n";

  dataTikTokFollowers.forEach(function (product) {
    if (product.kategori === "TikTok INDONESIA") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokFollowers += `=> ${product.layanan}\n`;
      listProductTikTokFollowers += `=> Level: ${lev}\n`;
      listProductTikTokFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokFollowers += `=> Min : ${product.min}\n`;
      listProductTikTokFollowers += `=> Max : ${product.max}\n`;
      listProductTikTokFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokFollowers += `=> Status : 🟢\n`;
      listProductTikTokFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokFollowers);
  break;
}

case 'instagramreelslikes1':
case 'ireelslikes1': {
  const fs = require('fs');
  let dataInstagramReelsLikes;

  try {
    dataInstagramReelsLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramReelsLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramReelsLikes = "「 *LIST INSTAGRAM REELS LIKES S1* 」\n";

  dataInstagramReelsLikes.forEach(function (product) {
    if (product.kategori === "Instagram Reels") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramReelsLikes += `=> ${product.layanan}\n`;
      listProductInstagramReelsLikes += `=> Level: ${lev}\n`;
      listProductInstagramReelsLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramReelsLikes += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramReelsLikes += `=> Min : ${product.min}\n`;
      listProductInstagramReelsLikes += `=> Max : ${product.max}\n`;
      listProductInstagramReelsLikes += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramReelsLikes += `=> Status : 🟢\n`;
      listProductInstagramReelsLikes += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramReelsLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramReelsLikes);
  break;
}

case 'youtubeshortlikes1':
case 'yshortlikes1': {
  const fs = require('fs');
  let dataYoutubeShortLikes;

  try {
    dataYoutubeShortLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeShortLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeShortLikes = "「 *LIST YOUTUBE SHORT LIKES SERVER 1* 」\n";

  dataYoutubeShortLikes.forEach(function (product) {
    if (product.kategori === "YouTube Shorts") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeShortLikes += `=> ${product.layanan}\n`;
      listProductYoutubeShortLikes += `=> Level: ${lev}\n`;
      listProductYoutubeShortLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeShortLikes += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeShortLikes += `=> Min : ${product.min}\n`;
      listProductYoutubeShortLikes += `=> Max : ${product.max}\n`;
      listProductYoutubeShortLikes += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeShortLikes += `=> Status : 🟢\n`;
      listProductYoutubeShortLikes += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeShortLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeShortLikes);
  break;
}

case 'instagramfollowersrefill23':
case 'ifollowersrefill23': {
  const fs = require('fs');
  let dataInstagramFollowers;

  try {
    dataInstagramFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramFollowers = "「 *LIST INSTAGRAM FOLLOWERS REFILL S23* 」\n";

  dataInstagramFollowers.forEach(function (product) {
    if (product.kategori === "Instagram Followers [ guaranteed 180 Hari - Lifetime ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramFollowers += `=> ${product.layanan}\n`;
      listProductInstagramFollowers += `=> Level: ${lev}\n`;
      listProductInstagramFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramFollowers += `=> Min : ${product.min}\n`;
      listProductInstagramFollowers += `=> Max : ${product.max}\n`;
      listProductInstagramFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramFollowers += `=> Status : 🟢\n`;
      listProductInstagramFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramFollowers);
  break;
}

case 'tiktoklivestreamviews':
case 'tlivestreamviews': {
  const fs = require('fs');
  let dataTikTokLivestreamViews;

  try {
    dataTikTokLivestreamViews = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokLivestreamViews.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokLivestreamViews = "「 *LIST TIKTOK LIVESTREAM VIEWS* 」\n";

  dataTikTokLivestreamViews.forEach(function (product) {
    if (product.kategori === "Tiktok Live Streams") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokLivestreamViews += `=> ${product.layanan}\n`;
      listProductTikTokLivestreamViews += `=> Level: ${lev}\n`;
      listProductTikTokLivestreamViews += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokLivestreamViews += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokLivestreamViews += `=> Min : ${product.min}\n`;
      listProductTikTokLivestreamViews += `=> Max : ${product.max}\n`;
      listProductTikTokLivestreamViews += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokLivestreamViews += `=> Status : 🟢\n`;
      listProductTikTokLivestreamViews += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokLivestreamViews += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokLivestreamViews);
  break;
}

case 'instagramfollowersindo12':
case 'ifollowersindo12': {
  const fs = require('fs');
  let dataInstagramFollowers;

  try {
    dataInstagramFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramFollowers = "「 *LIST INSTAGRAM FOLLOWERS INDONESIA S12* 」\n";

  dataInstagramFollowers.forEach(function (product) {
    if (product.kategori === "Instagram Followers Indonesia") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramFollowers += `=> ${product.layanan}\n`;
      listProductInstagramFollowers += `=> Level: ${lev}\n`;
      listProductInstagramFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramFollowers += `=> Min : ${product.min}\n`;
      listProductInstagramFollowers += `=> Max : ${product.max}\n`;
      listProductInstagramFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramFollowers += `=> Status : 🟢\n`;
      listProductInstagramFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramFollowers);
  break;
}

case 'youtubeviewsadsense1':
case 'yviewsadsense1': {
  const fs = require('fs');
  let dataYoutubeViews;

  try {
    dataYoutubeViews = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeViews.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeViews = "「 *LIST YOUTUBE VIEWS UNTUK PENAMBAH ADSENSE* 」\n";

  dataYoutubeViews.forEach(function (product) {
    if (product.kategori === "Youtube View [ untuk monetisasi - penghasil duit ") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeViews += `=> ${product.layanan}\n`;
      listProductYoutubeViews += `=> Level: ${lev}\n`;
      listProductYoutubeViews += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeViews += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeViews += `=> Min : ${product.min}\n`;
      listProductYoutubeViews += `=> Max : ${product.max}\n`;
      listProductYoutubeViews += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeViews += `=> Status : 🟢\n`;
      listProductYoutubeViews += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeViews += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeViews);
  break;
}

case 'instagramlikesverified':
case 'ilikesverified': {
  const fs = require('fs');
  let dataInstagramLikes;

  try {
    dataInstagramLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramLikes = "「 *LIST INSTAGRAM LIKES VERIFIED/CENTANG BIRU* 」\n";

  dataInstagramLikes.forEach(function (product) {
    if (product.kategori === "Instagram VERIFIED") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramLikes += `=> ${product.layanan}\n`;
      listProductInstagramLikes += `=> Level: ${lev}\n`;
      listProductInstagramLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramLikes += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramLikes += `=> Min : ${product.min}\n`;
      listProductInstagramLikes += `=> Max : ${product.max}\n`;
      listProductInstagramLikes += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramLikes += `=> Status : 🟢\n`;
      listProductInstagramLikes += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramLikes);
  break;
}

case 'facebookvideoviews4':
case 'fbvideoviews4': {
  const fs = require('fs');
  let dataFacebookVideoViews;

  try {
    dataFacebookVideoViews = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookVideoViews.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookVideoViews = "「 *LIST FACEBOOK VIDEO VIEWS SERVER 4* 」\n";

  dataFacebookVideoViews.forEach(function (product) {
    if (product.kategori === "Facebook Video Views") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookVideoViews += `=> ${product.layanan}\n`;
      listProductFacebookVideoViews += `=> Level: ${lev}\n`;
      listProductFacebookVideoViews += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookVideoViews += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookVideoViews += `=> Min : ${product.min}\n`;
      listProductFacebookVideoViews += `=> Max : ${product.max}\n`;
      listProductFacebookVideoViews += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookVideoViews += `=> Status : 🟢\n`;
      listProductFacebookVideoViews += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookVideoViews += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookVideoViews);
  break;
}

case 'twitterlikes1':
case 'tlikes1': {
  const fs = require('fs');
  let dataTwitterLikes;

  try {
    dataTwitterLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTwitterLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTwitterLikes = "「 *LIST TWITTER LIKES AR 1* 」\n";

  dataTwitterLikes.forEach(function (product) {
    if (product.kategori === "Twitter Favorites/Like") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTwitterLikes += `=> ${product.layanan}\n`;
      listProductTwitterLikes += `=> Level: ${lev}\n`;
      listProductTwitterLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTwitterLikes += `=> *Kode : ${product.sid}*\n`;
      listProductTwitterLikes += `=> Min : ${product.min}\n`;
      listProductTwitterLikes += `=> Max : ${product.max}\n`;
      listProductTwitterLikes += `=> Catatan : ${product.catatan}\n`;
      listProductTwitterLikes += `=> Status : 🟢\n`;
      listProductTwitterLikes += `=> Kategori : ${product.kategori}\n`;
      listProductTwitterLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTwitterLikes);
  break;
}

case 'twitchliveviews':
case 'tliveviews': {
  const fs = require('fs');
  let dataTwitchLiveViews;

  try {
    dataTwitchLiveViews = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTwitchLiveViews.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTwitchLiveViews = "「 *LIST TWITCH LIVE VIEWS* 」\n";

  dataTwitchLiveViews.forEach(function (product) {
    if (product.kategori === "Twitch Live Stream") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTwitchLiveViews += `=> ${product.layanan}\n`;
      listProductTwitchLiveViews += `=> Level: ${lev}\n`;
      listProductTwitchLiveViews += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTwitchLiveViews += `=> *Kode : ${product.sid}*\n`;
      listProductTwitchLiveViews += `=> Min : ${product.min}\n`;
      listProductTwitchLiveViews += `=> Max : ${product.max}\n`;
      listProductTwitchLiveViews += `=> Catatan : ${product.catatan}\n`;
      listProductTwitchLiveViews += `=> Status : 🟢\n`;
      listProductTwitchLiveViews += `=> Kategori : ${product.kategori}\n`;
      listProductTwitchLiveViews += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTwitchLiveViews);
  break;
}

case 'facebookemoticonlikes':
case 'fbemoticonlikes': {
  const fs = require('fs');
  let dataFacebookEmoticonLikes;

  try {
    dataFacebookEmoticonLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookEmoticonLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookEmoticonLikes = "「 *LIST FACEBOOK EMOTICONS POST LIKES [ LOVE ]* 」\n";

  dataFacebookEmoticonLikes.forEach(function (product) {
    if (product.kategori === "Facebook Post Like Emoticon") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookEmoticonLikes += `=> ${product.layanan}\n`;
      listProductFacebookEmoticonLikes += `=> Level: ${lev}\n`;
      listProductFacebookEmoticonLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookEmoticonLikes += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookEmoticonLikes += `=> Min : ${product.min}\n`;
      listProductFacebookEmoticonLikes += `=> Max : ${product.max}\n`;
      listProductFacebookEmoticonLikes += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookEmoticonLikes += `=> Status : 🟢\n`;
      listProductFacebookEmoticonLikes += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookEmoticonLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookEmoticonLikes);
  break;
}

case 'instagramviewserver4':
case 'iviewsserver4': {
  const fs = require('fs');
  let dataInstagramViews;

  try {
    dataInstagramViews = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramViews.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramViews = "「 *LIST INSTAGRAM VIEW SERVER 4* 」\n";

  dataInstagramViews.forEach(function (product) {
    if (product.kategori === "Instagram Views") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramViews += `=> ${product.layanan}\n`;
      listProductInstagramViews += `=> Level: ${lev}\n`;
      listProductInstagramViews += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramViews += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramViews += `=> Min : ${product.min}\n`;
      listProductInstagramViews += `=> Max : ${product.max}\n`;
      listProductInstagramViews += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramViews += `=> Status : 🟢\n`;
      listProductInstagramViews += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramViews += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramViews);
  break;
}

case 'youtubeviewtargetindonesia':
case 'yviewtargetindonesia': {
  const fs = require('fs');
  let dataYoutubeViews;

  try {
    dataYoutubeViews = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeViews.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeViews = "「 *LIST YOUTUBE VIEWS REFILL 90 DAYS [ INDONESIA ]* 」\n";

  dataYoutubeViews.forEach(function (product) {
    if (product.kategori === "Youtube View Target Negara") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeViews += `=> ${product.layanan}\n`;
      listProductYoutubeViews += `=> Level: ${lev}\n`;
      listProductYoutubeViews += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeViews += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeViews += `=> Min : ${product.min}\n`;
      listProductYoutubeViews += `=> Max : ${product.max}\n`;
      listProductYoutubeViews += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeViews += `=> Status : 🟢\n`;
      listProductYoutubeViews += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeViews += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeViews);
  break;
}

case 'youtubesubscribelifetime':
case 'ysublifetime': {
  const fs = require('fs');
  let dataYoutubeSubscribers;

  try {
    dataYoutubeSubscribers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeSubscribers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeSubscribers = "「 *LIST YOUTUBE SUBSCRIBE [ INDONESIA ] LIFETIME GUARANTEE* 」\n";

  dataYoutubeSubscribers.forEach(function (product) {
    if (product.kategori === "Youtube Subscribers Negara") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeSubscribers += `=> ${product.layanan}\n`;
      listProductYoutubeSubscribers += `=> Level: ${lev}\n`;
      listProductYoutubeSubscribers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeSubscribers += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeSubscribers += `=> Min : ${product.min}\n`;
      listProductYoutubeSubscribers += `=> Max : ${product.max}\n`;
      listProductYoutubeSubscribers += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeSubscribers += `=> Status : 🟢\n`;
      listProductYoutubeSubscribers += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeSubscribers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeSubscribers);
  break;
}

case 'youtubelikesindo':
case 'ylikesindo': {
  const fs = require('fs');
  let dataYoutubeLikes;

  try {
    dataYoutubeLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeLikes = "「 *LIST YOUTUBE LIKES [ INDONESIA ] LIFETIME GUARANTEE* 」\n";

  dataYoutubeLikes.forEach(function (product) {
    if (product.kategori === "Youtube Like") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeLikes += `=> ${product.layanan}\n`;
      listProductYoutubeLikes += `=> Level: ${lev}\n`;
      listProductYoutubeLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeLikes += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeLikes += `=> Min : ${product.min}\n`;
      listProductYoutubeLikes += `=> Max : ${product.max}\n`;
      listProductYoutubeLikes += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeLikes += `=> Status : 🟢\n`;
      listProductYoutubeLikes += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeLikes);
  break;
}

case 'tiktokfollowersar3':
case 'tfollowersar3': {
  const fs = require('fs');
  let dataTikTokFollowers;

  try {
    dataTikTokFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokFollowers = "「 *LIST TIKTOK FOLLOWERSAR 3* 」\n";

  dataTikTokFollowers.forEach(function (product) {
    if (product.kategori === "TikTok Followers [ layanan baru ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokFollowers += `=> ${product.layanan}\n`;
      listProductTikTokFollowers += `=> Level: ${lev}\n`;
      listProductTikTokFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokFollowers += `=> Min : ${product.min}\n`;
      listProductTikTokFollowers += `=> Max : ${product.max}\n`;
      listProductTikTokFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokFollowers += `=> Status : 🟢\n`;
      listProductTikTokFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokFollowers);
  break;
}

case 'tiktokfollowersexclusive1':
case 'tfollowersexclusive1': {
  const fs = require('fs');
  let dataTikTokFollowers;

  try {
    dataTikTokFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokFollowers = "「 *LIST TIKTOK FOLLOWERS [ EXCLUSIVE 1 ]* 」\n";

  dataTikTokFollowers.forEach(function (product) {
    if (product.kategori === "TikTok Followers [ SERVICE EXCLUSIVE ]🔥🔥") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokFollowers += `=> ${product.layanan}\n`;
      listProductTikTokFollowers += `=> Level: ${lev}\n`;
      listProductTikTokFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokFollowers += `=> Min : ${product.min}\n`;
      listProductTikTokFollowers += `=> Max : ${product.max}\n`;
      listProductTikTokFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokFollowers += `=> Status : 🟢\n`;
      listProductTikTokFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokFollowers);
  break;
}

case 'tiktoksaveserver1':
case 'tsaveserver1': {
  const fs = require('fs');
  let dataTikTokSave;

  try {
    dataTikTokSave = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokSave.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokSave = "「 *LIST TIKTOK SAVE SERVER 1* 」\n";

  dataTikTokSave.forEach(function (product) {
    if (product.kategori === "TikTok Save/Favorit") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokSave += `=> ${product.layanan}\n`;
      listProductTikTokSave += `=> Level: ${lev}\n`;
      listProductTikTokSave += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokSave += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokSave += `=> Min : ${product.min}\n`;
      listProductTikTokSave += `=> Max : ${product.max}\n`;
      listProductTikTokSave += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokSave += `=> Status : 🟢\n`;
      listProductTikTokSave += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokSave += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokSave);
  break;
}

case 'tiktoklivestreamviewsbonus':
case 'tlivestreamviewsbonus': {
  const fs = require('fs');
  let dataTiktokLiveStreams;

  try {
    dataTiktokLiveStreams = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTiktokLiveStreams.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTiktokLiveStreams = "「 *LIST TIKTOK LIVE STREAM VIEWS + 50% LIKES* 」\n";

  dataTiktokLiveStreams.forEach(function (product) {
    if (product.kategori === "Tiktok Live Streams S4 [ Bonus Like ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTiktokLiveStreams += `=> ${product.layanan}\n`;
      listProductTiktokLiveStreams += `=> Level: ${lev}\n`;
      listProductTiktokLiveStreams += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTiktokLiveStreams += `=> *Kode : ${product.sid}*\n`;
      listProductTiktokLiveStreams += `=> Min : ${product.min}\n`;
      listProductTiktokLiveStreams += `=> Max : ${product.max}\n`;
      listProductTiktokLiveStreams += `=> Catatan : ${product.catatan}\n`;
      listProductTiktokLiveStreams += `=> Status : 🟢\n`;
      listProductTiktokLiveStreams += `=> Kategori : ${product.kategori}\n`;
      listProductTiktokLiveStreams += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTiktokLiveStreams);
  break;
}

case 'tiktoklivecomments1':
case 'tlivecomments1': {
  const fs = require('fs');
  let dataTikTokLiveComments;

  try {
    dataTikTokLiveComments = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokLiveComments.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokLiveComments = "「 *LIST TIKTOK LIVE STREAM COMMENTS S1* 」\n";

  dataTikTokLiveComments.forEach(function (product) {
    if (product.kategori === "TikTok Live Comment") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokLiveComments += `=> ${product.layanan}\n`;
      listProductTikTokLiveComments += `=> Level: ${lev}\n`;
      listProductTikTokLiveComments += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokLiveComments += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokLiveComments += `=> Min : ${product.min}\n`;
      listProductTikTokLiveComments += `=> Max : ${product.max}\n`;
      listProductTikTokLiveComments += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokLiveComments += `=> Status : 🟢\n`;
      listProductTikTokLiveComments += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokLiveComments += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokLiveComments);
  break;
}

case 'tiktoklivestreams5':
case 'tlivestreams5': {
  const fs = require('fs');
  let dataTikTokLiveStreams;

  try {
    dataTikTokLiveStreams = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokLiveStreams.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokLiveStreams = "「 *LIST TIKTOK LIVE STREAM VIEWS [ CHEAPEST - LOW QUALITY ]* 」\n";

  dataTikTokLiveStreams.forEach(function (product) {
    if (product.kategori === "Tiktok Live Streams S5 [ Cheapest - Exclusive ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokLiveStreams += `=> ${product.layanan}\n`;
      listProductTikTokLiveStreams += `=> Level: ${lev}\n`;
      listProductTikTokLiveStreams += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokLiveStreams += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokLiveStreams += `=> Min : ${product.min}\n`;
      listProductTikTokLiveStreams += `=> Max : ${product.max}\n`;
      listProductTikTokLiveStreams += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokLiveStreams += `=> Status : 🟢\n`;
      listProductTikTokLiveStreams += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokLiveStreams += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokLiveStreams);
  break;
}

case 'tiktoklivestreams2':
case 'tlivestreams2': {
  const fs = require('fs');
  let dataTikTokLiveStreams;

  try {
    dataTikTokLiveStreams = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokLiveStreams.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokLiveStreams = "「 *LIST TIKTOK LIVE STREAM VIEWS S2* 」\n";

  dataTikTokLiveStreams.forEach(function (product) {
    if (product.kategori === "Tiktok Live Streams S2") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokLiveStreams += `=> ${product.layanan}\n`;
      listProductTikTokLiveStreams += `=> Level: ${lev}\n`;
      listProductTikTokLiveStreams += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokLiveStreams += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokLiveStreams += `=> Min : ${product.min}\n`;
      listProductTikTokLiveStreams += `=> Max : ${product.max}\n`;
      listProductTikTokLiveStreams += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokLiveStreams += `=> Status : 🟢\n`;
      listProductTikTokLiveStreams += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokLiveStreams += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokLiveStreams);
  break;
}

case 'tiktoklivestreams3':
case 'tlivestreams3': {
  const fs = require('fs');
  let dataTikTokLiveStreams;

  try {
    dataTikTokLiveStreams = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokLiveStreams.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokLiveStreams = "「 *LIST TIKTOK LIVE STREAM VIEWS S3* 」\n";

  dataTikTokLiveStreams.forEach(function (product) {
    if (product.kategori === "Tiktok Live Streams S3") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokLiveStreams += `=> ${product.layanan}\n`;
      listProductTikTokLiveStreams += `=> Level: ${lev}\n`;
      listProductTikTokLiveStreams += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokLiveStreams += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokLiveStreams += `=> Min : ${product.min}\n`;
      listProductTikTokLiveStreams += `=> Max : ${product.max}\n`;
      listProductTikTokLiveStreams += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokLiveStreams += `=> Status : 🟢\n`;
      listProductTikTokLiveStreams += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokLiveStreams += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokLiveStreams);
  break;
}

case 'tiktoklivelike':
case 'tlivelike': {
  const fs = require('fs');
  let dataTikTokLiveLikes;

  try {
    dataTikTokLiveLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokLiveLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokLiveLikes = "「 *LIST TIKTOK LIVE LIKE [MAX 100K]* 」\n";

  dataTikTokLiveLikes.forEach(function (product) {
    if (product.kategori === "Tiktok Live Streams Like/Share") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokLiveLikes += `=> ${product.layanan}\n`;
      listProductTikTokLiveLikes += `=> Level: ${lev}\n`;
      listProductTikTokLiveLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokLiveLikes += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokLiveLikes += `=> Min : ${product.min}\n`;
      listProductTikTokLiveLikes += `=> Max : ${product.max}\n`;
      listProductTikTokLiveLikes += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokLiveLikes += `=> Status : 🟢\n`;
      listProductTikTokLiveLikes += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokLiveLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokLiveLikes);
  break;
}

case 'tiktokcomments3':
case 'tcomments3': {
  const fs = require('fs');
  let dataTikTokComments;

  try {
    dataTikTokComments = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokComments.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokComments = "「 *LIST TIKTOK KOMENTAR [ 3 HQ RANDOM KOMENTAR ]* 」\n";

  dataTikTokComments.forEach(function (product) {
    if (product.kategori === "Tiktok Comments") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokComments += `=> ${product.layanan}\n`;
      listProductTikTokComments += `=> Level: ${lev}\n`;
      listProductTikTokComments += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokComments += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokComments += `=> Min : ${product.min}\n`;
      listProductTikTokComments += `=> Max : ${product.max}\n`;
      listProductTikTokComments += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokComments += `=> Status : 🟢\n`;
      listProductTikTokComments += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokComments += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokComments);
  break;
}

case 'tiktoklivestreams1':
case 'tlivestreams1': {
  const fs = require('fs');
  let dataTikTokLiveStreams;

  try {
    dataTikTokLiveStreams = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokLiveStreams.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokLiveStreams = "「 *LIST TIKTOK LIVE STREAM VIEWS S1* 」\n";

  dataTikTokLiveStreams.forEach(function (product) {
    if (product.kategori === "Tiktok Live Streams S1") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokLiveStreams += `=> ${product.layanan}\n`;
      listProductTikTokLiveStreams += `=> Level: ${lev}\n`;
      listProductTikTokLiveStreams += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokLiveStreams += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokLiveStreams += `=> Min : ${product.min}\n`;
      listProductTikTokLiveStreams += `=> Max : ${product.max}\n`;
      listProductTikTokLiveStreams += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokLiveStreams += `=> Status : 🟢\n`;
      listProductTikTokLiveStreams += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokLiveStreams += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokLiveStreams);
  break;
}

case 'tiktokstorylikes':
case 'tstorylikes': {
  const fs = require('fs');
  let dataTikTokStory;

  try {
    dataTikTokStory = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTikTokStory.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTikTokStory = "「 *LIST TIKTOK STORY LIKES* 」\n";

  dataTikTokStory.forEach(function (product) {
    if (product.kategori === "TikTok Story") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTikTokStory += `=> ${product.layanan}\n`;
      listProductTikTokStory += `=> Level: ${lev}\n`;
      listProductTikTokStory += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTikTokStory += `=> *Kode : ${product.sid}*\n`;
      listProductTikTokStory += `=> Min : ${product.min}\n`;
      listProductTikTokStory += `=> Max : ${product.max}\n`;
      listProductTikTokStory += `=> Catatan : ${product.catatan}\n`;
      listProductTikTokStory += `=> Status : 🟢\n`;
      listProductTikTokStory += `=> Kategori : ${product.kategori}\n`;
      listProductTikTokStory += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTikTokStory);
  break;
}

case 'instagramfollowersup1':
case 'ifollowersup1': {
  const fs = require('fs');
  let dataInstagramFollowers;

  try {
    dataInstagramFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramFollowers = "「 *LIST INSTAGRAM FOLLOWERS UP1 [ UPDATED ]* 」\n";

  dataInstagramFollowers.forEach(function (product) {
    if (product.kategori === "Instagram Followers [ Updated ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramFollowers += `=> ${product.layanan}\n`;
      listProductInstagramFollowers += `=> Level: ${lev}\n`;
      listProductInstagramFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramFollowers += `=> Min : ${product.min}\n`;
      listProductInstagramFollowers += `=> Max : ${product.max}\n`;
      listProductInstagramFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramFollowers += `=> Status : 🟢\n`;
      listProductInstagramFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramFollowers);
  break;
}

case 'instagramfollowersexclusive1':
case 'ifollowersexclusive1': {
  const fs = require('fs');
  let dataInstagramFollowers;

  try {
    dataInstagramFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramFollowers = "「 *LIST INSTAGRAM FOLLOWERS [ EXCLUSIVE 1 ]* 」\n";

  dataInstagramFollowers.forEach(function (product) {
    if (product.kategori === "Instagram Followers [ SERVICE EXCLUSIVE ]🔥🔥") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramFollowers += `=> ${product.layanan}\n`;
      listProductInstagramFollowers += `=> Level: ${lev}\n`;
      listProductInstagramFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramFollowers += `=> Min : ${product.min}\n`;
      listProductInstagramFollowers += `=> Max : ${product.max}\n`;
      listProductInstagramFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramFollowers += `=> Status : 🟢\n`;
      listProductInstagramFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramFollowers);
  break;
}

case 'instagramautolikesindonesia':
case 'iautolikesindo': {
  const fs = require('fs');
  let dataInstagramAutoLikes;

  try {
    dataInstagramAutoLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataInstagramAutoLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductInstagramAutoLikes = "「 *LIST INSTAGRAM AUTO LIKES INDONESIA* 」\n";

  dataInstagramAutoLikes.forEach(function (product) {
    if (product.kategori === "Instagram AUTO LIKE INDONESIA") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductInstagramAutoLikes += `=> ${product.layanan}\n`;
      listProductInstagramAutoLikes += `=> Level: ${lev}\n`;
      listProductInstagramAutoLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductInstagramAutoLikes += `=> *Kode : ${product.sid}*\n`;
      listProductInstagramAutoLikes += `=> Min : ${product.min}\n`;
      listProductInstagramAutoLikes += `=> Max : ${product.max}\n`;
      listProductInstagramAutoLikes += `=> Catatan : ${product.catatan}\n`;
      listProductInstagramAutoLikes += `=> Status : 🟢\n`;
      listProductInstagramAutoLikes += `=> Kategori : ${product.kategori}\n`;
      listProductInstagramAutoLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductInstagramAutoLikes);
  break;
}

case 'youtubeviewsjam17':
case 'yviewsjam17': {
  const fs = require('fs');
  let dataYoutubeViewsJam;

  try {
    dataYoutubeViewsJam = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeViewsJam.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeViewsJam = "「 *LIST YOUTUBE VIEWS S17 [ JAM TAYANG ]* 」\n";

  dataYoutubeViewsJam.forEach(function (product) {
    if (product.kategori === "Youtube View Jam Tayang") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeViewsJam += `=> ${product.layanan}\n`;
      listProductYoutubeViewsJam += `=> Level: ${lev}\n`;
      listProductYoutubeViewsJam += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeViewsJam += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeViewsJam += `=> Min : ${product.min}\n`;
      listProductYoutubeViewsJam += `=> Max : ${product.max}\n`;
      listProductYoutubeViewsJam += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeViewsJam += `=> Status : 🟢\n`;
      listProductYoutubeViewsJam += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeViewsJam += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeViewsJam);
  break;
}

case 'youtubelivestreamhq':
case 'ylivestreamhq': {
  const fs = require('fs');
  let dataYoutubeLiveStream;

  try {
    dataYoutubeLiveStream = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeLiveStream.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeLiveStream = "「 *LIST YOUTUBE LIVE STREAM [ HIGH QUALITY ]* 」\n";

  dataYoutubeLiveStream.forEach(function (product) {
    if (product.kategori === "YouTube Live Stream [ Harga Murah ] [ Premium Qual") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeLiveStream += `=> ${product.layanan}\n`;
      listProductYoutubeLiveStream += `=> Level: ${lev}\n`;
      listProductYoutubeLiveStream += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeLiveStream += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeLiveStream += `=> Min : ${product.min}\n`;
      listProductYoutubeLiveStream += `=> Max : ${product.max}\n`;
      listProductYoutubeLiveStream += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeLiveStream += `=> Status : 🟢\n`;
      listProductYoutubeLiveStream += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeLiveStream += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeLiveStream);
  break;
}

case 'youtubelivestreamhq':
case 'ylivestreamhq': {
  const fs = require('fs');
  let dataYoutubeLiveStream;

  try {
    dataYoutubeLiveStream = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeLiveStream.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeLiveStream = "「 *LIST YOUTUBE LIVE STREAM [ HIGH QUALITY ]* 」\n";

  dataYoutubeLiveStream.forEach(function (product) {
    if (product.kategori === "YouTube Live Stream [ Harga Murah ] [ Premium Quality - 100% ConCurrent ]  Server 4 [ work ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeLiveStream += `=> ${product.layanan}\n`;
      listProductYoutubeLiveStream += `=> Level: ${lev}\n`;
      listProductYoutubeLiveStream += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeLiveStream += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeLiveStream += `=> Min : ${product.min}\n`;
      listProductYoutubeLiveStream += `=> Max : ${product.max}\n`;
      listProductYoutubeLiveStream += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeLiveStream += `=> Status : 🟢\n`;
      listProductYoutubeLiveStream += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeLiveStream += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeLiveStream);
  break;
}

case 'youtubelivestreamlikes':
case 'ylivestreamlikes': {
  const fs = require('fs');
  let dataYoutubeLiveStream;

  try {
    dataYoutubeLiveStream = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeLiveStream.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeLiveStream = "「 *LIST YOUTUBE LIVE STREAM LIKES* 」\n";

  dataYoutubeLiveStream.forEach(function (product) {
    if (product.kategori === "Youtube Live Stream [ Comments/Likes ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeLiveStream += `=> ${product.layanan}\n`;
      listProductYoutubeLiveStream += `=> Level: ${lev}\n`;
      listProductYoutubeLiveStream += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeLiveStream += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeLiveStream += `=> Min : ${product.min}\n`;
      listProductYoutubeLiveStream += `=> Max : ${product.max}\n`;
      listProductYoutubeLiveStream += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeLiveStream += `=> Status : 🟢\n`;
      listProductYoutubeLiveStream += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeLiveStream += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeLiveStream);
  break;
}

case 'youtubelivestreamserver5':
case 'ylivestreamserver5': {
  const fs = require('fs');
  let dataYoutubeLiveStream;

  try {
    dataYoutubeLiveStream = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeLiveStream.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeLiveStream = "「 *LIST YOUTUBE LIVE STREAM VIEWS [ SERVER 5 ]* 」\n";

  dataYoutubeLiveStream.forEach(function (product) {
    if (product.kategori === "YouTube Live Stream [ Harga Super Murah ] [ 100% ConCurrent ] Server 5 [ work ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeLiveStream += `=> ${product.layanan}\n`;
      listProductYoutubeLiveStream += `=> Level: ${lev}\n`;
      listProductYoutubeLiveStream += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeLiveStream += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeLiveStream += `=> Min : ${product.min}\n`;
      listProductYoutubeLiveStream += `=> Max : ${product.max}\n`;
      listProductYoutubeLiveStream += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeLiveStream += `=> Status : 🟢\n`;
      listProductYoutubeLiveStream += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeLiveStream += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeLiveStream);
  break;
}

case 'youtubelivestream15min':
case 'ylivestream15min': {
  const fs = require('fs');
  let dataYoutubeLiveStream;

  try {
    dataYoutubeLiveStream = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeLiveStream.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeLiveStream = "「 *LIST YOUTUBE LIVE STREAM [ 15 MINUTES LIVE CONCURRENT ]* 」\n";

  dataYoutubeLiveStream.forEach(function (product) {
    if (product.kategori === "YouTube Live Stream [ Harga Murah ] [ 30 Minutes to 24 Hours] Server 2 [ work ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeLiveStream += `=> ${product.layanan}\n`;
      listProductYoutubeLiveStream += `=> Level: ${lev}\n`;
      listProductYoutubeLiveStream += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeLiveStream += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeLiveStream += `=> Min : ${product.min}\n`;
      listProductYoutubeLiveStream += `=> Max : ${product.max}\n`;
      listProductYoutubeLiveStream += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeLiveStream += `=> Status : 🟢\n`;
      listProductYoutubeLiveStream += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeLiveStream += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeLiveStream);
  break;
}

case 'youtubelivestreamhq30min':
case 'ylivestreamhq30min': {
  const fs = require('fs');
  let dataYoutubeLiveStream;

  try {
    dataYoutubeLiveStream = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeLiveStream.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeLiveStream = "「 *LIST YOUTUBE LIVE STREAM [ HIGH QUALITY ]* 」\n";

  dataYoutubeLiveStream.forEach(function (product) {
    if (product.kategori === "YouTube Live Stream [ Harga Murah ] [ 30 Minutes to 24 Hours] Server 3 [ work ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeLiveStream += `=> ${product.layanan}\n`;
      listProductYoutubeLiveStream += `=> Level: ${lev}\n`;
      listProductYoutubeLiveStream += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeLiveStream += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeLiveStream += `=> Min : ${product.min}\n`;
      listProductYoutubeLiveStream += `=> Max : ${product.max}\n`;
      listProductYoutubeLiveStream += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeLiveStream += `=> Status : 🟢\n`;
      listProductYoutubeLiveStream += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeLiveStream += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeLiveStream);
  break;
}

case 'youtubeadsviewsserver1':
case 'yadsviewsserver1': {
  const fs = require('fs');
  let dataYoutubeViewsBigOrder;

  try {
    dataYoutubeViewsBigOrder = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeViewsBigOrder.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeViewsBigOrder = "「 *LIST YOUTUBE ADS VIEWS SERVER 1* 」\n";

  dataYoutubeViewsBigOrder.forEach(function (product) {
    if (product.kategori === "Youtube Views [ BIG ORDER ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeViewsBigOrder += `=> ${product.layanan}\n`;
      listProductYoutubeViewsBigOrder += `=> Level: ${lev}\n`;
      listProductYoutubeViewsBigOrder += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeViewsBigOrder += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeViewsBigOrder += `=> Min : ${product.min}\n`;
      listProductYoutubeViewsBigOrder += `=> Max : ${product.max}\n`;
      listProductYoutubeViewsBigOrder += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeViewsBigOrder += `=> Status : 🟢\n`;
      listProductYoutubeViewsBigOrder += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeViewsBigOrder += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeViewsBigOrder);
  break;
}

case 'youtubelivestreammax20k':
case 'ylivestreammax20k': {
  const fs = require('fs');
  let dataYoutubeLiveStream;

  try {
    dataYoutubeLiveStream = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeLiveStream.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeLiveStream = "「 *LIST YOUTUBE LIVE STREAM [ MAX 20K ]* 」\n";

  dataYoutubeLiveStream.forEach(function (product) {
    if (product.kategori === "YOUTUBE - Live Stream [ Cheapest Price ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeLiveStream += `=> ${product.layanan}\n`;
      listProductYoutubeLiveStream += `=> Level: ${lev}\n`;
      listProductYoutubeLiveStream += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeLiveStream += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeLiveStream += `=> Min : ${product.min}\n`;
      listProductYoutubeLiveStream += `=> Max : ${product.max}\n`;
      listProductYoutubeLiveStream += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeLiveStream += `=> Status : 🟢\n`;
      listProductYoutubeLiveStream += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeLiveStream += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeLiveStream);
  break;
}

case 'youtubelivestreamranking':
case 'ylivestreamranking': {
  const fs = require('fs');
  let dataYoutubeLiveStream;

  try {
    dataYoutubeLiveStream = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeLiveStream.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeLiveStream = "「 *LIST YOUTUBE LIVE STREAM VIEWS [ HIGH QUALITY ]* 」\n";

  dataYoutubeLiveStream.forEach(function (product) {
    if (product.kategori === "Youtube Live Stream [ BEST FOR RANKING LIVE ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeLiveStream += `=> ${product.layanan}\n`;
      listProductYoutubeLiveStream += `=> Level: ${lev}\n`;
      listProductYoutubeLiveStream += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeLiveStream += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeLiveStream += `=> Min : ${product.min}\n`;
      listProductYoutubeLiveStream += `=> Max : ${product.max}\n`;
      listProductYoutubeLiveStream += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeLiveStream += `=> Status : 🟢\n`;
      listProductYoutubeLiveStream += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeLiveStream += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeLiveStream);
  break;
}

case 'youtubeviewshr':
case 'yviewshr': {
  const fs = require('fs');
  let dataYoutubeViewsHR;

  try {
    dataYoutubeViewsHR = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataYoutubeViewsHR.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductYoutubeViewsHR = "「 *LIST YOUTUBE VIEWS [ HR ]* 」\n";

  dataYoutubeViewsHR.forEach(function (product) {
    if (product.kategori === "Youtube Views [ HR ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductYoutubeViewsHR += `=> ${product.layanan}\n`;
      listProductYoutubeViewsHR += `=> Level: ${lev}\n`;
      listProductYoutubeViewsHR += `=> Harga: Rp ${hargaFinal}\n`;
      listProductYoutubeViewsHR += `=> *Kode : ${product.sid}*\n`;
      listProductYoutubeViewsHR += `=> Min : ${product.min}\n`;
      listProductYoutubeViewsHR += `=> Max : ${product.max}\n`;
      listProductYoutubeViewsHR += `=> Catatan : ${product.catatan}\n`;
      listProductYoutubeViewsHR += `=> Status : 🟢\n`;
      listProductYoutubeViewsHR += `=> Kategori : ${product.kategori}\n`;
      listProductYoutubeViewsHR += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductYoutubeViewsHR);
  break;
}

case 'telegrampartypopper':
case 'tpartypopper': {
  const fs = require('fs');
  let dataTelegramReactions;

  try {
    dataTelegramReactions = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTelegramReactions.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTelegramReactions = "「 *LIST TELEGRAM PARTYPOPPER REACTIONS* 」\n";

  dataTelegramReactions.forEach(function (product) {
    if (product.kategori === "Telegram Reactions") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTelegramReactions += `=> ${product.layanan}\n`;
      listProductTelegramReactions += `=> Level: ${lev}\n`;
      listProductTelegramReactions += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTelegramReactions += `=> *Kode : ${product.sid}*\n`;
      listProductTelegramReactions += `=> Min : ${product.min}\n`;
      listProductTelegramReactions += `=> Max : ${product.max}\n`;
      listProductTelegramReactions += `=> Catatan : ${product.catatan}\n`;
      listProductTelegramReactions += `=> Status : 🟢\n`;
      listProductTelegramReactions += `=> Kategori : ${product.kategori}\n`;
      listProductTelegramReactions += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTelegramReactions);
  break;
}

case 'telegramautopostview':
case 'tautopostview': {
  const fs = require('fs');
  let dataTelegramAutoPostView;

  try {
    dataTelegramAutoPostView = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTelegramAutoPostView.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTelegramAutoPostView = "「 *LIST TELEGRAM AUTO POST VIEW ( FUTURE 5 POSTS )* 」\n";

  dataTelegramAutoPostView.forEach(function (product) {
    if (product.kategori === "Telegram auto post view ( Future/masa depan )") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTelegramAutoPostView += `=> ${product.layanan}\n`;
      listProductTelegramAutoPostView += `=> Level: ${lev}\n`;
      listProductTelegramAutoPostView += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTelegramAutoPostView += `=> *Kode : ${product.sid}*\n`;
      listProductTelegramAutoPostView += `=> Min : ${product.min}\n`;
      listProductTelegramAutoPostView += `=> Max : ${product.max}\n`;
      listProductTelegramAutoPostView += `=> Catatan : ${product.catatan}\n`;
      listProductTelegramAutoPostView += `=> Status : 🟢\n`;
      listProductTelegramAutoPostView += `=> Kategori : ${product.kategori}\n`;
      listProductTelegramAutoPostView += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTelegramAutoPostView);
  break;
}

case 'telegrambotstart':
case 'tbotstart': {
  const fs = require('fs');
  let dataTelegramPremiumServices;

  try {
    dataTelegramPremiumServices = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTelegramPremiumServices.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTelegramPremiumServices = "「 *LIST TELEGRAM BOT START [ PREMIUM ACCOUNT ]* 」\n";

  dataTelegramPremiumServices.forEach(function (product) {
    if (product.kategori === "Telegram Premium Services / Search Optimization") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTelegramPremiumServices += `=> ${product.layanan}\n`;
      listProductTelegramPremiumServices += `=> Level: ${lev}\n`;
      listProductTelegramPremiumServices += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTelegramPremiumServices += `=> *Kode : ${product.sid}*\n`;
      listProductTelegramPremiumServices += `=> Min : ${product.min}\n`;
      listProductTelegramPremiumServices += `=> Max : ${product.max}\n`;
      listProductTelegramPremiumServices += `=> Catatan : ${product.catatan}\n`;
      listProductTelegramPremiumServices += `=> Status : 🟢\n`;
      listProductTelegramPremiumServices += `=> Kategori : ${product.kategori}\n`;
      listProductTelegramPremiumServices += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTelegramPremiumServices);
  break;
}

case 'telegramstoryviews':
case 'tstoryviews': {
  const fs = require('fs');
  let dataTelegramStoryViews;

  try {
    dataTelegramStoryViews = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTelegramStoryViews.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTelegramStoryViews = "「 *LIST TELEGRAM STORY VIEWS [ HQ SERVICES ]* 」\n";

  dataTelegramStoryViews.forEach(function (product) {
    if (product.kategori === "Telegram Story Views") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTelegramStoryViews += `=> ${product.layanan}\n`;
      listProductTelegramStoryViews += `=> Level: ${lev}\n`;
      listProductTelegramStoryViews += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTelegramStoryViews += `=> *Kode : ${product.sid}*\n`;
      listProductTelegramStoryViews += `=> Min : ${product.min}\n`;
      listProductTelegramStoryViews += `=> Max : ${product.max}\n`;
      listProductTelegramStoryViews += `=> Catatan : ${product.catatan}\n`;
      listProductTelegramStoryViews += `=> Status : 🟢\n`;
      listProductTelegramStoryViews += `=> Kategori : ${product.kategori}\n`;
      listProductTelegramStoryViews += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTelegramStoryViews);
  break;
}

case 'facebooklivestreamviews':
case 'flivestreamviews': {
  const fs = require('fs');
  let dataFacebookLiveStream;

  try {
    dataFacebookLiveStream = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookLiveStream.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookLiveStream = "「 *LIST FACEBOOK LIVE STREAM VIEWS* 」\n";

  dataFacebookLiveStream.forEach(function (product) {
    if (product.kategori === "Facebook Live Stream - MP3") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookLiveStream += `=> ${product.layanan}\n`;
      listProductFacebookLiveStream += `=> Level: ${lev}\n`;
      listProductFacebookLiveStream += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookLiveStream += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookLiveStream += `=> Min : ${product.min}\n`;
      listProductFacebookLiveStream += `=> Max : ${product.max}\n`;
      listProductFacebookLiveStream += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookLiveStream += `=> Status : 🟢\n`;
      listProductFacebookLiveStream += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookLiveStream += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookLiveStream);
  break;
}

case 'facebookreelsviews':
case 'freelsviews': {
  const fs = require('fs');
  let dataFacebookReels;

  try {
    dataFacebookReels = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookReels.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookReels = "「 *LIST FACEBOOK REELS VIEWS S5* 」\n";

  dataFacebookReels.forEach(function (product) {
    if (product.kategori === "Facebook Reels Short Video") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookReels += `=> ${product.layanan}\n`;
      listProductFacebookReels += `=> Level: ${lev}\n`;
      listProductFacebookReels += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookReels += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookReels += `=> Min : ${product.min}\n`;
      listProductFacebookReels += `=> Max : ${product.max}\n`;
      listProductFacebookReels += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookReels += `=> Status : 🟢\n`;
      listProductFacebookReels += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookReels += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookReels);
  break;
}

case 'facebooklivestreamar1':
case 'flivestreamar1': {
  const fs = require('fs');
  let dataFacebookLiveStream;

  try {
    dataFacebookLiveStream = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookLiveStream.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookLiveStream = "「 *LIST FACEBOOK LIVE STREAM VIEW [30 MIN]* 」\n";

  dataFacebookLiveStream.forEach(function (product) {
    if (product.kategori === "Facebook Live Stream - MP1") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookLiveStream += `=> ${product.layanan}\n`;
      listProductFacebookLiveStream += `=> Level: ${lev}\n`;
      listProductFacebookLiveStream += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookLiveStream += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookLiveStream += `=> Min : ${product.min}\n`;
      listProductFacebookLiveStream += `=> Max : ${product.max}\n`;
      listProductFacebookLiveStream += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookLiveStream += `=> Status : 🟢\n`;
      listProductFacebookLiveStream += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookLiveStream += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookLiveStream);
  break;
}

case 'facebooklivestreams1':
case 'flivestreams1': {
  const fs = require('fs');
  let dataFacebookLiveStreamS1;

  try {
    dataFacebookLiveStreamS1 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookLiveStreamS1.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookLiveStreamS1 = "「 *LIST FACEBOOK LIVE STREAM VIEWS [ 300 MINUTES ]* 」\n";

  dataFacebookLiveStreamS1.forEach(function (product) {
    if (product.kategori === "Facebook Live Stream - S1") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookLiveStreamS1 += `=> ${product.layanan}\n`;
      listProductFacebookLiveStreamS1 += `=> Level: ${lev}\n`;
      listProductFacebookLiveStreamS1 += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookLiveStreamS1 += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookLiveStreamS1 += `=> Min : ${product.min}\n`;
      listProductFacebookLiveStreamS1 += `=> Max : ${product.max}\n`;
      listProductFacebookLiveStreamS1 += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookLiveStreamS1 += `=> Status : 🟢\n`;
      listProductFacebookLiveStreamS1 += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookLiveStreamS1 += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookLiveStreamS1);
  break;
}

case 'facebooklivestreamsupercheap':
case 'flivestreamcheap': {
  const fs = require('fs');
  let dataFacebookLiveStream;

  try {
    dataFacebookLiveStream = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookLiveStream.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookLiveStream = "「 *LIST FACEBOOK LIVE STREAM VIEWS [ 15 MINUTES ]* 」\n";

  dataFacebookLiveStream.forEach(function (product) {
    if (product.kategori === "Facebook Live Stream") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookLiveStream += `=> ${product.layanan}\n`;
      listProductFacebookLiveStream += `=> Level: ${lev}\n`;
      listProductFacebookLiveStream += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookLiveStream += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookLiveStream += `=> Min : ${product.min}\n`;
      listProductFacebookLiveStream += `=> Max : ${product.max}\n`;
      listProductFacebookLiveStream += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookLiveStream += `=> Status : 🟢\n`;
      listProductFacebookLiveStream += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookLiveStream += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookLiveStream);
  break;
}

case 'facebookgroupmember':
case 'fgroupmember': {
  const fs = require('fs');
  let dataFacebookGroupMember;

  try {
    dataFacebookGroupMember = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookGroupMember.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookGroupMember = "「 *LIST FACEBOOK GROUP MEMBER SERVER 10* 」\n";

  dataFacebookGroupMember.forEach(function (product) {
    if (product.kategori === "Facebook Group Member") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookGroupMember += `=> ${product.layanan}\n`;
      listProductFacebookGroupMember += `=> Level: ${lev}\n`;
      listProductFacebookGroupMember += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookGroupMember += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookGroupMember += `=> Min : ${product.min}\n`;
      listProductFacebookGroupMember += `=> Max : ${product.max}\n`;
      listProductFacebookGroupMember += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookGroupMember += `=> Status : 🟢\n`;
      listProductFacebookGroupMember += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookGroupMember += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookGroupMember);
  break;
}

case 'facebooklivestreamar2':
case 'flivestreamar2': {
  const fs = require('fs');
  let dataFacebookLiveStream;

  try {
    dataFacebookLiveStream = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookLiveStream.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookLiveStream = "「 *LIST FACEBOOK LIVE STREAM VIEW [30 MIN]* 」\n";

  dataFacebookLiveStream.forEach(function (product) {
    if (product.kategori === "Facebook Live Stream - MP2") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookLiveStream += `=> ${product.layanan}\n`;
      listProductFacebookLiveStream += `=> Level: ${lev}\n`;
      listProductFacebookLiveStream += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookLiveStream += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookLiveStream += `=> Min : ${product.min}\n`;
      listProductFacebookLiveStream += `=> Max : ${product.max}\n`;
      listProductFacebookLiveStream += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookLiveStream += `=> Status : 🟢\n`;
      listProductFacebookLiveStream += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookLiveStream += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookLiveStream);
  break;
}

case 'facebookpostkomentar':
case 'fpostkomentar': {
  const fs = require('fs');
  let dataFacebookComments;

  try {
    dataFacebookComments = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookComments.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookComments = "「 *LIST FACEBOOK PHOTO / POST KOMENTAR SERVER 4* 」\n";

  dataFacebookComments.forEach(function (product) {
    if (product.kategori === "Facebook Comments") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookComments += `=> ${product.layanan}\n`;
      listProductFacebookComments += `=> Level: ${lev}\n`;
      listProductFacebookComments += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookComments += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookComments += `=> Min : ${product.min}\n`;
      listProductFacebookComments += `=> Max : ${product.max}\n`;
      listProductFacebookComments += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookComments += `=> Status : 🟢\n`;
      listProductFacebookComments += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookComments += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookComments);
  break;
}

case 'facebookpagefollowers':
case 'fpagefollowers': {
  const fs = require('fs');
  let dataFacebookPageFollowers;

  try {
    dataFacebookPageFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookPageFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookPageFollowers = "「 *LIST FACEBOOK PAGE FOLLOWERS SERVER 6* 」\n";

  dataFacebookPageFollowers.forEach(function (product) {
    if (product.kategori === "Facebook Page Likes & Page Followers") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookPageFollowers += `=> ${product.layanan}\n`;
      listProductFacebookPageFollowers += `=> Level: ${lev}\n`;
      listProductFacebookPageFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookPageFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookPageFollowers += `=> Min : ${product.min}\n`;
      listProductFacebookPageFollowers += `=> Max : ${product.max}\n`;
      listProductFacebookPageFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookPageFollowers += `=> Status : 🟢\n`;
      listProductFacebookPageFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookPageFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookPageFollowers);
  break;
}

case 'facebookvideovip':
case 'fvideovip': {
  const fs = require('fs');
  let dataFacebookVideoViews;

  try {
    dataFacebookVideoViews = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookVideoViews.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookVideoViews = "「 *LIST FACEBOOK VIDEO VIEWS V5 [ VIP ]* 」\n";

  dataFacebookVideoViews.forEach(function (product) {
    if (product.kategori === "Facebook 60k - 600k Minute Watchtime") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookVideoViews += `=> ${product.layanan}\n`;
      listProductFacebookVideoViews += `=> Level: ${lev}\n`;
      listProductFacebookVideoViews += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookVideoViews += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookVideoViews += `=> Min : ${product.min}\n`;
      listProductFacebookVideoViews += `=> Max : ${product.max}\n`;
      listProductFacebookVideoViews += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookVideoViews += `=> Status : 🟢\n`;
      listProductFacebookVideoViews += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookVideoViews += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookVideoViews);
  break;
}

case 'facebookstoryviews':
case 'fstoryviews': {
  const fs = require('fs');
  let dataFacebookStoryViews;

  try {
    dataFacebookStoryViews = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookStoryViews.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookStoryViews = "「 *LIST FACEBOOK STORY VIEWS AR1* 」\n";

  dataFacebookStoryViews.forEach(function (product) {
    if (product.kategori === "Facebook Story Views") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookStoryViews += `=> ${product.layanan}\n`;
      listProductFacebookStoryViews += `=> Level: ${lev}\n`;
      listProductFacebookStoryViews += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookStoryViews += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookStoryViews += `=> Min : ${product.min}\n`;
      listProductFacebookStoryViews += `=> Max : ${product.max}\n`;
      listProductFacebookStoryViews += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookStoryViews += `=> Status : 🟢\n`;
      listProductFacebookStoryViews += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookStoryViews += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookStoryViews);
  break;
}

case 'facebookpostshare':
case 'fpostshare': {
  const fs = require('fs');
  let dataFacebookPostShares;

  try {
    dataFacebookPostShares = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataFacebookPostShares.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductFacebookPostShares = "「 *LIST FACEBOOK POST SHARE AR 2* 」\n";

  dataFacebookPostShares.forEach(function (product) {
    if (product.kategori === "Facebook Post Shares") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductFacebookPostShares += `=> ${product.layanan}\n`;
      listProductFacebookPostShares += `=> Level: ${lev}\n`;
      listProductFacebookPostShares += `=> Harga: Rp ${hargaFinal}\n`;
      listProductFacebookPostShares += `=> *Kode : ${product.sid}*\n`;
      listProductFacebookPostShares += `=> Min : ${product.min}\n`;
      listProductFacebookPostShares += `=> Max : ${product.max}\n`;
      listProductFacebookPostShares += `=> Catatan : ${product.catatan}\n`;
      listProductFacebookPostShares += `=> Status : 🟢\n`;
      listProductFacebookPostShares += `=> Kategori : ${product.kategori}\n`;
      listProductFacebookPostShares += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductFacebookPostShares);
  break;
}

case 'whatsappchannelmembers':
case 'wchannelmembers': {
  const fs = require('fs');
  let dataWhatsappChannelMembers;

  try {
    dataWhatsappChannelMembers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataWhatsappChannelMembers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductWhatsappChannelMembers = "「 *LIST WHATSAPP CHANNEL MEMBERS [ NEGARA INDIA ]* 」\n";

  dataWhatsappChannelMembers.forEach(function (product) {
    if (product.kategori === "Whatsapp Channel Member") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductWhatsappChannelMembers += `=> ${product.layanan}\n`;
      listProductWhatsappChannelMembers += `=> Level: ${lev}\n`;
      listProductWhatsappChannelMembers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductWhatsappChannelMembers += `=> *Kode : ${product.sid}*\n`;
      listProductWhatsappChannelMembers += `=> Min : ${product.min}\n`;
      listProductWhatsappChannelMembers += `=> Max : ${product.max}\n`;
      listProductWhatsappChannelMembers += `=> Catatan : ${product.catatan}\n`;
      listProductWhatsappChannelMembers += `=> Status : 🟢\n`;
      listProductWhatsappChannelMembers += `=> Kategori : ${product.kategori}\n`;
      listProductWhatsappChannelMembers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductWhatsappChannelMembers);
  break;
}

case 'whatsappchannelreaction':
case 'wchannelreaction': {
  const fs = require('fs');
  let dataWhatsappChannelReactions;

  try {
    dataWhatsappChannelReactions = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataWhatsappChannelReactions.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductWhatsappChannelReactions = "「 *LIST WHATSAPP CHANNEL POST REACTION [😂] [ MAX 200 ]* 」\n";

  dataWhatsappChannelReactions.forEach(function (product) {
    if (product.kategori === "Whatsapp Channel Emoji Reactions") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductWhatsappChannelReactions += `=> ${product.layanan}\n`;
      listProductWhatsappChannelReactions += `=> Level: ${lev}\n`;
      listProductWhatsappChannelReactions += `=> Harga: Rp ${hargaFinal}\n`;
      listProductWhatsappChannelReactions += `=> *Kode : ${product.sid}*\n`;
      listProductWhatsappChannelReactions += `=> Min : ${product.min}\n`;
      listProductWhatsappChannelReactions += `=> Max : ${product.max}\n`;
      listProductWhatsappChannelReactions += `=> Catatan : ${product.catatan}\n`;
      listProductWhatsappChannelReactions += `=> Status : 🟢\n`;
      listProductWhatsappChannelReactions += `=> Kategori : ${product.kategori}\n`;
      listProductWhatsappChannelReactions += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductWhatsappChannelReactions);
  break;
}

case 'shopeelivestreamviews':
case 'slivestreamviews': {
  const fs = require('fs');
  let dataShopeeLivestream;

  try {
    dataShopeeLivestream = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataShopeeLivestream.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductShopeeLivestream = "「 *LIST SHOPEE LIVESTREAM VIEWS [ INDONESIA ]* 」\n";

  dataShopeeLivestream.forEach(function (product) {
    if (product.kategori === "Shopee LiveStream") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductShopeeLivestream += `=> ${product.layanan}\n`;
      listProductShopeeLivestream += `=> Level: ${lev}\n`;
      listProductShopeeLivestream += `=> Harga: Rp ${hargaFinal}\n`;
      listProductShopeeLivestream += `=> *Kode : ${product.sid}*\n`;
      listProductShopeeLivestream += `=> Min : ${product.min}\n`;
      listProductShopeeLivestream += `=> Max : ${product.max}\n`;
      listProductShopeeLivestream += `=> Catatan : ${product.catatan}\n`;
      listProductShopeeLivestream += `=> Status : 🟢\n`;
      listProductShopeeLivestream += `=> Kategori : ${product.kategori}\n`;
      listProductShopeeLivestream += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductShopeeLivestream);
  break;
}

case 'twitterfollowersar1':
case 'tfollowersar1': {
  const fs = require('fs');
  let dataTwitterFollowers;

  try {
    dataTwitterFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTwitterFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTwitterFollowers = "「 *LIST TWITTER FOLLOWERS AR 1* 」\n";

  dataTwitterFollowers.forEach(function (product) {
    if (product.kategori === "Twitter Followers [ layanan baru ]") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTwitterFollowers += `=> ${product.layanan}\n`;
      listProductTwitterFollowers += `=> Level: ${lev}\n`;
      listProductTwitterFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTwitterFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductTwitterFollowers += `=> Min : ${product.min}\n`;
      listProductTwitterFollowers += `=> Max : ${product.max}\n`;
      listProductTwitterFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductTwitterFollowers += `=> Status : 🟢\n`;
      listProductTwitterFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductTwitterFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTwitterFollowers);
  break;
}

case 'twittertweetviews':
case 'ttweetviews': {
  const fs = require('fs');
  let dataTwitterTweetViews;

  try {
    dataTwitterTweetViews = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTwitterTweetViews.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTwitterTweetViews = "「 *LIST TWITTER TWEET VIEWS SERVER 1* 」\n";

  dataTwitterTweetViews.forEach(function (product) {
    if (product.kategori === "Twitter Tweet view") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTwitterTweetViews += `=> ${product.layanan}\n`;
      listProductTwitterTweetViews += `=> Level: ${lev}\n`;
      listProductTwitterTweetViews += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTwitterTweetViews += `=> *Kode : ${product.sid}*\n`;
      listProductTwitterTweetViews += `=> Min : ${product.min}\n`;
      listProductTwitterTweetViews += `=> Max : ${product.max}\n`;
      listProductTwitterTweetViews += `=> Catatan : ${product.catatan}\n`;
      listProductTwitterTweetViews += `=> Status : 🟢\n`;
      listProductTwitterTweetViews += `=> Kategori : ${product.kategori}\n`;
      listProductTwitterTweetViews += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTwitterTweetViews);
  break;
}

case 'threadsfollowers':
case 'tfollowers': {
  const fs = require('fs');
  let dataThreadsFollowers;

  try {
    dataThreadsFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataThreadsFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductThreadsFollowers = "「 *LIST THREADS FOLLOWERS S1* 」\n";

  dataThreadsFollowers.forEach(function (product) {
    if (product.kategori === "Threads Followers") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductThreadsFollowers += `=> ${product.layanan}\n`;
      listProductThreadsFollowers += `=> Level: ${lev}\n`;
      listProductThreadsFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductThreadsFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductThreadsFollowers += `=> Min : ${product.min}\n`;
      listProductThreadsFollowers += `=> Max : ${product.max}\n`;
      listProductThreadsFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductThreadsFollowers += `=> Status : 🟢\n`;
      listProductThreadsFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductThreadsFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductThreadsFollowers);
  break;
}

case 'threadslikes':
case 'tlikes': {
  const fs = require('fs');
  let dataThreadsLikes;

  try {
    dataThreadsLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataThreadsLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductThreadsLikes = "「 *LIST THREADS LIKES S1* 」\n";

  dataThreadsLikes.forEach(function (product) {
    if (product.kategori === "Threads Likes") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductThreadsLikes += `=> ${product.layanan}\n`;
      listProductThreadsLikes += `=> Level: ${lev}\n`;
      listProductThreadsLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductThreadsLikes += `=> *Kode : ${product.sid}*\n`;
      listProductThreadsLikes += `=> Min : ${product.min}\n`;
      listProductThreadsLikes += `=> Max : ${product.max}\n`;
      listProductThreadsLikes += `=> Catatan : ${product.catatan}\n`;
      listProductThreadsLikes += `=> Status : 🟢\n`;
      listProductThreadsLikes += `=> Kategori : ${product.kategori}\n`;
      listProductThreadsLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductThreadsLikes);
  break;
}

case 'threadscomments':
case 'tcomments': {
  const fs = require('fs');
  let dataThreadsComments;

  try {
    dataThreadsComments = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataThreadsComments.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductThreadsComments = "「 *LIST THREADS CUSTOM COMMENTS S1* 」\n";

  dataThreadsComments.forEach(function (product) {
    if (product.kategori === "Threads Comments") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductThreadsComments += `=> ${product.layanan}\n`;
      listProductThreadsComments += `=> Level: ${lev}\n`;
      listProductThreadsComments += `=> Harga: Rp ${hargaFinal}\n`;
      listProductThreadsComments += `=> *Kode : ${product.sid}*\n`;
      listProductThreadsComments += `=> Min : ${product.min}\n`;
      listProductThreadsComments += `=> Max : ${product.max}\n`;
      listProductThreadsComments += `=> Catatan : ${product.catatan}\n`;
      listProductThreadsComments += `=> Status : 🟢\n`;
      listProductThreadsComments += `=> Kategori : ${product.kategori}\n`;
      listProductThreadsComments += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductThreadsComments);
  break;
}

case 'threadsreshare':
case 'treshare': {
  const fs = require('fs');
  let dataThreadsReshare;

  try {
    dataThreadsReshare = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataThreadsReshare.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductThreadsReshare = "「 *LIST THREADS RESHARE S1* 」\n";

  dataThreadsReshare.forEach(function (product) {
    if (product.kategori === "Threads Reshare") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductThreadsReshare += `=> ${product.layanan}\n`;
      listProductThreadsReshare += `=> Level: ${lev}\n`;
      listProductThreadsReshare += `=> Harga: Rp ${hargaFinal}\n`;
      listProductThreadsReshare += `=> *Kode : ${product.sid}*\n`;
      listProductThreadsReshare += `=> Min : ${product.min}\n`;
      listProductThreadsReshare += `=> Max : ${product.max}\n`;
      listProductThreadsReshare += `=> Catatan : ${product.catatan}\n`;
      listProductThreadsReshare += `=> Status : 🟢\n`;
      listProductThreadsReshare += `=> Kategori : ${product.kategori}\n`;
      listProductThreadsReshare += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductThreadsReshare);
  break;
}

case 'twitchfollowers':
case 'tfollowers': {
  const fs = require('fs');
  let dataTwitchFollowers;

  try {
    dataTwitchFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTwitchFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTwitchFollowers = "「 *LIST TWITCH FOLLOWERS SERVER 1* 」\n";

  dataTwitchFollowers.forEach(function (product) {
    if (product.kategori === "Twitch") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTitchFollowers += `=> ${product.layanan}\n`;
      listProductTwitchFollowers += `=> Level: ${lev}\n`;
      listProductTwitchFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTwitchFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductTwitchFollowers += `=> Min : ${product.min}\n`;
      listProductTwitchFollowers += `=> Max : ${product.max}\n`;
      listProductTwitchFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductTwitchFollowers += `=> Status : 🟢\n`;
      listProductTwitchFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductTwitchFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTwitchFollowers);
  break;
}

case 'snackvideofollowers':
case 'svfollowers': {
  const fs = require('fs');
  let dataSnackVideoFollowers;

  try {
    dataSnackVideoFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataSnackVideoFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductSnackVideoFollowers = "「 *LIST SNACK VIDEO FOLLOWERS SERVER 1* 」\n";

  dataSnackVideoFollowers.forEach(function (product) {
    if (product.kategori === "Snack Video Followers") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductSnackVideoFollowers += `=> ${product.layanan}\n`;
      listProductSnackVideoFollowers += `=> Level: ${lev}\n`;
      listProductSnackVideoFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductSnackVideoFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductSnackVideoFollowers += `=> Min : ${product.min}\n`;
      listProductSnackVideoFollowers += `=> Max : ${product.max}\n`;
      listProductSnackVideoFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductSnackVideoFollowers += `=> Status : 🟢\n`;
      listProductSnackVideoFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductSnackVideoFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductSnackVideoFollowers);
  break;
}

case 'snackvideolikes':
case 'svlikes': {
  const fs = require('fs');
  let dataSnackVideoLikes;

  try {
    dataSnackVideoLikes = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataSnackVideoLikes.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductSnackVideoLikes = "「 *LIST SNACK VIDEO LIKES SERVER 3* 」\n";

  dataSnackVideoLikes.forEach(function (product) {
    if (product.kategori === "Snack Video Likes") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductSnackVideoLikes += `=> ${product.layanan}\n`;
      listProductSnackVideoLikes += `=> Level: ${lev}\n`;
      listProductSnackVideoLikes += `=> Harga: Rp ${hargaFinal}\n`;
      listProductSnackVideoLikes += `=> *Kode : ${product.sid}*\n`;
      listProductSnackVideoLikes += `=> Min : ${product.min}\n`;
      listProductSnackVideoLikes += `=> Max : ${product.max}\n`;
      listProductSnackVideoLikes += `=> Catatan : ${product.catatan}\n`;
      listProductSnackVideoLikes += `=> Status : 🟢\n`;
      listProductSnackVideoLikes += `=> Kategori : ${product.kategori}\n`;
      listProductSnackVideoLikes += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductSnackVideoLikes);
  break;
}

case 'twitchliveviews':
case 'tliveviews': {
  const fs = require('fs');
  let dataTwitchLiveViews;

  try {
    dataTwitchLiveViews = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataTwitchLiveViews.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductTwitchLiveViews = "「 *LIST TWITCH LIVE VIEWS | 5 MINUTES* 」\n";

  dataTwitchLiveViews.forEach(function (product) {
    if (product.kategori === "Twitch Live Stream S1") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductTwitchLiveViews += `=> ${product.layanan}\n`;
      listProductTwitchLiveViews += `=> Level: ${lev}\n`;
      listProductTwitchLiveViews += `=> Harga: Rp ${hargaFinal}\n`;
      listProductTwitchLiveViews += `=> *Kode : ${product.sid}*\n`;
      listProductTwitchLiveViews += `=> Min : ${product.min}\n`;
      listProductTwitchLiveViews += `=> Max : ${product.max}\n`;
      listProductTwitchLiveViews += `=> Catatan : ${product.catatan}\n`;
      listProductTwitchLiveViews += `=> Status : 🟢\n`;
      listProductTwitchLiveViews += `=> Kategori : ${product.kategori}\n`;
      listProductTwitchLiveViews += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductTwitchLiveViews);
  break;
}

case 'linkedinfollowers':
case 'lfollowers': {
  const fs = require('fs');
  let dataLinkedInFollowers;

  try {
    dataLinkedInFollowers = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariesosmed.json'));
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return reply('Gagal membaca data. Silakan coba lagi nanti.');
  }

  let uphar = parseFloat(cek("upharga", m.sender)) / 100;
  if (isNaN(uphar)) {
    console.error('Nilai uphar tidak valid:', uphar);
    return reply('Kesalahan dalam nilai upharga. Silakan coba lagi.');
  }

  let lev = `${cek("level", m.sender)}`;
  dataLinkedInFollowers.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

  let listProductLinkedInFollowers = "「 *LIST LINKEDIN FOLLOWERS* 」\n";

  dataLinkedInFollowers.forEach(function (product) {
    if (product.kategori === "Linkedin Followers") {
      let harga = parseFloat(product.harga);
      let hargaFinal = (harga + (harga * uphar) + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
      listProductLinkedInFollowers += `=> ${product.layanan}\n`;
      listProductLinkedInFollowers += `=> Level: ${lev}\n`;
      listProductLinkedInFollowers += `=> Harga: Rp ${hargaFinal}\n`;
      listProductLinkedInFollowers += `=> *Kode : ${product.sid}*\n`;
      listProductLinkedInFollowers += `=> Min : ${product.min}\n`;
      listProductLinkedInFollowers += `=> Max : ${product.max}\n`;
      listProductLinkedInFollowers += `=> Catatan : ${product.catatan}\n`;
      listProductLinkedInFollowers += `=> Status : 🟢\n`;
      listProductLinkedInFollowers += `=> Kategori : ${product.kategori}\n`;
      listProductLinkedInFollowers += `=> Ketik : sosmed ${product.sid}|Link/Username\n\n`;
    }
  });

  reply(listProductLinkedInFollowers);
  break;
}



//==================================CASE REKAPAN==============================================
case "toplayanan": {
  const filePath = './Pengaturan/database/trxuser.json';

  try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      const allTransactions = JSON.parse(fileData);

      if (Array.isArray(allTransactions) && allTransactions.length > 0) {
          const productDetails = allTransactions.reduce((acc, transaction) => {
              const productName = transaction.produk;

              if (!acc[productName]) {
                  acc[productName] = {
                      count: 0,
                      totalHarga: 0
                  };
              }

              acc[productName].count += 1;
              acc[productName].totalHarga += transaction.harga; // Assuming the property name is 'Harga'

              return acc;
          }, {});

          const sortedProducts = Object.keys(productDetails).sort((a, b) => productDetails[b].count - productDetails[a].count);
          const topProducts = sortedProducts.slice(0, 10);

          const topProductsList = topProducts.map((product, index) => `𝗣𝗲𝗿𝗶𝗻𝗴𝗸𝗮𝘁 ${index + 1}\n𝗡𝗮𝗺𝗮 𝗣𝗿𝗼𝗱𝘂𝗸 : ${product}\n𝗝𝘂𝗺𝗹𝗮𝗵 𝗣𝗲𝗺𝗯𝗲𝗹𝗶𝗮𝗻 : ${productDetails[product].count}\n𝗧𝗼𝘁𝗮𝗹 𝗧𝗿𝗮𝗻𝘀𝗮𝗸𝘀𝗶 : ${formatmoney(productDetails[product].totalHarga)}\n`).join('\n');
          
          // Calculate total price across all products
          const totalPrice = Object.values(productDetails).reduce((total, product) => total + product.totalHarga, 0);

          reply(`𝗧𝗼𝗽 𝟭𝟬 𝗣𝗿𝗼𝗱𝘂𝗸 𝗕𝗲𝗿𝗱𝗮𝘀𝗮𝗿𝗸𝗮𝗻 𝗝𝘂𝗺𝗹𝗮𝗵 𝗣𝗲𝗺𝗯𝗲𝗹𝗶𝗮𝗻\n\n${topProductsList}`);
      } else {
          reply("Gagal, No transaction data found.");
      }
  } catch (error) {
      console.error('Error reading/parsing the JSON file:', error);
      reply("Gagal, Terjadi kesalahan saat memproses perintah.");
  }
  break;
}
case 'topuser': {
  const filePath = './Pengaturan/database/trxuser.json';

  try {
      // Read the JSON file
      const fileData = fs.readFileSync(filePath, 'utf8');
      const allUserData = JSON.parse(fileData);

      if (allUserData.length === 0) {
          return reply("Gagal, Tidak Ditemukan Data Transaksi");
      }

      // Create a map to store buyer information
      const buyerMap = new Map();

      // Initialize variables for overall totalHarga, totalHargaModal, totalProfit, totalTransactions
      let overallTotalHarga = 0;
      let overallTotalHargaModal = 0;
      let overallTotalProfit = 0;
      let overallTotalTransactions = 0;

      // Get the current month and year
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // January is 0
      const tauniyeu = currentDate.getFullYear();
      const currentYear = currentDate.getFullYear() % 100; // Extract last two digits of the year

      // Iterate through all transaction history to calculate totalHarga, totalHargaModal, totalProfit, and collect details
      allUserData.forEach(data => {
          // Extract the buyer without @s.whatsapp.net
          const buyerWithoutSuffix = data.buyer.split('@')[0];

          // Extract the transaction date
          const waktuComponents = data.waktu.split('/');
          const transactionDay = parseInt(waktuComponents[0], 10);
          const transactionMonth = parseInt(waktuComponents[1], 10);
          const transactionYear = parseInt(waktuComponents[2], 10);

          // Check if the transaction is in the current month and year
          if (transactionMonth === currentMonth && transactionYear === currentYear) {
              // Update overall totals
              overallTotalHarga += parseFloat(data.harga);
              overallTotalTransactions += 1;

              // Calculate totalHargaModal as the sum of harga_modal for each transaction
              const hargaModal = parseFloat(data.harga_modal);
              overallTotalHargaModal += isNaN(hargaModal) ? 0 : hargaModal;

              // Calculate profit for each transaction
              const profit = parseFloat(data.harga) - (isNaN(hargaModal) ? 0 : hargaModal);
              overallTotalProfit += profit;

              // Check if buyer is already in the map
              if (buyerMap.has(buyerWithoutSuffix)) {
                  // Update existing buyer's total transactions, total harga, total harga modal, and total profit
                  const buyerInfo = buyerMap.get(buyerWithoutSuffix);
                  buyerInfo.totalTransactions += 1;
                  buyerInfo.totalHarga += parseFloat(data.harga);
                  buyerInfo.totalHargaModal += isNaN(hargaModal) ? 0 : hargaModal;
                  buyerInfo.totalProfit += profit;
              } else {
                  // Add new buyer to the map
                  buyerMap.set(buyerWithoutSuffix, {
                      totalTransactions: 1,
                      totalHarga: parseFloat(data.harga),
                      totalHargaModal: isNaN(hargaModal) ? 0 : hargaModal,
                      totalProfit: profit,
                  });
              }
          }
      });

      // Sort the buyer list by totalProfit in descending order
      const sortedBuyerList = Array.from(buyerMap).sort((a, b) => b[1].totalTransactions - a[1].totalTransactions);
      // Format the overall totalHarga, totalHargaModal, totalProfit, and totalTransactions as currencies
      const formattedOverallTotalHarga = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(overallTotalHarga);
      const formattedOverallTotalHargaModal = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(overallTotalHargaModal);
      const formattedOverallTotalProfit = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(overallTotalProfit);

    const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];
const formattedCurrentMonth = monthNames[currentMonth - 1]; // Adjust month index
const formattedCurrentYear = currentYear;
const formattedtauniyeu = tauniyeu;
      const buyerList = sortedBuyerList.map(([buyer, info], index) => {
          const formattedTotalHarga = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
          }).format(info.totalHarga);

          return `𝗣𝗲𝗿𝗶𝗻𝗴𝗸𝗮𝘁 ${index + 1}\n𝗨𝘀𝗲𝗿 : ${buyer}\n𝗝𝘂𝗺𝗹𝗮𝗵 𝗢𝗿𝗱𝗲𝗿𝘀 : ${info.totalTransactions}\n𝗧𝗼𝘁𝗮𝗹 𝗕𝗲𝗹𝗮𝗻𝗷𝗮 : ${formattedTotalHarga}\n`;
      });

     const replyMessage = `𝗧𝗼𝗽 𝟭𝟬 𝗨𝘀𝗲𝗿 𝗕𝗲𝗿𝗱𝗮𝘀𝗮𝗿𝗸𝗮𝗻 𝗝𝘂𝗺𝗹𝗮𝗵 𝗢𝗿𝗱𝗲𝗿𝘀 𝗨𝗻𝘁𝘂𝗸 𝗕𝘂𝗹𝗮𝗻 ${formattedCurrentMonth} 𝗧𝗮𝗵𝘂𝗻 ${formattedtauniyeu}\n\n${buyerList.join('\n')}`;
      

      reply(replyMessage);
  } catch (error) {
      console.error('Error reading the transaction history file:', error);
      reply("Gagal, Tidak Dapat Memuat Data");
  }
  break;
}
case 'persen': {
  const args = text.split(" ");

  // Check if the command has both amount and percentage
  if (args.length !== 2) {
      return reply('Invalid format. Please use: persen <amount> <percentage>');
  }

  const amount = parseFloat(args[0]);
  const percentage = parseFloat(args[1].replace('%', ''));

  // Check if both amount and percentage are valid numbers
  if (isNaN(amount) || isNaN(percentage)) {
      return reply('Gagal, Jumlah atau persentase tidak valid. Harap berikan nomor yang valid.');
  }

  // Function to format number with commas
  const formatNumber = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Calculate the result
  const result = (amount * percentage) / 100;

  // Format amount and result with commas
  const formattedAmount = formatNumber(amount);
  const formattedResult = formatNumber(result);

  reply(`${formattedAmount} - ${percentage}% = ${formattedResult}`);
  break;
}
case 'cekriwayat': {
  const filePath = './Pengaturan/database/trxuser.json';
  try {
      // Read the JSON file
      const fileData = fs.readFileSync(filePath, 'utf8');
      const allUserData = JSON.parse(fileData);

      // Filter the data for the specific m.sender
      const userData = allUserData.filter(data => data.buyer === m.sender);

      if (userData.length === 0) {
          return reply("Gagal, Kamu Belum Memiliki Riwayat Transaksi.");
      }

      // Initialize variables for total harga and total transactions
      let totalHarga = 0;
      let totalTransactions = userData.length;

      // Iterate through the user's transaction history to calculate totalHarga
      userData.forEach(data => {
          totalHarga += parseFloat(data.harga);
});

      // Iterate through the user's transaction history to create historyText
      const historyText = userData.map((data, index) => {
          // Format the Harga as a number with currency symbol
          const formattedHarga = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
          }).format(data.harga);

          return `🛒 𝗢𝗿𝗱𝗲𝗿𝘀 𝗞𝗲 ${index + 1} : 
› 𝗡𝗮𝗺𝗮 𝗣𝗿𝗼𝗱𝘂𝗸 : ${data.produk}
› 𝗧𝗿𝘅𝗶𝗱 : ${data.ref_id}
› 𝗧𝘂𝗷𝘂𝗮𝗻 : ${data.tujuan}
› 𝗛𝗮𝗿𝗴𝗮 : ${formattedHarga}
› 𝗪𝗮𝗸𝘁𝘂 : ${data.jam} | ${data.waktu}
› 𝗦𝗻/𝗞𝗲𝘁 : ${data.invoice}\n`;
      });

      // Format the total Harga as a currency
      const formattedTotalHarga = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(totalHarga);

      // Include the total Harga and total transactions in the reply
      const replyMessage = ` 𝗥𝗜𝗪𝗔𝗬𝗔𝗧 𝗢𝗥𝗗𝗘𝗥𝗦 

𝗧𝗼𝘁𝗮𝗹 𝗢𝗿𝗱𝗲𝗿𝘀 : ${totalTransactions}
𝗝𝘂𝗺𝗹𝗮𝗵 𝗢𝗿𝗱𝗲𝗿𝘀 : ${formattedTotalHarga}

${historyText.join('\n')}`;

      reply(replyMessage);
  } catch (error) {
      console.error('Error reading the transaction history file:', error);
      reply("Gagal, Ada Masalah Ketika Membaca data, silahkan hubungi Admin");
  }
  break;
}
case 'riwayat': {
  const filePath = './Pengaturan/database/trxuser.json';
  let tanggalFrom = text.split(" ")[0];
  let tanggalTo = text.split(" ")[1];

  // Check if both date inputs are provided
  if (!tanggalFrom || !tanggalTo) {
      return reply(`Gagal, Masukan Tanggal Awal & Akhir.\nContoh: ${prefix}riwayat 10/11/23 11/11/23`);
  }

  try {
      // Read the JSON file
      const fileData = fs.readFileSync(filePath, 'utf8');
      const allUserData = JSON.parse(fileData);

      // Filter the data for the specific m.sender and within the date range
      const userData = allUserData.filter(data =>
          data.buyer === m.sender &&
          isWithinDateRange(data.waktu, tanggalFrom, tanggalTo)
      );

      if (userData.length === 0) {
          return reply(`Gagal, Tidak Ada Transaksi Yang Tercatat Pada Tanggal : ${tanggalFrom} - ${tanggalTo}`);
      }

      // Initialize variables for total harga and total transactions
      let totalHarga = 0;
      let totalTransactions = userData.length;

      // Iterate through the user's transaction history to calculate totalHarga
      userData.forEach(data => {
          totalHarga += parseFloat(data.harga);
      });

      // Iterate through the user's transaction history to create historyText
      const historyText = userData.map((data, index) => {
          // Format the Harga as a number with currency symbol
          const formattedHarga = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
          }).format(data.harga);

          return `🛒 𝗢𝗿𝗱𝗲𝗿𝘀 𝗞𝗲 ${index + 1} : 
› 𝗡𝗮𝗺𝗮 𝗣𝗿𝗼𝗱𝘂𝗸 : ${data.produk}
› 𝗧𝗿𝘅𝗶𝗱 : ${data.ref_id}
› 𝗧𝘂𝗷𝘂𝗮𝗻 : ${data.tujuan}
› 𝗛𝗮𝗿𝗴𝗮 : ${formattedHarga}
› 𝗪𝗮𝗸𝘁𝘂 : ${data.jam} | ${data.waktu}
› 𝗦𝗻/𝗞𝗲𝘁 : ${data.invoice}\n`;
      });

      // Format the total Harga as a currency
      const formattedTotalHarga = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(totalHarga);

      // Include the total Harga and total transactions in the reply
      const replyMessage = ` 𝗥𝗜𝗪𝗔𝗬𝗔𝗧 𝗢𝗥𝗗𝗘𝗥𝗦 

𝗧𝗼𝘁𝗮𝗹 𝗢𝗿𝗱𝗲𝗿𝘀 : ${totalTransactions}
𝗝𝘂𝗺𝗹𝗮𝗵 𝗢𝗿𝗱𝗲𝗿𝘀 : ${formattedTotalHarga}

${historyText.join('\n')}`;

      reply(replyMessage);
  } catch (error) {
      console.error('Error reading the transaction history file:', error);
       reply("Gagal, Ada Masalah Ketika Membaca data, silahkan hubungi Admin");
  }
  break;
}
case 'rekap': {
  if (!isOwner) return reply(mess.owner);

  const filePath = './Pengaturan/database/trxuser.json';

  try {
      // Read the JSON file
      const fileData = fs.readFileSync(filePath, 'utf8');
      const allUserData = JSON.parse(fileData);

      if (allUserData.length === 0) {
          return reply("Gagal, Tidak Ditemukan Data Transaksi");
      }

      // Create a map to store buyer information
      const buyerMap = new Map();

      // Initialize variables for overall totalHarga, totalHargaModal, totalProfit, totalTransactions
      let overallTotalHarga = 0;
      let overallTotalHargaModal = 0;
      let overallTotalProfit = 0;
      let overallTotalTransactions = 0;

      // Iterate through all transaction history to calculate totalHarga, totalHargaModal, totalProfit, and collect details
      allUserData.forEach(data => {
          // Extract the buyer without @s.whatsapp.net
          const buyerWithoutSuffix = data.buyer.split('@')[0];

          // Update overall totals
          overallTotalHarga += parseFloat(data.harga);
          overallTotalTransactions += 1;

          // Calculate totalHargaModal as the sum of harga_modal for each transaction
          const hargaModal = parseFloat(data.harga_modal);
          overallTotalHargaModal += isNaN(hargaModal) ? 0 : hargaModal;

          // Calculate profit for each transaction
          const profit = parseFloat(data.harga) - (isNaN(hargaModal) ? 0 : hargaModal);
          overallTotalProfit += profit;

          // Check if buyer is already in the map
          if (buyerMap.has(buyerWithoutSuffix)) {
              // Update existing buyer's total transactions, total harga, total harga modal, and total profit
              const buyerInfo = buyerMap.get(buyerWithoutSuffix);
              buyerInfo.totalTransactions += 1;
              buyerInfo.totalHarga += parseFloat(data.harga);
              buyerInfo.totalHargaModal += isNaN(hargaModal) ? 0 : hargaModal;
              buyerInfo.totalProfit += profit;
          } else {
              // Add new buyer to the map
              buyerMap.set(buyerWithoutSuffix, {
                  totalTransactions: 1,
                  totalHarga: parseFloat(data.harga),
                  totalHargaModal: isNaN(hargaModal) ? 0 : hargaModal,
                  totalProfit: profit,
              });
          }
      });

      // Sort the buyer list by totalProfit in descending order
      const sortedBuyerList = Array.from(buyerMap).sort((a, b) => b[1].totalProfit - a[1].totalProfit);

      // Format the overall totalHarga, totalHargaModal, totalProfit, and totalTransactions as currencies
      const formattedOverallTotalHarga = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(overallTotalHarga);
      const formattedOverallTotalHargaModal = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(overallTotalHargaModal);
      const formattedOverallTotalProfit = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(overallTotalProfit);

      // Create a list of buyers and their information including totalHargaModal and totalProfit
      const buyerList = sortedBuyerList.map(([buyer, info]) => {
          const formattedTotalHarga = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
          }).format(info.totalHarga);
          const formattedTotalHargaModal = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
          }).format(info.totalHargaModal);
          const formattedTotalProfit = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
          }).format(info.totalProfit);

          return `𝗨𝘀𝗲𝗿 : wa.me/${buyer}\n𝗧𝗼𝘁𝗮𝗹 𝗢𝗿𝗱𝗲𝗿𝘀 : ${info.totalTransactions}\n𝗢𝗺𝘀𝗲𝘁 : ${formattedTotalHarga}\n𝗠𝗼𝗱𝗮𝗹 : ${formattedTotalHargaModal}\n𝗣𝗿𝗼𝗳𝗶𝘁 : ${formattedTotalProfit}\n`;
      });

      // Include the overall totals, totalHargaModal, totalProfit, and sorted buyer list in the reply
      const replyMessage = ` 🛒 𝗥𝗘𝗞𝗔𝗣 𝗢𝗥𝗗𝗘𝗥𝗦\n\n\`\`\`𝗧𝗼𝘁𝗮𝗹 𝗢𝗿𝗱𝗲𝗿𝘀 : ${overallTotalTransactions}\n𝗢𝗺𝘀𝗲𝘁 : ${formattedOverallTotalHarga}\n𝗠𝗼𝗱𝗮𝗹 : ${formattedOverallTotalHargaModal}\n𝗣𝗿𝗼𝗳𝗶𝘁 : ${formattedOverallTotalProfit} \n====================\`\`\`\n\n${buyerList.join('\n')}`;

      reply(replyMessage);
  } catch (error) {
      console.error('Error reading the transaction history file:', error);
      reply("Gagal, Tidak dapat membaca data");
  }
  }
  break;

function isWithinDateRange(dateString, dateFrom, dateTo) {
  const date = moment(dateString, 'DD/MM/YY', true);
  return date.isBetween(moment(dateFrom, 'DD/MM/YY'), moment(dateTo, 'DD/MM/YY'), null, '[]');
}


  //=============================================== BATAS CASE ================================


default:
if (budy.startsWith('<')) {
if (!isOwner) return
try {
return reply(JSON.stringify(eval(`${args.join(' ')}`),null,'\t'))
} catch (e) {
reply(e)
}
}

if (budy.startsWith('vv')) {
if (!isOwner) return
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
reply(String(err))
}
}

if (budy.startsWith('uu')){
if (!isOwner) return
qur = budy.slice(2)
exec(qur, (err, stdout) => {
if (err) return reply(`${err}`)
if (stdout) {
reply(stdout)
}
})
}

if (isCmd && budy.toLowerCase() != undefined) {
if (m.chat.endsWith('broadcast')) return
if (m.isBaileys) return
let msgs = global.db.database
if (!(budy.toLowerCase() in msgs)) return
arie.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
}
}

} catch (err) {
console.log(util.format(err))
}
}