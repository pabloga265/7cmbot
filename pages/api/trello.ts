import { NextApiRequest, NextApiResponse } from 'next';

const trelloApiKey = process.env.TRELLO_API_KEY
const trelloApiToken = process.env.TRELLO_API_TOKEN 
const requestIdList = process.env.REQUEST_ID_LIST
const qIdList = process.env.Q_ID_LIST

const addCheckList = async (card, number) => {
  const { id, due, idBoard, idList } = card
  const url = `https://api.trello.com/1/checklists?idCard=${id}&key=${trelloApiKey}&token=${trelloApiToken}&name=requestLeft`
  return await fetch(url, {method: 'POST'})
    .then(res => res.json())
    .then(res => populateCheckList(res, number))
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
  const response = await fetch(url, {method: 'POST'})
    .then(res => count === 1 ? res : await populateCheckList(checkList, count-1))
}

const modifyCheckList = async () => {}

const addBuildRequest = async (chatter, number) => {
  const url = `https://api.trello.com/1/cards?idList=${requestIdList}&key=${trelloApiKey}&token=${trelloApiToken}&name=${chatter}`
  const response = await fetch(url, {method: 'POST'})
    .then(res => res.json())
    .then(res => addCheckList(res, number))
    .finally(() => `${number} requests added for ${chatter}`)

  return response
}

const checkAvailableRequests = (chatter) => {}
const addBuild = (chatter, build) => {}
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
    const actionResponse = parseRequest(req.query);
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
