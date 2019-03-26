var fs = require("fs");

var events = require("events");
var emitter = new events.EventEmitter();

var pathgpioyk = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0020/gpio";
var arrgpioyk = fs.readdirSync(pathgpioyk);
var gpioyk1num = Number(arrgpioyk[0].slice(8, 11));

var pathgpioyx = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0010/gpio";
var arrgpioyx = fs.readdirSync(pathgpioyx);
var gpioyx1num = Number(arrgpioyx[0].slice(8, 11));

var strLine = "———————————————————————————————————————————————————————————"
console.log(strLine);
var str1 = "|" + "请访问    /sys/class/gpio" + "/gpioxxx  " + "  路径即可操作对应端口" ;
console.log(str1)
var str2 = "|" + "xxx即下方每个端口的编号" ;

console.log(str2);

console.log(strLine);

var arrBoard = [];
var arrFileyx = [];
var arrFileyk = [];



//建立树莓派遥信map对象
var mapyx_file = new Map();

//树莓派遥控底板map对象
var gpioykmap = new Map();

//3:建立树莓派遥控扩展板编号-文件编号的map对应关系：
var mapyk_file = new Map();

//该函数树莓派上遥信底板-map
function Syxgpio_map(yx1file) {
	for(i = 1; i < 17; i++) {
		mapyx_file.set(i, yx1file);
		++yx1file;
	}
}

//该函数用于存储树莓派-遥信扩展板-map
function Syxmap(yxnum, filenum) {
	for(i = yxnum; i > yxnum - 16; i--) {
		mapyx_file.set(i, filenum);
		++filenum;
	}
}

//该函数用于向mapyk_file中存储树莓派扩展板遥控对应关系
function Smapyk_file(yknum, filenum) {
	for(i = yknum; i > yknum - 16; i--) {
		mapyk_file.set(i, filenum);
		++filenum;
	}
}

//该函数用于存储扩展板端口文件编号
function singleBoard(haschip_path, type, boardNum) {

	//var haschip8path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0028";
	var haschip_path = haschip_path;
	//获取当前i2c路径下的文件名数组：判断是否有gpio文件夹
	var files = fs.readdirSync(haschip_path);

	var flagchip = true;
	//判断该路径的文件夹下是否有名为gpio的文件夹
	for(i = 0; i < files.length; i++) {
		if(files[i] == 'gpio') {

			//当前i2c目录下gpio文件夹路径
			var chip_path = haschip_path + "/gpio";

			//当前gpio文件夹下文件名数组：gpio/gpio432
			var filesChip = fs.readdirSync(chip_path);
			//获取当前扩展板上最大端口文件编号
			var chipBignum = Number(filesChip[0].slice(8, 11));

			if(type == "yx") {
				Syxmap(32, chipBignum);
			}

			if(type == "yk") {
				Smapyk_file(32 + (boardNum - 1) * 16, chipBignum);
			}

			flagchip = false;
			if(type == "yx") {
				var str = "第" + boardNum + "块遥信扩展板已安装";

			}

			if(type == "yk") {
				var str = "第" + boardNum + "块遥控扩展板已安装";

			}

			arrBoard.push(str)
			//console.log(str);

			break;

		}
	}
	if(flagchip) {
		if(type == "yx") {
			var str = "第" + boardNum + "块遥信扩展板未安装";
		}
		if(type == "yk") {
			var str = "第" + boardNum + "块遥控扩展板未安装";
		}

		arrBoard.push(str)
		//console.log(str);
	}

}

//向map容器中存储对应关系
function getInitMsg() {
	//获取底板上第一个遥控对应的文件编号：即树莓派的遥控1的文件编号：

	//向遥信map中存储遥信底板端口文件编号
	Syxgpio_map(gpioyx1num);

	//建立树莓派上第一块遥信扩展板和文件编号的map对应关系:
	var hasyxchip1path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0011";
	singleBoard(hasyxchip1path, "yx", 1);
	
	var hasyxchip1path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0012";
	singleBoard(hasyxchip1path, "yx", 2);
	
	var hasyxchip1path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0013";
	singleBoard(hasyxchip1path, "yx", 3);
	
	var hasyxchip1path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0014";
	singleBoard(hasyxchip1path, "yx", 4);
	
	var hasyxchip1path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0015";
	singleBoard(hasyxchip1path, "yx", 5);
	
	var hasyxchip1path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0016";
	singleBoard(hasyxchip1path, "yx", 6);

	var numgpio = gpioyk1num;
	for(i = 1; i < 17; i++) {
		gpioykmap.set(i, numgpio);
		++numgpio;
	}

	//获取树莓派第一块扩展板上最后一个遥控yk32与文件的对应关系：

	var haschip1path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0021";
	singleBoard(haschip1path, "yk", 1);

	//获取树莓派遥控第二块扩展板上最后一个遥控yk48与文件编号的对应关系：
	var haschip2path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0022";
	singleBoard(haschip2path, "yk", 2);

	//获取树莓派第三块遥控扩展板上最后一个遥控yk64与文件编号的对应关系：
	var haschip3path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0023";
	singleBoard(haschip3path, "yk", 3);

	//获取树莓派第4块遥控扩展板上最后一个遥控yk80与文件的对应关系：
	var haschip4path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0024";
	singleBoard(haschip4path, "yk", 4);

	//获取树莓派第5块遥控扩展板上最后一个遥控yk96与文件的对应关系：
	var haschip5path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0025";
	singleBoard(haschip5path, "yk", 5);

	//获取树莓派第6块遥控扩展板上最后一个遥控yk112与文件的对应关系：
	var haschip6path = "../../../sys/devices/platform/soc/3f804000.i2c/i2c-1/1-0026";
	singleBoard(haschip6path, "yk", 6);

	global.gpioyk1num = gpioyk1num;
	global.gpioyx1num = gpioyx1num;

	global.mapyk_file = mapyk_file;
	global.mapyx_file = mapyx_file;

	//树莓派底板遥控map
	global.gpioykmap = gpioykmap;

}
getInitMsg();

