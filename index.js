const mysql = require('mysql2')

const express = require('express')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const { Parser } = require('json2csv');

const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const YAML = require('yaml')
const file = fs.readFileSync('./swagger.yaml' , 'utf8')
const swaggerDocument = YAML.parse(file)

var qa = require('./QA.json')

const fastcsv=require("fast-csv")
const { Writable } = require('stream');

const app = express()
const cors = require('cors')
const json = require('body-parser/lib/types/json')
const { error } = require('console')
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
const port = process.env.PORT|5000

const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'deep_sea'
})
//console.log(process.env.USER)
//up to server
/*const pool = mysql.createPool({
    host: 'mariadb',
    user: 'oph',
    password: 'buopen@dm1n2024',
    database: 'oph',
    waitForConnections: true,
    connectionLimit: 10, // กำหนดจำนวนการเชื่อมต่อสูงสุดใน pool
    queueLimit: 0        // ไม่จำกัดจำนวนคิวที่รอการเชื่อมต่อ
});*/

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database successfully!');
});


//-------------------------------------Status-------------------------------------//
//test
app.get('/api/register_status', (req, res) => {
    pool.query('SELECT * FROM register_status', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


//Endpoint to get all status 
app.get('/register_status' , (req, res) => {
    connection.query(
        'SELECT * FROM register_status',
        function(err, results){
            res.json(results)
        }
    )
})

//Endpoint to add a new status 
app.post('/register_status' , (req, res) => {
    const {status_name} = req.body
    connection.query(
        'INSERT INTO register_status (status_name) VALUES (?)',
        [status_name],
        function(err, results){
            res.json(results)
        }
    )
})

/*/Endpoint to uddate a new status 
app.put('/register_status' , (req, res) => {
    const {id,status_name} = req.body
    connection.query(
        'UPDATE register_status SET status_name=? WHERE id =?',
        [status_name, id],
        function(err, results){
            res.json(results)
        }
    )

})*/

//Endpoint to get status id 
app.get('/register_status/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT * FROM register_status WHERE status_id=?',
        [id],
        function(err, results){
            if (results.length > 0 ) {
                res.json(results[0])
            } else {
            res.json({'status' : 'not found'}) 
            }
        }
    )
})

/*/Endpoint to delete status id 
app.delete('/register_status/:id' , (req, res) => {
    const id = req.params.id
    connection.query(
        'DELETE FROM register_status WHERE id=?',
        [id],
        function(err, results){
            res.json(results)
        }
    )
})*/

//-------------------------------------Age-------------------------------------//
//Endpoint to get all age 
app.get('/register_age' , (req, res) => {
    connection.query(
        'SELECT * FROM register_age',
        function(err, results){
            res.json(results)
        }
    )
})

//Endpoint to add a new age 
app.post('/register_age' , (req, res) => {
    const {age_name} = req.body
    connection.query(
        'INSERT INTO register_age (age_name) VALUES (?)',
        [age_name],
        function(err, results){
            res.json(results)
        }
    )
})



//Endpoint to get age id 
app.get('/register_age/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT * FROM register_age WHERE age_id=?',
        [id],
        function(err, results){
            if (results.length > 0 ) {
                res.json(results[0])
            } else {
            res.json({'age' : 'not found'})
            }
        }
    )
})

//-------------------------------------email-------------------------------------//
//Endpoint to get all status 
app.get('/register_email' , (req, res) => {
    connection.query(
        'SELECT * FROM register_email',
        function(err, results){
            res.json(results)
        }
    )
})

//Endpoint to add a new status 
app.post('/register_email' ,urlencodedParser,function(req, res){
    console.log(req.body)
    const {email_name} = req.body

    // Check if email_name contains '@'
    if (!email_name.includes('@')) {
        return res.status(400).json({ error: 'error' });
    }
    
    connection.query(
        'INSERT INTO register_email (email_name) VALUES (?)',
        [email_name],
        function(err, results){
            res.json(results)
        }
    )
})

