import * as Tabs from '@radix-ui/react-tabs'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

export default function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const activeTab = location.pathname.split('/')[1] || 'users'

  const tabs = [
    { value: 'users', label: 'Users', path: '/users' },
    { value: 'roles', label: 'Roles', path: '/roles' },
  ]

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={(value) =>
        navigate(tabs.find((tab) => tab.value === value)?.path || '/users')
      }
    >
      <Tabs.List className="flex">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:text-black"
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {/* Where matching child route is rendered */}
      <Outlet />
    </Tabs.Root>
  )
}
