(function () {
  emailjs.init("tX81q_4yGbXnrQSJ9"); // ← from EmailJS dashboard

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form || !status) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    status.textContent = "sending…";

    emailjs.send("service_jdzvpxw", "template_zden0om", {
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