app.get('/register_email/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT * FROM register_email WHERE email_id=?',
        [id],
        function(err, results){
            if(err){
                return res.json({'email' : 'not found'})
            }
            if (results.length > 0 ) {
                res.json(results[0])
            } else {
            res.json({'email' : 'not found'})
            }
        }
    )
})



//-------------------------------------degree-------------------------------------//
//Endpoint to get all degree 
app.get('/register_degree' , (req, res) => {
    connection.query(
        'SELECT * FROM register_degree',
        function(err, results){
            res.json(results)
        }
    )
})

//Endpoint to add a new degree 
app.post('/register_degree' , (req, res) => {
    const {degree_name} = req.body
    connection.query(
        'INSERT INTO register_degree (degree_name) VALUES (?)',
        [degree_name],
        function(err, results){
            res.json(results)
        }
    )
})


//Endpoint to get degree id 
app.get('/register_degree/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT * FROM register_degree WHERE degree_id=?',
        [id],
        function(err, results){
            if (results.length > 0 ) {
                res.json(results[0])
            } else {
            res.json({'degree' : 'not found'})
            }
        }
    )
})


//-------------------------------------gender-------------------------------------//
//Endpoint to get all gender 
app.get('/register_gender' , (req, res) => {
    connection.query(
        'SELECT * FROM register_gender',
        function(err, results){
            res.json(results)
        }
    )
})

//Endpoint to add a new gender
app.post('/register_gender' , (req, res) => {
    const {gender_name} = req.body
    connection.query(
        'INSERT INTO register_gender (gender_name) VALUES (?)',
        [gender_name],
        function(err, results){
            res.json(results)
        }
    )
})


//Endpoint to get gender id 
app.get('/register_gender/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT * FROM register_gender WHERE gender_id=?',
        [id],
        function(err, results){
            if (results.length > 0 ) {
                res.json(results[0])
            } else {
            res.json({'gender' : 'not found'})
            }
        }
    )
})

//-------------------------------------province-------------------------------------//
//Endpoint to get all register_province 
app.get('/register_province' , (req, res) => {
    connection.query(
        'SELECT * FROM register_province',
        function(err, results){
            res.json(results)
        }
    )
})

//Endpoint to add a new register_province
app.post('/register_province' , (req, res) => {
    const {province_name} = req.body
    connection.query(
        'INSERT INTO register_province (province_name) VALUES (?)',
        [province_name],
        function(err, results){
            res.json(results)
        }
    )
})


//Endpoint to get register_province id 
app.get('/register_province/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT * FROM register_province WHERE province_id=?',
        [id],
        function(err, results){
            if (results.length > 0 ) {
                res.json(results[0])
            } else {
            res.json({'register_province' : 'not found'})
            }
        }
    )
})


//-------------------------------------qa_program-------------------------------------//
//Endpoint to get all qa_program 
app.get('/qa_program' , (req, res) => {
    connection.query(
        'SELECT * FROM qa_program',
        function(err, results){
            res.json(results)
        }
    )
})

//Endpoint to add a new qa_program
app.post('/qa_program' , (req, res) => {
    const {program_name} = req.body
    connection.query(
        'INSERT INTO qa_program (program_name) VALUES (?)',
        [program_name],
        function(err, results){
            res.json(results)
        }
    )
})


//Endpoint to get qa_program id 
app.get('/qa_program/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT * FROM qa_program WHERE program_id=?',
        [id],
        function(err, results){
            if (results.length > 0 ) {
                res.json(results[0])
            } else {
            res.json({'qa_program' : 'not found'})
            }
        }
    )
})

//-------------------------------------qa_question-------------------------------------//
//Endpoint to get all qa_question 
app.get('/qa_questions' , (req, res) => {
    connection.query(
        'SELECT * FROM qa_question',
        function(err, results){
            res.json(results)
        }
    )
})

//Endpoint to add a new qa_question
app.post('/qa_question' , (req, res) => {
    const {q_student,q_parent} = req.body
    connection.query(
        'INSERT INTO qa_question (q_student,q_parent) VALUES (?,?)',
        [q_student,q_parent],
        function(err, results){
            res.json(results)
        }
    )
})


