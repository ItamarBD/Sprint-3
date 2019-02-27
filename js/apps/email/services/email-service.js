import utilService from '../../../services/util-service.js'
import storageService from '../../../services/storage-service.js'

export default {
    getMails,
    addMail,
    deletedMail
}

var gMails = [];
var MAILS_KEY = 'mails'

_createMails();

function addMail(newMail) {
    var mail = _createMail(newMail)
    gMails.push(mail);
    storageService.store(MAILS_KEY, gMails);
    return Promise.resolve(gMails);
}

function getMails() {
    var tempgMails = storageService.load(MAILS_KEY);
    if (tempgMails && tempgMails.length) {
        gMails = tempgMails;
    }
    storageService.store(MAILS_KEY, gMails);
    return Promise.resolve(gMails);
}

function _createMails() {
    gMails = storageService.load(MAILS_KEY);
    if (gMails && gMails.length) return;

    var mails = []
    for (let i = 0; i < 5; i++) {
        mails.push(_createMail({ subject: 'Wassap with Vue?' }))
    }
    storageService.store(MAILS_KEY, mails);
    gMails = mails;
}

function _createMail(newMail) {
    var uniqueId = utilService.sureUniqueId(gMails);
    return {
        id: uniqueId,
        sentTo: 'puki',
        sentFrom: 'muki',
        subject: newMail.subject,
        body: 'May I',
        isRead: false,
        sentAt: new Date().toLocaleString(),
    }
}

function deletedMail(mailId) {
    
    console.log('on delete', mailId)
    var mailIdx = gMails.findIndex(mail => mailId === mail.id)
    gMails.splice(mailIdx, 1)
    storageService.store(MAILS_KEY, gMails)
    return Promise.resolve()
}