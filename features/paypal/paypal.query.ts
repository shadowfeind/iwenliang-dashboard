export async function getPaypalAccessToken(): Promise<
  { access_token: string } | { error: string }
> {
  try {
    const response = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET_KEY}`
            ).toString("base64"),
        },
        body: "grant_type=client_credentials",
      }
    );

    if (!response.ok) return { error: "Failed to get access token" };

    const data = await response.json();
    console.log({ token: data.access_token });
    return { access_token: data.access_token };
  } catch (error) {
    console.log("Error from getPaypalAccessToken", error);
    return { error: "Failed to get access token" };
  }
}
