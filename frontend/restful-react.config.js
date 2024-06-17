import camelCase from 'camelcase';
const BASE_URL = "https://localhost:44362/";
const ROOT_PATH = './src/api';
import { existsSync } from 'fs';

const API_LIST = [
  "Employees"
];

const onlyUpdateExisting = false;

function generateFetcher() {
  let apiObj = {};

  API_LIST.forEach((key) => {
    const camelCasedName = camelCase(key);

    const url = `${BASE_URL}/swagger/service:${key}/swagger.json`;
    const fileName = `${ROOT_PATH}/${camelCasedName}.tsx`;
    const apiName = `${camelCasedName}Api`;

    if (!onlyUpdateExisting || existsSync(fileName)) {
      apiObj[apiName] = {
        output: fileName,
        url: url,
      };
    }
  });
  return apiObj;
}

export default {
  ...generateFetcher(),
};