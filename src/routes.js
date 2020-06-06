// import Alternative from "views/pages/dashboards/Alternative.jsx";
import Buttons from "views/pages/components/Buttons.jsx";
import Calendar from "views/pages/Calendar.jsx";
import Cards from "views/pages/components/Cards.jsx";
import Charts from "views/pages/Charts.jsx";
import Components from "views/pages/forms/Components.jsx";
// import Dashboard from "views/pages/dashboards/Dashboard.jsx";
import Elements from "views/pages/forms/Elements.jsx";
import Google from "views/pages/maps/Google.jsx";
import Grid from "views/pages/components/Grid.jsx";
import Icons from "views/pages/components/Icons.jsx";
import Lock from "views/pages/examples/Lock.jsx";
import Login from "views/pages/examples/Login.jsx";
import Notifications from "views/pages/components/Notifications.jsx";
import Pricing from "views/pages/examples/Pricing.jsx";
import Profile from "views/pages/examples/Profile.jsx";
import ReactBSTables from "views/pages/tables/ReactBSTables.jsx";
import Register from "views/pages/examples/Register.jsx";
import Sortable from "views/pages/tables/Sortable.jsx";
import Tables from "views/pages/tables/Tables.jsx";
import Timeline from "views/pages/examples/Timeline.jsx";
import Typography from "views/pages/components/Typography.jsx";
import Validation from "views/pages/forms/Validation.jsx";
import Vector from "views/pages/maps/Vector.jsx";
import Widgets from "views/pages/Widgets.jsx";

import Importer from "views/pages/panel/importer";
import Mapcities from "views/pages/panel/Mapcities";
import CrawlerForm from "views/pages/panel/CrawlerForm";
import CrawlsTable from "views/pages/panel/CrawlsTable";
import VenuesReactTable from "views/pages/panel/VenuesReactTable";
import GpidsReactTable from "views/pages/panel/GpidsReactTable";
import SegmentsReactTable from "views/pages/panel/SegmentsReactTable";
import IntersectsRequest from "views/pages/panel/IntersectsRequest";
import MapVenues from "views/pages/panel/MapVenues";
import MapSegments from "views/pages/panel/MapSegments";
import UsersReactTable from "views/pages/panel/UsersReactTable";
import MajorTrafficEventsReactTable from "views/pages/panel/MajorTrafficEventsReactTable";
import RoadClosuresReactTable from "views/pages/panel/RoadClosuresReactTable";
import MapCommentsReactTable from "views/pages/panel/MapCommentsReactTable";

import PURsReactTable from "views/pages/panel/PURsReactTable";
import MPsReactTable from "views/pages/panel/MPsReactTable";
import URsReactTable from "views/pages/panel/URsReactTable";
import Pvrcrwl from "views/pages/panel/Pvrcrwl";
import Config from "views/pages/panel/Config";

import Home from "views/pages/panel/Home";
// import TileMap from "views/pages/panel/TileMap";
import BigJunctionsReactTable from "views/pages/panel/BigJunctionsReactTable";


import SubstatesReactTable from "views/pages/panel/SubstatesReactTable";
import MapManagedAreas from "views/pages/panel/MapManagedAreas";

