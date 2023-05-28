import SidebarItem from '@/modules/Sidebar/components/Item';

export type SidebarNavItem = {
  name: string;
  href: string;
};

export default function Sidebar() {
  const navigation: SidebarNavItem[] = [
    {
      name: 'Currency converter',
      href: '/',
    },
  ];

  return (
    <nav className="border-r h-full dark:border-slate-800">
      <div className="flex flex-col h-full">
        <div className="h-20 flex justify-between items-center px-6">
          <h1 className="dark:text-slate-200 text-3xl font-bold">Firestorm</h1>

          {/* Disabled until Tremor implements dark mode */}
          {/* <ThemeSwitchButton /> */}
        </div>

        <div className="flex-1 flex flex-col h-full overflow-auto">
          <ul className="px-4 text-sm font-medium flex-1">
            {navigation.map((item) => (
              <SidebarItem key={item.name} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
