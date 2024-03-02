import axios from "axios";
import {BASE_URL} from "../store/Enums";
import Store from "../store";

const currentUser = Store.getState().user;

class AccountService {

    getAllAccounts(callback) {
        return axios.post(
            BASE_URL + '/account/getAllAccounts',
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + currentUser?.token,
                }
            }
        ).then(res => {
            callback(res.data)
        }).catch(err => console.log(err));
    }

    save(formData) {
        return axios.post(
            BASE_URL + '/account/save',
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + currentUser?.token,
                }
            }
        ).then(res => {
        }).catch(err => alert(err));
    }

    delete(deleteItem) {
        return axios.delete(
            BASE_URL + `/account/deleteAccountByNumber/${deleteItem}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + currentUser?.token,
                }
            }
        ).then(res => {
            window.location.reload();
        }).catch(err => alert("Transaction Kaydı Olan Account Silinemez"));
    }

    updateAccount(formUpdateData) {
        return axios.put(
            BASE_URL + '/account/updateAccount',
            formUpdateData,
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + currentUser?.token,
                }
            }
        ).then(res => {
            window.location.reload();
        }).catch(err => console.log(err));
    }
}

export default new AccountService();