import { BarChart3, LayoutDashboard, ReceiptText, UploadCloud } from "lucide-react"
import Link from "next/link"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: ReceiptText },
  { href: "/unsorted", label: "Upload", icon: UploadCloud },
  { href: "/reports", label: "Reports", icon: BarChart3 },
]

export function TopNavbar() {
  return (
    <nav className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <ul className="flex items-center gap-1 overflow-x-auto px-4 py-2 md:px-6">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
