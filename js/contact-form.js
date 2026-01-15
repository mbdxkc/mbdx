/**
 * ============================================================================
 * mBdx (mediaBrilliance digitalxtudio) - Contact Form Handler
 * ============================================================================
 * @project    mBdx - mediaBrilliance digitalxtudio website
 * @version    3.1
 * @author     valdez campos <dez@mediabrilliance.io>
 * @date       2026-01-15
 * @file       js/contact-form.js
 *
 * @desc       handles contact form submission via emailjs service.
 *             provides user feedback during submission process.
 *
 * @requires   - emailjs-com sdk (loaded before this script)
 *             - #contact-form element with name, email, message fields
 *             - #form-status element for status messages
 *
 * @config     emailjs credentials (from emailjs dashboard):
 *             - user id: tX81q_4yGbXnrQSJ9
 *             - service id: service_jdzvpxw
 *             - template id: template_zden0om
 *
 * @exports    none (iife - self-executing)
 * ============================================================================
 */

(function () {
  // -------------------------------------------------------------------------
  // 1. initialize emailjs with user id
  // -------------------------------------------------------------------------
  emailjs.init("tX81q_4yGbXnrQSJ9");

  // -------------------------------------------------------------------------
  // 2. get form elements
  // -------------------------------------------------------------------------
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  // exit if elements not found (not on contact page)
  if (!form || !status) return;

  // -------------------------------------------------------------------------
  // 3. form submission handler
  // -------------------------------------------------------------------------
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // show sending status (aria-live region announces to screen readers)
    status.textContent = "sending…";

    // send email via emailjs
    emailjs.send("service_jdzvpxw", "template_zden0om", {
      from_name: form.name.value,
      reply_to: form.email.value,
      message: form.message.value,
    })
    .then(() => {
      // success: clear form and show confirmation
      status.textContent = "message sent. thank you!";
      form.reset();
    })
    .catch(() => {
      // error: show error message
      status.textContent = "something went wrong. please try again later.";
    });
  });
})();
