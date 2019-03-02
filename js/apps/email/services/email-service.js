import utilService from '../../../services/util-service.js'
import storageService from '../../../services/storage-service.js'

export default {
    getMails,
    addMail,
    deletedMail,
    getMailById,
    changeReadMarkService,
    saveMail,
}

var gMails = [];
var MAILS_KEY = 'mails'


function saveMail(UpdateMail){
    var mailIdx = gMails.findIndex(mail => UpdateMail.id === mail.id);
    gMails.splice(mailIdx, 1, UpdateMail);
    storageService.store(MAILS_KEY, gMails);
}

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
    } else {
        _createMails();
    }
    storageService.store(MAILS_KEY, gMails);
    return Promise.resolve(gMails);
}

function getMailById(mailId) {
    // ********************************** omer add 1 line below
    gMails = storageService.load(MAILS_KEY);
    var mail = gMails.find((mail) => {
        return mailId === mail.id
    })
    return Promise.resolve(mail)
}

function _createMails() {
    gMails = storageService.load(MAILS_KEY);
    if (gMails && gMails.length) return;

    var mails = []
    for (let i = 0; i < 5; i++) {
        mails.push(_createMail({ subject: 'Wassap with Vue?' }))
    }
    for (let i = 0; i < 5; i++) {
        mails.push(_createMail({ subject: 'aassap with Vue?' }))
    }
    storageService.store(MAILS_KEY, mails);
    gMails = mails;
}

function _createMail(newMail) {
    var uniqueId = utilService.sureUniqueId(gMails);

    return {
        id: uniqueId,
        sentTo: newMail.sentTo,
        sentFrom: newMail.sentFrom,
        subject: newMail.subject,
        body: newMail.body,
        isRead: false,
        sentAt: new Date().toLocaleString(),
        date: Date.now()
    }
}

function deletedMail(mailId) {
    console.log('on delete', mailId)
    var mailIdx = gMails.findIndex(mail => mailId === mail.id)
    gMails.splice(mailIdx, 1)
    storageService.store(MAILS_KEY, gMails)
    return Promise.resolve()
}

function changeReadMarkService(currMail) {
    console.log('mail from service is:',currMail)
    var mail = gMails.find((mail) => currMail.id === mail.id )
    mail.isRead = currMail.isRead;
    storageService.store(MAILS_KEY, gMails)
}