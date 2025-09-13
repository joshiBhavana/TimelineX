const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email;
  const displayName = user.displayName || "User";

  const msg = {
    to: email,
    from: "welcome@yourdomain.com",
    subject: "Welcome to TimelineX!",
    text: `Hi ${displayName}, welcome to TimelineX! 
We're excited to have you with us.`,
    html: `<h1>Welcome to TimelineX!</h1>
<p>Hi ${displayName}, we're excited you're here! 
Explore and enjoy the experience!</p>`,
  };


  return sgMail.send(msg)
      .then(() => console.log("Welcome email sent to", email))
      .catch((error) => console.error("Error sending email:", error));
});
