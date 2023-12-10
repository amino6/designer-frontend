import { defineStore } from 'pinia'
import { request } from '../helpers/request';
import QueryString from 'qs';

export const useSearchStore = defineStore('search', {
    state: () => ({
        designs: null,
        designers: null,
        isLoading: true,
        success: false,
        searchData: {
            q: null,
            has_comments: null,
            has_likes: null,
            available_to_hire: null,
            has_designs: null,
            unit: "Km",
            distance: null,
            latitude: null,
            longitude: null
        },
        searchType: "designs",
        sortType: 0,
        tags: null,
        next_page: 1,
        // the replace_url is a fix for when the user clicks on a routerlink
        // if we run router.replace at the same time the page won't change
        replace_url: true,
    }),
    getters: {
        searchUrl(state) {
            if (state.searchType === "designs") {
                return "/api/search/designs?page=" + state.next_page + "&";
            } else {
                return "/api/search/designers?page=" + state.next_page + "&";
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
                    has_likes: state.searchData.has_likes,
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
        },
        openDesignsFilter(state) {
            return Boolean(state.tags || state.searchData.has_comments || state.searchData.has_likes);
        },
        openDesignersFilter(state) {
            return Boolean(state.searchData.available_to_hire || state.searchData.has_designs ||
                (state.searchData.latitude && state.searchData.longitude));
        }
    },
    actions: {
        async getDesigns(load = false) {
            this.designers = null;

            try {
                const res = await request(this.searchUrl + this.searchQuery);

                const data = await res.json();

                if (load) {
                    Array.prototype.push.apply(this.designs, data.data);
                } else {
                    this.designs = data.data;
                }
                if (data.links?.next) {
                    const page = data.links.next.match(/page=\d+/);
                    this.next_page = page.length > 0 ? parseInt(page[0].split('=')[1]) : null;
                } else {
                    this.next_page = null;
                }
            } catch (e) {
                console.error(e);
            }

            this.isLoading = false;
        },
        async getDesigners(load = false) {
            this.designs = null;

            try {
                const res = await request(this.searchUrl + this.searchQuery);

                const data = await res.json();

                if (load) {
                    Array.prototype.push.apply(this.designers, data.data);
                } else {
                    this.designers = data.data;
                }
                if (data.links?.next) {
                    const page = data.links.next.match(/page=\d+/);
                    this.next_page = page.length > 0 ? parseInt(page[0].split('=')[1]) : null;
                } else {
                    this.next_page = null;
                }
            } catch (e) {
                console.error(e);
            }

            this.isLoading = false;
        },
        async search() {
            this.isLoading = true;
            this.next_page = 1;
            if (this.searchType === "designs") {
                await this.getDesigns();
            } else {
                await this.getDesigners();
            }
            this.isLoading = false;
            this.updateUrl();
        },
        async loadNextPage($state) {
            $state.loading();

            if (!this.next_page) {
                $state.complete();
                return;
            }

            try {
                if (this.searchType === "designs") {
                    await this.getDesigns(true);
                } else {
                    await this.getDesigners(true);
                }
                $state.loaded();
            } catch (error) {
                $state.error();
            }
        },
        updateType() {
            if (this.searchType === "designs") {
                this.clearDesignersFields();
                this.next_page = 1;
                this.updateUrl();
            } else {
                this.clearDesignsFields();
                this.next_page = 1;
                this.updateUrl();
            }
        },
        resetLocationInfo() {
            this.searchData.distance = null;
            this.searchData.longitude = null;
            this.searchData.latitude = null;
        },
        updateUrl() {
            if (!this.replace_url) {
                return;
            }

            if (this.searchType === "designs") {
                this.router.replace("?" + this.searchQuery);
            } else {
                this.router.replace("?searchType=" + this.searchType + "&" + this.searchQuery);
            }
        },
        updateState() {
            this.searchData.q = this.route.query.q ?? this.q;
            this.searchData.has_comments = this.route.query.has_comments ?? this.searchData.has_comments;
            this.searchData.has_likes = this.route.query.has_likes ?? this.searchData.has_likes;
            this.searchData.available_to_hire = this.route.query.available_to_hire ?? this.searchData.available_to_hire;
            this.searchData.unit = this.route.query.unit ?? "Km";
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
            this.searchData.unit = "Km";
            this.searchData.latitude = null;
            this.searchData.longitude = null;
            this.sortType = 0;
        },
        clearDesignsFields() {
            this.searchData.q = null;
            this.searchData.has_comments = null;
            this.searchData.has_likes = null;
            this.sortType = 0;
            this.tags = null;
        },
        async resetAll() {
            this.clearDesignersFields();
            this.clearDesignsFields();
            this.searchType = "designs";
        }
    },
})