import Link from 'next/link'
import React from 'react'

export default function Navigation() {
    return (
        <header className="border-b">
            <div className="container flex items-center justify-between py-4">
                <Link href="/" className="text-2xl font-bold">
                    SchoolFinder
                </Link>
                <nav className="flex items-center gap-6">
                    <Link href="/" className="font-medium">
                        Home
                    </Link>
                    <Link href="/docs" className="font-medium">
                        API Documentation
                    </Link>
                </nav>
            </div>
        </header>
    )
}
