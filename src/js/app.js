
angular.module('starter', ['ionic', 'ngAnimate','starter.controllers', 'starter.services'])
.run(function($ionicPlatform, $http, $ionicPopup, $ionicLoading, Userinfo) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		// 设备准备完后 隐藏启动动画
		//navigator.splashscreen.hide();
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleLightContent();
		}
		//启动极光推送服务
		// window.plugins.jPushPlugin.init();
		//调试模式
		// window.plugins.jPushPlugin.setDebugMode(true);
		//检查更新
		checkUpdate();
		function checkUpdate() {

		};

		function showUpdateConfirm(desc, url) {
			var confirmPopup = $ionicPopup.confirm({
				title: '有新版本了！是否要升级？',
				template: desc,
				cancelText: '下一次',
				okText: '确定'
			});
			var url = url;
			confirmPopup.then(function(res) {
				if (res) {
					window.open(url, '_system', 'location=yes');
				};

			});
		}
	});
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	//andoird 底部出现在了上部 解决方案
	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('standard');

	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('center');

	$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
	$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

	$ionicConfigProvider.platform.ios.views.transition('ios');
	$ionicConfigProvider.platform.android.views.transition('android');
	//$ionicConfigProvider.views.maxCache(0);
	// setup an abstract state for the tabs directive
	$stateProvider.state('tab', {
		url: "/tab",
		abstract: true,
		templateUrl: "themes/tabs.html",
		controller: "Workbench.Index"
	})
	.state('tab.home', {
		url: '/home',
		views: {
			'home-tab': {
				templateUrl: 'themes/home.index.html',
				controller: 'Home.Index'
			}
		}
	})
	.state('tab.message', {
		url: '/message',
		views: {
			'message-tab': {
				templateUrl: 'themes/message.index.html',
				controller: 'Message.Index'
			}
		}
	})
	.state('tab.user', {
		url: '/user',
		views: {
			'user-tab': {
				templateUrl: 'themes/user.index.html',
				controller: 'User.Index'
			}
		}
	})
	.state('tab.app', {
		url: '/app',
		views: {
			'app-tab': {
				templateUrl: 'themes/app.index.html',
				controller: 'App.Index'
			}
		}
	})
	.state('default', {
		url: '/default',
		abstract: true,
		templateUrl: 'themes/default.index.html',
		controller: 'Default.Index'
	})
	.state('default.welcome', {
		url: '/welcome',
		views: {
			'welcome-page': {
				templateUrl: 'themes/default.welcome.html',
				controller: 'Default.Welcome'
			}
		}
	})
	.state('tab.notify', {
		url: '/notify',
		abstract: true,
		templateUrl: 'themes/notify.index.html',
		controller: 'Notify.Index'
	})
	.state('tab.notify-detail', {
		url: '/notify/:notifyId/detail',		
		views: {
			'home-tab': {
				templateUrl: 'themes/notify.detail.html',
				controller: 'Notify.Detail'
			}
		}
	})
	.state('tab.contact-index', {
		url: '/contact',
		views: {
			'contact-tab': {
				templateUrl: 'themes/category.index.html',
				controller: 'Contact.Index'
			}
		}
	})
	.state('page', {
		url: '/about',
		abstract: true,
		templateUrl: 'themes/page.index.html',
		controller: 'Page.Index'
	})
	.state('tab.about', {
		url: '/about',
		views: {
			'user-tab': {
				templateUrl: 'themes/user.about.html',
				controller: 'User.About'
			}
		}
	})
	.state('tab.edit', {
		url: '/edit',
		views: {
			'user-tab': {
				templateUrl: 'themes/user.edit.html',
				controller: 'User.Edit'
			}
		}
	})
	.state('usergroup', {
		url: '/usergroup',
		abstract: true,
		templateUrl: 'themes/usergroup.index.html',
		controller: 'UserGroup.Index'
	})
	.state('usergroup.chat', {
		url: '/chat/:groupId/start',
		views: {
			'usergroup-page': {
				templateUrl: 'themes/usergroup.chat.html',
				controller: 'UserGroup.Chat'
			}
		}
	})
	.state('contact', {
		url: '/contact',
		abstract: true,
		templateUrl: 'themes/contact.index.html',
		controller: 'Contact.Index'
	})
	.state('tab.person', {
		url: '/person',
		views: {
			'contact-tab': {
				templateUrl: 'themes/contact.person.html',
				controller: 'Contact.Person'
			}
		}
	})
	.state('tab.company_index', {
		url: '/company',
		views: {
			'contact-tab': {
				templateUrl: 'themes/contact.company.html',
				controller: 'Contact.Company'
			}
		}
	})
	.state('tab.group', {
		url: '/group',
		views: {
			'contact-tab': {
				templateUrl: 'themes/contact.group.html',
				controller: 'Contact.Group'
			}
		}
	})
	.state('tab.department_detail', {
		url: '/department/:departmentId/:superiorDept',
		views: {
			'contact-tab': {
				templateUrl: 'themes/contact.department.html',
				controller: 'Contact.Department'
			}
		}		
	})
	.state('tab.staff_detail', {
		url: '/staff/:staffId',
		views: {
			'contact-tab': {
				templateUrl: 'themes/contact.staff.html',
				controller: 'Contact.Staff'
			}
		}		
	})
	.state('contact.detail', {
		url: '/detail/:staffId',
		views: {
			'contact-page': {
				templateUrl: 'themes/contact.detail.html',
				controller: 'Contact.Detail'
			}
		}		
	})
	$urlRouterProvider.otherwise('/tab/home');
	/*if (!window.localStorage['first']) {
		$urlRouterProvider.otherwise('/default/welcome');
	} else {
		$urlRouterProvider.otherwise('/tab/home');
	}*/
});