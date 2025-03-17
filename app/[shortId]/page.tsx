import React from 'react';
import { redirect } from 'next/navigation';
import { openDb } from '../../lib/db';

export default async function ShortIdPage({ params }: { params: { shortId: string } }) {
  if (!params) {
    return (<p>Loading...</p>);
  };
  const db = await openDb();
  const { shortId } = params;

  if (shortId.toLowerCase() === "dashboard") {
    redirect(`/dashboard`);
  }
  const result = await db.get('SELECT originalUrl FROM urls WHERE shortId = ?', [shortId]);



  if (result) {
    redirect(result.originalUrl);
  } else {
    return <p>URL not found</p>;
  }
}
