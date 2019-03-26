var fs=require("fs");

/* 创建树莓派上遥控遥信的map容器*/
function getInitMsg() {
	//获取底板上第一个遥控对应的文件编号：即树莓派的遥控1的文件编号：
	var pathgpioyk = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0020/gpio";
	var arrgpioyk = fs.readdirSync(pathgpioyk);
	var gpioyk1num = Number(arrgpioyk[0].slice(8, 11));

	var pathgpioyx = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0010/gpio";
	var arrgpioyx = fs.readdirSync(pathgpioyx);
	var gpioyx1num = Number(arrgpioyx[0].slice(8, 11));

	console.log("gpioyx1num", gpioyx1num);
	console.log("gpioyk1num", gpioyk1num);


	//定义一个数组用于采集扩展板安装情况：
	var arrchip = [];
	//建立树莓派遥信的map
	var mapyx_file = new Map();
	//该函数用于存储树莓派上遥信底板的map
	function Syxchip_map(yx1file) {
		for (i = 1; i < 17; i++) {
			mapyx_file.set(i, yx1file);
			++yx1file;
		}
	}

	//该函数用于存储树莓派上!! !遥信扩展板! !!的map
	function Syxmap(yxnum, filenum) {
		for (i = yxnum; i > yxnum - 16; i--) {
			mapyx_file.set(i, filenum);
			++filenum;
		}
	}

	Syxchip_map(gpioyx1num);
	//console.log(mapyx_file)

	//建立树莓派上第一块遥信扩展板和文件编号的map对应关系:
	var hasyxchip1path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0011";
	var arrhasyxchip1 = fs.readdirSync(hasyxchip1path);
	var yxchip1flag = true;
	//然后判断这个数组中是否有gpio文件夹
	for (i = 0; i < arrhasyxchip1.length; i++) {
		if (arrhasyxchip1[i] == "gpio") {
			//则表示此时有遥信第一块扩展板
			var yxchip1path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0011/gpio";
			var arryxchip1 = fs.readdirSync(yxchip1path);

			var yx32num = arryxchip1[0].slice(8, 11);

			//向map中存储树莓派第一块扩展板上的对应关系
			yxchip1flag = false;
			Syxmap(32, yx32num);

			break;

		}
	}
	if (yxchip1flag) {
		console.log("此时还未安装第一块遥信扩展板");
		var str = "第一块遥信扩展板未安装"
		arrchip.push(str);
	}


	//树莓派底板上遥控编号-文件编号map
	var gpioykmap = new Map();
	var numgpio = gpioyk1num;
	for (i = 1; i < 17; i++) {
		gpioykmap.set(i, numgpio);
		++numgpio;
	}
	/* //该函数用于向存储树莓派上!!底板!!遥控-文件编号对应关系：
	function Sgpiomapyk(yknum, filenum) {
		for (i = yknum; i < yknum + 16; i++) {
			mapyk_file.set(i, filenum);
			++filenum;
		}
	}
	Sgpiomapyk(1, gpioyk1num); */


	//3:建立树莓派遥控编号-文件编号的map对应关系：
	var mapyk_file = new Map();

	//该函数用于向mapyk_file中存储树莓派扩展板遥控对应关系
	function Smapyk_file(yknum, filenum) {
		for (i = yknum; i > yknum - 16; i--) {
			mapyk_file.set(i, filenum);
			++filenum;
		}
	}

	//获取树莓派第一块扩展板上最后一个遥控yk32与文件的对应关系：
	var haschip1path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0021";
	var arrhaschip1 = fs.readdirSync(haschip1path);
	var flagchip1 = true;
	for (i = 0; i < arrhaschip1.length; i++) {
		if (arrhaschip1[i] == 'gpio') {
			//则表示此时已经安装了第一块拓展板chip1
			//获取第一块扩展板上最后一个遥控：YK32的文件编号
			var chip1path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0021/gpio";
			var arrchip1 = fs.readdirSync(chip1path);
			var chip1yk32num = Number(arrchip1[0].slice(8, 11));

			//填充第一块扩展板上的遥控与文件对应关系
			Smapyk_file(32, chip1yk32num);

			/* console.log("第一块遥控扩展板map");
			console.log(mapyk_file); */
			flagchip1 = false;
			break;
		}
	}
	if (flagchip1) {
		console.log("还未安装第一块遥控扩展板");
		var str = "第一块遥控扩展板未安装";
		arrchip.push(str);
	}


	//获取树莓派遥控第二块扩展板上最后一个遥控yk48与文件编号的对应关系：
	var haschip2path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0022";
	var arrhaschip2 = fs.readdirSync(haschip2path);
	var flagchip2 = true;
	for (i = 0; i < arrhaschip2.length; i++) {
		if (arrhaschip2[i] == "gpio") {
			var chip2path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0022/gpio";
			var arrchip2 = fs.readdirSync(chip2path);
			var chip2yk48num = Number(arrchip2[0].slice(8, 11));

			//填充第二块扩展板上的遥控与文件对应关系
			Smapyk_file(48, chip2yk48num);

			/* 	console.log("第2块遥控扩展板map");
				console.log(mapyk_file); */

			flagchip2 = false;

			break;
		}
	}
	if (flagchip2) {
		console.log("第二块扩展板还未安装~");
		var str = "第二块遥控扩展板未安装";
		arrchip.push(str);
	}

	//获取树莓派第三块遥控扩展板上最后一个遥控yk64与文件编号的对应关系：
	var haschip3path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0023";
	var arrhaschip3 = fs.readdirSync(haschip3path);
	var flagchip3 = true;
	for (i = 0; i < arrhaschip3.length; i++) {
		if (arrhaschip3[i] == "gpio") {
			var chip3path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0023/gpio";
			var arrchip3 = fs.readdirSync(chip3path);
			var chip3yk64num = Number(arrchip3[0].slice(8, 11));

			//填充第三块扩展板上的遥控与文件对应关系
			Smapyk_file(64, chip3yk64num);

			/* console.log("第3块遥控扩展板map");
			console.log(mapyk_file); */


			flagchip3 = false;
			break;
		}

	}
	if (flagchip3) {
		console.log("还未安装第三块扩展板~");
		var str = "第三块遥控扩展板未安装";
		arrchip.push(str);
	}

	//获取树莓派第4块遥控扩展板上最后一个遥控yk80与文件的对应关系：
	var haschip4path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0024";
	var arrhaschip4 = fs.readdirSync(haschip4path);
	var flagchip4 = true;
	for (i = 0; i < arrhaschip4.length; i++) {
		if (arrhaschip4[i] == "gpio") {
			//此时可以确定有第4块扩展板：
			var chip4path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0024/gpio"
			var arrchip4 = fs.readdirSync(chip4path);
			var chip4yk80num = Number(arrchip4[0].slice(8, 11));

			//填充第4块扩展板上的遥控与文件对应关系
			Smapyk_file(80, chip4yk80num);

			/* console.log("第4块遥控扩展板map");
			console.log(mapyk_file); */

			flagchip4 = false;
			break;
		}
	}
	if (flagchip4) {
		console.log("树莓派第四块扩展板未安装");
		var str = "第四块遥控扩展板未安装";
		arrchip.push(str);
	}

	//获取树莓派第5块遥控扩展板上最后一个遥控yk96与文件的对应关系：
	var haschip5path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0025";
	var arrhaschip5 = fs.readdirSync(haschip5path);
	var flagchip5 = true;
	for (i = 0; i < arrhaschip5.length; i++) {
		if (arrhaschip5[i] == "gpio") {
			//此时可以确定有第5块扩展板：
			var chip5path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0025/gpio"
			var arrchip5 = fs.readdirSync(chip5path);
			var chip5yk96num = Number(arrchip5[0].slice(8, 11));

			//填充第4块扩展板上的遥控与文件对应关系
			Smapyk_file(96, chip5yk96num);

			flagchip5 = false;
			break;
		}
	}
	if (flagchip5) {
		console.log("树莓派第五块扩展板未安装");
		var str = "第五块遥控扩展板未安装";
		arrchip.push(str);
	}

	//获取树莓派第6块遥控扩展板上最后一个遥控yk112与文件的对应关系：
	var haschip6path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0026";
	var arrhaschip6 = fs.readdirSync(haschip6path);
	var flagchip6 = true;
	for (i = 0; i < arrhaschip6.length; i++) {
		if (arrhaschip6[i] == "gpio") {
			//此时可以确定有第6块扩展板：
			var chip6path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0026/gpio"
			var arrchip6 = fs.readdirSync(chip6path);
			var chip6yk112num = Number(arrchip6[0].slice(8, 11));

			//填充第6块扩展板上的遥控与文件对应关系
			Smapyk_file(112, chip6yk112num);

			flagchip6 = false;
			break;
		}
	}
	if (flagchip6) {
		console.log("树莓派第六块扩展板未安装");

		var str = "第六块遥控扩展板未安装";
		arrchip.push(str);
	}
	//获取树莓派第7块遥控扩展板上最后一个遥控yk128与文件的对应关系：
	var haschip7path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0027";
	var arrhaschip7 = fs.readdirSync(haschip7path);
	var flagchip7 = true;
	for (i = 0; i < arrhaschip7.length; i++) {
		if (arrhaschip7[i] == "gpio") {
			//此时可以确定有第6块扩展板：
			var chip7path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0027/gpio"
			var arrchip7 = fs.readdirSync(chip7path);
			var chip7yk128num = Number(arrchip7[0].slice(8, 11));

			//填充第7块扩展板上的遥控与文件对应关系
			Smapyk_file(128, chip6yk112num);

			flagchip7 = false;
			break;
		}
	}
	if (flagchip7) {
		console.log("树莓派第七块扩展板未安装");

		var str = "第七块遥控扩展板未安装";
		arrchip.push(str);
	}

	var mapchip8 = new Map();
	//获取树莓派第8块遥控扩展板上最后一个遥控yk144与文件的对应关系：
	var haschip8path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0028";
	var arrhaschip8 = fs.readdirSync(haschip8path);
	var flagchip8 = true;
	for (i = 0; i < arrhaschip8.length; i++) {
		if (arrhaschip8[i] == "gpio") {
			//此时可以确定有第6块扩展板：
			var chip8path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0028/gpio"
			var arrchip8 = fs.readdirSync(chip8path);
			var chip8yk144num = Number(arrchip8[0].slice(8, 11));

			//填充第8块扩展板上的遥控与文件对应关系
			Smapyk_file(144, chip8yk144num);
			var file = chip8yk144num;
			for (i = 144; i < 144 - 16; i--) {
				mapchi8.set(i, file);
				++file;
			}

			flagchip8 = false;
			break;
		}
	}
	if (flagchip8) {
		console.log("树莓派第八块扩展板未安装");

		var str = "第八块遥控扩展板未安装";
		arrchip.push(str);
	}


	/* //获取树莓派第9块遥控扩展板上最后一个遥控yk144与文件的对应关系：
	var haschip9path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0029";
	var arrhaschip9 = fs.readdirSync(haschip9path);
	var flagchip9 = true;

	if (flagchip9) {
		console.log("树莓派第9块扩展板未安装");

		var str = "第九块遥控扩展板未安装";
		arrchip.push(str);
	}

	//获取树莓派第10块遥控扩展板上最后一个遥控yk144与文件的对应关系：
	var haschip10path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-002a";
	var arrhaschip10 = fs.readdirSync(haschip10path);
	var flagchip10 = true;

	if (flagchip10) {
		console.log("树莓派第10块扩展板未安装");

		var str = "第十块遥控扩展板未安装";
		arrchip.push(str);
	}

 */



	/* 该函数向外暴露的是：
	   (1)树莓派公共端YK1的文件编号：
	   (2)树莓派遥信1文件编号：
	   (3)遥控编号-文件编号map
	   (4)遥信编号-文件编号map
	   (5)树莓派遥控底板-文件编号map
	   */
	global.gpioyk1num = gpioyk1num;
	global.gpioyx1num = gpioyx1num;

	global.mapyk_file = mapyk_file;
	global.mapyx_file = mapyx_file;
	
	//树莓派底板遥控map
	global.gpioykmap = gpioykmap;
	global.mapchip8 = mapchip8;
	//该数组用于存储各个扩展板安装情况信息：
	global.arrchip = arrchip;

	/* //每次调用该函数的时候，都将以上信息参数打印到日志中
	logger_msg.info("gpioyk1num", gpioyk1num);
	logger_msg.info("gpioyx1num", gpioyx1num);

	logger_msg.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	logger_msg.info("gpioykmap", gpioykmap);

	logger_msg.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	logger_msg.info("mapyk_file", mapyk_file);

	logger_msg.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	logger_msg.info("mapyx_file", mapyx_file);

	logger_msg.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	logger_msg.info("arrchip", arrchip);
 */
}
getInitMsg();


