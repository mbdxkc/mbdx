/**
 * ============================================================================
 * mBdx (mediaBrilliance digitalxtudio) - Email Obfuscation
 * ============================================================================
 * @project    mBdx - mediaBrilliance digitalxtudio website
 * @version    3.1
 * @author     valdez campos <dez@mediabrilliance.io>
 * @date       2026-01-15
 * @file       js/email.js
 *
 * @desc       obfuscates email address to reduce spam harvesting.
 *             assembles email from parts at runtime instead of having
 *             a complete mailto: link in the static html.
 *
 * @requires   - #email-link element in html
 *
 * @note       the html should contain a fallback email in case js fails:
 *             <a id="email-link" href="mailto:...">email@example.com</a>
 *
 * @exports    none (runs on DOMContentLoaded)
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------------------------
  // email parts - split to avoid simple scraping
  // -------------------------------------------------------------------------
  const user = "dez";
  const domain = "mediabrilliance.io";

  // -------------------------------------------------------------------------
  // assemble and inject email link
  // -------------------------------------------------------------------------
  const link = document.getElementById("email-link");

  if (link) {
    link.href = `mailto:${user}@${domain}`;
    link.textContent = `${user}@${domain}`;
  }
});
