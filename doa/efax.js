import { Pool } from '../DB/connection.js';
import { constants } from '../constants.js';

const DocumentsObject = {
  getUsers: async (data, cb) => {
    try {
      const query = 'SELECT * FROM users';
      const result = await Pool().query(query);
      console.log('Result:', result.rows); // Access result.rows to get the data
      cb(null, result.rows, constants.response_messages.get_success);
    } catch (err) {
      cb(err, null, constants.response_messages.error);
    }
  },
};

export default DocumentsObject;