//这个函数功能是：向export中写入所有遥控/遥信文件编号-向遥控文件中写入out-向遥信文件中写入in
function export_dirInit(arr) {

	//计算出arr中所有元素的总数：
	var length;
	for(var i = 0; i < 3; i++) {
		length += arr[i].length;
	}
	//console.log(length);
	var flag = 0;

	for(var i = 0; i < 3; i++) {


		//先遍历树莓派底板遥控：
		arr[i].forEach(function(value, key) {

			if(i == 0) {
				var str = "遥控底板" + key + "——" + value;
				arrFileyk.push(str);
				
				//此时遍历的是遥控数组
				var dir="out";
			}

			if(i == 1) {
				var str = "遥控扩展板" + key + "——" + value;
				arrFileyk.push(str);
				
				//此时遍历的是遥控数组
				var dir="out";
			}

			if(i == 2) {

				if(key < 17) {
					var str = "遥信底板" + key + "——" + value;

				} else {
					var str = "遥信扩展板" + key + "——" + value;

				}
				arrFileyx.push(str);
				
				//此时遍历的是遥信数组
				var dir = "in"
				

			}


			//先写入遥vaio" + value;
			fs.writeFile("../../../sys/class/gpio/export", value, function(err) {
				//console.log("export写入成功-");

				var dirpath = "gpio" + value;
				var urldir = "../../../sys/class/gpio/" + dirpath + "/direction";

				
				setTimeout(function() {
					//然后依次向direction中写入out：此时是不管上面的export文件有没有写入成功
					fs.writeFile(urldir, dir, function(errdir) {
						
						
						if(errdir) {
							console.log("方向写入失败~~~~~~");
							
							console.log("错误X：请检查遥控板和遥信板的位置是否正常安装-")
							process.exit();
						} else {
							//console.log("方向写入成功~~");
							
							/*if(dir=="in"){
							 console.log("in写入成功---")
							}*/
						}

						//一个端口的export和dir写入成功-
						flag++;

						if(flag == length) {
							//此时最后一个端口的export-dir已经初始化完毕：
							//emitter.emit("print")
						}
					});

				}, 1000)

			})

		})

	}

	console.log("|" + "gpio端口初始化完毕~~~~可进行遥控控合控合-遥信状态读取");
	console.log(strLine);
}

//初始化操作：文件编号写入export，out/in方向的写入
export_dirInit([gpioykmap, mapyk_file, mapyx_file]);

function addlength(arr,strLength1,strLength2){
		for(i = 0; i < arr.length; i++) {
	
			var length = arr[i].length;
			
			if(i<16){
				if(length < strLength1) {
					for(j = 0; j < strLength1 - length; j++) {
						arr[i] += " ";
					}
				}
			}else{
				if(length < strLength2) {
					for(j = 0; j < strLength2 - length; j++) {
						arr[i] += " ";
					}
				}
			}
		}
	}
	
	

setTimeout(function() {

	addlength(arrBoard,47,1);
		
	for(i = 0; i < arrBoard.length; i++) {
		var str = "|" + arrBoard[i]
		console.log("|" + arrBoard[i]+"|");
		
		if(i==5){
			console.log(strLine)
		}
	}
	
	var strLength1=24;
	var strLength2=23;
	
	
	

	addlength(arrFileyk,strLength1,strLength2);
	addlength(arrFileyx,strLength1,strLength2)
	
	
	console.log(strLine);

	var length = arrFileyk.length > arrFileyx.length ? arrFileyk.length : arrFileyx.length;
	
	for(i = 0; i < length; i++) {
	
		if(typeof arrFileyk[i] == "undefined") {

				//遥控无-遥信有
				//console.log("遥控无-遥信有")
				table(" ", arrFileyx[i]);
			
		} else {
			if(typeof arrFileyx[i] == "undefined") {
				//遥控有-遥信无
				//console.log("遥控有-遥信无")
				table(arrFileyk[i], " ")
			} else {
				//遥控有-遥信有
				//console.log("遥控有-遥信有")
				table(arrFileyk[i], arrFileyx[i])
			}
		}

	}

	console.log(strLine);

}, 2000)


var strNone="";
for(var i = 0; i < 28; i++) {
	strNone += " "
}

function table(stryk, stryx) {

	if(Number(stryk) == 0) {

		//遥控无-遥信有

		//var str="|"+ "     " +"                       "+stryx	;
		var str = "|" + strNone+"|"+stryx+"|";

	} else {
		if(Number(stryx) == 0) {
			//遥控有-遥信无
			//var str="|"+ stryk +"              "+"     "
			var str = "|" + stryk + "|" + strNone + "|";

		} else {
			//遥控有-遥信有
			var str = "|" + stryk + "|" + stryx + "|"
		}
	}

	//var str="|"+ stryk +"              "+stryx+"        |"
	console.log(str);

}