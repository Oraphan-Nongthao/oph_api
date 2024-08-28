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

//const cookieParser = require("cookie-parser");

const app = express()
const cors = require('cors')
const json = require('body-parser/lib/types/json')
const { error } = require('console')
app.use(cors())
//app.use(cookieParser());
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
const port = process.env.PORT|5000

const { Sequelize } = require('sequelize');

/*const connection = mysql.createConnection ({
    host: 'mariadb',
    user: 'oph',
    password: 'buopen@dm1n2024',
    database: 'oph'
})
//console.log(process.env.USER)*/
//up to server
const sequelize = new Sequelize('oph', 'oph', 'buopen@dm1n2024', {
    host: 'mariadb',
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 60000,
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    retry: {
        match: [
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/
        ],
        max: 5  // ลองเชื่อมต่อใหม่สูงสุด 5 ครั้ง
    }
    
});

const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection is alive.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

setInterval(checkConnection, 60000); // ตรวจสอบทุก 60 วินาที อันนี้ run ไว้ข้างนอก*/



//-------------------------------------Status-------------------------------------//

app.get('/register_status', async (req, res) => {
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM register_status');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/register_status' , (req, res) => {
    connection.query(
        'SELECT * FROM register_status',
        function(err, results){
            res.json(results) 
        }
    )
})*/

//Endpoint to add a new status 
app.post('/register_status' , (req, res) => {
    const {status_name} = req.body
    connection.query(
        'INSERT INTO register_status (status_name) VALUES (?)',
        [status_name],
        function(err, results){
            if(err){
                return res.json({'status_name' : 'not found'})
            }else {
                res.json(results)
            }

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
app.get('/register_status/:id', async (req, res) => {
    const id = req.params.id; // Get the id from the request parameters
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM register_status WHERE status_id = ?', {
            replacements: [id],  //ใช้เพื่อแทนที่ตัวแปร ?
            type: sequelize.QueryTypes.SELECT //ระบุประเภทเพื่อให้ Sequelize รู้ว่าผลลัพธ์ต้องเป็น Array
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/*app.get('/register_status/:id' , (req, res) => {
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
})*/

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
app.get('/register_age', async (req, res) => {
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM register_age');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/register_age' , (req, res) => {
    connection.query(
        'SELECT * FROM register_age',
        function(err, results){
            res.json(results) 
        }
    )
})*/

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
app.get('/register_age/:id', async (req, res) => {
    const id = req.params.id; // Get the id from the request parameters
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM register_age WHERE age_id = ?', {
            replacements: [id],  //ใช้เพื่อแทนที่ตัวแปร ?
            type: sequelize.QueryTypes.SELECT //ระบุประเภทเพื่อให้ Sequelize รู้ว่าผลลัพธ์ต้องเป็น Array
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/register_age/:id' , (req, res) => {
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
})*/


//-------------------------------------degree-------------------------------------//
//Endpoint to get all degree
app.get('/register_degree', async (req, res) => {
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM register_degree');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/*app.get('/register_degree' , (req, res) => {
    connection.query(
        'SELECT * FROM register_degree',
        function(err, results){
            res.json(results)
        }
    )
})*/

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
app.get('/register_degree/:id', async (req, res) => {
    const id = req.params.id; // Get the id from the request parameters
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM register_degree WHERE degree_id = ?', {
            replacements: [id],  //ใช้เพื่อแทนที่ตัวแปร ?
            type: sequelize.QueryTypes.SELECT //ระบุประเภทเพื่อให้ Sequelize รู้ว่าผลลัพธ์ต้องเป็น Array
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/register_degree/:id' , (req, res) => {
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
})*/


//-------------------------------------gender-------------------------------------//
//Endpoint to get all gender|
app.get('/register_gender', async (req, res) => {
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM register_gender');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/register_gender' , (req, res) => {
    connection.query(
        'SELECT * FROM register_gender',
        function(err, results){
            res.json(results)
        }
    )
})*/

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
app.get('/register_gender/:id', async (req, res) => {
    const id = req.params.id; // Get the id from the request parameters
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM register_gender WHERE gender_id = ?', {
            replacements: [id],  //ใช้เพื่อแทนที่ตัวแปร ?
            type: sequelize.QueryTypes.SELECT //ระบุประเภทเพื่อให้ Sequelize รู้ว่าผลลัพธ์ต้องเป็น Array
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/*app.get('/register_gender/:id' , (req, res) => {
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
})*/

//-------------------------------------province-------------------------------------//
//Endpoint to get all register_province
app.get('/register_province', async (req, res) => {
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM register_province');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/register_province' , (req, res) => {
    connection.query(
        'SELECT * FROM register_province',
        function(err, results){
            res.json(results)
        }
    )
})*/

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
app.get('/register_province/:id', async (req, res) => {
    const id = req.params.id; // Get the id from the request parameters
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM register_province WHERE province_id = ?', {
            replacements: [id], 
            type: sequelize.QueryTypes.SELECT
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/*app.get('/register_province/:id' , (req, res) => {
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
})*/


//-------------------------------------qa_program-------------------------------------//
//Endpoint to get all qa_program 
app.get('/qa_program', async (req, res) => {
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM qa_program');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
/*app.get('/qa_program' , (req, res) => {
    connection.query(
        'SELECT * FROM qa_program',
        function(err, results){
            res.json(results)
        }
    )
})*/

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
app.get('/qa_program/:id', async (req, res) => {
    const id = req.params.id; // Get the id from the request parameters
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM qa_program WHERE program_id = ?', {
            replacements: [id],  //ใช้เพื่อแทนที่ตัวแปร ?
            type: sequelize.QueryTypes.SELECT //ระบุประเภทเพื่อให้ Sequelize รู้ว่าผลลัพธ์ต้องเป็น Array
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/qa_program/:id' , (req, res) => {
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
})*/

//-------------------------------------qa_question-------------------------------------//
//Endpoint to get all qa_question
app.get('/qa_question', async (req, res) => {
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM qa_question');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/qa_questions' , (req, res) => {
    connection.query(
        'SELECT * FROM qa_question',
        function(err, results){
            res.json(results)
        }
    )
})*/

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
//ยังไม่ connect
app.get('/qa_question/:id', async (req, res) => {
    id = req.params.id;
    let question_list = [];
    let answers_list = [];

    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        var [questionResults] = await sequelize.query(
            'SELECT qa_id, q_student, q_parent FROM qa_question WHERE qa_id=?',
            {
                replacements: [id],
                type: sequelize.QueryTypes.SELECT
            }
        )

        if (questionResults.length > 0) {
            question_list.push(questionResults[0]);
            console.log(question_list)
        } else {
            return res.json({ 'qa_question': 'not found' });
        }

        var [answerResults] = await sequelize.query(
            'SELECT ans_id, answer FROM qa_answers WHERE qa_id=?',
            {
                replacements: [id],
                type: sequelize.QueryTypes.SELECT
            }
        )

        if (answerResults.length > 0) {
            answers_list.push(answerResults);
            console.log(answers_list)
        } else {
            return res.json({ 'qa_answers': 'not found' });
        }

        // Send the combined response
        res.json({
            question_list,
            answers_list
        })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/qa_question/:id' , (req, res) => {
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
});*/

//-------------------------------------qa_answers-------------------------------------//
//Endpoint to get all qa_answers 
app.get('/qa_answers', async (req, res) => {
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM qa_answers');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/qa_answers' , (req, res) => {
    connection.query(
        'SELECT * FROM qa_answers',
        function(err, results){
            res.json(results)
        }
    )
})*/

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
app.get('/qa_answers/:id', async (req, res) => {
    const id = req.params.id; // Get the id from the request parameters
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM qa_answers WHERE ans_id = ?', {
            replacements: [id],  //ใช้เพื่อแทนที่ตัวแปร ?
            type: sequelize.QueryTypes.SELECT //ระบุประเภทเพื่อให้ Sequelize รู้ว่าผลลัพธ์ต้องเป็น Array
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/*app.get('/qa_answers/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT * FROM qa_answers WHERE ans_id=?',
        [id],
        function(err, results){
            res.json({'answer' : 'not found'})
        }
    )
})*/



//-------------------------------------satisfaction_q-------------------------------------//
//Endpoint to get all satisfaction_q
app.get('/satisfaction_q', async (req, res) => {
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM satisfaction_q');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/satisfaction_q' , (req, res) => {
    connection.query(
        'SELECT * FROM satisfaction_q',
        function(err, results){
            res.json(results)
        }
    )
})*/

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
app.get('/satisfaction_ans', async (req, res) => {
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM satisfaction_ans');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/satisfaction_ans' , (req, res) => {
    connection.query(
        'SELECT * FROM satisfaction_ans',
        function(err, results){
            res.json(results)
        }
    )
})*/

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
app.get('/satisfaction_ans/:id', async (req, res) => {
    const id = req.params.id; // Get the id from the request parameters
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM satisfaction_ans WHERE ans_id = ?', {
            replacements: [id],  //ใช้เพื่อแทนที่ตัวแปร ?
            type: sequelize.QueryTypes.SELECT //ระบุประเภทเพื่อให้ Sequelize รู้ว่าผลลัพธ์ต้องเป็น Array
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/satisfaction_ans/:id', async (req, res) => {
    const id = req.params.id; // Get the id from the request parameters
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM satisfaction_ans WHERE ans_id = ?', {
            replacements: [id], 
            type: sequelize.QueryTypes.SELECT
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/satisfaction_ans/:id' , (req, res) => {
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
})*/

//-------------------------------------transition_register_user-------------------------------------//
//Endpoint to get all register_user
app.get('/register_user', async (req, res) => {
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM register_user');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/register_user' , (req, res) => {
    connection.query(
        'SELECT * FROM register_user',
        function(err, results){
            res.json(results)
        }
    )
})*/

/*/Preview

    res.send('hi,' + req.body.age_id)
})

//Document
app.post('/register_user', jsonParser, function (req,res){
    console.log(req)
})*/

//Endpoint to add a new register_user
app.post('/register_user', urlencodedParser,function(req, res){
    //var cookie = cookie(req);
    console.log(req.body)
    let {email_name,age_id,gender_id,status_id,degree_id,field_study_name,province_id} = req.body
    //datatype ที่ทำให้ database เข้าใจ ถ้าค่าว่างเรากำหนดให้มันเป็น 0 
    if(!age_id){
        age_id = 0
    }
    if(!gender_id){
        gender_id = 0
    }
    if(!status_id){
        status_id = 0
    }
    if(!degree_id){
        degree_id = 0
    }
    if(!province_id){
        province_id = 0
    }
    connection.query(
        'INSERT INTO register_user (email_name,age_id,gender_id,status_id,degree_id,field_study_name,province_id) VALUES (?,?,?,?,?,?,?)',
        [email_name,age_id,gender_id,status_id,degree_id,field_study_name,province_id],
        function(err, results){
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                // ถ้าไม่มีข้อผิดพลาด ให้ส่ง user_id (register_id) กลับไป
                //res.cookie('user_id: ', results.insertId )
                res.json({user_id : results.insertId });  
                
            }
        }
    );
});
//register_user
//Endpoint to get register_user id 
app.get('/register_user/:id', async (req, res) => {
    const id = req.params.id; // Get the id from the request parameters
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM register_user WHERE register_id = ?', {
            replacements: [id],  //ใช้เพื่อแทนที่ตัวแปร ?
            type: sequelize.QueryTypes.SELECT //ระบุประเภทเพื่อให้ Sequelize รู้ว่าผลลัพธ์ต้องเป็น Array
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/*app.get('/register_user/:id' , (req, res) => {
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
})*/

//-------------------------------------qa_transaction-------------------------------------//
//Endpoint to get all qa_transaction
app.get('/qa_transaction', async (req, res) => {
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM qa_transaction');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/qa_transaction' , (req, res) => {*/
    /*console.log(qa);
    const numbers = [3, 2, 1,];
    const result = numbers.map((number) => {
        console.log(number*2)
        return number*2*/
    /*connection.query(
        'SELECT * FROM qa_transaction',
        function(err, results){
            res.json(results)
        }
)
})*/

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
                        res.status(500).json({ error: err.message });
                    } else {
                        res.json({user_id : results.insertId });  
                    }
                }
            );
        });
    });
    res.status(200).json({ message: 'QA transactions processed successfully' });
});


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
//ไม่ขึ้น data
app.get('/results/:id', async (req, res) => {
    const id = req.params.id; // Get the id from the request parameters
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT SUM(score),program_id FROM `qa_transaction` LEFT JOIN qa_answers ON qa_transaction.ans_id = qa_answers.ans_id WHERE user_id=? GROUP BY program_id', {
            replacements: [id],  //ใช้เพื่อแทนที่ตัวแปร ?
            type: sequelize.QueryTypes.SELECT //ระบุประเภทเพื่อให้ Sequelize รู้ว่าผลลัพธ์ต้องเป็น Array
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/results/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT SUM(score),program_id FROM `qa_transaction` LEFT JOIN qa_answers ON qa_transaction.ans_id = qa_answers.ans_id WHERE user_id=? GROUP BY program_id',
        [id],
        function(err, results){
            res.json(results)
        }
    )
})*/

//program score max
//ไม่ขึ้น data
app.get('/result_max/:id', async (req, res) => {
    const id = req.params.id; // Get the id from the request parameters
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT SUM(score),program_id FROM `qa_transaction` LEFT JOIN qa_answers ON qa_transaction.ans_id = qa_answers.ans_id WHERE user_id=? GROUP BY program_id ORDER BY SUM(score) DESC LIMIT 1', {
            replacements: [id],  //ใช้เพื่อแทนที่ตัวแปร ?
            type: sequelize.QueryTypes.SELECT //ระบุประเภทเพื่อให้ Sequelize รู้ว่าผลลัพธ์ต้องเป็น Array
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/result_max/:id' , (req, res) => {
    id = req.params.id
    connection.query(
        'SELECT SUM(score),program_id FROM `qa_transaction` LEFT JOIN qa_answers ON qa_transaction.ans_id = qa_answers.ans_id WHERE user_id=? GROUP BY program_id ORDER BY SUM(score) DESC LIMIT 1',
        [id],
        function(err, results){
            res.json(results)
        }
    )
})*/


//-------------------------------------transaction_satisfaction-------------------------------------//
//Endpoint to get all transaction_satisfaction 
app.get('/satisfaction_transaction', async (req, res) => {
    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT * FROM satisfaction_transaction');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*app.get('/satisfaction_transaction' , (req, res) => {
    connection.query(
        'SELECT * FROM satisfaction_transaction',
        function(err, results){
            res.json(results)
        }
    )
})*/

//Endpoint to add a new satisfaction_transaction
app.post('/satisfaction_transaction', urlencodedParser,function(req, res){
    var sat = req.body
    console.log(sat);
    sat.satisfaction_list?.map((item) => {
        console.log('user_id: '+ sat.user_id +' q_id: ' + item.q_id + ' a_id: ' + item.a_id[0])
        connection.query(
            'INSERT INTO satisfaction_transaction (user_id,q_id,a_id) VALUES (?,?,?)',
            [sat.user_id,item.q_id,item.a_id],
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
//ยังไม่ connect
app.get('/report_register' , async (req, res) => {
    let date_time = new Date();
    console.log(date_time)

    // get current date
    let date = ("0" + date_time.getDate()).slice(-2);

    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

    // get current year
    let year = date_time.getFullYear();

    try {
        await checkConnection(); // ตรวจสอบการเชื่อมต่อก่อน
        const [results] = await sequelize.query('SELECT register_id,email_name,age_name,gender_name,status_name,degree_name,field_study_name,province_name,registered_date,(SELECT program_id FROM `qa_transaction` LEFT JOIN qa_answers ON qa_transaction.ans_id = qa_answers.ans_id WHERE user_id=register_id GROUP BY program_id ORDER BY SUM(score) DESC LIMIT 1) AS result FROM register_user LEFT JOIN register_age ON register_user.age_id = register_age.age_id LEFT JOIN register_gender ON register_user.gender_id = register_gender.gender_id LEFT JOIN register_status ON register_user.status_id= register_status.status_id LEFT JOIN register_degree ON register_user.degree_id = register_degree.degree_id LEFT JOIN register_province ON register_user.province_id = register_province.province_id');
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

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
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
        'SELECT id,user_id, q_text,a_text,date_time FROM satisfaction_transaction LEFT JOIN satisfaction_q ON satisfaction_transaction.q_id = satisfaction_q.q_id LEFT JOIN satisfaction_ans ON satisfaction_transaction.a_id = satisfaction_ans.a_id LEFT JOIN register_user ON satisfaction_transaction.user_id = register_user.register_id',
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

