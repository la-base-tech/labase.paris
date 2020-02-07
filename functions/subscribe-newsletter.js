const dotenv = require('dotenv');

dotenv.config();

const fetch = require('cross-fetch');

const SENDINBLUE_API_ENDPOINT = 'https://api.sendinblue.com/v3/';
const { SENDINBLUE_API_KEY, SENDINBLUE_LIST_ID } = process.env;

async function sendInBlueRequest({ uri, method, body }) {
  const params = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': SENDINBLUE_API_KEY,
    },
  };
  if (body) {
    params.body = JSON.stringify(body);
  }
  const response = await fetch(`${SENDINBLUE_API_ENDPOINT}${uri}`, params);
  const data = await response.json();
  return data;
}

async function getContact(email) {
  const response = await sendInBlueRequest({
    uri: `contacts/${email}`,
    method: 'get',
  });
  if (!response || response.code === 'document_not_found') {
    return null;
  }
  return response;
}

function createContact(email) {
  return sendInBlueRequest({
    uri: 'contacts',
    method: 'post',
    body: {
      email,
      listIds: [Number.parseInt(SENDINBLUE_LIST_ID, 10)],
    },
  });
}

async function addContactToList(email) {
  const contact = await getContact(email);

  // Contact does not exist, create contact and add it to the list
  if (!contact) {
    createContact(email);
    return;
  }

  // Contact already in list
  if (contact.listIds.includes(Number.parseInt(SENDINBLUE_LIST_ID, 10))) {
    return;
  }

  // Add existing contact to list
  sendInBlueRequest({
    uri: `contacts/lists/${SENDINBLUE_LIST_ID}/contacts/add`,
    method: 'post',
    body: {
      emails: [email],
    },
  });
}

exports.handler = async event => {
  try {
    const data = JSON.parse(event.body);
    await addContactToList(data.email);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'ok' }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
