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
    <div className="p-8">
      <Tabs.Root
        value={activeTab}
        onValueChange={(value) =>
          navigate(tabs.find((tab) => tab.value === value)?.path || '/users')
        }
      >
        <Tabs.List className="flex border-b border-gray-200" aria-label="Main navigation">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className="px-4 py-2 text-sm border-b-2 border-transparent -mb-px data-[state=active]:border-brand-purple data-[state=active]:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:rounded-sm"
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {/* Where matching child route is rendered */}
        <main>
          <Outlet />
        </main>
      </Tabs.Root>
    </div>
  )
}
