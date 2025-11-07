"use server"
import axios from 'axios';
import { AxiosError, AxiosResponse } from 'axios';
import { redirect } from 'next/navigation';
import { getActiveAccountId } from '../actions/account';
import { getBaseSoftwareId, getCurrentSoftwareId } from '../actions/software';
import { getTicket } from '../actions/auth';

interface IkonBaseApiProps {
    service: string;
    operation: string;
    arguments_?: any | null;
    accountId?: string | null;
    softwareId?: string | null;
    isTicketRequried?: boolean;
    isServerApi?: boolean;
}

// Create an Axios instance
export const axiosInstance = axios.create({
    baseURL: "https://ikoncloud-dev.keross.com/ikon-api"
});

async function ikonBaseApi({ service, operation, arguments_, accountId, softwareId, isTicketRequried = true, isServerApi = false }: IkonBaseApiProps): Promise<any> {
    //console.log("ikonBaseApi called with params: ", { service, operation, arguments_, accountId, softwareId, isTicketRequried });
    const queryParams = new URLSearchParams({
        inZip: String(false),
        outZip: String(true),
        inFormat: "freejson",
        outFormat: "freejson",
        service: service,
        operation: operation,
    });


    if (isTicketRequried) {
        const globalTicket = await getTicket()
        if (globalTicket) {
            queryParams.append('ticket', globalTicket);

            if (accountId) {
                queryParams.append('activeAccountId', accountId);
            }
            else {
                const activeAccountId = await getActiveAccountId()
                if (activeAccountId) {
                    queryParams.append('activeAccountId', activeAccountId);
                }
            }

            if (softwareId) {
                queryParams.append('softwareId', softwareId);
            }
            else {
                const currentSoftwareId = await getCurrentSoftwareId();
                if (currentSoftwareId) {
                    queryParams.append('softwareId', currentSoftwareId);
                } else {
                    const baseSoftwareId = await getBaseSoftwareId();
                    if (baseSoftwareId) {
                        queryParams.append('softwareId', baseSoftwareId);
                    }
                }
            }

        }
    }

    const contentType = 'application/x-www-form-urlencoded; charset=UTF-8;';

    const requestData = JSON.stringify(arguments_);

    try {
        const result: AxiosResponse<unknown> = await axiosInstance({
            method: 'POST',
            url: `https://ikoncloud-dev.keross.com/ikon-api?${queryParams.toString()}`,
            headers: { 'Content-Type': contentType },
            data: { arguments: requestData },
            responseType: 'json'

        });

        return { data: result.data, status: result.status };
    } catch (axiosError) {

        const error = axiosError as AxiosError<any>;
        const { status, response } = error;
        console.error(status)

        // console.error(axiosError)
        // if (status === 401) {
        //     redirect("/login")
        // }
        // throw Error(error.message)

        const ikonErrorCode = response?.headers?.["ikon-error-code"];
        console.error(ikonErrorCode)

        if (ikonErrorCode == "AUTHENTICATIONEXCEPTION") {
            const message = "You are re-directed to Login Page. Possible reasons are:\n\t1) Your session has been idle for more than allowed timeout value.\n\t2) This is an unauthenticated access.";

            if (isServerApi) {
                throw new Error("AUTHENTICATIONEXCEPTION")
            } else {
                redirect("/login");
            }

        } else {
            if (ikonErrorCode == "TASKNOTEXISTSEXCEPTION") {
                console.error(error.message, "Task does not exist!");
            }
            if (ikonErrorCode == "AUTHORIZATIONEXCEPTION") {
                console.error(error.message, "Authorization Error!");
            }
            if (ikonErrorCode == "INTERNALIKONEXCEPTION") {
                console.error("Internal IKON Error - " + error.message, "IKON Error!");
            }
            if (ikonErrorCode == "DATAEXCEPTION") {
                console.error(response, error.message);
            }
            if (ikonErrorCode == "UNCAUGHTEXCEPTION") {
                console.error("Internal IKON Error - " + error.message, "IKON Error!");
            }

            throw new Error(error.message);
        }

    }

}

export default ikonBaseApi
