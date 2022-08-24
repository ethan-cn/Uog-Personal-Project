// User index page (Main page)
<template>
	<div id="user-index">
		<el-container class="all-screen" direction="vertical">
			<el-header height="50px">
				<div class="dots" style="display:inline-block;">
					<i
						class="iconfont icon-yuandianda"
						style="color:#dd6d60;font-size:25px;padding-right:5px;"
					></i>
					<i
						class="iconfont icon-yuandianda"
						style="color:#aed292;font-size:25px;"
					></i>
				</div>
				<el-input
					placeholder="Please enter the key words: "
					v-model="searchInput"
					prefix-icon="el-icon-search"
					clearable
					@keyup.enter="searchSongs"
					@clear="clearSearchInput"
				></el-input>
				<!-- 这里的样式需要放在这里才能生效，写到style标签里面不行，暂时还未解决 -->
				<el-dropdown
					style="position: absolute !important;right: 40px;top: 10px;color: #fff !important;width:120px;height: 30px;line-height: 30px;"
				>
					<button
						class="user-settings"
						style="border-radius:15px;padding:1px;width:100%;height:30px;"
					>
						<!-- <i
							class="el-icon-user-solid"
							style="margin-right: 5px"
						></i> -->
						<img
							src="../assets/imgs/user-image.jpg"
							alt="Can't load the user image."
							srcset=""
							style="display: inline-block;width:30px;height:30px;margin-right: 5px;border-radius:15px;"
						/>
						<span>
							{{ name }}
						</span>
					</button>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item
								@click="userinfoDialogVisibleEdit = true"
							>
								User center
							</el-dropdown-item>
							<el-dropdown-item
								@click="changePwDialog"
							>
								Change the password
							</el-dropdown-item>
							<el-dropdown-item @click="logOut">
								Log out
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu
						default-active="1"
						class="el-menu-vertical-music"
						text-color="#fff"
						background-color="transparent"
						active-text-color="#f56c6c"
						router="true"
					>
						<el-menu-item route="/discover" index="1">
							<!-- <router-link to="/main/discover">
								<i class="iconfont icon-discover"></i>
								<template #title>发现音乐</template>
							</router-link> -->
							<i
								class="iconfont icon-discover"
								style="padding-right:10px;"
							></i>
							<template #title>Music library</template>
						</el-menu-item>
						<el-menu-item route="/hotmusic" index="2">
							<i
								class="iconfont icon-new-music"
								style="padding-right:10px;"
							></i>
							<template #title>Top music</template>
						</el-menu-item>
						<el-menu-item route="/recommendsongs" index="3">
							<i
								class="iconfont icon-musiclist"
								style="padding-right:10px;"
							></i>
							<template #title>Made for you</template>
						</el-menu-item>
						<el-menu-item route="/recommendusers" index="4">
							<i
								class="iconfont icon-userlist"
								style="padding-right:10px;"
							></i>
							<template #title>Find your friends</template>
						</el-menu-item>
						<el-menu-item route="/loveSong" index="5">
							<i
								class="iconfont icon-shoucang_huaban1"
								style="padding-right:10px;"
							></i>
							<template #title>My favorite</template>
						</el-menu-item>
					</el-menu>
					<!-- </el-col>

					</el-row> -->
				</el-aside>

				<el-container style="border-radius:5px;position:relative;">
					<!-- height:0;flex-grow:1;这里设置el-main内容超出时使用滑动条，el-footer不会被推到下面 -->
					<el-main
						style="background-color:#fff;padding:10px;height:0;flex-grow:1;border-radius:5px;position:relative;"
					>
						<!-- 父组件监听子组件，传递过来的事件要放在router-view标签里面（这里就是playmusic） -->
						<router-view @playmusic="changMP3Url"></router-view>
					</el-main>
					<el-footer
						style="background-color:rgb(241,243,244)"
						height="50px"
					>
						<div>
							<div class="song-info">
								<img
									:src="picUrl"
									alt="Lost picture"
									style="display: inline-block;width:50px;height:50px;"
								/>
								<div>
									<span
										style="display:inline-block;width:100px;overflow:hidden;font-size:14px;"
									>
										{{ songName }}
									</span>
									<span
										style="display:inline-block;width:100px;overflow:hidden;font-size:14px;color:#9b9b9b;"
									>
										{{ "-  " + singerName }}
									</span>
								</div>

								<!-- <div>歌曲名、歌手名</div> -->
							</div>
							<audio
								id="audio"
								:src="MP3Url"
								controls="controls"
								loop="loop"
								@timeUpdate="audioTimeUpdate"
								style="width:1100px;height:50px;right: 0;position: absolute;"
							></audio>
						</div>
					</el-footer>
				</el-container>
			</el-container>
		</el-container>
		<!-- 个人中心弹出框 -->
		<el-dialog
			title="Profile"
			modal="false"
			v-model="userinfoDialogVisibleEdit"
		>
			<el-form :model="form">
				<el-form-item label="UserID" :label-width="formLabelWidth">
					<el-input
						v-model="uid"
						autocomplete="off"
						disabled="true"
					></el-input>
				</el-form-item>
				<el-form-item label="Name" :label-width="formLabelWidth">
					<el-input v-model="name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Gender" :label-width="formLabelWidth">
					<el-input v-model="gender" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Age" :label-width="formLabelWidth">
					<el-input v-model="age" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Area" :label-width="formLabelWidth">
					<el-input v-model="area" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Register time" :label-width="formLabelWidth">
					<el-input
						v-model="registerTime"
						autocomplete="off"
						disabled="true"
					></el-input>
				</el-form-item>
				<el-form-item label="Bio:" :label-width="formLabelWidth">
					<el-input v-model="des" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Password" :label-width="formLabelWidth">
					<el-input
						v-model="password"
						autocomplete="off"
						disabled="true"
						style="width:550px"
						:type="pwType"
					></el-input>
					<i
						style="margin-left:10px;cursor:pointer;"
						:class="[
							'iconfont',
							'icon-mimaxianshi',
							pwType == 'password' ? 'hide' : 'display',
						]"
						@click="changePwType"
					></i>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="updateUser">
						Confirm
					</el-button>
					<el-button @click="userinfoDialogVisibleEdit = false">
						Cancel
					</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 修改密码弹出框 -->
		<el-dialog title="Change the password" modal="false" v-model="pwDialogVisibleEdit">
			<el-form :model="form">
				<el-form-item label="Old password" :label-width="formLabelWidth">
					<el-input
						clearable
						v-model="oldPassword"
						autocomplete="off"
						placeholder="Please enter the old password"
						style="width:550px"
						:type="pwType"
					></el-input>
					<i
						style="margin-left:10px;cursor:pointer;"
						class="iconfont icon-mimaxianshi"
						@click="changePwType"
					></i>
				</el-form-item>
				<el-form-item label="New password " :label-width="formLabelWidth">
					<el-input
						clearable
						v-model="newPassword"
						autocomplete="off"
						placeholder="Please enter the new password"
						style="width:550px"
						:type="pwType"
					></el-input>
					<i
						style="margin-left:10px;cursor:pointer;"
						class="iconfont icon-mimaxianshi"
						@click="changePwType"
					></i>
				</el-form-item>
				<el-form-item label="Repeat the new password " :label-width="formLabelWidth">
					<el-input
						clearable
						v-model="repeatNewPassword"
						autocomplete="off"
						placeholder="Please repeat the new password"
						style="width:550px"
						:type="pwType"
					></el-input>
					<i
						style="margin-left:10px;cursor:pointer;"
						class="iconfont icon-mimaxianshi"
						@click="changePwType"
					></i>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="updatePw">
						Change
					</el-button>
					<el-button @click="pwDialogVisibleEdit = false">
						Cancel
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script>
import { ref } from "vue"
// 引入状态管理
import { useStore } from "vuex"
// 引入接口
import { _updatePw, _updateUser, _addRecord } from "../network/request"

