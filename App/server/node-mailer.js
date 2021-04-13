const nodemailer = require("nodemailer");
require("dotenv").config({
  path:
    "/Users/bilalzazai/Documents/School/honours project/CovidTracing/App/server/../.env",
});

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

let transport = nodemailer.createTransport({
  pool: true,
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});

async function sendEmail(recepientEmail, businessName) {
  if (recepientEmail === undefined) {
    throw new Error("recepientEmail is undefined");
  }

  let emailOPtions = {
    from: email,
    to: recepientEmail,
    subject: "Attention: Potential Covid-19 Outbreak",
    text: `Hello,\nUnfortunately, we regret to inform you of a reported Covid Outbreak at the following business: ${businessName}\nTo reduce the spread and impact of COVID-19, we continue to follow guidance from Health Canada.\nWe encourage you to review the Health Canada website for information about COVID-19, including its symptoms, how it spreads, and actions you can take to protect your health:\ncanada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/symptoms.html\n\n
    Thank you,
    Team Huella`,
    html: `<p>Hello,</p>
            <p>Unfortunately, we regret to inform you of a reported Covid Outbreak at the following business:<b>${businessName}</b></p><p>To reduce the spread and impact of COVID-19, we continue to follow guidance from Health Canada.</p>
            <p>We encourage you to review the Health Canada website for information about COVID-19, including its symptoms, how it spreads, and actions you can take to protect your health:</p> <p>canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/symptoms.html</p>
            <p>Thank you</p>
            <p>Team Huella</p>`,
  };
  let status;

  try {
    let response = await transport.sendMail(emailOPtions);
    status = response ? true : false;
    return status;
  } catch (e) {
    console.error(e);
    status = false;
    return status;
  }
}

//sendEmail ('email1').then (status => {console.log (status)}  ).catch (err=>{console.log(err)})

exports.sendEmail = sendEmail;
