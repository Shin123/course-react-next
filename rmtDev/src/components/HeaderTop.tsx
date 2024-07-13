import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function HeaderTop({ children }: Props) {
  return <div className="header__top">{children}</div>
}
