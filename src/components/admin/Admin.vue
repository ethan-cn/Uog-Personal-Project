//back-end administrator system
<template>
	<!-- <div class="container"> -->
	<div class="admin-background"></div>

	<div id="admin-login-form">
		<div
			style="position:absolute;top:5px;left:100px;font-weight:bolder;color:#606266"
		>
			Musical-recommendation Ecosystem (Admin)
		</div>
		<!-- <div>Welcome</div> -->
		<el-form
			:model="ruleForm"
			status-icon
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item label="Username：" prop="username">
        <!-- * User name *-->
				<el-input
					type="name"
					v-model="ruleForm.username"
					autocomplete="off"
					placeholder="Please enter the name: "
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="Password: " prop="password">
<!--        User password-->
				<el-input
					type="password"
					v-model="ruleForm.password"
					autocomplete="off"
					placeholder="Please enter the password: "
					clearable
				></el-input>
			</el-form-item>
			<el-form-item
				style="padding-top:25px;margin-bottom:0;margin-right:0;margin-left:-100px;"
			>
				<el-button type="primary" @click="submitForm('ruleForm')">
					Login
				</el-button>
				<el-button
					style="margin-left:20px;"
					@click="resetForm('ruleForm')"
				>
					Reset
				</el-button>
			</el-form-item>
		</el-form>
	</div>
	<!-- </div> -->
</template>

<script>
export default {
	name: "admin",
	data() {
		// verify data form，check Element-Plus
		var validateUsername = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Please enter the username: "))
			} else {
				if (this.ruleForm.username !== "") {
					this.$refs.ruleForm.validateField("username")
				}
				callback()
			}
		}
		var validatePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Please enter the password: "))
			} else {
				callback()
			}
		}
		return {
			// form data
			ruleForm: {
				username: "",
				password: "",
			},
			// Rules of verify form(name & password)，Check Element-Plus
			rules: {
				username: [{ validator: validateUsername, trigger: "blur" }],
				password: [{ validator: validatePass, trigger: "blur" }],
			},
		}
	},
	methods: {
		// Reset form
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		login() {
			this.$axios
				.post(
					"/adminLogin",
					JSON.stringify({
						// user: {
						// 	username: this.ruleForm.username,
						// 	password: this.ruleForm.password,
						// },
						name: this.ruleForm.username,
						password: this.ruleForm.password,
						// Focus on 'Content-type'，不然传参数会有问题
					}),
					{ headers: { "content-type": "application/json" } },
				)
				.then((response) => {
					console.log(response)
					// Verify data at the front and back ends
					console.log(response.data.data.password)
					if (response.data.data.password == this.ruleForm.password) {
						this.$router.push({
							path: "/adminMenu",
							query: {
								name: this.ruleForm.username,
							},
						})
						this.$message({
							type: "success",
							message: "Success!",
						})
					} else {
						// reset form
						this.resetForm("ruleForm")
						// Message
						this.$message({
							type: "info",
							message: "User name or password is incorrect, login failed!",
						})
					}
				})
		},
		// Submit form
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// callback(new Error('用户名或密码错误'));
					// alert("submit!");
					this.login()
				} else {
					console.log("error submit!!")
					// callback(new Error('用户名或密码错误'));
					return false
				}
			})
		},
	},
}
</script>

<style scoped>
/* // scoped effects only in this file do not trickle down to child components

//@import url(); 引入公共css类 */
#admin-login-form {
	z-index: 1;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	width: 400px;
	height: 300px;
	background-color: rgba(204, 204, 204, 0.6);
	border-radius: 50px;
}

#admin-login-form .el-form {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	height: 150px;
	width: 400px;
}
#admin-login-form .el-form .el-form-item {
	margin-right: 30px;
}
#admin-login-form .el-form .el-form-item .el-form-item__content {
	margin-left: 0 !important;
}
/* The background view is displayed only on the administrator module page */
.admin-background {
	background: url("../../assets/imgs/background-admin.jpg") no-repeat center
		center;
	background-size: cover;
	background-attachment: fixed;
	background-color: #cccccc;
	z-index: -1;
	position: absolute;
	width: 100%;
	height: 100%;
}
/*this one can't implement*/
/* body {
	background: url("../../assets/imgs/background-admin.jpg") no-repeat center center;
	background-size: cover;
	background-attachment: fixed;
	background-color: #cccccc;
} */
</style>
