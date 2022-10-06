// 連線設定
const reqSetting = {
    server: null,
    token: null,
};

/**
 * 初始化參數
 * @param {object} obj 設定參數
 */
export function init(obj) {
    for (let key of Object.keys(reqSetting)) {
        if (Object.keys(obj).includes(key)) {
            reqSetting[key] = obj[key];
        }
    }
}

export function getSetting() {
    return reqSetting;
}

export function buildOption(option) {
    if (reqSetting.token) {
        if (option.headers === undefined) {
            option.headers = { Authorization: `Bearer ${reqSetting.token}` };
        } else {
            option.headers["Authorization"] = `Bearer ${reqSetting.token}`;
        }
    }
    return option;
}

export function GET(resource, query, headers) {
    console.log(headers);
    return new Promise((reslove, reject) => {
        if (!reqSetting.server)
            return reject(`ERROR: please use init() to set the server url`);
        // Request url
        let url = `${reqSetting.server}/${resource}`;
        if (query && Object.keys(query).length > 0 && !url.includes("?")) {
            url += `?${Object.keys(query)
                .map(function (key, value) {
                    return [key, query[key]].join("=");
                })
                .join("&")}`;
        }
        // Request option
        let option = buildOption({
            method: "GET",
            headers,
        });
        // Request
        fetch(url, option)
            .then(async (res) => {
                return reslove({
                    status: res.status,
                    text: res.statusText,
                    data: await res.json(),
                    url: res.url,
                });
            })
            .catch((err) => {
                return reject(err);
            });
    });
}

export function POST(resource, data) {
    return new Promise((reslove, reject) => {
        if (!reqSetting.server)
            return reject(`ERROR: please use init() to set the server url`);
        // Request url
        let url = `${reqSetting.server}/${resource}`;
        // Request option
        let option = buildOption({
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
            },
        });
        // Request
        fetch(url, option)
            .then(async (res) => {
                return reslove({
                    status: res.status,
                    text: res.statusText,
                    data: await res.json(),
                    url: res.url,
                });
            })
            .catch((err) => {
                return reject(err);
            });
    });
}

export function PUT(resource, data) {
    return new Promise((reslove, reject) => {
        if (!reqSetting.server)
            return reject(`ERROR: please use init() to set the server url`);
        // Request url
        let url = `${reqSetting.server}/${resource}`;
        // Request option
        let option = buildOption({
            method: "PUT",
            body: data,
            headers: {
                "Content-Type": "application/json",
            },
        });
        // Request
        fetch(url, option)
            .then(async (res) => {
                return reslove({
                    status: res.status,
                    text: res.statusText,
                    data: await res.json(),
                    url: res.url,
                });
            })
            .catch((err) => {
                return reject(err);
            });
    });
}
export function DELETE(resource) {
    return new Promise((reslove, reject) => {
        if (!reqSetting.server)
            return reject(`ERROR: please use init() to set the server url`);
        // Request url
        let url = `${reqSetting.server}/${resource}`;
        // Request option
        let option = buildOption({
            method: "DELETE",
        });
        // Request
        fetch(url, option)
            .then(async (res) => {
                return reslove({
                    status: res.status,
                    text: res.statusText,
                    data: await res.json(),
                    url: res.url,
                });
            })
            .catch((err) => {
                return reject(err);
            });
    });
}
