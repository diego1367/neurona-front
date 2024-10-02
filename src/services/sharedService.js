import axios from 'axios';

const API_URL = "https://localhost:7089/api/Transferencia";

class sharedService {
  getAll() {
    return axios.get(API_URL);
  }

  create(data) {
    return axios.post(API_URL, data);
  }
}

const sharedServiceInstance = new sharedService();
export default sharedServiceInstance;