//Endpoint to get qa_question id 
app.get('/qa_question/:id' , (req, res) => {
    id = req.params.id
    var question_list = [];
    var answers_list = [];

    connection.query(
        'SELECT qa_id , q_student , q_parent FROM qa_question WHERE qa_id=?',
        [id],
        
        function (err, questionResults) {

            if(err){
                return res.status(500).json({error: err.message});
            }
            if (questionResults.length > 0 ) {
                question_list.push(questionResults[0]);
                console.log(question_list)
            } else {
            res.json({'qa_question' : 'not found'})
            
            }
        }    
    );

    connection.query(
        'SELECT ans_id, answer FROM qa_answers WHERE qa_id=?',
        [id],
        
        function(err, answerResults) {

            if(err){
                return res.status(500).json({
                    error: err.message});
            }
            if (answerResults.length > 0 ) {
                answers_list.push(answerResults);
                console.log(answers_list)
            } else {
            res.json({'qa_answers' : 'not found'})
            
            }

            res.json({
                question_list,
                answers_list
            })
        }    
    );
});

//-------------------------------------qa_answers-------------------------------------//
//Endpoint to get all qa_answers 
app.get('/qa_answers' , (req, res) => {
    connection.query(
        'SELECT * FROM qa_answers',
        function(err, results){
            res.json(results)
        }
    )
})

//Endpoint to add a new qa_answers
app.post('/qa_answers' , (req, res) => {
    const {answer} = req.body
    connection.query(
        'INSERT INTO qa_answers (answer) VALUES (?)',
        [answer],
        function(err, results){
            res.json(results)
        }
    )
})


//Endpoint to get qa_answers id 
app.get('/qa_answers/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT * FROM qa_answers WHERE ans_id=?',
        [id],
        function(err, results){
            res.json({'answer' : 'not found'})
        }
    )
})



//-------------------------------------satisfaction_q-------------------------------------//
//Endpoint to get all satisfaction_q 
app.get('/satisfaction_q' , (req, res) => {
    connection.query(
        'SELECT * FROM satisfaction_q',
        function(err, results){
            res.json(results)
        }
    )
})

//Endpoint to add a new satisfaction_q
app.post('/satisfaction_q' , (req, res) => {
    const {q_text} = req.body
    connection.query(
        'INSERT INTO satisfaction_q (q_text) VALUES (?)',
        [q_text],
        function(err, results){
            res.json(results)
        }
    )
})


//Endpoint to get qa_question id 
app.get('/satisfaction_q/:id' , (req, res) => {
    id = req.params.id
    var satisfactionQ_list = [];
    var satisfactionA_list = [];

    connection.query(
        'SELECT * FROM satisfaction_q WHERE q_id=?',
        [id],
        
        function (err, satisfaction_q_results) {

            if(err){
                return res.status(500).json({error: err.message});
            }
            if (satisfaction_q_results.length > 0 ) {
                satisfactionQ_list.push(satisfaction_q_results[0]);
                console.log(satisfactionQ_list)
            } else {
            res.json({'satisfaction_q' : 'not found'})
            
            }
        }    
    );

    connection.query(
        'SELECT * FROM satisfaction_ans LIMIT 4',
        [id],
        
        function(err, satisfaction_ans_results) {

            if(err){
                return res.status(500).json({
                    error: err.message});
            }
            if (satisfaction_ans_results.length > 0 ) {
                satisfactionA_list.push(satisfaction_ans_results);
                console.log(satisfactionA_list)
            } else {
            res.json({'satisfaction_ans' : 'not found'})
            
            }

            res.json({
                satisfactionQ_list,
                satisfactionA_list
            })
        }    
    );
});


//-------------------------------------satisfaction_ans-------------------------------------//
//Endpoint to get all satisfaction_ans
app.get('/satisfaction_ans' , (req, res) => {
    connection.query(
        'SELECT * FROM satisfaction_ans',
        function(err, results){
            res.json(results)
        }
    )
})

//Endpoint to add a new satisfaction_ans
app.post('/satisfaction_ans' , (req, res) => {
    const {ans_text} = req.body
    connection.query(
        'INSERT INTO satisfaction_ans (ans_text) VALUES (?)',
        [ans_text],
        function(err, results){
            res.json(results)
        }
    )
})


