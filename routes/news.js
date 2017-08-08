var express=require("express");
var mysql=require("mysql");
var router=express.Router();



var pool=mysql.createPool({
	host:"127.0.0.1",
	user:"root",
	password:"",
	database:"exam",
	port:"3306"
});



router.get('/news1',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('select * from news',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})

router.post('/news2',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body["id"]
	pool.query(`select * from news where id=${id}`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})


router.post('/dlnews',function(req,res){
	var id=req.body["id"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`delete from news where id=${id}`, function(err, rows, fields) {
	pool.query('select * from news',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
	});
})

router.post('/upnews',function(req,res){
	var id=req.body["id"]
	var title=req.body["title"]
	var content=req.body["content"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update news set  title="${title}" , content="${content}" where id=${id}`, function(err, rows, fields) {
		pool.query('select * from news',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
	});
})


module.exports=router;