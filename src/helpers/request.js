function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
}

export async function request(url, options, contentType = "application/json") {
    // get cookie
    let csrfToken = getCookie("XSRF-TOKEN");
    url = "http://localhost:8000" + url;
    if (!csrfToken) {
        // get the cookie
        await fetch("http://localhost:8000/sanctum/csrf-cookie", {
            credentials: "include",
        });
        csrfToken = getCookie("XSRF-TOKEN");
    }

    let headers;
    if (contentType === false) {
        headers = {
            accept: "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        };
    } else {
        headers = {
            "content-Type": contentType,
            accept: "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        };
    }

    return fetch(url, {
        headers: headers,
        credentials: "include",
        ...options,
    });
}

export async function getCSRFToken() {
    // get cookie
    let csrfToken = getCookie("XSRF-TOKEN");

    if (!csrfToken) {
        // get the cookie
        await fetch("http://localhost:8000/sanctum/csrf-cookie", {
            credentials: "include",
        });
        csrfToken = getCookie("XSRF-TOKEN");
    }

    return decodeURIComponent(csrfToken);
}