var fs=require("fs");
var Epoll=require("epoll").Epoll;

var path=require("path");

const buffer = Buffer.alloc(1); 



//poll certain gpio

//初始化工作
//完成gpio7的初始化即：export的写入和in方向的设置：

var gpio = 7;

var gpioNum="gpio"+gpio;
var gpioUrl="../../../../sys/class/gpio/"+gpioNum;
//var gpioUrl=path.join(__dirname,gpioUrl);

var export_url="../../../../sys/class/gpio/export";
var value_url="../../../../sys/class/gpio/gpio" + gpio + "/value";

var flag=true;

//向export文件中写入gpio编号：
fs.writeFile(export_url,gpio,function(){
	
	//向gpio7文件夹下的direction文件中写入方向
	var dir_url="../../../../sys/class/gpio/gpio"+gpio+"/direction";	
	//设置方向
	fs.writeFileSync(dir_url,"in");
	
	//先判断当前gpio7文件夹下面有没有edge文件
	fs.readdir(gpioUrl,function(err,files){
	
		files.map(function(item,index){
			if(item == "edge"){
				flag=false;
			}
		})
		
		if(flag){
			console.log("当前gpio文件下没有edge文件");
			
		}else{
			
			
			//设置edge文件的值：上升沿、下降沿，全部
			var edgeurl="../../../../sys/class/gpio/gpio"+gpio+"/edge"
			fs.writeFile(edgeurl,"rising",function(err){
				if(err){
					console.log("edge文件写入失败");
					console.log(err);
				}
				console.log("edge文件上升沿设置成功~~~~");
				
				//就监听gpio20的value值：
				var poller=new Epoll(function(err,fd,event){
					//理论上gpio20 的value文件由0~~1时，该回调函数会被触发
					
					//为了排除干扰：再加一层判断：当此时value==1时，执行关机：
					console.log("epoll callback:");
					
					//poller.remove(fd);
					//需将fd文件描述符读取一次，否则epoll函数会被不断触发
					fs.readSync(fd,buffer,0,1,0);
					//console.log(buffer.toString() === '1' ? 'pressed' : 'released');
						
				})

				//epoll模块是通过对gpio20-value文件的文件描述符进行监听：
				//用openSync方法以同步的只读模式打开gpio-value文件：该方法会将value文件的文件描述符作为返回值
				var valuefd=fs.openSync(value_url,"r")
				//绑定事件：
				poller.add(valuefd, Epoll.EPOLLPRI);
			})
				
		}
		
	})



});


			


			