//Endpoint to get satisfaction_ans id 
app.get('/satisfaction_ans/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT * FROM satisfaction_ans WHERE ans_id=?',
        [id],
        function(err, results){
            if (results.length > 0 ) {
                res.json(results[0])
            } else {
            res.json({'satisfaction_ans' : 'not found'})
            }
        }
    )
})

/*/-------------------------------------register_field_study-------------------------------------//
//Endpoint to get all register_field_study 
app.get('/register_field_study' , (req, res) => {
    connection.query(
        'SELECT * FROM register_field_study',
        function(err, results){
            res.json(results)
        }
    )
})

//Endpoint to add a new register_field_study
app.post('/register_field_study' , (req, res) => {
    const {field_study_id} = req.body
    connection.query(
        'INSERT INTO register_field_study (field_study_id) VALUES (?)',
        [field_study_id],
        function(err, results){
            res.json(results)
        }
    )
})


//Endpoint to get register_field_study id 
app.get('/register_field_study/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT * FROM register_field_study WHERE field_study_id=?',
        [id],
        function(err, results){
            if (results.length > 0 ) {
                res.json(results[0])
            } else {
            res.json({'register_field_study' : 'not found'})
            }
        }
    )
})*/

app.get('/test' , (req, res) => {
    res.send('Api is working');
})

//-------------------------------------transition_register_user-------------------------------------//
//Endpoint to get all register_user 
app.get('/register_user' , (req, res) => {
    connection.query(
        'SELECT * FROM register_user',
        function(err, results){
            res.json(results)
        }
    )
})

/*/Preview

    res.send('hi,' + req.body.age_id)
})

//Document
app.post('/register_user', jsonParser, function (req,res){
    console.log(req)
})*/

//Endpoint to add a new register_user
app.post('/register_user', urlencodedParser,function(req, res){
    console.log(req.body)
    const {email_name,age_id,gender_id,status_id,degree_id,field_study_name,province_id} = req.body
    connection.query(
        'INSERT INTO register_user (email_name,age_id,gender_id,status_id,degree_id,field_study_name,province_id) VALUES (?,?,?,?,?,?,?)',
        [email_name,age_id,gender_id,status_id,degree_id,field_study_name,province_id],
        function(err, results){
            res.json(results)
        }
    )
})

//register_user
//Endpoint to get register_user id 
app.get('/register_user/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT * FROM register_user WHERE register_id=?',
        [id],
        function(err, results){
            if(err){
                return res.status(500).json({error: err.message});
            }
            if(results.length > 0 ) {
                res.json(results[0])
            } else {
            res.json({'register_user' : 'not found'})
            }
        }
    )
})

//-------------------------------------qa_transaction-------------------------------------//
//Endpoint to get all qa_transaction 
app.get('/qa_transaction' , (req, res) => {
    /*console.log(qa);
    const numbers = [3, 2, 1,];
    const result = numbers.map((number) => {
        console.log(number*2)
        return number*2*/
    connection.query(
        'SELECT * FROM qa_transaction',
        function(err, results){
            res.json(results)
        }
)
})

