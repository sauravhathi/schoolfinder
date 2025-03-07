import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className="border-t py-6">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} SchoolFinder.
                </p>
                <div className="flex items-center gap-4">
                    <Link href="https://github.com/sauravhathi" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:underline">
                        Contribute on GitHub
                    </Link>
                    <Link href="/docs" className="text-sm text-muted-foreground hover:underline">
                        API Documentation
                    </Link>
                </div>
            </div>
        </footer>
    )
}