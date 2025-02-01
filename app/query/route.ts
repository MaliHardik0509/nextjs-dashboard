// import { db } from "@vercel/postgres";

// const client = await db.connect();

// async function listInvoices() {
// 	const data = await client.sql`
//     SELECT invoices.amount, customers.name
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE invoices.amount = 666;
//   `;

// 	return data.rows;
// }

// export async function GET() {
//   return Response.json({
//     message:
//       'Uncomment this file and remove this line. You can delete this file when you are finished.',
//   });
  // try {
  // 	return Response.json(await listInvoices());
  // } catch (error) {
  // 	return Response.json({ error }, { status: 500 });
  // }
//}




import { Pool } from "@neondatabase/serverless";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function listInvoices() {
    const client = await pool.connect();
    try {
        const data = await client.query(`
            SELECT invoices.amount, customers.name
            FROM invoices
            JOIN customers ON invoices.customer_id = customers.id
            WHERE invoices.amount = 666;
        `);
        return data.rows;
    } finally {
        client.release();
    }
}

export async function GET() {
    try {
        return Response.json(await listInvoices());
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}