export default {
	name: "main",
	created() {
		const user = useStore().state.user
		console.log(useStore().state)
		// get state
		this.state = useStore().state
		// get user info
		this.uid = user.uid
		this.gender = user.gender
		this.age = user.age
		this.area = user.area
		this.des = user.des
		this.registerTime = user.registerTime
		this.name = user.name
		this.password = user.password
		console.log("User name: " + user.name)

		// The data is read when the page loads
		if (window.sessionStorage.getItem("user")) {
			console.log("Loading")
			const session_user = JSON.parse(
				window.sessionStorage.getItem("user"),
			)
			console.log(session_user)
			this.$store.commit("SET_USER", user)
		}
		// Save the status when the page is refreshed
		window.addEventListener("beforeunload", () => {
			console.log("Refresh the page")
			console.log(this.$store.state.user)
			window.sessionStorage.setItem(
				"user",
				JSON.stringify(this.$store.state.user),
			)
		})
	},
	data() {
		return {
			// User state
			state: useStore().state,
			// User info
			// User id
			uid: ref("uid"),
			// User name
			name: ref("Name"),
			gender: ref("Gender"),
			age: ref(""),
			area: ref(""),
			registerTime: ref(""),
			des: ref("Bio"),
			password: ref(""),
			oldPassword: ref(""),
			newPassword: ref(""),
			repeatNewPassword: ref(""),
			// User info *end

			// Song id
			iid: "",
			// Search box input
			searchInput: ref(""),
			// Song info start
			songName: ref("遇见"),
			singerName: ref("孙燕姿"),
			MP3Url: ref(
				"http://m10.music.126.net/20210601101449/f548450009d6fd68ac324f1fff77570c/ymusic/f189/538f/29a0/aa78032d24c11eb57283eb577a26a6dd.mp3",
			),
			picUrl: ref(
				"https://p1.music.126.net/KZ0VfIoFYsxpjz9sTQuLVQ==/17687843556430013.jpg",
			),
			// Song info *end

			// Whether a song is playing
			audioIsPlaying: false,
			// Whether to display user information A dialog box is displayed
			userinfoDialogVisibleEdit: false,
			// A dialog box is displayed indicating whether to change the password
			pwDialogVisibleEdit: false,
			// Enter the width in the dialog box that is displayed
			formLabelWidth: "120px",
			// Whether to add a playback record to the current song
			isAddRecord: false,
			// Password display and hide, hidden by default
			pwType: "password",
		}
	},

	methods: {
		// 清空修改密码表单
		clearChangePwForm() {
			this.oldPassword = ref("")
			this.newPassword = ref("")
			this.repeatNewPassword = ref("")
		},
		// Updating User Information
		updateInfo() {
			const user = this.state.user
			user.name = this.name
			user.area = this.area
			user.des = this.des
			user.age = this.age
			user.gender = this.gender
			console.log(user)
			this.$store.commit("SET_USER", user)
		},
		// audio tag play
		autoPlay() {
			const audio = document.getElementById("audio")
			audio.play()
		},
		//  audio标签暂停并重新加载
		closePlay() {
			const audio = document.getElementById("audio")
			audio.pause()
			audio.load()
		},
		// 接受子组件传过来的MP3Url，并切换MP3Url，然后audio切歌
		changMP3Url(
			valueIid,
			valueMP3Url,
			valuePicUrl,
			valueSongName,
			valueSingerName,
		) {
			// changMP3Url(valueMP3Url) {
			console.log("Start receiving events and parameters")
			this.iid = valueIid
			console.log(valueMP3Url)
			this.MP3Url = valueMP3Url
			console.log(valuePicUrl)
			this.picUrl = valuePicUrl
			console.log(valueSongName)
			this.songName = valueSongName
			console.log(valueSingerName)
			this.singerName = valueSingerName
			console.log("Receiving events and parameters ends")
			// 切换后播放新的音乐
			console.log("Turn off the music that is playing")
			this.closePlay()
			console.log("Play new music")
			this.autoPlay()
			// 切歌时修改播放记录标志为false
			this.isAddRecord = false
		},
		// Log out
		logOut() {
			this.$confirm("Are you sure to log out?", "Reminder", {
				confirmButtonText: "Confirm",
				cancelButtonText: "Cancel",
				type: "warning",
			})
				.then(() => {
					this.$message({
						type: "success",
						message: "Success!",
					})
					// Clear the login status
					window.sessionStorage.clear()
					//   Jump to the login page
					this.$router.push("/login")
				})

				.catch(() => {
					this.$message({
						type: "info",
						message: "Canceled",
					})
				})
		},
		// Update user information, such as user name, gender, age, location, and profile
		updateUser() {
			this.$confirm("This operation will permanently update user information. Do you want to continue?", "Reminder", {
				confirmButtonText: "Confirm",
				cancelButtonText: "Cancel",
				type: "warning",
			})
				.then(() => {
					_updateUser({
						uid: this.uid,
						name: this.name,
						gender: this.gender,
						age: this.age,
						area: this.area,
						des: this.des,
					}).then((response) => {
						if (response.data.code == 200) {
							this.$message({
								type: "success",
								message: "Success!",
							})
							this.userinfoDialogVisibleEdit = false
							// 更新状态管理中的用户信息
							this.updateInfo()
						} else {
							this.$message({
								type: "info",
								message: "Failed update",
							})
							this.userinfoDialogVisibleEdit = false
						}
					})
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "Canceled update",
					})
				})
		},
		// 弹出更新密码提示框
		changePwDialog() {
            this.pwDialogVisibleEdit = true
			console.log("Empty content")
			// 清空修改密码表单内容
			this.clearChangePwForm()
		},
		// 更新密码
		updatePw() {
			this.$confirm("This operation will permanently update the password. Do you want to continue?", "Reminder", {
				confirmButtonText: "Confirm",
				cancelButtonText: "Cancel",
				type: "warning",
			})
				.then(() => {
					console.log(this.oldPassword == "")
					if (
						this.oldPassword == "" ||
						this.newPassword == "" ||
						this.repeatNewPassword == ""
					) {
						console.log("The password is empty and cannot be changed")
						this.$message({
							type: "warning",
							message: "Password is empty, change failed!",
						})
						// 弹出框隐藏
						this.pwDialogVisibleEdit = false
						return false
					}
					if (this.newPassword === this.repeatNewPassword) {
						_updatePw({
							uid: this.uid,
							oldPw: this.oldPassword,
							newPw: this.newPassword,
						}).then((response) => {
							console.log(response.data)
							if (response.data.code == 200) {
								this.$message({
									type: "success",
									message: "Success!",
								})
								this.password = this.newPassword
								console.log("Update password")
								this.pwDialogVisibleEdit = false
							} else {
								this.$message({
									type: "warning",
									message: "Update failed",
								})
								console.log("Update failed")
								this.pwDialogVisibleEdit = false
							}
						})
					} else {
						this.$message({
							type: "warning",
							message: "Two new password input different, update failed!",
						})
					}
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "Canceled update",
					})
				})
		},
		// Search song
		searchSongs() {
			console.log("Key word: " + this.searchInput)
			console.log("Search song")
			//
			this.$router.push({
				path: "/searchMusic",
				query: {
					keyword: this.searchInput,
				},
			})
		},
		// 点击清空时触发事件，跳转到discover界面
		clearSearchInput() {
			console.log("Clear the search box")
			this.$router.push("/discover")
		},
		// 听歌时间超过30秒则添加到播放记录中
		audioTimeUpdate() {
			console.log("You are ready to add a playback record")
			var audio = document.getElementById("audio")
			var currTime = audio.currentTime
			console.log(currTime)
			// 超过30秒则添加播放记录
			if (!this.isAddRecord && currTime > 30) {
				console.log("Adding playback record")
				_addRecord({
					uid: this.uid,
					iid: this.iid,
				}).then((response) => {
					console.log(response.data.data)
					if (response.data.code == 200) {
						console.log("Success added")
						// 添加记录成功依次之后，本首歌时间更新则不再重复添加
						this.isAddRecord = true
					}
				})
			}
		},
		// 更改密码显示
		changePwType() {
			console.log("Change the password display type")
			if (this.pwType == "password") {
				console.log("Change the password display type to plain text")
				this.pwType = "name"
			} else {
				console.log("Change the password display type to ciphertext")
				this.pwType = "password"
			}
		},
	},
}
</script>

<style scoped src="../assets/css/main.css">
/* 引入外部css文件且作用域是局部，则需要使用src属性引入 */

/* 密码显示与隐藏样式 */
#user-index >>> .display {
	cursor: pointer;
	color: #f56c6c;
}
#user-index >>> .hide {
	cursor: pointer;
}
</style>
