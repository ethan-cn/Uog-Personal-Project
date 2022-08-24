import axios from "axios"

axios.defaults.baseURL = "/api"

// 获得歌曲的详情信息
export function getSongDetail(id) {
	return axios.get("https://api.imjad.cn/cloudmusic/?type=detail&id=" + id)
}

// Login
export function getLogin(params) {
	return axios.post("/login", params)
}

// Get recommend songs
export function getRecommendSongs(param) {
	return axios.post("/recommendSongs", param)
}

// Get recommend users
export function getRecommendUsers(param) {
	return axios.post("/recommendUsers", param)
}

// Get discover songs
export function getDiscoverSongs(param) {
	return axios.post("/discover", param)
}

// Get songs_Admin
export function _getDisplaySongs(param) {
	return axios.post("/display", param)
}

// Get hot songs
export function getHotSongs(param) {
	return axios.post("/hot", param)
}

// Get all songs
export function _getAllSongs(param) {
	return axios.post("/songList", param)
}

// Search songs
export function _getSearchSongs(param) {
	return axios.post("/searchSongs", param)
}

// Add songs
export function _addSong(param) {
	return axios.post("/addSong", param)
}

// Delete songs
export function _deleteSong(param) {
	return axios.post("/deleteSong", param)
}

// Update songs
export function _updateSong(param) {
	return axios.post("/updateSong", param)
}

// Sign in
export function _register(param) {
	return axios.post("/register", param)
}

// Update user
export function _updateUser(param) {
	return axios.post("/updateUser", param)
}

// Update password
export function _updatePw(param) {
	return axios.post("/updatePw", param)
}

// Add a playback record and pass the user ID and song ID as parameters
export function _addRecord(param) {
	return axios.post("/addRecord", param)
}

// Get a list of favorite songs
export function _getLoveSongList(param) {
	return axios.post("/loveSongList", param)
}

// Add Favorites
export function _addLoveSong(param) {
	return axios.post("/addLoveSong", param)
}

// Cancel Favorites
export function _cancelLoveSong(param) {
	return axios.post("/cancelLoveSong", param)
}

// Get record songs
export function _getRecordSong(param) {
	return axios.post("/getRecordSong", param)
}