app.post('/qa_transaction' , urlencodedParser,async function  (req, res){
    var Answers = req.body
    console.log(Answers);
    //const {qa_id,ans_id} = req.body //ประกาศค่าที่เป็น qa_id , ans_id ให้เท่ากับ req.body = การส่งข้อมูลที่เราต้องการส่งให้ Server
    //console.table(Answers);
    Answers.ans_list?.map((item) => {
        //qa_id: item.qa_id,
        //ans_id: item.ans_id,
        //length: item.ans_id.length
        //console.log(item.ans_id.length)
        //console.table(item.ans_id)
        item.ans_id.map((a_id, index) => {
            var score = 0
            
            if(item.ans_id.length === 1){
                score = 1
            }
            else if (index === 0 ){
                score = 3 
            } 
            else if (index === 1){
                score = 2
            }
            else if(index === 2){
                score = 1
            }
            
            console.log(`user_id: ${Answers.user_id}, question: ${item.qa_id}, answers: ${a_id}, score: ${score}`);
            connection.query(
                'INSERT INTO qa_transaction (user_id, qa_id, ans_id, score) VALUES (?, ?, ?, ?)',
                [Answers.user_id, item.qa_id, a_id, score],
                function(err, results) {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    return results;
                }
            );
        });
    });
    res.status(200).json({ message: 'QA transactions processed successfully' });
});
     /*var qa_id = req.body.qa_id; //รับค่าเข้ามา
    var ansIds =[req.body.ans_id];
    
    SELECT SUM(score),program_id FROM `qa_transaction` LEFT JOIN qa_answers ON qa_transaction.ans_id = qa_answers.ans_id GROUP BY program_id;
    
    SELECT SUM(score),program_id FROM `qa_transaction` LEFT JOIN qa_answers ON qa_transaction.ans_id = qa_answers.ans_id GROUP BY program_id ORDER BY SUM(score) DESC LIMIT 1;

    console.log('Received qa_id:', qa_id);
    console.log('Received ansIds:', ansIds);

        ansIds.forEach((Answer) => { //ใช้ forEach เพื่อวนลูปผ่านสมาชิกทุกตัวในอาเรย์ ansIds
            connection.query(
                `INSERT INTO qa_transaction (qa_id, ans_id) VALUES (?, ?)`,
                [qa_id, Answer],
                function(err, results) {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    return results
                }
            );
        })
    });*/
    
     
    
   /*var qa_id = req.body.qa_id; // รับค่า qa_id เข้ามาจาก body ของ request
    var ansIds = req.body.ans_id; // รับค่า ans_id เข้ามาจาก body ของ request 

    console.log('Received qa_id:', qa_id); // แสดงค่า qa_id ที่รับมาจาก request
    console.log('Received ansIds:', ansIds); // แสดงค่า ans_id ที่รับมาจาก request  

    if (!ansIds || ansIds.length === 0 ) { // ตรวจสอบว่า ถ้าไม่มีค่า ans_id หรือ ans_id มีความยาว = 0
        return res.status(400).json({error: 'ans_id not found'}) // ให้ส่งข้อความผิดพลาดกลับไป 
    }

    if(!qa_id){ // ตรวจสอบว่า qa_id มีค่าหรือไม่ 
        return res.status(400).json({error: 'qa_id not found'}) // ถ้าไม่พบ qa_id ให้ส่งข้อความผิดพลาดกลับไป 
    }

    try{
        for (var Answer of ansIds){ // วนลูปผ่าน ans_id ทั้งหมด
            await new Promise((resolve, reject) => { 
                //ใช้ await เพื่อรอจนกว่าคำสั่งนั่นจะเสร็จถึงค่อยไปทำงานอันต่อไปเเละ สร้าง Promise สำหรับการ query ข้อมูล 
                connection.query(
                    'INSERT INTO qa_transaction (qa_id, ans_id) VALUES (?, ?)', // คำสั่ง SQL สำหรับการแทรกข้อมูล
                    [qa_id, Answer], // ข้อมูลที่จะนำไปแทรก
                    function (err, results) { // callback function สำหรับตรวจสอบผลลัพธ์ 
                        if(err){
                            return reject(err); // ถ้ามีข้อ+ผิดพลาดให้ reject Promise
                        }
                        resolve(results); // ถ้าไม่มีข้อผิดพลาดให้ resolve Promise   
                        console.log(Answer.length)
                    }
                )
            })
        }

    } catch (err) {
        res.status(500).json({error: err.message}); // ส่งข้อความผิดพลาดกลับไปในกรณีที่มีข้อผิดพลาด
    }

*/

/*/Endpoint to add a new qa_transaction
app.post('/qa_transaction' , urlencodedParser,function (req, res){
    console.log(req.body)
    const {qa_id,ans_id,user_id,score} = req.body
    connection.query(
        'INSERT INTO qa_transaction (qa_id,ans_id,user_id,score) VALUES (?,?,?,?)',
        [qa_id,ans_id,user_id,score],
        function(err, results){
            res.json(results)
        }
    )
})*/

