import { NextApiRequest, NextApiResponse } from 'next';

/*
Nightbot-Response-Url: https://api.nightbot.tv/1/channel/send/TVRRM05UazRNVGsyT1RnNE1TOWthWE5...

Nightbot-User: name=night&displayName=night&provider=twitch&providerId=11785491&userLevel=owner

Nightbot-Channel: name=night&displayName=Night&provider=twitch&providerId=11785491
*/
const parseNightbotChannel = (channelParams: string) => {
  const params = new URLSearchParams(channelParams);

  return {
    name: params.get('name'),
    displayName: params.get('displayName'),
    provider: params.get('provider'),
    providerId: params.get('providerId')
  };
};

const parseNightbotUser = (userParams: string) => {
  const params = new URLSearchParams(userParams);

  return {
    name: params.get('name'),
    displayName: params.get('displayName'),
    provider: params.get('provider'),
    providerId: params.get('providerId'),
    userLevel: params.get('userLevel')
  };
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const channel = parseNightbotChannel(
    req.headers['nightbot-channel'] as string
  );

  const user = parseNightbotUser(req.headers['nightbot-user'] as string);

  res
    .status(200)
    .send(
      `Hello! Your username is ${user.displayName} and the current channel is ${channel.displayName}.`
    );
}
