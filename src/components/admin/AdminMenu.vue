<template>
	<div class="admin-background"></div>
	<el-container id="all-screen">
		<el-aside>
			<el-menu
				:default-openeds="['1', '3']"
				text-color="#fff"
				active-text-color="rgba(48, 49, 51, 0.5)"
				background-color="rgba(48, 49, 51, 0.5)"
			>
				<el-submenu index="1">
					<template #title>
						<i class="el-icon-setting"></i>
						Musical-recommendation Ecosystem (Admin)
					</template>
					<el-menu-item-group>
						<template #title>Song manage</template>
						<el-menu-item index="1-1">Song manage</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-aside>

		<el-container>
			<el-header
				style="text-align: right; font-size: 15px;position:relative;"
			>
				<el-input
					style="margin-left:10px;width:400px;height:50px;position:absolute;right:500px;"
					placeholder="Please enter the song name"
					v-model="inputSearch"
					prefix-icon="el-icon-search"
					clearable
					@keyup.enter="searchSongs"
					@clear="clearSearchInput"
				></el-input>
				<div
					style="display:flex;position:absolute;left:100px;width:200px;text-align:center;"
				>
					<!-- <el-checkbox style="margin-left:-30px;width: 80px" v-model="checkedAll">全选</el-checkbox> -->
					<el-button
						style="margin-right:10px;"
						size="large"
						type="primary"
						round
						@click="clearDialog"
					>
						Add song info
					</el-button>

					<el-button
						size="large"
						type="danger"
						round
						@click="handleDeleteMore"
					>
						Multiple delete
					</el-button>
				</div>

				<el-dropdown
					style="position:absolute;top:5px;right:20px;width:100px;height:50px;text-align:center;color:#fff;"
				>
					<i
						class="el-icon-user-solid"
						style="margin-right:10px;"
					></i>
					<span>{{ adminName }}</span>

					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click="logOut">
								Log out
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</el-header>

			<el-main>
				<!-- A table that allows for multiple selection -->
				<el-table
					ref="multipleTable"
					:data="tableData"
					@selection-change="handleSelectionChange"
					:header-cell-style="{
						fontWeight: '500px',
						border: '500px',
					}"
				>
					<el-table-column
						align="center"
						type="selection"
						width="150"
					></el-table-column>

					<el-table-column
						align="center"
						prop="iid"
						label="Song_id"
						width="150"
					></el-table-column>
					<el-table-column
						align="center"
						prop="songName"
						label="Song name"
						width="200"
					>
						<!-- Add jump links to the table -->
						<template #default="scope">
							{{ scope.row.songName }}
						</template>
					</el-table-column>
					<el-table-column
						align="center"
						prop="singerName"
						label="Singer"
						width="150"
					>
						<template #default="scope">
							<!-- <el-link underline="False" type="primary" to="/"> -->
							<span>{{ scope.row.singerName }}</span>
							<!-- </el-link> -->
						</template>
					</el-table-column>
					<el-table-column
						align="center"
						prop="album"
						label="Album"
						width="500"
					>
						<template #default="scope">
							<span>{{ scope.row.album }}</span>
						</template>
					</el-table-column>
					<el-table-column
						align="center"
						prop="songTime"
						label="Time"
						width="200"
					>
						<template #default="scope">
							<span>{{ scope.row.songTime }}</span>
						</template>
					</el-table-column>

					<el-table-column align="center" prop="address" label="Operate">
						<template #default="scope">
							<el-button
								type="primary"
								@click="handleEdit(scope.$index, scope.row)"
								style="margin-right:20px"
							>
								Edit
							</el-button>

							<el-button
								@click="
									handleDelete(
										scope.$index,
										scope.row,
										tableData,
									)
								"
								type="danger"
								plain
							>
								Delete
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- Split -->
				<el-pagination
					background
					layout="prev, pager, next"
					:total="totalNum"
					:current-page="currentPage"

					style="padding-top:30px;"
					@current-change="handleCurrentChange"
				></el-pagination>
			</el-main>
		</el-container>
	</el-container>
	<!-- Message for add song -->
	<el-dialog title="Add song" modal="false" v-model="dialogFormVisibleAdd">
		<el-form :model="form">
			<el-form-item label="Song name" :label-width="formLabelWidth">
				<el-input
					v-model="form.songName"
					autocomplete="off"
					placeholder="Please enter the name"
				></el-input>
			</el-form-item>
			<el-form-item label="Singer name: " :label-width="formLabelWidth">
				<el-input
					v-model="form.singerName"
					autocomplete="off"
					placeholder="Please enter the singer name"
				></el-input>
			</el-form-item>
			<el-form-item label="Album name" :label-width="formLabelWidth">
				<el-input
					v-model="form.album"
					autocomplete="off"
					placeholder="Please enter the album name"
				></el-input>
			</el-form-item>
			<el-form-item label="PictureLink" :label-width="formLabelWidth">
				<el-input
					v-model="form.picUrl"
					autocomplete="off"
					placeholder="Please enter the picture link"
				></el-input>
			</el-form-item>
			<el-form-item label="Songtime" :label-width="formLabelWidth">
				<el-input
					v-model="form.songTime"
					autocomplete="off"
					placeholder="Please enter the song duration in seconds"
				></el-input>
			</el-form-item>
			<el-form-item label="MP3 link" :label-width="formLabelWidth">
				<el-input
					v-model="form.downUrl"
					autocomplete="off"
					placeholder="Please enter the song MP3 link"
				></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisibleAdd = false">
					Cancel
				</el-button>
				<el-button type="primary" @click="addData">
					Confirm
				</el-button>
			</span>
		</template>
	</el-dialog>
	<!-- Update the song list -->
	<el-dialog title="Update the song" modal="false" v-model="dialogFormVisibleEdit">
		<el-form :model="form">
			<el-form-item label="SongID" :label-width="formLabelWidth">
				<el-input
					v-model="form.iid"
					autocomplete="off"
					disabled="true"
				></el-input>
			</el-form-item>
			<el-form-item label="Songname" :label-width="formLabelWidth">
				<el-input
					v-model="form.songName"
					autocomplete="off"
					placeholder="Please enter the name"
				></el-input>
			</el-form-item>
			<!-- <el-form-item label="歌手名称" :label-width="formLabelWidth">
				<el-input
					v-model="form.singerName"
					autocomplete="off"
					placeholder="请输入歌手名称"
				></el-input>
			</el-form-item> -->
			<el-form-item label="Albumname" :label-width="formLabelWidth">
				<el-input
					v-model="form.album"
					autocomplete="off"
					placeholder="Please enter the album name"
				></el-input>
			</el-form-item>
			<el-form-item label="Picture link" :label-width="formLabelWidth">
				<el-input
					v-model="form.picUrl"
					autocomplete="off"
					placeholder="Please enter the picture link"
				></el-input>
			</el-form-item>
			<!-- <el-form-item label="歌曲时长" :label-width="formLabelWidth">
				<el-input
					v-model="form.songTime"
					autocomplete="off"
					placeholder="请输入歌曲时长，单位为s"
				></el-input>
			</el-form-item> -->
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisibleEdit = false">
					Cancel
				</el-button>
				<el-button type="primary" @click="submitEdit">
					Confirm
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script>
import {
	_getDisplaySongs,
	_deleteSong,
	_updateSong,
	_addSong,
	_getSearchSongs,
} from "../../network/request"
// import { ref } from "vue"
export default {
	name: "adminMenu",
	data() {
		// checked: true,
		const item = {
			iid: "0001",
			songName: "老街",
			singerName: "李荣浩",
			album: "",
			songTime: "",
			picUrl: "",
			downUrl: "",
			publishTime: "",
		}
		return {
			// Administrator name
			adminName: "Admin",
			//  修改tableData赋值方式，直接复制json数据
			tableData: Array(10).fill(item), // 这样赋值不能实现多选，会出现全选
			// tableData: {}, // 这样赋值不能实现多选，会出现全选
			// Search box input
			inputSearch: "",
			// Edit search box
			dialogFormVisibleEdit: false,
			// Add data message box
			dialogFormVisibleAdd: false,
			form: {
				iid: "",
				songName: "",
				singerName: "",
				album: "",
				picUrl: "",
				songTime: "",
				downUrl: "",
			},
			// Enter the width in the dialog box that is displayed
			formLabelWidth: "100px",
			// current page
			currentPage: 1,
			pageSize: 10,
			totalNum: 30000,
			// Selected row data
			multipleSelection: [],
		}
	},
	created() {
		this.adminName = this.$route.query.name
		// Obtain all archival data
		_getDisplaySongs({ currentPage: "1" }).then((response) => {
			this.tableData = response.data.data
			console.log(this.tableData)
		})
	},
	methods: {
		// Logout
		logOut() {
			this.$confirm("Do you want to log out?", "Reminder", {
				confirmButtonText: "Confirm",
				cancelButtonText: "Cancel",
				type: "warning",
			})
				.then(() => {
					this.$message({
						type: "success",
						message: "Logged out",
					})
					// Jump to the login page
					this.$router.push("/admin")
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "Canceled",
					})
				})
		},
		// The query is cancelled and all data is restored
		clearSearchInput() {
			_getDisplaySongs({ currentPage: "1" }).then((response) => {
				this.tableData = response.data.data
			})
			this.inputSearch = ""
		},
		// Clear the data in the pop-up box
		clearForm() {
			this.form.iid = ""
			this.form.songName = ""
			this.form.singerName = ""
			this.form.album = ""
			this.form.picUrl = ""
			this.form.songTime = ""
			this.form.downUrl = ""
		},
		// Clear the data in the Add Song dialog
		clearDialog() {
			this.dialogFormVisibleAdd = true
			this.clearForm()
		},
		// Click confirm on the pop-up box to add data
		addData() {
			this.dialogFormVisibleAdd = false
			_addSong({
				songName: this.form.songName,
				singerName: this.form.singerName,
				picUrl: this.form.picUrl,
				album: this.form.album,
				songTime: this.form.songTime + "000",
				downUrl: this.form.downUrl,
				// 这里需要加Content-type，不然传参数会有问题
			}).then((response) => {
				// 在前端进行比较数据的方法并不好，需要在后端进行比较
				if (response.data.code == 200) {
					_getDisplaySongs({ currentPage: "1" }).then((response) => {
						this.tableData = response.data.data
						console.log(this.tableData)
					})
					this.$alert(
						"Song id：" + response.data.data.iid,
						"Add reminder",
						{
							confirmButtonText: "Confirm",
							callback: () => {
								this.$message({
									type: "success",
									message: "Success",
								})
							},
						},
					)
				} else {
					// pop up a prompt
					this.$message({
						type: "info",
						message: "Failed",
					})
				}
			})
		},
		// Click the Edit button to start editing
		handleEdit(index, row) {
			// Print the row number and the row content
			console.log(index, row)
			this.dialogFormVisibleEdit = true
			this.form.iid = row.iid
			this.form.songName = row.songName
			this.form.singerName = row.singerName
			this.form.album = row.album
			this.form.picUrl = row.picUrl
			this.form.songTime = row.songTime
		},
		// Submit to edit
		submitEdit() {
			this.dialogFormVisibleEdit = false
			_updateSong({
				iid: this.form.iid,
				songName: this.form.songName,
				picUrl: this.form.picUrl,
				album: this.form.album,
			}).then((response) => {
				// 在前端进行比较数据的方法并不好，需要在后端进行比较
				if (response.data.code == 200) {
					// Re-render the data
					_getDisplaySongs({
						currentPage: this.currentPage + "",
					}).then((response) => {
						this.tableData = response.data.data
						console.log(this.tableData)
					})
					this.$message({
						type: "success",
						message: "Success!",
					})
				} else {
					// Pop-up message
					this.$message({
						type: "info",
						message: "Failed!",
					})
				}
			})
		},
		// Delete a single row, index is the index of the current row in the array, row is the content of the current row,
    // and rows is the array of all rows
		handleDelete(index, row, rows) {
			this.$confirm("Are you sure to delete?", "Reminder", {
				confirmButtonText: "Confirm",
				cancelButtonText: "Cancel",
				type: "warning",
			})
				.then(() => {
					// Sending a deletion request
					_deleteSong({ iid: row.iid }).then((response) => {
						if (response.data.code == 200) {
							// Delete from page
							rows.splice(index, 1)
							// A message indicating a successful deletion is displayed
							this.$message({
								type: "success",
								message: "Success!",
							})
						} else {
							// The deletion failure message is displayed
							this.$message({
								type: "info",
								message: "Failed!",
							})
						}
					})
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "Cancel delete",
					})
				})
		},
		// delete in batches
		handleDeleteMore() {
			// Check whether it is selected
			if (this.multipleSelection.length == 0) {
				// pop up a prompt
				this.$message({
					type: "info",
					message: "No data selected, please try again!",
				})
				return false
			}
			this.$confirm("Are you sure to delete?", "Reminder", {
				confirmButtonText: "Confirm",
				cancelButtonText: "Cancel",
				type: "warning",
			})
				.then(() => {
					for (var i = 0; i < this.multipleSelection.length; i++) {
						_deleteSong({
							iid: this.multipleSelection[i].iid,
						}).then((response) => {
							// 在前端进行比较数据的方法并不好，需要在后端进行比较
							if (response.data.code == 200) {
								this.$message({
									type: "success",
									message: "deleting",
								})
							} else {
								// Popup message
								this.$message({
									type: "info",
									message: "Failed delete",
								})
							}
						})
					}
					// Delete success
					this.$message({
						type: "success",
						message: "Success!",
					})
					// Refresh all file data
					_getDisplaySongs({ currentPage: "1" }).then((response) => {
						this.tableData = response.data.data
						console.log(this.tableData)
					})
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "Canceled delete",
					})
				})
		},
		// multiple selection
		handleSelectionChange(val) {
			console.log(val)
			this.multipleSelection = val
			console.log(this.multipleSelection)
		},
		// Next page
		handleCurrentChange(val) {
			// Get the details of the song
			_getDisplaySongs({ currentPage: val }).then((response) => {
				this.tableData = response.data.data
				console.log(this.tableData)
			})
		},
		// Search songs
		searchSongs() {
			_getSearchSongs({ keyword: this.inputSearch }).then((response) => {
				this.tableData = response.data.data
				console.log(this.tableData)
			})
		},
	},
}
</script>

