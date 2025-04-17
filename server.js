const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const ses = new AWS.SES();
const app = express(); // Make sure the app is initialized here

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post("/book", (req, res) => {
  const { name, email, service, datetime } = req.body;

  const params = {
    Source: "yashmakode93@gmail.com", // Your verified SES email
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: { Data: "Your Appointment is Confirmed" },
      Body: {
        Html: {
          Data: `
            <h2>Hello ${name},</h2>
            <p>Your <b>${service}</b> appointment on <b>${datetime}</b> is confirmed.</p>
            <p>Thanks!<br>Appointment Team</p>
          `
        }
      }
    }
  };

  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.error("SES Error:", err);
      res.send("Error sending confirmation email.");
    } else {
      console.log("Email sent:", data);
      res.send("Appointment booked successfully. Confirmation email sent!");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
