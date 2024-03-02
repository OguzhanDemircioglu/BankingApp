import axios from "axios";
import {BASE_URL} from "../store/Enums";
import Store from "../store";

const currentUser = Store.getState().user;

class TransactionService {

    callTransactionHistory(callback) {
        return axios.post(
            BASE_URL + '/transaction/getAllTransactions',
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + currentUser?.token,
                }
            }
        ).then(res => {
            callback(res.data);
        }).catch(err => console.log(err));
    }

    beginTransaction(formTransaction) {
        return axios.post(
            BASE_URL + '/transaction/save',
            formTransaction,
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + currentUser?.token,
                }
            }
        ).then(res => {
        }).catch(err => console.log(err));
    }
}

export default new TransactionService();