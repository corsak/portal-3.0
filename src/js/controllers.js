/*starry*/
angular.module('starter.controllers', [])
	.constant('$rpc', {
		//url: 'http://221.182.247.5:8084/rpc'
		url: 'http://rpc.wxhi.cn/rpc'
	})
	.constant('HelpData', {
		arr: []
	})
	.controller('Default.Index', function($scope,$rootScope, $state, Userinfo) {
		if(window.plus){
			plus.navigator.setFullscreen(true);
			plus.navigator.setStatusBarBackground("#cc0099");
			plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
		}
		//plus.navigator.setStatusBarBackground("#11c1f3");
		//plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
		$scope.$on('$ionicView.beforeEnter', function() {
      		$rootScope.hideTabs = 'tabs-item-hide';
    	});
	})
	.controller('Default.Welcome', function($scope, $ionicModal, $state) {
    	$scope.$on('$ionicView.afterEnter', function() {
			
		});
		$scope.next = function() {
			 $scope.$broadcast('slideBox.nextSlide');
        };
        $scope.slideChanged = function(index) {
        };
		$scope.guideSure = function() {
			$state.go('tab.home');
			window.localStorage['first'] = '1';
		};
	})
	.controller('Group.Index', function($scope, $http, $rpc) {
	})
	.controller('Group.Chat', function($scope,$rootScope,$stateParams,$ionicScrollDelegate,$ionicHistory, $http, $rpc,server,chat) {
		//$("#main-menu").hide("ease-out");		
	})
	.controller('Home.Index', function($scope,$rootScope, $http, $rpc) {
		if(window.plus){
			plus.navigator.setFullscreen(false);
			
		}
    	$scope.$on('$ionicView.afterEnter', function() {

		});
		$scope.$on('$ionicView.beforeEnter', function() {
      		$rootScope.hideTabs = '';
    	});
		$scope.onItemDelete = function(item) {			
	    	$scope.items.splice($scope.items.indexOf(item), 1);
	  	};
		$scope.getFeeds = function() {			
			//$scope.showLoading();
			var urlStaff = $rpc.url + "/feed?callback=JSON_CALLBACK";			
			$http.jsonp(urlStaff).success(
				function(result, status, header, config) {
					if (result.status == 'SUCCEED') {
						//$scope.hideLoading();
						$scope.feeds = result.feeds.list;
					} else if (result.status == 'FAIL') {
						console.log('网络错误!');
					}
				}
			)
			.error(
				function(data) {
					console.log("访问服务器出错，请检查网络是否正常！");
				}
			);
		};
		$scope.getFeeds();
	})
	.controller('Workbench.Index', function($scope, $state, $ionicModal, $timeout, $ionicPopup, $ionicPopover, $http, $rpc, Userinfo, $ionicLoading, $stateParams) {
	})
	.controller('Notify.Index', function($scope, $state, $ionicModal, $timeout, $ionicPopup, $ionicPopover, $http, $rpc, Userinfo, $ionicLoading, $stateParams) {
	})
	.controller('Notify.Detail', function($scope,$rootScope, $state, $ionicActionSheet,$ionicModal,$ionicHistory, $timeout, $ionicPopup, $ionicPopover, $http, $rpc, Userinfo, $ionicLoading, $stateParams) {
		if(window.plus){
			plus.navigator.setStatusBarBackground("#cc0099");
			plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
		}
		$scope.goBack = function() {
			$ionicHistory.goBack();			
		};	
		$scope.$on('$ionicView.beforeEnter', function() {
      		$rootScope.hideTabs = 'tabs-item-hide';
    	});
		$scope.getNotifyDetail=function(){
			var notifyId=$stateParams.notifyId;
			var staffDetailUrl = $rpc.url + "/notify/detail?callback=JSON_CALLBACK";
			staffDetailUrl += "&notify_id=" + notifyId;
			$http.jsonp(staffDetailUrl)
			.success(
				function(result, status, header, config) {
					if (result.status == 'SUCCEED') {
						$scope.notify = result.notify;
					} else if (result.status == 'FAIL') {
						plus.nativeUI.toast('操作失败!');
					}
				}
			)
			.error(
				function(data) {
					plus.nativeUI.alert("访问服务器出错，请检查网络是否正常！");
				}
			);
		};
		$scope.getNotifyDetail();
	})
	.controller('Contact.Detail', function($scope, $state, $ionicActionSheet,$ionicModal,$ionicHistory, $timeout, $ionicPopup, $ionicPopover, $http, $rpc, Userinfo, $ionicLoading, $stateParams) {
		if(window.plus){
			plus.navigator.setStatusBarBackground("#cc0099");
			plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
		}
		$scope.beep = function() {
			beep(3);
		};
		$scope.vibrate = function() {
			vibrate(2000);
		};
		$scope.openSms = function(phone) {
			openSms(phone,'');
		};
		$scope.openMms = function(phone) {
			openMms(phone,'');
		};
		$scope.openCall = function(number) {
			var hideSheet = $ionicActionSheet.show({
				destructiveText: '拔打',
				titleText: '请选择操作',
				cancelText: '取消',
				cancel: function() {
					hideSheet();
					return true;
				},
				destructiveButtonClicked: function() {
					dial(number);
					return true;
				}
			});
			$timeout(function() {
				hideSheet();
			}, 5000);
		};		
		$scope.goBack = function() {
			$ionicHistory.goBack();
			$("#contact-menu").show();
		};		
		$("#contact-menu").hide();
		
		$scope.getStaffDetail=function(){
			var staffId=$stateParams.staffId;
			var staffDetailUrl = $rpc.url + "/staff/detail?callback=JSON_CALLBACK";
			staffDetailUrl += "&staff_id=" + staffId;
			$http.jsonp(staffDetailUrl)
			.success(
				function(result, status, header, config) {
					if (result.status == 'SUCCEED') {
						$scope.staff = result.staff;
					} else if (result.status == 'FAIL') {
						plus.nativeUI.toast('操作失败!');
					}
				}
			)
			.error(
				function(data) {
					message("访问服务器出错，请检查网络是否正常！");
				}
			);
		}
		$scope.getStaffDetail();
	})
	.controller('Contact.Staff', function($scope, $state, $ionicModal,$ionicHistory, $timeout, $ionicPopup, $ionicPopover, $http, $rpc, Userinfo, $ionicLoading, $stateParams) {
		$scope.openSms = function(phoneNumber) {
			$state.go('tab.about');
		};		
		$scope.goBack = function() {
			$ionicHistory.goBack();
			$("#contact-menu").show("ease-in");
		};
		$("#contact-menu").hide();
		$scope.openCall = function(phone){
			plus.device.dial(phone, true);
		}
		$scope.getStaffDetail=function(){
			var staffId=$stateParams.staffId;
			var staffDetailUrl = $rpc.url + "/staff/detail?callback=JSON_CALLBACK";
			staffDetailUrl += "&staff_id=" + staffId;
			$http.jsonp(staffDetailUrl)
			.success(
				function(result, status, header, config) {
					if (result.status == 'SUCCEED') {
						$scope.staff = result.staff;
					} else if (result.status == 'FAIL') {
						plus.nativeUI.toast('操作失败!');
					}
				}
			)
			.error(
				function(data) {
					plus.nativeUI.alert("访问服务器出错，请检查网络是否正常！");
				}
			);
		}
		$scope.getStaffDetail();
	})
	.controller('Message.Index', function($scope, $state) {
		if(window.plus){
			plus.navigator.setStatusBarBackground("#cc0099");
			plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
		}
	
	})
	.controller('App.Index', function($scope, $state,$http, $rpc) {
		if(window.plus){
			plus.navigator.setStatusBarBackground("#cc0099");
			plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
		}
		$scope.getApps = function() {			
			//$scope.showLoading();
			var urlApp = $rpc.url + "/app?callback=JSON_CALLBACK";
			
			$http.jsonp(urlApp)
				.success(
					function(result, status, header, config) {
						if (result.status == 'SUCCEED') {
							//$scope.hideLoading();
							$scope.apps = result.apps.list;
						} else if (result.status == 'FAIL') {
							console.log('网络错误!');
						}
					}
				)
				.error(
					function(data) {
						console.log("访问服务器出错，请检查网络是否正常！");
					}
				);
		};
		$scope.getApps();
	})
	.controller('User.Index', function($scope, $http, $rpc,$ionicActionSheet, $ionicLoading, $ionicModal, $timeout) {
		if(window.plus){
			plus.navigator.setStatusBarBackground("#cc0099");
			plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
		}
		$scope.showLoading = function() {
			$ionicLoading.show({
				template: '<ion-spinner icon="spiral"></ion-spinner>',
				noBackdrop: true
			});
		};
		$scope.hideLoading = function() {
			setTimeout(function() {
				$ionicLoading.hide();
			}, 300);
		};
		$scope.openUserLogout = function() {
			var hideSheet = $ionicActionSheet.show({
				destructiveText: '确定',
				titleText: '您确定要退出吗？',
				cancelText: '取消',
				cancel: function() {
					hideSheet();
					return true;
				},
				destructiveButtonClicked: function() {
					$scope.openUserLogoutCheck();
					return true;
				}
			});
			$timeout(function() {
				hideSheet();
			}, 5000);
		};
		$scope.getUserInfo = function(){
			var user_status=getCache("user_status");
			var user_id=getCache("user_id");
			var user_name=getCache("user_name");
			var user_realname=getCache("user_realname");
			var user_avatar=getCache("user_avatar");
			var user_notes=getCache("user_notes");
			var user={
				user_status:user_status,
				user_id:user_id,
				user_name:user_name,
				user_realname:user_realname,
				user_avatar:user_avatar,
				user_notes:user_notes
			}			
			return user;
		};
		$scope.getUserStatus = function() {
			var user_status=getCache("user_status");
			if(user_status=="is_logined"){
				var user=$scope.getUserInfo();
				$scope.setUserInfo(user);
				$scope.user_status = user_status;
			}
			
		};
		$scope.user_status = "is_nologin";
		$scope.openUserForm = function() {
			$ionicModal.fromTemplateUrl('themes/user.login.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
			});
		};
		$scope.openUserLogin = function() {
			$scope.modal.show();
		};
		$scope.setUserInfo = function(user) {
			if (user.user_avatar != "") {
				user.user_avatar = $rpc.url + "/data/upload/avatars/" + user.user_avatar;
			} else {
				user.user_avatar = "images/noavatar.png";
			}
			if (user.user_realname == "") {
				user.user_realname = "未登录";
			}
			if (user.user_notes == "") {
				user.user_notes = "您还没有填写签名信息。";
			}
			$scope.user = user;
		};
		$scope.openUserLoginCheck = function() {
			var user_name = $("#user_name").val();
			var user_passwd = $("#user_passwd").val();
			var remember = $("#remember").val();
			if (user_name == "") {
				plus.nativeUI.alert("请输入用户名！");
			} else if (user_passwd == "") {
				plus.nativeUI.alert("请输入密码！");
			} else {
				 $ionicLoading.show({
			      	template: "正在登录..."
			    });
				var userLoginUrl = $rpc.url + "/user/loginCheck?callback=JSON_CALLBACK";
				userLoginUrl += "&user_name=" + user_name;
				userLoginUrl += "&user_passwd=" + user_passwd;
				$http.jsonp(userLoginUrl)
				.success(
					function(result, status, header, config) {
						if (result.status == 'SUCCEED') {
							setCache("user_id",result.user_id);
							setCache("user_name",result.user_name);
							setCache("user_realname",result.user_realname);
							setCache("user_avatar",result.user_avatar);
							setCache("user_notes",result.user_notes);
							
							setCache("user_status","is_logined");
							$scope.user_status="is_logined";
							$scope.getUserStatus();
							
							setTimeout(function() {
								$scope.hideLoading();
								//$("#user_passwd").val("");
								$scope.closeModal();
								plus.nativeUI.toast('您已成功登录!');
							}, 50);

						} else if (result.status == 'FAIL') {
							plus.nativeUI.toast('登录失败!');
						}
					}
				)
				.error(
					function(data) {
						plus.nativeUI.alert("访问服务器出错，请检查网络是否正常！");
					}
				);
			}
		};
		$scope.openUserLogoutCheck = function() {
			$ionicLoading.show({
		      	template: "正在退出..."
		    });
			var userLogoutUrl = $rpc.url + "/user/logout?callback=JSON_CALLBACK";
			$http.jsonp(userLogoutUrl)
				.success(
					function(result, status, header, config) {
						if (result.status == 'SUCCEED') {							
							$scope.hideLoading();
							result.user_status = "is_nologin";
							result.user_avatar = "";
							result.user_realname = "";
							result.user_notes = "";
							setCache("user_status","is_nologin");
							removeCache("user_id");
							removeCache("user_name");
							removeCache("user_realname");
							removeCache("user_avatar");
							removeCache("user_notes");
							$scope.user_status = "is_nologin";
							$scope.setUserInfo(result);
						} else if (result.status == 'FAIL') {
							plus.nativeUI.toast('退出失败!');
						}
					}
				)
				.error(
					function(data) {
						plus.nativeUI.alert("访问服务器出错，请检查网络是否正常！");
					}
				);
		};


		$scope.closeModal = function() {
			$scope.modal.hide();
		};

		$scope.$on('$destroy', function() {
			$scope.modal.remove();
		});

		$scope.$on('modal.hidden', function() {

		});

		$scope.$on('modal.removed', function() {

		});

		$scope.openUserForm();
		$scope.getUserStatus();
	})
	.controller('User.Setting', function($scope, $state) {
		$scope.goBack = function() {
			$ionicHistory.goBack();
		};

	})
	.controller('User.Edit', function($scope, $state, $ionicHistory) {
		$scope.goBack = function() {
			$ionicHistory.goBack();
		};
		$scope.isActive = 'a';
		$scope.changeTab = function(evt) {
			var elem = evt.currentTarget;
			$scope.isActive = elem.getAttributeNode('data-active').value;
		};
		$scope.changeBasic = function() {
			
		};
		$scope.changePwd = function() {
			
		};
		$scope.changeAcount = function() {
			
		};
	})
	.controller('User.About', function($scope, $state, $ionicHistory) {
		$scope.goBack = function() {
			$ionicHistory.goBack();
		};

	})
	.controller('Contact.Index', function($scope, $http, $rpc,$ionicHistory, $ionicScrollDelegate, $ionicLoading, $ionicModal, $timeout, $rootScope) {
		if(window.plus){
			plus.navigator.setStatusBarBackground("#cc0099");
			plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
		}
		$scope.goBack = function() {
			$ionicHistory.goBack();
		};

	})
	.controller('Contact.Person', function($scope, $http, $rpc,$ionicHistory, $ionicActionSheet, $ionicScrollDelegate, $ionicLoading, $ionicModal, $timeout, $rootScope) {
		$scope.openCall = function(number) {
			var hideSheet = $ionicActionSheet.show({
				destructiveText: '拔打',
				titleText: '请选择操作',
				cancelText: '取消',
				cancel: function() {
					hideSheet();
					return true;
				},
				destructiveButtonClicked: function() {
					dial(123);
					return true;
				}
			});

			$timeout(function() {
				hideSheet();
			}, 5000);
		};
		
		$("#contact-menu").show();
		$scope.showLoading = function() {
			$ionicLoading.show({
				template: '<ion-spinner icon="spiral"></ion-spinner>',
				noBackdrop: true
			});

		};
		$scope.myTitle = 'This header hides the content below';
		$rootScope.slideHeader = false;
		$rootScope.slideHeaderPrevious = 0;
		$rootScope.hideTabs = true;
		$scope.hideLoading = function() {
			$ionicLoading.hide();
		};
		$scope.getContacts = function() {
			$scope.showLoading();
			var urlStaff = $rpc.url + "/staff?callback=JSON_CALLBACK";
			$http.jsonp(urlStaff)
				.success(
					function(result, status, header, config) {
						if (result.status == 'SUCCEED') {
							$scope.hideLoading();
							$scope.staffs = result.staffs.list;
						} else if (result.status == 'FAIL') {
							plus.nativeUI.toast('登录失败!');
						}
					}
				)
				.error(
					function(data) {
						plus.nativeUI.alert("访问服务器出错，请检查网络是否正常！");
					}
				);
		};
		$scope.init = function() {
			$scope.getContacts();
		};
		$scope.init();
	})
	.controller('Contact.Company', function($scope, $state,$http, $rpc,$ionicHistory, $ionicScrollDelegate, $ionicLoading, $ionicModal, $timeout, $rootScope) {
		$scope.goBack = function() {
			$ionicHistory.goBack();
		};
		$scope.showLoading = function() {
			$ionicLoading.show({
				template: '<ion-spinner icon="spiral"></ion-spinner>',
				noBackdrop: true
			});

		};
		$("#contact-menu").show("ease-in");
		$scope.go = function(url) {
			$state.go(url);
		};
		$scope.goBack = function() {
			$ionicHistory.goBack();
		};
		$scope.goRoot = function() {
			$state.go('#/tab/contact');
		};
		$rootScope.slideHeader = false;
		$rootScope.slideHeaderPrevious = 0;
		$rootScope.hideTabs = true;
		$scope.hideLoading = function() {
			$ionicLoading.hide();
		};
		$scope.getDepartments = function() {
			$scope.showLoading();
			var urlStaff = $rpc.url + "/department?callback=JSON_CALLBACK";
			$http.jsonp(urlStaff)
				.success(
					function(result, status, header, config) {
						if (result.status == 'SUCCEED') {
							$scope.hideLoading();
							$scope.departments = result.departments.list;
						} else if (result.status == 'FAIL') {
							plus.nativeUI.toast('登录失败!');
						}
					}
				)
				.error(
					function(data) {
						plus.nativeUI.alert("访问服务器出错，请检查网络是否正常！");
					}
				);
		};
		$scope.init = function() {
			$scope.getDepartments();
			
		};
		$scope.init();
	})
	.controller('Contact.Department', function($ionicConfig,$scope, $state,$ionicHistory, $ionicActionSheet, $ionicModal,$ionicHistory, $timeout, $ionicPopup, $ionicPopover, $http, $rpc, Userinfo, $ionicLoading, $stateParams) {
		$scope.openCall = function(number) {
			var hideSheet = $ionicActionSheet.show({
				destructiveText: '拔打',
				titleText: '请选择操作',
				cancelText: '取消',
				cancel: function() {
					hideSheet();
					return true;
				},
				destructiveButtonClicked: function() {
					dial(123);
					return true;
				}
			});
			
			$timeout(function() {
				hideSheet();
			}, 5000);
		};
		
		$scope.showLoading = function() {
			$ionicLoading.show({
				template: '<ion-spinner icon="spiral"></ion-spinner>',
				noBackdrop: true
			});

		};
		$scope.hideLoading = function() {
			$ionicLoading.hide();
		};
		$scope.goBack = function() {
			$ionicHistory.goBack();
			$("#contact-menu").show("ease-in");
		};
		$scope.goRoot = function() {
			$state.go('#/tab/contact');
		};
		
		$scope.getDepartments=function(){
			var departmentId = $stateParams.departmentId;
			var superiorDept = $stateParams.superiorDept;
			var urlDepartment = $rpc.url + "/department/list?callback=JSON_CALLBACK";
			urlDepartment += "&department_id=" + departmentId;
			urlDepartment += "&superior_dept=" + superiorDept;
			$scope.showLoading();
			$http.jsonp(urlDepartment)
			.success(
				function(result, status, header, config) {
					$scope.pageTitle = "读取完成";
					if (result.status == 'SUCCEED') {
						$scope.department = result.department;
						$scope.superior = result.superior;
						$scope.pageTitle=$scope.department.department_name;
						$scope.departments = result.departments;
						$scope.staffs = result.staffs;
						$scope.hideLoading();
					} else if (result.status == 'FAIL') {
						plus.nativeUI.toast('操作失败!');
					}
				}
			)
			.error(
				function(data) {
					plus.nativeUI.alert("访问服务器出错，请检查网络是否正常！");
				}
			);
		}
		$scope.getDepartments();
	})
	.controller('Contact.Group', function($scope, $http, $ionicScrollDelegate, $ionicLoading, $ionicModal, $timeout,server,chat,$stateParams, $rpc, $rootScope) {
		$scope.openChatModel = function() {
			$ionicModal.fromTemplateUrl('themes/group.chat.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
			});
		};
		$scope.closeModal = function() {
			$scope.modal.hide();
		};
		$scope.openChatForm = function(id) {
			
			$scope.modal.show();
			$scope.groupId=id;
		
			$scope.initChat();
		};
		$scope.openChatModel();
		$scope.showLoading = function() {
			$ionicLoading.show({
				template: '<ion-spinner icon="spiral"></ion-spinner>',
				noBackdrop: true
			});
		};
		$scope.hideLoading = function() {
			$ionicLoading.hide();
		};
		
		$rootScope.slideHeader = false;
		$rootScope.slideHeaderPrevious = 0;
		$rootScope.hideTabs = true;
		$scope.goBack = function() {
			$ionicHistory.goBack();
		};	
		$scope.messages = chat.getMessages();		
		function buildChat(messages) {
			chat.buildChat(messages);
			$scope.$emit('messageAll', { message: 'events:scrollToBottom', data: 1000 });
		}
		$scope.$on('messageAll', function(e, data) {
			$scope.$broadcast(data.message, data.data);
		});
		function addMessage(message) {
			chat.addMessage(message);
			$ionicScrollDelegate.scrollBottom(true);
		}		
		$scope.$on('Text', function(event,data) {
			console.log(data);
		});		
		$scope.$on('chat:history', function(e, messages) {
			buildChat(messages);
		});	
		$scope.$on('chat:message', function(e, message) {
			addMessage(message);
		});		
		$scope.send= function(msg){
			$scope.message=msg;
			if($scope.message){
				var message={
					group_id:$scope.groupId,
					user_nickname:"alan",
					message_content:$scope.message
				};
				server.send(message);
				
			}
		}
		$scope.initChat=function(){
			if ('WebSocket' in window) {
				console.log('Preparing WebChat..');
				server.connect();
			} else {
				console.error('We are sorry, you cannot use WebChat.');
				return false;
			}
		  	$ionicScrollDelegate.scrollBottom(true);
		};
		
		$scope.getStaffs = function() {
			$scope.showLoading();
			var urlStaff = $rpc.url + "/group?callback=JSON_CALLBACK";
			$http.jsonp(urlStaff)
				.success(
					function(result, status, header, config) {
						if (result.status == 'SUCCEED') {
							$scope.hideLoading();
							$scope.groups = result.groups.list;
						} else if (result.status == 'FAIL') {
							plus.nativeUI.toast('登录失败!');
						}
					}
				)
				.error(
					function(data) {
						plus.nativeUI.alert("访问服务器出错，请检查网络是否正常！");
					}
				);
		};
		$scope.init = function() {
			$scope.getStaffs();			
		};
		$scope.init();
	})