//这个函数功能是：向export中写入所有遥控/遥信文件编号-向遥控文件中写入out-向遥信文件中写入in
function export_dirInit() {

	//先遍历树莓派底板遥控：
	gpioykmap.forEach(function(value, key) {
		//先写入遥控export
		fs.writeFile("../../../sys/class/gpio/export", value, function(err) {
			/* if(err){
				console.log("树莓派底板export写入失败~~~~",err)
			}else{
			
			}
			 */
			//再写入out方向
						var dirpath = "gpio" + value;
						var urldir = "../../../sys/class/gpio/" + dirpath + "/direction"
			
						//然后依次向direction中写入out：此时是不管上面的export文件有没有写入成功
						fs.writeFile(urldir, "out", function(errdir) {
							if (errdir) {
								//console.log("树莓派底板遥控方向写入失败~~~~~~",errdir)
							} else {
								//console.log("树莓派底板遥控继续写入方向了~~")
							}
			
						}); 
			
			//console.log("dir之后~~~")

		})

			/* 
			不用同步模式的原因是：
			1：每次在shutdown第一次后初始化时，方向都会写入失败，就会报错，在同步模式下，没办法处理异常
			   一有报错就会中断程序，不能继续往下执行
			2：使用异步回调，可以在回调函数中处理抛出的异常，使程序健壮，向export二次写入的时候
			   可以忽略这个错误，继续往下执行
			fs.writeFileSync("../../../sys/class/gpio/export", value);
				//再写入out方向
				var dirpath = "gpio" + value;
				var urldir = "../../../sys/class/gpio/" + dirpath + "/direction"
				
				//然后依次向direction中写入out：此时是不管上面的export文件有没有写入成功
				fs.writeFileSync(urldir, "out");
 */

	})

	//先遍历树莓派扩展板遥控map
	mapyk_file.forEach(function(value, key) {
		//先写入遥控export
		fs.writeFile("../../../sys/class/gpio/export", value, function(err) {
			//再写入out方向
			var dirpath = "gpio" + value;
			var urldir = "../../../sys/class/gpio/" + dirpath + "/direction"

			//然后依次向direction中写入out：此时是不管上面的export文件有没有写入成功
			fs.writeFile(urldir, "out", function(errdir) {
				if(errdir){
					//console.log("树莓派遥控扩展板方向设置失败~~",errdir)
				}else{
					//console.log("树莓派遥控扩展板写入方向成功~~")
				}
				
			})
		})

		/* fs.writeFile("../../../sys/class/gpio/export", value)
		//再写入out方向
		var dirpath = "gpio" + value;
		var urldir = "../../../sys/class/gpio/" + dirpath + "/direction"
		
		//然后依次向direction中写入out：此时是不管上面的export文件有没有写入成功
		fs.writeFile(urldir, "out") */


	})
	//再遍历树莓派遥信map:包括扩展板和底板
	mapyx_file.forEach(function(value, key) {
		//先向export中写入遥信文件编号：
		fs.writeFile("../../../sys/class/gpio/export", value, function(err) {
			//再写入遥信in方向
			var dirpath = "gpio" + value;
			var urldir = "../../../sys/class/gpio/" + dirpath + "/direction"

			//然后依次向direction中写入out：此时是不管上面的export文件有没有写入成功
			fs.writeFile(urldir, "in", function(errdir) {
				if(errdir){
					//console.log("树莓派遥信方向设置失败~~",errdir)
				}else{
					//console.log("树莓派遥信方向设置成功~~")
				}
				
				
			})

		})

		/* fs.writeFile("../../../sys/class/gpio/export", value);
			//再写入遥信in方向
			var dirpath = "gpio" + value;
			var urldir = "../../../sys/class/gpio/" + dirpath + "/direction"
		
			//然后依次向direction中写入out：此时是不管上面的export文件有没有写入成功
			fs.writeFile(urldir, "in");
			 */

	})
	console.log(mapyx_file)
	console.log("export初始化函数执行完毕~~~~")


}

//初始化操作：文件编号写入export，out/in方向的写入
export_dirInit();



