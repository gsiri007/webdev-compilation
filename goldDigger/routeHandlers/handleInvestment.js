import fs from 'node:fs/promises';
import path from 'node:path';

export const handleInvestment = async (request, response) => {
  let body = '';

  for await (const chunk of request) {
    body += chunk;
  }

  const investment = JSON.parse(body);
  const pathToData = path.join('data', 'investments.json');

  let investments = [];

  try {
    const existingData = await fs.readFile(pathToData, 'utf8');

    if (existingData) {
      investments = JSON.parse(existingData);
    }

  } catch (error) {
    if (!(error.code == 'ENOENT')) {
      console.log(error.message);

      response.statusCode = 422;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({response: 'Unprocessable Entity'}));

      return;
    }
  }

  investments.push(investment);

  try {
    await fs.writeFile(pathToData, JSON.stringify(investments, null, 2));

    response.statusCode = 201;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(investment));

  } catch (error) {
    console.log(error.message);

    response.statusCode = 422;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({response: 'Unprocessable Entity'}));
  }

}
