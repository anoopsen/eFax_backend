import DocumentServices from "./services.js";
import {generatePDF} from '../../helpers/puppeteer.js'
import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DocumnetController = {
  CreateDocument: async (req, res, next) => {
    try {
      const data = req.body;
      DocumentServices.CreateDocument(data, async (resp) => {
        if (!resp.err) {
          const uploadDir =  path.resolve(__dirname,'..','..','uploads')
          const pdfBuffer = await generatePDF(resp.data);
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
          }
          const timestamp = new Date().getTime();
          const filename = `pdf_${timestamp}.pdf`;
          const filePath = path.resolve(__dirname,'..','..','uploads',`${filename}`);
          fs.writeFile(filePath, pdfBuffer, (err) => {
            if (err) {
                console.error('Error writing PDF to file:', err);
            }
        });
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
          res.send(pdfBuffer);
        } else {
          res.status(400).json(resp);
        }
      });
    } catch (err) {
      next(err);
    }
  },
};

export { DocumnetController };