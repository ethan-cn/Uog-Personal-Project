// import Vue from "vue";
import { createWebHistory, createRouter } from "vue-router"
import admin from "../components/admin/Admin.vue"
import adminMenu from "../components/admin/AdminMenu.vue"
import login from "../components/user/Login.vue"
// import test from "../Test.vue"
import main from "../components/Main.vue"
import recommendsongs from "../views/RecommendSongs.vue"
import recommendusers from "../views/RecommendUsers.vue"
import discover from "../views/Discover.vue"
import hotmusic from "../views/HotMusic.vue"
import searchMusic from "../views/SearchMusic.vue"
import loveSong from "../views/love-song.vue"
import userRecord from "../views/user-record.vue"
import store from "../store/index.js"

const routes = [
	// {
	// 	path: "/",
	// 	// 重定向
	// 	redirect: "/login",
	// },
	{
		path: "/login",
		name: "login",
		component: login,
	},

	{
		path: "/admin",
		name: "admin",
		component: admin,
	},
	{
		path: "/adminMenu",
		name: "adminMenu",
		component: adminMenu,
	},
	{
		path: "/",
		name: "main",
		component: main,
		redirect: "/discover",
		meta: {
			requireLogin: true,
		},
		// 子路由
		children: [
			{
				path: "recommendsongs",
				name: "recommendsongs",
				// component: (resolve) => require([recommendsongs], resolve),
				component: recommendsongs,
				meta: {
					requireLogin: true,
				},
			},
			{
				path: "recommendusers",
				name: "recommendusers",
				component: recommendusers,
				meta: {
					requireLogin: true,
				},
			},
			{
				path: "discover",
				name: "discover",
				component: discover,
				meta: {
					requireLogin: true,
				},
			},
			{
				path: "hotmusic",
				name: "hotmusic",
				component: hotmusic,
				meta: {
					requireLogin: true,
				},
			},
			{
				path: "searchMusic",
				name: "searchMusic",
				component: searchMusic,
			},
            {
                path: "loveSong",
                name: "loveSong",
                component: loveSong,
            },
            {
                path: "userRecord",
                name: "userRecord",
                component: userRecord,
            },
		],
	},
    // {
    //     path: "/userRecord",
    //     name: "userRecord",
    //     component: userRecord,
    // },
]

const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHistory(),
	routes, // short for `routes: routes`
})

// login check
router.beforeEach((to, from, next) => {
	// Determine whether to log in
	if (to.meta.requireLogin) {
		// If the token is displayed, you have logged in. The home page is displayed
        console.log("Route Forward Authentication")
		// console.log(JSON.parse(window.sessionStorage.getItem("user")))
        console.log(store.state)
        // console.log(window.sessionStorage.getItem("user"))
		if (store.state.user || to.path === "/login") {
			next()
		} else {
			// If you do not log in, you need to switch to the login page on all pages
			next(`/login?redirect=${to.path}`)
		}
	} else {
		next()
	}
})

export default router
