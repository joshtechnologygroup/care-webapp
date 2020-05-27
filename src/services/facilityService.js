import { GET } from "Src/constants";
import * as CommonService from "Src/utils/services";

async function makeAuthorizedFacilityApiCall(base_url, method = GET, body = {}, params = {} ) {
    return  CommonService.makeAuthorizedApiCall(base_url, method, body, {}, params)
}

export { makeAuthorizedFacilityApiCall };
