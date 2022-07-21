import { NextApiRequest, NextApiResponse } from 'next';

/*
Nightbot-Response-Url: https://api.nightbot.tv/1/channel/send/TVRRM05UazRNVGsyT1RnNE1TOWthWE5...

Nightbot-User: name=night&displayName=night&provider=twitch&providerId=11785491&userLevel=owner

Nightbot-Channel: name=night&displayName=Night&provider=twitch&providerId=11785491
*/

const addBuildRequest = (chatter, number) => {}
const checkAvailableRequests = (chatter) => {}
const addBuild = (chatter, build) => {}
const cleanBanked = (number) => {}

const channelRequests = (requestParam, requestAttributes) => ({
  addBuildRequest: (chatter, number) => addBuildRequest(chatter, number),
  checkAvailableRequests: (chatter) => checkAvailableRequests(chatter),
  addBuild: (chatter, build) => addBuild(chatter, build),
  cleanBanked: (number) => cleanBanked(number)
})

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

const parseRequest = (apiRequest: string) => {

}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const channel = parseNightbotChannel(
    req.headers['nightbot-channel'] as string
  );

  const user = parseNightbotUser(req.headers['nightbot-user'] as string);

  res
    .status(200)
    .send(
      `Hello! Your username is ${user.displayName} and the current channel is ${channel.displayName}. ${process.env.REQUEST_ID_LIST}`
    );
}
