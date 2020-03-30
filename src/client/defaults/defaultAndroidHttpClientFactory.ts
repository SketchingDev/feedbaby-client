import axios from "axios";
import {HttpClientFactory} from "../FeedBabyClient";

const TEN_SECONDS = 10 * 1000;

export const defaultAndroidHttpClientFactory: HttpClientFactory = (baseUrl: string) => axios.create({
    baseURL: baseUrl,
    timeout: TEN_SECONDS,
    headers: {"User-Agent": "okhttp/2.4.0"}
});
