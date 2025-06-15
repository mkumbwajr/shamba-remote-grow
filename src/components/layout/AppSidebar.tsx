
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { 
  Home, 
  Sprout, 
  Users, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  MapPin, 
  Brain, 
  MessageCircle, 
  Newspaper, 
  HelpCircle,
  Settings
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"
import LanguageToggle from "@/components/LanguageToggle"
import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

const AppSidebar = () => {
  const location = useLocation()
  const { t } = useLanguage()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: roleData } = await supabase
          .rpc('get_user_role', { _user_id: user.id })
        setUserRole(roleData)
      }
    }

    checkUserRole()
  }, [])

  const mainMenuItems = [
    { title: String(t('dashboard')), url: "/", icon: Home },
    { title: String(t('farms')), url: "/farms", icon: Sprout },
    { title: String(t('workers')), url: "/workers", icon: Users },
    { title: String(t('marketplace')), url: "/marketplace", icon: ShoppingCart },
    { title: String(t('inventory')), url: "/inventory", icon: Package },
    { title: String(t('investment')), url: "/investment", icon: DollarSign },
    { title: String(t('landRental')), url: "/land-rental", icon: MapPin },
    { title: String(t('cropMatcher')), url: "/crop-matcher", icon: Brain },
  ]

  const communicationItems = [
    { title: String(t('community')), url: "/community", icon: MessageCircle },
    { title: String(t('messages')), url: "/messages", icon: MessageCircle },
    { title: String(t('news')), url: "/news", icon: Newspaper },
    { title: String(t('support')), url: "/support", icon: HelpCircle },
  ]

  const adminItems = [
    { title: "Admin Dashboard", url: "/admin", icon: Settings },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold text-green-600">Bwana Shamba</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{String(t('mainMenu'))}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>{String(t('communication'))}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communicationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {(userRole === 'admin' || userRole === 'super_admin') && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="p-4">
        <LanguageToggle />
      </SidebarFooter>
    </Sidebar>
  )
}

export { AppSidebar }
