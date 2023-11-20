import { request } from "./request";

export async function like_design(design_id) {
    const res = await request("/api/designs/" + design_id + "/like", {
        method: "POST"
    });
    return res;
}