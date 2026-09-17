
import CryptoJS from "crypto-js"
import config from "../../../webconfig.json"
export async function encrypt(id: string, secret_key: string) {
    let key = CryptoJS.enc.Utf8.parse(secret_key);
    let iv = CryptoJS.enc.Utf8.parse(secret_key);
    let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse((id)), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );
    return encrypted.toString();
}

export async function decrypt(
    encrypted: string,
    secret_key: string = config?.encrypt_secret
) {
    const key = CryptoJS.enc.Utf8.parse(secret_key);
    const iv = CryptoJS.enc.Utf8.parse(secret_key);

    const decrypted = CryptoJS.AES.decrypt(
        encrypted,
        key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
}
