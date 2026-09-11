"use client";
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="main-content" className="section-page"><h1>Couldn't load this entry.</h1><p>Please try again in a moment.</p><button className="owner-button" onClick={reset}>Try again</button></main>;}
