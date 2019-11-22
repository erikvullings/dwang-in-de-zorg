import m, { ComponentTypes, RouteDefs } from 'mithril';
import { AboutPage } from '../components/about/about-page';
import { HelpPage } from '../components/about/help-page';
import { EditForm } from '../components/edit/edit-form';
import { FormList } from '../components/home/form-list';
import { HomePage } from '../components/home/home-page';
import { Layout } from '../components/layout';
import { FormView } from '../components/show/form-view';
import { IDashboard } from '../models/dashboard';
import { Auth, Login } from './login-service';

export const enum Dashboards {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  HELP = 'HELP',
  READ = 'SHOW',
  EDIT = 'EDIT',
  SEARCH = 'SEARCH',
  USER = 'USER',
}

class DashboardService {
  private dashboards!: ReadonlyArray<IDashboard>;

  constructor(private layout: ComponentTypes, dashboards: IDashboard[]) {
    this.setList(dashboards);
  }

  public getList() {
    return this.dashboards;
  }

  public setList(list: IDashboard[]) {
    this.dashboards = Object.freeze(list);
  }

  public get defaultRoute() {
    const dashboard = this.dashboards.filter(d => d.default).shift();
    return dashboard ? dashboard.route : this.dashboards[0].route;
  }

  public route(dashboardId: Dashboards) {
    const dashboard = this.dashboards.filter(d => d.id === dashboardId).shift();
    return dashboard ? dashboard.route : this.defaultRoute;
  }

  public switchTo(dashboardId: Dashboards, params?: { [key: string]: string | number | undefined }) {
    const dashboard = this.dashboards.filter(d => d.id === dashboardId).shift();
    if (dashboard) {
      m.route.set(dashboard.route, params ? params : undefined);
    }
  }

  public get routingTable() {
    return this.dashboards.reduce(
      (p, c) => {
        p[c.route] = c.hasNavBar === false
          ? { render: () => m(c.component) }
          : { render: () => m(this.layout, m(c.component)) };
        return p;
      },
      {} as RouteDefs,
    );
  }
}

export const dashboardSvc: DashboardService = new DashboardService(Layout, [
  {
    id: Dashboards.SEARCH,
    title: 'ZOEKEN',
    icon: 'home',
    route: '/zoeken',
    visible: true,
    component: FormList,
  },
  {
    id: Dashboards.READ,
    title: 'READ',
    icon: 'description',
    route: '/lezen/:id',
    visible: false,
    component: FormView,
  },
  {
    id: Dashboards.EDIT,
    title: 'BEWERKEN',
    icon: 'edit',
    route: '/bewerken/:id',
    visible: false,
    component: EditForm,
  },
  {
    id: Dashboards.HELP,
    title: 'HELP',
    icon: 'info',
    route: '/help',
    visible: true,
    component: HelpPage,
  },
  {
    id: Dashboards.ABOUT,
    title: 'OVER DEZE WEBSITE',
    icon: 'help',
    route: '/over',
    visible: true,
    component: AboutPage,
  },
  {
    id: Dashboards.HOME,
    default: true,
    hasNavBar: false,
    title: 'HOME',
    route: '/',
    visible: false,
    component: HomePage,
  },
  {
    id: Dashboards.USER,
    title: 'User page',
    route: '/user',
    icon: () => Auth.isAuthenticated ? 'person' : 'person_outline',
    visible: true,
    component: Login,
  },
]);
