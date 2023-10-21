function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
}

export async function request(url, options) {
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
    return fetch(url, {
        headers: {
            "content-type": "application/json",
            accept: "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        },
        credentials: "include",
        ...options,
    });
}
