import { NextApiRequest, NextApiResponse } from 'next';

const trelloApiKey = process.env.TRELLO_API_KEY
const trelloApiToken = process.env.TRELLO_API_TOKEN
const requestIdList = process.env.REQUEST_ID_LIST

const addCheckList = async (card) => {
  const { id, due, idBoard, idList } = card
  const url = `https://api.trello.com/1/checklists?idCard=${id}&key=${trelloApiKey}&token=${trelloApiToken}&name=requestLeft`
  const response = await fetch(url, {method: 'POST'}).then(addCheckList)

}

const populateCheckList = async (card) => {
  const { id, due, idBoard, idList } = card
    const url = `https://api.trello.com/1/checklists?idCard=${id}&key=${trelloApiKey}&token=${trelloApiToken}&name=requestLeft`
    const response = await fetch(url, {method: 'POST'}).then(addCheckList)
}

const modifyCheckList = async () => 

const addBuildRequest = async (chatter, number) => {
  const url = `https://api.trello.com/1/cards?idList=${requestIdList}&key=${trelloApiKey}&token=${trelloApiToken}&name=${chatter}`
  const response = await fetch(url, {method: 'POST'}).then(addCheckList)
}

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

const parseRequest = async (apiRequest: string) => {
  channelRequests()
  await 
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const chatter = parseNightbotUser(req.headers['nightbot-user'] as string);
  const parseRequest(req.query, user);

  res
    .status(200)
    .send(
      `Hello! Your username is ${user.displayName} and the current channel is ${channel.displayName}. ${JSON.stringify(req.query)}`
    );
}
