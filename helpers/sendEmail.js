const nodemailer = require("nodemailer");
require("dotenv").config();

const { UKRNET_EMAIL, UKRNET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKRNET_EMAIL,
    pass: UKRNET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: UKRNET_EMAIL };
    await transport.sendMail(email);
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendEmail;
