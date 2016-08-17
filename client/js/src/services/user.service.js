"use strict";

function userService (
	$rootScope,
	){

	return {

		// could probably do with making these a little bit more composable....
		// use a high-order function (TODO)
		currentUsername: (newVal) => {
			let name = "guest";
			if (!newVal){
				return name;
			}
			else
			{
				name = newVal;
				return name.split(" ")[0];
			}
		},

		currentAvatar: (newSrc) => {
			let src = "img/detective.png";
			if (!newSrc){
				return src;
			}
			else
			{
				src = newSrc;
				return src;
			}
		},

		currentUid: (newUid) => {
			let id = 0;
			if (!newUid){
				return id;
			}
			else
			{
				id = newUid;
				return id;
			}
		}

	}

}

export default userService;