//-------------------------------------result-------------------------------------//

//score data 4 program
app.get('/results/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT SUM(score),program_id FROM `qa_transaction` LEFT JOIN qa_answers ON qa_transaction.ans_id = qa_answers.ans_id WHERE user_id=? GROUP BY program_id   ',
        [id],
        function(err, results){
            res.json(results)
        }
    )
})

//program score max 
app.get('/result_max/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT SUM(score),program_id FROM `qa_transaction` LEFT JOIN qa_answers ON qa_transaction.ans_id = qa_answers.ans_id WHERE user_id=? GROUP BY program_id ORDER BY SUM(score) DESC LIMIT 1;',
        [id],
        function(err, results){
            res.json(results)
        }
    )
})


//-------------------------------------transaction_satisfaction-------------------------------------//
//Endpoint to get all transaction_satisfaction 
app.get('/satisfaction_transaction' , (req, res) => {
    connection.query(
        'SELECT * FROM satisfaction_transaction',
        function(err, results){
            res.json(results)
        }
    )
})

//Endpoint to add a new satisfaction_transaction
app.post('/satisfaction_transaction', urlencodedParser,function(req, res){
    var sat = req.body
    console.log(sat);
    sat.satisfaction_list?.map((item) => {
        console.log(`q_id: ${item.q_id}, a_id: ${a_id[0]}`);
        connection.query(
            'INSERT INTO satisfaction_transaction (q_id,a_id) VALUES (?,?)',
            [item.q_id,item.a_id],
            function(err, results){
                if(err){
                    res.status(500).json({error: err.message});
                }
                return results   
            }
        )
    });
    res.status(200).json({ message: 'Satisfaction transactions processed successfully' });   
});


/*//Endpoint to get transaction_satisfaction id 
app.get('/satisfaction_transaction/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT * FROM satisfaction_transaction WHERE id=?',
        [id],
        function(err, results){
            if (results.length > 0 ) {
                res.json(results[0])
            } else {
            res.json({'satisfaction_transaction' : 'not found'})
            }
        }
    )
})*/


//report_register
app.get('/report_register' , (req, res) => {
    let date_time = new Date();
    console.log(date_time)

    // get current date
    let date = ("0" + date_time.getDate()).slice(-2);

    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

    // get current year
    let year = date_time.getFullYear();

    connection.query(
        'SELECT email_name,age_name,gender_name,status_name,degree_name,field_study_name,province_name,registered_date FROM register_user LEFT JOIN register_age ON register_user.age_id = register_age.age_id LEFT JOIN register_gender ON register_user.gender_id = register_gender.gender_id LEFT JOIN register_status ON register_user.status_id= register_status.status_id LEFT JOIN register_degree ON register_user.degree_id = register_degree.degree_id LEFT JOIN register_field_study ON register_user.field_study_id = register_field_study.field_study_id LEFT JOIN register_province ON register_user.province_id = register_province.province_id',
        function(err, results){
            if(err){
                return res.status(500).json({error: err.message});
            }
            //JSON
            const jsonResults = JSON.parse(JSON.stringify(results));
            console.log("JsonResults", jsonResults);

            if (jsonResults.length === 0) {
                console.log("No data retrieved from the database.");
                return res.status(404).send("No data found.");
            }

            //CSV
            //Write data in folder Report 
            const ws=fs.createWriteStream("./Report/RegisterReport_"+date+month+year+"_"+Date.now()+".csv");
            fastcsv.write(jsonResults,{ headers : true})
            .on("finish", function(){
                console.log("Write to transactionRegister.csv successfully!");
            })
            .pipe(ws);

            //Export data to excel
            // Set headers to prompt a file download
            res.setHeader('Content-Type', 'text/csv ');
            res.setHeader('Content-Disposition', 'attachment; filename="RegisterReport_' + date + month + year + '_' + Date.now() + '.csv"');

            // Create a writable stream that pipes directly to the response
            const csvStream = fastcsv.format({ headers: true });
            csvStream.pipe(res);

            // Write the rows to the CSV stream
            jsonResults.forEach(row => csvStream.write(row));

            // End the CSV stream
            csvStream.end();

            console.log("CSV file sent to client.");
        }
    );
});

