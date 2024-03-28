import puppeteer from 'puppeteer';


const generatePDF = async (data) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Create HTML content with table
    let htmlContent = `
      <html>
        <head>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <table>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
    `;
    data.forEach(row => {
        htmlContent += `
        <tr>
          <td>${row.id}</td>
          <td>${row.first_name}</td>
          <td>${row.last_name}</td>
          <td>${row.email}</td>
          <td>${row.phone}</td>
          <td>${row.address}</td>
        </tr>
      `;
    });
    htmlContent += `
          </table>
        </body>
      </html>
    `;

    // Generate PDF
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf();

    await browser.close();
    return pdfBuffer;
};

export { generatePDF}