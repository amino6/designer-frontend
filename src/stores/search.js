import { defineStore } from 'pinia'
import { request } from '../helpers/request';
import QueryString from 'qs';

export const useSearchStore = defineStore('search', {
    state: () => ({
        designs: null,
        designers: null,
        isSubmitting: false,
        success: false,
        searchData: {
            q: null,
            has_comments: null,
            has_team: null,
            available_to_hire: null,
            has_designs: null,
            unit: "Km",
            distance: null,
            latitude: null,
            longitude: null
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
                if (prefix === "unit" &&
                    (state.searchData.latitude === null || state.searchData.longitude === null)
                ) {
                    return;
                }

                if (value !== null) {
                    return value;
                }
            }

            return QueryString.stringify(state.queryObject, { filter: filterNull });
        },
        queryObject(state) {
            if (state.searchType === "designs") {
                return {
                    q: state.searchData.q,
                    has_comments: state.searchData.has_comments,
                    has_team: state.searchData.has_team,
                    orderBy: state.sortType === 0 ? null : "likes",
                    tags: state.tags
                }
            } else {
                return {
                    q: state.searchData.q,
                    available_to_hire: state.searchData.available_to_hire,
                    orderBy: state.sortType === 0 ? null : "closest",
                    has_designs: state.searchData.has_designs,
                    distance: state.searchData.distance,
                    unit: state.searchData.unit,
                    latitude: state.searchData.latitude,
                    longitude: state.searchData.longitude
                }
            }
        }
    },
    actions: {
        async getDesigns() {
            this.isSubmitting = true;
            this.designers = null;

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
        async getDesigners() {
            this.isSubmitting = true;
            this.designs = null;

            try {
                const res = await request(this.searchUrl + this.searchQuery);

                const data = await res.json();

                this.designers = data.data;

                this.isSubmitting = false;
            } catch (e) {
                console.error(e);
            }

            this.isSubmitting = false;
        },
        async search() {
            if (this.searchType === "designs") {
                await this.getDesigns();
            } else {
                await this.getDesigners();
            }
            this.updateUrl();
        },
        updateType() {
            if (this.searchType === "designs") {
                this.clearDesignersFields();
                this.updateUrl();
            } else {
                this.clearDesignsFields();
                this.updateUrl();
            }
        },
        resetLocationInfo() {
            this.searchData.distance = null;
            this.searchData.longitude = null;
            this.searchData.latitude = null;
        },
        updateUrl() {
            if (this.searchType === "designs") {
                this.router.replace("?" + this.searchQuery);
            } else {
                this.router.replace("?searchType=" + this.searchType + "&" + this.searchQuery);
            }
        },
        updateState() {
            this.searchData.q = this.route.query.q ?? this.q;
            this.searchData.has_comments = this.route.query.has_comments ?? this.searchData.has_comments;
            this.searchData.has_team = this.route.query.has_team ?? this.searchData.has_team;
            this.searchData.available_to_hire = this.route.query.available_to_hire ?? this.searchData.available_to_hire;
            this.searchData.unit = this.route.query.unit ?? "km";
            this.searchData.distance = this.route.query.distance ?? this.searchData.distance;
            this.searchData.latitude = this.route.query.latitude ?? this.searchData.latitude;
            this.searchData.longitude = this.route.query.longitude ?? this.searchData.longitude;
            this.tags = this.route.query.tags ?? this.tags;
            this.searchType = this.route.query.searchType ?? this.searchType;
            this.sortType = this.route.query.orderBy == "likes" ? 1 : 0;
        },
        clearDesignersFields() {
            this.searchData.q = null;
            this.searchData.available_to_hire = null;
            this.searchData.orderBy = null;
            this.searchData.has_designs = null;
            this.searchData.distance = null;
            this.searchData.unit = "km";
            this.searchData.latitude = null;
            this.searchData.longitude = null;
            this.sortType = 0;
        },
        clearDesignsFields() {
            this.searchData.q = null;
            this.searchData.has_comments = null;
            this.searchData.has_team = null;
            this.sortType = 0;
            this.tags = null;
        }
    },
})