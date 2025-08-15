import Image from 'next/image'
import React from 'react'

const Navbar = () => {
    return (
        <nav className="border-b border-border bg-white px-6 py-4 z-20 relative">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <Image
                        src="/images/logo.png"
                        alt="Sukrutha Logo"
                        width={100}
                        height={100}
                    />
                  
                </div>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Main Site
                </a>
            </div>
        </nav>
    )
}

export default Navbar