import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
  Award,
  RefreshCw,
  BarChart3,
  ChevronRight,
  LogOut,
  Plus,
  List,
  Building,
  UserCheck,
  Receipt,
  DollarSign,
  AlertCircle
} from 'lucide-react'
import logoPortal from '@/assets/logo-portal.png'

const menuItems = [
  {
    title: 'Tableau de bord',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Souscriptions',
    icon: FileText,
    items: [
      {
        title: 'Nouvelle souscription',
        url: '/souscriptions/create',
        icon: Plus,
      },
      {
        title: 'Suivi souscriptions',
        url: '/souscriptions',
        icon: List,
      },
    ],
  },
  {
    title: 'Conventions',
    icon: Users,
    items: [
      {
        title: 'Protocoles groupes',
        url: '/conventions/groupes',
        icon: Building,
      },
      {
        title: 'Suivi des salariés',
        url: '/conventions/salaries',
        icon: UserCheck,
      },
    ],
  },
  {
    title: 'Demande d\'attestation',
    url: '/attestations',
    icon: Award,
  },
  {
    title: 'Facturation et règlement',
    icon: CreditCard,
    items: [
      {
        title: 'Liste des impayés',
        url: '/facturation/impayes',
        icon: AlertCircle,
      },
      {
        title: 'Factures',
        url: '/facturation/factures',
        icon: Receipt,
      },
      {
        title: 'Règlements',
        url: '/facturation/reglements',
        icon: DollarSign,
      },
    ],
  },
  {
    title: 'Demande de restitution',
    url: '/restitutions',
    icon: RefreshCw,
  },
  {
    title: 'État CP',
    url: '/etat-cp',
    icon: BarChart3,
  },
]

export function AppSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (url) => {
    if (url === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(url)
  }

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <img src={logoPortal} alt="MAI Portail" className="h-8 w-auto" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Portail Intermédiaires</span>
            <span className="text-xs text-muted-foreground">MAI Assurance</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible defaultOpen={item.items.some(subItem => isActive(subItem.url))}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full justify-between">
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive(subItem.url)}
                              >
                                <button
                                  onClick={() => navigate(subItem.url)}
                                  className="w-full flex items-center gap-2"
                                >
                                  <subItem.icon className="h-4 w-4" />
                                  <span>{subItem.title}</span>
                                </button>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                    >
                      <button
                        onClick={() => navigate(item.url)}
                        className="w-full flex items-center gap-2"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.agency}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start gap-2"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
