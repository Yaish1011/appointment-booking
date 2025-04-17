app.post("/book", (req, res) => {
  const { name, email, service, datetime } = req.body;

  const params = {
    Source: "yashmakode03@gmail.com", // <== Replace with your verified SES email
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