const routes = [
  {/*{
    collapse: true,
    name: "Dashboards",
    icon: "ni ni-shop text-primary",
    state: "dashboardsCollapse",
    views: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        layout: "/admin"
      },
      {
        path: "/alternative-dashboard",
        name: "Alternative",
        component: Alternative,
        layout: "/admin"
      }
    ],
    // private:true
  }*/},
  
  
  {
    path: "/config",
    name: "Config",
    icon: "far fa-comment-dots text-primary",
    component: Config,
    layout: "/admin",
    private: true
  },
  {
    collapse: true,
    name: "Config",
    icon: "far fa-cogs text-primary",
    state: "configCollapse",
    views: [
      {
        path: "/home",
        name: "Home",
        icon: "far fa-comment-dots text-primary",
        component: Home,
        layout: "/admin"
      },
      {
        path: "/importer",
        name: "Importer",
        icon: "far fa-upload",
        component: Importer,
        layout: "/admin"
      },
      // {
      //   path: "/tilemap",
      //   name: "Tiles map",
      //   icon: "far fa-upload",
      //   component: TileMap,
      //   layout: "/admin"
      // },
      {
        path: "/Mapcities",
        name: "Geom Maps",
        icon: "far fa-draw-polygon",
        component: Mapcities,
        layout: "/admin",
      },
      {
        path: "/Pvrcrwl",
        name: "Pvrcrwl",
        icon: "far fa-draw-polygon",
        component: Pvrcrwl,
        layout: "/admin",
      },
      {
        collapse: true,
        name: "Crawler",
        icon: "far fa-spider-web text-primary",
        state: "multiCollapse",
        views: [ 
          {
            path: "/CrawlerForm/:crawlId?",
            name: "Add Crawler",
            icon: "far fa-file-plus",
            component: CrawlerForm,
            layout: "/admin"
          },
          {
            path: "/Crawls",
            name: "Crawl areas",
            icon: "far fa-spider",
            component: CrawlsTable,
            layout: "/admin"
          },
        ],
      },
      {
        path: "/Intersects",
        name: "Intersects",
        icon: "far fa-exchange",
        component: IntersectsRequest,
        layout: "/admin"
      }
    ],
    private:true
  },
  {
    collapse: true,
    name: "Segments",
    icon: "far fa-road text-primary",
    state: "segmentCollapse",
    views: [
      {
        path: "/Segments/:property?/:id?",
        name: "Segments",
        icon: "far fa-road",
        component: SegmentsReactTable,
        layout: "/admin",
        link:"/Segments"
      },
      {
        path: "/bigJunctions",
        name: "Junction Boxes",
        icon: "far fa-arrows",
        component: BigJunctionsReactTable,
        layout: "/admin"
      },
    ],
  },
  {
    collapse: true,
    name: "Places",
    icon: "far fa-store-alt text-primary",
    state: "venuesCollapse",
    views: [
      {
        path: "/Venues/:property?/:id?",
        name: "Venues",
        icon: "far fa-store-alt",
        component: VenuesReactTable,
        layout: "/admin"
      },
      {
        path: "/Gpids",
        name: "Gpids",
        icon: "fab fa-google",
        component: GpidsReactTable,
        layout: "/admin"
      },
      {
        path: "/placeupdates",
        name: "Place Updates (PURs)",
        icon: "far fa-map-marker-alt",
        component: PURsReactTable,
        layout: "/admin"
      },
    ],
  },
  {
    collapse: true,
    name: "Cities",
    icon: "far fa-car-building text-primary",
    state: "cityCollapse",
    views: [
      {
        path: "/cities",
        name: "City Stats",
        icon: "far fa-city",
        component: SubstatesReactTable,
        layout: "/admin"
      },
      {
        path: "/MapSegments",
        name: "Segment Heatmap",
        icon: "far fa-road",
        component: MapSegments,
        layout: "/admin"
      },
      {
        path: "/MapVenues",
        name: "Venue Heatmap",
        icon: "far fa-store-alt",
        component: MapVenues,
        layout: "/admin"
      }
    ],
  },  
  {
    collapse: true,
    name: "Users",
    icon: "far fa-users text-primary",
    state: "usersCollapse",
    views: [
      {
        path: "/users",
        name: "Users",
        icon: "far fa-users text-dark",
        component: UsersReactTable,
        layout: "/admin"
      },
      {
        path: "/managedAreas",
        name: "Area Managers",
        icon: "far fa-map-marked color: #002020",
        component: MapManagedAreas,
        layout: "/admin"
      },
    ],
  },
  {
    collapse: true,
    name: "Events",
    icon: "far fa-calendar-star text-primary",
    state: "eventsCollapse",
    views: [
      {
        path: "/majorTrafficEvents",
        name: "Major Traffic Events",
        icon: "far fa-traffic-light-stop",
        mini: "M",
        component: MajorTrafficEventsReactTable,
        layout: "/admin"
      },
      {
        path: "/roadClosures/:property?/:id?",
        name: "Road Closures",
        icon: "far fa-construction",
        component: RoadClosuresReactTable,
        layout: "/admin"
      },
    ]
  },
  {
    collapse: true,
    name: "Map Issues",
    icon: "far fa-exclamation-triangle text-primary",
    state: "issuesCollapse",
    views: [
      {
        path: "/problems",
        name: "Map Problems (MPs)",
        icon: "far fa-exclamation-circle",
        component: MPsReactTable,
        layout: "/admin"
      },
      {
        path: "/mapUpdateRequests",
        name: "Update Requests (URs)",
        icon: "far fa-question-circle",
        component: URsReactTable,
        layout: "/admin"
        }
    ]
  },
  {
    path: "/mapComments",
    name: "Map Comments",
    icon: "far fa-comment-dots text-primary",
    component: MapCommentsReactTable,
    layout: "/admin"
  }
];

export default routes;
