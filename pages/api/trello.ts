import { NextApiRequest, NextApiResponse } from 'next';

const trelloApiKey = process.env.TRELLO_API_KEY
const trelloApiToken = process.env.TRELLO_API_TOKEN 
const requestIdList = process.env.REQUEST_ID_LIST
const qIdList = process.env.Q_ID_LIST

const addCheckList = async (card, number) => {
  const { id, due, idBoard, idList } = card
  const url = `https://api.trello.com/1/checklists?idCard=${id}&key=${trelloApiKey}&token=${trelloApiToken}&name=requestLeft`
  const response = await fetch(url, {method: 'POST'})
    .then(res => res.json())
    .then(res => populateCheckList(res, number))

  return response
}

const populateCheckList = async (checkList, number) => {
  const {
    id,
    name,
    idBoard,
    idCard,
    pos,
    checkItems,
    limits,
  } = checkList;
  const count = parseInt(number);
  const url = `https://api.trello.com/1/checklists/${id}/checkItems/?name=request_${count}&key=${trelloApiKey}&token=${trelloApiToken}`
  await fetch(url, {method: 'POST'}).then(res=> res)
  

  return count !== 1 && await populateCheckList(checkList, count-1)
}

const modifyCheckList = async () => {}

const addBuildRequest = async (chatter, number) => {
  const url = `https://api.trello.com/1/cards?idList=${requestIdList}&key=${trelloApiKey}&token=${trelloApiToken}&name=${chatter}`
  const response = await fetch(url, {method: 'POST'})
    .then(res => res.json())
    .then(res => addCheckList(res, number))

  return `${number} requests added for ${chatter}`
}

const checkAvailableRequests = async (chatter) => {}

const addBuild = async (chatter, build) => {
  const [queryChatter, queryAction, ...rest] = decodeURI(build).split(" ");
  const buildString = encodeURI(`${chatter} - ${rest.join(" ")}`);

  const url = `https://api.trello.com/1/cards?idList=${qIdList}&key=${trelloApiKey}&token=${trelloApiToken}&name=${buildString}`

  const response = await fetch(url, {method: 'POST'})
    .then(res => res.json())

  return `Build added for ${chatter}`
}

const cleanQ = (number) => {}

const channelRequests = {
  add: (chatter, number) => addBuildRequest(chatter, number),
  check: (chatter) => checkAvailableRequests(chatter),
  build: (chatter, build) => addBuild(chatter, build),
  clean: (chatter, number) => cleanQ(number)
}

const parseRequest = async (apiRequest: any) => {
  const { action, chatter, params } = apiRequest;
  return channelRequests[action](chatter, params);
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try{
    const actionResponse = await parseRequest(req.query);
    res
    .status(200)
    .send(
      actionResponse
    );
  }catch(e){
    res
    .status(500)
    .send(
      `err ${JSON.stringify(e)}`
    );
  }
}