//report_qa
app.get('/report_qa' , (req, res) => {
    let date_time = new Date();
    console.log(date_time)

    // get current date
    let date = ("0" + date_time.getDate()).slice(-2);

    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

    // get current year
    let year = date_time.getFullYear();

    connection.query(
        'SELECT user_id, email_name,q_student,q_parent,answer,score,time FROM qa_transaction LEFT JOIN register_user ON qa_transaction.user_id = register_user.register_id LEFT JOIN qa_question ON qa_transaction.qa_id = qa_question.qa_id LEFT JOIN qa_answers ON qa_transaction.ans_id = qa_answers.ans_id',
        function(err, results){
            if(err){
                return res.status(500).json({error: err.message});
            }
            //JSON
            const jsonResults = JSON.parse(JSON.stringify(results));
            console.log("JsonResults", jsonResults);

            if (jsonResults.length === 0) {
                console.log("No data retrieved from the database.");
                return res.status(404).send("No data found.");
            }

            //CSV
            //Write data in folder Report 
            const ws=fs.createWriteStream("./Report/QAReport_"+date+month+year+"_"+Date.now()+".csv");
            fastcsv.write(jsonResults,{ headers : true})
            .on("finish", function(){
                console.log("Write to transactionQA.csv successfully!");
            })
            .pipe(ws);

            //Export data to excel
            // Set headers to prompt a file download
            res.setHeader('Content-Type', 'text/csv ');
            res.setHeader('Content-Disposition', 'attachment; filename="QAReport_' + date + month + year + '_' + Date.now() + '.csv"');

            // Create a writable stream that pipes directly to the response
            const csvStream = fastcsv.format({ headers: true });
            csvStream.pipe(res);

            // Write the rows to the CSV stream
            jsonResults.forEach(row => csvStream.write(row));

            // End the CSV stream
            csvStream.end();

            console.log("CSV file sent to client.");
        }
    );
});

//report_satisfaction
app.get('/report_satisfaction' , (req, res) => {
    let date_time = new Date();
    console.log(date_time)

    // get current date
    let date = ("0" + date_time.getDate()).slice(-2);

    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

    // get current year
    let year = date_time.getFullYear();

    connection.query(
        'SELECT id,register_id,email_name, q_text,a_text,date_time FROM satisfaction_transaction LEFT JOIN satisfaction_q ON satisfaction_transaction.q_id = satisfaction_q.q_id LEFT JOIN satisfaction_ans ON satisfaction_transaction.a_id = satisfaction_ans.a_id LEFT JOIN register_user ON satisfaction_transaction.id = register_user.register_id',
        function(err, results){
            if(err){
                return res.status(500).json({error: err.message});
            }
            //JSON
            const jsonResults = JSON.parse(JSON.stringify(results));
            console.log("JsonResults", jsonResults);

            if (jsonResults.length === 0) {
                console.log("No data retrieved from the database.");
                return res.status(404).send("No data found.");
            }

            //CSV
            //Write data in folder Report 
            const ws=fs.createWriteStream("./Report/SatisfactionReport_"+date+month+year+"_"+Date.now()+".csv");
            fastcsv.write(jsonResults,{ headers : true})
            .on("finish", function(){
                console.log("Write to transaction_Satisfaction.csv successfully!");
            })
            .pipe(ws);

            //Export data to excel
            // Set headers to prompt a file download
            res.setHeader('Content-Type', 'text/csv ');
            res.setHeader('Content-Disposition', 'attachment; filename="SatisfactionReport_' + date + month + year + '_' + Date.now() + '.csv"');

            // Create a writable stream that pipes directly to the response
            const csvStream = fastcsv.format({ headers: true });
            csvStream.pipe(res);

            // Write the rows to the CSV stream
            jsonResults.forEach(row => csvStream.write(row));

            // End the CSV stream
            csvStream.end();

            console.log("CSV file sent to client.");
        }
    );
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

