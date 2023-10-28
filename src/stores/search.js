import { defineStore } from 'pinia'
import { request } from '../helpers/request';
import QueryString from 'qs';

export const useSearchStore = defineStore('search', {
    state: () => ({
        designs: null,
        isSubmitting: false,
        success: false,
        searchData: {
            q: null,
            has_comments: null,
            has_team: null
        },
        searchType: "designs",
        sortType: 0,
        tags: null
    }),
    getters: {
        searchUrl(state) {
            if (state.searchType === "designs") {
                return "/api/search/designs?";
            } else {
                return "/api/search/designers?";
            }
        },
        searchQuery(state) {
            function filterNull(prefix, value) {
                if (value !== null) {
                    return value;
                }
            }

            return QueryString.stringify(state.queryObject, { filter: filterNull });
        },
        queryObject(state) {
            return {
                q: state.searchData.q,
                has_comments: state.searchData.has_comments,
                has_team: state.searchData.has_team,
                orderBy: state.sortType === 0 ? null : "likes",
                tags: state.tags
            }
        }
    },
    actions: {
        async getDesigns() {
            this.isSubmitting = true;

            try {
                const res = await request(this.searchUrl + this.searchQuery);

                const data = await res.json();
                this.designs = data.data;

                this.isSubmitting = false;
            } catch (e) {
                console.error(e);
            }

            this.isSubmitting = false;
        },
    },
})