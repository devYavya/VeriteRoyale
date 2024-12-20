const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "royaleverite@gmail.com",
    pass: "lpdlaburnazvfyli",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to,subject,text) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '" Verite Royale "<royaleverite@gmail.com>', // sender address
    to,
    subject,
    text,
    // html: "<b>Hello world?</b>", // html body
  });
}
async function confirmMail(to,subject,text) {
    // send mail with defined transport object
    const newinfo = await transporter.confirmMail({
      from: '" Verite Royale "<royaleverite@gmail.com>', // sender address
      to,
      subject,
      text,
      // html: "<b>Hello world?</b>", // html body
    });
  }

module.exports = {sendMail, confirmMail};