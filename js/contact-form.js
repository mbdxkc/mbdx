(function () {
  emailjs.init("YOUR_PUBLIC_KEY"); // ← from EmailJS dashboard

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    status.textContent = "sending…";

    emailjs.send("service_jdzvpxw", "ts0lnuu", {
      from_name: form.name.value,
      reply_to: form.email.value,
      message: form.message.value,
    })
    .then(() => {
      status.textContent = "message sent. thank you!";
      form.reset();
    })
    .catch(() => {
      status.textContent = "something went wrong. please try again later.";
    });
  });
})();