<style scoped>
/*  full screen */
#all-screen {
	position: absolute;
	/*Set the interior fill to 0 with no spacing between several layout elements*/
	padding: 0px;
	/*The outer spacing is set the same way*/
	margin: 0px;
	/*Set the height to 100%*/
	height: 100%;
	/* The width of the same setting is 100%*/
	width: 100%;
	bottom: 0;
}
.el-header {
	/* background-color: #303133; */
	background-color: rgba(48, 49, 51, 0.5);
	color: #fff;
	line-height: 60px;
}

#all-screen .el-aside {
	color: #fff;
	/* background-color: #303133; */
	background-color: rgba(48, 49, 51, 0.5);
	width: 300px;
}

#all-screen .el-aside .el-menu {
	color: #fff;
	margin-left: -30px;
	/* background-color: #303133; */
	background-color: rgba(48, 49, 51, 0.5);
	border: none;
}
#all-screen .el-aside .el-menu:hover {
	background-color: rgba(48, 49, 51, 0.5);
}

#all-screen .el-aside .el-menu .el-submenu__title:hover {
	background-color: rgba(48, 49, 51, 0.5);
	color: #fff !important;
}

#all-screen .el-aside .el-menu .el-menu-item {
	color: #fff;
	background-color: #303133;

}

/* 表格样式 */
#all-screen .fail {
	/* pointer-events: none; */
	color: #9b9b9b;
	cursor: not-allowed;

}
#all-screen .succ {
	/* pointer-events: none; */
	/* color: #9b9b9b;
	cursor: not-allowed; */
}

.v-modal {
	background-color: rgba(0, 0, 0, 0.2);
}
.admin-background {
	background: url("../../assets/imgs/background-admin.jpg") no-repeat center
		center;
	background-size: 100% 100%;
	background-attachment: fixed;
	background-color: #cccccc;
	z-index: -1;
	position: absolute;
	width: 100%;
	height: 100%;
}
</style>
