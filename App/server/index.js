const { sendEmail } = require("./node-mailer");
const express = require("express");
const app = express();
const port = 3000;

const desktopComputer = String.fromCodePoint(0x1f5a5);
const ear = String.fromCodePoint(0x1f442);
const plane = String.fromCodePoint (0x1F6E9);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/email",  async (req, res) => {
  let emails = req.body?.emails;
  let business = req.body?.business;
  let emailStats = {};
  for (const email of emails) {
    try {
      console.log (`Sending ${plane}  email to: ${email}`)
      emailStats[email] = await sendEmail(email, business);

    } catch (e) {
      console.error(e);
      emailStats[email] = false;
    }
  }
  let values = Object. values (emailStats)
  res.send  (values.every (email_result =>email_result ===true ))
});

app.listen(port, () => {
  console.log(
    `Email Sending Server  ${desktopComputer}\nListening ${ear} at http://localhost:${port}`
  );
});
