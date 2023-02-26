const express = require('express');
const mysql = require('mysql');

//create connection

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'nodemysql2'
});

//connect

db.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('mysql connected...!')
});

const app = express();
//create database
app.get('/createdb',(req,res)=>{
    let sql = 'create DATABASE nodemysql2';
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        res.send('database created...!')
    });
});


//create table

app.get('/createpoststable',(req,res)=>{
    let sql ='create TABLE posts(id int auto_increment primary key,title varchar(50),body varchar(50))';
    db.query(sql,(err,result)=>{
        if(err){  
            throw err;
        }
        console.log(result);
        res.send('posts table created...!')
    });
});

//insert records
app.get('/addpost1',(req,res)=>{
    let post = {title:'post one',body:'this is post number one'}
    let sql ='insert into posts set ?';
    let query = db.query(sql,post,(err,result)=>{
        if(err){  
            throw err;
        }
        console.log(result);
        res.send('post 1 inserted...!')
    });
});

//select records
app.get('/getposts',(req,res)=>{
    
    let sql ='select * from posts';
    let query = db.query(sql,(err,results)=>{
        if(err){  
            throw err;
        }
        console.log(results);
        res.send('posts fatched...!')
    });
});

//select single record
app.get('/getposts/:id',(req,res)=>{
    
    let sql =`select * from posts where id = ${req.params.id}`;
    let query = db.query(sql,(err,result)=>{
        if(err){  
            throw err;
        }
        console.log(result);
        res.send('post fatched...!')
    });
});

//update records
app.get('/updatepost/:id',(req,res)=>{
    let newTitle=`updated title`;
    let sql =`update posts set title ='${newTitle}' where id = ${req.params.id}`;
    let query = db.query(sql,(err,result)=>{
        if(err){  
            throw err;
        }
        console.log(result);
        res.send('post updated...!')
    });
});

//delete records

app.get('/deletepost/:id',(req,res)=>{
    let sql =`delete from posts where id = ${req.params.id}`;
    let query = db.query(sql,(err,result)=>{
        if(err){  
            throw err;
        }
        console.log(result);
        res.send('post deleted...!')
    });
});

app.listen(3000,()=>{
    console.log('listening to port 3000');
}) 

