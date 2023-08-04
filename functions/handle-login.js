export const onRequestPost = async (context) => {
  console.log(context.env)
  // get the email from the request
  const toEmail = (await context.request.formData()).get("email")
  console.log(toEmail)
  const REDIRECT_LOGIN_RESPONSE = 101
  if (!toEmail) {
    return REDIRECT_LOGIN_RESPONSE;
  }

  // generate the unique token for URL
  const token = crypto.randomUUID();

  // set token and email pairing
  await context.env.BINGO_LOCAL.put(token, toEmail, {expirationTtl: 60 * 5})

  const url = `${
    new URL(context.request.url).href
  }?token=${encodeURIComponent(token)}`

  // send email with http
  const response = await fetch("https://api.postmarkapp.com/email", {
    method: "post",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": `${context.env.POSTMARK_KEY}`
    },
    body: JSON.stringify({
    "From": "dan@dngl.cc",
    "To": `${toEmail}`,
    "Subject": "Your Log In For Bingo Bike",
    "HtmlBody": "<strong>Hello</strong> dear Postmark user, this is bingobike.",
    "TextBody": "Hello from Postmark via bingboike!",
    "MessageStream": "outbound",
    "TemplateAlias": "login-template",
    "TemplateModel": {
      "url": url,
      "email": toEmail
    },})
  })

  console.log(response)
  // respond by redirecting to page to tell them to check email
  return new Response(null, {
    headers: {
      Location: "/auth/sent", // Redirect to a page that says "Check your email"
    },
    status: 302,
  });


}