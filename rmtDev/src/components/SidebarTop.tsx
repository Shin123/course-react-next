type Props = {
  children: React.ReactNode
}

export default function SidebarTop({ children }: Props) {
  return <div className="sidebar__top">{children}</div>
}
