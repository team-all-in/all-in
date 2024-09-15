'use client'

import {useEffect } from "react";

export default function Discord() {
  const discordClientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
  const discordRedirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;
  const discordOAuthUrl = `https://discord.com/oauth2/authorize?client_id=${discordClientId}&redirect_uri=${discordRedirectUri}&response_type=code&scope=identify%20email`;

  const discordConnect = () => {
    window.location.href = discordOAuthUrl;

  };

  useEffect(() => {
    discordConnect();
  }
  , []);

  return <div>Discord</div>;
}
