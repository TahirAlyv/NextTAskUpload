import {writeFile,mkdir } from 'fs/promises';
import path  from 'path';
import { NextResponse } from 'next/server';
import fs from 'fs';

export async function POST(request) {
    const data = await request.formData();
    const file = data.get('file');
    const name= data.get('name');
    const email = data.get('email');
    const allowedExts = ['.jpg', '.png', '.pdf'];

     if (!file) {
     return NextResponse.json({ error: 'No file provided' }, { status: 400 });
     }

       const fileName = file.name;
       const fileExt = path.extname(fileName).toLowerCase();
      if (!allowedExts.includes(fileExt) || fileExt === '.exe') {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
      }

     const maxSize = 5 * 1024 * 1024;
     const bytes = await file.arrayBuffer();
     const buffer = Buffer.from(bytes);
    
     if (buffer.length > maxSize) {
    return NextResponse.json({ error: 'File too large (>5MB)' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filename=`${Date.now()}-${file.name}`;
    const filePath=path.join(uploadDir, filename);
    await writeFile(filePath, buffer);



    //user
    const user= {
        name: name,
        email: email,
    };

    const dataDir = path.join(process.cwd(), 'public', 'data');
    const txtFileName = `${Date.now()}-${email.replace(/[^a-zA-Z0-9]/g, '')}.txt`;
    const txtPath=path.join(dataDir, txtFileName);
    const txtContent = `Name: ${user.name}\nEmail: ${user.email}\n`;
     await mkdir(dataDir, { recursive: true });
     await writeFile(txtPath, txtContent);

     return NextResponse.json({ status: 'ok', path: `/uploads/${filename}` });
 
  }


  export  async  function GET() {
    const dataDir = path.join(process.cwd(), 'public', 'data');
    const files=fs.readdirSync(dataDir);
    const txtFiles=files.filter(file=> file.endsWith('.txt'));
   
    const firstfile = txtFiles[0];
    const content = fs.readFileSync(path.join(dataDir, firstfile), 'utf-8');
     

    //image

    const imageDir=path.join(process.cwd(), 'public', 'uploads');
    const imageFiles=fs.readdirSync(imageDir);
    const filteredFiles = imageFiles.filter(file =>file.match(/\.(png|jpg|jpeg|pdf)$/i));
    const firstImage = filteredFiles[0];
   
    return NextResponse.json({
        txt: content,
        url: `/uploads/${firstImage}`,
    })


  }
