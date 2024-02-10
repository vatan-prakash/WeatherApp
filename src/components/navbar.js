import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="mb-4">
            <Link href="/" className="text-blue-500 hover:underline">Home
            </Link>
            <span className="mx-2">|</span>
            <Link href="/statewise" className="text-blue-500 hover:underline">State Wise Data
            </Link>
        </nav>
    )
}