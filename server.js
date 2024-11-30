
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); 


app.get('/', (req, res) => {
    res.send('Hello World');
});


app.post('/blogs', (req, res) => {
    const { title, content } = req.body;

 
    if (!title || !content) {
        return res.status(400).send('Title and content are required');
    }else {
        fs.writeFileSync(`${title}.txt`, content, 'utf8');
                res.status(201).send('Post saved successfully');

    }
});


app.put('/posts/:title', (req, res) => {
    const title = req.params.title; 
    const { content } = req.body; 
  
   
    if (!content) {
        return res.status(400).send('Content is required');
    }

    const filePath = `${title}.txt`;

   
    if (fs.existsSync(filePath)) {
        
            fs.writeFileSync(filePath, content, 'utf8');
            res.status(200).send('Post updated successfully');
        
    } else {
        res.status(404).send('Post with the specified title not found');
    }
});


app.delete('/blogs/:title', (req, res) => {
    
    const title = req.params.title; 
  
  
    if (title) { 
      fs.unlinkSync(`${title}.txt`);
      res.send('the file deleted');
    } else {
        res.status(404).send('Post with the specified title not found');
      
    }
})
app.get('/blogs/:title', (req, res) => {
   
    const title = req.params.title;

    
    const filePath = `${title}.html`;

    
    if (fs.existsSync(filePath)) {
        
            
            const content = fs.readFileSync(filePath, 'utf8');
           
            res.status(200).send(content);
        
    } else {
        
        res.status(404).send('This post does not exist!');
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

